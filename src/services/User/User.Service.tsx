import { AxiosResponse } from "axios";
import { TResponseData, http } from "../http";

class UserService {
  
  private BASE: string;

  constructor() {
    this.BASE = "user";
  };

  public async get(): Promise<AxiosResponse<TResponseData>> {
    return await http.post(`${this.BASE}`);
  };

};

export default UserService;