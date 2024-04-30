import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ImageStyle } from "expo-image";
import styled from "styled-components";
import { BlurView } from "expo-blur";

import { FontAwesome } from "@expo/vector-icons";
import { StyleProp, Text, View } from "react-native";
import { Colors, SCREEN_WIDTH } from ".";
import Animated from "react-native-reanimated";
import { blurhash } from "./UtilStyles";

interface Card {
  item: any;
  dynamicHeight: any;
}

export const Card = ({ item, dynamicHeight }: Card) => {
  return (
    <View
      style={{
        alignItems: "center",
        position: "relative",

        marginBottom: 10,
      }}
    >
      <Image
        placeholder={blurhash}
        style={{
          height: dynamicHeight,
          width: SCREEN_WIDTH / 2 - 10,
          borderRadius: 15,
        }}
        source={{ uri: item?.medium_cover_image }}
      />
      <TransparentView
        intensity={40}
        experimentalBlurMethod="dimezisBlurView"
        tint="dark"
      >
        <Image
          style={{
            height: 30,
            width: 30,

            borderRadius: 15,
          }}
          source={{ uri: item?.medium_cover_image }}
        />
        <View>
          <Text style={{ color: "white" }}>{item?.title_english}</Text>
          <Text style={{ color: "white", fontSize: 10 }}>
            <MaterialCommunityIcons
              name="movie-play"
              size={12}
              color={Colors?.main}
            />{" "}
            {item?.genres?.[0]}
            {"  "}
            <MaterialCommunityIcons
              name="movie-check-outline"
              size={12}
              color={Colors?.main}
            />{" "}
            {item?.year}
          </Text>
        </View>
      </TransparentView>
      <BlurView
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          padding: 4,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Text style={{ fontSize: 10, color: "white" }}>
          <FontAwesome name="heart-o" size={12} color="white" /> {item?.rating}
        </Text>
      </BlurView>
    </View>
  );
};

const TransparentView = styled(BlurView)`
  position: absolute;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  gap: 10px;
  display: flex;
  flex-direction: row;
  bottom: 20px;
  width: ${SCREEN_WIDTH / 2.3}px;
  height: 50px;
  border-radius: 16px;
  margin: 0;
  padding: 0;
  /* background: rgba(0, 0, 0, 0.46);
 
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
`;
