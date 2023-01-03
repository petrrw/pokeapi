import { Component, Input, NgModule, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})


export class PokemonListComponent implements OnInit {

  constructor(private pokemonApi : PokemonApiService, private router : Router, private storageService: StorageService) { }
  @Input() pokemons : Observable<any[]> = new Observable<[]>
  pokemonList : any[] = []


  showFavoritesOnly = false

  ngOnInit() : void {
    this.pokemons.subscribe({
      next:(p) => {
        p.forEach((value) => {
          let pokemon = {
            name: value.name,
            img: "",
            isFavorite: false
          }

          this.pokemonApi.getPokemonImageSrcByName(pokemon.name).subscribe({next: (imgSrc) => pokemon.img = imgSrc})

          from(this.storageService.isPokemonInFavorites(pokemon.name)).subscribe({next:(result) => {
            pokemon.isFavorite = result
            console.log(result)
            this.pokemonList.push(pokemon)
          }})
         
        })
      }
    })
  }

  async addToFavorites(pokemonName: string, event: Event){
    event.stopPropagation();
    await this.storageService.AddPokemonToFavorites(pokemonName)

    this.pokemonList.forEach(pokemon => {

      from(this.storageService.isPokemonInFavorites(pokemon.name)).subscribe({next:(result) => {
        pokemon.isFavorite = result
      }})

    })

  }

  async removeFromFavorites(pokemonName: string, event : Event){
    event.stopPropagation()
    this.storageService.saveData(pokemonName, "removed")
    await this.storageService.RemovePokemonFromFavorites(pokemonName)

    this.pokemonList.forEach(pokemon => {

      from(this.storageService.isPokemonInFavorites(pokemon.name)).subscribe({next:(result) => {
        pokemon.isFavorite = result
      }})

    })

    
  }

  public async isPokemonInFavorites(pokemonName:string){
    return await this.storageService.isPokemonInFavorites(pokemonName)
  }

  itemClicked(pokemonName : any){
     this.router.navigateByUrl("detail/" + pokemonName)
  }

  favoritesOnlyClick(){
    this.showFavoritesOnly = !this.showFavoritesOnly

    this.pokemonList.forEach(pokemon => {

      from(this.storageService.isPokemonInFavorites(pokemon.name)).subscribe({next:(result) => {
        pokemon.isFavorite = result
      }})

    })

  }
    

  }
