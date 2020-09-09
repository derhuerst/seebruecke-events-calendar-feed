'use strict'

const generateIcs = require('ics-service/generate-ics')
const fetchEvents = require('./lib/events')

const TITLE = 'Aktionen der Seebrücke'

const getSeebrueckeEventsIcs = async (feedUrl, req) => {
	const events = await fetchEvents(req.query.city || null)
	return generateIcs(TITLE, events, feedUrl)
}

module.exports = getSeebrueckeEventsIcs
