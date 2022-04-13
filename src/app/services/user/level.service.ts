import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../../models/user";
import {NODE_JS_BASE_URL} from "../../constants/constants";
import {Level} from "../../models/level";
import {Rank} from "../../models/rank";

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }

  getLevelsByUserId(userId: string): Observable<Level[]> {
    if (!userId){
      console.error(`user id not given for getLevelsByUserId`);
      return of([]);
    }

    return this.http.get<Level[]>(`${NODE_JS_BASE_URL}levels?userId=${userId}`)
  }

  getRanks(): Observable<Rank[]> {
    return this.http.get<Rank[]>(`${NODE_JS_BASE_URL}ranks`)
  }
}
