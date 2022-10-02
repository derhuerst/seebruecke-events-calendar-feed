import createFeedRoute from 'ics-service/feed.js'
import {getIcs} from '../ics.js'

const feedRoute = createFeedRoute(getIcs)

export {
	feedRoute as route,
}
