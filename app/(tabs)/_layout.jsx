import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import CustomBottomTab from "../../src/BottomTabs/CustomBottomTab";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "saved",
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          href: null,
        }}
      />
    </Tabs>
  );
}
