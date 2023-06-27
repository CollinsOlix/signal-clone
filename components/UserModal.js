import { Icon } from "@rneui/base";
import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Avatar } from "@rneui/themed";
import { auth } from "../FireBase.config";

const UserModal = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.modalText,
                {
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  paddingHorizontal: 35,
                },
              ]}
            >
              Easy Access
            </Text>
            <Avatar source={{ uri: user.photoURL }} size={250} />

            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {
                  marginBottom: 10,
                  backgroundColor: "red",
                  marginVertical: 10,
                  width: "100%",
                },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                auth.signOut();
                navigation.replace("Login");
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
                Sign Out
              </Text>
            </Pressable>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="close" color={"white"} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
        <Avatar source={{ uri: user.photoURL }} rounded size={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    paddingVertical: 35,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#4477eb",
  },
  buttonClose: {
    backgroundColor: "#4477eb",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
});

export default UserModal;
