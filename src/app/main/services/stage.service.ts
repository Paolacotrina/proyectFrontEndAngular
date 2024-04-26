import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Stage } from '../interfaces/app.interface';

@Injectable({providedIn: 'root'})
export class StageService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getStage():Observable<Stage[]>{
        return this.http.get<Stage[]>(`${this.baseUrl}/stage`);
    }

    getStageById(id: number):Observable<Stage>{
        return this.http.get<Stage>(`${this.baseUrl}/stage/${id}`);
    }
    
}