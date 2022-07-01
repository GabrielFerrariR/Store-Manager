const connection = require('./connection');

const getById = async (id) => {
  const idQuery = 'SELECT * FROM StoreManager.products WHERE id= ?';
  const [result] = await connection.execute(idQuery, [id]);
  return result;
};

const getSaleId = async () => {
  const saleQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [result] = await connection.execute(saleQuery);
  return result.insertId;
};

const add = async (saleId, productId, quantity) => {
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

module.exports = {
  add,
  getSaleId,
  getById,
  getAll,
  getSaleById,
};