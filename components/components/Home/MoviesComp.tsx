import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import { Colors } from "../../UI";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

export const MoviesList = () => {
  const [movies, setMovies] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await yifyApi.get("list_movies.json");

        setMovies(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(movies);

  return (
    <View style={{ flex: 1 }}>
      <MasonryFlashList
        data={movies?.movies}
        numColumns={2}
        renderItem={({ item }: any) => {
          const randomHeightPercentage = Math.random() * (0.2 - 0.1) + 0.1;

          // Calculate the dynamic height
          const dynamicHeight = 240 + 500 * randomHeightPercentage;

          return (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  position: "relative",

                  marginBottom: 10,
                }}
              >
                <Image
                  style={{
                    flex: 1,

                    height: dynamicHeight,
                    width: windowWidth / 2 - 10,
                    borderRadius: 15,
                  }}
                  source={item.medium_cover_image}
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
                    source={item.medium_cover_image}
                  />
                  <View>
                    <Text style={{ color: "white" }}>{item.title_english}</Text>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      <MaterialCommunityIcons
                        name="movie-play"
                        size={12}
                        color={Colors.main}
                      />{" "}
                      {item.genres[0]}
                      {"  "}
                      <MaterialCommunityIcons
                        name="movie-check-outline"
                        size={12}
                        color={Colors.main}
                      />{" "}
                      {item.year}
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
                    <FontAwesome name="heart-o" size={12} color="white" />{" "}
                    {item.rating}
                  </Text>
                </BlurView>
              </View>
            </View>
          );
        }}
        estimatedItemSize={10}
      />
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
  width: ${windowWidth / 2.3}px;
  height: 50px;
  border-radius: 16px;
  margin: 0;
  padding: 0;
  /* background: rgba(0, 0, 0, 0.46);
 
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
`;
