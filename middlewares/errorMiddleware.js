const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
    // return res.status(400).send(err);
  }
  res.status(500).send({ message: err.message });
};

module.exports = errorMiddleware;
