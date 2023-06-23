import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const logUserOut = () => {
    auth.signOut();
    navigation.replace("Register");
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="A button" onPress={logUserOut} />
    </View>
  );
};

export default HomeScreen;
