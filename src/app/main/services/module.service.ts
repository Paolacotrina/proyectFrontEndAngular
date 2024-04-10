import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class ModuleService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getModules():Observable<Module[]>{
         return this.http.get<Module[]>(`${this.baseUrl}/module`);
    }
    
}