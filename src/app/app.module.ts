import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';

// 3rd library
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

// services
import { LoginService } from './main/services/login.service';
import { UserService } from './main/services/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [
    LoginService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
