const { expect } = require("chai");
const sinon = require("sinon");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

describe("SalesController", () => {
  describe('em caso de sucesso', () => {
    
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
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(sinon.restore);
    describe("add", () => {
   
      it("responde com status 201", async () => {
        sinon.stub(salesService, "add").resolves(productList);
        await salesController.add(req, res, next);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it("responde com um array de objetos", async () => {
        sinon.stub(salesService, "add").resolves(productList);
        await salesController.add(req, res, next);
        expect(res.json.calledWith(productList)).to.be.equal(true);
      });
      
    });
    describe('getAll', () => {
    const allProducts = [
      {
        saleId: 1,
        date: "2022-07-05T20:23:51.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: "2022-07-05T20:23:51.000Z",
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: "2022-07-05T20:23:51.000Z",
        productId: 3,
        quantity: 15,
      },
    ];
     it("responde com status 200", async () => {
       sinon.stub(salesService, "getAll").resolves(allProducts);
       await salesController.getAll(req, res, next);
       expect(res.status.calledWith(200)).to.be.equal(true);
     });

     it("responde com um array de objetos", async () => {
       sinon.stub(salesService, "getAll").resolves(allProducts);
       await salesController.getAll(req, res, next);
       expect(res.json.calledWith(allProducts)).to.be.equal(true);
     });
    })
    
    describe("getById", () => {
      const productById = [
        {
          date: "2022-07-05T20:23:51.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-07-05T20:23:51.000Z",
          productId: 2,
          quantity: 10,
        },
      ];
      beforeEach(() => {
        sinon.stub(salesService, "getById").resolves(productById);
        req.params = sinon.stub().returns(req)
        
      })
      it("responde com status 200", async () => {
        await salesController.getById(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("responde com um array de objetos", async () => {
        await salesController.getById(req, res, next);
        expect(res.json.calledWith(productById)).to.be.equal(true);
      });
    });
    describe('remove', async () => {
      beforeEach(() => {
        req.params = sinon.stub().returns(req);
        sinon.stub(salesService, 'remove').resolves()
      });
      it('responde com um status 204', async () => {
        await salesController.remove(req, res, next);
        expect(res.status.calledWith(204)).to.be.equals(true);
      });
      it('não deve retornar nada além do status', async () => {
        await salesController.remove(req, res, next);
        expect(res.json.notCalled).to.be.equal(true);
      })
    });
    describe('update', async () => {
      const updatedSale = {
        saleId: "1",
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 3,
            quantity: 50,
          },
        ],
      };
      beforeEach(() => {
        req.params = sinon.stub().returns(req);
        sinon.stub(salesService, 'update').resolves(updatedSale)
      });
      it('responde com um status 200', async () => {
        await salesController.update(req, res, next);
        expect(res.status.calledWith()).to.be.equal(true);
      });
      it('retorna um objeto com o id da compra e os itens atualizados', async () => {
        await salesController.update(req, res, next);
        expect(res.json.calledWith(updatedSale)).to.be.equal(true);
      })
    })
  })

  describe('tratamento de erro',() => {
     const res = {};
     const req = {};
     const next = sinon.spy();
     const error = { statusCode: 400, message: "teste" };
     beforeEach(() => {
       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
     });
     afterEach(sinon.restore);
     it("getAll", async () => {
       sinon.stub(salesService, "getAll").throws(error);
       await salesController.getAll(req, res, next);

       expect(next.called).to.be.equal(true);
     });
     it("getById", async () => {
       sinon.stub(salesService, "getById").throws(error);
       await salesController.getById(req, res, next);

       expect(next.called).to.be.equal(true);
     });
     it("add", async () => {
       sinon.stub(salesService, "add").throws(error);
       await salesController.add(req, res, next);
       expect(next.called).to.be.equal(true);
     });
     it("update", async () => {
       sinon.stub(salesService, "update").throws(error);
       await salesController.update(req, res, next);
       expect(next.called).to.be.equal(true);
     });
     it("remove", async () => {
       sinon.stub(salesService, "remove").throws(error);
       await salesController.remove(req, res, next);
       expect(next.called).to.be.equal(true);
     });
  })
});
