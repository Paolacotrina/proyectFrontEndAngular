
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { App, Hu, Module, Stage } from '../../interfaces/app.interface';
import { StageService } from '../../services/stage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppsService } from '../../services/apps.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  @Input() myHu!: Hu;
  @Input() app!: App;
  public module: Module[]=[];
  public stage: Stage[]=[];

  constructor(
    private moduleService: ModuleService,
    private stageService: StageService,
    private appService: AppsService
  ) {} 

  public huEditForm = new FormGroup({
    state: new FormControl(0),
    module: new FormControl(0),
    hu:new FormControl(
      this.myHu?.description
    ),
  });
  
  ngOnInit() {
    this.moduleService.getModules().subscribe( mod => this.module = mod);
    this.stageService.getStage().subscribe(state => this.stage = state);
    this.huEditForm.reset({
      hu: this.myHu?.description,
      state: Number(this.myHu?.status[0].id),
      module: Number(this.myHu?.module[0].id)
    })
  } 
  
  displayStyle = "none"; 
  
  openPopup() { 
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

  get currentHu(): App {
    const descHu = this.huEditForm.value.hu ?? '';
    const moduleId = this.huEditForm.value.module ?? '';
    const stateId = this.huEditForm.value.state ?? '';
    
    // Encontrar descripciones correspondientes a los IDs
    const moduleDesc = this.module.find(option => option.id == Number(moduleId))?.description ?? '';
    const stateDesc = this.stage.find(option => option.id == Number(stateId))?.description ?? '';
    
    this.app.hu.forEach((item) => {
      if (item.id == this.myHu?.id) {
          item.description = descHu;
          item.module = [{ id: Number(moduleId), description: moduleDesc}],
          item.status = [{ id: Number(stateId), description: stateDesc}]
      }
  });
  return this.app;
    
  }


  onSubmit():void{
  
    if( this.huEditForm.invalid) return;

    if (this.app) {
      this.currentHu;
      this.appService.updateApp(this.app).subscribe(updatedApp => {
        this.displayStyle = "none"; 
        setTimeout(() => {
        }, 3000);
        
      });
     }
  }
}
