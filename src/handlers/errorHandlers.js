exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  res.status(err.status || 500);
  res.json({
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
};
