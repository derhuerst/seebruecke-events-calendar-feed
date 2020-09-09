'use strict'

const feedRoute = require('ics-service/feed')
const getIcs = require('../ics')

module.exports = feedRoute(getIcs)
