import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Tab() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "blue",
      }}
    >
      <Text>Tab [Home|Settings]</Text>
      <Link href={"(tabs)/testNav"}>To Test Page</Link>
    </View>
  );
}
