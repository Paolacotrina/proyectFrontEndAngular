import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public role: Number =  0
  public roleAdmin: boolean = false;
  public roleUser: boolean = false;

  ngOnInit(): void {
   this.role = Number(localStorage.getItem("rol")) ?? 0;

   this.role == 1 ? this.roleAdmin = true : this.roleAdmin = false;
   this.role == 2 ? this.roleUser = true : this.roleUser = false;
  }

}
