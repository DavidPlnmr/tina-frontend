/// <reference types="cypress" />

describe("Connexion page tests", () => {
  beforeEach(() => {
    cy.visit("/components/identification/connexion"); // Remplacez "/connexion" par l'URL de la page de connexion de votre application
  });

  it("Should have the necessary elements", () => {
    cy.get("h2").contains("Tina Coiffure");
    cy.get("input[data-id=username]");
    cy.get("input[data-id=password]");
    cy.get("button[type=submit]").contains("Se connecter");
  });
});
