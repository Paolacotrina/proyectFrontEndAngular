import { Component, OnInit } from '@angular/core';
import { Contact } from '../../interfaces/app.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.css'
})
export class ListContactComponent implements OnInit{

  public contacts: Contact[] =[];
  public proyect: string = '';

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe( res => this.contacts = res);
  }


}
