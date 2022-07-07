import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  Alert
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function Register({ navigation }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null
  });

  // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  const handleSetUser = (value, key) => {
    setUser({
      ...user,
      [key]: value
    });
  };

  const handleSubmit = () => {
    Alert.alert("Wait", "email: " + user.email + " password: " + user.password);

    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        Alert.alert("Success", "You are registered with email: " + user.email);
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .set({
            name: user.name,
            email: user.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null
          });
        // navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        placeholder="name"
        value={user?.name}
        onChangeText={(text) => handleSetUser(text, "name")}
      />

      <TextInput
        placeholder="email"
        value={user?.email}
        onChangeText={(text) => handleSetUser(text, "email")}
      />

      <TextInput
        placeholder="password"
        value={user?.password}
        secureTextEntry={true}
        onChangeText={(text) => handleSetUser(text, "password")}
      />

      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
}
