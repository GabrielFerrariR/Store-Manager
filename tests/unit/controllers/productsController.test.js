const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require("../../../services/productsService");
const productsController = require('../../../controllers/productsController');

describe('Controller de produtos', () => {
  const res = {};
  const req = {};
  const productList = [{}, {}, {}];
  const item = {};
  const next = () => { };
  afterEach(sinon.restore);
  describe('getAll', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(productsService, "getAll").resolves(productList);
    });
    it("responde com status 200", async () => {
      await productsController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('responde com um array de objetos', async () => {
      await productsController.getAll(req, res, next);
      expect(res.send.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
  describe("getById", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      req.params = sinon.stub().returns(req);
      sinon.stub(productsService, "getById").resolves(item);
    });
    after(() => {
      sinon.stub().restore;
    });
    it("responde com status 200", async () => {
      await productsController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it("responde com um objeto", async () => {
      await productsController.getById(req, res, next);
      expect(res.send.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
})