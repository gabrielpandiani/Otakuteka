import { Component } from '@angular/core';
import { Anime } from 'src/app/model/anime.model';
import { AnimeService } from 'src/app/service/anime.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  cardContainers: any;
  nxtBtn: any;
  preBtn: any;

  anime: Anime[] = [];

  constructor(private animeService:AnimeService){

  }

  ngOnInit(): void {

    this.animeService.listaAnime().subscribe(data => {
      this.animeService.setAnimeList(data);
      this.anime = this.animeService.animeList;});

  }

  caruselMovimiento():void{
    this.cardContainers = document.querySelectorAll(".carrusel-list");
    this.nxtBtn = document.querySelectorAll(".carrusel-next");
    this.preBtn = document.querySelectorAll(".carrusel-prev");
    this.cardContainers.forEach((item: HTMLElement, i: number) => {
      let containerTamanio = item.getBoundingClientRect();
      let cardWidth = containerTamanio.width/4;

      this.nxtBtn[i].addEventListener("click", () => {
        let posicionDeScroll = item.scrollLeft
        let nuevaPosicion = posicionDeScroll + cardWidth
        item.scrollTo({
          left:nuevaPosicion, behavior:"smooth"
        });
      });

      this.preBtn[i].addEventListener("click", () => {
        let posicionDeScroll = item.scrollLeft
        let nuevaPosicion = posicionDeScroll - cardWidth
        item.scrollTo({
          left:nuevaPosicion, behavior:"smooth"
        });
      });
    });
  }

}
