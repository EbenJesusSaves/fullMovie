import { Button } from "@rneui/base";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, SCREEN_HEIGHT } from "../../components/UI";
import { TextInput } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { yifyApi } from "../../apis/axios/config";
import { Link } from "expo-router";
import { CenteredView, SmallWhiteText } from "../../components/UI/UtilStyles";
import LottieView from "lottie-react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { Card } from "../../components/UI/Card";
const Tab = () => {
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState();
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [movies, setMovies] = useState<any>([]);
  const getChat = async () => {
    setLoading(true);
    const body = {
      model: "Awanllm-Llama-3-8B-Dolfin",
      messages: [
        {
          role: "system",
          content:
            "You're a user agent who suggests a movie to users based on their  feelings, please give the exact title of the movie without any additional text or explanation",
        },
        { role: "user", content: text },
      ],
      repetition_penalty: 1.1,
      temperature: 0.7,
      top_p: 0.9,
      top_k: 40,
      max_tokens: 1024,
      stream: false,
    };
    try {
      const { data } = await axios.post(
        "https://api.awanllm.com/v1/chat/completions",
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_AWANLLM_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStream(data.choices[0]?.message?.content);

      //fetch movies
      try {
        const {
          data: { data },
        } = await yifyApi.get(`list_movies.json?query_term=$${stream}`);

        setMovies(data?.movies);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChat();
  }, []);

  console.log(stream, movies);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            color: Colors.main,
            fontSize: 22,
            marginLeft: 15,
            marginTop: 20,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Don't know what to Watch?
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginLeft: 15,

            fontWeight: "300",
            textAlign: "center",
          }}
        >
          Tell us how you feel and let do the magic🎉
        </Text>
        <View
          style={{
            backgroundColor: Colors.dark_gray,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <TextInput
            value={text}
            style={{ width: "90%", height: SCREEN_HEIGHT / 20, color: "white" }}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity onPress={getChat}>
            <FontAwesome5 name="telegram-plane" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={{ flex: 1 }}>
          <CenteredView>
            <LottieView
              source={require("../../components/loaders/tothemoon.json")}
              autoPlay={true}
              loop={true}
              style={{ alignItems: "center", height: 400, width: 400 }}
            />
            <SmallWhiteText style={{ color: Colors.main }}>
              Just describe how you feel currently
            </SmallWhiteText>
          </CenteredView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {!movies?.length ? (
            <CenteredView>
              <LottieView
                source={require("../../components/loaders/tothemoon.json")}
                autoPlay={true}
                loop={true}
                style={{ alignItems: "center", height: 400, width: 400 }}
              />
              <SmallWhiteText style={{ color: Colors.main }}>
                Just describe how you feel currently
              </SmallWhiteText>
            </CenteredView>
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
                  {/* <LottieView
                    source={require("../../components/loaders/Animation.json")}
                    autoPlay={true}
                    loop={true}
                    style={{ width: 90, height: 90, alignItems: "center" }}
                  /> */}
                </View>
              }
              estimatedListSize={{ height: 300, width: 300 }}
              renderItem={({ item }: any) => {
                const randomHeightPercentage =
                  Math.random() * (0.2 - 0.1) + 0.1;

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
      )}
    </SafeAreaView>
  );
};
export default Tab;
