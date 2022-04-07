import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TopAlertService} from "../../../services/alert/top-alert.service";
import {TopAlert} from "../../../models/top-alert";

@Component({
  selector: 'app-top-alert',
  templateUrl: './top-alert.component.html',
  styleUrls: ['./top-alert.component.css']
})
export class TopAlertComponent implements OnInit {
  /** Closes entire alert stack if true and user clicks on the X */
  @Input() public alertClosable = true;
  topAlerts : TopAlert[] = [];

  private subForOpen: Subscription;

  constructor(private topAlertService: TopAlertService) { }

  ngOnInit(): void {

    this.topAlertService.getNewTopAlerts().subscribe((alerts: TopAlert[]) => {
      this.topAlerts = alerts;
    }, error=>{
      console.log(error);
    })

    // Observe alertMessage$ and open the Alert component when a message arrives
    this.subForOpen = this.topAlertService.alertMessage$.subscribe(
      (alert: TopAlert) => { if (alert) { this.addAlertMessage(alert); } },
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
}
