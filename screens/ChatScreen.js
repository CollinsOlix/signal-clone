import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Keyboard,
  TextInput,
  Platform,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Avatar, Icon } from "@rneui/base";
import ChatModal from "../components/ChatModal";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../contexts/UserContext";
import { auth, fireStore } from "../FireBase.config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import Message from "../components/Message";

const ChatScreen = ({
  navigation,
  route: {
    params: { data, id },
  },
}) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    try {
      const newDocRef = await addDoc(
        collection(fireStore, "chats", id, "messages"),
        {
          timestamp: serverTimestamp(),
          message: userInput,
          displayName: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
          userid: auth.currentUser.uid,
        }
      );
      console.log("Document created with ID: ", newDocRef.id);
    } catch (e) {
      console.log("Error creating message: ", e);
    }
    setUserInput("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data.chatName,
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" color="#fff" size={28} />
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <ChatModal data={data} id={id} size={35} />
          </View>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Icon name="videocam" color="#fff" size={39} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="call" color="#fff" size={33} />
          </TouchableOpacity>
        </View>
      ),
    });
    const retrieveMessages = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(fireStore, "chats", id, "messages"),
          orderBy("timestamp", "desc")
        );
        setMessages(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      } catch (e) {
        console.log("error is: ", e);
      } finally {
        console.log(messages.length);
      }
    };
    retrieveMessages();
  }, [messages.length]);
  const {
    currentTheme: [currentTheme],
  } = useContext(UserContext);
  // sendMessage();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.backdrop,
      }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        onTouchStart={() => Keyboard.dismiss()}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <>
          <ScrollView style={{ backgroundColor: "red"}}>
            {messages.map(({ data: { uid, message, timestamp }, id }) => (
              <Message
                key={id}
                userid={uid}
                time={timestamp.toLocaleString()}
                message={message}
              />
            ))}
          </ScrollView>
          <View
            style={[
              styles.footer,
              {
                backgroundColor: currentTheme.headerColor,
              },
            ]}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Type a Message here"
              value={userInput}
              onChangeText={(text) => setUserInput(text)}
              cursorColor="black"
              multiline
            />
            <TouchableOpacity onPress={sendMessage}>
              <Icon
                name="send"
                type="font-awesome"
                color={currentTheme.backdrop}
                size={25}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    fontSize: 20,
  },
});
