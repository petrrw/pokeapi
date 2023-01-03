import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 

  }

    /**
   * Save data to key
   *
   * @param key
   * @param data
   */
    async saveData(key: string, data: any) {
      await Preferences.set({
        // key: key,
        key,
        value: JSON.stringify(data),
      });
    }
  
    /**
     * Get data from key
     *
     * @param key
     */
    async getData(key: string) {
      const {value} = await Preferences.get({
        key
      });
      if(value)
        return JSON.parse(value);
      
        return null;
    }

    async getFavoritePokemons(){
      let favorite_pokemons = await this.getData("favorite_pokemons")

      if(!favorite_pokemons){
        favorite_pokemons = Array()
        await this.saveData("favorite_pokemons", favorite_pokemons)
      }

      return favorite_pokemons
    }

    async isPokemonInFavorites(pokemonName: string){
      let favoritePokemons = await this.getFavoritePokemons()

      if(favoritePokemons.indexOf(pokemonName) == -1)
         return false;

       return true
    }


    async AddPokemonToFavorites(pokemonName: string){
      let favoritePokemons = await this.getFavoritePokemons()

      
      if(await this.isPokemonInFavorites(pokemonName))
        return;

      favoritePokemons.push(pokemonName)
      await this.saveData("favorite_pokemons", favoritePokemons)
    }

    async RemovePokemonFromFavorites(pokemonName: string){
      let favoritePokemons = await this.getFavoritePokemons();

      const index = favoritePokemons.indexOf(pokemonName);

      if(index == -1)
        return;

      favoritePokemons.splice(index, 1)

      await this.saveData("favorite_pokemons", favoritePokemons)
    }
}
