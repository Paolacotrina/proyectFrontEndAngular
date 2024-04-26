import { Component, OnInit } from '@angular/core';
import { App, Module, Stage, StageRequest, Tecnology, Requests } from '../../interfaces/app.interface';
import { StageRequestService } from '../../services/stageRequest.service';
import { ModuleService } from '../../services/module.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TecnologyService } from '../../services/tecnology.service';
import { AppsService } from '../../services/apps.service';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrl: './new-app.component.css'
})
export class NewAppComponent implements OnInit{
  public stages: StageRequest[] =[];
  public modules: Module[]=[];
  public tecnology: Tecnology[]=[];
  public requests?: Requests;
  public message: boolean = false;
  public messageRequest: boolean =false;
  public messageModule: boolean = false;
  public stagesSelected: StageRequest[] =[];
  public opcionSeleccionada: string = ''

  constructor(private stageService: StageRequestService,
    private moduleService: ModuleService,
    private tecnologyService: TecnologyService,
    private appService : AppsService,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  public appForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',{ nonNullable: true}),
    stage: new FormControl<Stage[]>([]),
    startDate: new FormControl(''),
    end: new FormControl(''),
    tecnology: new FormControl<Tecnology[]>([]),
    nameCustomer: new FormControl(''),
    phoneCustomer: new FormControl(0),
    emailCustomer: new FormControl(''),
    hu:new FormControl(''),
  });
  
  public appModule = new FormGroup({
    nameModule: new FormControl('',{ nonNullable: true}),
  });

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id})=> this.requestService.getRequestById( id) )
    )
    .subscribe( req => {
       if(!req) return this.router.navigate(['/main/listApp']);
       this.requests = req;
       this.appForm.reset({
        name: this.requests.proyectName,
        nameCustomer: this.requests?.nameCustomer,
        phoneCustomer: Number(this.requests?.phone),
        emailCustomer: this.requests?.emialCustomer
      });

       return;
    });

    this.stageService.getStages().subscribe( stage => this.stages = stage);
    this.moduleService.getModules().subscribe( modul => this.modules = modul);
    this.tecnologyService.getTecnology().subscribe( tecno => this.tecnology = tecno);
   
  }

  get currentRequest(): Requests {
    const idRequest = this.requests?.id ?? Math.floor(Math.random()*(100-1)+1)+1;
    const nameCustomer = this.appForm.value.nameCustomer ?? '';
    const phoneCustomer = this.appForm.value.phoneCustomer ?? '';
    const emialCustomer = this.appForm.value.emailCustomer ?? '';
    const nameProyect = this.appForm.value.name ?? '';
    const stageId = this.appForm.value.stage ?? '';
    const stageDesc = this.stages.find(option => option.id == Number(stageId))?.description ?? '';

    const miRequest: Requests ={
      id: idRequest,
      nameCustomer,
      phone: Number(phoneCustomer),
      emialCustomer,
      proyectName: nameProyect,
      state: [{ id: Number(stageId), description: stageDesc}]
    }

   return miRequest;

  }

  get currentApp(): App {
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
      stageRequest: [{ id: Number(stageId), description: stageDesc}],
      stage:[{ "id": 1, "description": "Inicial"}] ,
      startDate: start,
      end,
      tecnology: [{ id: Number(tecnologyId), description: tecnologyDesc}],
      customer: [{ name: nameCustomer, phone: Number(phoneCustomer), email: emialCustomer }],
      hu: []
    };

  return miApp;
    
  }

  deleteModule(id: number): void {
     this.moduleService.deleteModule(id).subscribe(res=>{
      this.messageModule = true;
      setTimeout(() => {
        this.messageModule = false;
      }, 3000);
     })
  }

  onSubmitModule():void{
    if( this.appModule.invalid) return;

    const miModule: Module ={
      id: Math.floor(Math.random()*(100-1)+1)+1,
      description:  this.appModule.value.nameModule ?? ''
    }

    this.moduleService.addModule(miModule).subscribe(
      res => {
        this.appForm.reset();
      }

        
    )
  }
  onSubmit():void{

    if( this.appForm.invalid) return;

    if(Number(this.appForm.value.stage) == 3){
      //La solicitud ha sido aprobada se crea un nuevo proyecto en el sistema
      this.appService.addApp( this.currentApp)
      .subscribe( app => {
        this.message = true;
        this.appForm.reset();
        setTimeout(() => {
          this.message = false;
        }, 3000);
      })

      return;
    }
  
    //Se actualiza la informacion de la solicitud
    this.requestService.updateRequest(this.currentRequest)
    .subscribe(
      req=>{
        console.log("Actualice");
        this.messageRequest = true;
        this.appForm.reset();
        setTimeout(() => {
          this.message = false;
        }, 3000);
      }
        

    )
    return;

    
  }
}
