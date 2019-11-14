const client = require('uccx-config-client')
const uccx = new client({
  url: process.env.UCCX_URL,
  username: process.env.UCCX_USERNAME,
  password: process.env.UCCX_PASSWORD
})

module.exports = uccx
