import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Button,
  Platform,
  Linking,
} from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors, SCREEN_HEIGHT } from "../components/UI";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { Image } from "expo-image";
import * as Sharing from "expo-sharing";

import * as Permissions from "expo-permissions";
import {
  CenteredView,
  SmallSpicer,
  SmallWhiteText,
  ViewWithMargin,
  blurhash,
} from "../components/UI/UtilStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { yifyApi } from "../apis/axios/config";
import Popover from "react-native-popover-view/dist/Popover";
import { Placement } from "react-native-popover-view/dist/Types";
import { isIOS } from "@rneui/base";

export interface Movie {
  background_image: string;
  background_image_original: string;
  cast: Cast[];
  date_uploaded: string;
  date_uploaded_unix: number;
  description_full: string;
  description_intro: string;
  genres: string[];
  id: string;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  large_screenshot_image1: string;
  large_screenshot_image2: string;
  large_screenshot_image3: string;
  like_count: number;
  medium_cover_image: string;
  medium_screenshot_image1: string;
  medium_screenshot_image2: string;
  medium_screenshot_image3: string;
  mpa_rating: string;
  rating: number;
  runtime: number;
  slug: string;
  summary: string;
  small_cover_image: string;
  title: string;
  title_english: string;
  title_long: string;
  torrents: Torrent[];
  url: string;
  year: number;
  yt_trailer_code: string;
}

interface Cast {
  name: string;
  character_name: string;
  imdb_code: string;
  url_small_image: string;
}

interface Torrent {
  audio_channels: string;
  bit_depth: string;
  date_uploaded: string;
  date_uploaded_unix: number;
  hash: string;
  is_repack: string;
  peers: number;
  quality: string;
  seeds: number;
  size: string;
  size_bytes: number;
  type: string;
  url: string;
  video_codec: string;
}

interface Data {
  movie: Movie;
}
interface FetchedMovie {
  data: { data: Data };
}
export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [movieDetails, setMoviesDetails] = useState<Movie>();
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [vidState, setVidState] = useState();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentId, setCurrentId] = useState<{ imd: string; id: string }>({
    imd: params.imdb_id as string,
    id: params.id as string,
  });

  const movie: Movie = {
    background_image: "",
    background_image_original: "",
    cast: [],
    date_uploaded: "",
    date_uploaded_unix: 0,
    description_full: "",
    description_intro: "",
    genres: [],
    id: params.id as string,
    imdb_code: "",
    language: "",
    large_cover_image: "",
    large_screenshot_image1: "",
    large_screenshot_image2: "",
    large_screenshot_image3: "",
    like_count: 0,
    medium_cover_image: params?.medium_cover_image as string,
    medium_screenshot_image1: "",
    medium_screenshot_image2: "",
    medium_screenshot_image3: "",
    mpa_rating: "",
    rating: 0,
    runtime: 0,
    slug: "",
    summary: params.summary as string,
    small_cover_image: "",
    title: "",
    title_english: "",
    title_long: "",
    torrents: [],
    url: "",
    year: 0,
    yt_trailer_code: "",
  };

  const [details, setDetails] = useState<Movie>(movie);
  const onStateChange = useCallback((state: any) => {
    setVidState(state);
  }, []);

  // const requestPermissions = async () => {
  //   const { status } = await Permissions.askAsync(
  //     Permissions.READ_EXTERNAL_STORAGE
  //   );
  //   if (status !== "granted") {
  //     alert("Sorry, we need file access permissions to make this work!");
  //   }
  // };

  //---------------------------linking--------------------------//
  // const shareLink = async () => {
  //   requestPermissions();
  //   try {
  //     const url = Linking.createURL("details"); // replace with your path
  //     await Sharing.shareAsync("king");
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        }: FetchedMovie = await yifyApi.get(
          `movie_details.json?imdb_id=${currentId.imd}&with_images=true&with_cast=true`
        );
        setMoviesDetails(data?.movie);
        setDetails(data?.movie);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      //--------------similar movies like the above -------------------------//
      try {
        const {
          data: { data },
        } = await yifyApi.get(
          `movie_suggestions.json?movie_id=${currentId.id}`
        );
        setSimilarMovies(data?.movies);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentId]);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {vidState !== "playing" && (
        <Image
          placeholder={blurhash}
          source={details?.medium_cover_image}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 1.5 }}
        />
      )}
      {Platform.OS !== "android" && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            position: vidState !== "playing" ? "absolute" : "relative",
            top: 0,
            zIndex: vidState !== "playing" ? -1 : 0,
            opacity: vidState !== "playing" ? 0 : 1,
            right: 330,
          }}
        >
          <YoutubePlayer
            initialPlayerParams={{
              color: "white",
              loop: true,
              controls: false,
            }}
            onChangeState={onStateChange}
            height={540}
            play={true}
            mute
            width={1000}
            videoId={movieDetails?.yt_trailer_code}
          />
        </View>
      )}

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
          {details?.title_english}
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
          <TouchableOpacity
          // onPress={shareLink}
          >
            <CenteredView>
              <MaterialCommunityIcons
                name="folder-star-multiple"
                size={24}
                color={Colors.main}
              />
              <SmallWhiteText style={{ marginTop: 8 }}>Reviews</SmallWhiteText>
            </CenteredView>
          </TouchableOpacity>
        </View>
        <SmallSpicer />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ViewWithMargin style={{ flex: 1, flexDirection: "row", gap: 30 }}>
            {movieDetails?.genres?.map((m) => (
              <SmallWhiteText
                style={{
                  borderWidth: 0.5,
                  borderColor: Colors.main,
                  padding: 6,
                  borderRadius: 12,
                  marginBottom: 3,
                }}
              >
                {m}
              </SmallWhiteText>
            ))}
          </ViewWithMargin>
        </ScrollView>

        <View>
          <SmallSpicer />
          <ViewWithMargin style={{ flexDirection: "row", gap: 20 }}>
            <SmallWhiteText>
              {" "}
              Released Year:{" "}
              <Text style={{ color: Colors.main }}>{details?.year}</Text>
            </SmallWhiteText>
            <SmallWhiteText>
              {" "}
              IMDB Rating:{" "}
              <Text style={{ color: Colors.main }}>{details?.rating}</Text>
            </SmallWhiteText>
            <SmallWhiteText>
              {" "}
              Lang:{" "}
              <Text style={{ color: Colors.main }}>{details?.language}</Text>
            </SmallWhiteText>
          </ViewWithMargin>
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
                <Link
                  asChild
                  href={{
                    pathname: "actor",
                    params: {
                      imdb_code: cast.imdb_code,
                      name: cast.character_name,
                    },
                  }}
                >
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
                </Link>
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
            <View>
              {/* <View
                style={{ backgroundColor: Colors.medium_gray, height: 0.1 }}
              ></View> */}
              <SmallWhiteText
                style={{
                  fontSize: 13,
                  marginTop: 35,
                  marginBottom: 15,
                  color: Colors.main,
                }}
              >
                Downloads for Android
              </SmallWhiteText>
              <Popover
                placement={"floating" as Placement}
                from={
                  <TouchableOpacity>
                    <SmallWhiteText>Press here to open popover!</SmallWhiteText>
                  </TouchableOpacity>
                }
              >
                <CenteredView style={{ backgroundColor: Colors.primary }}>
                  <View
                    style={{
                      width: SCREEN_WIDTH - 90,
                      backgroundColor: Colors.main,
                      height: SCREEN_HEIGHT / 9,
                      padding: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="content-save-check"
                      size={30}
                      color="black"
                    />
                    <Text style={{ fontWeight: "500", fontSize: 17 }}>
                      Download / Save Movie
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      marginBottom: 10,
                    }}
                  >
                    <SmallWhiteText
                      style={{
                        marginTop: 15,
                        borderColor: Colors.main,
                        borderWidth: 0.8,
                        backgroundColor: "rgba(208, 255, 73, 0.2)",
                        fontSize: 14,
                        paddingVertical: 10,
                        paddingHorizontal: SCREEN_WIDTH / 5,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      Add to Watch List
                    </SmallWhiteText>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 0.7,
                      width: SCREEN_WIDTH / 1.45,
                      borderColor: Colors.dark_gray,
                      borderRadius: 4,
                      marginBottom: 10,
                      paddingTop: 10,
                      paddingLeft: 8,
                    }}
                  >
                    {movieDetails?.torrents?.map((m) => (
                      <TouchableOpacity
                        onPress={() => {
                          console.log(movie);
                          Linking.openURL(isIOS ? details?.url : m?.url);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          position: "relative",
                          marginRight: 10,
                          marginBottom: 20,
                        }}
                      >
                        <SmallWhiteText>
                          Size:{" "}
                          <SmallWhiteText style={{ color: Colors.main }}>
                            {m.size}
                          </SmallWhiteText>{" "}
                          Quality:{" "}
                          <SmallWhiteText style={{ color: Colors.main }}>
                            {m.quality}
                          </SmallWhiteText>{" "}
                        </SmallWhiteText>
                        <SmallWhiteText
                          style={{
                            backgroundColor: Colors.main,
                            color: "black",
                            padding: 5,
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        >
                          {isIOS ? "Watch Now" : "Download"}
                        </SmallWhiteText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </CenteredView>
              </Popover>
            </View>

            <SmallWhiteText
              style={{ fontSize: 13, marginTop: 35, marginBottom: 15 }}
            >
              Similar Movies
            </SmallWhiteText>
            <ScrollView
              horizontal
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}
            >
              {similarMovies?.map((m) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentId({ imd: m.imdb_code, id: m.id });
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                  }}
                  style={{
                    alignItems: "center",
                    position: "relative",
                    marginRight: 20,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    placeholder={blurhash}
                    style={{
                      height: SCREEN_HEIGHT / 3,
                      width: SCREEN_WIDTH / 2 - 10,
                      borderRadius: 10,
                    }}
                    source={{ uri: m?.medium_cover_image }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
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
