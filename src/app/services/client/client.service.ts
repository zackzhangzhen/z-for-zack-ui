import { Injectable } from '@angular/core';
import {getUserAgentBasedStyle} from "../../utils/utils";
import {CookieService} from "ngx-cookie-service";
import {COOKIE_NAME_USER_ID, HOST} from "../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private cookieService: CookieService) { }

  isMobileClient(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  getUserAgent(){
    return navigator.userAgent;
  }

  getUserAgentBasedStyle(style1:string, style2:string) {
    return getUserAgentBasedStyle(style1, style2, this.isMobileClient());
  }

  /**
   * For some reason, when using cookieService, when domain is "/" the expiry won't be set so the cookie defaults to session cookie
   * So have to use setCookieCustomized
   * @param name
   * @param value
   */
  private setCookie(name:string, value:string){
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 365*2);
    let domain = HOST;
    let path = '/main';
    let secure = false;
    this.cookieService.set(name, value || "", expiry, path, domain, secure, 'Lax');
    this.cookieService.set(name, value);
  }

  public setCookieCustomized(name: string, value: string) {
    let d:Date = new Date();
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let path = "; path=/";
    let domain = `; domain=${HOST}`;
    let cookie =`${name}=${value}; ${expires}${path}${domain}`;
    document.cookie = cookie;
  }
}
