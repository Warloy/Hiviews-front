import { Dispatch, ReactNode } from "react";
import { TSession } from "@/types/User.Type";

export interface IAuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: TSession | null;
};

export interface IAuthAction {
  type: "INITIALIZE" | "LOGIN" | "LOGOUT" | null;
  payload?: any;
};

export interface IAuthContextType {
  state: IAuthState;
  dispatch: Dispatch<IAuthAction>;
};

export interface IAuthProviderProps {
  children: ReactNode;
};