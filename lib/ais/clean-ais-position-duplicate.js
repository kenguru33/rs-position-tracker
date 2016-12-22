const cleanAisPositionduplicates = function (AisArrayToClean) {
    for (let position in AisArrayToClean) {
    }
    console.log("not implemented");
};

let lastStoredData =  AisPosition.find({}, (error, positions)=>{
    if(error) {
        console.log(error);
        return;
    }
    console.log(positions);
});