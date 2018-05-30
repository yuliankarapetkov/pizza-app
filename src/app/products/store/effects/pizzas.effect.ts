import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffect {
    constructor(
        private actions$: Actions,
        private pizzasService: fromServices.PizzasService
    ) {}

    @Effect()
    loadPizzas$ = this.actions$
        .ofType(pizzaActions.LOAD_PIZZAS)
        .pipe(switchMap(() => {
            return this.pizzasService
                .getPizzas()
                .pipe(
                    map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
                    catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
                );
        }));
}