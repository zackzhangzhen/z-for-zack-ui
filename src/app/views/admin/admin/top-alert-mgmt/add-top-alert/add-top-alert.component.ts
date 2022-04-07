import { Component, OnInit } from '@angular/core';
import {TopAlert} from "../../../../../models/top-alert";
import {TopAlertService} from "../../../../../services/alert/top-alert.service";

@Component({
  selector: 'app-add-top-alert',
  templateUrl: './add-top-alert.component.html',
  styleUrls: ['./add-top-alert.component.css']
})
export class AddTopAlertComponent implements OnInit {

  alert = {} as TopAlert;
  isModalOpen = false;

  constructor(private topAlertService: TopAlertService) {

  }

  ngOnInit(): void {
  }

  isModalSubmitDisabled(): boolean {
    return this.alert && !!this.alert.type && !!this.alert.message;
  }

  addTopAlert() {
    this.alert.date = new Date();
    this.alert.viewed = false;
    this.topAlertService.addTopAlert(this.alert);
  }
}
