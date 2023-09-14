import { AxiosResponse } from "axios";
import { TResponseData, http } from "../http";

class AuthService {

  private BASE: string;

  constructor() {
    this.BASE = "/auth";
  };

  public async login(values: any): Promise<AxiosResponse<TResponseData>> {
    const { data } = await http.post(`${this.BASE}/login`, values);
    return data;
  }

  public async register(values: any): Promise<AxiosResponse<TResponseData>> {
    const { data } = await http.post(`${this.BASE}/register`, values);
    return data;
  };

};

export default AuthService;