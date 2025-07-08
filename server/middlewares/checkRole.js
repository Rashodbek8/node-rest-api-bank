module.exports = function checkRole(requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden: Insufficient rights" });
    }

    next();
  };
};