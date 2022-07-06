function ErrorBody(status, message) {
  this.statusCode = status;
  this.message = message;
}

function validationErrHandler(schema, toValidate) {
  const { error, value } = schema.validate(toValidate);
  if (error) {
    console.log('validaçao', error);
    const { message, type } = error.details[0];
    switch (type) {
      case 'any.required':
        throw new ErrorBody(400, message);
      case 'string.min':
        throw new ErrorBody(422, message);
      case 'number.min':
        throw new ErrorBody(422, message);
      default:
        console.log(type);
        throw new ErrorBody(400, message);
    }
  }
  return value;
}

module.exports = {
  ErrorBody,
  validationErrHandler,
};