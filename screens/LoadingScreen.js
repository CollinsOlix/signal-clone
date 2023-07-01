import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Signal } from "../assets/svgAssets";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../FireBase.config";

const LoadingScreen = ({ navigation }) => {
  const { currentTheme, helperTextValue, chatsValue, userSignedIn } =
    useContext(UserContext);
  const [helperText] = helperTextValue;
  const [chats, setChats] = chatsValue;
  const [signedIn] = userSignedIn;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    const retrieveChats = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireStore, "chats"));
        setChats(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      } catch (e) {
        console.log("error is: ", e);
      } finally {
        navigation.replace("Home");
      }
    };
    signedIn && retrieveChats();
  }, [signedIn]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: currentTheme[0].headerColor,
        position: "relative",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <Signal size="200" fill={currentTheme[0].text} />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 140,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: currentTheme[0].text,
          }}
        >
          {helperText}
        </Text>
        <ActivityIndicator size="large" color={currentTheme[0].text} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
