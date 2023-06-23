import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState, useRef } from "react";
import { Signal } from "../assets/svgAssets";
import { Icon } from "@rneui/themed";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const filter =
  /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
const isMail = (str) => str.search(filter) == 0;

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const register = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        // console.log("auth.currentUser", auth.currentUser);
        try {
          console.log("name before function call ", firstName);
          updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            photoUrl: `https://th.bing.com/th/id/R.ea35c4313d1f00baf9c31c463d7d1810?rik=%2bR6Y5oB6P5Xq5Q&pid=ImgRaw&r=0`,
          });
        } catch (error) {
          console.error(error);
        }
      });
      navigation.replace("Home");
    } catch (error) {
      console.error(error);
    } finally {
      console.log("new Auth.user", auth.currentUser.displayName);
      console.log("name after function call ", firstName);
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const eAddress = useRef();
  const fName = useRef();
  const lName = useRef();
  const passkey = useRef();
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text
        style={{
          color: "#4477eb",
          fontWeight: "bold",
          fontSize: 23,
          margin: 20,
        }}
      >
        Welcome to Signal!
      </Text>
      <Signal size="150" />
      <Text
        style={{
          color: "#4477eb",
          fontWeight: "bold",
          fontSize: 23,
          marginTop: 20,
        }}
      >
        Create an account
      </Text>
      <View style={styles.inputAreas}>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#4477eb",
            borderRadius: 7,
            marginVertical: 5,
          }}
        >
          <TextInput
            ref={fName}
            placeholder="First Name"
            value={firstName}
            enterKeyHint="next"
            returnKeyType="next"
            textContentType="givenName"
            style={{ fontSize: 18 }}
            onChangeText={(text) => {
              setFirstName(text);
            }}
            onSubmitEditing={(e) => {
              e.preventDefault();
              lName.current.focus();
            }}
          />
        </View>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#4477eb",
            borderRadius: 7,
            marginVertical: 5,
          }}
        >
          <TextInput
            ref={lName}
            placeholder="Last Name"
            value={lastName}
            enterKeyHint="next"
            returnKeyType="next"
            cursorColor={"black"}
            textContentType="familyName"
            style={{ fontSize: 18 }}
            onChangeText={(text) => {
              setLastName(text);
            }}
            onSubmitEditing={(e) => {
              e.preventDefault();
              eAddress.current.focus();
            }}
          />
        </View>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#4477eb",
            borderRadius: 7,
            marginVertical: 5,
          }}
        >
          <TextInput
            ref={eAddress}
            placeholder="Email"
            value={email}
            enterKeyHint="next"
            returnKeyType="next"
            textContentType="emailAddress"
            style={{ fontSize: 18 }}
            onChangeText={(text) => {
              text = text.toLowerCase();
              console.log(text);
              setEmail(text);
            }}
            onSubmitEditing={(e) => {
              e.preventDefault();
              isMail(email)
                ? passkey.current.focus()
                : eAddress.current.focus();
            }}
          />
        </View>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#4477eb",
            borderRadius: 7,
            marginVertical: 5,
          }}
        >
          <TextInput
            maxLength={12}
            ref={passkey}
            secureTextEntry={showPassword}
            placeholder="Password"
            textContentType="password"
            style={{ fontSize: 18 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View>
            {showPassword ? (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name="eye" type="ionicon" size={30} color={"#4477eb"} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name="eye-off"
                  type="ionicon"
                  size={30}
                  color={"#4477eb"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.loginBtn}>
        <View style={{ width: 200 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#4477eb" />
          ) : (
            <Button
              title="Sign up"
              color={"#4477E8"}
              onPress={() => {
                register();
                console.log("fName", firstName);
              }}
            />
          )}
        </View>
        <View style={styles.signUp}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={{ color: "#4477eb", fontWeight: "bold" }}>
              {" "}
              Log in
            </Text>
          </TouchableOpacity>
          <Text> instead</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    width: 200,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  signUp: {
    flexDirection: "row",
    marginTop: 20,
  },
  inputAreas: {
    marginTop: 20,
    width: 200,
  },
});

export default RegisterScreen;
