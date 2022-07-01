const { expect } = require("chai");
const sinon = require("sinon");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

describe("SalesController", () => {
  const res = {};
  const req = {};
  const productList = {
    id: 5,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  };
  const next = () => {};
  afterEach(sinon.restore);
  describe("add", () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "add").resolves(productList);
    });
    it("responde com status 201", async () => {
      await salesController.add(req, res, next);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
    it("responde com um array de objetos", async () => {
      await salesController.add(req, res, next);
      expect(res.json.calledWith(productList)).to.be.equal(true);
    });
  });
});
