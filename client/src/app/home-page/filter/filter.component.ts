import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../../shared/services/material.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('select') selectRef: ElementRef;
  select: MaterialInstance;
  form: FormGroup;
  params: Params;
  constructor( private materialService: MaterialService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
        this.params = params;
      },
    );
    this.form = new FormGroup({
      start: new FormControl(this.params.startPrice),
      end: new FormControl(this.params.endPrice),
      category: new FormControl(this.params.category ? this.params.category : 'all'),
    });
  }

  ngAfterViewInit(): void {
    this.select = this.materialService.initializeSelect(this.selectRef);
    this.materialService.updateTextInputs();
  }

  ngOnDestroy(): void {
    this.select.destroy();
  }

  onSubmit(): void {
        this.router.navigate(['/'], { queryParams: {
          ...this.params,
          page: 1,
          category: this.form.value.category,
          startPrice: this.form.value.start,
          endPrice: this.form.value.end,
      } });
  }
}
