import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListAppComponent } from './pages/list-app/list-app.component';
import { TecnologyComponent } from './pages/tecnology/tecnology.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SupportComponent } from './pages/support/support.component';
import { ImageComponent } from './components/image/image.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewAppComponent } from './pages/new-app/new-app.component';
import { EditAppComponent } from './pages/edit-app/edit-app.component';
import { HuAppComponent } from './pages/hu-app/hu-app.component';
import { StatusComponent } from './components/status/status.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListAppComponent,
    TecnologyComponent,
    RequestsComponent,
    SupportComponent,
    ImageComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    NewAppComponent,
    EditAppComponent,
    HuAppComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
