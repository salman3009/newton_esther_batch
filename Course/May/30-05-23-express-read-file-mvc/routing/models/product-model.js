const fs = require('fs');

module.exports = {
    getListModel:()=>{
        let result = fs.readFileSync(`${__dirname}/data/product.json`);
        return JSON.parse(result);
    },
    postListModel:(body)=>{
        return new Promise((resolve,reject)=>{
            try{
                fs.writeFile(`${__dirname}/data/product.json`,JSON.stringify(body),()=>{
                    resolve('success');
              })
            }
            catch(err){
                reject(err);
            }
           
        })
    }

}