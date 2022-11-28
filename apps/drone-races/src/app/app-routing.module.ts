import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from 'apps/drone-races/src/app/pages/about/about.component';

import { MatchManagerDetailsComponent } from '@drone-races/features-ui/src/lib/match/match-manager-details/match-manager-details.component';
import { MatchManagerEditComponent } from '@drone-races/features-ui/src/lib/match/match-manager-edit/match-manager-edit.component';
import { MatchManagerOverviewComponent } from '@drone-races/features-ui/src/lib/match/match-manager-overview.component';

import { UserManagerOverviewComponent } from '@drone-races/features-ui/src/lib/user/user-manager-overview.component';
import { UserManagerDetailsComponent } from '@drone-races/features-ui/src/lib/user/user-manager-details/user-manager-details.component';
import { UserManagerEditComponent } from '@drone-races/features-ui/src/lib/user/user-manager-edit/user-manager-edit.component';

const routes: Routes = [
	{ path: '', component: HomepageComponent, pathMatch: 'full' },
	{ path: 'about', component: AboutComponent, pathMatch: 'full' },
	{
		path: 'user',
		component: UserManagerOverviewComponent,
		children: [
			{ path: 'add', component: UserManagerEditComponent },
			{ path: ':id/edit', component: UserManagerEditComponent },
			{ path: ':id', component: UserManagerDetailsComponent },
		],
	},
	{
		path: 'match',
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
