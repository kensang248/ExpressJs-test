var db = require('../db.js');

module.exports.index = function (request,response) {
    let page = parseInt(request.query.page) || 1;
    
    let currentPage;
    
    let perPage = 8;
    
    let begin = (page-1) *perPage;
    
    let end =(page-1)*perPage +perPage;
    
    let products = db.get("products").value().slice(begin,end);
    
    let sessionId = request.signedCookies.sessionId;
    let totalProduct=0;
    let inCart = db
    .get("sessions")
    .find({ id: sessionId })
    .value().cart;
    
    if(page === 1){
        currentPage =2;
    }else{
        currentPage= page;
    }
    
    for (const item in inCart) {
        totalProduct+= inCart[item.toString()];
      }
    response.render("product/index.pug",{
        products:products,
        page : currentPage,
        totalProduct:totalProduct
    });
};
