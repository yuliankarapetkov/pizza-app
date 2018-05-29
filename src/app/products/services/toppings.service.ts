import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Topping } from '../models/topping.model';
import { ApiConstants } from '../constants/api.constants';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`${ApiConstants.Toppings}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
