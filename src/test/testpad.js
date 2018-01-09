let moment = require('moment')

let timeLocal = '2015-01-30T10:00:00'

console.log(timeLocal)

let time = moment(timeLocal)
console.log('local', time)
console.log('zulu', time.utc().toDate())
