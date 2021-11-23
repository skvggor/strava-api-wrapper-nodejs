const axios = require('axios')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const apiUrl = 'https://www.strava.com/api/v3/athletes/'
const endpoint = '/stats'
const apiToken = process.env.STRAVA_API_TOKEN
const userId = process.env.STRAVA_USER_ID
const apiHeaders = { headers: { 'Authorization': `Bearer ${apiToken}` } }

axios.get(`${apiUrl}${userId}${endpoint}`, apiHeaders)

  .then((response) => {
    app.get('/strava-stats', (req, res) => {
      res.end(JSON.stringify({
        status: 'OK',
        distanceInMeters: response.data.ytd_ride_totals.distance
      }))
    })

    app.listen(port)
  })

  .catch((error) => {
    console.error('INDEX.JS | AXIOS.GET ', error.response.data)
  })
