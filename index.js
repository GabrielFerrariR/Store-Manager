const app = require('./app');
require('dotenv').config();
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.use('/products', productsRoute)
  .use('/sales', salesRoute)
  .use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
