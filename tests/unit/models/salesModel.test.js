const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('salesModel', () => {
  // const queryResult = [
  //   [
  //     {
  //       sale_id: 1,
  //       product_id: 1,
  //       quantity: 3,
  //       id:1,
  //       date: "2021-09-09T04:54:54.000Z",
  //     },
  //   ],
  //   [],
  // ];
  const funcReturn = [
    {
      sale_id: 1,
      product_id: 1,
      quantity: 3,
      id: 1,
      date: "2021-09-09T04:54:54.000Z",
    },
  ];
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
  })
})