import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {NODE_JS_BASE_URL} from "../../constants/constants";
import {User} from "../../models/user";
import {isObjectNullOrEmpty} from "../../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User

  constructor(private http: HttpClient) {

  }

  logIn(name: string, password: string): Observable<User>{
    return this.http.get<User>(`${NODE_JS_BASE_URL}users?name=${name}&password=${password}`)
  }

  create(user: User): Observable<any>{
    return this.http.post<any>(`${NODE_JS_BASE_URL}users`, user)
  }

  getUserById(id: string): Observable<User> {
    if (!id){
      console.error(`invalid user id: ${id}`);
      return of({} as User);
    }

    return this.http.get<User>(`${NODE_JS_BASE_URL}users/${id}`)
  }

  getUserByName(name: string): Observable<User[]> {
    if (!name){
      console.error(`invalid name: ${name}`);
      return of([] as User[]);
    }

    return this.http.get<User[]>(`${NODE_JS_BASE_URL}users?name=${name}`)
  }

  isLoggedIn() {
    return !isObjectNullOrEmpty(this.currentUser);
  }
}
