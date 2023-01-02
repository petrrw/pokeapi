import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonApiService } from '../services/pokemon-api.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public paramName : any
  public pokemon : any = {
    name: "",
    imgSrc: ""
  }

  public pokemonDetails : {name: string, images: string[], types: [], weight: number, stats: any[]} = {
    name: "",
    images: [],
    types: [],
    weight: NaN,
    stats: []
  }

  slideOptions = {
    autoplay: {
      delay: 1000,
      disableOnIteraction: false
    }
  }



  constructor(private pokemonApi : PokemonApiService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.paramName = params['name'];
    });
  }
  ngOnInit(): void {
    this.pokemonApi.getAllPokemonDetails(this.paramName).subscribe({
      next: (data) => {
        this.pokemon.name = data.name;
      }
    })

    this.pokemonApi.getAllPokemonDetails(this.paramName).subscribe({
      next:(details) => {
        let x = Object.keys(details["sprites"])
        this.pokemonDetails.images = x.map(spriteKey => details["sprites"][spriteKey]).filter(img => typeof(img) === "string")
        this.pokemonDetails.types = details.types
        this.pokemonDetails.weight = details.weight
        this.pokemonDetails.stats = details.stats
      }
    })
  }

}
