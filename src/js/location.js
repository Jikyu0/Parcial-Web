let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    // Check if Geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // Initialize the map centered at the user's location
            map = new Map(document.getElementById("map"), {
                center: userPosition,
                zoom: 12,
                mapId: "DEMO_MAP_ID", // Asegúrate de que este ID sea válido
            });

            // Place a marker at the user's location
            new google.maps.Marker({
                position: userPosition,
                map: map,
                title: "You are here!",
            });

            // Perform nearby search for gyms, parks, and restaurants
            nearbySearch(userPosition);
        }, () => {
            handleLocationError(true);
        });
    } else {
        handleLocationError(false);
    }
}

async function nearbySearch(userPosition) {
    const { Place } = await google.maps.importLibrary("places");
    
    const request = {
        fields: ["name", "geometry.location", "business_status"],
        location: userPosition,
        radius: 10000, // Buscar en un radio de 10,000 metros
        type: ["gym", "park", "restaurant"], // Tipos de lugares a buscar
        maxResults: 10,
        rankBy: google.maps.places.RankBy.PROMINENCE,
    };

    const { places } = await Place.searchNearby(request);

    if (places.length) {
        console.log(places);

        const { LatLngBounds } = await google.maps.importLibrary("core");
        const bounds = new LatLngBounds();

        // Loop through and place markers for each result
        places.forEach((place) => {
            new google.maps.Marker({
                position: place.location,
                map,
                title: place.displayName,
            });

            bounds.extend(place.location);
        });
        
        map.fitBounds(bounds); // Ajusta el mapa para incluir todos los marcadores
    } else {
        console.log("No results found.");
    }
}

function handleLocationError(browserHasGeolocation) {
    const errorMessage = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";
    alert(errorMessage);
}
