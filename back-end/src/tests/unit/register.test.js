const chai = require("chai");
// const { describe } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');
const RegisterController = require('../../api/controllers/RegisterController');

const registerMock = require("../mocks/register.mock");
const { expect } = chai;

const User = {
  "name": "Teste Teste Teste Teste",
  "email": "teste@teste.com",
  "password": "123456"
}

chai.use(chaiHttp);
describe("Testes da rota /register", () => {
  before(() => {
    sinon.stub(RegisterController, 'Register').resolves(User);
  })
  after(() => {
    sinon.restore();
  });
  describe("POST FAILED", () => {
    it("Usuario já cadastrado", async function () {
      const response = await chai.request(app).post('/register').send(User);
      expect(response.status).to.equal(409);
    });
  });  

  describe("POST FAILED", () => {
    it("cadastro falha quando nao informa um usuario", async function () {
      const response = await chai.request(app).post('/register').send({ ...registerMock.userMock3, name: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(registerMock.registerFailUser);
    });
    it("cadastro falha quando informa um usuario com menos de 12 caracteres", async function () {
      const response = await chai.request(app).post('/register').send({ ...registerMock.userMock3, name: 'abcd' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(registerMock.registerFailUserChar);
    });
    it("cadastro falha quando email nao for valido", async function () {
      const response = await chai.request(app).post('/register').send({ ...registerMock.userMock3, email: 'naoeumemail' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(registerMock.registerFailEmail);
    });
    it("cadastro falha quando nao informa uma password", async function () {
      const response = await chai.request(app).post('/register').send({ ...registerMock.userMock3, password: '' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(registerMock.registerFailPass);
    });
    it("cadastro falha quando informa uma password invalida", async function () {
      const response = await chai.request(app).post('/register').send({ ...registerMock.userMock3, password: '123' });
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal(registerMock.registerFailPassChar);
    });
    // it("cadastro falha quando informa um usuario que ja existe", async function () {
    //   const response = await chai.request(app).post('/register').send(registerMock.userMock);
    //   expect(response.status).to.equal(409);
    //   expect(response.body).to.deep.equal(registerMock.registerFailUserAlrdExist);
    // });
  });  
});