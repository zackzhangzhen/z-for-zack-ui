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

  getNewTopAlerts(): Observable<TopAlert[]> {
    return this.http.get<TopAlert[]>(`${NODE_JS_BASE_URL}topAlerts`)
  }

  addTopAlert(alert: TopAlert) {
    return this.http.post(`${NODE_JS_BASE_URL}topAlerts`, alert).subscribe(
      response=> {
        console.log(`adding top alert succeeded: ${response}`);
      },
      error => {
        console.log(`failed to add top alert: ${error}`);
      }
    );
  }

  /**
   * @param message string to display
   * @param duration (optional) time in milliseconds to diplay message for, 0 is infinite
   */
  public showError(message: string) {
    this.alertMessageSource.next({ message: message, type: TOP_ALERT_TYPES.error} as TopAlert);
  }

  /**
   * @param message message string to display
   * @param duration (optional) time in milliseconds to diplay message for, 0 is infinite
   */
  public showInfo(message: string) {
    this.alertMessageSource.next({ message: message, type: TOP_ALERT_TYPES.info} as TopAlert);
  }

  /**
   * @param message message string to display
   * @param duration (optional) time in milliseconds to diplay message for, 0 is infinite
   */
  public showWarning(message: string) {
    this.alertMessageSource.next({ message: message, type: TOP_ALERT_TYPES.warning} as TopAlert);
  }

  public showSuccess(message: string) {
    this.alertMessageSource.next({ message: message, type: TOP_ALERT_TYPES.success} as TopAlert);
  }
}
