const chai = require("chai");
const { describe, before } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');
const { seller } = require("../mocks/Seller");
const { loginMock } = require("../mocks/login.mocks");
const jwtCheckLogin = require('../../api/middleware/Token');
const SellerController = require('../../api/controllers/SellerController');
const { expect } = chai;
chai.use(chaiHttp);

const token = jwtCheckLogin.generateToken(loginMock.email);
describe('Testes da rota /customer/seller', () => {
  describe('Testes do método GET', () => {
    before(() => {
      sinon.stub(SellerController, 'getSellers').resolves(seller);
    })
    after(() => {
      sinon.restore();
    });
    it('Deve retornar um objeto com os detalhes da venda', async () => {
      const response = await chai.request(app).get('/customer/seller').set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('email');
      expect(response.body[0]).to.have.property('role');
    });
  });
});