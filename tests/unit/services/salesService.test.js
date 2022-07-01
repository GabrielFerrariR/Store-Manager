const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('salesService', () => {
  afterEach(sinon.restore)
  describe('add', () => {
    it('retorna um objeto com o id e items da venda', async () => {
      const product = { productId: 3, quantity: 2 };
      const body = [product, product, product];
      const result = { id: 3, itemsSold: body };
      sinon.stub(salesModel, "getById").resolves(body);
      sinon.stub(salesModel, "addSale").resolves(3);
      const response = await salesService.add(body)
      expect(response).to.be.deep.equal(result);
    })
  });
})