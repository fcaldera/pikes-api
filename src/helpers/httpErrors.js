module.exports.notFound = function(res, payload) {
  return res.status(404).json({ message: 'Resource not found', ...payload });
};

module.exports.badRequest = function(res, payload) {
  return res.status(400).json({ message: 'Bad request', ...payload });
};
