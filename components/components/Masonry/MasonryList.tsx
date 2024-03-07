import {
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
} from "react-native";

import { useState } from "react";
import { View } from "../Themed";
import Pin from "./Pin";

interface IMasonryList {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

const MasonryList = ({
  pins,
  refreshing = false,
  onRefresh = () => {},
}: IMasonryList) => {
  const width = useWindowDimensions().width;
  console.log(pins);
  const numColumns = Math.ceil(width / 350);
  console.log(pins);
  return (
    <ScrollView
      contentContainerStyle={{ width: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {Array.from(Array(numColumns)).map((_, colIndex) => (
          <View style={styles.column} key={`column_${colIndex}`}>
            {pins
              .filter((_, index) => index % numColumns === colIndex)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
});

export default MasonryList;
