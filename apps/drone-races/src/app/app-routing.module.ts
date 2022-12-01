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

const routes: Routes = [
	{ path: '', component: HomepageComponent, pathMatch: 'full' },
	{ path: 'about', component: AboutComponent, pathMatch: 'full' },

	{ path: 'match/:id', component: MatchDetailsComponent },

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
