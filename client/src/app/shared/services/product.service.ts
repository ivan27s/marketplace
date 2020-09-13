import {Injectable} from '@angular/core';
import {Message, PageProducts, Product, ProductInfo} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  fetch(params: Params): Observable<PageProducts> {
    return this.http.get<PageProducts>('/api/products', {params});
  }
  getProductInfo(id: string): Observable<ProductInfo> {
    return this.http.get<ProductInfo>(`/api/products/${id}`);
  }
  fetchUserProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products/userProducts');
  }
  create(fd: FormData): Observable<Product> {
    return this.http.post<Product>('/api/products', fd);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/products/${id}`);
  }
}
