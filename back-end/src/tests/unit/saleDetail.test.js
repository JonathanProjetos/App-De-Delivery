const chai = require("chai");
const { describe, before } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');
const { saleDetailMock, saleDetailMockId } = require("../mocks/saleDetails.mock");
const { loginMock } = require("../mocks/login.mocks");
const jwtCheckLogin = require('../../api/middleware/Token');
const { expect } = chai;
chai.use(chaiHttp);

const updateStatus = {
  status: 'Entregue',
  id: 1,
}
const token = jwtCheckLogin.generateToken(loginMock.email);
describe('Testes da rota /customer/orders/:id', () => {
  describe('Testes do método GET', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Deve retornar um objeto com os detalhes da venda', async () => {
      const response = await chai.request(app).get(`/customer/orders/${saleDetailMock.sellerId}`).set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
    it('Retorna todos os pedidos do usuário /customer/orders', async () => {
      const response = await chai.request(app).get('/customer/orders').set('authorization', token);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });
});