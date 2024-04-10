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

const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      { path: 'tecnologia', component: TecnologyComponent },
      { path: 'solicitudes', component: RequestsComponent},
      { path: 'soporte', component: SupportComponent},
      { path: 'listApp', component: ListAppComponent },
      { path: 'aplicacion', component: NewAppComponent },
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