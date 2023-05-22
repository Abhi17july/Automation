import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { PartEffects, partReducer, initialState, loadParts, loadPartsSuccess, loadPartsFailure } from './index';
import { PartService } from '../part.service';
import { Part } from './index';

import { hot, cold } from 'jasmine-marbles';

describe('Parts Store', () => {
  describe('Actions', () => {
    it('should create Load Parts action', () => {
      const action = loadParts();
      expect(action.type).toEqual('[Part] Load Parts');
    });

    // More tests for other actions...
  });

  describe('Reducer', () => {
    it('should return the initial state when an action is not matched', () => {
      const action = {} as any;
      const state = partReducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should set parts on loadPartsSuccess', () => {
      const parts: Part[] = [ /* your mock parts array */ ];
      const action = loadPartsSuccess({ parts });
      const state = partReducer(initialState, action);

      expect(state.parts).toEqual(parts);
    });

    // More tests for other actions...
  });

  describe('Effects', () => {
    let actions$: Observable<any>;
    let effects: PartEffects;
    let partService: jasmine.SpyObj<PartService>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PartEffects,
          provideMockActions(() => actions$),
          {
            provide: PartService,
            useValue: jasmine.createSpyObj('partService', ['getParts'])
          }
        ]
      });

      effects = TestBed.inject(PartEffects);
      partService = TestBed.inject(PartService) as jasmine.SpyObj<PartService>;
    });

    it('should dispatch loadPartsSuccess action when partService.getParts succeeds', () => {
      const parts: Part[] = [ /* your mock parts array */ ];
      partService.getParts.and.returnValue(of(parts));
      const action = loadParts();
      const outcome = loadPartsSuccess({ parts });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: parts });
      const expected = cold('--b', { b: outcome });
      partService.getParts.and.returnValue(response);

      expect(effects.loadParts$).toBeObservable(expected);
    });

    it('should dispatch loadPartsFailure action when partService.getParts fails', () => {
      const error = new Error('Error loading parts');
      partService.getParts.and.returnValue(throwError(error));
      const action = loadParts();
      const outcome = loadPartsFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      partService.getParts.and.returnValue(response);

      expect(effects.loadParts$).toBeObservable(expected);
    });

    // More tests for other effects...
  });
});
