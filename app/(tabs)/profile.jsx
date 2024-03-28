import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CenteredView, SmallWhiteText } from "../../components/UI/UtilStyles";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import styled from "styled-components";
const Tab = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CenteredView>
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
              height={60}
              style={{ borderRadius: 30 }}
              width={60}
              source="https://i.pinimg.com/736x/63/7c/4e/637c4ecc4450f5fef34bdce02b361223.jpg"
            />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                Owusu Benedicta
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                bestFriends@gmail.com
              </Text>
              <TouchableOpacity
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
      </CenteredView>
    </SafeAreaView>
  );
};

export default Tab;

const CenteredTouchable = styled(TouchableOpacity)`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;
