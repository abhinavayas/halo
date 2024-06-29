import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { IComment, IPost } from "../types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import PostCard from "@/components/PostCard";
import Icon from "react-native-vector-icons/FontAwesome6";
import CommentCard from "@/components/CommentCard";
import CommentInput from "@/components/CommentInput";

export default function App() {
  const { query } = useLocalSearchParams();
  const { orgCode } = useGlobalContext();
  const user = {
    id: "3",
    name: "Miachel",
    username: "miachel_king",
    profile_photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6f1TEt2umBEnBStuEAIHnuGRP3qGjmdyug&s",
  };
  const [refreshing, setRefreshing] = useState(false);

  const post_ata: IPost = {
    name: "Knocker",
    id: "4",
    image:
      "data:image/jpeg;base64,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",
    username: "Knocker_09",
    caption:
      "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
    profile_photo:
      "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
  };

  const comments_data: IComment[] = [
    {
      name: "Knocker",
      id: "1",
      username: "Knocker_09",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
    {
      name: "Knocker",
      id: "2",
      username: "Knocker_09",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
    {
      name: "Knocker",
      id: "3",
      username: "Knocker_09",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
    {
      name: "Knocker",
      id: "4",
      username: "Knocker_09",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
    {
      name: "Knocker",
      id: "5",
      username: "Knocker_09",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
  ];

  const [comment, set_comment] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const first_run = async () => {
      const firstTimeStorageValue = useAsyncStorage("FirstTime");
      await firstTimeStorageValue.setItem("NO");
    };
    first_run();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={comments_data}
        keyExtractor={(item: { id: string }, index: number) => item.id}
        renderItem={({ item }: { item: IComment }) => (
          <CommentCard item={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex mt-6 space-y-6">
            <View className="flex justify-between items-center flex-row mb-6 px-4">
              <View className="">
                <Text className="font-pmedium text-sm text-gray-100">
                  {query}
                </Text>
                <Text className="text-2xl font-psemibold  text-white">
                  {user.name}
                </Text>
              </View>
              <View>
                <Text className="text-white">{orgCode}</Text>
              </View>
            </View>
            <TouchableOpacity
              className="mb-9 ml-4"
              onPress={() => router.back()}
            >
              <Icon name="arrow-left" size={30} color="#CDCDE0" />
            </TouchableOpacity>

            <PostCard
              clickable={false}
              item={post_ata}
              author_clickable={true}
            />
            <View className="w-full flex-1 pt-5 pb-8 mx-4">
              <Text className="text-lg font-pregular text-gray-100 ">
                Comments
              </Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View className="w-full  px-4 ">
        <CommentInput
          placeholder={"Your thaughts..."}
          handleChangeText={set_comment}
          otherStyles={""}
          value={comment}
        />
      </View>
    </SafeAreaView>
  );
}
