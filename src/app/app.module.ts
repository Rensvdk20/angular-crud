import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserColumnsComponent } from './components/user/user-columns.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		FooterComponent,
		UserListComponent,
		UserDetailsComponent,
		UserColumnsComponent,
		UserEditComponent,
	],
	imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
