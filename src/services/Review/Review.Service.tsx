import { AxiosResponse } from "axios";
import { TResponseData, http } from "../http";

class ReviewService {

  private BASE: string;

  constructor() {
    this.BASE = "/review";
  };

  public async getAll(): Promise<AxiosResponse<any>> {
    return await http.get(`${this.BASE}`);
  }

  public async findOne( args: string ): Promise<AxiosResponse<any>> {
    return await http.get(`${this.BASE}/${args}`)
  }

  public async search( args: string ): Promise<AxiosResponse<any>> {
    return await http.get(`${this.BASE}/match/${args}`)
  }

  public async new( data: any ): Promise<AxiosResponse<TResponseData>> {
    return await http.post(`${this.BASE}`, data);
  };

};

export default ReviewService;