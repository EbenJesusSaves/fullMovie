import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Colors, SCREEN_HEIGHT } from "../../UI";

export const Genre = () => {
  const [activeGenre, setActiveGenre] = useState<string>("Action");
  const genres = [
    { name: "Action", emoji: "💥" },
    { name: "Adventure", emoji: "🌄" },
    { name: "Animation", emoji: "🎬" },
    { name: "Biography", emoji: "📚" },
    { name: "Comedy", emoji: "😂" },
    { name: "Crime", emoji: "🔍" },
    { name: "Documentary", emoji: "📹" },
    { name: "Drama", emoji: "🎭" },
    { name: "Family", emoji: "👪" },
    { name: "Fantasy", emoji: "🔮" },
    { name: "Film-Noir", emoji: "🕵️‍♂️" },
    { name: "History", emoji: "📜" },
    { name: "Horror", emoji: "👻" },
    { name: "Music", emoji: "🎵" },
    { name: "Musical", emoji: "🎶" },
    { name: "Mystery", emoji: "🔎" },
    { name: "Romance", emoji: "💖" },
    { name: "Sci-Fi", emoji: "🚀" },
    { name: "Short", emoji: "🎬" },
    { name: "Sport", emoji: "🏀" },
    { name: "Thriller", emoji: "🔥" },
    { name: "War", emoji: "⚔️" },
    { name: "Western", emoji: "🤠" },
  ];

  return (
    <ScrollView horizontal style={{ flex: 1, padding: 10 }}>
      {genres.map((genre) => (
        <GenreComp
          onPress={() => setActiveGenre(genre.name)}
          style={{
            backgroundColor: activeGenre.includes(genre.name)
              ? Colors.main
              : Colors.sprimary,
          }}
        >
          <Text
            style={{
              paddingHorizontal: 10,
              color: activeGenre.includes(genre.name) ? "black" : "white",
            }}
          >
            {genre.emoji} {genre.name}
          </Text>
        </GenreComp>
      ))}
    </ScrollView>
  );
};

const GenreComp = styled(TouchableOpacity)`
  margin-right: 10px;

  height: 30px;
  background-color: ${Colors?.main};
  border-radius: 18px;

  justify-content: center;
  align-items: center;
`;
