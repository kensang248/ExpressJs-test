var db = require("../db.js");
var shortid = require('shortid');
var md5 = require('md5');

module.exports.index = function(request, response) {
    let users = db.get("users").value();
    console.log(request.cookies);
    
    response.render("index.pug", {
      userList: users
    });
  };

module.exports.search = function(request, response) {
    let search = request.query.q;
    let users = db.get("users").value();
    let matchUsers = users.filter(function(user) {
      return user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    response.render("index.pug", {
      userList: matchUsers,
      pastTyping: search
    });
  };
module.exports.getCreate =  function(request, response) {
        response.render("user/create.pug");
      };

module.exports.postCreate = function(request, response) {
  request.body.id= shortid.generate();
  request.body.avatar = request.file.path.split('/').slice(1).join('/');

        db.get("users")
          .value()
          .push(request.body);
        db.get("users").write();
        response.redirect("/user");
      };
module.exports.getView = function(request, response) {
        let id = request.params.id;
        let matchUsers = db.get("users").value();
        let user = matchUsers.find(function(element) {
          return element.id == id;
        });
        response.render("user/view.pug", { user: user.name });
      };



