import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { MasonryFlashList } from "@shopify/flash-list";
import { Card } from "../../UI/Card";
import { SCREEN_HEIGHT } from "../../UI";
import { GreetingsComponent } from "./GreetingsComponent";
import { Genre } from "./Genre";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";
//listEmpty Comp
//list footer component

interface Movie {
  background_image: string;
  background_image_original: string;
  date_uploaded: string;
  date_uploaded_unix: number;
  description_full: string;
  genres: string[];
  id: number;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  medium_cover_image: string;
  mpa_rating: string;
  rating: number;
  runtime: number;
  slug: string;
  small_cover_image: string;
  state: string;
  summary: string;
  synopsis: string;
  title: string;
  title_english: string;
  title_long: string;
  torrents: Torrent[];
  url: string;
  year: number;
  yt_trailer_code: string;
}

interface Torrent {
  url: string;
}
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
    page.current++;

    if (page.current === 1) return;

    try {
      const {
        data: { data },
      } = await yifyApi.get(`list_movies.json?page=${page.current}`);

      setMovies((prev: any) => [...prev, ...data?.movies]);
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
};
