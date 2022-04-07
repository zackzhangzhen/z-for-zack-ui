import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopAlert} from "../../../../../models/top-alert";
import {TopAlertService} from "../../../../../services/alert/top-alert.service";

@Component({
  selector: 'app-add-top-alert',
  templateUrl: './add-top-alert.component.html',
  styleUrls: ['./add-top-alert.component.css']
})
export class AddTopAlertComponent implements OnInit {

  alert = {} as TopAlert;
  @Input()
  isModalOpened = false;
  @Output()
  isModalOpenedChange = new EventEmitter<boolean>();

  constructor(private topAlertService: TopAlertService) {

  }

  ngOnInit(): void {
  }

  isModalSubmitEnabled(): boolean {
    return this.alert && !!this.alert.type && !!this.alert.message;
  }

  addTopAlert() {
    this.alert.date = new Date();
    this.alert.viewed = false;
    this.topAlertService.addTopAlert(this.alert);
    //reset the model, so next time when the modal is opened again, the inputs won't be populated with the old values
    this.alert = {} as TopAlert;
  }
}
