// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import createDebug from 'debug'
import {DateTime} from 'luxon'
import {deepStrictEqual} from 'assert'
import fetch from 'node-fetch'
import slug from 'slug'

const pkg = require('../package.json')

const DAY = 24 * 60 * 60 * 1000

const debug = createDebug(pkg.name + ':events')

const GROUPS_BASE_URL = 'https://seebruecke.org/mach-mit/'
const EVENTS_BASE_URL = 'https://seebruecke.org/aktionen/'
const API_URL = 'https://api.seebruecke.org/graphql'

const formatOrganizerUrl = (citySlug, stateSlug, countrySlug) => {
	if (!citySlug || !stateSlug || !countrySlug) return null
	return `${GROUPS_BASE_URL}${countrySlug}/${stateSlug}/${citySlug}`
}

const formatDatetime = (isoStr) => {
	const dt = DateTime.fromISO(isoStr, {
		zone: 'Europe/Berlin', // todo: pull from action?
		locale: 'de-DE',
	})
	return [
		dt.year, dt.month, dt.day,
		dt.hour, dt.minute,
	]
}
deepStrictEqual(formatDatetime('2022-03-04T05:06:07+01:00'), [2022, 3, 4, 5, 6])

const formatActionAsCalendarEvent = (action) => {
	const {
		id,
		attributes: {
			slug,
			title,
			location, location_detail: locationDetail,
			start, end,
			group,
		}
	} = action

	const city = group?.data?.attributes?.city?.data?.attributes?.name || null
	const coords = action.attributes?.coordinates
		? action.attributes?.coordinates.split(/,\s+/).map(part => parseFloat(part)).reverse()
		: null
	const groupContact = (group?.data?.attributes?.localizations?.data || [])[0]?.attributes?.content
	?.find(({__typename}) => __typename === 'ComponentSharedBlocksContact')
	const organizerUrl = formatOrganizerUrl(
		group?.data?.attributes?.city?.data?.attributes?.slug,
		group?.data?.attributes?.city?.data?.attributes?.federal_country?.data?.attributes?.slug,
		group?.data?.attributes?.city?.data?.attributes?.federal_country?.data?.attributes?.country?.data?.attributes?.slug,
	)

	return {
		uid: id,
		title: `${title}${city === null ? '' : ' – Seebrücke ' + city}`,
		url: slug ? EVENTS_BASE_URL + slug : null,
		location: location
			? (locationDetail ? locationDetail + ', ' : '') + location
			: city,
		geo: coords
			? {lat: coords[1], lon: coords[0], radius: 100}
			: null,
		organizer: {
			name: 'Seebrücke ' + (group?.data?.attributes?.city?.data?.attributes?.name || ''),
			email: groupContact?.email || 'press@seebruecke.org',
			// for some reason, `dir` cannot be `null`
			...(organizerUrl ? {dir: organizerUrl} : {}),
		},
		start: formatDatetime(start),
		startInputType: 'local',
		startOutputType: 'local',
		// use end date+time, otherwise fall back to 3h
		...(end ? {
			end: formatDatetime(end),
		} : {
			duration: {hours: 3, minutes: 0},
		}),
	}
}

const fetchEvents = async (city = null) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		redirect: 'follow',
		timeout: 30 * 1000,
		body: JSON.stringify({
			query: `\
query recentActions ($start_gte: DateTime!) {
	actions(
		sort: "start:desc"
		pagination: {
			limit: 500 
		}
		filters: {
			start: {
				gte: $start_gte
			}
		}
	) {
		data {
			id
			attributes {
				slug
				locale
				title
				start,	end
				location, location_detail
				coordinates
				link
				group {
					data {
						attributes {
							city {
								data{
									attributes{
										name
										slug
										federal_country {
											data {
												attributes {
													slug
													country {
														data {
															attributes {
																slug
															}
														}
													}
												}
											}
										}
									}
								}
							}
							localizations {
								data{
									attributes{
										content {
											...on ComponentSharedBlocksContact {
												__typename
												email
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}`,
			variables: {
				start_gte: new Date(Date.now() - 10 * DAY).toISOString(),
			},
		}),
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			'user-agent': pkg.homepage,
		},
	})
	if (!res.ok) {
		const err = new Error(res.statusText)
		err.statusCode = res.status
		err.url = res.url
		err.res = res
		throw err
	}

	const {
		data: {
			actions: {
				data: actionsData
			}
		},
	} = await res.json()

	const events = []
	for (const action of actionsData) {
		// todo: also filter by action.group.city.name?
		if (city !== null && slug(city) !== slug(action.attributes?.location)) {
			debug(`filtering out because location is not "${city}"`, {action})
			continue
		}
		events.push(formatActionAsCalendarEvent(action))
	}

	return events
}

export {
	formatActionAsCalendarEvent,
	fetchEvents,
}
