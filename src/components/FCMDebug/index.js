import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from "react-native";

import PushController from "../PushController";
import firebaseClient from "../../services/firebase";

const sendNotification = token => {
  const data = {
    to: token,
    data: {
      title: "FCM Debug",
      body: "This is a notification",
      sound: "default",
      click_action: "fcm.ACTION.REPLY",
      remote: true,
    },
    priority: "high",
  };
  firebaseClient.push(data, "data");
};

export default class FCMDebug extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: "",
    };
  }

  render() {
    let { token, tokenCopyFeedback } = this.state;

    return (
      <View style={styles.container}>
        <PushController
          onChangeToken={token => this.setState({ token: token || "" })}
        />
        <Text
          selectable={true}
          onPress={() => this.setClipboardContent(this.state.token)}
          style={styles.instructions}
        >
          Token: {this.state.token}
        </Text>

        <Text style={styles.feedback}>
          {this.state.tokenCopyFeedback}
        </Text>

        <TouchableOpacity
          onPress={() => sendNotification(token)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>
      </View>
    );
  }

  setClipboardContent(text) {
    Clipboard.setString(text);
    this.setState({ tokenCopyFeedback: "Token copied to clipboard." });
    setTimeout(() => {
      this.clearTokenCopyFeedback();
    }, 2000);
  }

  clearTokenCopyFeedback() {
    this.setState({ tokenCopyFeedback: "" });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 2,
  },
  feedback: {
    textAlign: "center",
    color: "#996633",
    marginBottom: 3,
  },
  button: {
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 4,
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent",
  },
});
