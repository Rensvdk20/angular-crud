import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserColumnsComponent } from './user/user-columns.component';
import { AboutComponent } from './about/about.component';

import { NavComponent } from '@drone-races/shared/src/lib/nav/nav.component';
import { FooterComponent } from '@drone-races/shared/src/lib/footer/footer.component';

@NgModule({
	declarations: [
		NavComponent,
		FooterComponent,
		UserListComponent,
		UserDetailsComponent,
		UserColumnsComponent,
		UserEditComponent,
		AboutComponent,
	],
	imports: [CommonModule, NgModule],
})
export class FeaturesUiModule {}
