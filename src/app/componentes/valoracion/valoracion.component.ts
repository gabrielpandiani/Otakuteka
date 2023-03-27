import { Component } from '@angular/core';
import { faStar} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library for convenient access in other components
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TekaCompletaComponent } from '../teka-completa/teka-completa.component';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import Swal from "sweetalert2";

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})


export class ValoracionComponent {

  votante = sessionStorage.getItem('usuarioIngresado');
  idAnimeSeleccionado =this.tekacompleta.animeElegido.idAnime;



  constructor(library: FaIconLibrary,private tekacompleta:TekaCompletaComponent,private http:HttpClient) {
    library.addIcons(faStar);
  }


  calificar(nota: number) {
    const estrellas = document.querySelectorAll(".estrellas")
    for (let i = 0; i < nota; i++) {
      if(i<nota){
        estrellas[i].classList.add("seleccionado")
      } else{
        estrellas[i].classList.remove("seleccionado");
      }
    }
    const mensajeAlBack = {
      "usuario":{"nombre":this.votante},
      "anime":{"idAnime":this.idAnimeSeleccionado} ,
      "puntaje": nota
    }



    console.log(mensajeAlBack)
    this.http.post("http://localhost:8080/animehasusuarios/puntuar",mensajeAlBack)
      .pipe(catchError(error => {
        if(error.status == 500){
          Swal.fire({
            position: 'center',
            imageUrl: 'assets/Imagenes_Otakuteka/chopper-sorprendido.png',
            imageAlt: 'reno-sorprendido',
            imageHeight: 300,
            imageWidth: 400,
            title: "Votacion Invalida: usuario no ingresado",
            showConfirmButton: false,
            timer: 1500
          })
        }else if(error.status== 401){
          Swal.fire({
            position: 'center',
            imageUrl: 'assets/Imagenes_Otakuteka/chopper-triste.jpg',
            imageAlt: 'reno-triste',
            imageHeight: 300,
            imageWidth: 400,
            title: "Votacion Invalida: ya voto en este anime",
            showConfirmButton: false,
            timer: 1500
          })
        } else{
          console.log(error)
      }
      return of(null);
      })).subscribe(response => {
        if (response) {
          console.log("Votacion realizada")
          Swal.fire({
              position: 'center',
              imageUrl: 'assets/Imagenes_Otakuteka/super-chopper.png',
              imageAlt: 'reno-feliz',
              imageHeight: 300,
              imageWidth: 300,
              title: 'Votacion realizada',
              showConfirmButton: false,
              timer: 1500
            })
        }
      });
  }
}

