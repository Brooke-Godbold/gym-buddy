export function errorHandler(err, req, res, next) {
  return res.status(500).send(json({ error: err }));
}
