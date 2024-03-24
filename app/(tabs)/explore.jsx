import { View, Text } from "react-native";
import FilterMovies from "../../components/components/explore/FilterMovies";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <FilterMovies />
      </View>
    </SafeAreaView>
  );
}
