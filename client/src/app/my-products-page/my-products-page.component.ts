import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/interfaces';
import {MaterialService} from '../shared/services/material.service';

@Component({
  selector: 'app-my-products-page',
  templateUrl: './my-products-page.component.html',
  styleUrls: ['./my-products-page.component.scss']
})
export class MyProductsPageComponent implements OnInit, OnDestroy {

  products: Product[];
  loading = true;
  constructor(private productService: ProductService,
              private materialService: MaterialService) { }

  ngOnInit(): void {
    this.productService.fetchUserProducts().subscribe(
      (products) => {
        this.products = products;
        this.loading = false;
        },
      error => this.materialService.toast(error.error.message)
      );
  }

  ngOnDestroy(): void {
  }

  removeProduct(productId: string): void {
    const decision = window.confirm('Вы действительно желаете удалить товар?');
    if (decision) {
      this.productService.delete(productId).subscribe(
        (response) => {
          const idx = this.products.findIndex(p => p._id === productId);
          this.products.splice(idx, 1);
          this.materialService.toast(response.message);
        },
        error => this.materialService.toast(error.error.message)
      );
    }
  }

}
