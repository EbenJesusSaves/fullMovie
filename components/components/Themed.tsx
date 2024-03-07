/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";
import { Colors } from "../UI";

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.dark_gray & keyof typeof Colors.dark_gray
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors.main;
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultText {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultView {...otherProps} />;
}
