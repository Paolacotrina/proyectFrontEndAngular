import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListAppComponent } from './pages/list-app/list-app.component';
import { TecnologyComponent } from './pages/tecnology/tecnology.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListAppComponent,
    TecnologyComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
