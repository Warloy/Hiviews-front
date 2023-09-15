import { createContext, useEffect, useReducer, useState } from "react";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthAction, IAuthContextType, IAuthState, IAuthProviderProps } from "@/interfaces/AuthContext.Interface";
import { setSession } from "@/services/jwt";
import { SESSION_KEY } from "@/constants/Session";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType)

const initialState: IAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const stateReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  const { type, payload } = action;

  switch (type) {

    case "INITIALIZE": {
      const { isAuthenticated, user } = payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user
      };
    };

    case "LOGIN": {
      const { user } = payload;
      return {
        ...state,
        isAuthenticated: true,
        user
      }
    };

    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    };

    default:
      return state;
  };
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();

  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [isNavigationReady, setNavigationReady] = useState(false);

  const inAuthGroup = segments[0] === "(auth)";

  useEffect(() => {

    const unsubscribe = rootNavigation?.addListener("state", () => {
      setNavigationReady(true)
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };

  }, [rootNavigation]);

  useEffect(() => {
    const initialize = async () => {
      try {

        const [ID_KEY, TOKEN_KEY] = SESSION_KEY;

        const accessID: string | null = await AsyncStorage.getItem(ID_KEY);
        const accessToken: string | null = await AsyncStorage.getItem(TOKEN_KEY);

        if (!accessID || !accessToken) {
          setSession(null);
          dispatch({
            type: "INITIALIZE",
            payload: {
              isInitialized: true,
              isAuthenticated: false,
              user: null
            }
          });
          return;
        }

        await setSession({ id: accessID, token: accessToken });

        dispatch({
          type: "INITIALIZE",
          payload: {
            isInitialized: true,
            isAuthenticated: true,
            user: {
              id: accessID,
              token: accessToken
            }
          }
        });

        setAuthInitialized(true);

      } catch (error) {

        setSession(null);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isInitialized: true,
            isAuthenticated: false,
            user: null
          }
        });

        setAuthInitialized(true);
      };
    };

    initialize();
  }, []);

  useEffect(() => {

    if (!authInitialized) return;

    if (!state.user && !inAuthGroup) {
      router.push(`/(auth)/login`);
    } else if (state.user && inAuthGroup) {
      router.push(`/(tabs)/feed`);
    }

  }, [state, segments, authInitialized, isNavigationReady])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  ;
}