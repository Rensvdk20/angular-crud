import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@drone-races/features-ui/src/lib/about/about.component';

import { MatchManagerDetailsComponent } from '@drone-races/features-ui/src/lib/match/match-manager-details/match-manager-details.component';
import { MatchManagerEditComponent } from '@drone-races/features-ui/src/lib/match/match-manager-edit/match-manager-edit.component';
import { MatchManagerOverviewComponent } from '@drone-races/features-ui/src/lib/match/match-manager-overview.component';

import { UserColumnsComponent } from '@drone-races/features-ui/src/lib/user/user-overview.component';
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
