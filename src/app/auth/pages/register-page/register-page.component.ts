import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/auth.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public message:boolean = false;
  public registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  })

  constructor(
    private authService: AuthService
  ){}

  onSubmit(): void{
    if( this.registerForm.invalid) return;

    const miUser: User = {
      id: String(Math.floor(Math.random()*(100-1)+1)+1),
      role: "2",
      user: this.registerForm.value.name ?? '' ,
      email: this.registerForm.value.email ?? '' ,
    };

    this.authService.addUser(miUser).subscribe( res => {
      this.message = true;
      this.registerForm.reset();
          setTimeout(() => {
            this.message = false;
          }, 3000);
    })

  }
}
