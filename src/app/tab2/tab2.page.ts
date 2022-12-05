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

    this.pokemonApi.getPokemonImageSrcByName(this.paramName).subscribe({
      next: (img) => {
        this.pokemon.imgSrc = img;
      }
    })
  }

}
