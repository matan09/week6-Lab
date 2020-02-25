
var icon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 50],
    iconAnchor: [25,25]
})

let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let time = document.querySelector('#time')


var issMarker //leaflet marker
var update = 10000 // to seconds
//use the same tileLayer call including your access token
let map = L.map('iss_map').setView([0, 0], 1)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 7,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoiYWJkYWxhMjAyMCIsImEiOiJjazZxeWIzNTMwMGVrM2VvM2l1dzlseXM3In0.-fJwIngwndBlID5_SPKsAg'

}).addTo(map)

iss() // initial call to function
setInterval(iss, update)

//Mover the fetching code into a function

function iss() {
    fetch(url)
//using arrow function
    .then( res => res.json() )
    .then( issData => { 
        console.log(issData) 
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat 
        issLong.innerHTML = long

        // draw a map of the world, and use the lat-long from the API CALL TO DRAW A MARKER
        if(!issMarker) {
            issMarker = L.marker([lat, long], {icon: icon}).addTo(map) // create the marrker using an img
        }else {
            issMarker.setLatLng([lat, long]) // already exists - move to a new location
        }

        let date = Date()
        time.innerHTML = date
        
    })
    .catch( err => {
        console.log(err)
    })

}

