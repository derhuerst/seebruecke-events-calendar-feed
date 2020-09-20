'use strict'

const {strictEqual} = require('assert')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const slug = require('slug')
const pkg = require('../package.json')

const ORGANIZER = {
	name: 'Seebrücke',
	email: 'press@seebruecke.org',
}

const trim = str => str.replace(/^[\r\n\s]+/g, '').replace(/[\r\n\s]+$/g, '')
strictEqual(trim('\n \t foo\r\n '), 'foo')

const removeBreaks = str => str.replace(/([^\s\r\n])\s*[\r\n]+\s*([^\s\r\n])/g, '$1 $2')
strictEqual(removeBreaks('foo \n bar'), 'foo bar')

const parseDate = ($, el, citySpecific = false) => {
	const date = removeBreaks(trim($('.actions__day-title', el).text())).split('.')

	return $('.actions__events .action', el)
	.map((i, action) => {
		const link = $('a[href]', action)
		const city = removeBreaks(trim(link.text()))
		const title = removeBreaks(trim($('.action__content', action).text()))
		const time = removeBreaks(trim($('.action__time', action).text())).split(':')

		return {
			title: `${title} – Seebrücke${citySpecific ? '' : ' ' + city}`,
			url: link.attr('href') || null,
			location: city,
			organizer: ORGANIZER,
			start: [
				parseInt(date[2]), // year
				parseInt(date[1]), // month
				parseInt(date[0]), // date
				parseInt(time[0]), // hours
				parseInt(time[1]), // minutes
			],
			startInputType: 'local',
			startOutputType: 'local',
			duration: {hours: 3, minutes: 0}, // todo: parse
		}
	})
	.get()
}

const fetchEvents = async (city = null) => {
	const res = await fetch('https://seebruecke.org/mach-mit/aktionen/', {
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

	return $('body .actions__list .actions__day')
	.map((i, date) => parseDate($, date, !!city))
	.get()
	.flat()
	.filter(event => city ? slug(event.location) === slug(city) : true)
}

module.exports = fetchEvents
