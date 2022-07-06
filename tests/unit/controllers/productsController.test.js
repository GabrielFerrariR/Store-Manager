const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require("../../../services/productsService");
const productsController = require('../../../controllers/productsController');

describe('Controller de produtos', () => {
  const res = {};
  const req = {};
  const next = () => { };

  describe('caso de sucesso', () => {
    const productList = [{}, {}, {}];
    const item = {};
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    })
    afterEach(sinon.restore);

    describe('getAll', () => {
      beforeEach(() => {
        sinon.stub(productsService, "getAll").resolves(productList);
      });
      it("responde com status 200", async () => {
        await productsController.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('responde com um array de objetos', async () => {
        await productsController.getAll(req, res, next);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
    });

    describe("getById", () => {
      beforeEach(() => {
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
        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe('add', async () => {
      beforeEach(() => {
        sinon.stub(productsService, "add").resolves({ id: 1, name: "ProdutoX" })
      });
      afterEach(sinon.restore);
      it("responde com status 201", async () => {
        await productsController.add(req, res, next);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it('o resultado da chamada deve ser um objeto com id e nome', async () => {
        await productsController.add(req, res, next);
        expect(res.json.calledWith({ id: 1, name: "ProdutoX" })).to.be.equal(true);
      })
    });

    describe("update", async () => {
      beforeEach(() => {
        sinon.stub(productsService, "update").resolves({
          id: 1,
          name: "Martelo do Batman",
        });
        req.params = sinon.stub().returns(req);
      });
      afterEach(sinon.restore);
      it("responde com status 200", async () => {
        await productsController.update(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it("deve retornar um objeto com o id do produto alterado e o nome", async () => {
        await productsController.update(req, res, next);
        expect(
          res.json.calledWith({
            id: 1,
            name: "Martelo do Batman",
          })
        ).to.be.deep.equal(true);
      });
      expect(res.json)
    });

    describe("remove", async () => {
      beforeEach(() => {
        sinon.stub(productsService, "remove").resolves();
        req.params = sinon.stub().returns(req);
      });
      afterEach(sinon.restore);
      it("responde com status 204", async () => {
        await productsController.remove(req, res, next);
        expect(res.status.calledWith(204)).to.be.equal(true);
      });
    });

    describe("findByName", async () => {
      beforeEach(() => {
        sinon.stub(productsService, "findByName").resolves([
          {
            id: 1,
            name: "Martelo de Thor",
          },
        ]);
        req.query = sinon.stub().returns(req);
      });
      afterEach(sinon.restore);
      
      it("responde com status 200", async () => {
        await productsController.findByName(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('responde com um array de objetos', async () => {
        await productsController.findByName(req, res, next);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      })
      })
  });
  
  describe('caso de erro', () => {
    const res = {};
    const req = {};
    const next = sinon.spy();
    const error = { statusCode: 400, message: 'teste' };
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    
    });
    afterEach(sinon.restore);
    it('getAll', async () => {
      sinon
        .stub(productsService, "getAll")
        .throws(error);
      await productsController.getAll(req, res, next);

      expect(next.called).to.be.equal(true);
    });
    it('getById', async () => {
      sinon
        .stub(productsService, "getById")
        .throws(error);
      await productsController.getById(req, res, next);

      expect(next.called).to.be.equal(true);
    });
    it("add", async () => {
      sinon.stub(productsService, "add").throws(error);
      await productsController.add(req, res, next);
      expect(next.called).to.be.equal(true);
    });
    it("update", async () => {
      sinon.stub(productsService, "update").throws(error);
      await productsController.update(req, res, next);
      expect(next.called).to.be.equal(true);
    });
    it("remove", async () => {
      sinon.stub(productsService, "remove").throws(error);
      await productsController.remove(req, res, next);
      expect(next.called).to.be.equal(true);
    });
    it("findByName", async () => {
      sinon.stub(productsService, "findByName").throws(error);
      await productsController.findByName(req, res, next);
      expect(next.called).to.be.equal(true);
    });
  })
  })

