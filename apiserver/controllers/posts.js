const { Post, Hashtag, User } = require("../models");

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

// GET /posts/hashtag/:title
exports.getPostsByHashtag = async (req, res, next) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title.toLowerCase() },
    });
    if (!hashtag) {
      return res.status(404).json({ message: "검색 결과가 없습니다." });
    }
    const posts = await hashtag.getPosts({
      include: [{ model: User, attributes: ["id", "nick"] }],
      joinTableAttributes: [],
      order: [["createdAt", "DESC"]],
    });
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
