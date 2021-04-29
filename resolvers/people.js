const rp = require("request-promise");

const getPeople = (page = 1) => {
    const options = {
        method: "GET",
        url: `http://swapi.dev/api/people/?page=${page}`,
        headers: {
            "cache-control": "no-cache",
            "content-type": "application/json"
        }
    };
    return new Promise((resolve, revoke) => {
        rp(options).then((body) => {
            const { results } = JSON.parse(body);
            resolve(results);
        }).catch(err => {
            console.log('err:', err);
            revoke(err);
        });
    });
}

module.exports = {
    getPeople
};