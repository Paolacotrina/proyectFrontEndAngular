import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Requests } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class RequestService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    getRequest():Observable<Requests[]>{
        return this.http.get<Requests[]>(`${this.baseUrl}/requests`);
    }

    addRequest(request: Requests): Observable<Requests>{
        return this.http.post<Requests>(`${this.baseUrl}/requests`, request)
    }

    getRequestById(id: number): Observable<Requests | undefined> {
      return this.http.get<Requests>(`${this.baseUrl}/requests/${id}`).pipe(
        catchError(error => of(undefined))
      );
    }

    updateRequest(req: Requests): Observable<Requests>{
      if(!req.id) throw Error('Id de la aplicacion es requerido')
      return this.http.patch<Requests>(`${this.baseUrl}/requests/${req.id}`, req)
    }
    
}