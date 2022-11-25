import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from '@drone-races/shared/nav/nav.component';
import { FooterComponent } from '@drone-races/shared/footer/footer.component';
import { UserListComponent } from '@drone-races/components/user/user-list/user-list.component';
import { UserDetailsComponent } from '@drone-races/components/user/user-details/user-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserColumnsComponent } from '@drone-races/components/user/user-columns.component';
import { UserEditComponent } from '@drone-races/components/user/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from '@drone-races/components/about/about.component';

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
