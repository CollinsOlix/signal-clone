import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useContext } from "react";
import Contact from "./Contact";
import { UserContext } from "../contexts/UserContext";

const arrDee = [];
const ContactList = ({navigation}) => {
  const { user } = useContext(UserContext);
  return (
    <ScrollView style={{ width: "100%" }}>
      {arrDee.map(() => (
        <View key={Math.random() * 3.2}>
          <Contact contact={user} navigation={navigation}/>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContactList;

const styles = StyleSheet.create({});
