import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionReducerMap, createAction, createReducer, on, props } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PartService } from '../part.service';


export interface Part {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  type: string;
}


export interface PartState {
  parts: Part[];
  cart: Part[];
  error: any;
}

// Define your initial state
export const initialState: PartState = {
  parts: [],
  error: null,
  cart: []
};





export const loadParts = createAction('[Part] Load Parts');

export const loadPartsSuccess = createAction(
  '[Part] Load Parts Success',
  props<{ parts: Part[] }>()
);

export const loadPartsFailure = createAction(
  '[Part] Load Parts Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add Part',
  props<{ part: Part }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Part',
  props<{ partId: number }>()
);

export const getCartItems = createAction('[Cart] Get Cart Items');


export const partReducer = createReducer(
  initialState,
  on(loadParts, state => state),
  on(loadPartsSuccess, (state, { parts }) => ({ ...state, parts })),
  on(loadPartsFailure, (state, { error }) => ({ ...state, error })),
  on(addToCart, (state, { part }) => {
    return { ...state, cart: [...state.cart, part] };
  }),
  on(removeFromCart, (state, { partId }) => {
    return { ...state, cart: state.cart.filter(part => part.id !== partId) };
  }),
  on(getCartItems, state => state)
);



export const reducers: ActionReducerMap<{part: PartState}> = {
  part: partReducer,
};


// Select the entire feature state
const selectPartState = createFeatureSelector<PartState>('part');

// Select just the parts array from the feature state
export const selectAllParts = createSelector(
  selectPartState,
  (state: PartState) => state ? state.parts : undefined
);


// Select just the cart array from the feature state
export const selectAllCartItems = createSelector(
  selectPartState,
  (state: PartState) => state.cart
);


@Injectable()
export class PartEffects {


  

  loadParts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadParts),
    tap(() => console.log('loadParts action was dispatched')),
    mergeMap(() => this.partService.getParts().pipe(
      tap(parts => console.log('Parts loaded from API:', parts)),
      map(parts => loadPartsSuccess({ parts })),
      catchError(error => of(loadPartsFailure({ error })))
    ))
  )
);

  constructor(
    private actions$: Actions,
    private partService: PartService
  ) {}
}
