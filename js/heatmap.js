/* ===== SmartCrowd AI – Heatmap Visualization ===== */

// Stadium zones configuration
const stadiumZones = {
    'olympic-stadium': {
        name: 'Olympic Stadium',
        capacity: 80000,
        zones: [
            { id: 'gate-a', name: 'Gate A (Main)', x: 0.5, y: 0.05, w: 0.15, h: 0.08, density: 0 },
            { id: 'gate-b', name: 'Gate B (North)', x: 0.15, y: 0.3, w: 0.08, h: 0.12, density: 0 },
            { id: 'gate-c', name: 'Gate C (South)', x: 0.85, y: 0.3, w: 0.08, h: 0.12, density: 0 },
            { id: 'gate-d', name: 'Gate D (VIP)', x: 0.5, y: 0.92, w: 0.12, h: 0.07, density: 0 },
            { id: 'section-a', name: 'Section A (North)', x: 0.3, y: 0.2, w: 0.18, h: 0.15, density: 0 },
            { id: 'section-b', name: 'Section B (East)', x: 0.65, y: 0.2, w: 0.18, h: 0.15, density: 0 },
            { id: 'section-c', name: 'Section C (South)', x: 0.3, y: 0.6, w: 0.18, h: 0.15, density: 0 },
            { id: 'section-d', name: 'Section D (West)', x: 0.65, y: 0.6, w: 0.18, h: 0.15, density: 0 },
            { id: 'field', name: 'Field / Arena', x: 0.38, y: 0.38, w: 0.24, h: 0.24, density: 0 },
            { id: 'food-north', name: 'Food Court (N)', x: 0.15, y: 0.12, w: 0.1, h: 0.08, density: 0 },
            { id: 'food-south', name: 'Food Court (S)', x: 0.78, y: 0.75, w: 0.1, h: 0.08, density: 0 },
            { id: 'washroom-1', name: 'Washroom (NW)', x: 0.08, y: 0.5, w: 0.06, h: 0.06, density: 0 },
            { id: 'washroom-2', name: 'Washroom (SE)', x: 0.88, y: 0.5, w: 0.06, h: 0.06, density: 0 },
            { id: 'vip-lounge', name: 'VIP Lounge', x: 0.45, y: 0.82, w: 0.1, h: 0.06, density: 0 },
            { id: 'concourse', name: 'Main Concourse', x: 0.35, y: 0.48, w: 0.3, h: 0.04, density: 0 },
        ]
    },
    'aquatics-center': {
        name: 'Aquatics Center',
        capacity: 15000,
        zones: [
            { id: 'entrance', name: 'Main Entrance', x: 0.5, y: 0.05, w: 0.2, h: 0.08, density: 0 },
            { id: 'pool-area', name: 'Pool Area', x: 0.35, y: 0.35, w: 0.3, h: 0.3, density: 0 },
            { id: 'stands-left', name: 'Left Stands', x: 0.1, y: 0.25, w: 0.15, h: 0.5, density: 0 },
            { id: 'stands-right', name: 'Right Stands', x: 0.75, y: 0.25, w: 0.15, h: 0.5, density: 0 },
            { id: 'food', name: 'Food Area', x: 0.3, y: 0.8, w: 0.15, h: 0.1, density: 0 },
            { id: 'exit', name: 'Exit', x: 0.5, y: 0.92, w: 0.15, h: 0.07, density: 0 },
        ]
    },
    'athletics-arena': {
        name: 'Athletics Arena',
        capacity: 60000,
        zones: [
            { id: 'gate-main', name: 'Main Gate', x: 0.5, y: 0.03, w: 0.18, h: 0.07, density: 0 },
            { id: 'track', name: 'Track & Field', x: 0.3, y: 0.3, w: 0.4, h: 0.4, density: 0 },
            { id: 'tier-1', name: 'Lower Tier', x: 0.2, y: 0.2, w: 0.6, h: 0.15, density: 0 },
            { id: 'tier-2', name: 'Upper Tier', x: 0.15, y: 0.55, w: 0.7, h: 0.15, density: 0 },
            { id: 'food-area', name: 'Food Zone', x: 0.1, y: 0.8, w: 0.2, h: 0.1, density: 0 },
            { id: 'merch', name: 'Merchandise', x: 0.7, y: 0.8, w: 0.15, h: 0.1, density: 0 },
        ]
    },
    'cycling-velodrome': {
        name: 'Cycling Velodrome',
        capacity: 6000,
        zones: [
            { id: 'entry', name: 'Entry Gate', x: 0.5, y: 0.05, w: 0.15, h: 0.08, density: 0 },
            { id: 'track', name: 'Velodrome Track', x: 0.25, y: 0.3, w: 0.5, h: 0.4, density: 0 },
            { id: 'stands', name: 'Spectator Stands', x: 0.15, y: 0.2, w: 0.7, h: 0.1, density: 0 },
            { id: 'cafe', name: 'Café', x: 0.75, y: 0.8, w: 0.12, h: 0.1, density: 0 },
            { id: 'exit', name: 'Exit', x: 0.5, y: 0.92, w: 0.12, h: 0.07, density: 0 },
        ]
    },
    'tennis-center': {
        name: 'Tennis Center',
        capacity: 10000,
        zones: [
            { id: 'main-entrance', name: 'Main Entrance', x: 0.5, y: 0.05, w: 0.18, h: 0.08, density: 0 },
            { id: 'center-court', name: 'Center Court', x: 0.5, y: 0.35, w: 0.28, h: 0.25, density: 0 },
            { id: 'court-1', name: 'Court 1', x: 0.15, y: 0.3, w: 0.14, h: 0.18, density: 0 },
            { id: 'court-2', name: 'Court 2', x: 0.85, y: 0.3, w: 0.14, h: 0.18, density: 0 },
            { id: 'court-3', name: 'Court 3', x: 0.15, y: 0.58, w: 0.14, h: 0.18, density: 0 },
            { id: 'vip-box', name: 'VIP Box', x: 0.85, y: 0.58, w: 0.12, h: 0.12, density: 0 },
            { id: 'lounge', name: 'Players Lounge', x: 0.5, y: 0.68, w: 0.18, h: 0.1, density: 0 },
            { id: 'food-area', name: 'Food Court', x: 0.3, y: 0.85, w: 0.15, h: 0.1, density: 0 },
            { id: 'merch', name: 'Merchandise', x: 0.7, y: 0.85, w: 0.12, h: 0.1, density: 0 },
            { id: 'exit', name: 'Exit', x: 0.5, y: 0.93, w: 0.12, h: 0.06, density: 0 },
        ]
    },
    'gymnastics-arena': {
        name: 'Gymnastics Arena',
        capacity: 12000,
        zones: [
            { id: 'entrance', name: 'Main Entrance', x: 0.5, y: 0.05, w: 0.2, h: 0.08, density: 0 },
            { id: 'arena-floor', name: 'Arena Floor', x: 0.4, y: 0.35, w: 0.3, h: 0.25, density: 0 },
            { id: 'vault', name: 'Vault Area', x: 0.12, y: 0.3, w: 0.12, h: 0.15, density: 0 },
            { id: 'bars', name: 'Bars Area', x: 0.88, y: 0.3, w: 0.12, h: 0.15, density: 0 },
            { id: 'beam', name: 'Beam Area', x: 0.12, y: 0.55, w: 0.12, h: 0.15, density: 0 },
            { id: 'floor-ex', name: 'Floor Exercise', x: 0.88, y: 0.55, w: 0.12, h: 0.15, density: 0 },
            { id: 'upper-gallery', name: 'Upper Gallery', x: 0.5, y: 0.18, w: 0.55, h: 0.08, density: 0 },
            { id: 'lower-stands', name: 'Lower Stands', x: 0.5, y: 0.68, w: 0.6, h: 0.08, density: 0 },
            { id: 'warmup', name: 'Warm-up Zone', x: 0.2, y: 0.82, w: 0.15, h: 0.1, density: 0 },
            { id: 'food', name: 'Food Station', x: 0.8, y: 0.82, w: 0.12, h: 0.1, density: 0 },
            { id: 'washroom', name: 'Washroom', x: 0.08, y: 0.82, w: 0.06, h: 0.08, density: 0 },
            { id: 'exit', name: 'Exit', x: 0.5, y: 0.93, w: 0.14, h: 0.06, density: 0 },
        ]
    }
};

let heatmapCanvas, heatmapCtx;
let currentVenue = 'olympic-stadium';
let heatmapAnimId;

function initHeatmap() {
    heatmapCanvas = document.getElementById('heatmap-canvas');
    if (!heatmapCanvas) return;
    heatmapCtx = heatmapCanvas.getContext('2d');
    resizeHeatmapCanvas();
    window.addEventListener('resize', resizeHeatmapCanvas);

    // Mouse move for tooltip
    heatmapCanvas.addEventListener('mousemove', handleHeatmapHover);
    heatmapCanvas.addEventListener('mouseleave', () => {
        document.getElementById('heatmap-tooltip').classList.add('hidden');
    });

    updateHeatmapData();
    renderHeatmap();

    // Periodically update data
    setInterval(updateHeatmapData, 3000);
}

function resizeHeatmapCanvas() {
    if (!heatmapCanvas) return;
    const rect = heatmapCanvas.parentElement.getBoundingClientRect();
    heatmapCanvas.width = rect.width * window.devicePixelRatio;
    heatmapCanvas.height = rect.height * window.devicePixelRatio;
    heatmapCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    heatmapCanvas.style.width = rect.width + 'px';
    heatmapCanvas.style.height = rect.height + 'px';
}

function updateHeatmap() {
    const select = document.getElementById('heatmap-venue-select');
    if (select) currentVenue = select.value;
    updateHeatmapData();
}

function updateHeatmapData() {
    const venue = stadiumZones[currentVenue];
    if (!venue) return;

    let totalPeople = 0;
    let peakZone = '';
    let peakDensity = 0;
    let totalDensity = 0;

    venue.zones.forEach(zone => {
        // Simulate changing crowd density
        const baseDensity = Math.random() * 100;
        const timeWave = Math.sin(Date.now() / 10000 + zone.x * 5) * 15;
        zone.density = Math.max(0, Math.min(100, baseDensity + timeWave));

        const people = Math.floor((zone.density / 100) * (venue.capacity / venue.zones.length));
        totalPeople += people;
        totalDensity += zone.density;

        if (zone.density > peakDensity) {
            peakDensity = zone.density;
            peakZone = zone.name;
        }
    });

    const avgDensity = Math.floor(totalDensity / venue.zones.length);
    const safetyScore = Math.max(0, Math.floor(100 - (avgDensity * 0.8)));

    // Update stats
    const el = id => document.getElementById(id);
    if (el('hm-total-people')) el('hm-total-people').textContent = totalPeople.toLocaleString();
    if (el('hm-peak-zone')) el('hm-peak-zone').textContent = peakZone;
    if (el('hm-avg-density')) el('hm-avg-density').textContent = avgDensity + '%';
    if (el('hm-ai-score')) {
        el('hm-ai-score').textContent = safetyScore + '/100';
        el('hm-ai-score').className = `text-sm font-bold ${safetyScore > 70 ? 'text-neon-green' : safetyScore > 40 ? 'text-neon-orange' : 'text-neon-red'}`;
    }
}

function renderHeatmap() {
    if (!heatmapCtx || !heatmapCanvas) {
        heatmapAnimId = requestAnimationFrame(renderHeatmap);
        return;
    }

    const w = heatmapCanvas.width / window.devicePixelRatio;
    const h = heatmapCanvas.height / window.devicePixelRatio;

    heatmapCtx.clearRect(0, 0, w, h);

    // Draw background grid
    drawStadiumGrid(w, h);

    // Draw zones
    const venue = stadiumZones[currentVenue];
    if (venue) {
        venue.zones.forEach(zone => {
            drawZone(zone, w, h);
        });
    }

    // Draw stadium outline
    drawStadiumOutline(w, h);

    heatmapAnimId = requestAnimationFrame(renderHeatmap);
}

function drawStadiumGrid(w, h) {
    heatmapCtx.strokeStyle = 'rgba(255,255,255,0.03)';
    heatmapCtx.lineWidth = 0.5;
    const gridSize = 30;
    for (let x = 0; x < w; x += gridSize) {
        heatmapCtx.beginPath();
        heatmapCtx.moveTo(x, 0);
        heatmapCtx.lineTo(x, h);
        heatmapCtx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
        heatmapCtx.beginPath();
        heatmapCtx.moveTo(0, y);
        heatmapCtx.lineTo(w, y);
        heatmapCtx.stroke();
    }
}

function drawStadiumOutline(w, h) {
    const cx = w / 2, cy = h / 2;
    const rx = w * 0.42, ry = h * 0.42;
    heatmapCtx.beginPath();
    heatmapCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    heatmapCtx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
    heatmapCtx.lineWidth = 2;
    heatmapCtx.stroke();

    // Inner ring
    heatmapCtx.beginPath();
    heatmapCtx.ellipse(cx, cy, rx * 0.6, ry * 0.6, 0, 0, Math.PI * 2);
    heatmapCtx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
    heatmapCtx.lineWidth = 1;
    heatmapCtx.stroke();
}

function getDensityColor(density) {
    if (density < 25) return { r: 57, g: 255, b: 20, a: 0.3 };     // Green
    if (density < 50) return { r: 255, g: 200, b: 0, a: 0.4 };     // Yellow
    if (density < 75) return { r: 255, g: 149, b: 0, a: 0.5 };     // Orange
    return { r: 255, g: 0, b: 110, a: 0.6 };                        // Pink/Red
}

function drawZone(zone, w, h) {
    const x = zone.x * w - (zone.w * w) / 2;
    const y = zone.y * h - (zone.h * h) / 2;
    const zw = zone.w * w;
    const zh = zone.h * h;
    const color = getDensityColor(zone.density);
    const pulse = Math.sin(Date.now() / 1000 + zone.x * 10) * 0.1 + 0.9;

    // Glow effect
    const gradient = heatmapCtx.createRadialGradient(
        x + zw / 2, y + zh / 2, 0,
        x + zw / 2, y + zh / 2, Math.max(zw, zh)
    );
    gradient.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${color.a * pulse})`);
    gradient.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);

    heatmapCtx.fillStyle = gradient;
    heatmapCtx.beginPath();
    heatmapCtx.roundRect(x - zw * 0.3, y - zh * 0.3, zw * 1.6, zh * 1.6, 20);
    heatmapCtx.fill();

    // Zone box
    heatmapCtx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a * 0.5 * pulse})`;
    heatmapCtx.beginPath();
    heatmapCtx.roundRect(x, y, zw, zh, 8);
    heatmapCtx.fill();

    // Zone border
    heatmapCtx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a * 0.8})`;
    heatmapCtx.lineWidth = 1;
    heatmapCtx.stroke();

    // Zone label
    const fontSize = Math.max(8, Math.min(12, zw / 8));
    heatmapCtx.fillStyle = 'rgba(255,255,255,0.8)';
    heatmapCtx.font = `600 ${fontSize}px Inter`;
    heatmapCtx.textAlign = 'center';
    heatmapCtx.textBaseline = 'middle';
    heatmapCtx.fillText(zone.name, x + zw / 2, y + zh / 2 - 4);

    // Density percentage
    heatmapCtx.fillStyle = `rgba(${color.r},${color.g},${color.b},0.9)`;
    heatmapCtx.font = `700 ${fontSize - 1}px Orbitron`;
    heatmapCtx.fillText(Math.floor(zone.density) + '%', x + zw / 2, y + zh / 2 + 10);
}

function handleHeatmapHover(e) {
    const rect = heatmapCanvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;

    const venue = stadiumZones[currentVenue];
    if (!venue) return;

    const tooltip = document.getElementById('heatmap-tooltip');
    let found = false;

    venue.zones.forEach(zone => {
        const zx = zone.x - zone.w / 2;
        const zy = zone.y - zone.h / 2;
        if (mx >= zx && mx <= zx + zone.w && my >= zy && my <= zy + zone.h) {
            found = true;
            document.getElementById('tooltip-zone').textContent = zone.name;
            document.getElementById('tooltip-density').textContent = `Density: ${Math.floor(zone.density)}% | ~${Math.floor(zone.density * 50)} people`;
            tooltip.style.left = e.clientX - rect.left + 15 + 'px';
            tooltip.style.top = e.clientY - rect.top - 10 + 'px';
            tooltip.classList.remove('hidden');
        }
    });

    if (!found) tooltip.classList.add('hidden');
}
