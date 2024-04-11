import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { App, Hu } from '../interfaces/app.interface';
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

    addApp(app: App): Observable<App>{
      return this.http.post<App>(`${this.baseUrl}/apps`, app)
    }

    updateApp(app: App): Observable<App>{
      if(!app.id) throw Error('Id de la aplicacion es requerido')
      return this.http.patch<App>(`${this.baseUrl}/apps/${app.id}`, app)
    }

    updateHu(hu: Hu, id: string | undefined): Observable<Hu>{
      if(!id) throw Error('Id de la aplicacion es requerido')
      return this.http.patch<Hu>(`${this.baseUrl}/apps/${id}`, hu)
    }

    deleteAppById(id: string): Observable<boolean> {
      return this.http.delete(`${this.baseUrl}/apps/${id}`)
        .pipe(
          catchError(error => {
            console.error('Error deleting app:', error);
            return of(false);
          }),
          map(resp => true)
        );
    }
    
    
}