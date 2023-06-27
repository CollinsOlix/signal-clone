import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const NewContact = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add new Contact",
      headerBackTitle: "Chats",
      
    });
  });
  return (
    <View>
      <Text>NewContact</Text>
    </View>
  );
};

export default NewContact;

const styles = StyleSheet.create({});
