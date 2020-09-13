import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {MaterialInstance, MaterialService} from '../shared/services/material.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('select') selectRef: ElementRef;
  select: MaterialInstance;
  image: File;
  form: FormGroup;
  constructor(private productService: ProductService,
              private router: Router,
              private materialService: MaterialService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      file: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }
  ngOnDestroy(): void {
    this.select.destroy();
  }
  ngAfterViewInit(): void {
    this.select = this.materialService.initializeSelect(this.selectRef);
  }
  onFileUpload(event: any): void {
    this.image = event.target.files[0];
  }
  onSubmit(): void {
    this.form.disable();
    const fd = new FormData();
    fd.append('image', this.image, this.image.name);
    fd.append('name', this.form.value.name);
    fd.append('price', this.form.value.price);
    fd.append('description', this.form.value.description);
    fd.append('category', this.form.value.category);
    this.productService.create(fd).subscribe(
      (product) => {
        this.materialService.toast('Товар добавлен');
        this.router.navigate(['/']);
      },
      error => {
        this.materialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

}
