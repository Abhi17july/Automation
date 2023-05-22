import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PartsComponent } from './parts/parts.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PartEffects, reducers } from './store';
import { PartService } from './part.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'parts', component: PartsComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PartsComponent,
    CartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PartEffects]),
    StoreDevtoolsModule.instrument(),
    FormsModule
  ],
  providers: [PartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
