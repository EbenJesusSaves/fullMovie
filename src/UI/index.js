const Colors = {
  primary: "#545264",
  gray: "gray",
  medium_gray: "#999",
  dark_gray: "#666",
};
export { Colors };

import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isIOS = Platform.OS === "ios";
export { isAndroid, isIOS };

import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export { SCREEN_WIDTH, SCREEN_HEIGHT };
