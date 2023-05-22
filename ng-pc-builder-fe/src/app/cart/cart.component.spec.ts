import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartComponent } from './cart.component';
import { Part } from '../store';
import { FormsModule } from '@angular/forms';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: MockStore;
  const initialState = { cart: { entities: {}, ids: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [FormsModule ],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getCartItems on ngOnInit', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch removeFromCart on removeFromCart', () => {
    const spy = spyOn(store, 'dispatch');
    const dummyPart: Part = { id: 1, name: 'Part 1', description: 'Part 1 description', type: 'type1', image: 'image1', price: 123 };
    component.removeFromCart(dummyPart);
    expect(spy).toHaveBeenCalled();
  });
});
