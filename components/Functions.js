import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (email, password) => {
  try {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
  } catch (e) {
    console.error(e);
  }
};

const retrieveStoredData = async () => {
  const value1 = await AsyncStorage.getItem("email");
  const value2 = await AsyncStorage.getItem("password");
  if (value1 !== null && value2 !== null) {
    return [value1, value2];
  } else {
    return false;
  }
};
export { storeData, retrieveStoredData };
