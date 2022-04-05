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

@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    ConvoPanelComponent,
    BlogSpaceComponent,
    LoadingComponent
  ],
        imports: [
                BrowserModule,
                BrowserAnimationsModule,
                ClarityModule,
                ClrTabsModule,
                AppRoutingModule,
                ClrAlertModule,
                HttpClientModule,
        ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
