import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../shared/services/material.service';
import {CartService} from '../shared/services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  constructor(public cartService: CartService,
              private router: Router,
              private materialService: MaterialService) { }

  ngOnInit(): void {
    this.cartService.loadProducts();
  }

  ngAfterViewInit(): void {
    this.modal = this.materialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  open(): void {
    this.modal.open();
  }

  cancel(): void {
    this.modal.close();
  }
  removeProduct(id: string): void {
    this.cartService.removeProduct(id);
  }
  productClickHandler(id: string): void {
    this.modal.close();
    this.router.navigate(['/product-info'], { queryParams: {productId: id} });
  }
}
