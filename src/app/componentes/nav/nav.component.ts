import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/service/anime.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
constructor(private loginService:LoginService, public router:Router, public animeService:AnimeService){}

ruta = false;

//Cierre de sesion
get mostrar():boolean{

  return this.loginService.session;

  }

cerrarSesion(){
  this.loginService.session=false;
  sessionStorage.removeItem("usuarioIngresado")
  this.ngOnInit()
}
//Mostrar usuario en detalle de la pagina


usuarioIngresado="";

ngOnInit(){
  if(sessionStorage.getItem("usuarioIngresado")){
    this.loginService.session = true;
    let aux =sessionStorage.getItem("usuarioIngresado")
    this.usuarioIngresado = aux ? aux :"";
  }
  if(this.router.url=="/teka-completa"){
    this.ruta=!this.ruta;
  }
}

buscaPorTecla(value:any){
  this.animeService.filtrarAnimes(value.target.value)
}

get nombreUsuario():string{
    let aux =sessionStorage.getItem("usuarioIngresado")
    this.usuarioIngresado = aux ? aux :"";
    return this.usuarioIngresado;
}

}
