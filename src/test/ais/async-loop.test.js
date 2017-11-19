let counter = 0;


let myPromise = function(blockName) {
    return new Promise(function (resolve, reject) {
        let id = counter++;
        console.log(`A promise registered: ${id}`);
        setTimeout(function () {
            resolve(`${id}`);
        },Math.floor(Math.random() * 5000) );
    }).then((id)=>{
       console.log(`done id=${id} - ${blockName}`);
    });
};


let doBlockofAsyncStuff=(blockName)=>{
    let operations = [];
    operations.push(myPromise(blockName));
    operations.push(myPromise(blockName));
    operations.push(myPromise(blockName));
    operations.push(myPromise(blockName));
    operations.push(myPromise(blockName));
    operations.push(myPromise(blockName));
    operations.push(myPromise(blockName));

    return Promise.all(operations).then(()=>{
        console.log(`${blockName} - all done.`);
    });
};

doBlockofAsyncStuff('block X400');
doBlockofAsyncStuff('block YS G200');
doBlockofAsyncStuff('block JS-332');
