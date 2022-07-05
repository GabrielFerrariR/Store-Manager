const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");


describe('productModel', () => {
  const queryResult = [[{
    produto: 'produto',
  }], []];
  const products = [{
    produto: 'produto',
  }];
  const changingQuery = [{}]
  afterEach(sinon.restore);
  describe('getAll',  () => {
    
    it("retorna um array de produtos", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const result = await productsModel.getAll();
      expect(result).to.be.deep.equal(products);
    });
  });
  describe("getById", () => {
    it("retorna um array com um produto", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const result = await productsModel.getById();
      expect(result).to.be.deep.equal(products);
    });
  });
   describe("add", () => {
     it("retorna um array com um produto", async () => {
       sinon.stub(connection, "execute").resolves(products);
       const result = await productsModel.add();
       expect(result).to.be.deep.equal(products);
     });
   });
  describe("update", () => {
    it("retorna um array com um produto", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const result = await productsModel.update();
      expect(result).to.be.deep.equal(products);
    });
  });
  describe('remove', () => {
    it('retorna um objeto', async () => {
      sinon.stub(connection, "execute").resolves(changingQuery);
      const result = await productsModel.remove();
      expect(result).to.be.an('object');
    });
  });
  describe("findByName", () => {
    it("retorna um objeto", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const result = await productsModel.findByName();
      expect(result).to.be.deep.equal(products);
    });
  });
});