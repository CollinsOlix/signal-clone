import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Contact from "./Contact";
import { UserContext } from "../contexts/UserContext";
import { fireStore } from "../FireBase.config";
const ContactList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(UserContext);
  let radd = [];
  useEffect(() => {
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
        console.log(chats);
        console.log(radd);
      }
    };
    retrieveChats();
    // return retrieveChats;
  }, []);
  // retrieveChats();
  return (
    <ScrollView style={{ width: "100%" }}>
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
