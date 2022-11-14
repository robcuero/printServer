import { Component} from '@angular/core';
import { UserService } from '../services/usuarios.service';
import { AreaService } from '../services/area.service';
import { ImpresorasServices } from '../services/impresoras.service';
import { ImpresionService } from '../services/impresion.service';
import Swal from "sweetalert2";
import { PDFDocument } from 'pdf-lib';
import {
  FormBuilder,
  Validators,
} from "@angular/forms";
import { provideCloudflareLoader } from '@angular/common';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
}); 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'usuarios';
  constructor(
    private Userservice:UserService,
    private fb: FormBuilder,
    private AreaService :AreaService,
    private ImpresorasServices:ImpresorasServices,
    private ImpresionService:ImpresionService
  ){}

  flag : boolean = true
  opcionSeleccionado:string ="";
  impresoraSeleccion:string="";
  areaList:any=[];
  areaListImpresoras:any=[];
  usuarioList:any=[];
  ipv:any;
  totalhojas:any;
  idUsuario:any;
  idArea:any;
  idImpresora:any;
  nombredocumento:any;
  

    loginForm = this.fb.group({
      cedula: ["", [Validators.required,  Validators.minLength(10)]],
      clave: ["", [Validators.required]],
    });

//funcion de login de usuuario para validacion de usuario y clave 
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
          this.usuarioList=res;
          //id personal 
          this.idUsuario=this.usuarioList.idpersonal
          
        })
        .catch((err : any) => {
          this.flag = true
        });
        this.obtenerimpresoras();
    }
    //fianlizacion
 
    //funcion para obtener todas las areas que se encuentran disopibles en la base y se trae desde area services
    obtenerimpresoras(){
     this.AreaService.obtener_Areas().subscribe((res:any)=>{
        this.areaList=res;
       
     })
     
    }
    //fianlizacion

    //funcion para listar las imprresoras xacda areas disponibles traidas desde ImpresorasServices
    impresoraImpresion(){
        this.ImpresorasServices.obtenerImpresoras(this.opcionSeleccionado).subscribe((res:any)=>{
            this.areaListImpresoras=res;
           
         })
      
    }
    //fianlizacion

    //funcion oara mandara  imprimir con la ip de la impresora que fue sellecionada
    ipImpresion(){

      
      for (let areaList of this.areaList) { 
        if(this.opcionSeleccionado == areaList.descripcion){
          this.idArea=areaList.id_area;
          
        }
      }
      for(let impresoralist of this.areaListImpresoras){
        if(this.impresoraSeleccion == impresoralist.nombre){
            this.idImpresora=impresoralist.id_registro;
           
        }
      }
      
      this.ImpresionService.obtenerIpv(this.impresoraSeleccion).subscribe((res:any)=>{
        this.ipv=res;
        console.log(this.ipv);
       
     })
     const foo = {

      documento:this.nombredocumento,
      id_area:this.idArea,
      id_impresora:this.idImpresora,
      id_usuario:this.idUsuario,
      total_hojas:this.totalhojas
     };
      console.log(foo);
    }
    //fianlizacion

    //validacion para versi el archivo que se sube es extension .pdf y el docuento quedara en event.target.files 
    fileEvent(event:any) {
      
      if(event.target.files[0].type != "application/pdf"){
        swalWithBootstrapButtons.fire(
          "! SOLO SE ACEPTA ARCHIVOS .PDF",
          " VUELVA A CARGAR SU ARCHIVO....... ",
          "error"
        );
        //eliminar el archivo que se crago en otro tipo que no sea pdf 
       event.target.value=null;
      }else{
        swalWithBootstrapButtons.fire(
          " CARGADO",
          " EXITOSO.........",
          "success"
        );
        this.nombredocumento=event.target.files[0].name;
      
        
       //para obtener el total de hojas del documento que se ha cargado 
        const reader = new FileReader();
          reader.readAsArrayBuffer(event.target.files[0]);
          reader.onload = async () => {
            const pdfDoc = await  PDFDocument.load(reader.result);
             this.totalhojas=(pdfDoc.getPages().length);
              console.log("total hokajs del documento: "+this.totalhojas);
              
               //...
       };
      }
    }
    //fianlizacion


  }