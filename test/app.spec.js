process.env.NODE_ENV = 'test'

const app = require('../src/app')
const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require("../src/server");
const should = chai.should();

chai.use(chaiHttp)

describe('POST /login', () => {
    it('Should attempt to login', () => {
        let testUser = {
            username: "test@gmail.com",
            password: "test123"
        }
       chai.request(server)
        .post('/api/login')
        .send(testUser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/users', () => {
    it('GET /api/users responds with 200', () => {
       chai.request(server)
        .get('/api/users')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

// describe('/login', () => {
//     it('POST /api/login responds with 200 if given valid credentials', () => {
//         return supertest(app)
//             .post('/api/login')
//             .send({
//                 username: "kevin@gmail.com",
//                 password: "test123"
//             })
//             .expect(200)
//     })
//     // it('POST /api/login responds correctly when given invalid credentials', () => {

//     // })
// })

// describe('/signup', () => {
//     it('POST /api/signup responds with 201', () => {
//         return supertest(app)
//             .post('/api/signup')
//             .send({
//                 display_name: "Test",
//                 username: "test@gmail.com",
//                 password: "test123",
//             })
//             .expect(201)
//     })
// })


