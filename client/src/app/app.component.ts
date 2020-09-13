import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService,
              private title: Title) {}
  ngOnInit(): void {
    this.title.setTitle('Маркет');
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      this.auth.setToken(token);
    }
  }

}
