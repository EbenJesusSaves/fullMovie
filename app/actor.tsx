import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallWhiteText } from "../components/UI/UtilStyles";
import { useLocalSearchParams } from "expo-router";
import { baseAPI } from "../apis/axios/config";
import { Skeleton } from "@rneui/themed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";

export default function Actor() {
  const params = useLocalSearchParams();
  const [actorDetails, setActorDetails] = useState();
  const [loading, setLoading] = useState(false);
  console.log(actorDetails);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await baseAPI.get(`/person/${params.imdb_code}`);
        setActorDetails(data);
        setLoading(false);
      } catch (error) {}
    })();
  }, [params.imdb_code]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Skeleton
        width={SCREEN_WIDTH - 20}
        animation="pulse"
        height={SCREEN_HEIGHT / 3}
      />
      <Image
        style={{ flex: 1, height: 200, borderRadius: 15 }}
        source={`https://image.tmdb.org/t/p/w500${actorDetails?.profile_path}`}
      />
      <SmallWhiteText>{params.imdb_code}</SmallWhiteText>
    </View>
  );
}
