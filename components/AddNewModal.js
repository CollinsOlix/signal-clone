import { Icon } from "@rneui/base";
import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";

const AddNewModal = ({ navigation }) => {
  const { currentTheme } = useContext(UserContext);
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
                navigation.navigate("AddChat");
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
        style={[
          styles.button,
          { backgroundColor: currentTheme[0].headerColor },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" color={currentTheme[0].headerColor} size={22} raised />
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
