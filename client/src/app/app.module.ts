import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { ProductInfoPageComponent } from './product-info-page/product-info-page.component';
import { MyProductsPageComponent } from './my-products-page/my-products-page.component';
import { FilterComponent } from './home-page/filter/filter.component';
import {CartComponent} from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    LoaderComponent,
    HomePageComponent,
    AddProductPageComponent,
    ProductInfoPageComponent,
    MyProductsPageComponent,
    CartComponent,
    FilterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
