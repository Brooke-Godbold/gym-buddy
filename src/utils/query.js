const DEFAULT_LIMIT = 0;
const DEFAULT_PAGE = 1;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE;

  return {
    skip: (page - 1) * limit,
    limit,
  };
}

export { getPagination };
