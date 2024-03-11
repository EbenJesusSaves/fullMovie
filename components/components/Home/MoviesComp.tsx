import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { Card } from "../../UI/Card";
import { SCREEN_HEIGHT } from "../../UI";
import { GreetingsComponent } from "./GreetingsComponent";
import { Genre } from "./Genre";

//listEmpty Comp
//list footer component
export const MoviesList = () => {
  const [movies, setMovies] = useState<any>();

  const fetchData = () => {
    alert("hii");
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
        ListHeaderComponent={
          <View>
            <GreetingsComponent />
            <Genre />
          </View>
        }
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={2}
        estimatedItemSize={200}
        onEndReached={fetchData}
        ListFooterComponent={<Text style={{ color: "white" }}>Hiiii</Text>}
        estimatedListSize={{ height: 300, width: 300 }}
        renderItem={({ item }: any) => {
          const randomHeightPercentage = Math.random() * (0.2 - 0.1) + 0.1;

          // Calculate the dynamic height
          const dynamicHeight = 240 + 500 * randomHeightPercentage;

          return (
            <TouchableOpacity
              style={{
                alignItems: "center",
                flex: 1,
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
