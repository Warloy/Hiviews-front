import { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthAction, IAuthContextType, IAuthState, IAuthProviderProps } from "../interfaces/AuthContext.Interface";
import { setSession } from "../services/jwt";
import { SESSION_KEY } from "../constants/Session";

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType)

const initialState: IAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const stateReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  const { type } = action;

  switch (type) {

    case "INITIALIZE": {
      const { isAuthenticated, user } = action.payload;
      return {
        ...isAuthenticated,
        isAuthenticated,
        isInitialized: true,
        user
      };
    };

    case "LOGIN": {
      const { user } = action.payload;
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

  useEffect(() => {
    const initialize = async () => {
      try {

        const [ID_KEY, TOKEN_KEY] = SESSION_KEY;

        const accessID: string | null = await AsyncStorage.getItem(ID_KEY);
        const accessToken: string | null = await AsyncStorage.getItem(TOKEN_KEY);

        if (!accessToken) {
          setSession({ id: null, token: null });
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }

        await setSession({ id: accessID, token: accessToken });

        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user: {
              id: accessID,
              token: accessToken
            }
          }
        });

      } catch (error) {
        setSession({ id: null, token: null });
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      };
    };

    initialize();
  }, []);

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