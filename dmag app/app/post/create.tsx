import { useState } from "react";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { createVideoPost } from "../../utils/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome6";
const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<{
    caption: string;
    image: null | DocumentPicker.DocumentPickerAsset;
  }>({
    image: null,
    caption: "",
  });

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (form.caption === "" || !form.image) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        caption: "",
        image: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Share</Text>
        <TouchableOpacity className="mt-9" onPress={() => router.back()}>
          <Icon name="arrow-left" size={30} color="#CDCDE0" />
        </TouchableOpacity>
        <FormField
          title="Caption"
          value={form.caption}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e: any) => setForm({ ...form, caption: e })}
          otherStyles="mt-4"
          keyboardType={null}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="dMag"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
          textStyles={""}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
