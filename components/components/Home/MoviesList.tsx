import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { yifyApi } from '../../../apis/axios/config';
import { FlashList } from '@shopify/flash-list';

export const MoviesList = () => {
    const [movies, setMovies] = useState();
    useEffect(() => {
        (async () => {

            try {
                const { data: { data } } = await yifyApi.get(
                    "list_movies.json"
                );

                setMovies(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    console.log(movies);

    return (
        <View style={{ flex: 1 }}>

            <FlashList
                data={movies?.movies}
                renderItem={({ item }) => <View></View>}
                estimatedItemSize={200}
            />
        </View>
    )
}
