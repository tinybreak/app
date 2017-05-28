import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FCMDebug from "./components/FCMDebug";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FCMDebug />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
