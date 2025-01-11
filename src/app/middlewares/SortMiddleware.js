module.exports = function sortMiddleware(req, res, next) {
  res.locals._sort = {
    enable: false,
    type: "default",
  };
  if (req.query.hasOwnProperty("_sort")) {
    // C1
    // res.locals._sort.enabled = true
    // res.locals._sort.type = req.query.type
    // res.locals._sort.column = req.query.column

    // C2
    Object.assign(res.locals._sort, {
      enabled: true,
      type: req.query.type || "name",
      column: req.query.column || "asc",
    });
  }
  next();
};
