import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { NavComponent } from '@drone-races/shared/src/lib/nav/nav.component';
import { FooterComponent } from '@drone-races/shared/src/lib/footer/footer.component';

import { AboutComponent } from '@drone-races/features-ui/src/lib/about/about.component';

import { UserColumnsComponent } from '@drone-races/features-ui/src/lib/user/user-overview.component';
import { UserListComponent } from '@drone-races/features-ui/src/lib/user/user-list/user-list.component';
import { UserDetailsComponent } from '@drone-races/features-ui/src/lib/user/user-details/user-details.component';
import { UserEditComponent } from '@drone-races/features-ui/src/lib/user/user-edit/user-edit.component';

import { MatchOverviewComponent } from '@drone-races/features-ui/src/lib/match/match-overview.component';
import { MatchListComponent } from '@drone-races/features-ui/src/lib/match/match-list/match-list.component';
import { MatchDetailsComponent } from '@drone-races/features-ui/src/lib/match/match-details/match-details.component';
import { MatchEditComponent } from '@drone-races/features-ui/src/lib/match/match-edit/match-edit.component';
@NgModule({
	declarations: [
		AppComponent,

		NavComponent,
		FooterComponent,
		AboutComponent,

		UserColumnsComponent,
		UserListComponent,
		UserDetailsComponent,
		UserEditComponent,

		MatchOverviewComponent,
		MatchListComponent,
		MatchDetailsComponent,
		MatchEditComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
