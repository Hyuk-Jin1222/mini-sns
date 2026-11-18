const User = require("../models/user");

exports.followUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
  await user.addFollowing(parseInt(req.params.id, 10));
  res.status(200).json({ message: "팔로우 성공" });
};
