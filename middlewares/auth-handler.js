//處理登入後驗證邏輯的handler

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  req.flash('error', '尚未登入')
  return res.redirect('/login')
}
