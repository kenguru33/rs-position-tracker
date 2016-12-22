const addAisPosition = function (aisPosition) {

    return new Promise((resolve,reject)=>{
        aisPosition.save().then((aisPos)=>{
            resolve(aisPos);
        }).catch(error=>{
            reject(error);
        });
    });
};

module.exports = addAisPosition;
