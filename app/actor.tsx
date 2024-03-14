import { View, Text } from "react-native";
import React from "react";
import { SmallWhiteText } from "../components/UI/UtilStyles";
import { useLocalSearchParams } from "expo-router";

export default function Actor() {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View>
      <SmallWhiteText>{params.imdb_code}</SmallWhiteText>
    </View>
  );
}
