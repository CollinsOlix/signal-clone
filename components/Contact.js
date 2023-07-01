import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { Avatar, Button, ListItem } from "@rneui/themed";
import { UserContext } from "../contexts/UserContext";
import { ChatInfoContext } from "../contexts/ChatInfoContext";
import ChatModal from "./ChatModal";
import { fireStore } from "../FireBase.config";

const Contact = (props) => {
  const { contact, id, data, navigation } = props;
  const { openChatWithInfo } = useContext(ChatInfoContext);
  return (
    <ListItem.Swipeable
      key={id}
      bottomDivider
      leftContent={(reset) => (
        <Button
          title="Archive"
          //   onPress={() => reset()}
          icon={{ name: "archive", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={async () => {
            try {
              await deleteDoc(doc(fireStore, "chats", id));
              reset();
              console.log("Deleting File");
            } catch (e) {
              console.log("error Deleting file: ", e);
            } finally {
              navigation.replace("LoadingScreen");
            }
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <TouchableOpacity onPress={() => alert("pressed")}>
        <ChatModal data={data} id={id} size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChatWithInfo(id, data)}>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800", fontSize: 18 }}>
            {data.chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            I recieved your last message thanks
          </ListItem.Subtitle>
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </TouchableOpacity>
    </ListItem.Swipeable>
  );
};

export default Contact;

const styles = StyleSheet.create({});
