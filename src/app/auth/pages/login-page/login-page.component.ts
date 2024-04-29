import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interface/auth.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  public message: boolean = false;
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })


   constructor(
    private authService: AuthService,
    private router:Router
   ){
    
   }

    onSubmit(): void {
      if( this.loginForm.invalid) return;

      const user = this.loginForm.value.email ?? '';
      let myUser: User[]= [];
      this.authService.getUsers().subscribe( users => {
        myUser = users;
        const exist = myUser.filter(item => item.email == user);
        if(exist.length > 0){
          this.authService.getAppsById(exist[0].id).subscribe(res =>{
            this.router.navigate(['/main/technology']);
          })
        }
        else{
          this.message = true;
          setTimeout(() => {
            this.message = false;
          }, 3000);
        }

      })
    }

}
