import React, { useEffect, useState } from "react";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import { FlexBox, SmallText } from "../../UI/UtilStyles";
import SwiperFlatList from "react-native-swiper-flatlist";
import { baseAPI, staticImageLink } from "../../../apis/axios/config";
import { Image } from "expo-image";
import { Colors } from "../../UI";
const colors = ["tomato", "thistle", "skyblue", "teal"];

interface ApiRes {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export const GreetingsComponent = () => {
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState<ApiRes>();
  useEffect(() => {
    (async () => {
      console.log("hi");
      try {
        const { data } = await baseAPI.get<ApiRes>(
          "movie/upcoming?include_adult=true&include_video=true&language=en-US&page=1"
        );

        setTrending(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(trending);

  return (
    <View style={{ flex: 1 }}>
      <FlexBox>
        <SmallText>Hello, Welcome back</SmallText>
      </FlexBox>

      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination={false}
        data={trending?.results}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              width: width,
              justifyContent: "center",
              borderRadius: 15,
              position: "relative",
            }}
          >
            <Image
              contentFit="cover"
              style={{ flex: 1, height: 200, borderRadius: 15 }}
              source={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            />
            <Text
              style={{
                backgroundColor: " rgba(73, 73, 73, 0.5)",
                width: 30,
                padding: 5,
                position: "absolute",
                color: "white",
                height: 30,

                zIndex: 11,
                borderWidth: 0.6,
                borderColor: "green",
                borderRadius: 14,
                overflow: "hidden",
                elevation: 2,
                bottom: 15,
                left: 10,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {item.vote_average.toFixed(1)}
            </Text>
            <Text
              style={{
                backgroundColor: " rgba(73, 73, 73, 0.4)",
                width: "auto",
                padding: 5,

                position: "absolute",
                color: "white",
                height: 50,
                zIndex: 10,
                borderWidth: 0.3,
                borderColor: "white",
                borderRadius: 15,
                overflow: "hidden",
                elevation: 2,
                bottom: 10,
                fontWeight: "700",
                paddingLeft: 50,
              }}
            >
              {item.original_title}
              {"\n"}
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  paddingTop: 2,
                  fontWeight: "500",
                }}
              >
                {" "}
                <Text style={{ color: Colors.main }}>Release Date {""}</Text>
                {item.release_date}
              </Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  text: { textAlign: "center", color: "white" },
});
