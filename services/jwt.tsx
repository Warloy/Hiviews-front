import AsyncStorage from "@react-native-async-storage/async-storage";
import { TSession } from "../types/User.Type";
import { http } from "./http";
import { SESSION_KEY } from "../constants/Session";

export const setSession = async ({ id, token }: TSession): Promise<void> => {
  try {

    const [ID_KEY, TOKEN_KEY] = SESSION_KEY;

    if (!id || !token) {
      AsyncStorage.removeItem(ID_KEY);
      AsyncStorage.removeItem(TOKEN_KEY);
      delete http.defaults.headers.common["Authorization"];
      return;
    }
  
    const strId = typeof id === "number" ? String(id) : id;
    const strToken = typeof token === "number" ? String(token) : token;
  
    await AsyncStorage.setItem(ID_KEY, strId);
    await AsyncStorage.setItem(TOKEN_KEY, strToken);
    http.defaults.headers.common["Authorization"] = `Bearer ${strToken}`;
    return;

  } catch (error) {
    console.log(error);
    return;
  }
}