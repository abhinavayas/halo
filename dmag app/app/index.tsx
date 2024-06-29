import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/FontAwesome6";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, firstTime, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  if (!loading && !isLogged) return <Redirect href="/welcome/about" />;

  return (
    <SafeAreaView className="bg-primary h-full justify-center px-3 ">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full flex justify-center items-center">
          <Text className="text-5xl text-white font-bold text-center">
            dMag
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
