import { View, Image, Text } from "react-native";
import React from "react";
import { IAuthors } from "@/app/types";
import CustomButton from "./CustomButton";

const UserInfo = ({ user }: { user: IAuthors }) => {
  return (
    <View className="flex items-center justify-center">
      <View className="w-[200px] h-[200px] flex items-center justify-center border-2 border-secondary-200 rounded-full">
        <Image
          source={{
            uri: user.profile_photo,
          }}
          className="w-full h-full rounded-full  overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
      </View>
      <View className="mt-3 w-full">
        {/* GENERE */}
        <View className="flex flex-row gap-3 mb-3 justify-center">
          {/* Followers */}
          <View className="flex flex-row">
            <Text className="font-light  text-gray-100">{"Followers  "}</Text>
            <Text className="font-psemibold tracking-wider text-secondary-100/80">
              {1700}
            </Text>
          </View>
          <Text className="font-light  text-gray-100">{"|"}</Text>
          {/* Following */}
          <View className="flex flex-row">
            <Text className="font-light  text-gray-100">{"Following  "}</Text>
            <Text className="font-psemibold tracking-wider text-secondary-100/80">
              {1900}
            </Text>
          </View>
        </View>
        {/* GENERE */}
        <View className="flex flex-row">
          <Text className="font-light  text-gray-100">{"Genere  "}</Text>
          <Text className="font-psemibold tracking-wider text-secondary-100/80">
            {"Startups"}
          </Text>
        </View>
        {/* LINKS */}
        <View className="flex flex-row">
          <Text className="font-light  text-gray-100">{"Instagram  "}</Text>
          <Text className="font-psemibold tracking-wider text-secondary-100/80">
            {"@miachel_xxy"}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="font-light  text-gray-100">{"Mail  "}</Text>
          <Text className="font-psemibold tracking-wider text-secondary-100/80">
            {"miachel34@gmail.com"}
          </Text>
        </View>
        {/* BIO */}
        <View className="flex flex-row mb-3">
          <Text className="font-psemibold tracking-wider text-gray-100">
            {"I write about startups see you around"}
          </Text>
        </View>
        <CustomButton
          title={"Follow"}
          handlePress={undefined}
          containerStyles={"bg-secondary-200/40"}
          textStyles={""}
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default UserInfo;
