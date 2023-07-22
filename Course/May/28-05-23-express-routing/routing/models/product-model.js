const fs = require('fs');

module.exports = {
    getListModel:()=>{
        let result = fs.readFileSync(`${__dirname}/data/product.json`);
        return JSON.parse(result);
    }
}