import { Component, Input, NgModule, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, from, Observable, Subject } from 'rxjs';
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
  searchText: Subject<string> = new Subject<string>()
  pokemonList : any[] = []
  oldPokemonList:any[] = []


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
            this.pokemonList.push(pokemon)
          }})
         
        })
      }
    })

    this.oldPokemonList = this.pokemonList
     this.searchText.pipe(distinctUntilChanged()).subscribe({
      
      next:(value) => {
        if(value.length > 0)
        {
              this.pokemonApi.getAllPokemonDetails(value).subscribe({next:(pokemonDetails) => {
                this.oldPokemonList = this.pokemonList
                console.log("old pokemon list set to:", this)
                let pokemon = {
                  name: pokemonDetails.name,
                  img: "",
                  isFavorite: false
                }
                this.pokemonList = []
                this.pokemonApi.getPokemonImageSrcByName(pokemon.name).subscribe({next: (imgSrc) => pokemon.img = imgSrc})
                from(this.storageService.isPokemonInFavorites(pokemon.name)).subscribe({next:(result) => {
                  pokemon.isFavorite = result
                  this.pokemonList.push(pokemon)
                }})
              
              }

            ,
            error:(err) => {
               this.pokemonList = []
            }
          })
      }
      else{
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
                this.pokemonList.push(pokemon)
              }})
            })
          }
        })
      }
        // ziskat pokemona, ale asi to dát přímo do listu a tady jen dát defaultní počet kolik zobrazit
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

    if(this.showFavoritesOnly)
    {

      this.oldPokemonList = this.pokemonList

      this.pokemonList = []

      from(this.storageService.getFavoritePokemons()).subscribe({next:(favoritePokemons) => {
        favoritePokemons.forEach((favPokemon: any) => {
       
          let pokemon = {
            name: favPokemon,
            img: "",
            isFavorite: false
          }
          this.pokemonList.push(pokemon)
          from(this.storageService.isPokemonInFavorites(favPokemon)).subscribe({next:(value) => pokemon.isFavorite = value})
          this.pokemonApi.getPokemonImageSrcByName(favPokemon).subscribe({next: (imgSrc) => pokemon.img = imgSrc})
        })
      }})
    }
    else{
      this.pokemonList = []
      this.oldPokemonList.forEach(value => {
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
  }
}
