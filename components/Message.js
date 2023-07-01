import { View, Text } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";
import { Icon } from "@rneui/base";

const Message = (props) => {
  const { user } = useContext(UserContext);
  const { message, time, userid } = props;
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onLongPress={() => {
          "pressed long";
        }}
        style={{
          position: "relative",
          flex: 1,
          backgroundColor: "green",
          paddingTop: 10,
        }}
      >
        <View
          style={[
            styles.notch,
            {
              right: userid === user.uid ? -5 : -190,
              borderTopColor:
                userid === user.uid ? "rgb(31,44,52)" : "rgb(0,93,75)",
            },
          ]}
        ></View>
        <View
          style={[
            styles.message,
            {
              right: userid == user.uid ? -7 : -100,
              backgroundColor:
                userid === user.uid ? "rgb(31,44,52)" : "rgb(0,93,75)",
            },
          ]}
        >
          <Text style={styles.text}>{message}</Text>
          <View style={styles.timeAndCheck}>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: "white",
                fontSize: 12,
                marginRight: 5,
              }}
            >
              {time}
            </Text>
            {/* <FontAwesomeIcon icon={faCheck} size={15} /> */}
            <Icon size={15} name="check" color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    backgroundColor: "rgb(200,93,75)",
  },
  notch: {
    position: "relative",
    backgroundColor: "rgb(0,93,75)",

    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 15,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "rgb(0,93,75)",
    borderRadius: 10,
    // marginTop: 7,
    zIndex: 1,
  },
  message: {
    // left: 0,
    zIndex: 2,
    maxWidth: "70%",
    backgroundColor: "rgb(0,93,75)",
    position: "relative",
    borderRadius: 10,
    // margin: 7,
    padding: 10,
    paddingBottom: 5,
    minHeight: 50,
    bottom: 15,
    flex: 1,
  },
  text: {
    color: "#fafefc",
    fontSize: 18,
    textAlign: "right",
  },
  timeAndCheck: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 4,
  },
});

export default Message;
