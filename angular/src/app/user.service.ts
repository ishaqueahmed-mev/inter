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

  addUser(data) {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  getUser() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserById(id) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  deleteUser(id) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  updateUser(id, data) {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  getHobby() {
    return this.http.get(`${this.baseUrl}/hobby`);
  }

  getType() {
    return this.http.get(`${this.baseUrl}/type`);
  }
}
