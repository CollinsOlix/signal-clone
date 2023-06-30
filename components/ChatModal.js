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

const ChatModal = (props) => {
  const { user, userLoggedOut } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = userLoggedOut;
  const [modalVisible, setModalVisible] = useState(false);
  const { data, id, size } = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.centeredView}
          onTouchStart={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={{ alignItems: "center", margin: 15, width: 300 }}>
              <Avatar
                source={{
                  uri:
                    data.image == undefined
                      ? `https://th.bing.com/th/id/OIP.uF0qJ_YJu51rNAsvMii1lAHaHa?pid=ImgDet&rs=1`
                      : data.image,
                }}
                size={250}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 30, fontWeight: "700" }}
              >
                {data.chatName}
              </Text>
            </View>

            <View></View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
      >
        <Avatar
          rounded
          source={{
            uri:
              data.image == undefined
                ? `https://th.bing.com/th/id/OIP.uF0qJ_YJu51rNAsvMii1lAHaHa?pid=ImgDet&rs=1`
                : data.image,
          }}
          size={size}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
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

export default ChatModal;
