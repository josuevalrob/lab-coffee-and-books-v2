function initMap() {
  const mapContainer = document.getElementById("map")
  if (!mapContainer) return;
  
  const form = document.getElementById("places-form")
  const id = form.getAttribute('data-id')  

  const myMap = new MyMap(mapContainer)  
  myMap.init()

  if (form) {
    setFormMapListeners(myMap)
    if(id){
      editUserMap(myMap, id)
    }
  } //else if (document.getElementById("users-list")) {
  //   addUsersToMap(myMap)
  // }
}
function editUserMap(myMap, id) {
  axios.get(`/places/${id}/coordinates`)
    .then(response => {
      myMap.addMarker(
        response.data[1],
        response.data[0]
      )
    })
    .catch(console.log)
}
// function addUsersToMap(myMap) {
//   axios.get('/places/coordinates')
//     .then(response => {
//       response.data.forEach(coordinate => {
//         myMap.addMarker(
//           coordinate.coordinates[1],
//           coordinate.coordinates[0]
//         )
//       })
//     })
//     .catch(console.log)
// }

function setFormMapListeners(myMap) {
  myMap.onClick((event) => {
    const { lat, lng } = event.latLng.toJSON()

    myMap.clearMarkers()
    myMap.addMarker(lat, lng)

    document.getElementById("lat").value = lat.toFixed(3)
    document.getElementById("lng").value = lng.toFixed(3)
  })
}