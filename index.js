var express = require("express");
var app = express();
var cookieParser= require('cookie-parser');
var port = 3000;
var userRoute = require("./routes/user.route.js");
var authRoute = require('./routes/auth.route.js');
var productRoute = require('./routes/product.route.js');
var cartRoute = require('./routes/cart.route.js');
var transferRoute = require('./routes/transfer.route.js');
var csurf = require('csurf');

var authMiddleware = require('./middlewares/auth.middleware.js'); 
var sessionMiddleware = require('./middlewares/session.middleware.js');

app.use(csurf());
app.use(express.static('public'))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser("secret"));
app.use(csurf({cookie:true}));
app.use(sessionMiddleware);
app.use(express.static('document'));


app.set("view engine", "pug");
app.set('views','./views');
app.use('/user',authMiddleware.requiredAuth,userRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);
app.use('/transfer',authMiddleware.requiredAuth,transferRoute);

app.listen(port, function() {
  console.log(`Example app listening on ${port}`);
});
