import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainContentComponent} from "./views/main-content/main-content/main-content.component";

const routes: Routes = [
  { path: 'main', component: MainContentComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
