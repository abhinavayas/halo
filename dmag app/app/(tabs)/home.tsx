import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Authors from "@/components/Authors";
import SearchInput from "@/components/SearchInput";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { IAuthors, IPost } from "../types";
import { useGlobalContext } from "@/context/GlobalProvider";
import PostCard from "@/components/PostCard";
import { getAllPosts, getuser } from "@/utils/appwrite";

export default function App() {
  const { orgCode } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const [posts_data, set_posts_data] = useState<IPost[] | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const first_run = async () => {
      const firstTimeStorageValue = useAsyncStorage("FirstTime");
      await firstTimeStorageValue.setItem("NO");

      const posts_fetched = await getAllPosts();
      const _posts_data: IPost[] = [];
      for (let i = 0; i < posts_fetched.length; i++) {
        const _current_user = await getuser(await posts_fetched[i].creator);
        _posts_data.push({
          $id: posts_fetched[i].$id,
          caption: posts_fetched[i].caption,
          creator: posts_fetched[i].creator,
          profile_photo: _current_user.profile_photo,
          username: _current_user.username,
          image: posts_fetched[i].image,
        });
      }
      console.log("_posts_data : ", _posts_data);
      set_posts_data(_posts_data);
    };
    first_run();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts_data}
        keyExtractor={(item: { $id: string }, index: number) => item.$id}
        renderItem={({ item }: { item: IPost }) => (
          <PostCard clickable={true} item={item} author_clickable={true} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Abhinav Raj
                </Text>
              </View>

              <View>
                <Text className="text-white">{orgCode}</Text>
              </View>
            </View>
            <SearchInput initialQuery="" />
            <View className="">
              <Text className="text-lg font-pregular text-gray-100 mb-6 mt-6">
                dMags
              </Text>

              <Authors />
              <Text className="text-lg font-pregular text-gray-100 mt-9">
                Latest
              </Text>
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
