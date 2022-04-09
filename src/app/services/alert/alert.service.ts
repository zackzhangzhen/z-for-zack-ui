import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

export const ALERT_TYPES = {
  error: { idx: 0, name: 'danger' },
  warning: { idx: 1, name: 'warning' },
  info: { idx: 2, name: 'info' },
  success: { idx: 3, name: 'success' },
};

export const ALERT_CATEGORIES = {
  VISIT: "visit",
  BLOG: "blog"
};


export interface AlertType {
  /** Index defines display order of different types */
  idx: number;
  /** CSS class to use, also the identifier */
  name: string;
}

export interface Alert {
  message: string;
  type: AlertType;
  duration: number;
  category: string;
  targetId: string;
}

/** Duration in milliseconds, 0 is infinite */
export const DEFAULT_ALERT_DURATION_IN_MILLISECONDS = 2000; // 2 seconds

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  /** Contains the message to display and the alert type (see Clarity doc) */
  private alertMessageSource = new Subject<Alert>();
  /** For closing the alert component */
  private closeAlertSource = new Subject();

  // Observable streams
  public alertMessage$: Observable<Alert>;
  public closeAlert$: Observable<any>;


  constructor() {
    this.alertMessage$ = this.alertMessageSource.asObservable();
    this.closeAlert$ = this.closeAlertSource.asObservable();
  }

  /**
   * @param message string to display
   * @param duration (optional) time in milliseconds to display message for, 0 is infinite
   */
  public showError(message: string, category: string, targetId: string, duration: number = DEFAULT_ALERT_DURATION_IN_MILLISECONDS) {
    this.alertMessageSource.next({ message: message, type: ALERT_TYPES.error, category: category, targetId: targetId, duration: duration });
  }

  /**
   * @param message message string to display
   * @param duration (optional) time in milliseconds to display message for, 0 is infinite
   */
  public showInfo(message: string, category: string, targetId: string, duration: number = DEFAULT_ALERT_DURATION_IN_MILLISECONDS) {
    this.alertMessageSource.next({ message: message, type: ALERT_TYPES.info, category: category, targetId: targetId, duration: duration });
  }

  /**
   * @param message message string to display
   * @param duration (optional) time in milliseconds to display message for, 0 is infinite
   */
  public showWarning(message: string, category: string, targetId: string, duration: number = DEFAULT_ALERT_DURATION_IN_MILLISECONDS) {
    this.alertMessageSource.next({ message: message, type: ALERT_TYPES.warning, category: category, targetId: targetId, duration: duration });
  }

  /**
   * @param message message string to display
   * @param duration (optional) time in milliseconds to display message for, 0 is infinite
   */
  public showSuccess(message: string, category: string, targetId: string, duration: number = DEFAULT_ALERT_DURATION_IN_MILLISECONDS) {
    this.alertMessageSource.next({ message: message, type: ALERT_TYPES.success, category: category, targetId: targetId, duration: duration });
  }
}
