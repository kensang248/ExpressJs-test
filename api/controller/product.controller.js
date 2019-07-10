var Product = require("../../models/product.model.js");
module.exports.index = async function(request, response) {
  var products = await Product.find();
  response.json(products);
};

module.exports.create=async function (request,response) {
    var product =await Product.create(request.body);
    response.json(product);
}
