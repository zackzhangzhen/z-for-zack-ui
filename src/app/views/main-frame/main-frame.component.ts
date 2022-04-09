import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client/client.service";

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {


  title = 'Dear Laura';
  userAgent = "";
  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.userAgent = this.clientService.getUserAgent();
  }

  getUserAgentBasedStyle(style1: string, style2: string) {
    return this.clientService.getUserAgentBasedStyle(style1, style2);
  }

  isMobile() {
    return this.clientService.isMobileClient();
  }
}
