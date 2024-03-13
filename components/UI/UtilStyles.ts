import { ScrollView, Text, View, VirtualizedList } from "react-native";
import styled from "styled-components";
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from ".";

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
  overflow: scroll;
  background-color: "pink";
`;

export const SmallText = styled(Text)`
  color: white;
`;

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SmallWhiteText = styled(Text)`
  font-size: 11px;
  color: white;
`;

export const SmallSpicer = styled(View)`
  margin-top: ${SCREEN_HEIGHT * 0.03}px;
`;

export const ViewWithMargin = styled(View)`
  margin-left: ${SCREEN_WIDTH * 0.07}px;
`;
