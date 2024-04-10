import { Component, OnInit } from '@angular/core';
import { App, Module } from '../../interfaces/app.interface';
import { ModuleService } from '../../services/module.service';
import { AppsService } from '../../services/apps.service';
import { ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrl: './edit-app.component.css'
})
export class EditAppComponent implements OnInit{
  public modules: Module[]=[];
  public app?: App;

  constructor(
    private moduleService: ModuleService,
    private appsService: AppsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id})=> this.appsService.getAppsById( id) )
    )
    .subscribe( app => {
       if(!app) return this.router.navigate(['/main/listApp']);
       this.app = app;
       return;
    });

    this.moduleService.getModules().subscribe( modul => this.modules = modul)
  
  }

}
