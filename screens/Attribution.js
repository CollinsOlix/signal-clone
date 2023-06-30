import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const Attribution = ({ navigation }) => {
  useLayoutEffect(() =>
    navigation.setOptions({
      title: "Special Thanks",
    })
  ,[]);
  return (
    <View>
      <Text>Attribution</Text>
    </View>
  );
};

export default Attribution;

const styles = StyleSheet.create({});
