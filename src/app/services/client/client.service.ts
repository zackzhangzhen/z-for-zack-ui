import { Injectable } from '@angular/core';
import {getUserAgentBasedStyle} from "../../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  isMobileClient(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  getUserAgent(){
    return navigator.userAgent;
  }

  getUserAgentBasedStyle(style1:string, style2:string) {
    return getUserAgentBasedStyle(style1, style2, this.isMobileClient());
  }
}
