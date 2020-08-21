const app = require('../src/app')
const { expect } = require('chai')
const supertest = require('supertest')

describe('App', () => {
    it('GET /api/users responds with 200', () => {
        return supertest(app)
            .get('/api/users')
            .expect(200)
    })
})