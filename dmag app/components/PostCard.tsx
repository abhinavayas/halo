import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { IPost } from "../app/types";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import AuthorBrick from "./AuthorBrick";

const PostCard = ({
  item,
  clickable,
  author_clickable,
}: {
  item: IPost;
  clickable: boolean;
  author_clickable: boolean;
}) => {
  if (!clickable) {
    return (
      <View className="mb-9 mx-4">
        {author_clickable ? (
          <TouchableOpacity
            onPress={() => router.push(`/profile/${item.creator}`)}
          >
            <AuthorBrick
              name={item.creator}
              profile_photo={item.profile_photo}
              username={item.creator}
            />
          </TouchableOpacity>
        ) : (
          <AuthorBrick
            name={item.creator}
            profile_photo={item.profile_photo}
            username={item.creator}
          />
        )}

        <View className="w-full mb-3">
          <Text className="text-gray-300 font-psemibold tracking-wider">
            {item.caption}{" "}
          </Text>
        </View>
        <View className="w-full h-60">
          <Image
            source={{
              uri: item.image,
            }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="mt-3 ">
          <View className="flex flex-row justify-center items-center gap-3">
            <Icon name="chatbubble-outline" size={20} color="#CDCDE0" />
            <Text className="text-gray-100 tracking-wider font-bold">200</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View className="mb-9 mx-4">
      {author_clickable ? (
        <TouchableOpacity
          onPress={() => router.push(`/profile/${item.username}`)}
        >
          <AuthorBrick
            name={item.username}
            profile_photo={item.profile_photo}
            username={item.username}
          />
        </TouchableOpacity>
      ) : (
        <AuthorBrick
          name={item.username}
          profile_photo={item.profile_photo}
          username={item.username}
        />
      )}
      <TouchableOpacity onPress={() => router.push("/post/amn")}>
        <View className="w-full mb-3">
          <Text className="text-gray-300 font-psemibold tracking-wider">
            {item.caption}{" "}
          </Text>
        </View>
        <View className="w-full h-60">
          <Image
            source={{
              uri: item.image,
            }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="mt-3 ">
          <View className="flex flex-row justify-center items-center gap-3">
            <Icon name="chatbubble-outline" size={20} color="#CDCDE0" />
            <Text className="text-gray-100 tracking-wider font-bold">200</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;
