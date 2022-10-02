import createAboutRoute from 'ics-service/about.js'

const aboutRoute = createAboutRoute(
	`Seebrücke events`,
	'/api/feed',
)

export {
	aboutRoute as route,
}
