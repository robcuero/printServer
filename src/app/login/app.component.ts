import { Component } from '@angular/core';
import { UserService } from '../services/usuarios.service';
import {
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usuarios';
  constructor(
    private Userservice:UserService,
    private fb: FormBuilder
  ){}

  flag : boolean = true

    loginForm = this.fb.group({
      cedula: ["", [Validators.required,  Validators.minLength(10)]],
      clave: ["", [Validators.required]],
    });


    login() {
  
      if (this.loginForm.invalid) {
        return;
      }
      const formValue = this.loginForm.value;
      this.Userservice
        .login(this.loginForm)
        .then((res: any) => {
          //para acceder al login y poder ocultarlo
          this.flag = res.status === 1 ? false : true
        })
        .catch((err : any) => {
          this.flag = true
        });
    }





  }

