import { View, Text, ScrollView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { SCREEN_HEIGHT } from "../components/UI";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  console.log("params", params);
  return (
    <ScrollView style={{ flex: 1, overflow: "scroll" }}>
      <View style={{ flex: 1, position: "relative" }}>
        <Image
          source={params.medium_cover_image}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 1.5 }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: SCREEN_HEIGHT - SCREEN_HEIGHT / 1,
            height: 400,
          }}
        />
        <View style={{ position: "absolute", top: SCREEN_HEIGHT * 0.6 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
            {params.title_english}
          </Text>
          <View>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "400" }}>
              {params.name} 1
            </Text>
          </View>
        </View>

        {/* <Text
          onPress={() => {
            router.setParams({ name: "Updated" });
          }}
        >
          Update the title
        </Text> */}
      </View>
    </ScrollView>
  );
}
