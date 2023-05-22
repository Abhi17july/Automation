import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PartsComponent } from './parts.component';
import { Part } from '../store';
import { FormsModule } from '@angular/forms';

describe('PartsComponent', () => {
  let component: PartsComponent;
  let fixture: ComponentFixture<PartsComponent>;
  let store: MockStore;
  const initialState = { parts: { entities: {}, ids: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsComponent ],
      imports: [FormsModule ],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadParts on ngOnInit', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch addToCart on addToCart', () => {
    const spy = spyOn(store, 'dispatch');
    const dummyPart: Part = { id: 1, name: 'Part 1', description: 'Part 1 description', type: 'type1', image: 'image1', price: 123 };
    component.addToCart(dummyPart);
    expect(spy).toHaveBeenCalled();
  });
});
