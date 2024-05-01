import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SmallSpicer, SmallWhiteText } from "../components/UI/UtilStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { Button, TextInput } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Entypo } from "@expo/vector-icons";
import { backendAPI } from "../apis/axios/config";
const editProfile = () => {
  const params = useLocalSearchParams();
  const [email, setEmail] = useState(params.email);
  const [username, setUsername] = useState(params.username);
  console.log(params);
  //----------------------- image picker for selecting profile pictures -----------------------//
  const [imageUri, setImageUri] = useState(null);
  const [fileName, setFileName] = useState();
  const [images, setImage] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImageUri(result.assets[0].uri);
      saveImage(result.assets[0]);
    }
  };

  const saveImage = async (asset) => {
    const { uri, filename } = asset;
    setFileName(filename);
    console.log(fileName);
    const destination = `${FileSystem.documentDirectory}${filename}`;

    try {
      await FileSystem.copyAsync({
        from: uri,
        to: destination,
      });
      console.log("Image saved successfully!");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const getSavedImage = async (filename) => {
    const uri = `${FileSystem.documentDirectory}${filename}`;
    console.log(fileName);
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        console.log("Image does not exist:", uri);
        setImage(uri);
        return uri;
      } else {
        console.log("Image does not exist:", uri);
      }
    } catch (error) {
      console.error("Error getting image:", error);
    }
  };

  //--------------------------update user details -----------------------------//
  const updateUserProfile = async () => {
    console.log("updated");
    try {
      const { data } = await backendAPI.put(`api/updateUserProfile/`, {
        username,
        email,
        profile: fileName,
        id: 19,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={{ flex: 1, width: SCREEN_WIDTH - 40 }}>
        <SmallSpicer />
        <SmallSpicer />

        <SmallSpicer />

        <SmallSpicer />
        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              borderRadius: 30,
              alignSelf: "center",
              position: "relative",
            }}
          >
            <Entypo
              name="pencil"
              size={14}
              color="white"
              style={{ position: "absolute", zIndex: 10, right: 8, top: 4 }}
            />
            <Image
              style={{ borderRadius: 40, height: 80, width: 80 }}
              source={images}
            />
          </View>
        </TouchableOpacity>
        <SmallSpicer />

        <SmallSpicer />
        <View>
          <SmallWhiteText>username</SmallWhiteText>
          <TextInput
            label="Username"
            mode="outlined"
            value={username as string}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <SmallSpicer />
        <View>
          <SmallWhiteText>email</SmallWhiteText>
          <TextInput
            textContentType="password"
            mode="outlined"
            label="password"
            value={email as string}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={(text) => setEmail(text)}
          />
          {/* {errorText && (
              <Text style={{ color: "red", fontSize: 12 }}>{errorText}</Text>
            )} */}
        </View>
        <SmallSpicer />
        <TouchableOpacity>
          <SmallWhiteText style={{ textAlign: "right", color: Colors.main }}>
            Forgot Password?
          </SmallWhiteText>
        </TouchableOpacity>
        <SmallSpicer />
        <Button onPress={updateUserProfile}>
          <Text>Update</Text>
        </Button>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.main,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 5,
          }}
          // onPress={submit}
        >
          {/* {!loader ? (
              <Text style={{ textAlign: "center", fontWeight: "600" }}>
                Sign In
              </Text>
            ) : (
              <ActivityIndicator />
            )} */}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default editProfile;
