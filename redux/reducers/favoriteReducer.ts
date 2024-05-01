import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "../../app/details";
import { useEffect } from "react";

//---------------- getting prev saved movies from local storage --------------------------------//

interface FavReducer {
  movies: Movie[];
}

const getFavoritesStorage = async (): Promise<Movie[]> => {
  try {
    const receivedData = await AsyncStorage.getItem(`@movies`);
    console.log(receivedData);
    if (receivedData != null) {
      const pursedData = JSON.parse(receivedData);
      return pursedData;
    }
    return [];
  } catch (error) {
    return [];
  }
};

// running asyncthunk to fetch the data from local storage -------------------/
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const favorites = await getFavoritesStorage();
    return favorites;
  }
);

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

    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const { addMovie, removeMovie, setMovies } = favoriteSlice.actions;
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
