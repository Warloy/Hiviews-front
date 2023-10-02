import { AxiosResponse } from "axios";
import { http } from "../http";

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

};

export default ReviewService;