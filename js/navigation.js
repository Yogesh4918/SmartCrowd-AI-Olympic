/* ===== SmartCrowd AI – Smart Navigation System ===== */

let navCanvas, navCtx;
let currentRoute = null;
let navPref = 'fastest';
let navAnimFrame;

// Stadium graph for A* pathfinding
const stadiumGraph = {
    nodes: {
        'gate-a':       { x: 0.50, y: 0.05, label: 'Gate A', icon: '🚪' },
        'gate-b':       { x: 0.08, y: 0.30, label: 'Gate B', icon: '🚪' },
        'gate-c':       { x: 0.92, y: 0.30, label: 'Gate C', icon: '🚪' },
        'gate-d':       { x: 0.50, y: 0.95, label: 'Gate D (VIP)', icon: '⭐' },
        'corridor-n':   { x: 0.35, y: 0.15, label: 'North Corridor', icon: '🏃' },
        'corridor-ne':  { x: 0.65, y: 0.15, label: 'NE Corridor', icon: '🏃' },
        'corridor-nw':  { x: 0.20, y: 0.20, label: 'NW Corridor', icon: '🏃' },
        'corridor-e':   { x: 0.85, y: 0.50, label: 'East Corridor', icon: '🏃' },
        'corridor-w':   { x: 0.15, y: 0.50, label: 'West Corridor', icon: '🏃' },
        'corridor-s':   { x: 0.50, y: 0.82, label: 'South Corridor', icon: '🏃' },
        'concourse':    { x: 0.50, y: 0.45, label: 'Main Concourse', icon: '🏟️' },
        'seat-section': { x: 0.40, y: 0.30, label: 'Section A4', icon: '💺' },
        'food-court':   { x: 0.25, y: 0.65, label: 'Food Court', icon: '🍔' },
        'washroom':     { x: 0.10, y: 0.45, label: 'Washroom', icon: '🚻' },
        'merch-store':  { x: 0.80, y: 0.65, label: 'Merchandise', icon: '🛍️' },
        'first-aid':    { x: 0.75, y: 0.20, label: 'First Aid', icon: '🏥' },
        'exit-nearest': { x: 0.90, y: 0.90, label: 'Nearest Exit', icon: '🚪' },
        'current':      { x: 0.50, y: 0.60, label: 'You are here', icon: '📍' },
    },
    edges: [
        ['gate-a', 'corridor-n', 2],
        ['gate-a', 'corridor-ne', 2.5],
        ['corridor-n', 'corridor-nw', 2],
        ['corridor-n', 'seat-section', 1.5],
        ['corridor-ne', 'first-aid', 1],
        ['corridor-ne', 'corridor-e', 3],
        ['gate-b', 'corridor-nw', 1.5],
        ['corridor-nw', 'corridor-w', 2],
        ['corridor-w', 'washroom', 1],
        ['corridor-w', 'food-court', 2],
        ['gate-c', 'corridor-e', 2],
        ['corridor-e', 'merch-store', 1.5],
        ['corridor-e', 'exit-nearest', 3],
        ['concourse', 'corridor-n', 3],
        ['concourse', 'corridor-w', 3],
        ['concourse', 'corridor-e', 3],
        ['concourse', 'corridor-s', 3],
        ['concourse', 'seat-section', 2],
        ['concourse', 'current', 1.5],
        ['corridor-s', 'gate-d', 1.5],
        ['corridor-s', 'food-court', 2],
        ['corridor-s', 'merch-store', 2.5],
        ['corridor-s', 'exit-nearest', 2],
        ['food-court', 'current', 2],
        ['current', 'corridor-w', 3],
        ['current', 'concourse', 1.5],
        ['current', 'corridor-s', 2.5],
    ]
};

// Crowd weights simulation (changes over time)
let crowdWeights = {};

function initNavigation() {
    navCanvas = document.getElementById('nav-canvas');
    if (!navCanvas) return;
    navCtx = navCanvas.getContext('2d');
    resizeNavCanvas();
    window.addEventListener('resize', resizeNavCanvas);
    updateCrowdWeights();
    renderNavMap();
    setInterval(updateCrowdWeights, 5000);
}

function resizeNavCanvas() {
    if (!navCanvas) return;
    const rect = navCanvas.parentElement.getBoundingClientRect();
    navCanvas.width = rect.width * window.devicePixelRatio;
    navCanvas.height = rect.height * window.devicePixelRatio;
    navCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
    navCanvas.style.width = rect.width + 'px';
    navCanvas.style.height = rect.height + 'px';
}

function updateCrowdWeights() {
    stadiumGraph.edges.forEach(([a, b]) => {
        const key = `${a}-${b}`;
        crowdWeights[key] = 0.5 + Math.random() * 2;
    });
}

// A* Pathfinding
function aStar(start, end) {
    const nodes = stadiumGraph.nodes;
    const edges = stadiumGraph.edges;

    if (!nodes[start] || !nodes[end]) return null;

    const heuristic = (a, b) => {
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        return Math.sqrt(dx * dx + dy * dy) * 10;
    };

    const getNeighbors = (node) => {
        const neighbors = [];
        edges.forEach(([a, b, w]) => {
            const weight = w + (crowdWeights[`${a}-${b}`] || 0);
            if (a === node) neighbors.push({ node: b, cost: weight });
            if (b === node) neighbors.push({ node: a, cost: weight });
        });
        return neighbors;
    };

    const openSet = new Set([start]);
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    Object.keys(nodes).forEach(n => {
        gScore[n] = Infinity;
        fScore[n] = Infinity;
    });
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);

    while (openSet.size > 0) {
        let current = null;
        let lowest = Infinity;
        openSet.forEach(n => {
            if (fScore[n] < lowest) {
                lowest = fScore[n];
                current = n;
            }
        });

        if (current === end) {
            const path = [end];
            let c = end;
            while (cameFrom[c]) {
                c = cameFrom[c];
                path.unshift(c);
            }
            return path;
        }

        openSet.delete(current);
        const neighbors = getNeighbors(current);

        neighbors.forEach(({ node, cost }) => {
            const tg = gScore[current] + cost;
            if (tg < gScore[node]) {
                cameFrom[node] = current;
                gScore[node] = tg;
                fScore[node] = tg + heuristic(node, end);
                openSet.add(node);
            }
        });
    }
    return null;
}

function setNavPref(btn) {
    document.querySelectorAll('.nav-pref-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    navPref = btn.getAttribute('data-pref');
}

function calculateRoute() {
    const from = document.getElementById('nav-from').value;
    const to = document.getElementById('nav-to').value;

    const path = aStar(from, to);
    if (!path) {
        alert('No route found. Please try a different destination.');
        return;
    }

    currentRoute = path;
    const totalTime = Math.floor(path.length * 1.2 + Math.random() * 2);

    // Show result
    const resultEl = document.getElementById('route-result');
    resultEl.classList.remove('hidden');
    document.getElementById('route-time').textContent = `~${totalTime} min`;

    // Build route steps
    const stepsContainer = document.getElementById('route-steps');
    stepsContainer.innerHTML = '';
    path.forEach((nodeId, i) => {
        const node = stadiumGraph.nodes[nodeId];
        const step = document.createElement('div');
        step.className = 'route-step animate-fade-in-up';
        step.style.animationDelay = `${i * 0.1}s`;
        step.innerHTML = `
            <div class="route-step-dot" style="background: ${i === 0 ? '#39ff14' : i === path.length - 1 ? '#ff006e' : '#6366f1'}"></div>
            <div>
                <span class="text-white/80">${node.icon} ${node.label}</span>
                ${i < path.length - 1 ? '<div class="route-step-line"></div>' : ''}
            </div>
        `;
        stepsContainer.appendChild(step);
    });

    // AI tip
    const tips = [
        'AI suggests avoiding Gate B due to high traffic',
        'Food Court is less crowded via West Corridor',
        'VIP entrance has shortest wait time right now',
        'Emergency exit route cleared — 30s faster',
        'Section A4 accessible via elevator at NW corridor',
    ];
    document.getElementById('route-ai-tip').textContent = tips[Math.floor(Math.random() * tips.length)];
}

function renderNavMap() {
    if (!navCtx || !navCanvas) {
        navAnimFrame = requestAnimationFrame(renderNavMap);
        return;
    }

    const w = navCanvas.width / window.devicePixelRatio;
    const h = navCanvas.height / window.devicePixelRatio;
    navCtx.clearRect(0, 0, w, h);

    // Background grid
    navCtx.strokeStyle = 'rgba(255,255,255,0.02)';
    navCtx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 25) {
        navCtx.beginPath(); navCtx.moveTo(x, 0); navCtx.lineTo(x, h); navCtx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
        navCtx.beginPath(); navCtx.moveTo(0, y); navCtx.lineTo(w, y); navCtx.stroke();
    }

    // Stadium outline
    navCtx.beginPath();
    navCtx.ellipse(w / 2, h / 2, w * 0.42, h * 0.42, 0, 0, Math.PI * 2);
    navCtx.strokeStyle = 'rgba(99,102,241,0.12)';
    navCtx.lineWidth = 2;
    navCtx.stroke();

    // Draw edges
    stadiumGraph.edges.forEach(([a, b]) => {
        const na = stadiumGraph.nodes[a];
        const nb = stadiumGraph.nodes[b];
        if (!na || !nb) return;
        const weight = crowdWeights[`${a}-${b}`] || 1;
        const alpha = Math.max(0.05, 0.15 - weight * 0.03);

        navCtx.beginPath();
        navCtx.moveTo(na.x * w, na.y * h);
        navCtx.lineTo(nb.x * w, nb.y * h);
        navCtx.strokeStyle = `rgba(99,102,241,${alpha})`;
        navCtx.lineWidth = 1;
        navCtx.stroke();
    });

    // Draw route if exists
    if (currentRoute && currentRoute.length > 1) {
        const time = Date.now() / 1000;

        // Animated path
        navCtx.beginPath();
        currentRoute.forEach((nodeId, i) => {
            const node = stadiumGraph.nodes[nodeId];
            if (i === 0) navCtx.moveTo(node.x * w, node.y * h);
            else navCtx.lineTo(node.x * w, node.y * h);
        });
        navCtx.strokeStyle = '#22d3ee';
        navCtx.lineWidth = 3;
        navCtx.setLineDash([8, 4]);
        navCtx.lineDashOffset = -time * 20;
        navCtx.stroke();
        navCtx.setLineDash([]);

        // Glow
        navCtx.beginPath();
        currentRoute.forEach((nodeId, i) => {
            const node = stadiumGraph.nodes[nodeId];
            if (i === 0) navCtx.moveTo(node.x * w, node.y * h);
            else navCtx.lineTo(node.x * w, node.y * h);
        });
        navCtx.strokeStyle = 'rgba(34,211,238,0.2)';
        navCtx.lineWidth = 8;
        navCtx.stroke();
    }

    // Draw nodes
    Object.entries(stadiumGraph.nodes).forEach(([id, node]) => {
        const x = node.x * w;
        const y = node.y * h;
        const isOnRoute = currentRoute && currentRoute.includes(id);
        const isStart = currentRoute && currentRoute[0] === id;
        const isEnd = currentRoute && currentRoute[currentRoute.length - 1] === id;

        // Node circle
        const radius = isOnRoute ? 8 : 5;
        const color = isStart ? '#39ff14' : isEnd ? '#ff006e' : isOnRoute ? '#22d3ee' : 'rgba(99,102,241,0.4)';

        if (isOnRoute) {
            navCtx.beginPath();
            navCtx.arc(x, y, radius + 4, 0, Math.PI * 2);
            navCtx.fillStyle = color.replace(')', ',0.15)').replace('rgb', 'rgba').replace('#', '');
            navCtx.fillStyle = `${color}25`;
            navCtx.fill();
        }

        navCtx.beginPath();
        navCtx.arc(x, y, radius, 0, Math.PI * 2);
        navCtx.fillStyle = color;
        navCtx.fill();

        // Label
        if (isOnRoute || node.icon === '🚪' || id === 'current') {
            navCtx.fillStyle = 'rgba(255,255,255,0.7)';
            navCtx.font = '500 9px Inter';
            navCtx.textAlign = 'center';
            navCtx.fillText(node.label, x, y - 14);

            // Icon
            navCtx.font = '12px sans-serif';
            navCtx.fillText(node.icon, x, y + 22);
        }
    });

    navAnimFrame = requestAnimationFrame(renderNavMap);
}
