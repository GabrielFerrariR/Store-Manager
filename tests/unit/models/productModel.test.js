const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");


describe('productModel', () => {
  const queryResult = [[{
    produto: 'produto',
  }], []];
  const produto = [{
    produto: 'produto',
  }]
  afterEach(sinon.restore);
  describe('getAll',  () => {
    
    it("retorna um array de produtos", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const result = await productsModel.getAll();
      expect(result).to.be.deep.equal(produto);
    });
  });
  describe("getById", () => {
    it("retorna um array com um produto", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const result = await productsModel.getById();
      expect(result).to.be.deep.equal(produto);
    });
  });
});