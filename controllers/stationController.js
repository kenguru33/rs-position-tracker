const station = require('../lib/station');

module.exports = {

    getStation(req, res) {

        station.repository.getStation(req.params.name)
            .then(station => {
                res.send(station);
            })
            .catch(error => {
                res.send(error);
            })
    }
};