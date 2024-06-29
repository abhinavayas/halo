import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const CommentInput = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: {
  value: string;
  placeholder: string;
  handleChangeText: any;
  otherStyles: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200  flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          {...props}
        />
        <Icon name="send" size={30} color="#FF9C01" />
      </View>
      <View></View>
    </View>
  );
};

export default CommentInput;
