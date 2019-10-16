/// <reference types="Cypress" />

context("Dictionary List", () => {
    let dictionaryItemList;

    beforeEach(() => {
        cy.visit('https://cristianduta.github.io/dictionary-manager').then(() => {
            cy.get('.MuiContainer-root > .MuiGrid-container > .MuiGrid-item > .MuiGrid-container > .MuiGrid-item')
                .then((itemList) => {
                    dictionaryItemList = itemList;
                });
        });
    });

    it("should display default dictionary list with 4 items and home breadcrumb", () => {
        expect(dictionaryItemList).to.have.length(4);
        cy.get('.MuiBreadcrumbs-li > .MuiTypography-root').should('have.text', 'Dictionary List')
    });

    it("should display dictionary items with, at most, 3 rows each", () => {
        for (const dictionary of dictionaryItemList) {
            cy.get(dictionary).find('table tr').should('have.length.lessThan', 4);
        }
    });

    it("should display validation avatar", () => {
        [0, 1].forEach((index) => {
            cy.get(dictionaryItemList[index])
                .within(() => {
                    cy.get('.MuiAvatar-root')
                        .invoke('attr', 'data-test-id')
                        .should('equal', 'dictionary-success-icon')
                });
        });

        cy.get(dictionaryItemList[2])
            .within(() => {
                cy.get('.MuiAvatar-root')
                    .invoke('attr', 'data-test-id')
                    .should('equal', 'dictionary-warning-icon')
            });

        cy.get(dictionaryItemList[3])
            .within(() => {
                cy.get('.MuiAvatar-root')
                    .invoke('attr', 'data-test-id')
                    .should('equal', 'dictionary-error-icon')
            });
    });

    it("should allow adding a new dictionary and be visible in the dictionary list", () => {
        cy.get('button.MuiFab-primary').click();

        cy.get('.MuiTypography-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
            .should('have.value', 'Dictionary #5');

        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click();

        cy.get('.MuiGrid-container > :nth-child(5)')
            .within(() => {
                cy.get('.MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
                    .should('have.text', 'Dictionary #5');
                cy.get('table tr')
                    .should('have.length', 0);
            });
    });

    it("should allow removing a dictionary from the dictionary list", () => {
        cy.get(dictionaryItemList[0]).should('exist');
        cy.get(dictionaryItemList[0])
            .within(() => {
                cy.get('.MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
                    .should('have.text', 'Dictionary #1');
                cy.get('button[aria-label="Remove Dictionary"]').click();
            });
        cy.get(dictionaryItemList[0]).should('not.exist');
    });
});
