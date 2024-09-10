/// <reference types="cypress" />



describe("Compte", () => {
  let numero_compte1 = null;
  let numero_compte2 = null;

  it("Création d'un compte virement", () => {
    cy.request("POST", "http://localhost:5000/comptes", {
      nom_prenom: "KALAGA Serge",
      date_naissance: "2000-03-23",
      telephone: "51770628",
      type_compte: 1,
      solde: 5000
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.telephone).to.eq("51770628");
      expect(response.body.data.solde).to.eq(5000);

      numero_compte1 = response.body.data.numero_compte
    });
  });

  it("Création d'un compte d'epargne", () => {
    cy.request("POST", "http://localhost:5000/comptes", {
      nom_prenom: "Test Test",
      date_naissance: "2000-03-23",
      telephone: "65854610",
      type_compte: 2,
      solde: 10000
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.telephone).to.eq("65854610");
      expect(response.body.data.solde).to.eq(10000);

      numero_compte2 = response.body.data.numero_compte
    });
  });

  it(`Modification du compte virement`, () => {
    cy.request("PATCH", `http://localhost:5000/comptes/${numero_compte1}`, {
      nom_prenom: "Test Test update",
      telephone: "+22665854610"
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.telephone).to.eq("+22665854610");
      expect(response.body.data.nom_prenom).to.eq("Test Test update");
    });
  });

  it("Suppression du compte virement", () => {
    cy.request("DELETE", `http://localhost:5000/comptes/${numero_compte1}`)
    .then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Suppression du compte d'epargne", () => {
    cy.request("DELETE", `http://localhost:5000/comptes/${numero_compte2}`)
    .then((response) => {
      expect(response.status).to.eq(200);
    });
  });

});