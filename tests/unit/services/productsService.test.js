const { expect } = require("chai");
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('productsService', () => {
  afterEach(sinon.restore);

  describe('getAll', () => {

    it('retorna um array de objetos', async () => {
      const array = [{}, {}, {}];
      sinon.stub(productsModel, 'getAll').resolves(array);
      expect(await productsService.getAll()).to.be.an('array');
    })
  });

  describe("getById", () => {
    afterEach(sinon.restore);

    it("retorna um array de objetos se houver um id", async () => {
      const array = [{
        id: '3',
        product : 'bliu',
      }];
      sinon.stub(productsModel, "getById").resolves(array);
      expect( await productsService.getById()).to.be.an("object");
    });
    it('Lança um erro se não houver um id correspondente', async () => {
      const array = [];
      sinon.stub(productsModel, "getById").resolves(array);
      try {
        await productsService.getById();
      } catch (error) {
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });
})