/// <reference types="cypress" />



describe("Transaction", () => {
  let numero_compte = null;
  let solde_compte = null;

  it("Création d'un compte pour la transaction", () => {
    cy.request("POST", "http://localhost:5000/comptes", {
      nom_prenom: "KALAGA Serge",
      date_naissance: "2000-03-23",
      telephone: "51770628",
      type_compte: 1,
      solde: 0
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.telephone).to.eq("51770628");
      expect(response.body.data.solde).to.eq(0);

      numero_compte = response.body.data.numero_compte
      solde_compte = response.body.data.solde
    });
  });

  it("Faire un depot", () => {
    cy.request("POST", "http://localhost:5000/transactions", {
        montant: 150000,
        type: 1,
        description: "Depot de 150000",
        numero_compte: numero_compte
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.montant).to.eq(150000);
      expect(response.body.data.type).to.eq("Crédit");
    });
  });

  it("Faire un retrait", () => {
    cy.request("POST", "http://localhost:5000/transactions", {
        montant: 50000,
        type: 2,
        description: "Retrait de 50000",
        numero_compte: numero_compte
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.montant).to.eq(50000);
      expect(response.body.data.type).to.eq("Débit");
    });
  });


  it("Suppression du compte de transaction", () => {
    cy.request("DELETE", `http://localhost:5000/comptes/${numero_compte}`)
    .then((response) => {
      expect(response.status).to.eq(200);
    });
  });

}
);