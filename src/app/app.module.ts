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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddTopAlertComponent } from './views/admin/admin/top-alert-mgmt/add-top-alert/add-top-alert.component';
import { UserBadgeComponent } from './views/user/user-badge/user-badge.component';
import {RouterModule} from "@angular/router";
import { MainContentComponent } from './views/main-content/main-content/main-content.component';
import { AddBlogComponent } from './views/blog/add-blog/add-blog.component';
import { ReplyBubbleComponent } from './views/blog/reply-bubble/reply-bubble.component';
import { ReplyPanelComponent } from './views/blog/reply-panel/reply-panel.component';

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
    UserBadgeComponent,
    MainContentComponent,
    AddBlogComponent,
    ReplyBubbleComponent,
    ReplyPanelComponent
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
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
