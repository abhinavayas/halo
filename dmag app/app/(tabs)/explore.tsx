import { StatusBar } from "expo-status-bar";
import React from "react";

import { Text, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";

export default function App() {
  return (
    <View className="flex-1 bg-white justify-center px-3 ">
      <View className="w-full flex items-center pb-9">
        <Icon name="face-laugh-squint" size={200} color="green" />
      </View>

      <Text className="text-5xl text-black font-black">Hi there 👋🏻</Text>
      <StatusBar style="auto" />
    </View>
  );
}
