const MailListener = require('mail-listener-fixed')
const standardSettings = require('standard-settings')
const settings = standardSettings.getSettings()
//const request = require('request')
var mailListener = new MailListener(settings.service.mail)

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
  if (mail.attachments) {
    //uploadFile(mail.attachments[0], mail.from, mail.subject, mail.html)
  }
  console.log('emailParsed', mail.attachments)
  console.log('emailParsed', mail.from)
  console.log('emailParsed', mail.subject)
})

mailListener.on('attachment', function (attachment) {
  console.log(attachment.path)
})

let uploadToSocialite = (mail, file, from, html) => {
  /* var formData
  if (mail.headers.has('X-Header-Event')) {
    formData = {
      name: file.fileName,
      file: file.content,
      token: settings.service.buckets[mail.headers.get('X-Header-Event')].token,
      bucket: mail.headers.get('X-Header-Event'),
      mailto: from
    }
  } else {
    formData = {
      name: file.fileName,
      file: file.content,
      token: settings.service.buckets.default.token,
      bucket: settings.service.buckets.default.name,
      mailto: from
    }
  }

  request.post({url: settings.service.socialiteAPI.URL, formData: formData}, function optionalCallback (err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err)
    } else {
      console.log('Upload successful!  Server responded with:', body)
    }
  }) */
  console.log('lololo')
}
