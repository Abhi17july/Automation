import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { PartsComponent } from './parts/parts.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'parts', component: PartsComponent },
  { path: 'cart', component: CartComponent },
];


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PC Builder'`, () => {
    expect(component.title).toEqual('PC Builder');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('PC Builder');
  });
  
});
