const formData = document.getElementById('main');
const search = document.getElementById('location');
const msg_1 = document.getElementById('msg-1');
const msg_2 = document.getElementById('msg-2');

formData.addEventListener('submit', (e) => {
    e.preventDefault();
    msg_1.textContent = 'Loading.......';
    fetch(`http://localhost:4000/weather?address=${search.value}`).then((response)=> response.json().then((data)=> {
        if (data.error) {
            msg_1.textContent = data.error;
            msg_2.textContent = '';
        } else {
            msg_1.textContent = data.location;
            msg_2.textContent = data.forecast;
        }
    }));
})

// const address = 'malakwal';
// // const location = [73.207196882, 32.553759464];
// const geoCode_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoienVuYWlyenVubmkiLCJhIjoiY2wxa2F2MWdrMWVkNzNocGJyeTVlNm96eSJ9.5d4B6njoGKlgLmNO_xSNOA&limit=1`;

// const forecast_URL = `http://api.weatherstack.com/current?access_key=566deaa5208d070c89f8afea91b63f11&query=${location[1]}${location[0]}`;

// fetch(geoCode_URL)
//     .then((response) => {
//         if (response.ok) {
//             return response.json()
//         } else {
//             console.log('error in geoCode');
//         }
//     })
//     .then((data) => data.features[0].center)
//     .then((location)=> {
//         console.log(location);
//         fetch(`http://api.weatherstack.com/current?access_key=566deaa5208d070c89f8afea91b63f11&query=${location[1]}${location[0]}`)
//         .then((response) => {
//             console.log(response);
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 console.log('error in forecast');
//             }  
//         })
//         .then((data)=> {
//             console.log(data); 
//             console.log( { desc: data.current.weather_descriptions[0] ,temperature : data.current.temperature})
//         }).catch((error => console.log('error in forecast catch', error)))
//     })
//     .catch((error) => console.log('error in geoCode catch',error))











            // http://api.weatherstack.com/current?access_key=566deaa5208d070c89f8afea91b63f11&query=73.207196882,32.553759464