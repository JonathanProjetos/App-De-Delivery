const chai = require("chai");
// const { describe } = require("mocha");
const chaiHttp  = require('chai-http');
const sinon = require("sinon");
const app = require('../../api/app');

const logintService = require('../../api/services/LoginService');
const orderMock = require("../mocks/order.mocks");
const { expect } = chai;
chai.use(chaiHttp);

describe("Testes da rota /customer/orders", () => {

  afterEach(()=>{
    sinon.restore();
  });

  describe("GET SUCCESS", () => {
    it("get feito com sucesso", async function () {
      
    });
    
  });  
});