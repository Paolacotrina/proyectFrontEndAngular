import { Component, OnInit } from '@angular/core';
import { StageRequest, Support } from '../../interfaces/app.interface';
import { SupportService } from '../../services/support.service';
import { FormControl, FormGroup } from '@angular/forms';
import { StageRequestService } from '../../services/stageRequest.service';

@Component({
  selector: 'app-list-support',
  templateUrl: './list-support.component.html',
  styleUrl: './list-support.component.css'
})
export class ListSupportComponent implements OnInit {
  public supports: Support[] =[];
  public message: boolean = false;
  public support?: Support;
  public stateRequests: StageRequest[]=[];
  public searchTerm: string = '';
  public proyect: string  = '';
  public date: string = '';

  constructor(
    private supportService: SupportService,
    private stateRequestService: StageRequestService
  ){}

  public supportForm = new FormGroup({
    detailHu : new FormControl(''),
    request: new FormControl(''),
    status: new FormControl(''),
  })

  

  ngOnInit(): void {
    this.supportService.getSupport().subscribe(res => this.supports = res);
    this.stateRequestService.getStages().subscribe(res => this.stateRequests = res);
  }

  viewDetail(id: number):void{
      this.supportService.getSupportById(id).subscribe(res =>{
        this.support = res;
        this.supportForm.reset({
          detailHu: this.support.hu[0].description,
          request: this.support.detail
        });
      })
  }
  
  onSubmit():void{
    if( this.supportForm.invalid) return;

    if(this.support){
      const statusId = Number(this.supportForm.value.status) ?? '';
      const statustDesc = this.stateRequests.find(option => option.id == statusId)?.description ?? '';
     
      this.support.stageRequest = [{id: statusId, description: statustDesc}];
      this.supportService.updateSupport(this.support).subscribe(res => {
        
      })
    }

  }

}
