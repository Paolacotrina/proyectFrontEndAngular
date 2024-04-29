import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from '../../interfaces/app.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  public messageForm: boolean = false;
  public contactform = new FormGroup({
    name: new FormControl(localStorage.getItem("user")),
    email: new FormControl(localStorage.getItem("email")),
    message : new FormControl('')
  })

  constructor(private contactService: ContactService) { }

  get currentRequest(): Contact {
    const id= Math.floor(Math.random()*(100-1)+1)+1;
    const proyectName= this.contactform.value.name ?? '';
    const email = this.contactform.value.email ?? '';
    const date = new Date();
    const state = [{ id: 1, description: "Abierta"}]
    const message = this.contactform.value.message ?? '';

    const miContact: Contact =  {
      id,
      proyectName,
      email,
      date,
      state,
      message
    }

    return miContact;
  }


  onSubmit(): void{
    if( this.contactform.invalid) return;

    this.contactService.addContact(this.currentRequest)
    .subscribe(
      req=>{
        this.messageForm = true;
        this.contactform.reset();
        setTimeout(() => {
          this.messageForm = false;
        }, 3000);
      }
    )
    return;
  }
}
