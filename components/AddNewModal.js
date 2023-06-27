import { Icon } from "@rneui/base";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

const AddNewModal = ({ navigation }) => {
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
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New</Text>
            <Pressable
              style={[styles.button, styles.buttonClose, { marginBottom: 10 }]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("NewContact");
              }}
            >
              <Text style={styles.textStyle}>Add New Contact</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { marginBottom: 10, paddingHorizontal: 20 },
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("NewContact");
              }}
            >
              <Text style={styles.textStyle}>Add New Chat</Text>
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

      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" color={"#4477eb"} size={20} raised />
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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

export default AddNewModal;
