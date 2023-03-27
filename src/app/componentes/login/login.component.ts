import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Usuarios } from 'src/interfaces/Usuarios';
import { catchError, of } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Logica para cambio de login a registro
  oculto: boolean = true;
  mostrar(){
    this.oculto = !this.oculto
  }

  loginForm!: FormGroup;
  registerForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router , private loginService:LoginService) { }

  usuarioIngresado: string = '';
  contraseniaIngresada: string = '';
  mailIngresado: string = '';

  credencialesError:boolean=false;

  //Logica de mensajes de error
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      regUsuario:['',[Validators.required]],
      regContrasenia:['',[Validators.required]],
      regMail:['',[Validators.required,Validators.email]]
    })
  }

  //Login conexion con la base de datos

  loginSubmit():void{
    this.usuarioIngresado = this.loginForm.get("usuario")?.value;
    this.contraseniaIngresada = this.loginForm.get("contrasenia")?.value;
    const loginRequest ={
      nombre:this.usuarioIngresado,
      contrasenia:this.contraseniaIngresada
    }
    this.http.post<Usuarios>("http://localhost:8080/usuarios/login",loginRequest)
    .pipe(catchError(error => {
      if (error.status == 401) {
        Swal.fire({
          position: 'center',
          imageUrl: 'assets/Imagenes_Otakuteka/chopper-sorprendido.png',
          imageAlt: 'reno-sorprendido',
          imageHeight: 400,
          imageWidth: 350,
          title: 'Credenciales invalidas',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        console.log(error)
      }
      return of(null);
    })).subscribe(response => {
      if (response) {
        Swal.fire({
          position: 'center',
          imageUrl: 'assets/Imagenes_Otakuteka/super-chopper.png',
          imageAlt: 'reno-feliz',
          imageHeight: 300,
          imageWidth: 300,
          title: 'Ingreso correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then( () => {
          if (Swal.DismissReason.timer) {
            sessionStorage.setItem("usuarioIngresado",this.usuarioIngresado)
            this.loginService.session = true;
            this.router.navigate([''])
          }})
      }
    })
  }

  //Registro conexion con base de datos

  registerSubmit():void{
    this.usuarioIngresado = this.registerForm.get("regUsuario")?.value;
    this.mailIngresado = this.registerForm.get("regMail")?.value;
    this.contraseniaIngresada = this.registerForm.get("regContrasenia")?.value;
    const registerRequest ={
      nombre:this.usuarioIngresado,
      contrasenia:this.contraseniaIngresada,
      email:this.mailIngresado
    }
    console.log(registerRequest)
    this.http.post<Usuarios>("http://localhost:8080/usuarios/agregar",registerRequest)
    .pipe(catchError(error => {
      if (error.status == 401) {
        Swal.fire({
          position: 'center',
          imageUrl: 'assets/Imagenes_Otakuteka/chopper-sorprendido.png',
          imageAlt: 'reno-sorprendido',
          imageHeight: 300,
          imageWidth: 400,
          title: 'No se pueden enviar campos vacios',
          showConfirmButton: false,
          timer: 1500
        })
      }else if (error.status == 500){
        Swal.fire({
          position: 'center',
          imageUrl: 'assets/Imagenes_Otakuteka/chopper-triste.jpg',
          imageAlt: 'reno-triste',
          imageHeight: 300,
          imageWidth: 300,
          title: 'Credenciales ya existentes',
          showConfirmButton: false,
          timer: 1500
        }).then( () => {
          if (Swal.DismissReason.timer) {
            this.registerForm.reset()
          }})
      }
      else {
        console.log(error)
      }
      return of(null);
    }))
    .subscribe(response => {
      if (response) {
        console.log(response);
        console.log("Usuario creado")
        Swal.fire({
            position: 'center',
            imageUrl: 'assets/Imagenes_Otakuteka/super-chopper.png',
            imageAlt: 'reno-feliz',
            imageHeight: 300,
            imageWidth: 300,
            title: 'Cuenta creada exitosamente',
            showConfirmButton: false,
            timer: 1500
          }).then( () => {
            if (Swal.DismissReason.timer) {
              sessionStorage.setItem("usuarioIngresado",this.usuarioIngresado)
              this.loginService.session = true;
              this.router.navigate([''])
            }})
      }
    })
  }
}
