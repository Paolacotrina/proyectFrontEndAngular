import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StageRequest } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class StageRequestService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getStages():Observable<StageRequest[]>{
         return this.http.get<StageRequest[]>(`${this.baseUrl}/stageRequest`);
    }
    
}