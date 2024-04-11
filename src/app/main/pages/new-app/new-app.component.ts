import { Component, OnInit } from '@angular/core';
import { App, Customer, Module, Stage, StageRequest, Tecnology } from '../../interfaces/app.interface';
import { StageRequestService } from '../../services/stageRequest.service';
import { ModuleService } from '../../services/module.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TecnologyService } from '../../services/tecnology.service';
import { AppsService } from '../../services/apps.service';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrl: './new-app.component.css'
})
export class NewAppComponent implements OnInit{
  public stages: StageRequest[] =[];
  public modules: Module[]=[];
  public tecnology: Tecnology[]=[];

  constructor(private stageService: StageRequestService,
    private moduleService: ModuleService,
    private tecnologyService: TecnologyService,
    private appService : AppsService
  ){}

  public appForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',{ nonNullable: true}),
    stage: new FormControl<Stage[]>([]),
    startDate: new FormControl(''),
    end: new FormControl(''),
    tecnology: new FormControl<Tecnology[]>([]),
    nameCustomer: new FormControl(''),
    phoneCustomer: new FormControl(''),
    emailCustomer: new FormControl(''),
    hu:new FormControl(''),
  })


  ngOnInit(): void {
    this.stageService.getStages().subscribe( stage => this.stages = stage);
    this.moduleService.getModules().subscribe( modul => this.modules = modul);
    this.tecnologyService.getTecnology().subscribe( tecno => this.tecnology = tecno);
  }

  get currentApp(): App {
    const idProyect = this.appForm.value.id ?? '';
    const nameProyect = this.appForm.value.name ?? '';
    const tecnologyId = this.appForm.value.tecnology ?? '';
    const stageId = this.appForm.value.stage ?? '';
    const start = this.appForm.value.startDate ?? '';
    const end = this.appForm.value.end ?? '';
    const nameCustomer = this.appForm.value.nameCustomer ?? '';
    const phoneCustomer = this.appForm.value.phoneCustomer ?? '';
    const emialCustomer = this.appForm.value.emailCustomer ?? '';

    // Encontrar descripciones correspondientes a los IDs
    const tecnologyDesc = this.tecnology.find(option => option.id == Number(tecnologyId))?.description ?? '';
    const stageDesc = this.stages.find(option => option.id == Number(stageId))?.description ?? '';

    const miApp: App = {
      id: String(Math.floor(Math.random()*(100-1)+1)+1),
      name: nameProyect,
      stageRequest: [{ "id": 3, "description": "Aprobada"}],
      stage: [{ id: Number(stageId), description: stageDesc}],
      startDate: start,
      end,
      tecnology: [{ id: Number(tecnologyId), description: tecnologyDesc}],
      customer: [{ name: nameCustomer, phone: Number(phoneCustomer), email: emialCustomer }],
      hu: []
    };

  return miApp;
    
  }

  onSubmit():void{

    if( this.appForm.invalid) return;
  
    this.appService.addApp( this.currentApp)
    .subscribe( app => {
        console.log("nuevo")
    })
  }
}
