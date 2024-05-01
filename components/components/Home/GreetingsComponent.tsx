import React, { useEffect, useState } from "react";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import { FlexBox, SmallText } from "../../UI/UtilStyles";
import SwiperFlatList from "react-native-swiper-flatlist";
import { baseAPI, staticImageLink } from "../../../apis/axios/config";
import { Image } from "expo-image";
import { Colors } from "../../UI";
import { BlurView } from "expo-blur";
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
      try {
        const { data } = await baseAPI.get<ApiRes>(
          "movie/upcoming?include_adult=true&include_video=true&language=en-US&page=1"
        );

        setTrending(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
              source={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
            />
            <BlurView
              intensity={10}
              tint="systemChromeMaterialDark"
              style={{
                position: "absolute",
                zIndex: 10,
                bottom: 15,
                left: 20,
                borderRadius: 15,
                overflow: "hidden",
                padding: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
              experimentalBlurMethod="dimezisBlurView"
            >
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.main,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  padding: 10,
                  borderRadius: 20,
                  overflow: "hidden",
                  borderWidth: 0.4,
                  borderColor: Colors.main,
                }}
              >
                {item?.vote_average?.toFixed(1)}
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>
                {item.original_title}
                {"\n"}
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    paddingTop: 2,
                    fontWeight: "500",
                  }}
                >
                  <Text style={{ color: Colors?.main }}>Release Date {""}</Text>
                  {item?.release_date}
                </Text>
              </Text>
            </BlurView>
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
