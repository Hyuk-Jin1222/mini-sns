const User = require("../models/user");

exports.followUser = async (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  if (!Number.isInteger(targetId)) {
    return res.status(400).json({ message: "잘못된 사용자 ID입니다." });
  }
  if (targetId === req.user.id) {
    return res
      .status(400)
      .json({ message: "자기 자신은 팔로우할 수 없습니다." });
  }
  const target = await User.findByPk(targetId);
  if (!target) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
  const user = await User.findByPk(req.user.id);
  if (await user.hasFollowing(targetId)) {
    return res.status(409).json({ message: "이미 팔로우한 사용자입니다." });
  }
  await user.addFollowing(targetId);
  res.status(200).json({ message: "팔로우 성공" });
};
