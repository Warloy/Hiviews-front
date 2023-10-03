import { Axios, AxiosResponse } from "axios";
import { TResponseData, http } from "../http";

class UserService {
  
  private BASE: string;
  private SECOND: string;

  constructor() {
    this.BASE = "user";
    this.SECOND= "profile";
  };

  public async get(): Promise<AxiosResponse<TResponseData>> {
    return await http.post(`${this.BASE}`);
  };

  public async findOne( args: string ): Promise<AxiosResponse<any>> {
    return await http.get(`${this.SECOND}/${args}`)
  }

  public async search( args: string ): Promise<AxiosResponse<any>> {
    return await http.get(`${this.SECOND}/match/${args}`)
  }

};

export default UserService;