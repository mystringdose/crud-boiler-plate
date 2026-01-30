export function parseListQuery(q = {}) {
  const page = Math.max(1, Number(q.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(q.limit ?? 20)));
  const sort = String(q.sort ?? "-createdAt");
  const search = q.search ? String(q.search) : null;

  return { page, limit, sort, skip: (page - 1) * limit, search };
}
