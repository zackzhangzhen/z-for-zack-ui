import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BlogSpaceComponent} from "./views/blog/blog-space/blog-space.component";
import {AdminComponent} from "./views/admin/admin/admin.component";

const routes: Routes = [
  { path: 'blog', component: BlogSpaceComponent},
  { path: 'admin', component: AdminComponent},
  { path: '', redirectTo: '/blog', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
