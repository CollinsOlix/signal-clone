import { Icon, ListItem } from "@rneui/base";
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
  const { user, userLoggedOut } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = userLoggedOut;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}
        onTouchStart={()=>setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#4477eb",
                paddingHorizontal: 35,
                borderWidth: 3,
                borderColor: "#4477eb",
                borderStyle: "solid",
                marginBottom: 20,
                borderTopRightRadius: 7,
                borderTopLeftRadius: 7,
              }}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    fontWeight: "500",
                    color: "white",
                  },
                ]}
              >
                Easy Access
              </Text>
            </View>
            <View style={{ alignItems: "center", marginBottom: 15 }}>
              <Avatar source={{ uri: user.photoURL }} size={200} rounded />
            </View>

            <View>
              <TouchableOpacity
                style={{
                  borderColor: "#c7c7c7",
                  borderStyle: "solid",
                  borderTopWidth: 1,
                  marginBottom: 2,
                }}
                onPress={() => navigation.navigate("Settings")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 12,
                    fontSize: 20,
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderColor: "#c7c7c7",
                  borderStyle: "solid",
                  borderTopWidth: 1,
                  marginBottom: 2,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 12,
                    fontSize: 20,
                  }}
                >
                  Attribution
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonClose,
            { backgroundColor: "#f13030", borderRadius: 0 },
          ]}
          onPress={() => {
            setModalVisible(!modalVisible);
            auth.signOut();
            setLoggedOut(true);
            navigation.replace("Login");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              color: "white",
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
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
    // paddingVertical: 15,
    borderRadius: 10,
    // alignItems: "center",
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
