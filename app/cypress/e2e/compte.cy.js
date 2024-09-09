/// <reference types="cypress" />

describe("Compte", () => {
  it("Création d'un compte", () => {
    cy.request("POST", "http://localhost:5000/users/serge/accounts", {
      nom: "Compte 1",
      type: "checking",
      balance: 1000,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.nom).to.eq("Compte 1");
      expect(response.body.data.type).to.eq("checking");
      expect(response.body.data.balance).to.eq(1000);
    });
  });
});