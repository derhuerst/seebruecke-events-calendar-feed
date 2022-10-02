import {runTests as runEventsTests} from './events.js'

;(async () => {
	await runEventsTests()

	console.info('seems to work ✓')
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
