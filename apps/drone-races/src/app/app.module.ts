import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { NavComponent } from '@drone-races/shared/src/lib/nav/nav.component';
import { FooterComponent } from '@drone-races/shared/src/lib/footer/footer.component';

import { UserListComponent } from '@drone-races/features-ui/src/lib/user/user-list/user-list.component';
import { UserDetailsComponent } from '@drone-races/features-ui/src/lib/user/user-details/user-details.component';
import { UserColumnsComponent } from '@drone-races/features-ui/src/lib/user/user-columns.component';
import { UserEditComponent } from '@drone-races/features-ui/src/lib/user/user-edit/user-edit.component';
import { AboutComponent } from '@drone-races/features-ui/src/lib/about/about.component';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		UserListComponent,
		UserDetailsComponent,
		UserColumnsComponent,
		UserEditComponent,
		AboutComponent,
	],
	imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
