import { AxiosResponse } from "axios";
import { TResponseData, http } from "../http";
import { TLogin } from "@/types/User.Type";

class AuthService {

  private BASE: string;

  constructor() {
    this.BASE = "/auth";
  };

  public async login(values: TLogin): Promise<AxiosResponse<TResponseData>> {
    return await http.post(`${this.BASE}/login`, values);
  }

  public async register(values: any): Promise<AxiosResponse<TResponseData>> {
    return await http.post(`${this.BASE}/register`, values);
  };

};

export default AuthService;