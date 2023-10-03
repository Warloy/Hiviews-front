import { Axios, AxiosResponse } from "axios";
import { TResponseData, http } from "../http";

class MovieService {
  
  private BASE: string;

  constructor() {
    this.BASE = "movie-api";
  };

  public async findOne( args: string ): Promise<AxiosResponse<any>> {
    return await http.get(`${this.BASE}/title/${args}`)
  }

  public async search( args: string ): Promise<AxiosResponse<any>> {
    return await http.get(`${this.BASE}/search/${args}`)
  }

};

export default MovieService;