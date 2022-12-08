import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { jQuery, JQ_TOKEN } from './common/JQuery.service';
import { ModalTriggerDirective } from './common/modalTrigger.directive';
import { PokemonDetailComponent } from './common/pokemon-detail.component';
import { SimpleModalComponent } from './common/simple-modal.component';
import { reducer } from './common/spinner.reducer';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    PokemonDetailComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({ spinner: reducer }),
  ],
  providers: [AppService, { provide: JQ_TOKEN, useValue: jQuery }],
  bootstrap: [AppComponent],
})
export class AppModule {}
