import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  getUser(userObj) {
    return this.http.get(`${this.baseUrl}/users`, {params: userObj}).pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  getUserById(id) {
    return this.http.get(`${this.baseUrl}/users/get-user-by-id/${id}`);
  }

  deleteUser(id) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  updateUser(data, id) {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  getHobby() {
    return this.http.get(`${this.baseUrl}/hobby`);
  }

  getType() {
    return this.http.get(`${this.baseUrl}/type`);
  }
}
