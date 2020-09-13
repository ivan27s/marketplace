import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Observable} from 'rxjs';
import {PageProducts} from '../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data$: Observable<PageProducts>;
  params: Params;
  currentPage: number;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
        this.currentPage = params['page'];
        this.params = params;
        this.data$ = this.productService.fetch(params);
      },
    );
  }

  productClickHandler(id: string): void {
    this.router.navigate(['/product-info'], { queryParams: {productId: id} });
  }

  pageChange(newPage: number): void {
    this.router.navigate(['/'], {
      queryParams: {...this.params, page: newPage}
    });
  }
  sortClickHandler(sort: string): void {
    this.router.navigate(['/'],
      { queryParams: {...this.params, page: 1, sort } });
  }
}
