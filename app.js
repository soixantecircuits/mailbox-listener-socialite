'use strict'

var MailListener = require('mail-listener-fixed')
const settings = require('standard-settings').getSettings()
settings.service.mail.debug = console.log
var mailListener = new MailListener(settings.service.mail)
var admin = require('firebase-admin')
const request = require('request')
const fs = require('fs')
const S = require('string')
const gm = require('gm').subClass({imageMagick: true})

var serviceAccount = require(settings.service.firebase.key.path)

let HeaderX = {
  'eventKey': 'x-event',
  'from': 'x-from'
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${settings.service.firebase.database.name}.firebaseio.com`,
  storageBucket: `${settings.service.storage.name}.appspot.com`
})

mailListener.start() // start listening

mailListener.on('server:connected', () => {
  console.log('imapConnected')
})

mailListener.on('server:disconnected', () => {
  console.log('imapDisconnected')
  mailListener.start()
})

mailListener.on('error', (err) => {
  console.log(err)
})

mailListener.on('mail', (mail, seqno, attributes) => {
  console.log(mail.headers)
  if (mail.attachments) {
    uploadFile(mail, mail.attachments[0], mail.from, mail.subject, mail.html)
  }
  console.log('emailParsed', mail.attachments)
  console.log('emailParsed', mail.from)
  console.log('emailParsed', mail.subject)
})

mailListener.on('attachment', function (attachment) {
  console.log(attachment.path)
})

let uploadFile = (mail, file, from, subject, html) => {
  // auto-orient an image
  gm(file.path)
  .autoOrient()
  .write(file.path, function (err) {
    var fromMail = from[0].address
    var eventbucket = settings.service.buckets.default.name
    var eventbuckettoken = settings.service.buckets.default.token
    if (S(mail.headers[HeaderX.eventKey]).slugify().s) {
      if (settings.service.buckets[S(mail.headers[HeaderX.eventKey]).slugify().s]) {
        eventbucket = S(mail.headers[HeaderX.eventKey]).slugify().s
        eventbuckettoken = settings.service.buckets[eventbucket].token
      }
    }

    if (mail.headers[HeaderX.from]) {
      fromMail = mail.headers[HeaderX.from]
    }
    var formData = {
      name: file.fileName,
      file: fs.createReadStream(file.path),
      token: eventbuckettoken,
      bucket: eventbucket,
      mailto: fromMail
    }

    request.post({url: settings.service.socialiteAPI.URL, formData: formData}, function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err)
      } else {
        console.log('Upload successful!  Server responded with:', body)
      }
    })
    if (err) {
      console.error(err)
    }
  })

}
