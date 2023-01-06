import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { PokemonApiService } from '../services/pokemon-api.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public showOnlyFavorites: boolean = false
 
  constructor(private pokemonApi : PokemonApiService) {
    this.pokemons = pokemonApi.getPokemons(50);
    console.log(this.pokemons)
  }

  
  pokemons: Observable<any[]>

  ngOnInit() : void {
   

    
  }

}
