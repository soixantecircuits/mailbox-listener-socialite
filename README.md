# mailbox-listener-socialite

Listen a mailbox to upload all attachments received to the socialite platform

## ❓Why ?

We can create a bucket or upload a media just by sending an e-mail.

## 🌍 Installation

Once you cloned this repo, go in the project folder and run `yarn install`

## ⚙ Configuration

Fill the settings file in the folder settings:

```
{
    "service":{
        "mail":{
            "username": "yourmail@gmail.com",
            "password": "password",
            "host": "imap.gmail.com",
            "port": 993, 
            "tls": true,
            "connTimeout": 10000,
            "authTimeout": 5000, 
            "debug": null,
            "tlsOptions": { "rejectUnauthorized": false },
            "mailbox": "INBOX", 
            "searchFilter": ["UNSEEN"], 
            "markSeen": true, 
            "fetchUnreadOnStart": true,
            "attachments": true, 
            "attachmentOptions": { "directory": "attachments/" }
        },
        "firebase":{
            "key":{
                "path":"/home/.json"
            },
            "database":{
                "name": "feed"
            }
        },
        "storage":{
            "name":"xx"
        },
        "buckets":{
            "default":{
                "name":"your default event-bucket slug",
                "token":"your default event-bucket token"
            },
            "your event-bucket slug":{
                "token":"your event-bucket token"
            }
        },
        "socialiteAPI":{
            "URL": "socialite API url"
        }
    }
}
```
In the fileds buckets, you can enter all your active event-bucket with their token. Then when a mail is sent with a name of an active event-bucket in the header, the medi will be upload to this event-bucket.
## 👋 Usage

Run app.js. 
Send a mail to the mail address in the settings.json.
In this mail you can add 2 headers :
x-event : the event-bucket where the media will be upload
x-from : the mail address wich will be used to send the bucket