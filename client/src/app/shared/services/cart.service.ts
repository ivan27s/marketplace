import {Injectable} from '@angular/core';
import {Product} from '../interfaces';
import {MaterialService} from './material.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];
  constructor(private materialService: MaterialService) {}
  loadProducts(): Product[] {
    this.products = JSON.parse(localStorage.getItem('productsInCart'));
    return this.products;
  }
  getTotalPrice(): number {
    if (this.products) {
      return this.products.reduce((sum, el) => {
        sum += el.price;
        return sum;
      }, 0);
    } else {
      return 0;
    }
  }
  addProduct(product: Product): void {
    if (this.products && this.products.find(el => el._id === product._id)) {
      this.materialService.toast('Товар уже в корзине');
      return;
    } else {
      if (!this.products) {
        this.products = [];
      }
      this.products.push(product);
      localStorage.setItem('productsInCart', JSON.stringify(this.products));
      this.materialService.toast('Товар добавлен в корзину');
    }
  }
  removeProduct(id: string): void {
    this.products = this.products.filter(el => el._id !== id);
    localStorage.setItem('productsInCart', JSON.stringify(this.products));
  }
}
