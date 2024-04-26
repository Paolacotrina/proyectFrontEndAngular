import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppsService } from '../../services/apps.service';
import { App, Hu, Module, Support } from '../../interfaces/app.interface';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit {
  public message: boolean = false;
  public app: App[]=[];
  public idTecno:number = 0;
  public modules: Module[] = [];
  public hus: Hu[]=[];
  

  public supportForm = new FormGroup({
    proyect: new FormControl(''),
    module: new FormControl(''),
    hu : new FormControl(''),
    detail: new FormControl('')
  })

  constructor(
    private appsService: AppsService,
    private supportService: SupportService
  ){}


  ngOnInit(): void {
    this.appsService.getApps().subscribe(
      res => {
        this.app = res.filter(data=> data.customer[0].email == 'johndoe@miempresa.com')
      });
      this.viewModule();
      this.viewHu();
      
  }

  viewModule():void{
    const seleccionControl = this.supportForm.get('proyect');
      if (seleccionControl) { 
        seleccionControl.valueChanges.subscribe(appId => {
        this.appsService.getAppsById(Number(appId)).subscribe(res => {
          this.idTecno = res?.tecnology[0].id ?? 0;
          if (res?.hu) {
            res?.hu.forEach((historyUser: Hu) => {
                historyUser.module.forEach((module: Module) => {
                    const existingModule = this.modules.find(m => m.id === module.id);
                    if (!existingModule) {
                        this.modules.push(module);
                    }
                });
            });
        }
        })
      });
    } 
  }

  viewHu():void{
    const seleccionModule = this.supportForm.get('module');
    if (seleccionModule) { 
      seleccionModule.valueChanges.subscribe(appId => {
        this.appsService.getAppsById(Number(appId)).subscribe(res => {
          
          if (res?.hu) {
            this.hus= res?.hu.filter(hu => hu.module.some(m => m.id === 2));
            console.log(this.hus)
          }
        })
      });
    }
    
  }

  get currentSupport(): Support {

    const proyectId = this.supportForm.value.proyect ?? '';
    const huId = this.supportForm.value.hu ?? '';
    const moduleId = this.supportForm.value.module ?? '';
    const detail = this.supportForm.value.detail ?? '';

    const proyectDesc = this.app.find(option => option.id == proyectId)?.name ?? '';
    const huDesc = this.hus.find(option => option.id == huId)?.description ?? '';
    const moduleDesc = this.modules.find(option => option.id == Number(moduleId))?.description ?? '';

    const miSupport: Support = {
      id: Math.floor(Math.random()*(100-1)+1)+1,
      proyectName: proyectDesc,
      hu: [{ id: String(huId), description: huDesc}],
      module: [{ id: String(moduleId), description: moduleDesc}],
      date: new Date(),
      stageRequest: [{ id: 1, description: "Abierta" }],
      detail
    };

  return miSupport;
    
  }
 

  onSubmit():void{
    if( this.supportForm.invalid) return;

    this.supportService.addSupport(this.currentSupport).subscribe(
      res=>{
        this.message = true;
        this.supportForm.reset();
        setTimeout(() => {
          this.message = false;
        }, 3000);
      }
    )

  }
}
