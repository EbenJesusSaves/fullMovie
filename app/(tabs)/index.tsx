import { View, Text } from "react-native";
import { FullContainer } from "../../components/UI/UtilStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../../components/NavBar/Navbar";

export default function Tab() {
    return (
        <SafeAreaView>
            <Navbar />
        </SafeAreaView>
    );
}


