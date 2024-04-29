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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRequestComponent } from './pages/list-request/list-request.component';
import { ModalComponent } from './components/modal/modal.component';
import { ListSupportComponent } from './pages/list-support/list-support.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableFilterKeywordPipe } from './pipe/filter.pipe';
import { TableFilterDatePipe } from './pipe/filter-date.pipe';
import { TableFilterStagePipe } from './pipe/filter-status.pipe';
import { TableFilterHuPipe } from './pipe/filter-hu.pipe';
import { TableFilterModulePipe } from './pipe/filter-module.pipe';
import { TableFilterProyectPipe } from './pipe/filter-proyect.pipe';
import { TableFilterCustomerPipe } from './pipe/filter-customer.pipe';
import { ContactComponent } from './pages/contact/contact.component';
import { ListContactComponent } from './pages/list-contact/list-contact.component';


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
    StatusComponent,
    ListRequestComponent,
    ModalComponent,
    ListSupportComponent,
    DashboardComponent,
    TableFilterKeywordPipe,
    TableFilterDatePipe,
    TableFilterStagePipe,
    TableFilterHuPipe,
    TableFilterModulePipe,
    TableFilterProyectPipe,
    TableFilterCustomerPipe,
    ContactComponent,
    ListContactComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule { }
