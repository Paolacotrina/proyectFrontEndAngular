import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListAppComponent } from './pages/list-app/list-app.component';
import { TecnologyComponent } from './pages/tecnology/tecnology.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      { path: 'tecnologia', component: TecnologyComponent },
      { path: 'listApp', component: ListAppComponent },
      { path: ':id', component: ListAppComponent },
      { path: '**', redirectTo: 'tecnologia' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
