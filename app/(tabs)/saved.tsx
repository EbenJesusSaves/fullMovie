import { Button } from "@rneui/base";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = () => {
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState();
  const [prompt, setPrompt] = useState("");
  const getChat = async () => {
    setLoading(true);
    const body = {
      model: "Awanllm-Llama-3-8B-Dolfin",
      messages: [
        {
          role: "system",
          content:
            "You're a user agent who suggests a movie to users based on their  feelings, please give the exact title of the movie and do not add  anything, just the title alone",
        },
        { role: "user", content: "I'm feeling a bit bored" },
        { role: "assistant", content: "Hi!, how can I help you today?" },
      ],
      repetition_penalty: 1.1,
      temperature: 0.7,
      top_p: 0.9,
      top_k: 40,
      max_tokens: 1024,
    };
    try {
      const { data } = await axios.post(
        "https://api.awanllm.com/v1/chat/completions",
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_AWANLLM_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      // chunks.push(data);
      console.log(data.choices[0]);
      setStream(data.choices[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChat();
  }, []);

  console.log(stream);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Button onPress={getChat}>Press to get Chat</Button>
        <Text style={{ color: "white" }}>testNav tested this one too </Text>
      </View>
    </SafeAreaView>
  );
};
export default Tab;
