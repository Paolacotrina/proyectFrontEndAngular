import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-main',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  
  public user: string = '';
  public role: number = 0;  
  public nameRole : string = '';

  constructor( private router:Router) {}

  ngOnInit(): void {
    this.user =  localStorage.getItem("user") ?? '';
    this.role = Number(localStorage.getItem("rol")) ?? 0;
    this.nameRole = this.role == 1 ? "Administrador"  : "Usuario";
  }

  logout(): void{
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    this.router.navigate(['/auth']);
  }

}
