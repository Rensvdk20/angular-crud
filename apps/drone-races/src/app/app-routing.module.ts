import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';

import { MatchManagerDetailsComponent } from '@drone-races/features-ui';
import { MatchManagerEditComponent } from '@drone-races/features-ui';
import { MatchManagerOverviewComponent } from '@drone-races/features-ui';

import { UserManagerOverviewComponent } from '@drone-races/features-ui';
import { UserManagerDetailsComponent } from '@drone-races/features-ui';
import { UserManagerEditComponent } from '@drone-races/features-ui';
import { MatchDetailsComponent } from '@drone-races/features-ui';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';

const routes: Routes = [
	//Pages
	{ path: '', component: HomepageComponent, pathMatch: 'full' },
	{ path: 'about', component: AboutComponent, pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, pathMatch: 'full' },
	{ path: 'register', component: RegisterComponent, pathMatch: 'full' },

	//Features
	{ path: 'match/:id', component: MatchDetailsComponent },

	//Admin
	{
		path: 'user-manager',
		component: UserManagerOverviewComponent,
		children: [
			{ path: 'add', component: UserManagerEditComponent },
			{ path: ':id/edit', component: UserManagerEditComponent },
			{ path: ':id', component: UserManagerDetailsComponent },
		],
	},
	{
		path: 'match-manager',
		component: MatchManagerOverviewComponent,
		children: [
			{ path: 'add', component: MatchManagerEditComponent },
			{ path: ':id/edit', component: MatchManagerEditComponent },
			{ path: ':id', component: MatchManagerDetailsComponent },
		],
	},
	//Page not found
	{ path: '**', pathMatch: 'full', component: HomepageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
