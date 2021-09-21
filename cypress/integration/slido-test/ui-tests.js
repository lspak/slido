/// <reference types= "cypress" />

const { OutgoingMessage } = require("http");

describe('UI Tests', () => {
    beforeEach(() => {
        cy.viewport(1280, 1080)
        cy.visit('/')
    })

    it.only('Register', () => {     
        cy.request('POST', '/reset');

        cy.get('[data-cy=login-menu]').click()
        cy.contains('Log in to your account').should('exist')

        cy.contains('Sign up here').click()
        cy.contains('Sign up to create a free account').should('exist')

        cy.get('[data-cy="signup-email"]').type('ladislav@gmail.com').should('have.value', 'ladislav@gmail.com')
        cy.get('[data-cy="signup-password"]').type('start').should('have.value', 'start')
        cy.get('[data-cy="welcome-email-checkbox"]').click()
        cy.get('[data-cy="signup"]').click()
        cy.get('[id="loginMessage"]').should('exist')
    })

    it('Login', () => {
        cy.get('[data-cy=login-menu]').click()
        cy.contains('Log in to your account').should('exist')

        cy.get('[data-cy="login-email"]').type('ladislav@gmail.com').should('have.value', 'ladislav@gmail.com')
        cy.get('[data-cy="login-password"]').type('start').should('have.value', 'start')
        cy.get('[data-cy="login"]').click()
        cy.contains('ladislav@gmail.com').should('exist')
    })

    it('Create a Board', () =>{
        cy.get('[data-cy="create-board"]').click()
        cy.get('[data-cy="new-board-input"]').type('WaldoBoard').should('have.value', 'WaldoBoard')
        cy.get('[data-cy="new-board-create"]').click()

        cy.wait('@boardCreate').then( board => {
            expect(board.request.body.name).to.eq('WaldoBoard')
            expect(board.response.statusCode).eq(201)
            
        cy.contains('Add a list...').should('exist')
        })
    })

    it('Add a List', () =>{
        cy.get('[data-cy="board-item"]').click()
        cy.get('[data-cy="add-list"]').click()
        cy.contains('Save').should('exist')
        cy.get('[data-cy="add-list-input"]').type('One').should('have.value', 'One')
        cy.get('[data-cy="save"]').click()
        cy.contains('Add new task').should('exist')
    })

    it('Log Out', () =>{
        cy.get('[data-cy="logged-user"]').click
        cy.contains('Log in').should('exist')
    })
})