import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Product, ProductInfo} from '../shared/interfaces';
import {ProductService} from '../shared/services/product.service';
import {CartService} from '../shared/services/cart.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss']
})
export class ProductInfoPageComponent implements OnInit {

  productInfo$: Observable<ProductInfo>;
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.productInfo$ = this.productService.getProductInfo(params.productId);
      }
    );
  }

  addCartProduct(product: Product): void {
    this.cartService.addProduct(product);
  }
  backClickHandler(): void {
    this.location.back();
  }
}
