import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Support } from '../interfaces/app.interface';

@Injectable({providedIn: 'root'})
export class SupportService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getSupport():Observable<Support[]>{
        return this.http.get<Support[]>(`${this.baseUrl}/supports`);
    }

    addSupport(support: Support): Observable<Support>{
        return this.http.post<Support>(`${this.baseUrl}/supports`, support)
    }

    getSupportById(id: number):Observable<Support>{
        return this.http.get<Support>(`${this.baseUrl}/supports/${id}`);
    }

    updateSupport(support: Support): Observable<Support>{
        if(!support.id) throw Error('Id de la aplicacion es requerido')
        return this.http.patch<Support>(`${this.baseUrl}/supports/${support.id}`, support)
    }
    
}