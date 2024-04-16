const map = new maplibregl.Map({
    container: 'mapLibre',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [-58.3816,-34.6037], // Longitud, Latitud
    zoom: 12
});

map.on('load', async () => {
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');
    // Add an image to use as a custom marker
    map.addImage('custom-marker', image.data);

    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Estación Medrano</strong><p>Casa de estudios</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-58.42017359115016,-34.59845242130508]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Estación Campus</strong><p>Un lujar lejano</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-58.467761023827016,-34.6589172508621]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Estación Ferro</strong><p>Club de barrio</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-58.445406804407504,-34.617687126912664]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Estación Ateneo</strong><p>Una linda libreria</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-58.3912542358698,-34.59670786675178]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Estación River</strong><p>El mas grande lejos</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-58.44867979038356,-34.545184590496156]
                    }
                },
            ]
        }
    });

    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': 'custom-marker',
            'icon-overlap': 'always'
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});