import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@drone-races/features-ui/src/lib/about/about.component';
import { UserColumnsComponent } from '@drone-races/features-ui/src/lib/user/user-columns.component';
import { UserDetailsComponent } from '@drone-races/features-ui/src/lib/user/user-details/user-details.component';
import { UserEditComponent } from '@drone-races/features-ui/src/lib/user/user-edit/user-edit.component';

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
