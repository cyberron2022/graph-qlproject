import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import {
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  spinner$!: Observable<boolean>;

  title = 'GraphQLProject';
  modalTitle = 'Pokemon Details';

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  // private queryPokemonListSubs!: Subscription;
  // private queryPokemonSubs!: Subscription;

  private pokemonSelectedSubject = new Subject<number>();
  pokemonSelectedAction$ = this.pokemonSelectedSubject.asObservable();

  pokemons$ = this.appService.pokemons$.pipe(
    tap((data) => {
      console.log('CALL POKEMON LIST', data);
    }),

    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  selectedPokemon$ = this.appService.selectedPokemon$;

  vm$ = combineLatest([this.pokemons$, this.selectedPokemon$]).pipe(
    map(([pokemons, pokemon]) => ({
      pokemons,
      id: pokemon ? pokemon.selectedPokemonId : 0,
    }))
  );

  constructor(
    private apollo: Apollo,
    private appService: AppService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.spinner$ = this.store.pipe(select((state) => state.spinner.isOn));
  }
  displayDetail(pokemonId: string) {
    this.store.dispatch({ type: 'startSpinner' });
    this.appService.selectedPokemonChanged(+pokemonId);
  }

  ngOnDestroy(): void {
    // this.queryPokemonListSubs.unsubscribe();
    // this.queryPokemonSubs.unsubscribe();
  }
}
