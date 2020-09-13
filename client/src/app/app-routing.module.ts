import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {HomePageComponent} from "./home-page/home-page.component";
import {AddProductPageComponent} from "./add-product-page/add-product-page.component";
import {ProductInfoPageComponent} from "./product-info-page/product-info-page.component";
import {MyProductsPageComponent} from "./my-products-page/my-products-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'product-info', component: ProductInfoPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'userProducts', component: MyProductsPageComponent, canActivate: [AuthGuard]},
  {path: 'addProduct', component: AddProductPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
