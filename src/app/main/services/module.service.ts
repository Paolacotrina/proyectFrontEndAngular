import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Module } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class ModuleService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getModules():Observable<Module[]>{
         return this.http.get<Module[]>(`${this.baseUrl}/module`);
    }

    addModule(module: Module): Observable<Module>{
    return this.http.post<Module>(`${this.baseUrl}/module`, module)
    }

    deleteModule(id: number): Observable<boolean>{
        return this.http.delete(`${this.baseUrl}/module/${id}`)
        .pipe(
          catchError(error => {
            console.error('Error deleting module:', error);
            return of(false);
          }),
          map(resp => true)
        );
    }

    
}