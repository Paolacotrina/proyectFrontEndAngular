import { Component, Input, OnInit } from '@angular/core';
import { App, Hu, Module } from '../../interfaces/app.interface';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-hu-module',
  templateUrl: './hu-app.component.html',
  styleUrl: './hu-app.component.css'
})
export class HuAppComponent implements OnInit {
  @Input() hus!: Hu[];
  @Input() app!: App;
  public modules: Module[]=[];

  public hu:string = '';
  public module: number = 0;

  constructor(private moduleService: ModuleService){}

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(res=> this.modules = res)
  }
}
