import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertService, AlertType} from "../../../services/alert/alert.service";
import {Subscription} from "rxjs";


interface AlertListItem {
  type: AlertType;
  isClosed: boolean;
  messages: Message[];
}

interface Message {
  id: string;
  typeIdx: number;
  text: string;
  duration: number;
}


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  /** Closes entire alert stack if true and user clicks on the X */
  @Input() public alertClosable = true;
  /** Small font in alert messages */
  @Input() public alertSizeSmall = false;
  /** Shows multiple alert types at the same time */
  @Input() public alertMultiType = true;
  /** Shows multiple messages within the alert types at the same time */
  @Input() public alertMultiMessage = true;
  /** Closes the alerts after duration timeout if true, ignores duration timeout otherwise */
  @Input() public alertAutoClose = true;

  /** Holds all the messages for all alert types */
  public alertList: AlertListItem[] = [];

  /** Holds all the timeout ids related to each message */
  private timeoutIds = new Map<string, number>();

  private subForOpen: Subscription;
  private subForClose: Subscription;

  constructor(
    private appAlertService: AlertService,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    // Observe alertMessage$ and open the Alert component when a message arrives
    this.subForOpen = this.appAlertService.alertMessage$.subscribe(
      (alert: Alert) => { if (alert) { this.addAlertMessage(alert); } },
    );
    // Register to observe the closeAlert$ source and close the Alert component
    this.subForClose = this.appAlertService.closeAlert$.subscribe(
      () => { this.clearAllAlertMessages(); },
    );

  }

  public ngOnDestroy(): void {
    this.subForOpen.unsubscribe();
    this.subForClose.unsubscribe();
  }

  /** Clears all the messages on the closed alert type */
  public onAlertClose(event: boolean, alertListItem: AlertListItem) {
    alertListItem.isClosed = event;
    this.clearAlertMessagesOnType(alertListItem.type.idx);
  }

  public isAlertsAllEmpty(): boolean {
    if (!this.alertList || this.alertList.length == 0) {
      return true;
    }

    for (let i = 0; i < this.alertList.length; i++) {
      if (!this.isAlertListItemEmpty(this.alertList[i])) {
        return false;
      }
    }

    return true;
  }

  private isAlertListItemEmpty(alertList: AlertListItem): boolean {
    if (!alertList) {
      return true;
    }

    if (!alertList.messages || alertList.messages.length == 0) {
      return true;
    }

    return false;
  }
  /** Cancel timer and remove from list */
  public stopTimer(message: Message): void {
    if (this.alertAutoClose) {
      const timeoutId = this.timeoutIds.get(message.id);

      if (timeoutId) {
        window.clearTimeout(timeoutId);
        this.timeoutIds.delete(message.id);
      }
    }
  }

  /** Adds a timeout to close the passed in message */
  public restartTimer(message: Message): void {
    if (this.alertAutoClose && message.duration > 0) {
      this.ngZone.runOutsideAngular(() => {
        const timeoutId = window.setTimeout(() => {
          this.ngZone.run(() => {
            // this.ref.markForCheck();
            this.deleteAlertMessage(message);
          });
        }, message.duration);

        this.timeoutIds.set(message.id, timeoutId);
      });
    }
  }

  /** Adds a message to the AlertsList to be displayed based on the display options */
  private addAlertMessage(alert: Alert): void {
    const alertTypeIdx = alert.type.idx;

    if (!this.alertList[alertTypeIdx]) {
      // Set up the alert array if hasn't been set up yet
      this.alertList[alertTypeIdx] = {type: alert.type, messages: [], isClosed: false};
    }

    if (this.alertMultiMessage) {
      // Show multiple messages in one alert box
      const messageId = this.getMessageId(alert);
      const message: Message = {
        id: messageId,
        typeIdx: alertTypeIdx,
        text: alert.message,
        duration: alert.duration
      };
      this.alertList[alertTypeIdx].messages.push(message);
      this.restartTimer(message);
    } else {
      // Show the latest message in each alert box
      if (this.alertList[alertTypeIdx].messages[0]) {
        // We are ovveriding current message with a new one, remove old timer
        this.stopTimer(this.alertList[alertTypeIdx].messages[0]);
      }
      const messageId = this.getMessageId(alert);
      const message: Message = {
        id: messageId,
        typeIdx: alertTypeIdx,
        text: alert.message,
        duration: alert.duration
      };
      this.alertList[alertTypeIdx].messages[0] = message;
      this.restartTimer(message);
    }
  }

  /** Clears all the messages on the specific alert type */
  private clearAlertMessagesOnType(typeIdx: number) {
    if (this.alertList[typeIdx]) {
      // Clear all the timers
      this.alertList[typeIdx].messages.forEach(message => {
        this.stopTimer(message);
      });
      // Clear list
      this.alertList[typeIdx] = null;
    }
  }

  /** Finds and deletes 1 alert message along with related timer */
  private deleteAlertMessage(message: Message): void {
    if (this.alertList[message.typeIdx]) {
      for (let i = 0; i < this.alertList[message.typeIdx].messages.length; i++) {
        if (this.alertList[message.typeIdx].messages[i].id === message.id) {
          this.stopTimer(this.alertList[message.typeIdx].messages[i]);
          this.alertList[message.typeIdx].messages.splice(i, 1);
          break;
        }
      }
    }
  }

  /** @returns a unique id string based on alert type and message in the passed in alert */
  private getMessageId(alert: Alert): string {
    return `${alert.type.idx}-${this.generateId(alert.message)}`;
  }

  /** Clears all the messages across all alert types along with timers */
  private clearAllAlertMessages(): void {
    // -1 is outside array bounds, so it will never match so all messages will be cleared.
    this.clearAllAlertsExceptType(-1);
  }

  /** Simple hash, slight mod of
   * https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
   * @returns A simple hash of the passed in string and a random number
   */
  private generateId(str: string): string {
    // tslint:disable-next-line:no-bitwise
    const rand = Math.random() * 0xffffffff | 0;
    let hash = 0;
    if (!str || !str.length) {
      return `${rand}${hash}`;
    }

    const maxLength = 32;
    const loopLength = (str.length > maxLength) ? maxLength : str.length;
    for (let i = 0; i < loopLength; i++) {
      const char = str.charCodeAt(i);
      // tslint:disable-next-line:no-bitwise
      hash = ((hash << 5) - hash) + char;
      // tslint:disable-next-line:no-bitwise
      hash = hash & hash; // Convert to 32bit integer
    }
    return `${rand}${hash}`;
  }

  /** @param typeIdx any number less then 0 will clear all alerts */
  private clearAllAlertsExceptType(typeIdx: number) {
    // Loop through all the types
    for (let i = 0; i < this.alertList.length; i++) {
      // Only remove types not matching provided type index
      if (i !== typeIdx) {
        this.clearAlertMessagesOnType(i);
      }
    }
  }
}
