import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {NODE_JS_BASE_URL} from "../../constants/constants";
import {TopAlert} from "../../models/top-alert";

export const TOP_ALERT_TYPES = {
  error: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
};

@Injectable({
  providedIn: 'root'
})
export class TopAlertService {
  /** Contains the message to display and the alert type (see Clarity doc) */
  private alertMessageSource = new Subject<TopAlert>();
  /** For closing the alert component */
  private closeAlertSource = new Subject();

  // Observable streams
  public alertMessage$: Observable<TopAlert>;
  public closeAlert$: Observable<any>;

  constructor(private http: HttpClient) {
    this.alertMessage$ = this.alertMessageSource.asObservable();
    this.closeAlert$ = this.closeAlertSource.asObservable();
  }

  subscribeToTopAlerts(callback: (alert: TopAlert)=>void) {
    this.alertMessage$.subscribe(
      (alert: TopAlert) => callback(alert),
      error => console.log(`failed to subscribe to top alerts: ${error}`),
    )
  }

  getNewTopAlerts(): Observable<TopAlert[]> {
    return this.http.get<TopAlert[]>(`${NODE_JS_BASE_URL}top-alerts`)
  }

  addTopAlert(alert: TopAlert) {
    return this.http.post(`${NODE_JS_BASE_URL}top-alerts`, alert).subscribe(
      (response: any)=> {
        console.log(`adding top alert succeeded: ${response}`);
        alert._id = response.id;
        this.showTopAlert(alert);
      },
      error => {
        console.log(`failed to add top alert: ${error}`);
      }
    );
  }

  patchTopAlert(alert: TopAlert) {
    this.http.patch(`${NODE_JS_BASE_URL}top-alerts/${alert._id}`, alert).subscribe(
      response=> {
        console.log(`modify top alert succeeded: ${response}`);
        this.closeAlertSource.next({});
      },
      error => {
        console.log(`failed to modify top alert: ${error}`);
      }
    );
  }

  markTopAlertAsViewed(alert: TopAlert) {
    alert.viewed = true;
    this.patchTopAlert(alert);
  }

  public showSuccess(message: string) {
    this.alertMessageSource.next({ message: message, type: TOP_ALERT_TYPES.success} as TopAlert);
  }

  public showTopAlert(alert: TopAlert) {
    this.alertMessageSource.next(alert);
  }
}
