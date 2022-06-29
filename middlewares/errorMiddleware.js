const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  res.status(500).send('deu ruim');
};

module.exports = errorMiddleware;
