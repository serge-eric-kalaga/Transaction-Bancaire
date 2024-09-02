/// <reference types="cypress" />
// Test API de la creation, modification, et la suppression d'un utilisateur, et le login

describe("User", () => {
  it("Création d'un utilisateur", () => {
    cy.request("POST", "http://localhost:5000/users/register/", {
      nom_prenom: "KALAGA Serge",
      username: "serge",
      password: "1234567890",
    }).then((response) => {
    //   Creation reussie ou existante
      expect(response.status).to.eq(200);
      expect(response.body.data.username).to.eq("serge");
      expect(response.body.data.nom_prenom).to.eq("KALAGA Serge");
    });
  });

  it("Authentification d'un utilisateur", () => {
    cy.request("POST", "http://localhost:5000/users/login/", {
      username: "serge",
      password: "1234567890",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Modification d'un utilisateur", () => {
    cy.request("PATCH", "http://localhost:5000/users/serge", {
      nom_prenom: "KALAGA Serge Eric",
      username: "serge",
      password: "1234",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

// describe("Authentification", () => {
  
// });
