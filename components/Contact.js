import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Avatar, Button, ListItem } from "@rneui/themed";
import { UserContext } from "../contexts/UserContext";
import { ChatInfoContext } from "../contexts/ChatInfoContext";

const Contact = (props) => {
  const {
    contact,
    id,
    data,
    navigation,
  } = props;
  const { openChatWithUserInfo } = useContext(ChatInfoContext);
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
          //   onPress={() => reset()}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <TouchableOpacity>
        <Avatar rounded source={{ uri: contact.photoURL }} size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openChatWithUserInfo(id, data)}>
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
