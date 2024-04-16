
var mapLeaflet = L.map('mapLeaflet').setView([-34.6037, -58.3816], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19,}).addTo(mapLeaflet);


function agregarUbicacion(coordenadas, nombre) {
var marker = L.marker(coordenadas).addTo(mapLeaflet);
marker.bindPopup("<b>" + nombre + "</b>").openPopup();
}

// Agregar ubicaciones
agregarUbicacion([-34.59845242130508, -58.42017359115016], "Estación Medrano");
agregarUbicacion([-34.6589172508621, -58.467761023827016], "Estación Campus");
agregarUbicacion([-34.617687126912664, -58.445406804407504], "Estación Ferro");
agregarUbicacion([-34.59670786675178, -58.3912542358698], "Estación Ateneo");
agregarUbicacion([-34.545184590496156,-58.44867979038356], "Estación River");