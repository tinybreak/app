# tiny[. . .]break
- Sends friendly reminders to be mindful evey hour during the day (configurable)
- Reply with an emoji
- Analytics

### Platform architecture
```
  [ CRON server ]
        v
        |
      hourly
        |
        v                    channels
[ NotificationPusher ] - < - messages - < - [ Firebase DB ]
        v                    users
        |
     message
        |
        v
    [ Client ] - > - [ Analytics ]
```
#### Notification pusher
- App Engine
  - ~~Scheduled publishing to topic: ´hourly-tick`~~

- Firebase functions
  - ~~Listen to topic `hourly-tick`~~
  - ~~Get random message~~
  - ~~Publish to topic `notification`~~
  - Make a predefined queue to prevent duplicate messages

#### Client
- ~~Subscribe user to notifications~~
  - Display if within configure time window
- ~~Display notification~~
- ~~Send to analytics (`react-native-firebase-analytics`)~~
  - reply + time delta (needed?)
- Display charts from analytics
- Notification settings
  - Configure from-to time window (or selected hours)
  - Configure subscription channels

#### Admin dashboard
- Create / Edit and Delete messages
- Analytics

#### Firebase DB
- ~~Store messages~~
- Store channels
- Store users

```js
{
  messages: {
    [msgId]: {
      title: <title>
      body: <body>
    }
  } /*,
  TODO:
  channels: {
    [channelId]: {
      ...
      messages: [msgId]
    }
  },
  users: {
    [userId]: {
      ...
      settings: {

      }
    }
  }*/
}
```
