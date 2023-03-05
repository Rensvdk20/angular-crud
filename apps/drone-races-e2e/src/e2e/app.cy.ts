describe('drone-races', () => {
	beforeEach(() => cy.visit('http://localhost:4200/'));

	it('should be able to login', () => {
		//Click the login button
		cy.get('#login').click();

		//Enter credentials
		cy.get('#email').type(`johnd@gmail.com`);
		cy.get('#password').type(`secret{enter}`);

		// Redirecting time (only to let the user read the succesfully logged in message)
		cy.wait(2500);

		//Should be redirected to the home page after the login
		cy.url().should('eq', 'http://localhost:4200/');

		//Logout button should be visible now that the user is logged in
		cy.get('#logout').should('exist');
	});
});
