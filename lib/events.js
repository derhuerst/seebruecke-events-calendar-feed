// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import createDebug from 'debug'
import {getCoord as getCoords} from '@turf/invariant'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import slug from 'slug'

const pkg = require('../package.json')

const debug = createDebug(pkg.name + ':events')

// todo: solve this properly! https://github.com/seebruecke-org/frontend/issues/93
const EVENTS_PAGE_URL = 'https://seebruecke.org/aktionen'
const EVENTS_BASE_URL = 'https://seebruecke.org/aktionen/'

const ORGANIZER = {
	name: 'Seebrücke',
	email: 'press@seebruecke.org',
}

const parseDatetime = (datetimeStr) => {
	const res = /^\s*(\d{1,2})\.(\d{1,2})\.(\d{2,4})\s+(\d{1,2}):(\d{2})\s*$/.exec(datetimeStr)
	if (!res) {
		debug('failed to parse date+time string', {datetimeStr})
		return null
	}
	const [
		_,
		date, month, year,
		hours, minutes,
	] = res
	return [
		parseInt(year), parseInt(month), parseInt(date),
		parseInt(hours), parseInt(minutes),
	]
}

const formatActionAsCalendarEvent = (action, city = null) => {
	const {
		id, slug,
		title,
		location, location_detail: locationDetail,
		start, end,
	} = action

	// action.coordinates is a GeoJSON Point feature
	const coords = action.coordinates && getCoords(action.coordinates)

	return {
		uid: id,
		// todo: remove "Seebrücke" default suffix?
		title: `${title} – Seebrücke${city === null ? '' : ' ' + city}`,
		url: slug ? EVENTS_BASE_URL + slug : null,
		// todo: geolocation from action.coordinates
		location: location
			? (locationDetail ? locationDetail + ', ' : '') + location
			: city,
		geo: coords
			? {lat: coords[1], lon: coords[0], radius: 100}
			: null,
		organizer: ORGANIZER,
		start: parseDatetime(start),
		startInputType: 'local',
		startOutputType: 'local',
		// use end date+time, otherwise fall back to 3h
		end: end ? parseDatetime(end) : null,
		duration: end ? null : {hours: 3, minutes: 0},
	}
}

const fetchEvents = async (city = null) => {
	const res = await fetch(EVENTS_PAGE_URL, {
		redirect: 'follow',
		timeout: 30 * 1000,
		headers: {
			accept: 'text/html,application/xhtml+xml',
			'accept-language': 'de-DE, de',
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

	const html = await res.text()
	const $ = cheerio.load(html)
	const r = $('body script[id="__NEXT_DATA__"][type="application/json"]').first()
	if (!r || r.length !== 1) {
		const err = new Error(`can't find <script id="__NEXT_DATA__"> in Seebrücke website source code`)
		err.statusCode = 500
		err.url = res.url
		err.html = html
		throw err
	}
	const nextjsData = JSON.parse(r.text())
	debug('__NEXT_DATA__', nextjsData)

	const {
		props: {
			pageProps: {
				actions: actionsByDate,
			},
		},
	} = nextjsData

	const events = []
	for (const [date, actions] of Object.entries(actionsByDate)) {
		for (const action of actions) {
			if (city !== null && slug(city) !== slug(action.location)) {
				debug(`filtering out because location is not "${city}"`, {action})
				continue
			}
			events.push(formatActionAsCalendarEvent(action, city))
		}
	}

	return events
}

export {
	formatActionAsCalendarEvent,
	fetchEvents,
}
