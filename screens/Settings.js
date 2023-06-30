import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const Settings = ({ navigation }) => {
  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: "Settings",
      }),
    []
  );
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
