import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Anime } from '../model/anime.model';


@Injectable({
  providedIn: 'root'
})
export class AnimeService {


  constructor(private http:HttpClient) {}

  public animeList: Anime[] = [];

  private animesFiltradosSubject = new BehaviorSubject(this.animeList);

  get animesFiltrados$(){
    return this.animesFiltradosSubject.asObservable()
  }

  setAnimeList(data:Anime[]) {
    this.animeList = data
  }

  filtrarAnimes(value: string) {
    const animesFiltrados = this.animeList.filter(anime => {
      return anime.nombreAnime.toLowerCase().includes(value.toLowerCase())||anime.genero.toLowerCase().includes(value.toLowerCase());

    });
    this.animesFiltradosSubject.next(animesFiltrados);
  }

  listaAnime(){
    return this.http.get<Anime[]>("http://localhost:8080/anime/todos")
  }

  animePorId(id:number){
    return this.http.get<Anime>(`http://localhost:8080/anime/todos/${id}`)
  }


}
