import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserColumnsComponent } from './components/user/user-columns.component';

const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    {
        path: 'user', component: UserColumnsComponent,
        children: [
            { path: ':id', component: UserDetailsComponent },
            { path: 'add', component: UserEditComponent },
            { path: ':id/edit', component: UserEditComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
