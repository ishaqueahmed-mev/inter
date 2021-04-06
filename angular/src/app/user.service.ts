import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.url;
  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
