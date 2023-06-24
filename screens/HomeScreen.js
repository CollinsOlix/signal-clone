import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { auth } from "../firebase";
import { UserContext } from "../contexts/UserContext";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/themed";
import ContactList from "../components/ContactList";
import { Icon } from "@rneui/base";
import Modall from "../components/Modall";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerTintColor: "black",
      headerStyle: { backgroundColor: "white" },
      headerLeft: () => (
        <TouchableOpacity onPress={logUserOut}>
          <Avatar source={{ uri: user.photoURL }} rounded size={40} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Icon
              color="#1c1c1c"
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
              color="#1c1c1c"
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
    <View style={{ position: "relative" }}>
      <StatusBar style="auto" />
      <View style={styles.modal}>
        <Modall navigation={navigation}/>
      </View>
      <View style={styles.screen}>
        <ContactList />
      </View>
    </View>
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
  },
});
export default HomeScreen;
