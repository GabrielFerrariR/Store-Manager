const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require("../../../services/productsService");
const productsController = require('../../../controllers/productsController');

describe('Controller de produtos', () => {
  const res = {};
  const req = {};
  const resolve = [{}, {}, {}];
  const next = () => { };
  afterEach(sinon.restore);
  describe('getAll', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(resolve);
      sinon.stub(productsService, "getAll").resolves(resolve);
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
  // describe("getById", () => {
  //   before(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.send = sinon.stub().returns();
  //     req.params = sinon.stub().return(req);
  //     sinon.stub(productsService, "getById").resolves(resolve);
  //   });
  //   after(() => {
  //     sinon.stub().restore;
  //   });
  //   it("responde com status 200", async () => {
  //     await productsController.getAll(req, res, next);
  //     expect(res.status.calledWith(200)).to.be.equal(true);
  //   });
  //   it("responde com um array de objetos", async () => {
  //     await productsController.getAll(req, res, next);
  //     expect(res.send.calledWith(sinon.match.array)).to.be.equal(true);
  //   });
  // });
})