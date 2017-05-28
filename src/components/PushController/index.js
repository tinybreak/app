import React, { Component } from "react";

import { Platform } from "react-native";

import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from "react-native-fcm";

import firebaseClient from "../../services/firebase";
const Analytics = require("react-native-firebase-analytics");

const ONE_MINUTE = 1000 * 60 * 60;

const getValue = delta =>
  (delta < ONE_MINUTE ? 2 : delta < ONE_MINUTE * 5 ? 1 : 0);

export default class PushController extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.props.onChangeToken(token);
    });

    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif);
      if (notif.local_notification) {
        return;
      }
      if (notif.opened_from_tray) {
        const delta = Date.now() - notif["google.sent_time"];
        const value = getValue(delta);

        Analytics.logEvent("notification_reply", {
          value,
          delta,
        });

        return;
      }
      this.showLocalNotification(notif);
    });

    FCM.subscribeToTopic("/topics/notification");

    Analytics.setUserId("<user_id>");
    // Analytics.setUserProperty('setting', 'bar');

    this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
      console.log("Notification", notif);
      if (notif.opened_from_tray) {
        const delta = 0;
        const value = getValue(delta);

        Analytics.logEvent("notification_reply", {
          value,
          delta,
        });

        return;
      }
      if (notif.local_notification) {
        return;
      }
      this.showLocalNotification(notif);
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
      this.props.onChangeToken(token);
    });
  }

  showLocalNotification(notif) {
    FCM.presentLocalNotification({
      title: notif.title,
      body: notif.body,
      priority: "high",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true,
    });
  }

  componentWillUnmount() {
    this.notificationListner.remove();
    this.refreshTokenListener.remove();
  }

  render() {
    return null;
  }
}
