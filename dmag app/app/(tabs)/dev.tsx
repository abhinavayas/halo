import { StatusBar } from "expo-status-bar";
import React from "react";

import { Linking, Text, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";

export default function App() {
  return (
    <View className="flex-1 bg-white justify-center px-3 ">
      <View className="w-full flex items-center pb-9">
        <Icon name="github" size={200} color="gray" />
      </View>
      <View className="flex flex-row justify-center items-center">
        <Text className="text-2xl text-black font-black">
          Star ⭐️ {">>  "}{" "}
        </Text>
        <Text
          style={{ color: "blue" }}
          onPress={() =>
            Linking.openURL(
              "https://github.com/abhinavrajdevx/react-native-expo-router-nativewind-boilerplate"
            )
          }
          className="text-xl font-bold tracking-widest underline"
        >
          Github
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
