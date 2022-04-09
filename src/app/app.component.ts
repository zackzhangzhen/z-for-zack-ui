import { Component } from '@angular/core';
import {ClientService} from "./services/client/client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dear Laura';

  constructor(private clientService: ClientService) {
  }

  isMobile() {
    return this.clientService.isMobileClient();
  }
}
