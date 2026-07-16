// Skip map when Mapbox token is missing/placeholder
const hasMapToken =
    typeof mapToken === "string" &&
    (mapToken.startsWith("pk.") || mapToken.startsWith("sk."));

if (!hasMapToken) {
    const el = document.getElementById("map");
    if (el) {
        el.innerHTML =
            '<p class="text-muted p-3 m-0">Map unavailable — set a valid MAP_TOKEN in .env</p>';
    }
} else if (listing && listing.geometry && listing.geometry.coordinates) {
    const map = new mapboxgl.Map({
        accessToken: mapToken,
        container: "map", // container ID
        center: listing.geometry.coordinates, //[long, lat]
        zoom: 9, // starting zoom
    });

    new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h4>${listing.location}</h4> <p>Exact location will be provided after booking</p>`
            )
        )
        .addTo(map);
}