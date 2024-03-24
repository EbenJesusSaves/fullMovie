import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Genre } from "../Home/Genre";
import { yifyApi } from "../../../apis/axios/config";
import { Link } from "expo-router";
import { Card } from "../../UI/Card";
import LottieView from "lottie-react-native";
import { SCREEN_HEIGHT } from "../../UI";
import { MasonryFlashList } from "@shopify/flash-list";

export default function FilterMovies() {
  const [activeGenre, setActiveGenre] = useState<string>("Action");
  const [loading, setLoading] = useState<Boolean>(false);
  const [movies, setMovies] = useState<any>([]);

  let page = useRef(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await yifyApi.get(`list_movies.json?genre=$${activeGenre}`);

        setMovies(data?.movies);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [activeGenre]);
  const fetchData = async () => {
    page.current++;

    if (page.current === 1) return;

    try {
      const {
        data: { data },
      } = await yifyApi.get(
        `list_movies.json?page=${page.current}&genre=${activeGenre}`
      );

      setMovies((prev: any) => [...prev, ...data?.movies]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <MasonryFlashList
        data={movies}
        numColumns={2}
        ListHeaderComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Genre activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
          </View>
        }
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.8}
        estimatedItemSize={200}
        refreshing={loading as boolean}
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
            <Link
              style={{ color: "white" }}
              asChild
              href={{
                pathname: "details",
                params: {
                  imdb_id: item.imdb_code,
                  id: item.id,
                  summary: item.summary,
                  medium_cover_image: item.medium_cover_image,
                  title_english: item.title_english,
                  background_image: item.background_image,
                },
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Card item={item} dynamicHeight={dynamicHeight} />
              </TouchableOpacity>
            </Link>
          );
        }}
      />
    </View>
  );
}
