import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../shared/services/profile.service';
import {User} from '../shared/interfaces';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../shared/services/material.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{

  image: File;
  form: FormGroup;
  user$: Observable<User>;
  constructor(private profileService: ProfileService,
              private materialService: MaterialService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl(null, Validators.required)
    });
    this.user$ = this.profileService.getProfile();
  }
  onFileUpload(event: any): void {
    this.image = event.target.files[0];
  }
  onSubmit(): void {
     this.profileService.updateProfile(this.image).subscribe(
       (user) => {
         this.materialService.toast('Изменения сохранены');
         this.ngOnInit();
       },
       error => {
         this.materialService.toast(error.error.message);
         this.form.enable();
       }
     );
  }

}
