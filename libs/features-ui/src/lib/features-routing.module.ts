// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { MatchDetailsComponent } from '@drone-races/features-ui/src/lib/match/match-details/match-details.component';
// import { MatchEditComponent } from '@drone-races/features-ui/src/lib/match/match-edit/match-edit.component';
// import { MatchOverviewComponent } from '@drone-races/features-ui/src/lib/match/match-overview.component';

// import { UserColumnsComponent } from '@drone-races/features-ui/src/lib/user/user-overview.component';
// import { UserDetailsComponent } from '@drone-races/features-ui/src/lib/user/user-details/user-details.component';
// import { UserEditComponent } from '@drone-races/features-ui/src/lib/user/user-edit/user-edit.component';

// const routes: Routes = [
// 	{
// 		path: 'user',
// 		component: UserColumnsComponent,
// 		children: [
// 			{ path: 'add', component: UserEditComponent },
// 			{ path: ':id/edit', component: UserEditComponent },
// 			{ path: ':id', component: UserDetailsComponent },
// 		],
// 	},
// 	{
// 		path: 'match',
// 		component: MatchOverviewComponent,
// 		children: [
// 			{ path: 'add', component: MatchEditComponent },
// 			{ path: ':id/edit', component: MatchEditComponent },
// 			{ path: ':id', component: MatchDetailsComponent },
// 		],
// 	},
// ];

// @NgModule({
// 	imports: [RouterModule.forRoot(routes)],
// 	exports: [RouterModule],
// })
// export class FeatureRoutingModule {}