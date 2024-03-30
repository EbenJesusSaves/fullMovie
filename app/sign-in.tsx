// import { View, Text } from "react-native";
// import React from "react";
// import { SmallWhiteText } from "../components/UI/UtilStyles";
// import { SafeAreaView } from "react-native-safe-area-context";
// const signInScreen = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View>
//         <SmallWhiteText>username</SmallWhiteText>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default signInScreen;

import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
