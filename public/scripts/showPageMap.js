mapboxgl.accessToken = mbxToken;

const loc = campground.geometry.coordinates;

const mapStyles = {
  standard: 'mapbox://styles/mapbox/standard',
  streets: 'mapbox://styles/mapbox/streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v12',
  navigationDay: 'mapbox://styles/mapbox/navigation-day-v1',
  navigationNight: 'mapbox://styles/mapbox/navigation-night-v1',
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: loc,
  zoom: 9,
});

const marker = new mapboxgl.Marker()
  .setLngLat(loc)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
      `<p><strong>${campground.title}</strong><br>${campground.location}</p>`
    )
  )
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());

document.getElementById('styleSelector').addEventListener('change', (evt) => {
  map.setStyle('mapbox://styles/mapbox/' + evt.target.value);
});
