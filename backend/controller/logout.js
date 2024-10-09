const logoutController = async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/login", // Specify the same path used when setting the cookie
    })
    .status(200)
    .json({ message: "Logout successful" });
};

export default logoutController;
