import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Button,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors, SCREEN_HEIGHT } from "../components/UI";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { Image } from "expo-image";
import {
  CenteredView,
  SmallWhiteText,
  blurhash,
} from "../components/UI/UtilStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { yifyApi } from "../apis/axios/config";
import YoutubeIframe from "react-native-youtube-iframe";
export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [movieDetails, setMoviesDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await yifyApi.get(
          `movie_details.json?imdb_id=${params.id}&with_images=true&with_cast=true`
        );
        setMoviesDetails(data?.movie);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params?.id]);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Image
        placeholder={blurhash}
        source={params.medium_cover_image}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 1.5 }}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={{
          left: 0,
          right: 0,
          bottom: SCREEN_HEIGHT - SCREEN_HEIGHT / 1.8,
          height: 400,
        }}
      />
      <View style={{ top: -420, justifyContent: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 22,
            marginLeft: 15,
            fontWeight: "600",
          }}
        >
          {params.title_english}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 16,
          }}
        >
          <CenteredView>
            <MaterialCommunityIcons
              name="view-grid-plus"
              size={24}
              color="white"
            />
            <SmallWhiteText style={{ marginTop: 8 }}>
              Add to list
            </SmallWhiteText>
          </CenteredView>
          <CenteredView>
            <MaterialCommunityIcons name="movie-roll" size={24} color="white" />

            <SmallWhiteText style={{ marginTop: 8 }}>Watch Now</SmallWhiteText>
          </CenteredView>
          <CenteredView>
            <MaterialCommunityIcons
              name="folder-star-multiple"
              size={24}
              color={Colors.main}
            />
            <SmallWhiteText style={{ marginTop: 8 }}>Reviews</SmallWhiteText>
          </CenteredView>
        </View>
        <View>
          <View
            style={{
              width: SCREEN_WIDTH - SCREEN_WIDTH * 0.1,
              flex: 1,
              marginTop: 30,
              marginLeft: 30,
            }}
          >
            <SmallWhiteText style={{ fontSize: 13 }}>
              Description
            </SmallWhiteText>
            <Text
              style={{
                color: "white",
                fontSize: 11,
                marginTop: 10,
                fontWeight: "400",
              }}
            >
              {params.summary
                ? params.summary
                : "Sorry bugs 🪲🪲🪲 ate the description text, Contact Ella for Help"}
            </Text>
            <SmallWhiteText
              style={{ fontSize: 13, marginTop: 35, marginBottom: 15 }}
            >
              Cast
            </SmallWhiteText>
            <ScrollView
              horizontal
              style={{
                flex: 1,
                height: SCREEN_HEIGHT * 0.14,
              }}
            >
              {movieDetails?.cast?.map((cast) => (
                <TouchableOpacity>
                  <View style={{ flex: 1, marginRight: 40 }}>
                    <Image
                      placeholder={blurhash}
                      style={{ width: 70, height: 70, borderRadius: 35 }}
                      source={cast?.url_small_image}
                    />
                    <SmallWhiteText style={{ marginTop: 10 }}>
                      {cast?.name}
                    </SmallWhiteText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View>
              <SmallWhiteText
                style={{ fontSize: 13, marginTop: 35, marginBottom: 15 }}
              >
                Trailer
              </SmallWhiteText>
              <YoutubePlayer
                height={200}
                play={playing}
                videoId={movieDetails?.yt_trailer_code}
              />
              <Button
                title={playing ? "pause" : "play"}
                onPress={togglePlaying}
              />
            </View>
          </View>
        </View>
      </View>

      {/* <Text
          onPress={() => {
            router.setParams({ name: "Updated" });
          }}
        >
          Update the title
        </Text> */}
    </ScrollView>
  );
}
