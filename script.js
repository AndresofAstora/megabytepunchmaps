const mapWidth = 2000;
const mapHeight = 1500;

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2,
  zoomControl: false // disable default position
});

// Move zoom to right
L.control.zoom({ position: 'topright' }).addTo(map);

const bounds = [[0, 0], [mapHeight, mapWidth]];
L.imageOverlay('images/my-map.png', bounds).addTo(map);
map.fitBounds(bounds);

// --- Custom Icons ---
const icon1 = L.icon({
  iconUrl: 'images/marker-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const icon2 = L.icon({
  iconUrl: 'images/marker-icon.png', // replace with different icon if desired
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

// --- Marker Groups ---
const layerGroups = {
  type1: L.layerGroup(),
  type2: L.layerGroup()
};

// --- Marker Data ---
const markers = [
  { name: 'A', coords: [500, 400], type: 'type1', icon: icon1 },
  { name: 'B', coords: [800, 1200], type: 'type1', icon: icon1 },
  { name: 'C', coords: [1200, 1500], type: 'type2', icon: icon2 }
];

// Add markers to groups
markers.forEach(m => {
  const marker = L.marker(m.coords, { icon: m.icon })
    .bindPopup(`<b>${m.name}</b>`);

  layerGroups[m.type].addLayer(marker);
});

// Add all groups to map initially
Object.values(layerGroups).forEach(group => group.addTo(map));

// --- Legend Toggle Logic ---
document.getElementById('type1').addEventListener('change', (e) => {
  toggleLayer('type1', e.target.checked);
});

document.getElementById('type2').addEventListener('change', (e) => {
  toggleLayer('type2', e.target.checked);
});

function toggleLayer(type, show) {
  if (show) {
    map.addLayer(layerGroups[type]);
  } else {
    map.removeLayer(layerGroups[type]);
  }
}

// --- Toggle All Button ---
let allVisible = true;

document.getElementById('toggleAll').addEventListener('click', () => {
  allVisible = !allVisible;

  Object.keys(layerGroups).forEach(type => {
    document.getElementById(type).checked = allVisible;
    toggleLayer(type, allVisible);
  });
});
