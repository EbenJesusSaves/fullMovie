const Colors = {
  secondary: "#08070b",
  primary: "#24314E",
  sprimary: "#0e0224",
  gray: "#e4d7cf",
  medium_gray: "#999",
  dark_gray: "#666",
  nearlyRed: "#d80e16",
  brown: "#532517",
  main: "#D0FF49",
};
export { Colors };

import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isIOS = Platform.OS === "ios";
export { isAndroid, isIOS };

import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export { SCREEN_WIDTH, SCREEN_HEIGHT };
