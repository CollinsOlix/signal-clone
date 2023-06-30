import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar, Icon } from "@rneui/base";
import ChatModal from "../components/ChatModal";

const ChatScreen = ({ navigation, route: { params } }) => {
  const { data, id } = params;
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
    });
  }, []);
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
