import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import CustomBottomTab from "../../components/BottomTabs/CustomBottomTab";

export default function TabLayout() {
  const [user, setUser] = useState<boolean>(false);

  if (!user) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
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
