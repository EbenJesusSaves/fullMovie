import { View, Text, ScrollViewBase, ScrollView } from "react-native";
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
import { SCREEN_HEIGHT } from "../../components/UI";

export default function Tab() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar />
      <MoviesList />
    </SafeAreaView>
  );
}
