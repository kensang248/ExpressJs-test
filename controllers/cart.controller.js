module.exports.addToCart = function(request, response, next) {
  var productId = request.params.productId;
  var sessionId = request.signedCookies.sessionId;
  if (!sessionId) {
    response.redirect("/product");
    return;
  }
  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + productId.toString(), 0)
    .value();
  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId.toString(), count + 1)
    .write();
  response.redirect("/product");
};
