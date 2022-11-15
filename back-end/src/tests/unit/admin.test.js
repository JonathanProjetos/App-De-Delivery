const chai = require("chai");
const { describe, before } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');
const { mock } = require("../mocks/admin.mocks");
const AdminController = require('../../api/controllers/AdminController');
const { expect } = chai;
chai.use(chaiHttp);
const UserCreated = {
  "id": 1,
  "name": "Kaio Ruan Oliveira",
  "email": "kaioruann@testeeeeee.com",
  "password": "25d55ad283aa400af464c76d713c07ad",
  "role": "seller"
}

const newUser = {
  "name": "Kaio Ruan Oliveira",
  "email": "kaioruann@testeeeeee.com",
  "password": "12345678",
  "role": "seller"
}
describe('Testes da rota /admin/manage', () => {
  describe('Testes do método GET', () => {
    before(() => {
      sinon.stub(AdminController, 'getAllUsers').resolves(mock);
    })
    after(() => {
      sinon.restore();
    });
    it('Retornando a lista de vendedores', async () => {
      const response = await chai.request(app).get('/admin/manage');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('email');
      expect(response.body[0]).to.have.property('role');
    });
  });
  describe('Testes do método DELETE', () => {
    before(() => {
      sinon.stub(AdminController, 'deleteUser').resolves(mock);
    })
    after(() => {
      sinon.restore();
    });
    it('Deletando um vendedor', async () => {
      const response = await chai.request(app).delete('/admin/manage/1');
      expect(response.status).to.equal(200);
    });
  });
  describe('Testes do método POST', () => {
    before(() => {
      sinon.stub(AdminController, 'createUser').resolves(UserCreated);
    })
    after(() => {
      sinon.restore();
    });
    it('Criando novo vendedor', async () => {
      const response = await chai.request(app).post('/admin/manage').send(newUser);
      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('role');
    });
  });
});

