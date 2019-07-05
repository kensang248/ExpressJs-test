var db = require("../db.js");
var md5 = require('md5');

module.exports.login = function(request, response) {
  response.render("auth/login", {
    users: db.get("user").value()
  });
};

module.exports.postLogin = function(request, response) {
  var email = request.body.email;
  var password = request.body.password;
  var user = db
    .get("users")
    .find(function (element) {
        return element.email === email;
    })
    .value();
  if (!user) {
    response.render("auth/login", {
      errors: ["Email doesn't exist"],
        values:request.body
    });
    return;
  }
  if (user.password !== md5(password)) {
    response.render("auth/login", {
        errors: ["Wrong password"],
        values:request.body
      });
      return;
  }
  response.cookie('userId',user.id,{
    signed:true
  });
  response.redirect('/user');
};
