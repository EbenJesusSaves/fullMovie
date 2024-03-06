import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { Colors } from ".";

export const FullContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.secondary};
`;

export const FlexBox = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2%;
`;

export const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

export const SmallText = styled(Text)`
  color: white;
`;
