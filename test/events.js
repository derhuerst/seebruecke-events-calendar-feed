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
		id: '902',
		attributes: {
			slug: 'lesung-die-wuerde-des-menschen-ist-abschiebbar-von-sebastian-nitschke',
			locale: 'de',
			title: 'Lesung: "Die Würde des Menschen ist abschiebbar" von Sebastian Nitschke',
			start: '2023-03-21T19:00:00.000Z',
			end: '2023-03-21T21:00:00.000Z',
			location: 'Regensburg',
			location_detail: 'Die Couch, Fröhliche-Türken-Straße 9',
			coordinates: '49.01345377053288, 12.108278629803387',
			link: null,
			group: {
				data: {
					attributes: {
						city: {
							data: {
								attributes: {
									name: 'Regensburg',
									slug: 'regensburg',
									federal_country: {
										data: {
											attributes: {
												slug: 'bayern',
												country: {
													data: {
														attributes: {
															slug: 'deutschland'
														}
													}
												}
											}
										}
									}
								}
							}
						}, localizations: {
							data: [{
								attributes: {
									content: [
										{},
										{
											__typename: 'ComponentSharedBlocksContact',
											email: 'regensburg@seebruecke.org'
										},
										{}
									]
								}
							}]
						}
					}
				}
			}
		}
	}), {
		uid: '902',
		title: 'Lesung: "Die Würde des Menschen ist abschiebbar" von Sebastian Nitschke – Seebrücke Regensburg',
		url: 'https://seebruecke.org/aktionen/lesung-die-wuerde-des-menschen-ist-abschiebbar-von-sebastian-nitschke',
		location: 'Die Couch, Fröhliche-Türken-Straße 9, Regensburg',
		geo: { lat: 49.01345377053288, lon: 12.108278629803387, radius: 100 },
		organizer: {
			name: 'Seebrücke Regensburg',
			email: 'regensburg@seebruecke.org',
			dir: 'https://seebruecke.org/mach-mit/deutschland/bayern/regensburg'
		},
		start: [2023, 3, 21, 20, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2023, 3, 21, 22, 0]
	})

	deepStrictEqual(parseAction({
		id: '903',
		attributes: {
			slug: 'bildvortrag-mit-seenotretter-gerald-karl',
			locale: 'de',
			title: 'Bildvortrag mit Seenotretter Gerald Karl',
			start: '2023-03-31T17:00:00.000Z',
			end: '2023-03-31T19:00:00.000Z',
			location: 'Fürth',
			location_detail: 'Zukunftsaloon TAtaA!, Marktplatz 4',
			coordinates: '49.47886061459069, 10.994805040338743',
			link: null,
			group: {
				data: {
					attributes: {
						city: {
							data: {
								attributes: {
									name: 'Fürth',
									slug: 'fuerth',
									federal_country: {
										data: {
											attributes: {
												slug: 'bayern',
												country: {
													data: {
														attributes: {
															slug: 'deutschland'
														}
													}
												}
											}
										}
									}
								}
							}
						},
						localizations: {
							data: [
								{
									attributes: {
										content: [
											{},
											{
												__typename: 'ComponentSharedBlocksContact',
												email: 'seebrueckefuerth@gmx.de'
											},
											{}
										]
									}
								}
							]
						}
					}
				}
			}
		}
	}), {
		uid: '903',
		title: 'Bildvortrag mit Seenotretter Gerald Karl – Seebrücke Fürth',
		url: 'https://seebruecke.org/aktionen/bildvortrag-mit-seenotretter-gerald-karl',
		location: 'Zukunftsaloon TAtaA!, Marktplatz 4, Fürth',
		geo: { lat: 49.47886061459069, lon: 10.994805040338743, radius: 100 },
		organizer: {
			name: 'Seebrücke Fürth',
			email: 'seebrueckefuerth@gmx.de',
			dir: 'https://seebruecke.org/mach-mit/deutschland/bayern/fuerth'
		},
		start: [2023, 3, 31, 19, 0],
		startInputType: 'local',
		startOutputType: 'local',
		end: [2023, 3, 31, 21, 0]
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
