import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallSpicer, SmallWhiteText } from "../components/UI/UtilStyles";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { yifyApi } from "../apis/axios/config";
import { MasonryFlashList } from "@shopify/flash-list";
import { SCREEN_HEIGHT } from "../components/UI";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";

import { Card } from "../components/UI/Card";
const searchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [movies, setMovies] = useState<any>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await yifyApi.get(`list_movies.json?query_term=$${searchQuery}`);

        setMovies(data?.movies);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchQuery]);
  console.log(movies);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SmallWhiteText>searchScreen</SmallWhiteText>
      <Searchbar value={searchQuery} onChangeText={setSearchQuery} />
      <SmallSpicer />
      <View style={{ flex: 1 }}>
        {!movies?.length ? (
          <LottieView
            source={require("../components/loaders/search.json")}
            autoPlay={true}
            loop={true}
            style={{ alignItems: "center", height: 600, width: 600 }}
          />
        ) : (
          <MasonryFlashList
            data={movies}
            numColumns={2}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.8}
            estimatedItemSize={200}
            refreshing={loading as boolean}
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
                  source={require("../components/loaders/Animation.json")}
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default searchScreen;
