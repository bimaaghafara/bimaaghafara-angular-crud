import { Component } from '@angular/core';
import { Router } from '@angular/router';

// 3rd library
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.isLogin = this.localStorageService.get('user') ? true : false;
  }

  logout() {
    this.spinnerService.show();
    console.log('Logout success!');
    this.localStorageService.remove('user');
    // use location.href to reload, so data from localStorage is refereshed
    setTimeout(() => {
      location.href = '/login';
    }, 500);
    // this.router.navigate(['/login']);
  }
}
