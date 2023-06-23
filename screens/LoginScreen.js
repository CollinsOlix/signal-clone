import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Signal } from "../assets/svgAssets";
import { Icon } from "@rneui/themed";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const filter =
  /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
const isMail = (str) => str.search(filter) == 0;
const LoginScreen = ({ navigation }, props) => {
  const [user, setUser] = useState(null);
  const logUserIn = async () => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in");
      navigation.replace("Home");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const eAddress = useRef();
  const passkey = useRef();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        style={{
          color: "#4477eb",
          fontWeight: "bold",
          fontSize: 23,
          margin: 20,
        }}
      >
        Welcome back!
      </Text>
      <Signal size="200" />
      <Text
        style={{
          color: "#4477eb",
          fontWeight: "bold",
          fontSize: 23,
          marginTop: 20,
        }}
      >
        Login to get started
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
            ref={eAddress}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            enterKeyHint="next"
            returnKeyType="next"
            textContentType="emailAddress"
            style={{ fontSize: 18 }}
            onChangeText={(text) => {
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
            autoCapitalize="none"
            ref={passkey}
            secureTextEntry={showPassword}
            placeholder="Password"
            textContentType="password"
            style={{ fontSize: 18 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={(e) => {
              e.preventDefault();
              logUserIn();
            }}
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#4477eb" />
        ) : (
          <Button title="Log in" color={"#4477E8"} onPress={logUserIn} />
        )}
        <View style={styles.signUp}>
          <Text>New to Signal?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#4477eb", fontWeight: "bold" }}>
              {" "}
              Sign Up
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

export default LoginScreen;
