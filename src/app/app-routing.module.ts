import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 3rd library
import { LocalStorageModule } from 'angular-2-local-storage';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

// components
import { LoginComponent } from './main/components/login/login.component';
import { UserAddComponent } from './main/components/user/user-add/user-add.component';
import { UserEditComponent } from './main/components/user/user-edit/user-edit.component';
import { UserListComponent } from './main/components/user/user-list/user-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'users', children: [
        {path: '', component: UserListComponent},
        {path: 'add', component: UserAddComponent},
        {path: ':id/edit', component: UserEditComponent}
    ]},
    { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        LoginComponent,
        UserAddComponent,
        UserEditComponent,
        UserListComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        FormsModule,
        CommonModule,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
        Ng4LoadingSpinnerModule.forRoot(),
    ],
    exports: [
        RouterModule
    ]
})

  export class AppRoutingModule { }
