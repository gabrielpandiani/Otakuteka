import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Anime } from 'src/app/model/anime.model';


@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent {
  @Input() anime: Anime = {
    idAnime:0,
    imagen:"",
    nombreAnime:"",
    genero:"",
    promedioPuntaje:0,
    sinopsis:"",
    temporada_emision:""
  }
  @Output() mostrarDetalle = new EventEmitter<number>();

  generarDetalle(){
    this.mostrarDetalle.emit(this.anime.idAnime)
    console.log(this.anime.idAnime)
  }
}
