const { catchErrors } = require('../handlers/errorHandlers');
const { notFound } = require('../helpers/httpErrors');
const { paginate, DEFAULT_LIMIT } = require('../helpers/pagination');

const db = require('../db');

const fields = [
  'token as id',
  'user as username',
  'gener',
  'google',
  'linkedin',
  'status',
];

const getAll = async (req, res) => {
  const offset = parseInt(req.query.offset || 0);
  const limit = parseInt(req.query.limit || DEFAULT_LIMIT);
  let sort = req.query.sort || 'gener';
  let direction = 'asc';

  if (sort.startsWith('-')) {
    sort = sort.slice(1);
    direction = 'desc';
  }

  const users = await db
    .select(fields)
    .from('users')
    .offset(offset)
    .limit(limit)
    .orderBy(sort, direction);

  return res.json(paginate(users, req));
};

const getById = async (req, res) => {
  // offset - limit -> normal
  // before/after - limit -> cursor

  const user = await db
    .first(fields)
    .from('users')
    .where({ token: req.params.id });

  if (!user) {
    return notFound(res);
  }

  return res.json(user);
};

module.exports = {
  getAll: catchErrors(getAll),
  getById: catchErrors(getById),
};
