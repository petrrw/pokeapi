import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonApiService } from '../services/pokemon-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private pokemonApi : PokemonApiService) {
    this.pokemons = pokemonApi.getPokemons(10);
    console.log(this.pokemons)
  }
  pokemons: Observable<any[]>

}
