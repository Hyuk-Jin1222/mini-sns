const { Post, Hashtag } = require("../models");

// POST /post/img  (routes/post.js에서 upload.single("img")가 먼저 실행됨)
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "이미지 파일(img)이 없습니다." });
  }
  res.json({ url: `/img/${req.file.filename}` });
};

// POST /post  (routes/post.js에서 upload.none()이 먼저 실행됨)
exports.addPost = async (req, res) => {
  const content = req.body?.content;
  if (!content) {
    return res.status(400).json({ message: "게시글 내용(content)이 없습니다." });
  }
  try {
    const post = await Post.create({
      content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = content.match(/#[^\s#]+/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          }),
        ),
      );
      await post.addHashtags(result.map((v) => v[0]));
    }
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 작성 중 오류가 발생했습니다." });
  }
};
