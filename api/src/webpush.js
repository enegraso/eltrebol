const webpush = require('web-push')

webpush.setVapidDetails(
    "mailto: webapp@chacinadoseltrebol.ar",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

module.exports = webpush
// console.log("Publica",process.env.PUBLIC_VAPID_KEY,"publica",process.env.PRIVATE_VAPID_KEY)
