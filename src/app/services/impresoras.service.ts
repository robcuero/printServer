import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImpresorasServices {

  constructor(private http:HttpClient) { }

  readonly BaseURI = "http://localhost:3000";
 
  //devolujcion de cada impresora que se encuentra x cada area
  obtenerImpresoras(area:string) :any{

    
     return this.http.post(this.BaseURI+'/datosimpresora',{area});
   }
   //fianlizacion
}
