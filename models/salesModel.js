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
module.exports = {
  add,
  getSaleId,
  getById,
};