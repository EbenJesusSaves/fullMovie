import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CenteredView,
  SmallSpicer,
  SmallWhiteText,
  ViewWithMargin,
} from "../../components/UI/UtilStyles";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import styled from "styled-components";
import { backendAPI, yifyApi } from "../../apis/axios/config";
import { Link } from "expo-router";
import { Card } from "../../components/UI/Card";
import { Colors } from "../../components/UI";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState, RootStateForSelectors } from "../../redux/store/store";
const Tab = () => {
  const [favorites, setFavorites] = useState([]);
  const userprofile = useSelector((state: RootStateForSelectors) => state.user);
  console.log(userprofile);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await yifyApi.get("list_movies.json");

        setFavorites(data?.movies);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //-------------------- user login --------------------//
  // const login = async () => {
  //   try {
  //     console.log("hi");
  //     const { data } = await backendAPI.post("/signIn", {
  //       username: "Ellsa",
  //       password: "password",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",

          alignItems: "center",
        }}
      >
        <SmallWhiteText
          style={{ fontSize: 15, fontWeight: "500", marginBottom: 10 }}
        >
          Profile
        </SmallWhiteText>
        <View
          style={{
            backgroundColor: "white",
            height: SCREEN_HEIGHT / 7,
            width: SCREEN_WIDTH - 60,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Image
              style={{ borderRadius: 30, height: 60, width: 60 }}
              source="https://i.pinimg.com/736x/63/7c/4e/637c4ecc4450f5fef34bdce02b361223.jpg"
            />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                {userprofile.userData.data?.username}
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {userprofile.userData.data?.email}
              </Text>
              <Link
                asChild
                href={{
                  pathname: "editProfile",
                  params: {
                    username: userprofile.userData.data?.username,
                    email: userprofile.userData.data?.email,
                    uri: userprofile.userData.data?.profile,
                  },
                }}
              >
                <TouchableOpacity
                  // onPress={login}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",

                    marginTop: 5,
                    gap: 4,
                  }}
                >
                  <Text style={{}}>Edit Profile</Text>
                  <AntDesign name="right" size={12} color="black" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 60,
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="movie-play"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 10 }}>watched</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="heart-circle-bolt" size={24} color="black" />
              <Text style={{ fontSize: 10 }}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Foundation name="comment-video" size={24} color="black" />
              <Text style={{ fontSize: 10 }}>Comments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ViewWithMargin style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <AntDesign name="setting" size={24} color="white" />
            <SmallWhiteText style={{ fontSize: 15 }}>Settings</SmallWhiteText>
          </View>
          <MaterialIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
        <SmallSpicer />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <MaterialCommunityIcons
              name="heart-settings-outline"
              size={24}
              color="white"
            />
            <SmallWhiteText style={{ fontSize: 15 }}>
              Favorite List
            </SmallWhiteText>
          </View>
          <MaterialIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
        <SmallSpicer />
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <MaterialCommunityIcons
              name="logout-variant"
              size={24}
              color="white"
            />
            <SmallWhiteText style={{ fontSize: 15 }}>Log out</SmallWhiteText>
          </View>
          <MaterialIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </ViewWithMargin>
      <ViewWithMargin style={{ marginVertical: 20 }}>
        <SmallWhiteText
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginBottom: 10,
            color: Colors.main,
          }}
        >
          Recent Viewed movies{" "}
        </SmallWhiteText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favorites?.map((item: any) => {
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
                    marginRight: 30,
                  }}
                >
                  <Card item={item} dynamicHeight={250} />
                </TouchableOpacity>
              </Link>
            );
          })}
        </ScrollView>
      </ViewWithMargin>
      <ViewWithMargin style={{ marginTop: 20 }}>
        <SmallWhiteText>Favorites </SmallWhiteText>
      </ViewWithMargin>
    </SafeAreaView>
  );
};

export default Tab;

const CenteredTouchable = styled(TouchableOpacity)`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;
