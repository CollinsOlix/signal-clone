import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { auth } from "../FireBase.config";
import { UserContext } from "../contexts/UserContext";
import { ChatInfoContext } from "../contexts/ChatInfoContext";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/themed";
import ContactList from "../components/ContactList";
import { Icon } from "@rneui/base";
import AddNewModal from "../components/AddNewModal";
import UserModal from "../components/UserModal";

const HomeScreen = ({ navigation }) => {
  const { user, currentTheme } = useContext(UserContext);

  const openChatWithInfo = (id, data) => {
    navigation.navigate("ChatScreen", {
      id,
      data,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerTintColor: currentTheme[0].text,
      headerStyle: { backgroundColor: currentTheme[0].headerColor },
      headerLeft: () => (
        <TouchableOpacity
          // onPress={logUserOut}
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
            marginTop: 0,
          }}
        >
          <UserModal navigation={navigation} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Icon
              color="white"
              containerStyle={{}}
              disabledStyle={{}}
              iconProps={{}}
              iconStyle={{}}
              name="search"
              onLongPress={() => console.log("onLongPress()")}
              onPress={() => console.log("onPress()")}
              size={35}
              type="material"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              color="white"
              containerStyle={{}}
              disabledStyle={{}}
              iconProps={{}}
              iconStyle={{}}
              name="more-vert"
              onLongPress={() => console.log("onLongPress()")}
              onPress={() => console.log("onPress()")}
              size={35}
              type="material"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  });
  const logUserOut = () => {
    auth.signOut();
    navigation.replace("Register");
  };
  return (
    <ChatInfoContext.Provider
      value={{
        openChatWithInfo,
      }}
    >
      <View style={{ position: "relative", flex: 1 }}>
        <StatusBar style="auto" />
        <View style={styles.modal}>
          <AddNewModal navigation={navigation} />
        </View>
        <View style={styles.screen}>
          <ContactList navigation={navigation} />
        </View>
      </View>
    </ChatInfoContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    zIndex: 1,
    position: "relative",
  },
  modal: {
    position: "absolute",
    zIndex: 2,
    right: 50,
    bottom: 75,
    flex: 1,
  },
});
export default HomeScreen;
