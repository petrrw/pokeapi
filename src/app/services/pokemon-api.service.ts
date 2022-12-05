import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private httpClient: HttpClient) { }

    getPokemons(limit: number) : Observable<any[]>{
        return this.httpClient.get<[]>("https://pokeapi.co/api/v2/pokemon/?limit=" + limit).pipe(map((x:any) => x.results))
    }

    getPokemonImageSrcByName(name: string): Observable<string>{
      // return this.httpClient.get<string>("https://pokeapi.co/api/v2/pokemon/" + name).pipe(map((x: any) => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + x.id + ".png"))
      return this.httpClient.get<string>("https://pokeapi.co/api/v2/pokemon/" + name).pipe(map((x:any) => x.sprites.other.dream_world.front_default))
    }

    getPokemonDescriptionByName(name:string): Observable<string>{
      return this.httpClient.get<string>("https://pokeapi.co/api/v2/pokemon-species/" + name).pipe(map((x:any) => x.flavor_text_entries[6].flavor_text))
    }

    getAllPokemonDetails(name: string) : Observable<any>{
      return this.httpClient.get("https://pokeapi.co/api/v2/pokemon/" + name);
    }
 }
