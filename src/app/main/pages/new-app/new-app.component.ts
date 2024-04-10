import { Component, OnInit } from '@angular/core';
import { Module, StageRequest } from '../../interfaces/app.interface';
import { StageRequestService } from '../../services/stageRequest.service';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrl: './new-app.component.css'
})
export class NewAppComponent implements OnInit{
  public stages: StageRequest[] =[];
  public modules: Module[]=[];

  constructor(private stageService: StageRequestService,
    private moduleService: ModuleService

  ){

  }
  ngOnInit(): void {
    this.stageService.getStages().subscribe( stage => this.stages = stage);
    this.moduleService.getModules().subscribe( modul => this.modules = modul)
  }
}
