import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { Card } from "../../UI/Card";

//listEmpty Comp
//list footer component
export const MoviesList = () => {
  const [movies, setMovies] = useState<any>();

  const fetchData = () => {
    console.log("hi");
  };
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await yifyApi.get("list_movies.json");

        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MasonryFlashList
        data={movies?.movies}
        numColumns={2}
        estimatedItemSize={314}
        onEndReached={fetchData}
        renderItem={({ item }: any) => {
          const randomHeightPercentage = Math.random() * (0.2 - 0.1) + 0.1;

          // Calculate the dynamic height
          const dynamicHeight = 240 + 500 * randomHeightPercentage;

          return (
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
            >
              <Card item={item} dynamicHeight={dynamicHeight} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
