const axios = require("axios");

const getPeople = (page = 1) => {
    return new Promise((resolve, revoke) => {
        axios.get(`http://swapi.dev/api/people/?page=${page}`).then(({data: {results}}) => {
            console.log('results', results);
            resolve(results);
        }).catch( err => {
            revoke(err);
        })
    });
}

module.exports = {
    getPeople
};