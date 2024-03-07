import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";

import { Image } from "expo-image";
import styled from "styled-components";

export const MoviesList = () => {
  const windowWidth = Dimensions.get("window").width;

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
      {/* <MasonryList pins={movies} /> */}
      <MasonryFlashList
        data={movies?.movies}
        numColumns={2}
        // contentContainerStyle={{ backgroundColor: "white" }}
        renderItem={({ item }: any) => {
          const randomHeightPercentage = Math.random() * (0.2 - 0.1) + 0.1;

          // Calculate the dynamic height
          const dynamicHeight = 240 + 500 * randomHeightPercentage;

          return (
            <View
              style={{
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  marginBottom: 30,
                  alignItems: "center",
                  position: "relative",
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
              </View>
              <TransparentView>
                <Image
                  style={{
                    flex: 1,
                    height: 20,
                    width: 20,
                    borderRadius: 15,
                  }}
                  source={item.medium_cover_image}
                />
                {/* <Text style={{ color: "white" }}>Hi Kings</Text>
                <Text style={{ color: "white" }}>Hi Kings</Text> */}
              </TransparentView>
            </View>
          );
        }}
        estimatedItemSize={10}
      />
    </View>
  );
};

const TransparentView = styled(View)`
  position: "absolute";
  align-items: center;
  display: flex;
  flex-direction: row;
  bottom: 60px;
  width: 80%;

  background: rgba(0, 0, 0, 0.36);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13px);
`;
