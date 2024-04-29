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
  public role : number = 0;
  public roleAdmin: boolean = false;

  constructor(
    private appsService: AppsService,
    private stageService: StageService
  ){
    this.role = Number(localStorage.getItem("rol")) ?? 0;
    this.role == 1 ? this.roleAdmin = true : this.roleAdmin = false;
  }

  ngOnInit(): void {
    this.appsService.getApps().subscribe( apps => 
      {
        if(this.role == 1){
          this.apps = apps;
        }
        else{
          this.apps = apps.filter(item => item.customer[0].email == localStorage.getItem("email"))
        }
        
        this.apps.forEach(app => {
          app.customer.forEach(customer => {
            if (!this.customerSet.has(customer.name)) { // Verificar si el nombre ya está en el conjunto
              this.customerSet.add(customer.name); // Agregar el nombre al conjunto
              this.customers.push(customer); // Agregar el cliente a la matriz de clientes únicos
          }
          });
        });
      }
      
    );
  }

  updateStatus(app: App): void{
    const status = app.stage[0].id + 1;
    
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
