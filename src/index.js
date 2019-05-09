import {
  map as initMap,
  tileLayer,
  geoJSON,
} from 'leaflet'
import pubs from './pubs';
import restaurants from './restaurants';
import { path } from 'ramda'

const map = initMap('map').setView([46.7785, 6.6412], 13)

const osmCH = tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  bounds: [[45, 5], [48, 11]]
})

osmCH.addTo(map)

const pubLausanne = geoJSON(pubs, {
  onEachFeature:(feature, layer) => layer.bindPopup(feature.properties.name)
})

const restaurantLausanne = geoJSON(restaurants, {
  onEachFeature:(feature, layer) => layer.bindPopup(feature.properties.name)
})

// https://leafletjs.com/examples/custom-icons/
const iconPub = L.icon({
  iconUrl: 'icon-bar.png',

  iconSize:     [38, 95], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
})

pubs.features.map(feature =>{
      const geoType = path(['geometry', 'type'], 'Point')
      if(geoType === 'Point'){
        const {lon, lat} = path(['geometry', 'coordinates'], feature)
        L.marker([lat, lon], {icon: iconPub}).addTo(map)
      }

})

pubLausanne.addTo(map)
//restaurantLausanne.addTo(map)