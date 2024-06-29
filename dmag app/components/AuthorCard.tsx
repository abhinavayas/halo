import { IAuthors } from "@/app/types";
import { router } from "expo-router";
import { TouchableOpacity, View, Image, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const AuthorCard = ({
  profile_photo,
  item,
  activeItem,
}: {
  profile_photo: string;
  item: IAuthors;
  activeItem: string;
}) => {
  return (
    <>
      <Animatable.View
        className="mr-10"
        animation={activeItem === item.id ? zoomIn : zoomOut}
        duration={500}
      >
        <TouchableOpacity
          onPress={() => router.push(`/profile/${item.username}`)}
        >
          <View className="flex flex-col gap-3 justify-center items-center">
            <View className="w-[200px] h-[200px] rounded-full">
              <Image
                source={{
                  uri: profile_photo,
                }}
                className="w-full h-full rounded-full  overflow-hidden shadow-lg shadow-black/40"
                resizeMode="cover"
              />
            </View>
            <Text
              className={` ${
                activeItem === item.id ? "text-secondary-200" : "text-gray-100"
              } text-center text-lg font-psemibold transition-all`}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </>
  );
};

export default AuthorCard;
