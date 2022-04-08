import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainFrameComponent } from './views/main-frame/main-frame.component';
import {ClrAlertModule, ClrTabsModule} from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { ConvoPanelComponent } from './views/convo-panel/convo-panel.component';
import { BlogSpaceComponent } from './views/blog/blog-space/blog-space.component';
import { LoadingComponent } from './views/loading/loading/loading.component';
import { AlertComponent } from './views/alert/alert/alert.component';
import { TopAlertComponent } from './views/alert/top-alert/top-alert.component';
import { AdminComponent } from './views/admin/admin/admin.component';
import { CommonModalComponent } from './views/shared/common-modal/common-modal.component';
import {FormsModule} from "@angular/forms";
import { AddTopAlertComponent } from './views/admin/admin/top-alert-mgmt/add-top-alert/add-top-alert.component';
import { UserBadgeComponent } from './views/user/user-badge/user-badge.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    ConvoPanelComponent,
    BlogSpaceComponent,
    LoadingComponent,
    AlertComponent,
    TopAlertComponent,
    AdminComponent,
    CommonModalComponent,
    AddTopAlertComponent,
    UserBadgeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    ClrTabsModule,
    AppRoutingModule,
    ClrAlertModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
