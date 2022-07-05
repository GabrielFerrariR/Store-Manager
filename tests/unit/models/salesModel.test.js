const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('salesModel', () => {
 
  afterEach(sinon.restore)
  describe('getById', () => {
    const query = [[
      {
        product_id: 1,
        name: 'Product',
      },
    ],[]]
    const product = [
      {
        product_id: 1,
        name: 'Product',
      },
    ];
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(query)
    })
    it('retorna um array de objetos', async () => {
      const response = await salesModel.getById()
      expect(response).to.be.deep.equal(product)
    })
  })
  describe('addSale', () => {
    const queryResult = [{
      insertId: 1,
    }, []]
    it('retorna o id da venda', async () => {
      sinon.stub(connection, 'execute').resolves(queryResult);
      const response = await salesModel.addSale();
      expect(response).to.be.deep.equal(1);
    })
  });
  describe('getAll', () => {
    const queryResult = [[
      {
        sale_id: 1,
        product_id: 2,
        quantity: 10,
        id: 1,
        date: '2022-07-05T21:02:05.000Z'
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 15,
        id: 2,
        date: '2022-07-05T21:02:05.000Z'
      }
    ]]
    it('retorna um array de objetos', async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });
  })
  describe("getSaleById", () => {
    const queryResult = [
      [
        {
          sale_id: 1,
          product_id: 2,
          quantity: 10,
          id: 1,
          date: "2022-07-05T21:02:05.000Z",
        }
      ],
    ];
    it("retorna um array de objetos", async () => {
      sinon.stub(connection, "execute").resolves(queryResult);
      const response = await salesModel.getSaleById();
      expect(response).to.be.an("array");
    });
  });
  describe("remove", () => {
    const changingQuery = [{}];
    it("retorna um objeto", async () => {
      sinon.stub(connection, "execute").resolves(changingQuery);
      const result = await salesModel.remove();
      expect(result).to.be.an("object");
    });
  });
  describe("update", () => {
    const changingQuery = [{}];
    it("retorna um objeto", async () => {
      sinon.stub(connection, "execute").resolves(changingQuery);
      const result = await salesModel.update();
      expect(result).to.be.an('object');
    });
  });
})