import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})


export class PokemonListComponent implements OnInit {
  public paramName:any

  constructor(private pokemonApi : PokemonApiService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.paramName = params['name'];
    });
   }
  //@Input() pokemons: Observable<[]> = new Observable<[]>
  @Input() pokemons : Observable<any[]> = new Observable<[]>
  pokemonList : any[] = []

  ngOnInit() : void {
    this.pokemons.subscribe({
      next:(p) => {
        p.forEach((value) => {
          let pokemon = {
            name: value.name,
            img: ""
          }

          this.pokemonApi.getPokemonImageSrcByName(pokemon.name).subscribe({next: (imgSrc) => pokemon.img = imgSrc})

          this.pokemonList.push(pokemon)
        })
      }
    })
  }

  onItemSelected(pokemon : any){
    // this.router.navigateByUrl("detail")
    // console.log(pokemon.name)
  }

}
