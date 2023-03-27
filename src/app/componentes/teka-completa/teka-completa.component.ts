import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Anime } from 'src/app/model/anime.model';
import { AnimeService } from 'src/app/service/anime.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-teka-completa',
  templateUrl: './teka-completa.component.html',
  styleUrls: ['./teka-completa.component.css']
})

export class TekaCompletaComponent implements OnInit {


  //inicializado de variables
  maxChars = 100;
  lista:Anime[]=[];
  anime: Anime[] = [];

  animeList$: Observable<Anime[]> | undefined;


  constructor(private animeService:AnimeService,private http:HttpClient, public router:Router){

  }

    ngOnInit(): void {
      this.animeService.listaAnime().subscribe(data => {
      this.animeService.setAnimeList(data);
      this.anime = this.animeService.animeList;
      this.animeService.filtrarAnimes('');
      this.animeList$ = this.animeService.animesFiltrados$;
      console.log(this.anime)
    });
  }




  detalleTeka=false;

  animeElegido = {
    idAnime:0,
    imagen:"",
    nombreAnime:"",
    genero:"",
    promedioPuntaje:0,
    sinopsis:"",
    temporada_emision:""
  }

  cambiarDetalleTeka(){
    this.detalleTeka = !this.detalleTeka;
    this.ngOnInit();
  }

  generarDetalle(idAnime:number){
    this.animeService.animePorId(idAnime).subscribe(anime =>{
      this.cambiarDetalleTeka()
      this.animeElegido = anime;
      console.log(anime)
      })
  }
}
