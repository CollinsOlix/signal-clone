import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Button } from "@rneui/base";
import { UserContext } from "../contexts/UserContext";
import { fireStore } from "../FireBase.config";
import { collection, addDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(fireStore, "chats"), {
        chatName: userInput,
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Chats",
    });
  },[]);
  const { currentTheme } = useContext(UserContext);
  const [userInput, setUserInput] = useState("");
  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <TextInput
        placeholder="Chat name goes here"
        value={userInput}
        autoFocus
        style={{
          marginVertical: 10,
          borderWidth: 3,
          borderRadius: 7,
          padding: 7,
          borderColor: currentTheme[0].headerColor,
        }}
        onChangeText={(text) => setUserInput(text)}
        onSubmitEditing={createChat}
      ></TextInput>
      <Button color={currentTheme[0].headerColor} onPress={createChat}>
        Add Chat
      </Button>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({});
