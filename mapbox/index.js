const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

module.exports.getGeoJSON = async (loc) => {
  const geoData = await geocoder.forwardGeocode({
    query: loc,
    limit: 1
  }).send();
  return geoData.body.features[0].geometry;
};
