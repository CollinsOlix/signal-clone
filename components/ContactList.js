import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Contact from "./Contact";
import { UserContext } from "../contexts/UserContext";
import { ChatInfoContext } from "../contexts/ChatInfoContext";
const ContactList = ({ navigation }) => {
  const { user, chatsValue } = useContext(UserContext);
  const { chatHook } = useContext(ChatInfoContext);
  const [chats, setChats] = chatsValue;
  return (
    <ScrollView style={{ width: "100%", height: "100%" }}>
      {chats.map(({ id, data }) => (
        <View key={Math.random() * 3.2}>
          <Contact
            contact={user}
            key={id}
            id={id}
            data={data}
            navigation={navigation}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default ContactList;

const styles = StyleSheet.create({});
