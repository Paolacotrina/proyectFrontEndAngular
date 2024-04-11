import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnology } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class TecnologyService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getTecnology():Observable<Tecnology[]>{
         return this.http.get<Tecnology[]>(`${this.baseUrl}/tecnology`);
    }
    
}