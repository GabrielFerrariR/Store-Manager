function ErrorBody(status, message) {
  this.statusCode = status;
  this.message = message;
}

function validationErrHandler(schema, toValidate) {
  const { error, value } = schema.validate(toValidate);
  const { message, type } = error.details[0];
  if (error) {
    switch (type) {
      case 'any.required':
        throw new ErrorBody(400, message);
      case 'string.min':
        throw new ErrorBody(422, message);
      default:
        throw new ErrorBody(400, "Erro não tratado");
    }
  }
  return value;
}

module.exports = {
  ErrorBody,
  validationErrHandler,
};