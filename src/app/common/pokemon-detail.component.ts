import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { catchError, combineLatest, EMPTY, filter, map } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent implements OnInit {
  @Input() spinner$: any;

  details$ = this.appService.selectedPokemon$.pipe(
    catchError((err) => {
      //this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private appService: AppService) {}

  vm$ = combineLatest([this.details$]).pipe(
    filter(([details]) => Boolean(details)),
    map(([details]) => ({
      details,
    }))
  );

  ngOnInit(): void {}
}
