/* ===== SmartCrowd AI – Live Queue System ===== */

const queueData = [
    { id: 'q1', name: 'Burger Station', type: 'food', icon: '🍔', location: 'North Food Court', capacity: 40, current: 0, waitTime: 0, trend: 'stable' },
    { id: 'q2', name: 'Pizza Corner', type: 'food', icon: '🍕', location: 'South Food Court', capacity: 35, current: 0, waitTime: 0, trend: 'rising' },
    { id: 'q3', name: 'Sushi Bar', type: 'food', icon: '🍣', location: 'East Wing', capacity: 25, current: 0, waitTime: 0, trend: 'stable' },
    { id: 'q4', name: 'Coffee & Drinks', type: 'food', icon: '☕', location: 'Main Concourse', capacity: 50, current: 0, waitTime: 0, trend: 'falling' },
    { id: 'q5', name: 'Ice Cream Parlor', type: 'food', icon: '🍦', location: 'West Wing', capacity: 20, current: 0, waitTime: 0, trend: 'rising' },
    { id: 'q6', name: 'Washroom Block A', type: 'washroom', icon: '🚻', location: 'Near Gate A', capacity: 30, current: 0, waitTime: 0, trend: 'stable' },
    { id: 'q7', name: 'Washroom Block B', type: 'washroom', icon: '🚻', location: 'Near Gate B', capacity: 25, current: 0, waitTime: 0, trend: 'rising' },
    { id: 'q8', name: 'Washroom Block C', type: 'washroom', icon: '🚻', location: 'South Wing', capacity: 20, current: 0, waitTime: 0, trend: 'falling' },
    { id: 'q9', name: 'Ticket Counter', type: 'ticket', icon: '🎫', location: 'Main Entrance', capacity: 15, current: 0, waitTime: 0, trend: 'stable' },
    { id: 'q10', name: 'Info Desk', type: 'ticket', icon: '📋', location: 'Central Hall', capacity: 10, current: 0, waitTime: 0, trend: 'falling' },
    { id: 'q11', name: 'Olympic Merch Store', type: 'merch', icon: '🛍️', location: 'East Entrance', capacity: 45, current: 0, waitTime: 0, trend: 'rising' },
    { id: 'q12', name: 'Souvenir Shop', type: 'merch', icon: '🎁', location: 'West Wing', capacity: 30, current: 0, waitTime: 0, trend: 'stable' },
];

let activeFilter = 'all';

function initQueues() {
    updateQueueData();
    renderQueues();
    setInterval(() => {
        updateQueueData();
        renderQueues();
    }, 4000);
}

function updateQueueData() {
    queueData.forEach(q => {
        // Simulate crowd fluctuations
        const timeVar = Math.sin(Date.now() / 15000 + q.id.charCodeAt(1)) * 0.3;
        const base = 0.3 + Math.random() * 0.5 + timeVar;
        q.current = Math.floor(Math.max(0, Math.min(q.capacity, base * q.capacity)));
        q.waitTime = Math.max(1, Math.floor(q.current / q.capacity * 25 + Math.random() * 5));
        
        // Update trend
        const trends = ['rising', 'stable', 'falling'];
        if (Math.random() < 0.1) {
            q.trend = trends[Math.floor(Math.random() * 3)];
        }
    });
}

function filterQueues(btn) {
    document.querySelectorAll('.queue-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    renderQueues();
}

function renderQueues() {
    const grid = document.getElementById('queue-grid');
    if (!grid) return;

    const filtered = activeFilter === 'all' ? queueData : queueData.filter(q => q.type === activeFilter);

    grid.innerHTML = filtered.map((q, i) => {
        const pct = Math.floor((q.current / q.capacity) * 100);
        const waitClass = q.waitTime <= 5 ? 'short' : q.waitTime <= 12 ? 'medium' : 'long';
        const barColor = waitClass === 'short' ? '#39ff14' : waitClass === 'medium' ? '#ff9500' : '#ff3b3b';
        const trendIcon = q.trend === 'rising' ? '📈' : q.trend === 'falling' ? '📉' : '➡️';
        const trendColor = q.trend === 'rising' ? 'text-neon-red' : q.trend === 'falling' ? 'text-neon-green' : 'text-white/40';

        return `
            <div class="queue-card animate-fade-in-up" style="animation-delay:${i * 0.05}s" data-type="${q.type}">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="text-2xl">${q.icon}</div>
                        <div>
                            <div class="font-semibold text-sm text-white/90">${q.name}</div>
                            <div class="text-[10px] text-white/40">${q.location}</div>
                        </div>
                    </div>
                    <div class="queue-wait-badge ${waitClass}">
                        ${q.waitTime}<span class="text-[10px] ml-0.5 font-normal">min</span>
                    </div>
                </div>

                <div class="flex items-center justify-between text-xs mb-1">
                    <span class="text-white/40">${q.current}/${q.capacity} <span class="hidden sm:inline">${translations[currentLanguage]?.queue_people || 'people'}</span></span>
                    <span class="${trendColor} text-[10px]">${trendIcon} ${q.trend}</span>
                </div>

                <div class="queue-bar">
                    <div class="queue-bar-fill" style="width:${pct}%; background:${barColor}"></div>
                </div>

                <div class="flex items-center gap-1 mt-2.5 text-[10px] text-white/30">
                    <span>🧠</span>
                    <span>${translations[currentLanguage]?.queue_ai_pred || 'AI Predicted'}</span>
                </div>
            </div>
        `;
    }).join('');
}
