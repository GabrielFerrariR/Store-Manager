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
  describe('add', () => {
    it('retorna um objeto com id e nome caso insira um nome válido', async () => {
      sinon.stub(productsModel, 'add').resolves([{ insertId: 1 }]);
      const result = await productsService.add({ name: 'produtox' });
      expect(result).to.be.deep.equal({
        id: 1,
        name: 'produtox',
      });
    });
    it("retorna um status 400 caso o nome esteja vazio", async () => {
      sinon.stub(productsModel, "add").resolves([{ insertId: 1 }]);
      try {
        const result = await productsService.add({});
        expect(result).to.throw();
      } catch (error) {
        expect(error.statusCode).to.be.equal(400);
      }
    });
    it("retorna uma mensagem de erro caso o nome esteja vazio", async () => {
      sinon.stub(productsModel, "add").resolves([{ insertId: 1 }]);
      try {
        const result = await productsService.add({});
        expect(result).to.throw();
      } catch (error) {
        expect(error).to.haveOwnProperty('message');
      }
    });
  })
  describe("update", () => {
    it("retorna um produto nome caso insira um nome e id válido", async () => {
      sinon.stub(productsModel, "update").resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "getById").resolves([{
        id: 1,
        name: "produtox",
      }]);
      const result = await productsService.update({ name: "produtox" }, 1);
      expect(result).to.be.deep.equal({
        id: 1,
        name: "produtox",
      });
    });
    describe("caso o nome esteja vazio, retorna um erro", async () => {
      beforeEach(() => {
        
        sinon.stub(productsModel, "update").resolves({ affectedRows: 1 });
        sinon.stub(productsModel, "getById").resolves([
          {
            id: 1,
            name: "produtox",
          },
        ]
        );      
      })
      it('com status 400', async() => {
        try {
          const result = await productsService.update({}, 1);
          expect(result).to.throw();
        } catch (error) {
          expect(error.statusCode).to.be.equal(400);
        }
      })
      it('com uma messagem de erro', async () => {
        try {
          const result = await productsService.update({}, 1);
          expect(result).to.throw();
        } catch (error) {
          expect(error).to.haveOwnProperty('message');
        }
      })
    });
    describe("caso nao haja um produto com o id, retorna um erro", async () => {
      beforeEach(() => {
        sinon.stub(productsModel, "update").resolves({ affectedRows: 0 });
        sinon.stub(productsModel, "getById").resolves([
          {
            id: 5,
            name: "produtox",
          },
        ]);
      });
      it("com status 404", async () => {
        try {
          const result = await productsService.update({name: 'produtox'}, 1);
          expect(result).to.throw();
        } catch (error) {
          expect(error.statusCode).to.be.equal(404);
        }
      });
      it("com uma messagem de erro", async () => {
        try {
          const result = await productsService.update({}, 1);
          expect(result).to.throw();
        } catch (error) {
          expect(error).to.haveOwnProperty("message");
        }
      });
    });
  });
  describe('remove', () => {
    it('retorna undefined quando remove um item', async () => {
      sinon.stub(productsModel, "remove").resolves({ affectedRows: 1 });
      const result = await productsService.remove();
      expect(result).to.be.equal(undefined);
    })
    describe('Caso não encontre um produto com o Id, retorna um erro', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'remove').resolves({affectedRows : 0})
      })
      it('com um status 404', async () => {
        try {
          const result = await productsService.remove();
          expect(result).to.throw();
        } catch (error) {
          expect(error.statusCode).to.be.equal(404);
        }
      })
      it("com uma messagem de erro", async () => {
        try {
          const result = await productsService.remove();
          expect(result).to.throw();
        } catch (error) {
          expect(error).to.haveOwnProperty("message");
        }
      });
    })
  })
  describe('findByName', () => {
    it('retorna um array com produtos encontrados com o nome requisitado', async () => {
      sinon.stub(productsModel, 'findByName').resolves([{ id: 1, name: 'martelo do thor' }])
      const result = await productsService.findByName('martelo');
      expect(result).to.be.deep.equal([{ id: 1, name: "martelo do thor" }]);
    });
    describe('caso não encontre nenhum produto com o nome enviado, retorna um erro', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'findByName').resolves([])
      })
      it('com status 404', async () => {
        try {
          await productsService.findByName("invalido");
        } catch (error) {
          expect(error.statusCode).to.be.equal(404);
        }
      });
      it("com uma messagem de erro", async () => {
        try {
          await productsService.findByName("invalido");
        } catch (error) {
          expect(error).to.haveOwnProperty("message");
        }
      });
    });
    it('retorna todos os produtos se não for requisitado um nome', async () => {
      sinon.stub(productsModel, 'getAll').resolves([{}, {}])
      const result = await productsService.findByName();
      expect(result).to.be.deep.equal([{}, {}]);
    })
  })
})