import { Component, OnInit } from '@angular/core';
import { App } from '../../interfaces/app.interface';
import { AppsService } from '../../services/apps.service';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-app.component.html',
  styles: ``
})
export class ListAppComponent implements OnInit {

  public apps: App[] =[];

  constructor(private appsService: AppsService){

  }
  ngOnInit(): void {
    this.appsService.getApps().subscribe( apps => this.apps = apps);
  
  }

}
