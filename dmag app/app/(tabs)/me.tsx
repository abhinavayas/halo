import React, { useEffect, useState } from "react";
import { FlatList, Linking, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Authors from "@/components/Authors";
import SearchInput from "@/components/SearchInput";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { IPost } from "../types";
import { useGlobalContext } from "@/context/GlobalProvider";
import PostCard from "@/components/PostCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function App() {
  const { orgCode, user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const posts_data: IPost[] = [
    {
      name: "Miachel",
      id: "2",
      image:
        "data:image/jpeg;base64,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",
      username: "Miachel_klp",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, and observe its 50th anniversary.",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },

    {
      name: "Harper",
      id: "3",
      image:
        "data:image/jpeg;base64,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",
      username: "Harper_98",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
    {
      name: "Knocker",
      id: "4",
      image:
        "data:image/jpeg;base64,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",
      username: "Knocker_09",
      caption:
        "The momentary bonhomie gave way to both the Treasury benches and the Opposition digging into their entrenched positions. All it took was for Om Birla to call upon the Congress to condemn the Emergency imposed by Indira Gandhi, ",
      profile_photo:
        "https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?format=pjeg&auto=webp&crop=1:1",
    },
  ];

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
        data={posts_data}
        keyExtractor={(item: { id: string }, index: number) => item.id}
        renderItem={({ item }: { item: IPost }) => (
          <PostCard clickable={true} item={item} author_clickable={true} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Abhinav Raj
                </Text>
              </View>
              <View>
                <Text className="text-white">{orgCode}</Text>
              </View>
            </View>
            <CustomButton
              title={"View Me"}
              handlePress={() => router.push(`/profile/${user.username}`)}
              containerStyles={"px-3 bg-gray-100/50"}
              textStyles={""}
              isLoading={false}
            />
            <View className="flex-1 mt-5">
              <Text className="text-lg font-pregular text-gray-100 mb-9">
                Following
              </Text>
              <Authors />
              <View className="flex flex-row items-center justify-between mt-9">
                <Text className="text-lg font-pregular text-gray-100 ">My</Text>
              </View>
              <View className="flex items-center justify-between mt-3">
                {user.isAuthor ? (
                  <Text className="text-xs font-pregular text-green-400 tracking-wider">
                    {`Congrats ! You are an Author now `}
                    <Text
                      onPress={() => router.push("/post/create")}
                      className="text-xs font-bold tracking-widest underline"
                    >
                      Share
                    </Text>
                  </Text>
                ) : (
                  <Text className="text-xs font-pregular text-secondary-200 tracking-wider">
                    {`You are not currently a author to upload posts, you need to have author privelages. `}
                    <Text
                      onPress={() =>
                        Linking.openURL(
                          "https://github.com/abhinavrajdevx/react-native-expo-router-nativewind-boilerplate"
                        )
                      }
                      className="text-xs font-bold tracking-widest underline"
                    >
                      Apply now
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
