import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { IComment, IPost } from "../app/types";
import { router } from "expo-router";
import AuthorBrick from "./AuthorBrick";

const CommentCard = ({ item }: { item: IComment }) => {
  return (
    <View className="mb-9 mx-4">
      <View className="flex flex-row items-center gap-3 mb-3">
        <TouchableOpacity
          onPress={() => router.push(`/profile/${item.username}`)}
        >
          <AuthorBrick
            name={item.name}
            profile_photo={item.profile_photo}
            username={item.username}
          />
        </TouchableOpacity>
      </View>

      <View className="w-full mb-3">
        <Text className="text-gray-300 font-psemibold tracking-wider">
          {item.caption}{" "}
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;
