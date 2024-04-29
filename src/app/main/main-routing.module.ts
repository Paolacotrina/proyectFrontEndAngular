import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListAppComponent } from './pages/list-app/list-app.component';
import { TecnologyComponent } from './pages/tecnology/tecnology.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SupportComponent } from './pages/support/support.component';
import { NewAppComponent } from './pages/new-app/new-app.component';
import { EditAppComponent } from './pages/edit-app/edit-app.component';
import { HuAppComponent } from './pages/hu-app/hu-app.component';
import { ListRequestComponent } from './pages/list-request/list-request.component';
import { ListSupportComponent } from './pages/list-support/list-support.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ListContactComponent } from './pages/list-contact/list-contact.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      { path: 'contact', component: ContactComponent },
      { path: 'listContact', component: ListContactComponent },
      { path: 'technology', component: TecnologyComponent },
      { path: 'request', component: RequestsComponent},
      { path: 'support', component: SupportComponent},
      { path: 'listApp', component: ListAppComponent },
      { path: 'listRequest', component: ListRequestComponent },
      { path: 'listSupport', component: ListSupportComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'app/:id', component: NewAppComponent },
      { path: 'editar/:id', component: EditAppComponent },
      { path: 'hu/:id', component: HuAppComponent },
      { path: '**', redirectTo: 'tecnologia' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
