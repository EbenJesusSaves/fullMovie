import React, { useEffect, useState } from "react";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import { FlexBox, SmallText } from "../../UI/UtilStyles";
import SwiperFlatList from "react-native-swiper-flatlist";
import { baseAPI, staticImageLink } from "../../../apis/axios/config";
import { Image } from "expo-image";
const colors = ["tomato", "thistle", "skyblue", "teal"];

interface ApiRes {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
}

export const GreetingsComponent = () => {
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState<ApiRes>();
    useEffect(() => {
        (async () => {
            console.log("hi");
            try {
                const { data } = await baseAPI.get<ApiRes>(
                    "movie/upcoming?include_adult=true&include_video=true&language=en-US&page=1"
                );

                setTrending(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    console.log(trending);

    return (
        <View style={{ flex: 1 }}>
            <FlexBox>
                <SmallText>Hello, Welcome back</SmallText>
            </FlexBox>
            {/* <View>
                <Image contentFit="cover" style={{ flex: 1, width: 'auto', height: 200 }} source={`https://image.tmdb.org/t/p/w500${trending?.results?.[0]?.backdrop_path}`} />
                <Text style={styles.text}>{trending?.results?.[0]?.original_title}</Text>
            </View> */}
            <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={2}
                showPagination={false}
                data={trending?.results}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            width: width,
                            justifyContent: "center",
                            borderRadius: 15,
                            position: "relative",
                        }}
                    >
                        <Text style={{
                            backgroundColor: " rgba(73, 73, 73, 0.4)",
                            width: "auto",
                            padding: 5,
                            position: "absolute",
                            color: "white",
                            height: 40,
                            zIndex: 11,
                            borderWidth: 0.3,
                            borderColor: "white",
                            borderRadius: 15,
                            overflow: 'hidden',
                            elevation: 2,
                            bottom: 40,
                            fontWeight: '700'


                        }}>
                            {item.vote_average.toFixed(1)}
                        </Text>
                        <Text
                            style={{
                                backgroundColor: " rgba(73, 73, 73, 0.4)",
                                width: "auto",
                                padding: 5,
                                position: "absolute",
                                color: "white",
                                height: 40,
                                zIndex: 10,
                                borderWidth: 0.3,
                                borderColor: "white",
                                borderRadius: 15,
                                overflow: 'hidden',
                                elevation: 2,
                                bottom: 10,
                                fontWeight: '700'


                            }}
                        >
                            {item.original_title}
                        </Text>

                        <Image
                            contentFit="cover"
                            style={{ flex: 1, height: 200, borderRadius: 15 }}
                            source={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    text: { textAlign: "center", color: "white" },
});
