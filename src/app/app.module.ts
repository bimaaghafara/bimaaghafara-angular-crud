import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './main/components/login/login.component';
import { UserAddComponent } from './main/components/user/user-add/user-add.component';
import { UserEditComponent } from './main/components/user/user-edit/user-edit.component';
import { UserListComponent } from './main/components/user/user-list/user-list.component';

// services
import {LoginService } from './main/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserAddComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
