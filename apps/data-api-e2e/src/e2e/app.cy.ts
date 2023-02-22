describe('data-api', () => {
	it('should get all matches', () => {
		cy.request(`localhost:3333/data-api/match`).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.be.at.least(1);
		});
	});
});
