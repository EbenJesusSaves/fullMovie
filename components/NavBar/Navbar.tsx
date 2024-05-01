import React from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../UI";
import { AntDesign } from "@expo/vector-icons";
import { FlexBox } from "../UI/UtilStyles";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
export const Navbar = () => {
  return (
    <FlexBox style={{ justifyContent: "space-between" }}>
      <Text style={{ fontSize: 25, margin: 10 }}>
        <Text style={{ color: Colors.main, fontWeight: "700" }}>Full </Text>
        <Text style={{ color: "white" }}>Movie </Text>
      </Text>
      <FlexBox style={{ gap: 10 }}>
        <Link asChild href={"searchScreen"}>
          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
            }}
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={() => alert("hi")}>
          <Feather name="bell" size={24} color="white" />
        </TouchableOpacity>
      </FlexBox>
    </FlexBox>
  );
};
