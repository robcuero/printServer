import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})

export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = "http://172.20.33.219:5010";

  login(form: any) {
    return new Promise((resolve, rejects) => {
      console.log(JSON.stringify(form.value))
      const test = {
        cedula: form.value.cedula,
        clave: form.value.clave
      }

      this.http.post(this.BaseURI + "/getLoginPrintServer", test).subscribe(
        (res) => {
          resolve(res);
          Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Something went wrong!',
          })  
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })     
          rejects(error);
        }
      );
    });
  }

}