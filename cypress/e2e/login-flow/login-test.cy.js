/// <reference types="cypress" />

describe('Redirect to uprecruit website',()=>{

    it('navigates to uprecruit.com website',()=>{
        cy.visit('http://staging.uprecruit.com/login/');
    })
})

describe('Test login flow',()=>{
    beforeEach(() => {
        cy.visit('http://staging.uprecruit.com/login/');
    })

    it('returns error if email is empty',()=>{
        cy.get('#input-14').should('have.value',''); 
        cy.get('#input-18').type('12345678');
        cy.get('.disabled-primary').click();
        cy.get('.v-messages').contains('E-mail is required'); 
    })

    it('returns error if password is empty',()=>{
        cy.get('#input-14').type('tobias+client@uprecruit.com');
        cy.get('#input-18').should('have.value',''); 
        cy.get('.disabled-primary').click();
        cy.get('.v-messages').contains('Password is required'); 
    })

    it('returns error if both email and password are empty',()=>{
        cy.get('#input-14').should('have.value',''); 
        cy.get('#input-18').should('have.value',''); 
        cy.get('.disabled-primary').click();
        cy.get('.v-messages').contains('E-mail is required'); 
        cy.get('.v-messages').contains('Password is required'); 
    })

    it('returns error if email is not in valid format',()=>{
        cy.get('#input-14').type('tobias+client@uprecruit');
        cy.get('#input-18').type('12345678');
        cy.get('.disabled-primary').click();
        cy.get('.v-messages').contains('E-mail must be valid'); 
    })

    it('returns error if the password is not correct',()=>{
        cy.get('#input-14').type('tobias+client@uprecruit.com');
        cy.get('#input-18').type('123456789');
        cy.get('.disabled-primary').click();
        cy.get('.col-12').contains('Oops, there was a problem signing in to your account. Please try again!'); 
    })

    it('navigates to forgot password page if the password is not correct',()=>{
        cy.get('#input-14').type('tobias+client@uprecruit.com');
        cy.get('#input-18').type('123456789');
        cy.get('.disabled-primary').click();
        cy.get('.col-12').contains('Oops, there was a problem signing in to your account. Please try again!'); 
        cy.get('.forgot-password-block > a').click();
    })

    it('navigates to signup page',()=>{
        cy.get('.login-sign-up > a').click();
    })

    it('logins to portal as client if the credentials are correct',()=>{
        cy.signIn('tobias+candidate@uprecruit.com','12345678') //signin command now can be accessed from any spec
    })

    it('logins to portal as candidate if the credentials are correct',()=>{
        cy.get('#input-14').type('tobias+candidate@uprecruit.com');
        cy.get('#input-18').type('12345678');
        cy.get('.v-btn__content').click();
    })

    it('logins to portal as admin if the credentials are correct',()=>{
        cy.get('#input-14').type('tobias+admin@uprecruit.com');
        cy.get('#input-18').type('12345678');
        cy.get('.v-btn__content').click();
    })

    it('signs out of the portal if the admin is signed in',()=>{
        cy.get('#input-14').type('tobias+admin@uprecruit.com');
        cy.get('#input-18').type('12345678');
        cy.get('.v-btn__content').click();
        cy.get(':nth-child(10) > .v-btn__content > .fa').click();
        cy.get('#list-item-96 > .v-list-item__title').click();
    })

})