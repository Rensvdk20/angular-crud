import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from '@drone-races/shared';
import { AuthService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
	loginForm!: FormGroup;
	loginSuccessResult: string = '';
	loginErrorResult: string = '';

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.minLength(5),
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
			]),
		});
	}

	onSubmit(): void {
		const loginData: UserCredentials = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password,
		};

		this.authService
			.login(loginData)
			.subscribe((result: any | undefined) => {
				if (result === 'success') {
					this.loginErrorResult = '';
					this.loginSuccessResult =
						'Login successful - redirecting...';
					setTimeout(() => {
						this.router.navigate(['/']);
					}, 2000);
				}

				if (result.error) {
					this.loginSuccessResult = '';
					this.loginErrorResult =
						'This user/password combination does not exist';
				}
			});
	}
}
