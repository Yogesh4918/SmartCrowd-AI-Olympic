/* ===== SmartCrowd AI – Main Application Controller ===== */
'use strict';

// --------- Loading Screen ---------
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
                initApp();
            }, 700);
        }
    }, 1800);
});

// --------- App Init ---------
/**
 * Initializes all core application components
 * including i18n, navigation, heatmap, and queues.
 */
function initApp() {
    initI18n();
    initHeatmap();
    initNavigation();
    initQueues();
    initAlerts();
    initVenueCards();
    initStatCounters();
    initScrollEffects();
    initIntersectionObservers();
    startFooterClock();
    startNotificationSimulator();
}

// --------- Nav Scroll Effect ---------
function initScrollEffects() {
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if (nav) {
            nav.classList.toggle('scrolled', scroll > 50);
        }

        // Update active nav link
        const sections = ['hero', 'dashboard', 'heatmap', 'navigation', 'queues', 'alerts'];
        const links = document.querySelectorAll('.nav-link'); 
        let currentSection = '';

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 200) currentSection = id;
            }
        });

        links.forEach(link => {
            const target = link.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
            link.classList.toggle('active', target === currentSection);
        });

        lastScroll = scroll;
    }, { passive: true });
}

// --------- Section Scroll ---------
/**
 * Smooth scrolls to a target section by ID, adjusting for navigation bar height.
 * @param {string} id - The ID of the section to scroll to.
 */
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 64;
        const top = el.offsetTop - navHeight - 10;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// --------- Mobile Menu ---------
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// --------- Notification Panel ---------
let notifications = [];

/**
 * Toggles the visibility of the notification panel.
 */
function toggleNotifPanel() {
    const panel = document.getElementById('notif-panel');
    if (panel) {
        panel.classList.toggle('hidden');
        panel.classList.toggle('open');
    }
}

function addNotification(type, title, body) {
    notifications.unshift({
        id: Date.now(),
        type,
        title,
        body,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
    });

    if (notifications.length > 20) notifications.pop();
    renderNotifications();
    updateNotifBadge();
}

function renderNotifications() {
    const list = document.getElementById('notif-list');
    if (!list) return;

    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="text-center py-12 text-white/20">
                <div class="text-4xl mb-3">🔔</div>
                <div class="text-sm">No notifications yet</div>
            </div>
        `;
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.type} ${n.read ? 'opacity-50' : ''} animate-fade-in-up">
            <div class="flex items-start gap-3">
                <div class="text-lg flex-shrink-0">${getNotifIcon(n.type)}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-0.5">
                        <span class="font-semibold text-sm text-white/90 truncate">${n.title}</span>
                        <span class="text-[10px] text-white/30 flex-shrink-0">${n.time}</span>
                    </div>
                    <p class="text-xs text-white/50">${n.body}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function getNotifIcon(type) {
    switch (type) {
        case 'danger': return '🚨';
        case 'warning': return '⚠️';
        case 'info': return 'ℹ️';
        case 'success': return '✅';
        default: return '🔔';
    }
}

function updateNotifBadge() {
    const badge = document.getElementById('notif-badge');
    const unread = notifications.filter(n => !n.read).length;
    if (badge) {
        badge.textContent = unread;
        badge.classList.toggle('hidden', unread === 0);
    }
}

function clearNotifications() {
    notifications = [];
    renderNotifications();
    updateNotifBadge();
}

// --------- Notification Simulator ---------
const notifMessages = [
    { type: 'warning', title: 'Crowd Surge Detected', body: 'Gate A experiencing higher than expected inflow. AI routing active.' },
    { type: 'info', title: 'Event Starting Soon', body: '100m Sprint Finals begin in 15 minutes at the Athletics Arena.' },
    { type: 'danger', title: 'Emergency Exit Alert', body: 'Exit E2 blocked temporarily. Please use alternative routes.' },
    { type: 'success', title: 'Queue Reduced', body: 'North Food Court wait time dropped to 3 minutes.' },
    { type: 'info', title: 'Weather Update', body: 'Light rain expected in 30 minutes. Indoor areas recommended.' },
    { type: 'warning', title: 'Parking Near Capacity', body: 'Parking Zone P2 is 90% full. Shuttle service available from P5.' },
    { type: 'success', title: 'Route Optimized', body: 'Your saved route has been updated to avoid new congestion.' },
    { type: 'info', title: 'Medal Ceremony', body: 'Medal ceremony starting at Olympic Stadium. Expect crowd movement.' },
    { type: 'warning', title: 'High Temperature Alert', body: 'Hydration stations activated in open-air seating areas.' },
    { type: 'success', title: 'Washroom Available', body: 'Block C washroom now has short wait time (< 2 min).' },
];

function startNotificationSimulator() {
    // Initial notification
    setTimeout(() => {
        const msg = notifMessages[0];
        addNotification(msg.type, msg.title, msg.body);
    }, 3000);

    // Periodic notifications
    setInterval(() => {
        const msg = notifMessages[Math.floor(Math.random() * notifMessages.length)];
        addNotification(msg.type, msg.title, msg.body);
    }, 15000);
}

// --------- Venue Cards ---------
const venues = [
    { id: 'olympic-stadium', name: 'Olympic Stadium', icon: '🏟️', sport: 'Athletics & Ceremonies', capacity: 80000, current: 0, status: 'normal', color: '#6366f1' },
    { id: 'aquatics-center', name: 'Aquatics Center', icon: '🏊', sport: 'Swimming & Diving', capacity: 15000, current: 0, status: 'moderate', color: '#22d3ee' },
    { id: 'athletics-arena', name: 'Athletics Arena', icon: '🏃', sport: 'Track & Field', capacity: 60000, current: 0, status: 'normal', color: '#39ff14' },
    { id: 'cycling-velodrome', name: 'Cycling Velodrome', icon: '🚴', sport: 'Track Cycling', capacity: 6000, current: 0, status: 'high', color: '#ff9500' },
    { id: 'tennis-courts', name: 'Tennis Center', icon: '🎾', sport: 'Tennis', capacity: 10000, current: 0, status: 'normal', color: '#a5b4fc' },
    { id: 'gymnastics-hall', name: 'Gymnastics Arena', icon: '🤸', sport: 'Artistic Gymnastics', capacity: 12000, current: 0, status: 'moderate', color: '#ff006e' },
];

function initVenueCards() {
    updateVenueData();
    renderVenueCards();
    setInterval(() => {
        updateVenueData();
        renderVenueCards();
    }, 5000);
}

function updateVenueData() {
    venues.forEach(v => {
        const baseOccupancy = 0.4 + Math.random() * 0.5;
        const timeWave = Math.sin(Date.now() / 20000 + v.id.length) * 0.1;
        const occupancy = Math.max(0.1, Math.min(0.98, baseOccupancy + timeWave));
        v.current = Math.floor(occupancy * v.capacity);

        const pct = v.current / v.capacity;
        if (pct >= 0.9) v.status = 'critical';
        else if (pct >= 0.75) v.status = 'high';
        else if (pct >= 0.5) v.status = 'moderate';
        else v.status = 'normal';
    });
}

function renderVenueCards() {
    const container = document.getElementById('venue-cards');
    if (!container) return;

    container.innerHTML = venues.map((v, i) => {
        const pct = Math.floor((v.current / v.capacity) * 100);
        const barColor = v.status === 'normal' ? '#39ff14' : v.status === 'moderate' ? '#ff9500' : v.status === 'high' ? '#ff3b3b' : '#ff006e';

        return `
            <div class="venue-card animate-fade-in-up" style="--venue-color: ${v.color}; animation-delay: ${i * 0.08}s">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="text-3xl">${v.icon}</div>
                        <div>
                            <h3 class="font-semibold text-white/90">${v.name}</h3>
                            <p class="text-[11px] text-white/40">${v.sport}</p>
                        </div>
                    </div>
                    <span class="venue-status ${v.status}">
                        <span class="w-1.5 h-1.5 rounded-full bg-current ${v.status === 'critical' || v.status === 'high' ? 'animate-pulse' : ''}"></span>
                        ${v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                    </span>
                </div>

                <div class="grid grid-cols-3 gap-3 mb-3">
                    <div class="text-center">
                        <div class="text-lg font-bold font-orbitron text-white/90">${(v.current / 1000).toFixed(1)}k</div>
                        <div class="text-[10px] text-white/35">Current</div>
                    </div>
                    <div class="text-center">
                        <div class="text-lg font-bold font-orbitron text-white/60">${(v.capacity / 1000).toFixed(0)}k</div>
                        <div class="text-[10px] text-white/35">Capacity</div>
                    </div>
                    <div class="text-center">
                        <div class="text-lg font-bold font-orbitron" style="color: ${barColor}">${pct}%</div>
                        <div class="text-[10px] text-white/35">Occupancy</div>
                    </div>
                </div>

                <div class="venue-capacity-bar">
                    <div class="venue-capacity-fill" style="width: ${pct}%; background: ${barColor}"></div>
                </div>

                <div class="flex items-center gap-1.5 mt-3 text-[10px] text-white/25">
                    <span>🧠</span>
                    <span>AI Monitoring Active</span>
                </div>
            </div>
        `;
    }).join('');
}

// --------- Stat Counter Animations ---------
function initStatCounters() {
    const stats = [
        { id: 'stat-venues', target: 12, suffix: '' },
        { id: 'stat-attendees', target: 847520, suffix: '', format: true },
        { id: 'stat-sensors', target: 2480, suffix: '', format: true },
        { id: 'stat-response', target: 1.2, suffix: 's', decimal: true },
    ];

    stats.forEach(stat => {
        animateCounter(stat.id, stat.target, stat.suffix, stat.format, stat.decimal);
    });

    // Periodically update attendees count with slight fluctuations
    setInterval(() => {
        const el = document.getElementById('stat-attendees');
        if (el) {
            const current = 840000 + Math.floor(Math.random() * 15000);
            el.textContent = current.toLocaleString();
        }
    }, 8000);
}

function animateCounter(id, target, suffix = '', format = false, decimal = false) {
    const el = document.getElementById(id);
    if (!el) return;

    const duration = 2500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // ease-out quartic

        let current;
        if (decimal) {
            current = (target * eased).toFixed(1);
        } else {
            current = Math.floor(target * eased);
            if (format) current = current.toLocaleString();
        }

        el.innerHTML = current + (suffix ? `<span class="text-lg">${suffix}</span>` : '');

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// --------- Intersection Observer (Reveal Animations) ---------
function initIntersectionObservers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });
}

// --------- Footer Clock ---------
function startFooterClock() {
    function update() {
        const el = document.getElementById('footer-time');
        if (el) {
            const now = new Date();
            el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) +
                ' • ' + now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }
    update();
    setInterval(update, 1000);
}
