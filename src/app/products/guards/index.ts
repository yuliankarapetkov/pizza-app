import { PizzasGuard } from './pizzas.guard';
import { PizzaExistsGuards } from './pizza-exists.guard';

export const guards = [PizzasGuard, PizzaExistsGuards];

export * from './pizzas.guard';
export * from './pizza-exists.guard';