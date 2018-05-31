import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) {}

    @Effect()
    loadPizzas$ = this.actions$
        .ofType(pizzaActions.LOAD_PIZZAS)
        .pipe(switchMap(() => {
            return this.pizzaService
                .getPizzas()
                .pipe(
                    map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
                    catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
                );
        }));

    @Effect()
    createPizza$ = this.actions$
        .ofType(pizzaActions.CREATE_PIZZA)
        .pipe(
            map((action: pizzaActions.CreatePizza) => action.payload),
            switchMap((pizza) => {
                return this.pizzaService.createPizza(pizza)
                    .pipe(
                        map(newPizza => new pizzaActions.CreatePizzaSuccess(newPizza)),
                        catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
                    );
            })
        );

    @Effect()
    updatePizza$ = this.actions$
        .ofType(pizzaActions.UPDATE_PIZZA)
        .pipe(
            map((action: pizzaActions.UpdatePizza) => action.payload),
            switchMap((pizza) => {
                return this.pizzaService.updatePizza(pizza)
                    .pipe(
                        map(updatedPizza => new pizzaActions.UpdatePizzaSuccess(updatedPizza)),
                        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
                    );
            })
        );
}