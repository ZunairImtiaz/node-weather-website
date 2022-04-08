const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// end point 
app.get('', (req, res) => res.render('index', {title: 'Weather', name: 'Zunair Imtiaz'}));
app.get('/help', (req, res) => res.render('help', {
    title:'Help here', 
    name:'Zunair Imtiaz', 
    helpText: 'This is some helpful text'
}));
app.get('/about', (req, res) => res.render('about', {title: 'About Me', name: 'Zunair Imtiaz'}));
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address in query string!'})
    }
    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({address: req.query.address, forecast: forecastData, location})});
    });
});
app.get('/help/*', (req, res) => res.render('404', {
    title: '404', 
    name: 'Zunair Imtiaz', 
    message: 'Help artical not found!'
}));
app.get('*', (req, res) => res.render('404', {title: '404', name: 'Zunair Imtiaz', message: 'Page not found!'}));

app.listen(4000, () => console.log('app is listening on port 4000'));