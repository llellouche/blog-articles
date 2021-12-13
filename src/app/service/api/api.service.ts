import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiService {
  public constructor(protected http: HttpClient) {
  }

  public extractError(error: HttpErrorResponse) {
    // TODO : Improve Handle Errors
    if (error.status === 404) {
      throw new Error('Not found');
    }
  }
}
