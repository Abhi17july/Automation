import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Part, PartState, addToCart, loadParts, selectAllParts } from '../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  parts$: Observable<Part[]>;
  filteredParts$: Observable<Part[]> = of([]);
  types: string[] = [];
  selectedType = '';

  constructor(private store: Store<PartState>) {
    this.parts$ = this.store.select(selectAllParts).pipe(map(parts => parts || []));
    this.parts$.subscribe(parts => {
      parts.forEach(part => {
        if (!this.types.includes(part.type)) {
          this.types.push(part.type);
        }
      });
      this.filteredParts$ = this.parts$.pipe(
        map(parts => parts.filter(part => this.selectedType ? part.type === this.selectedType : true))
      );
    });
  }

  ngOnInit() {
    console.log('PartsComponent initialized');
    this.store.dispatch(loadParts());
  }

  addToCart(part: Part) {
    this.store.dispatch(addToCart({part}));
  }

  filterParts() {
    this.filteredParts$ = this.parts$.pipe(
      map(parts => parts.filter(part => this.selectedType ? part.type === this.selectedType : true))
    );
  }
}
