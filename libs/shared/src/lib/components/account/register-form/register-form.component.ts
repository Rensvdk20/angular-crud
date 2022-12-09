import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
	AuthService,
	UserCredentials,
	UserRegistration,
} from '@drone-races/shared';

@Component({
	selector: 'drone-races-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
	registerForm!: FormGroup;
	loginSuccessResult: string = '';
	loginErrorResult: string = '';

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			firstName: new FormControl(null, [Validators.required]),
			lastName: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [
				Validators.required,
				Validators.minLength(5),
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
			]),
			birthday: new FormControl(null, [Validators.required]),
		});
	}

	onSubmit(): void {
		const registerData: UserRegistration = {
			firstName: this.registerForm.value.firstName,
			lastName: this.registerForm.value.lastName,
			email: this.registerForm.value.email,
			password: this.registerForm.value.password,
			birthday: this.registerForm.value.birthday,
			isAdmin: false,
		};

		this.authService
			.register(registerData)
			.subscribe((result: any | undefined) => {
				if (!result.error) {
					this.loginErrorResult = '';
					this.loginSuccessResult =
						'Registration successful - redirecting...';
					setTimeout(() => {
						this.router.navigate(['/login']);
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
