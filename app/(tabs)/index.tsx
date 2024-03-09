import { View, Text } from "react-native";
import {
  FullContainer,
  ScrollContainer,
  SmallText,
} from "../../components/UI/UtilStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../../components/NavBar/Navbar";
import { GreetingsComponent } from "../../components/components/Home/GreetingsComponent";
import { MoviesList } from "../../components/components/Home/MoviesComp";
import { Genre } from "../../components/components/Home/Genre";

export default function Tab() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar />
      <ScrollContainer>
        <GreetingsComponent />
        <Genre />
        <MoviesList />
      </ScrollContainer>
    </SafeAreaView>
  );
}
