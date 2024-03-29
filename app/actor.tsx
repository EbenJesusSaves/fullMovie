import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallWhiteText } from "../components/UI/UtilStyles";
import { useLocalSearchParams } from "expo-router";
import { baseAPI } from "../apis/axios/config";
import { Skeleton } from "@rneui/themed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native";
export default function Actor() {
  const params = useLocalSearchParams();
  const [actorDetails, setActorDetails] = useState();
  const [loading, setLoading] = useState(false);
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
      setImageUri(result.assets[0].uri);
      saveImage(result.assets[0]);
    }
  };

  const saveImage = async (asset) => {
    const { uri, filename } = asset;
    setFileName(fileName);
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
  getSavedImage(fileName);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await baseAPI.get(`/person/${params.imdb_code}`);
        setActorDetails(data);
        setLoading(false);
      } catch (error) {}
    })();
  }, [params.imdb_code]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {imageUri && (
          <Image
            source={{ uri: images }}
            style={{ width: SCREEN_WIDTH, height: 200 }}
          />
        )}
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>
      <SmallWhiteText>{params.imdb_code}</SmallWhiteText>
    </View>
  );
}
