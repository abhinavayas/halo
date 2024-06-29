import { Redirect, Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";

import Icon from "react-native-vector-icons/Feather";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Icon name={icon} size={25} color={focused ? color : "#CDCDE0"} />
      <Text
        className={`${
          focused ? "font-bold text-secondary" : "font-pregular text-gray-100 "
        } text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF9C01",
          tabBarInactiveTintColor: "#0f0f0f",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 2,
            borderTopColor: "#232533",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"home"}
                color={color}
                name={"Home"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "People",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"users"}
                color={color}
                name={"People"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="dev"
          options={{
            title: "Developer",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"code"}
                color={color}
                name={"Developer"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: "Me",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"user"}
                color={color}
                name={"Me"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
