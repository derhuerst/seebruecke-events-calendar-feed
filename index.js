import connect from 'connect'
import {createServer} from 'http'
import {route as about} from './api/index.js'
import {route as feed} from './api/feed.js'

const app = connect()

app.use('/api/feed', feed)
app.use('/', about)
app.use((req, res) => {
	res.writeHead(404, 'not found')
	res.end('not found')
})

const port = parseInt(process.env.PORT || 3000)
createServer(app).listen(port, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	} else console.info('listening on ' + port)
})
