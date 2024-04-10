import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { App } from '../interfaces/app.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class AppsService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }


    getApps():Observable<App[]>{
         return this.http.get<App[]>(`${this.baseUrl}/apps`);
    }

    
    getAppsById(id: number): Observable<App | undefined> {
     return this.http.get<App>(`${this.baseUrl}/apps/${id}`).pipe(
       catchError(error => of(undefined))
     );
   }

    
    
}