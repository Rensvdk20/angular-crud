import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
	AdminGuard,
	LoginFormComponent,
	NavComponent,
	UserGuard,
} from '@drone-races/shared';
import { FooterComponent } from '@drone-races/shared';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { AccountComponent } from './pages/account/account.component';

import {
	MatchCompeteAsRacerComponent,
	MatchListComponent,
	MyTicketsListComponent,
	TicketManagerDetailsComponent,
	TicketManagerEditComponent,
	TicketManagerListComponent,
	TicketManagerOverviewComponent,
	UserEditComponent,
} from '@drone-races/features-ui';
import { MatchDetailsComponent } from '@drone-races/features-ui';

import { MatchManagerOverviewComponent } from '@drone-races/features-ui';
import { MatchManagerListComponent } from '@drone-races/features-ui';
import { MatchManagerDetailsComponent } from '@drone-races/features-ui';
import { MatchManagerEditComponent } from '@drone-races/features-ui';
import { LoginComponent } from './pages/account/login/login.component';

import { MatchReserveTicketsComponent } from '@drone-races/features-ui';

import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './pages/account/register/register.component';
import { RegisterFormComponent } from '@drone-races/shared/src/lib/components/account/register-form/register-form.component';
@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		HomepageComponent,
		AboutComponent,
		MatchListComponent,
		MatchDetailsComponent,
		MatchManagerOverviewComponent,
		MatchManagerListComponent,
		MatchManagerDetailsComponent,
		MatchManagerEditComponent,
		LoginComponent,
		LoginFormComponent,
		RegisterComponent,
		RegisterFormComponent,
		MatchReserveTicketsComponent,
		MatchCompeteAsRacerComponent,
		AccountComponent,
		UserEditComponent,
		MyTicketsListComponent,
		TicketManagerOverviewComponent,
		TicketManagerListComponent,
		TicketManagerDetailsComponent,
		TicketManagerEditComponent,
	],
	providers: [UserGuard, AdminGuard],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
})
export class AppModule {}
