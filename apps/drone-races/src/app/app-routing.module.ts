import { UserEditComponent } from '@drone-races/components/user/user-edit/user-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from '@drone-races/components/user/user-details/user-details.component';
import { UserColumnsComponent } from '@drone-races/components/user/user-columns.component';
import { AboutComponent } from '@drone-races/components/about/about.component';

const routes: Routes = [
	{ path: 'about', component: AboutComponent, pathMatch: 'full' },
	{
		path: 'user',
		component: UserColumnsComponent,
		children: [
			{ path: 'add', component: UserEditComponent },
			{ path: ':id/edit', component: UserEditComponent },
			{ path: ':id', component: UserDetailsComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
