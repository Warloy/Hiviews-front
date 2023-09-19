import AsyncStorage from "@react-native-async-storage/async-storage";
import { TSession } from "@/types/User.Type";
import { http } from "./http";
import { SESSION_KEY } from "@/constants/Session";

export const setSession = async (session: TSession): Promise<void> => {
  try {

    const [ID_KEY, TOKEN_KEY, USER_KEY] = SESSION_KEY;

    if (!session?.id || !session?.token || !session?.user) {
      await AsyncStorage.removeItem(ID_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      delete http.defaults.headers.common["Authorization"];

      return;
    }

    const { id, token, user } = session;

    const strId = typeof id === "number" ? String(id) : id;
    const strToken = typeof token === "number" ? String(token) : token;
  
    await AsyncStorage.setItem(ID_KEY, strId);
    await AsyncStorage.setItem(TOKEN_KEY, strToken);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    http.defaults.headers.common["Authorization"] = `Bearer ${strToken}`;

    return;

  } catch (error) {
    console.error(error);
    return;
  }
}