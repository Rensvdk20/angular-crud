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

import { UserManagerColumnsComponent } from '@drone-races/features-ui/src/lib/user/user-manager-overview.component';
import { UserManagerListComponent } from '@drone-races/features-ui/src/lib/user/user-manager-list/user-manager-list.component';
import { UserManagerDetailsComponent } from '@drone-races/features-ui/src/lib/user/user-manager-details/user-manager-details.component';
import { UserManagerEditComponent } from '@drone-races/features-ui/src/lib/user/user-manager-edit/user-manager-edit.component';

import { MatchManagerOverviewComponent } from '@drone-races/features-ui/src/lib/match/match-manager-overview.component';
import { MatchManagerListComponent } from '@drone-races/features-ui/src/lib/match/match-manager-list/match-manager-list.component';
import { MatchManagerDetailsComponent } from '@drone-races/features-ui/src/lib/match/match-manager-details/match-manager-details.component';
import { MatchManagerEditComponent } from '@drone-races/features-ui/src/lib/match/match-manager-edit/match-manager-edit.component';
@NgModule({
	declarations: [
		AppComponent,

		NavComponent,
		FooterComponent,
		AboutComponent,

		UserManagerColumnsComponent,
		UserManagerListComponent,
		UserManagerDetailsComponent,
		UserManagerEditComponent,

		MatchManagerOverviewComponent,
		MatchManagerListComponent,
		MatchManagerDetailsComponent,
		MatchManagerEditComponent,
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
