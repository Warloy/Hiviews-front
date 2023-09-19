import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const handlePermissions = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Lo lamento, pero se necesitan permisos de la cámara para continuar...");
    }
  }
};

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  });

  if (result.canceled) {
    throw new Error("Lo lamento, pero la subida de imagen fue cancelada...");
  }

  return result.assets[0].uri;

};