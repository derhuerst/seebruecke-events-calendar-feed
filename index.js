'use strict'

const connect = require('connect')
const {createServer} = require('http')
const about = require('./api')
const feed = require('./api/feed')

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
