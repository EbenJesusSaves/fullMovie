import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Colors, SCREEN_HEIGHT } from "../../UI";

export const Genre = () => {
  return (
    <ScrollView horizontal style={{ flex: 1, padding: 10 }}>
      <GenreComp>
        <Text style={{ backgroundColor: Colors.main }}>Genre</Text>
      </GenreComp>
    </ScrollView>
  );
};

const GenreComp = styled(TouchableOpacity)`
  margin-right: 10px;
  padding: 10px;
  height: ${SCREEN_HEIGHT / 20}px;
  background-color: ${Colors?.main};
  border-radius: 18px;

  justify-content: center;
  align-items: center;
`;
