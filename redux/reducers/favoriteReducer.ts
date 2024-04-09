import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../app/details";

//---------------- getting prev saved movies from local storage --------------------------------//

interface FavReducer {
  movies: Movie[];
}

const getFavoritesStorage = async (): Promise<Movie[]> => {
  try {
    const receivedData = await AsyncStorage.getItem(`@movies`);

    if (receivedData != null) {
      const pursedData = JSON.parse(receivedData);
      return pursedData;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const favoriteSlice = createSlice({
  name: "favoriteMovies",
  initialState: {
    movies: [],
  } as any,
  reducers: {
    addMovie: (state, { payload }: PayloadAction<Movie>) => {
      state.movies.unshift(payload);
      saveFavoritesStorage(state.movies);

      //   const prevFavs = await getFavoritesStorage();
      //   console.log(prevFavs);
    },
    removeMovie: (state, { payload }: PayloadAction<any>) => {
      const newMovies = state.movies.filter(
        (movie: any) => movie.id !== payload.id
      );
      state.movies = newMovies;
      saveFavoritesStorage(state.movies);
    },
  },
});

export const { addMovie, removeMovie } = favoriteSlice.actions;
export default favoriteSlice.reducer;
const saveFavoritesStorage = async (moviesValue: Movie[]) => {
  try {
    const receivedData = JSON.stringify(moviesValue);
    await AsyncStorage.setItem(`@movies`, receivedData);
  } catch (error) {
    console.log(error);
  }
};

// find ways to save movie so async storage

//initial state being previous movies
// save new movies and
