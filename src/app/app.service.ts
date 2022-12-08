import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  map,
  shareReplay,
  tap,
} from 'rxjs';

import { Pokemons_List } from './generated/graphql.query';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  pokemonResult$: any[] = [];

  pokemons$ = this.apollo
    .watchQuery({
      query: Pokemons_List,
    })
    .valueChanges.pipe(
      tap((data) => console.log('SERVICE CALL', data)),
      map((result: any) => {
        const handleObject = (list: any) => {
          list.map((item: any) => {
            const obj = Object.assign({}, item);
            let res = JSON.parse(
              '[' + obj['pokemon_v2_pokemonsprites'][0]['sprites'] + ']'
            );
            this.pokemonResult$.push({
              id: obj['id'],
              pokemon_id: obj['pokemon_v2_pokemonsprites'][0]['pokemon_id'],
              name: obj['name'],
              height: obj['height'],
              weight: obj['weight'],
              sprites: res[0].front_default,
              base_experience: obj['base_experience'],
              order: obj['order'],
              pokemon_species_id: obj['pokemon_species_id'],
              base_happiness: obj['pokemon_v2_pokemonspecy'].base_happiness,
              capture_rate: obj['pokemon_v2_pokemonspecy'].capture_rate,
              pokemon_v2_pokemonabilities: obj['pokemon_v2_pokemonabilities'],
              pokemon_v2_pokemontypes: obj['pokemon_v2_pokemontypes'],
            });
          });
        };

        handleObject(result?.data?.pokemon_v2_pokemon);

        return this.pokemonResult$;
      }),
      shareReplay(1)
    );

  private pokemonSelectedSubject = new BehaviorSubject<number>(0);
  pokemonSelectedAction$ = this.pokemonSelectedSubject.asObservable();

  selectedPokemon$ = combineLatest([
    this.pokemons$,
    this.pokemonSelectedAction$,
  ]).pipe(
    delay(500),
    map(([pokemons, selectedPokemonId]) =>
      pokemons.find((pokemons) => pokemons.id === selectedPokemonId)
    ),
    map((data) => {
      this.store.dispatch({ type: 'stopSpinner' });
      return { ...data };
    }),
    tap((pokemons) => console.log('selectedPokemon', pokemons)),
    shareReplay(1)
  );

  constructor(private apollo: Apollo, private store: Store<any>) {}

  selectedPokemonChanged(selectedPokemonId: number): void {
    this.pokemonSelectedSubject.next(selectedPokemonId);
  }
}
