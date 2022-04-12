import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TopAlertService} from "../../../services/alert/top-alert.service";
import {TopAlert} from "../../../models/top-alert";

@Component({
  selector: 'app-top-alert',
  templateUrl: './top-alert.component.html',
  styleUrls: ['./top-alert.component.css']
})
export class TopAlertComponent implements OnInit, OnDestroy {
  /** Closes entire alert stack if true and user clicks on the X */
  @Input() public alertClosable = true;
  topAlerts : TopAlert[] = [];

  private subForOpen: Subscription;
  private subForClose: Subscription;

  constructor(private topAlertService: TopAlertService) { }

  refresh() {
    this.topAlertService.getNewTopAlerts().subscribe((alerts: TopAlert[]) => {
      this.topAlerts = alerts;
    }, error=>{
      console.log(error);
    })
  }

  ngOnInit(): void {

    this.refresh();

    // Observe alertMessage$ and open the Alert component when a message arrives

    // somehow this great line does not work? when debugging, this.addAlertMessage
    // is even successfully called...had to use the verbose chunk of code instead

    // this.topAlertService.subscribeToTopAlerts(this.addAlertMessage);
    this.subForOpen = this.topAlertService.alertMessage$.subscribe(
      (alert: TopAlert) => { this.addAlertMessage(alert); },
      error => console.log(`failed to add top alert: ${error}`),
    );

    this.subForClose = this.topAlertService.closeAlert$.subscribe(
      () => { this.refresh(); },
      error => console.log(`failed to close top alert: ${error}`),
    );

  }

  public ngOnDestroy(): void {
    this.subForOpen.unsubscribe();
  }

  private addAlertMessage(alert: TopAlert) {
    if (!alert) {
      return;
    }
    this.topAlerts.push(alert);
  }

  onAlertClose($event: boolean, alert: TopAlert) {
    this.topAlertService.markTopAlertAsViewed(alert);
  }
}
