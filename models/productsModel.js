const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');
  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM products WHERE ID =?;', [id]);
  return products;
};

const add = async (name) => {
  const products = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return products;
};

const update = async (name, id) => {
  const [product] = await connection
    .execute('UPDATE products SET name = ? WHERE id = ?;', [name, id]);
  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};
