function ErrorHandler(status, message) {
  this.statusCode = status;
  this.message = message;
}

module.exports = {
  ErrorHandler,
};