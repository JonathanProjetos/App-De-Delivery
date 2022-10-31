const chai = require("chai");
// const { describe } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');

const logintService = require('../../api/services/LoginService');
const { loginMockResult,
  loginMock,
  loginFailedEmail,
  loginFailedPass,
  loginFailedUser } = require("../mocks/login.mocks");
const { expect } = chai;
chai.use(chaiHttp);

describe("Testes da rota /login", () => {

  afterEach(()=>{
    sinon.restore();
  });

  describe("POST SUCCESS", () => {
    it("login feito com sucesso", async function () {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
    });
    it("deve retornar um token", async function () {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
    it("deve retornar um role", async function () {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('role');
    });
    it("deve retornar um name", async function () {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('name');
    });
    it("deve retornar objeto com os valores correspondentes ao usuario", async function () {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.equal(200);
      expect(response.body.role).to.deep.equal(loginMockResult.role);
      expect(response.body.name).to.deep.equal(loginMockResult.name);
    });
  });  

  describe("POST FAIL", () => {
    it("falha ao tentar efetuar login sem email", async function () {
      const response = await chai.request(app).post('/login').send({ ...loginMock, email: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(loginFailedEmail);
    });
    it("falha ao tentar efetuar login sem password", async function () {
      const response = await chai.request(app).post('/login').send({ ...loginMock, password: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(loginFailedPass);
    });
    it("falha ao tentar efetuar login com usuario nao cadastrado", async function () {
      const response = await chai.request(app).post('/login').send({ ...loginMock, email: 'naoexisto@null.com' });
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal(loginFailedUser);
    });
  });  
});