import {Component, OnInit, ViewChild} from '@angular/core';
import {AddTopAlertComponent} from "./top-alert-mgmt/add-top-alert/add-top-alert.component";
import {AddBlogComponent} from "../../blog/add-blog/add-blog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(AddTopAlertComponent)
  addTopAlertComponent!: AddTopAlertComponent;
  @ViewChild(AddBlogComponent)
  addBlogComponent!: AddBlogComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openAddTopAlertModal() {
    this.addTopAlertComponent.isModalOpened = true;
  }

  openPostBlogModal() {
    this.addBlogComponent.isModalOpened = true;
  }

}
