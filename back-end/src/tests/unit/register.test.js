const chai = require("chai");
// const { describe } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');

const registerMock = require("../mocks/register.mock");
const { expect } = chai;
chai.use(chaiHttp);

describe("Testes da rota /register", () => {

  afterEach(()=>{
    sinon.restore();
  });

  describe("POST SUCCESS", () => {
    it("cadastro feito com sucesso", async function () {
      const response = await chai.request(app).post('/register').send(registerMock.userMock);
      expect(response.status).to.equal(201);
    });
    it("cadastro feito com sucesso retorna um usuario valido", async function () {
      const response = await chai.request(app).post('/register').send(registerMock.userMock2);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('password');
      expect(response.body.email).to.deep.equal(registerMock.userMock2.email);
      expect(response.body.name).to.deep.equal(registerMock.userMock2.name);
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
    it("cadastro falha quando informa um usuario que ja existe", async function () {
      const response = await chai.request(app).post('/register').send(registerMock.userMock);
      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal(registerMock.registerFailUserAlrdExist);
    });
  });  
});