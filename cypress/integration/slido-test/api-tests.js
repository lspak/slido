describe('UI Tests', () => {


    it('reuest', () => {
        cy.visit('/')
        cy.request({
          method: 'POST',
          url: 'api/boards',
          body: {
            name: 'Waldo'
          }
        }).then( board => {
          expect(board.status).to.eq(201)
          expect(board.body.starred).to.be.false
          expect(board.body.user).to.eq(0)
          expect
        })
    })

    it('body', () => {
        cy.intercept({
          method: 'GET',
          url: '/api/boards'
        },{
          body: []
        }).as('matcheUrl')
      
        cy.visit('/')
        cy.wait('@matcheUrl')
    })

    it('change body', () => {
        cy.intercept({
          method: 'GET',
          url: '/api/boards'
        }, (req) => {
          resizeBy.body[0].name = "Ahoj"
          return res.body
        })
    })
})
