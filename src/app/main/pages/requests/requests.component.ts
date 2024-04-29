import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Requests } from '../../interfaces/app.interface';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent{

  public message: boolean = false;

  public requestform = new FormGroup({
    nameCustomer: new FormControl(localStorage.getItem("user")),
    emailCustomer: new FormControl(localStorage.getItem("email")),
    nameProyect : new FormControl(''),
    phone: new FormControl(0)
  })

  constructor( private requestService: RequestService){}

 
  get currentRequest(): Requests {
    const nameCustomer= this.requestform.value.nameCustomer ?? '';
    const email= this.requestform.value.emailCustomer ?? '';
    const nameProyect = this.requestform.value.nameProyect ?? '';
    const phone = this.requestform.value.phone ?? '';
    const currentDate = new Date();

    const miRequest: Requests =  {
      nameCustomer: nameCustomer,
      emialCustomer: email,
      proyectName: nameProyect,
      phone: Number(phone),
      date: currentDate,
      state: [{ id: 1, description: "Abierta" }]
    }

    return miRequest;
  }

  onSubmit():void{

    if( this.requestform.invalid) return;
  
    this.requestService.addRequest(this.currentRequest)
    .subscribe( request => {
      this.message = true;
      this.requestform.reset();
      setTimeout(() => {
        this.message = false;
      }, 3000);
    })
  }
}
