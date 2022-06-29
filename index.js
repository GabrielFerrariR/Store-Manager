const app = require('./app');
require('dotenv').config();
const productsRoute = require('./routes/productsRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.use('/products', productsRoute);
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
