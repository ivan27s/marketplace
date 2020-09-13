import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {MaterialInstance, MaterialService} from '../shared/services/material.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('sidenav') sidenavRef: ElementRef;
  sidenav: MaterialInstance;
  constructor(public auth: AuthService,
              private materialService: MaterialService,
              private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.sidenav = this.materialService.initializeSidenav(this.sidenavRef);
  }

  ngOnDestroy(): void {
    this.sidenav.destroy();
  }
  logout(event): void {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/']);
  }
  openSidenav(): void {
    this.sidenav.open();
  }

}
