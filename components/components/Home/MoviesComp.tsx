import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { Card } from "../../UI/Card";
import { SCREEN_HEIGHT } from "../../UI";
import { GreetingsComponent } from "./GreetingsComponent";
import { Genre } from "./Genre";

import LottieView from "lottie-react-native";
//listEmpty Comp
//list footer component
export const MoviesList = () => {
  const [movies, setMovies] = useState<any>([]);
  let page = useRef(1);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await yifyApi.get("list_movies.json");

        setMovies(data?.movies);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const fetchData = async () => {
    console.log(page.current);
    page.current++;
    console.log(page.current);
    if (page.current === 1) return;

    try {
      const {
        data: { data },
      } = await yifyApi.get(`list_movies.json?page=${page.current}`);

      setMovies((prev: any) => [...prev, ...data?.movies]);
      console.log("hi");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <MasonryFlashList
        data={movies}
        numColumns={2}
        ListHeaderComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <GreetingsComponent />
            <Genre />
          </View>
        }
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.8}
        estimatedItemSize={200}
        onEndReached={fetchData}
        ListFooterComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: SCREEN_HEIGHT * 0.1,
            }}
          >
            <LottieView
              source={require("../../loaders/Animation.json")}
              autoPlay={true}
              loop={true}
              style={{ width: 90, height: 90, alignItems: "center" }}
            />
          </View>
        }
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
