import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Requests } from '../../interfaces/app.interface';
@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrl: './list-request.component.css'
})
export class ListRequestComponent implements OnInit{
 public requests: Requests[] =[]

 constructor(private requestService: RequestService){}

 ngOnInit(): void {
  this.requestService.getRequest().subscribe(
  request => this.requests = request
  )
 }
 

}
