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

};

export default ReviewService;