module.exports = {
    connect: function (done) {
        require('../config/mongoose')();

        for(var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }

        done();
    },

    disconnect: function (done) {
        mongoose.disconnect();
        done();
    }
};