import {Component, OnInit, ViewChild} from '@angular/core';
import {AddTopAlertComponent} from "./top-alert-mgmt/add-top-alert/add-top-alert.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(AddTopAlertComponent, {static: true})
  private addTopAlertComponent: AddTopAlertComponent;

  dummySwitch = false;
  constructor() { }

  ngOnInit(): void {
  }

  openAddTopAlertModal() {
    // this.addTopAlertComponent.isModalOpen = true;
    this.dummySwitch = !this.dummySwitch;
    console.log(`dummySwitch: ${this.dummySwitch}`);
  }
}
