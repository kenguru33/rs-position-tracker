let importAisData = require("../../lib/ais/fetch-ais-data");
let assert = require("assert");
let AisPosition = require("../../lib/ais/models/ais-position");
let db = require("./helper");
let mongoose = require("mongoose");

before(()=>{
    db.connect();
});

after(()=>{
    db.diconnect();
});

let url  = "http://ais.rs.no/aktive_pos.json";

describe("import ais data", ()=>{
   xit("returns an array of valid ais-position", ()=>{
        return importAisData(url).then(aisData=>{
           assert.ok(aisData.length>0,"No Ais Data imported");
           for (let pos of aisData) {
               return new AisPosition(pos).validate().then(()=>{
                   assert.ok(true);
               });
           }
        }).catch(error=>{
            assert.ok(false,error);
        });
   });

   xit("finds dulicates and removes them from import array", ()=>{


       return AisPosition.find({}).then(aisPositions=>{
           console.log(aisPositions);
       });


   });

});
