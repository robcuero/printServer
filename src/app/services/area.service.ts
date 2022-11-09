import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }

  readonly BaseURI = "http://localhost:3000";
 
  obtener_Areas() :any{
   return (this.http.get(this.BaseURI + "/impresoras/areas"));
  }
}
