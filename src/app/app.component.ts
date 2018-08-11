import { Component } from '@angular/core';
import { Router } from '@angular/router';

// service
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'User Management';
  isLogin: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.isLogin = this.localStorageService.get('user') ? true : false;
  }

  logout() {
    console.log('Logout success!');
    this.localStorageService.remove('user');
    // use location.href to reload, so data from localStorage is refereshed
    location.href = '/login';
    // this.router.navigate(['/login']);
  }
}
