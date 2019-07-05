var db = require("../db.js");
module.exports.requiredAuth = function(request, response, next) {
  if (!request.cookies.userId) {
    response.redirect("/auth/login");
    return;
  }
  var user = db
  .get("users")
  .find({id:request.cookies.userId})
  .value();
  if (!user) {
    response.redirect("/auth/login");
    return;
  }
  next();
};
