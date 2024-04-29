import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interface/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl: string = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    getUsers():Observable<User[]>{
        return this.http.get<User[]>(`${this.baseUrl}/users`);
   }

   getAppsById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`)
        .pipe(
            tap(user => localStorage.setItem('token',user.id)),
            tap(user => localStorage.setItem('email',user.email)),
            tap(user => localStorage.setItem('user',user.user)),
            tap(user => localStorage.setItem('rol',user.role))
        )
    }

    addUser(user: User): Observable<User>{
        return this.http.post<User>(`${this.baseUrl}/users`, user)
    }
}