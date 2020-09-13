import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialService} from '../shared/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService,
              private router: Router, private route: ActivatedRoute,
              private materialService: MaterialService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.materialService.toast('Теперь вы можете зайти в систему используя свои данные');
      }
      else if (params['accessDenied']) {
        this.materialService.toast('Для начала авторизуйтесь в системе');
      } else if (params['sessionFailed']) {
        this.materialService.toast('Пожалуйста ввойдите заново');
      }
    });
  }

  onSubmit(): void{
    this.form.disable();
    this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/']),
      error => {
        this.materialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }
}
