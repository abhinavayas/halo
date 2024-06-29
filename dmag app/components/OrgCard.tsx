import { TouchableOpacity, View, Image, Text } from "react-native";
import CustomButton from "./CustomButton";
import { IOrgs_data } from "@/app/types";

const OrgCard = ({
  item,
  onSelect,
  selectedId,
  handleProceedClick,
}: {
  item: IOrgs_data;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  selectedId: string;
  handleProceedClick: (org_code: string) => Promise<void>;
}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item.id)}>
      <View className={` mb-20 mx-4`}>
        <View className="flex flex-row items-center gap-3 mb-3">
          <Image
            className="w-11 h-11 rounded-full"
            resizeMode="contain"
            source={{
              uri: item.org_logo,
            }}
          />
          <View className="flex flex-col justify-center">
            <Text className="text-gray-100 font-psemibold tracking-wider">
              {item.abbr}{" "}
            </Text>
            <Text className="text-gray-400 text-xs tracking-wider">
              {item.name}{" "}
            </Text>
          </View>
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
        <View className={`${selectedId === item.id ? "block" : "hidden"} `}>
          <CustomButton
            title={"Proceed"}
            handlePress={() => handleProceedClick(item.abbr)}
            containerStyles={"w-full mt-3 bg-secondary-200/80"}
            textStyles={""}
            isLoading={false}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrgCard;
