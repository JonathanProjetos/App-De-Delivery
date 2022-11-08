const chai = require("chai");
// const { describe } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');

const orderMock = require("../mocks/order.mock");
const { loginMock } = require("../mocks/login.mocks");
const { expect } = chai;
const jwtCheckLogin = require('../../api/middleware/Token');
chai.use(chaiHttp);

describe("Testes da rota /customer/orders", () => {  
  afterEach(()=>{
    sinon.restore();
  });
  
  describe("GET SUCCESS", () => {
    it("get feito com sucesso quando token for valido", async function () {
      const token = await jwtCheckLogin.generateToken(loginMock.email);
      const response = await chai.request(app)
      .get('/customer/orders')
      .set('authorization', token);
      expect(response.status).to.equal(200);
    });    
  });  
  describe("GET FAILED", () => {
    it("get falha quando token for invalido", async function () {
      const response = await chai.request(app)
      .get('/customer/orders')
      expect(response.status).to.equal(401);
    });    
  });  
});