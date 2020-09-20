'use strict'

const generateIcs = require('ics-service/generate-ics')
const fetchEvents = require('./lib/events')

const TITLE = 'Aktionen der Seebrücke'

const getSeebrueckeEventsIcs = async (feedUrl, req) => {
	const query = new URL(req.url, 'http://localhost').searchParams
	const city = query.get('city') || null

	const events = await fetchEvents(city)
	return generateIcs(TITLE, events, feedUrl)
}

module.exports = getSeebrueckeEventsIcs
