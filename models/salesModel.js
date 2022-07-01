const connection = require('./connection');

const getById = async (id) => {
  const idQuery = 'SELECT * FROM StoreManager.products WHERE id= ?';
  const [result] = await connection.execute(idQuery, [id]);
  return result;
};

const addSale = async () => {
  const saleQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [result] = await connection.execute(saleQuery);
  return result.insertId;
};

const addSaleProducts = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES (?,?,?);`;
  await connection.execute(query, [saleId, productId, quantity]);
};

const getAll = async () => {
  const query = `SELECT * FROM sales_products as sp 
    INNER JOIN sales as s
    ON sp.sale_id = s.id;`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSaleById = async (id) => {
  const [products] = await connection.execute(
    `SELECT * FROM sales_products as sp 
    INNER JOIN sales as s
    ON sp.sale_id = s.id 
    WHERE sale_id =?;`, [id],
);
    return products;
};

const remove = async (id) => {
  const query = 'DELETE FROM sales WHERE id=?';
  const [removed] = await connection.execute(query, [id]);
  return removed;
};

const update = async (id, productId, quantity) => {
    const [product] = await connection.execute(
      'UPDATE sales_products SET  quantity = ? WHERE sale_id = ? AND product_id = ?;',
      [quantity, id, productId],
    );
  console.log('produto -------- ', product);
    return product;
};

module.exports = {
  addSaleProducts,
  addSale,
  getById,
  getAll,
  getSaleById,
  remove,
  update,
};