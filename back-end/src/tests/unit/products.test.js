const chai = require("chai");
// const { describe } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');
const productsMock = require('../mocks/products.mock');

const { expect } = chai;
chai.use(chaiHttp);

describe("Testes da rota /customer/products", () => {  
  afterEach(()=>{
    sinon.restore();
  });
  
  describe("GET SUCCESS", () => {
    it("get feito com sucesso", async function () {
      const response = await chai.request(app).get('/customer/products').send();
      expect(response.status).to.equal(200);
    });  
    it("retorna um array de objetos com os produtos cadastrados no sistema", async function () {
      const response = await chai.request(app).get('/customer/products').send();
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(productsMock.productsMockArray);
    });    
  });  
});