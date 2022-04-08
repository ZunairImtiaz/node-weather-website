const request = require('request');

function forecast(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=566deaa5208d070c89f8afea91b63f11&query=${latitude},${longitude}`;
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather app!', undefined);
        } else if (body.error) {
            callback('Enter valid location!', undefined);
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`);
        }
    })
}

module.exports = forecast;