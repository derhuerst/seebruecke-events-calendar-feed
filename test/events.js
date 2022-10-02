import {
	deepStrictEqual,
	ifError,
} from 'node:assert'
import {
	formatActionAsCalendarEvent as parseAction,
	fetchEvents,
} from '../lib/events.js'

const ORGANIZER = {
	name: 'Seebrücke',
	email: 'press@seebruecke.org',
}

const runTests = async () => {
	deepStrictEqual(parseAction({
		id: '730',
		title: 'NASIM - Filmvorführung und Gespräch mit Nasim Tajik und den Filmemachern',
		intro: null,
		slug: 'nasim-filmvorfuehrung-und-gespraech-mit-nasim-tajik-und-den-filmemachern',
		location: 'Potsdam',
		location_detail: 'Spartacus (Friedrich-Engels-Straße 22)',
		__typename: 'Action',
		start: '02.10.2022 16:00',
		end: '02.10.2022 19:10',
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [13.058302574107293, 52.3943522658368],
			},
		},
	}), {
		uid: '730',
		title: 'NASIM - Filmvorführung und Gespräch mit Nasim Tajik und den Filmemachern – Seebrücke',
		url: 'https://seebruecke.org/aktionen/nasim-filmvorfuehrung-und-gespraech-mit-nasim-tajik-und-den-filmemachern',
		location: 'Spartacus (Friedrich-Engels-Straße 22), Potsdam',
		geo: {lat: 52.3943522658368, lon: 13.058302574107293, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 10, 2, 16, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2022, 10, 2, 19, 10],
		duration: null,
	}, '730')

	deepStrictEqual(parseAction({
		id: '763',
		title: 'Podiumsdiskussion: Flucht und Rassismus - Die selektive Solidarität gegenüber Schutzsuchenden',
		intro: null,
		slug: 'podiumsdiskussion-flucht-und-rassismus-die-selektive-solidaritaet-gegenueber-schutzsuchenden',
		location: 'Berlin',
		location_detail: 'KulturMarktHalle, Hanns-Eisler Str. 93',
		__typename: 'Action',
		start: '03.10.2022 17:00',
		end: null,
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [13.452408714689394, 52.53992756081701],
			},
		},
	}), {
		uid: '763',
		title: 'Podiumsdiskussion: Flucht und Rassismus - Die selektive Solidarität gegenüber Schutzsuchenden – Seebrücke',
		url: 'https://seebruecke.org/aktionen/podiumsdiskussion-flucht-und-rassismus-die-selektive-solidaritaet-gegenueber-schutzsuchenden',
		location: 'KulturMarktHalle, Hanns-Eisler Str. 93, Berlin',
		geo: {lat: 52.53992756081701, lon: 13.452408714689394, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 10, 3, 17, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: null,
		duration: {hours: 3, minutes: 0},
	}, '763')

	deepStrictEqual(parseAction({
		id: '743',
		title: 'Aktiv werden gegen Abschiebungen!',
		intro: null,
		slug: 'aktiv-werden-gegen-abschiebungen',
		location: 'Hannover',
		location_detail: null,
		__typename: 'Action',
		start: '04.10.2022 12:00',
		end: null,
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [9.740862653907028, 52.37706865864021],
			},
		},
	}), {
		uid: '743',
		title: 'Aktiv werden gegen Abschiebungen! – Seebrücke',
		url: 'https://seebruecke.org/aktionen/aktiv-werden-gegen-abschiebungen',
		location: 'Hannover',
		geo: {lat: 52.37706865864021, lon: 9.740862653907028, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 10, 4, 12, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: null,
		duration: {hours: 3, minutes: 0},
	}, '743')

	deepStrictEqual(parseAction({
		id: '754',
		title: 'Solifestival',
		intro: null,
		slug: 'solifestival',
		location: 'Ahaus',
		location_detail: 'LOGO',
		__typename: 'Action',
		start: '07.10.2022 19:30',
		end: null,
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [6.9829535099744, 52.106570335160626],
			},
		},
	}), {
		uid: '754',
		title: 'Solifestival – Seebrücke',
		url: 'https://seebruecke.org/aktionen/solifestival',
		location: 'LOGO, Ahaus',
		geo: {lat: 52.106570335160626, lon: 6.9829535099744, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 10, 7, 19, 30],
		startInputType: 'local',
		startOutputType: 'local',
		end: null,
		duration: {hours: 3, minutes: 0},
	}, '754')

	deepStrictEqual(parseAction({
		id: '770',
		title: 'Offenes Treffen',
		intro: null,
		slug: 'offenes-treffen-7',
		location: 'Montabaur',
		location_detail: 'Haus der Jugend ',
		__typename: 'Action',
		start: '18.10.2022 18:30',
		end: null,
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [7.808712676128776, 50.43460641363568],
			},
		},
	}), {
		uid: '770',
		title: 'Offenes Treffen – Seebrücke',
		url: 'https://seebruecke.org/aktionen/offenes-treffen-7',
		location: 'Haus der Jugend , Montabaur',
		geo: {lat: 50.43460641363568, lon: 7.808712676128776, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 10, 18, 18, 30],
		startInputType: 'local',
		startOutputType: 'local',
		end: null,
		duration: {hours: 3, minutes: 0},
	}, '770')

	deepStrictEqual(parseAction({
		id: '765',
		title: 'FIGHT FORTRESS EUROPE Tour: Film Screening, Berichte und Austausch',
		intro: null,
		slug: 'film-screening-berichte-und-austausch',
		location: 'Würzburg',
		location_detail: 'Central im Bürgerbräu',
		__typename: 'Action',
		start: '18.10.2022 18:30',
		end: null,
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [9.944391876292755, 49.79527785832146],
			},
		},
	}), {
		uid: '765',
		title: 'FIGHT FORTRESS EUROPE Tour: Film Screening, Berichte und Austausch – Seebrücke',
		url: 'https://seebruecke.org/aktionen/film-screening-berichte-und-austausch',
		location: 'Central im Bürgerbräu, Würzburg',
		geo: {lat: 49.79527785832146, lon: 9.944391876292755, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 10, 18, 18, 30],
		startInputType: 'local',
		startOutputType: 'local',
		end: null,
		duration: {hours: 3, minutes: 0},
	}, '765')

	deepStrictEqual(parseAction({
		id: '744',
		title: 'Vortrag und Podiumsdiskussion \'Frauen unter den Taliban: Ein Jahr nach der Machtergreifung\'',
		intro: null,
		slug: 'vortrag-und-podiumsdiskussion-frauen-unter-den-taliban-ein-jahr-nach-der-machtergreifung',
		location: 'Hannover',
		location_detail: 'Kulturzentrum Faust / Warenannahme, Zur Bettfedernfabrik 3',
		__typename: 'Action',
		start: '22.11.2022 17:30',
		end: null,
		coordinates: {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [9.732622907907697, 52.40304962186838],
			},
		},
	}), {
		uid: '744',
		title: 'Vortrag und Podiumsdiskussion \'Frauen unter den Taliban: Ein Jahr nach der Machtergreifung\' – Seebrücke',
		url: 'https://seebruecke.org/aktionen/vortrag-und-podiumsdiskussion-frauen-unter-den-taliban-ein-jahr-nach-der-machtergreifung',
		location: 'Kulturzentrum Faust / Warenannahme, Zur Bettfedernfabrik 3, Hannover',
		geo: {lat: 52.40304962186838, lon: 9.732622907907697, radius: 100},
		organizer: ORGANIZER,
		start: [2022, 11, 22, 17, 30],
		startInputType: 'local',
		startOutputType: 'local',
		end: null,
		duration: {hours: 3, minutes: 0},
	}, '744')


	await new Promise((resolve, reject) => {
		const timeout = 60 * 1000
		setTimeout(reject, timeout, new Error('fetching & parsing events took too long')).unref()
		fetchEvents().then(resolve, reject)
	})
}

export {
	runTests,
}
