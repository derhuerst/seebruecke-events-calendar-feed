import {
	deepStrictEqual,
	ifError,
} from 'node:assert'
import {
	formatActionAsCalendarEvent as parseAction,
	fetchEvents,
} from '../lib/events.js'

const runTests = async () => {
	deepStrictEqual(parseAction({
		id: '841',
		slug: 'reclaim-the-hinterland',
		updated_at: '2022-12-15T15:05:33.000Z',
		locale: 'de',
		title: 'Reclaim the Hinterland!',
		start: '2023-01-27T17:00:00.000Z',
		end: '2023-01-27T19:00:00.000Z',
		location: 'Hannover',
		location_detail: 'Bahnhof Lindhorst',
		coordinates: '52.354489830158954, 9.288939803651777',
		link: null,
		group: {
			localizations: [{
				content: [
					{},
					{
						__typename: 'ComponentSharedBlocksContact',
						email: 'hannover@seebruecke.org'
					},
					{},
					{},
				],
			}],
			city: {
				name: 'Hannover',
				slug: 'hannover',
				federal_country: {slug: 'niedersachsen', country: {slug: 'deutschland'}},
			},
		},
	}), {
		uid: '841',
		title: 'Reclaim the Hinterland! – Seebrücke Hannover',
		url: 'https://seebruecke.org/aktionen/reclaim-the-hinterland',
		location: 'Bahnhof Lindhorst, Hannover',
		geo: {lat: 52.354489830158954, lon: 9.288939803651777, radius: 100},
		organizer: {
			name: 'Seebrücke Hannover',
			email: 'hannover@seebruecke.org',
			dir: 'https://seebruecke.org/mach-mit/deutschland/niedersachsen/hannover'
		},
		start: [2023, 1, 27, 18, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2023, 1, 27, 20, 0],
	})

	deepStrictEqual(parseAction({
		id: '842',
		slug: 'bamberger-mahnwache-asyl-am-montag',
		updated_at: '2022-12-15T15:06:55.000Z',
		locale: 'de',
		title: 'Bamberger Mahnwache Asyl am Montag',
		start: '2022-12-19T17:00:00.000Z',
		end: '2022-12-19T19:00:00.000Z',
		location: 'Bamberg',
		location_detail: 'Untere Brücke',
		coordinates: '49.892134904541244, 10.886452098915472',
		link: null,
		group: {
			localizations: [{
				content: [
					{},
					{
						__typename: 'ComponentSharedBlocksContact',
						email: 'bamberg@seebruecke.org'
					},
					{},
				],
			}],
			city: {
				name: 'Bamberg',
				slug: 'bamberg',
				federal_country: {slug: 'bayern', country: {slug: 'deutschland'}},
			},
		},
	}), {
		uid: '842',
		title: 'Bamberger Mahnwache Asyl am Montag – Seebrücke Bamberg',
		url: 'https://seebruecke.org/aktionen/bamberger-mahnwache-asyl-am-montag',
		location: 'Untere Brücke, Bamberg',
		geo: {lat: 49.892134904541244, lon: 10.886452098915472, radius: 100},
		organizer: {
			name: 'Seebrücke Bamberg',
			email: 'bamberg@seebruecke.org',
			dir: 'https://seebruecke.org/mach-mit/deutschland/bayern/bamberg'
		},
		start: [2022, 12, 19, 18, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2022, 12, 19, 20, 0],
	})

	deepStrictEqual(parseAction({
		id: '840',
		slug: 'flohmarktkneipe',
		updated_at: '2022-12-15T15:03:06.000Z',
		locale: 'de',
		title: 'Flohmarktkneipe',
		start: '2022-12-17T19:00:00.000Z',
		end: '2022-12-17T22:30:00.000Z',
		location: 'Lüneburg ',
		location_detail: 'Anna & Arthur, Katzenstraße 2',
		coordinates: '53.2490433641608, 10.406656725189475',
		link: null,
		group: {
			localizations: [
				{
					content: [
						{},
						{
							__typename: 'ComponentSharedBlocksContact',
							email: 'Lueneburg@seebruecke.org'
						},
						{},
						{},
					],
				},
			],
			city: {
				name: 'Lüneburg',
				slug: 'lueneburg',
				federal_country: {slug: 'niedersachsen', country: {slug: 'deutschland'}},
			},
		},
	}), {
		uid: '840',
		title: 'Flohmarktkneipe – Seebrücke Lüneburg',
		url: 'https://seebruecke.org/aktionen/flohmarktkneipe',
		location: 'Anna & Arthur, Katzenstraße 2, Lüneburg ',
		geo: {lat: 53.2490433641608, lon: 10.406656725189475, radius: 100},
		organizer: {
			name: 'Seebrücke Lüneburg',
			email: 'Lueneburg@seebruecke.org',
			dir: 'https://seebruecke.org/mach-mit/deutschland/niedersachsen/lueneburg'
		},
		start: [2022, 12, 17, 20, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2022, 12, 17, 23, 30],
	})

	deepStrictEqual(parseAction({
		id: '839',
		slug: 'soli-siebdruck-werkstatt',
		updated_at: '2022-12-15T15:00:41.000Z',
		locale: 'de',
		title: 'Soli-Siebdruck-Werkstatt',
		start: '2022-12-17T18:00:00.000Z',
		end: '2022-12-17T20:00:00.000Z',
		location: 'Hamburg',
		location_detail: 'Gängeviertel',
		coordinates: '53.55545810534097, 9.983173319089355',
		link: null,
		group: {
			localizations: [
				{
					content: [
						{},
						{
							__typename: 'ComponentSharedBlocksContact',
							email: 'hamburg@seebruecke.org'
						},
						{},
					],
				},
			],
			city: {
				name: 'Hamburg',
				slug: 'hamburg',
				federal_country: {slug: 'hamburg', country: {slug: 'deutschland'}},
			},
		},
	}), {
		uid: '839',
		title: 'Soli-Siebdruck-Werkstatt – Seebrücke Hamburg',
		url: 'https://seebruecke.org/aktionen/soli-siebdruck-werkstatt',
		location: 'Gängeviertel, Hamburg',
		geo: {lat: 53.55545810534097, lon: 9.983173319089355, radius: 100},
		organizer: {
			name: 'Seebrücke Hamburg',
			email: 'hamburg@seebruecke.org',
			dir: 'https://seebruecke.org/mach-mit/deutschland/hamburg/hamburg'
		},
		start: [2022, 12, 17, 19, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2022, 12, 17, 21, 0],
	})

	deepStrictEqual(parseAction({
		id: '766',
		slug: 'mittelmeer-monologe-2',
		updated_at: '2022-09-26T11:10:32.000Z',
		locale: 'de',
		title: 'MITTELMEER-MONOLOGE',
		start: '2022-12-17T17:30:00.000Z',
		end: '2022-09-28T19:00:00.000Z',
		location: 'Tübingen',
		location_detail: 'Eberhardskirche',
		coordinates: '48.530698986093164, 9.066999218416052',
		link: null,
		group: {
			localizations: [
				{
					content: [
						{},
						{__typename: 'ComponentSharedBlocksContact', email: ''},
						{},
					],
				},
			],
			city: {
				name: 'Tübingen',
				slug: 'tuebingen',
				federal_country: {slug: 'baden-wuerttemberg', country: {slug: 'deutschland'}},
			},
		},
	}), {
		uid: '766',
		title: 'MITTELMEER-MONOLOGE – Seebrücke Tübingen',
		url: 'https://seebruecke.org/aktionen/mittelmeer-monologe-2',
		location: 'Eberhardskirche, Tübingen',
		geo: {lat: 48.530698986093164, lon: 9.066999218416052, radius: 100},
		organizer: {
			name: 'Seebrücke Tübingen',
			email: 'press@seebruecke.org',
			dir: 'https://seebruecke.org/mach-mit/deutschland/baden-wuerttemberg/tuebingen'
		},
		start: [2022, 12, 17, 18, 30],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2022, 9, 28, 21, 0],
	})


	await new Promise((resolve, reject) => {
		const timeout = 60 * 1000
		setTimeout(reject, timeout, new Error('fetching & parsing events took too long')).unref()
		fetchEvents().then(resolve, reject)
	})
}

export {
	runTests,
}
