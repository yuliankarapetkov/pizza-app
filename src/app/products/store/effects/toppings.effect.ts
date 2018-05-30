import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';

import * as toppingActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffect {
    constructor(
        private actions$: Actions,
        private toppingsService: fromServices.ToppingsService
    ) {}

    @Effect()
    loadToppings$ = this.actions$
        .ofType(toppingActions.LOAD_TOPPINGS)
        .pipe(switchMap(() => {
            return this.toppingsService
                .getToppings()
                .pipe(
                    map(toppings => new toppingActions.LoadToppingsSuccess(toppings)),
                    catchError(error => of(new toppingActions.LoadToppingsFail(error)))
                );
        }));
}