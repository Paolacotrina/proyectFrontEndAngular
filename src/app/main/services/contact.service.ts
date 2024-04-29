import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Contact } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class ContactService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getContacts():Observable<Contact[]>{
         return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
    }

    addContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(`${this.baseUrl}/contacts`, contact)
    }

    

    
}