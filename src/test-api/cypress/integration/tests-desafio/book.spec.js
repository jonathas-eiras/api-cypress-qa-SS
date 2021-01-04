/// <reference types="Cypress"/>

const baseUrl = Cypress.config("baseUrl");
const defaultBook = Cypress.config("defaultBook");

describe("Recover Book", () => {
    beforeEach(() => {
        cy.request(`${baseUrl}/books`).as("getBook")
    });

    it("Validate header", () => {
        cy.get("@getBook")
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });

    it("Validate status", () => {
        cy.get("@getBook")
        .its("status")
        .should("equal", 200);  
    });

    it("Validate book one", () => {
        cy.get("@getBook")
    })

});

describe("Create new Book", () => {
    beforeEach(() => {
        cy.request("POST", `${baseUrl}/books`, defaultBook).as("insertBook")
    });

    it("Validate status", () => {
        cy.get("@insertBook")
        .its("status")
        .should("equal", 200);  
    });

    it("Verify properties", () => {
        cy.get("@insertBook").then((response) => {
            expect(response.body).to.have.property("_id");
            expect(response.body).property("_id").to.be.a("string");
            expect(response.body).to.contain({
                title: defaultBook.title,
                author: defaultBook.author
            });

        })
    });

});

describe("Delete a Book", () => {
    before(() => {
        cy.task("book.deleteAll").then((result) => {
            if(result) {
                cy.task("book.insert").then((result) => {
                    if(result) {
                        cy.task("book.ids").then((result) => {
                            const id = result[1];
                            cy.request("DELETE", `${baseUrl}/books/${id}`).as("deleteBook");
                        });
                    }
                });
            }
        });
    });


    it("Validate status", () => {
        cy.get("@deleteBook")
            .its("status")
            .should("equal", 200);
    });

    

});
