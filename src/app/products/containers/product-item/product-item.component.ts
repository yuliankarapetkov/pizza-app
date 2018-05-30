import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
    selector: 'product-item',
    styleUrls: ['product-item.component.scss'],
    templateUrl: 'product-item.component.html'
})
export class ProductItemComponent implements OnInit {
    pizza$: Observable<Pizza>;
    visualise$: Observable<Pizza>;
    toppings$: Observable<Topping[]>;

    constructor(
        private store: Store<fromStore.ProductsState>
    ) {}

    ngOnInit() {
        this.visualise$ = this.store.select(fromStore.getPizzaVisualised);
        this.pizza$ = this.store.select(fromStore.getSelectedPizza);
        this.toppings$ = this.store.select(fromStore.getAllToppings);

    }

    onSelect(event: number[]) {
        this.store.dispatch(new fromStore.VisualiseToppings(event));
    }

    onCreate(event: Pizza) {
    }

    onUpdate(event: Pizza) {
    }

    onRemove(event: Pizza) {
        const remove = window.confirm('Are you sure?');
        if (remove) {
        }
    }
}
