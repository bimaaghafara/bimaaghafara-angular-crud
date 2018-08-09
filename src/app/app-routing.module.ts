import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

// components
import { LoginComponent } from './main/components/login/login.component';
import { UserAddComponent } from './main/components/user/user-add/user-add.component';
import { UserEditComponent } from './main/components/user/user-edit/user-edit.component';
import { UserListComponent } from './main/components/user/user-list/user-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'user', children: [
        {path: '', component: UserListComponent},
        {path: 'add', component: UserAddComponent},
        {path: ':id/edit', component: UserEditComponent}
    ]},
    { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
