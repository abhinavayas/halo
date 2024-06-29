import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/FontAwesome6";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full justify-center px-3 ">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full flex justify-center items-center">
          <View className="w-full flex items-center pb-9">
            <Icon name="face-laugh-squint" size={200} color="green" />
          </View>

          <Text className="text-3xl text-white font-bold text-center">
            Whats's in your College 👩‍❤️‍👨
          </Text>
          <CustomButton
            title={"Explore"}
            handlePress={() => router.navigate("/sign-in")}
            containerStyles={"mt-9 w-full"}
            textStyles={""}
            isLoading={false}
          ></CustomButton>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
