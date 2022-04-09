import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../services/client/client.service";
import {ActivatedRoute} from "@angular/router";
import {ROUTING_TABS_PARAM_NAME, TABS} from "../../../constants/constants";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  private tab = "";
  ROUTING_TABS = TABS;
  constructor(private clientService: ClientService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tab = params[ROUTING_TABS_PARAM_NAME];
      if (!this.tab) {
        // if there's no "tab=" parameter, then default to blog
        this.tab = TABS.BLOG;
      }
    });

  }

  isMobile() {
    return this.clientService.isMobileClient();
  }

  isTab(tab: string) {
   return this.tab === tab;
  }
}
