/* ===== SmartCrowd AI – Alerts & Predictions System ===== */

const alertTemplates = [
    { type: 'danger', icon: '🚨', title: 'Overcrowding Detected', desc: 'Gate A entry zone has exceeded 95% capacity. Staff dispatched.', zone: 'Gate A', severity: 'Critical' },
    { type: 'danger', icon: '⚠️', title: 'Emergency Exit Blocked', desc: 'Emergency exit E3 (South Wing) partially obstructed. Clearing in progress.', zone: 'South Wing', severity: 'Critical' },
    { type: 'warning', icon: '🔶', title: 'High Density Warning', desc: 'Section B approaching 85% capacity. Consider redirecting incoming flow.', zone: 'Section B', severity: 'High' },
    { type: 'warning', icon: '🍔', title: 'Food Court Queue Surge', desc: 'North Food Court wait time spiking – 18+ min. Recommend opening overflow counters.', zone: 'North Food Court', severity: 'Medium' },
    { type: 'info', icon: '🔵', title: 'VIP Access Cleared', desc: 'VIP Gate D is now clear for priority entry with zero wait time.', zone: 'Gate D', severity: 'Low' },
    { type: 'info', icon: '🚻', title: 'Washroom Maintenance', desc: 'Washroom Block B temporarily closed for cleaning. Redirecting to Block C.', zone: 'Block B', severity: 'Low' },
    { type: 'success', icon: '✅', title: 'Crowd Flow Normalized', desc: 'East Corridor congestion resolved. Normal flow resumed across all sections.', zone: 'East Corridor', severity: 'Info' },
    { type: 'warning', icon: '🌡️', title: 'Temperature Alert', desc: 'South stands temperature rising. Misting systems activated for attendee comfort.', zone: 'South Stands', severity: 'Medium' },
    { type: 'danger', icon: '🏃', title: 'Stampede Risk Detected', desc: 'AI detects rapid crowd compression at Gate B. Security team alerted.', zone: 'Gate B', severity: 'Critical' },
    { type: 'info', icon: '📢', title: 'Event Intermission', desc: '15-minute intermission starting. Expect surge at food courts and washrooms.', zone: 'All Zones', severity: 'Info' },
];

const predictionTemplates = [
    { icon: '📈', title: 'Peak Crowd Expected', desc: 'AI predicts 92% capacity at Gate A in 30 minutes based on ingress patterns.', confidence: 87, timeframe: '30 min' },
    { icon: '🔄', title: 'Crowd Shift Incoming', desc: 'Post-match rush expected towards South exits. Pre-positioning staff recommended.', confidence: 79, timeframe: '45 min' },
    { icon: '🍔', title: 'Food Rush Predicted', desc: 'Halftime food demand will spike 3x. Kitchen prep advised for next 15 minutes.', confidence: 92, timeframe: '15 min' },
    { icon: '🚶', title: 'Exit Flow Prediction', desc: 'Gradual departure pattern detected. East exit will see highest traffic volume.', confidence: 74, timeframe: '1 hr' },
    { icon: '🧠', title: 'Weather Impact Analysis', desc: 'Rain probability 60% — suggests indoor area congestion may increase by 25%.', confidence: 68, timeframe: '2 hr' },
    { icon: '⏳', title: 'Queue Time Decrease', desc: 'Washroom queues predicted to drop by 40% in next 10 minutes as match resumes.', confidence: 85, timeframe: '10 min' },
    { icon: '🚗', title: 'Parking Lot Surge', desc: 'Parking zones P1-P3 reaching capacity. Shuttle service activation recommended.', confidence: 71, timeframe: '20 min' },
    { icon: '🎪', title: 'Fan Zone Peak', desc: 'Interactive fan zones expected to hit maximum engagement in 25 minutes.', confidence: 66, timeframe: '25 min' },
];

let activeAlerts = [];
let activePredictions = [];
let predictionChart = null;

function initAlerts() {
    generateAlerts();
    generatePredictions();
    renderAlerts();
    renderPredictions();
    initPredictionChart();

    // Periodically refresh alerts & predictions
    setInterval(() => {
        generateAlerts();
        renderAlerts();
    }, 8000);

    setInterval(() => {
        generatePredictions();
        renderPredictions();
    }, 12000);

    // Update chart continuously
    setInterval(updatePredictionChart, 5000);
}

function generateAlerts() {
    // Randomly select 3-5 alerts
    const count = 3 + Math.floor(Math.random() * 3);
    const shuffled = [...alertTemplates].sort(() => Math.random() - 0.5);
    activeAlerts = shuffled.slice(0, count).map((a, i) => ({
        ...a,
        id: `alert-${Date.now()}-${i}`,
        time: getRandomTimeAgo(),
    }));
}

function generatePredictions() {
    const count = 3 + Math.floor(Math.random() * 2);
    const shuffled = [...predictionTemplates].sort(() => Math.random() - 0.5);
    activePredictions = shuffled.slice(0, count).map((p, i) => ({
        ...p,
        id: `pred-${Date.now()}-${i}`,
        confidence: Math.max(55, Math.min(98, p.confidence + Math.floor(Math.random() * 15 - 7))),
    }));
}

function getRandomTimeAgo() {
    const mins = Math.floor(Math.random() * 30);
    if (mins === 0) return 'Just now';
    if (mins === 1) return '1 min ago';
    return `${mins} min ago`;
}

function renderAlerts() {
    const container = document.getElementById('active-alerts');
    if (!container) return;

    if (activeAlerts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-white/20">
                <div class="text-3xl mb-2">✅</div>
                <div class="text-sm">No active alerts — all systems normal</div>
            </div>
        `;
        return;
    }

    container.innerHTML = activeAlerts.map((alert, i) => `
        <div class="alert-card ${alert.type} animate-fade-in-up" style="animation-delay:${i * 0.08}s">
            <div class="flex items-start gap-3">
                <div class="text-xl flex-shrink-0 mt-0.5">${alert.icon}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <h4 class="font-semibold text-sm text-white/90 truncate">${alert.title}</h4>
                        <span class="text-[10px] text-white/30 flex-shrink-0">${alert.time}</span>
                    </div>
                    <p class="text-xs text-white/50 leading-relaxed">${alert.desc}</p>
                    <div class="flex items-center gap-3 mt-2">
                        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">📍 ${alert.zone}</span>
                        <span class="text-[10px] px-2 py-0.5 rounded-full ${getSeverityClass(alert.severity)}">${alert.severity}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getSeverityClass(severity) {
    switch (severity) {
        case 'Critical': return 'bg-neon-red/10 text-neon-red';
        case 'High': return 'bg-neon-orange/10 text-neon-orange';
        case 'Medium': return 'bg-yellow-500/10 text-yellow-400';
        case 'Low': return 'bg-accent-400/10 text-accent-400';
        default: return 'bg-neon-green/10 text-neon-green';
    }
}

function renderPredictions() {
    const container = document.getElementById('ai-predictions');
    if (!container) return;

    container.innerHTML = activePredictions.map((pred, i) => `
        <div class="prediction-card animate-fade-in-up" style="animation-delay:${i * 0.1}s">
            <div class="flex items-start gap-3">
                <div class="text-xl flex-shrink-0">${pred.icon}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <h4 class="font-semibold text-sm text-white/80">${pred.title}</h4>
                        <span class="text-[10px] text-accent-400 flex-shrink-0">⏱ ${pred.timeframe}</span>
                    </div>
                    <p class="text-xs text-white/45 leading-relaxed">${pred.desc}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-[10px] text-white/30">Confidence:</span>
                        <div class="confidence-bar flex-1">
                            <div class="confidence-fill" style="width:${pred.confidence}%"></div>
                        </div>
                        <span class="text-[10px] font-bold font-orbitron ${pred.confidence >= 80 ? 'text-neon-green' : pred.confidence >= 60 ? 'text-neon-orange' : 'text-neon-red'}">${pred.confidence}%</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ---------- Crowd Flow Prediction Chart ---------- */

let chartData = [];

function initPredictionChart() {
    // Generate initial data points (24 points = 2 hours in 5-min intervals)
    chartData = [];
    for (let i = 0; i < 24; i++) {
        const baseVal = 40 + Math.sin(i / 4) * 20 + Math.random() * 15;
        chartData.push(Math.max(10, Math.min(95, baseVal)));
    }
    drawPredictionChart();
}

function updatePredictionChart() {
    // Shift data and add new point
    chartData.shift();
    const lastVal = chartData[chartData.length - 1];
    const newVal = lastVal + (Math.random() - 0.5) * 15;
    chartData.push(Math.max(10, Math.min(95, newVal)));
    drawPredictionChart();
}

function drawPredictionChart() {
    const canvas = document.getElementById('prediction-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const cssW = canvas.clientWidth || (canvas.parentElement.clientWidth - 32);
    const cssH = 145;
    if (cssW <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';

    const w = cssW;
    const h = cssH;
    const padding = { top: 10, right: 10, bottom: 25, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Y-axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const val = Math.floor(i * 25);
        const y = padding.top + chartH - (val / 100) * chartH;
        ctx.fillText(val + '%', padding.left - 8, y + 3);

        // Grid line
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    // X-axis labels
    ctx.textAlign = 'center';
    const labels = ['Now', '+30m', '+1h', '+1.5h', '+2h'];
    labels.forEach((label, i) => {
        const x = padding.left + (i / (labels.length - 1)) * chartW;
        ctx.fillText(label, x, h - 5);
    });

    // Threshold line (80%)
    const threshY = padding.top + chartH - (80 / 100) * chartH;
    ctx.beginPath();
    ctx.moveTo(padding.left, threshY);
    ctx.lineTo(w - padding.right, threshY);
    ctx.strokeStyle = 'rgba(255, 59, 59, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label for threshold
    ctx.fillStyle = 'rgba(255, 59, 59, 0.5)';
    ctx.font = '9px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('Critical', w - padding.right - 35, threshY - 4);

    // Draw chart area gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    ctx.beginPath();
    chartData.forEach((val, i) => {
        const x = padding.left + (i / (chartData.length - 1)) * chartW;
        const y = padding.top + chartH - (val / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    // Close path for fill
    ctx.lineTo(padding.left + chartW, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    chartData.forEach((val, i) => {
        const x = padding.left + (i / (chartData.length - 1)) * chartW;
        const y = padding.top + chartH - (val / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Glow line
    ctx.beginPath();
    chartData.forEach((val, i) => {
        const x = padding.left + (i / (chartData.length - 1)) * chartW;
        const y = padding.top + chartH - (val / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Draw data points
    chartData.forEach((val, i) => {
        const x = padding.left + (i / (chartData.length - 1)) * chartW;
        const y = padding.top + chartH - (val / 100) * chartH;

        // Highlight every 6th point and last point
        if (i % 6 === 0 || i === chartData.length - 1) {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = val > 80 ? '#ff3b3b' : val > 60 ? '#ff9500' : '#6366f1';
            ctx.fill();

            // Outer glow
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = val > 80 ? 'rgba(255,59,59,0.15)' : val > 60 ? 'rgba(255,149,0,0.15)' : 'rgba(99,102,241,0.15)';
            ctx.fill();
        }
    });

    // Current value label (last point)
    const lastVal = chartData[chartData.length - 1];
    const lastX = padding.left + chartW;
    const lastY = padding.top + chartH - (lastVal / 100) * chartH;
    ctx.fillStyle = lastVal > 80 ? '#ff3b3b' : lastVal > 60 ? '#ff9500' : '#22d3ee';
    ctx.font = 'bold 11px Orbitron';
    ctx.textAlign = 'right';
    ctx.fillText(Math.floor(lastVal) + '%', lastX - 5, lastY - 10);
}
