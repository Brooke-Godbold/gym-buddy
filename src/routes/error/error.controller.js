function pathErrorHandler(req, res) {
  res.status(404).json({
    error: `Unknown path ${req.originalUrl} requested for method ${req.method}`,
  });
}

export { pathErrorHandler };
