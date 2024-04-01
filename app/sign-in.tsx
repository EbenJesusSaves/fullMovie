import { View, Text } from "react-native";
import React, { useState } from "react";
import { SmallSpicer, SmallWhiteText } from "../components/UI/UtilStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack, router } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { backendAPI } from "../apis/axios/config";
import { Colors } from "../components/UI";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

export default function SignIn() {
  const [user, setUser] = useState<boolean>();
  const [username, setUsername] = useState<string>();
  const [password, setUPassword] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const [info, setInfo] = useState();
  const [errorText, setErrorText] = useState("");

  const submit = async () => {
    console.log("hii");
    try {
      setLoader(true);
      const { data } = await backendAPI.post("signIn", {
        username,
        password,
      });
      setUser(true);
      setInfo(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
      setErrorText("Invalid credentials");
    }
  };

  console.log(info);
  if (user) return <Redirect href="/" />;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={{ flex: 1, width: SCREEN_WIDTH - 40 }}>
        <SmallSpicer />
        <SmallSpicer />
        <SmallWhiteText
          style={{
            display: "flex",
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "700",
            color: Colors.main,
          }}
        >
          Login Here
        </SmallWhiteText>
        <SmallSpicer />
        <SmallWhiteText
          style={{
            display: "flex",
            alignSelf: "center",
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Welcome back you've {"\n"}
          been missed!
        </SmallWhiteText>
        <SmallSpicer />
        <View>
          <SmallWhiteText>username</SmallWhiteText>
          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <SmallSpicer />
        <View>
          <SmallWhiteText>password</SmallWhiteText>
          <TextInput
            textContentType="password"
            mode="outlined"
            label="password"
            value={password}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={(text) => setUPassword(text)}
          />
          {errorText && (
            <Text style={{ color: "red", fontSize: 12 }}>{errorText}</Text>
          )}
        </View>
        <SmallSpicer />
        <TouchableOpacity>
          <SmallWhiteText style={{ textAlign: "right", color: Colors.main }}>
            Forgot Password?
          </SmallWhiteText>
        </TouchableOpacity>
        <SmallSpicer />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.main,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 5,
          }}
          onPress={submit}
        >
          {!loader ? (
            <Text style={{ textAlign: "center", fontWeight: "600" }}>
              Sign In
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
