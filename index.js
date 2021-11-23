const axios = require('axios')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const apiBaseUrl = 'https://www.strava.com/api/v3/'

const endpoints = {
  athletes: '/athletes',
  stats: '/stats',
  oauthToken: '/oauth/token',
}

const CLIENT_ID = process.env.STRAVA_CLIENT_ID
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN
const USER_ID = process.env.STRAVA_USER_ID

axios.post(`${apiBaseUrl}${endpoints.oauthToken}`, {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  grant_type: 'refresh_token',
  refresh_token: REFRESH_TOKEN,
})

.then((response) => {
  const ACCESS_TOKEN = response.data.access_token
  const apiHeaders = { headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` } }

    axios.get(`${apiBaseUrl}${endpoints.athletes}/${USER_ID}${endpoints.stats}`, apiHeaders)

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
  })

  .catch((error) => {
    console.error('file: index.js > axios.post ', error.response.data)
  })
