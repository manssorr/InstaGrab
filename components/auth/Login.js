import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);

      const user = auth().currentUser;

      Alert.alert("Success", "You are logged in" + user?.phoneNumber);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  if (!confirm) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber("+201030714476")}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
}
