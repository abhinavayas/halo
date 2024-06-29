import { View, Text, Image } from "react-native";
import React from "react";
import { IPost } from "@/app/types";

const AuthorBrick = ({
  name,
  profile_photo,
  username,
}: {
  name: string;
  profile_photo: string;
  username: string;
}) => {
  return (
    <View className="flex flex-row items-center gap-3 mb-3">
      <Image
        className="w-11 h-11 rounded-full"
        resizeMode="contain"
        source={{
          uri: profile_photo,
        }}
      />
      <View className="flex flex-col justify-center">
        <Text className="text-gray-100 font-psemibold tracking-wider">
          {name}{" "}
        </Text>
        <Text className="text-gray-400 text-xs tracking-wider">
          {username}{" "}
        </Text>
      </View>
    </View>
  );
};

export default AuthorBrick;
