import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import CustomBottomTab from "../../src/BottomTabs/CustomBottomTab";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "blue" }}
      tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          title: "Settings",
        }}
      />
      <Tabs.Screen
        name="testNav"
        options={{
          title: "testNav",
          href: null,
        }}
      />
    </Tabs>
  );
}
