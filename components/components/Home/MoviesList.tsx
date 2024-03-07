import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { yifyApi } from "../../../apis/axios/config";
import { FlashList } from "@shopify/flash-list";
import MasonryList from "../Masonry/MasonryList";
import { Image } from "expo-image";

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
      {/* <MasonryList pins={movies} /> */}
      <FlashList
        data={movies?.movies}
        numColumns={2}
        style={{ display: "flex", flexDirection: "row" }}
        renderItem={({ item }) => (
          <View>
            <View>
              <Image
                style={{ flex: 1, height: 300, width: 200, borderRadius: 15 }}
                source={item.medium_cover_image}
              />
            </View>
          </View>
        )}
        estimatedItemSize={10}
      />
    </View>
  );
};
