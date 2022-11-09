import { DebugElement, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  
  readonly BaseURI = "http://localhost:3000";
  
  obtenerIpv(nombre:string) :any{
    
    
      
    return this.http.post(this.BaseURI+"/impresoraip", {nombre} );
  }
    

}
