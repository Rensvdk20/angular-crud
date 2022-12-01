import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { NavComponent } from '@drone-races/shared';
import { FooterComponent } from '@drone-races/shared';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';

import { MatchListComponent } from '@drone-races/features-ui';
import { MatchDetailsComponent } from '@drone-races/features-ui';

import { UserManagerOverviewComponent } from '@drone-races/features-ui';
import { UserManagerListComponent } from '@drone-races/features-ui';
import { UserManagerDetailsComponent } from '@drone-races/features-ui';
import { UserManagerEditComponent } from '@drone-races/features-ui';

import { MatchManagerOverviewComponent } from '@drone-races/features-ui';
import { MatchManagerListComponent } from '@drone-races/features-ui';
import { MatchManagerDetailsComponent } from '@drone-races/features-ui';
import { MatchManagerEditComponent } from '@drone-races/features-ui';
@NgModule({
	declarations: [
		AppComponent,

		NavComponent,
		FooterComponent,

		HomepageComponent,
		AboutComponent,

		MatchListComponent,
		MatchDetailsComponent,

		UserManagerOverviewComponent,
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
