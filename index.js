var express = require("express");
var app = express();
var cookieParser= require('cookie-parser');
var port = 3000;
var userRoute = require("./routes/user.route.js");
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');

var authMiddlewares = require('./middlewares/auth.middleware.js'); 

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser("secret"));

app.set("view engine", "pug");
app.set('views','./views');
app.use('/user',authMiddlewares.requiredAuth,userRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.use(express.static('document'));

app.listen(port, function() {
  console.log(`Example app listening on ${port}`);
});
