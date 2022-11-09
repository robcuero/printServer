import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

@Injectable({
  providedIn: "root",
})

export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = "http://172.20.33.219:5010";
  
  login(form: any) {
    return new Promise((resolve, rejects) => {
      
      const test = {
        cedula: form.value.cedula,
        clave: form.value.clave
        
      }

      this.http.post(this.BaseURI + "/getLoginPrintServer", test).subscribe(
        (res) => {
          resolve(res);
          swalWithBootstrapButtons.fire(
            "¡ logueado !",
            " ACCCESO CORRECTO",
            "success"
          );
          
         
          return res;
          
        },
        (error) => {
            swalWithBootstrapButtons.fire(
            "Cancelado",
            "CREDENCIALES INCORRECTAS",
            "error"
          );
                                
          rejects(error);
        }
      );
    });
  }



}