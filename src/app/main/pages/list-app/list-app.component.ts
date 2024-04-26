import { Component, OnInit } from '@angular/core';
import { App, Customer, Stage } from '../../interfaces/app.interface';
import { AppsService } from '../../services/apps.service';
import { StageService } from '../../services/stage.service';

@Component({
  selector: 'app-list-app',
  templateUrl: './list-app.component.html',
  styles: ``
})
export class ListAppComponent implements OnInit {

  public apps: App[] =[];
  public message: boolean = false;
  public proyect: string = '';
  public customer: string = ''; 
  public customers: any[]=[];
  public customerSet: Set<string> = new Set(); 

  constructor(
    private appsService: AppsService,
    private stageService: StageService
  ){

  }
  ngOnInit(): void {
    this.appsService.getApps().subscribe( apps => 
      {
        this.apps = apps;
        this.apps.forEach(app => {
          app.customer.forEach(customer => {
            if (!this.customerSet.has(customer.name)) { // Verificar si el nombre ya está en el conjunto
              this.customerSet.add(customer.name); // Agregar el nombre al conjunto
              this.customers.push(customer); // Agregar el cliente a la matriz de clientes únicos
          }
          });
        });
        console.log(this.customers)
      }
      
    );
  }

  updateStatus(app: App): void{
    const status = app.stage[0].id + 1;
    console.log(app);
    this.stageService.getStageById(status).subscribe( 
      res => {
        app.stage = [{id: Number(res?.id), description: res?.description}];
        this.appsService.updateApp(app).subscribe( response =>{
          this.message = true;
          setTimeout(() => {
            this.message = false;
          }, 3000);
          return;
        })
      }
    );

  
    
    
  }

}
