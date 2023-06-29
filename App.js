import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase.config";
import { UserContext } from "./contexts/UserContext";
import NewContact from "./screens/NewContact";
import ChatScreen from "./screens/ChatScreen";
import Settings from "./screens/Settings";
import Attribution from "./screens/Attribution";
import AddChatScreen from "./screens/AddChatScreen";

const themes = {
  light: {
    backdrop: "#ececec",
    text: "#1c1c1c",
    headerColor: "rgb(10,90,231)",
  },
  dark: {
    backdrop: "#131313",
    text: "#ececec",
    headerColor: "#1417bb",
  },
};
const Stack = createNativeStackNavigator();
export default function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.dark);
  const [user, setUser] = useState(null);
  const [goHome, setGoHome] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setGoHome(true);
      }
    });
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        user: user,
        userLoggedOut: [loggedOut, setLoggedOut],
        themes,
        currentTheme: [currentTheme, setCurrentTheme],
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={goHome ? "Home" : "Login"}
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.headerColor,
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login to Signal",
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Sign up for Signal",
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="NewContact"
            component={NewContact}
            options={{
              title: "New Contact",
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="AddChat"
            component={AddChatScreen}
            options={{
              title: "Add New Chat",
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Attribution"
            component={Attribution}
            options={{
              title: "New Contact",
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              title: "New Contact",
              headerTintColor: currentTheme.text,
              backgroundColor: currentTheme.headerColor,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
