import { Component, OnInit } from '@angular/core';
import { App, Hu, Module } from '../../interfaces/app.interface';
import { ModuleService } from '../../services/module.service';
import { AppsService } from '../../services/apps.service';
import { ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrl: './edit-app.component.css'
})
export class EditAppComponent implements OnInit{
  public modules: Module[]=[];
  public app?: App;
  public message: boolean = false;

  public huForm = new FormGroup({
    hu: new FormControl(''),
    modulo: new FormControl<Module[]>([]),
  })

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

  get currentHu(): Hu {
    console.log(this.app)
    const hu = this.huForm.value.hu ?? '';
    const moduloId = this.huForm.value.modulo ?? '';
    const moduloDesc = this.modules.find(option => option.id == Number(moduloId))?.description ?? '';

    const huApp: Hu = {
        id: String(Math.floor(Math.random()*(100-1)+1)+1),
        description: hu,
        module: [{ id: Number(moduloId), description: moduloDesc}],
        status: [{ "id": 1, "description": "Inicial" }]
    }
    return huApp;
    
  }

  onSubmit():void{

    if( this.huForm.invalid) return;
  
    if (this.app) {
      this.app.hu.push(this.currentHu);
      this.appsService.updateApp(this.app).subscribe(updatedApp => {
        this.message = true;
        this.huForm.reset();
        setTimeout(() => {
          this.message = false;
        }, 3000);
        
      });
     }
  
  }

}
