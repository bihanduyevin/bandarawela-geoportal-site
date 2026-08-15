// ==========================================
// GEOPORTAL JAVASCRIPT: Leaflet Map & Spatial Layers
// ==========================================

// 1. Initialize Map centered on Bandarawela Town
var map = L.map('map', {
    center: [6.8301, 80.9904],
    zoom: 13,
    zoomControl: true
});

// 2. Base Tile Layers
var darkCanvas = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    maxZoom: 20
}).addTo(map);

var satelliteCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri World Imagery'
});

// 3. Layer Groups
var attractionsGroup = L.layerGroup();
var transportGroup = L.layerGroup();
var landUseZonesGroup = L.layerGroup();
var accessibilityGroup = L.layerGroup(); 

// Hover Tooltips with Photos & Arrows
function createHoverCard(imageSrc, title, desc) {
    return `
        <div class="hover-card-content">
            <img src="${imageSrc}" alt="${title}">
            <h3>${title}</h3>
            <p>${desc}</p>
            <div class="hover-arrow">➔</div>
        </div>
    `;
}

// Attraction 1: Dowa Rock Temple
L.marker([6.8122, 81.0267]).bindTooltip(
    createHoverCard("assets/Rawana.jpg", "Dowa Rock Temple", "Ancient 1st Century BC Buddhist rock-cut temple."), 
    { className: 'custom-hover-tooltip', direction: 'top' }
).addTo(attractionsGroup);

// Attraction 2: Adisham Bungalow
L.marker([6.7725, 80.9500]).bindTooltip(
    createHoverCard("assets/Edhism.jpg", "Adisham Bungalow", "Historic stone monastery and colonial architecture."), 
    { className: 'custom-hover-tooltip', direction: 'top' }
).addTo(attractionsGroup);

// Attraction 3: Bandarawela Hotel
L.marker([6.8290, 80.9880]).bindTooltip(
    createHoverCard("assets/bhotel.jpg", "Bandarawela Hotel", "Iconic colonial-era hotel built in 1893."), 
    { className: 'custom-hover-tooltip', direction: 'top' }
).addTo(attractionsGroup);

// Standard Markers & Polygons
L.marker([6.8327, 80.9859]).bindPopup('<b>Bandarawela Railway Station</b><br>Key connection point on Colombo-Badulla railway line.').addTo(transportGroup);

L.polygon([
    [6.8340, 80.9840], [6.8350, 80.9920], [6.8280, 80.9940], [6.8260, 80.9860]
], { color: '#2ecc91', fillColor: '#2ecc91', fillOpacity: 0.25, weight: 2 })
.bindPopup('<b>Commercial Core Zone</b><br>High-density commercial development.').addTo(landUseZonesGroup);

attractionsGroup.addTo(map);
transportGroup.addTo(map);

// Accessibility Routes
var colomboCoords = [6.9271, 79.8612];
var kandyCoords = [7.2906, 80.6337];
var bandarawelaCoords = [6.8301, 80.9904];

L.polyline([colomboCoords, bandarawelaCoords], { color: '#3498db', weight: 4, className: 'animated-route' })
.bindTooltip('<b>From Colombo</b><br>Distance: ~200 km<br>Travel Time: ~5.5 Hours', { className: 'custom-hover-tooltip', sticky: true }).addTo(accessibilityGroup);
L.marker(colomboCoords).bindTooltip("Colombo", { permanent: true, direction: "top", className: "city-label" }).addTo(accessibilityGroup);

L.polyline([kandyCoords, bandarawelaCoords], { color: '#e74c3c', weight: 4, className: 'animated-route' })
.bindTooltip('<b>From Kandy</b><br>Distance: ~125 km<br>Travel Time: ~3.5 Hours', { className: 'custom-hover-tooltip', sticky: true }).addTo(accessibilityGroup);
L.marker(kandyCoords).bindTooltip("Kandy", { permanent: true, direction: "top", className: "city-label" }).addTo(accessibilityGroup);

map.on('overlayadd', function(e) {
    if (e.name === "<span style='color:#2ecc91;'>Accessibility Routes</span>") {
        map.fitBounds([colomboCoords, kandyCoords, bandarawelaCoords], { padding: [50, 50] });
    }
});

// Layer Controls Setup
var baseMaps = {
    "Dark Canvas (Default)": darkCanvas,
    "Satellite Imagery": satelliteCanvas
};

var overlayMaps = {
    "<span style='color:#2ecc91;'>Tourist Attractions</span>": attractionsGroup,
    "<span style='color:#2ecc91;'>Transport Nodes</span>": transportGroup,
    "<span style='color:#2ecc91;'>Land Use Zones</span>": landUseZonesGroup,
    "<span style='color:#2ecc91;'>Accessibility Routes</span>": accessibilityGroup
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Statistics Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 100;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = (target % 1 !== 0) ? (count + inc).toFixed(1) : Math.ceil(count + inc);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    setTimeout(updateCount, 500);
});
