var db = require('../db.js');

module.exports.index = function (request,response) {
    let page = parseInt(request.query.page) || 1;
    let currentPage;
    let perPage = 8;
    let begin = (page-1) *perPage;
    let end =(page-1)*perPage +perPage;
    let products = db.get("products").value().slice(begin,end);
    if(page === 1){
        currentPage =2;
    }else{
        currentPage= page;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    let firstColProducts =[];
    let secondColProducts =[];
    let thirdColProducts =[];
    let fourthColProducts =[];
    for (let index = 0; index < products.length; index++) {
        switch (index % 4) {
            case 0:
                firstColProducts.push(products[index]);
                break;
            case 1:
                secondColProducts.push(products[index]);
                break;
            case 2:
                thirdColProducts.push(products[index]);
                break;
            default:
                fourthColProducts.push(products[index]);
                break;
        }        
    }
    response.render("product/index.pug",{
        page : currentPage,
        firstColProducts:firstColProducts,
        secondColProducts:secondColProducts,
        thirdColProducts:thirdColProducts,
        fourthColProducts:fourthColProducts
    });
};
