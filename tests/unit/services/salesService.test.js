const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require('../../../models/salesModel');
const { listSaleSerialize, saleIdSerialize } = require("../../../schemas");
const salesService = require('../../../services/salesService');
const productService = require('../../../services/productsService');
const { ErrorBody } = require("../../../helpers");

describe('salesService', () => {
  afterEach(sinon.restore)
  describe('add', () => {
    const product = { productId: 3, quantity: 2 };
    const body = [product, product, product];
    const result = { id: 3, itemsSold: body };
    it('retorna um objeto com o id e items da venda', async () => {
      sinon.stub(salesModel, "getById").resolves(body);
      sinon.stub(salesModel, "addSale").resolves(3);
      const response = await salesService.add(body)
      expect(response).to.be.deep.equal(result);
    });
    it('retorna um erro quando nao encontra um produto com o id', async () => {
      sinon.stub(salesModel, "getById").resolves([]);
      sinon.stub(salesModel, "addSale").resolves(3);
      try {
        const response =await salesService.add(body)
        expect(response).throw()
      } catch (error) {
        expect(error.message).to.be.equal('Product not found')
      }
    })
  });
  describe('getAll', () => {
    it("retorna um array com as vendas", async () => {
      sinon.stub(salesModel, "getAll").resolves([{}, {}]);
      const result = await salesService.getAll();
      expect(result).to.be.deep.equal([{}, {}].map(listSaleSerialize));
    });
  });
  describe('getById', async () => {
    it('retorna um array de objetos do id correspondente', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves([{}, {}]);
      const result = await salesService.getById();
      expect(result).to.be.deep.equal([{}, {}].map(saleIdSerialize));
    });
    describe('retorna um erro quando não encontra um produto com id correspondente', () => {
      beforeEach(() => {
        sinon.stub(salesModel, "getSaleById").resolves([]);
      })
      it('com um status 404', async () => {
        try {
          await salesService.getById();
        } catch (error) {
          expect(error.statusCode).to.be.equal(404);
        }
      });
      it('com uma mensagem especificando o erro', async () => {
        try {
          await salesService.getById();
        } catch (error) {
          expect(error).to.haveOwnProperty('message');
        }
      })
    })
  });
  describe("remove", () => {
    it("retorna undefined quando remove um item", async () => {
      sinon.stub(salesModel, "remove").resolves({ affectedRows: 1 });
      const result = await salesService.remove();
      expect(result).to.be.equal(undefined);
    });
    describe("Caso não encontre um produto com o Id, retorna um erro", () => {
      beforeEach(() => {
        sinon.stub(salesModel, "remove").resolves({ affectedRows: 0 });
      });
      it("com um status 404", async () => {
        try {
          const result = await salesService.remove();
          expect(result).to.throw();
        } catch (error) {
          expect(error.statusCode).to.be.equal(404);
        }
      });
      it("com uma messagem de erro", async () => {
        try {
          const result = await salesService.remove();
          expect(result).to.throw();
        } catch (error) {
          expect(error).to.haveOwnProperty("message");
        }
      });
    });
  });
  describe('update', () => {
    const body = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    it('retorna um objeto com saleId e itemsUpdated quando inserido um id de vendas e de produtos válido', async () => {
      sinon.stub(productService, 'getById').resolves(undefined);
      sinon.stub(salesModel, 'update').resolves({ affectedRows: 1 });
      const result = await salesService.update(body, 1);
      expect(result).to.haveOwnProperty('saleId');
      expect(result).to.haveOwnProperty("itemsUpdated");
    });
    describe('retorna um erro quando', () => {
      describe('é inserido um id de venda inválido',
        () => {
          beforeEach(() => {
            sinon.stub(productService, "getById").resolves(undefined);
            sinon.stub(salesModel, "update").resolves({ affectedRows: 0 });
          })
          it('com um status 404', async () => {
          try {
          const result = await salesService.update(body, 1);
          expect(result).to.throw();
        } catch (error) {
          expect(error.statusCode).to.be.equal(404);
        }
          });
          it('com uma mensagem de erro específica', async () => {
            try {
            const result = await salesService.update(body, 1);
            expect(result).to.throw();
            } catch (error) {
              expect(error.message).to.be.equal('Sale not found');
            }
            })
        });
      describe("é inserido um id de produto inválido", () => {
        beforeEach(() => {
          sinon
            .stub(productService, "getById")
            .throws(new ErrorBody(404, "Product not found"));
          sinon.stub(salesModel, "update").resolves({ affectedRows: 1 })
        })
        it("com um status 400", async () => {
          try {
            await salesService.update(body);
          } catch (error) {
            expect(error.statusCode).to.be.equal(404)
          }
        });
        it("com uma mensagem de erro específica", async () => {
          try {
            await salesService.update(body);
          } catch (error) {
            expect(error.message).to.be.equal('Product not found')
          }
        });
      });
      describe("o id de produto está vazio", () => {
        beforeEach(() => {
          sinon
            .stub(productService, "getById")
            .resolves();
          sinon
            .stub(salesModel, 'update')
            .resolves();
        })
        it("com um status 400", async () => {
           try {
             await salesService.update([
               {
                 quantity: 1,
               },
               {
                 productId: 2,
                 quantity: 5,
               },
             ]);
           } catch (error) {
             expect(error.statusCode).to.be.equal(400);
           }
        });
        it("com uma mensagem de erro 'productId' is required", async () => {
          try {
            await salesService.update([
              {
                quantity: 1,
              },
              {
                productId: 2,
                quantity: 5,
              },
            ]);
          } catch (error) {
            expect(error.message).to.be.equal('"productId" is required');
          }
        });
      });
      describe("quando não é passado a chave quantity de produto", () => {
        beforeEach(() => {
          sinon.stub(productService, "getById").resolves();
          sinon.stub(salesModel, "update").resolves();
        });
        it("com um status 400", async () => {
           try {
             await salesService.update([
               {
                 productId: 1,
               },
               {
                 productId: 2,
                 quantity: 5,
               },
             ]);
           } catch (error) {
             expect(error.statusCode).to.be.equal(400);
           }
        });
        it("com uma mensagem de erro 'quantity' is required", async () => {
          try {
            await salesService.update([
              {
                productId: 2,
              },
              {
                productId: 2,
                quantity: 5,
              },
            ]);
          } catch (error) {
            expect(error.message).to.be.equal('"quantity" is required');
          }
        });
      });
    })
  })
});