const { Post } = require("../models");

// GET /posts/my
exports.getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { UserId: res.locals.decoded.id },
      order: [["createdAt", "DESC"]],
    });
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
