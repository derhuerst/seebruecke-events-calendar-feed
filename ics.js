import generateIcs from 'ics-service/generate-ics.js'
import {fetchEvents} from './lib/events.js'

const TITLE = 'Aktionen der Seebrücke'

const getSeebrueckeEventsIcs = async (feedUrl, req) => {
	const query = new URL(req.url, 'http://localhost').searchParams
	const city = query.get('city') || null

	const events = await fetchEvents(city)
	return generateIcs(TITLE, events, feedUrl)
}

export {
	getSeebrueckeEventsIcs as getIcs,
}
