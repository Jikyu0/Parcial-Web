let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    // Verifica si la geolocalización está soportada
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // Inicializa el mapa centrado en la ubicación del usuario
            map = new Map(document.getElementById("map"), {
                center: userPosition,
                zoom: 12,
                mapId: "DEMO_MAP_ID", // Asegúrate de que este ID sea válido
            });

            // Coloca un marcador en la ubicación del usuario
            new google.maps.Marker({
                position: userPosition,
                map: map,
                title: "¡Estás aquí!",
            });

            // Realiza una búsqueda cercana para gimnasios, parques y restaurantes
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

        // Recorre y coloca marcadores para cada resultado
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
        console.log("No se encontraron resultados.");
    }
}

function handleLocationError(browserHasGeolocation) {
    const errorMessage = browserHasGeolocation
        ? "Error: El servicio de geolocalización falló."
        : "Error: Tu navegador no soporta geolocalización.";
    alert(errorMessage);
}
