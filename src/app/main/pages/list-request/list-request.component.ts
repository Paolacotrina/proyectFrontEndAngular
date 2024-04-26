import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Requests, Stage } from '../../interfaces/app.interface';
import { StageService } from '../../services/stage.service';
@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrl: './list-request.component.css'
})
export class ListRequestComponent implements OnInit{
 public requests: Requests[] =[];
 public proyect: string  = '';
 public status: number = 0;
 public stage: Stage[] =[];

 constructor(
  private requestService: RequestService,
  private stageService: StageService
){}

 ngOnInit(): void {
  this.requestService.getRequest().subscribe(
  request => this.requests = request
  );
  this.stageService.getStage().subscribe(res => this.stage = res);
 }
 

}
