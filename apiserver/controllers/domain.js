const { randomUUID } = require("crypto");
const Domain = require("../models/domain");

// GET /domain
exports.getDomains = async (req, res, next) => {
  try {
    const domains = await Domain.findAll({ where: { UserId: req.user.id } });
    return res.json(domains);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// POST /domain
exports.createDomain = async (req, res, next) => {
  const { host, type } = req.body;
  try {
    const domain = await Domain.create({
      UserId: req.user.id,
      host,
      type,
      clientSecret: randomUUID(),
    });
    return res.status(201).json(domain);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
