/**
 * MuXolotl Analytics — Firebase Realtime Database
 * With Anonymous Auth, navbar stats, stats panel, colab counters.
 */

// =========================================
// Firebase Config
// =========================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDy5DjfS5oMs7jTqehJTnNK1J2rWKFbteM",
    authDomain: "muxolotl-7db0b.firebaseapp.com",
    databaseURL: "https://muxolotl-7db0b-default-rtdb.firebaseio.com",
    projectId: "muxolotl-7db0b",
    storageBucket: "muxolotl-7db0b.firebasestorage.app",
    messagingSenderId: "680565889434",
    appId: "1:680565889434:web:0f79f14c9c77a152e94223"
};

let db = null;
let analyticsReady = false;
let authReady = false;

async function initAnalytics() {
    try {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded');
            return;
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }

        db = firebase.database();

        try {
            await firebase.auth().signInAnonymously();
            authReady = true;
        } catch (authErr) {
            console.warn('Anonymous auth failed:', authErr);
        }

        analyticsReady = true;

        cleanStalePresence();
        trackPageView();
        trackVisitor();
        trackPresence();
        bindClickTracking();
        initNavbarStats();
        initColabCounters();
        initStatsPanel();

    } catch (error) {
        console.error('Analytics init failed:', error);
    }
}

// =========================================
// Helpers
// =========================================
function getPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '') || 'index';
    return filename.replace(/[.#$\[\]\/]/g, '_');
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getSessionId() {
    let id = sessionStorage.getItem('mx_sid');
    if (!id) {
        id = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem('mx_sid', id);
    }
    return id;
}

function safeIncrement(path) {
    if (!analyticsReady || !authReady) return;
    try {
        db.ref(path).transaction((current) => {
            return (current || 0) + 1;
        });
    } catch (e) {
        console.warn('Increment failed:', path, e);
    }
}

function formatNumber(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 10000) return (n / 1000).toFixed(1) + 'K';
    if (n >= 1000) return n.toLocaleString('ru-RU');
    return n.toString();
}

const PAGE_NAMES = {
    'index': 'Главная',
    'converter': 'Конвертер',
    'colab': 'Google Colab',
    '404': '404',
    'analytics': 'Аналитика'
};

const CLICK_NAMES = {
    'download--windows-installer': '📦 Windows .msi',
    'download--windows-portable': '📦 Windows portable',
    'download--windows-ffmpeg': '📦 Win FFmpeg',
    'download--macos-intel': '🍎 macOS Intel',
    'download--macos-silicon': '🍎 macOS Silicon',
    'download--linux-deb': '🐧 Linux .deb',
    'share--twitter': '🐦 Twitter',
    'share--telegram': '✈️ Telegram',
    'share--reddit': '🟠 Reddit',
    'colab--poltrain-main': '⚡ PolTrain',
    'colab--poltrain-backup': '⚡ PolTrain (резерв)',
    'colab--polgen-main': '🎵 PolGen',
    'colab--poluvr-main': '🎤 PolUVR',
    'nav--projects': '→ Проекты',
    'nav--contact': '→ Контакты',
    'nav--github-profile': '→ GitHub',
    'nav--colab-page': '→ Colab',
    'nav--converter-page': '→ Конвертер',
    'nav--converter-github': '→ Конвертер GitHub'
};

// =========================================
// Clean Stale Presence (фикс зависших сессий)
// =========================================
function cleanStalePresence() {
    if (!analyticsReady || !authReady) return;

    const twoMinutesAgo = Date.now() - 2 * 60 * 1000;

    db.ref('analytics/online').once('value', (snap) => {
        const sessions = snap.val();
        if (!sessions) return;

        Object.entries(sessions).forEach(([id, data]) => {
            if (data && data.timestamp && data.timestamp < twoMinutesAgo) {
                db.ref(`analytics/online/${id}`).remove();
            }
        });
    });
}

// =========================================
// Page Views
// =========================================
function trackPageView() {
    const page = getPageName();
    const today = getTodayDate();

    safeIncrement(`analytics/pageviews/${page}/total`);
    safeIncrement(`analytics/pageviews/${page}/daily/${today}`);
    safeIncrement(`analytics/totals/pageviews`);
    safeIncrement(`analytics/totals/daily/${today}/pageviews`);
}

// =========================================
// Unique Visitors
// =========================================
function trackVisitor() {
    const today = getTodayDate();

    if (!localStorage.getItem('mx_tracked')) {
        safeIncrement('analytics/totals/unique_visitors');
        localStorage.setItem('mx_tracked', '1');
    }

    const dailyKey = `mx_day_${today}`;
    if (!localStorage.getItem(dailyKey)) {
        safeIncrement(`analytics/totals/daily/${today}/unique_visitors`);
        localStorage.setItem(dailyKey, '1');

        const prefix = 'mx_day_';
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) keys.push(key);
        }
        keys.sort().slice(0, -7).forEach(key => localStorage.removeItem(key));
    }
}

// =========================================
// Online Presence
// =========================================
function trackPresence() {
    if (!analyticsReady || !authReady) return;

    const sessionId = getSessionId();
    const page = getPageName();
    const presenceRef = db.ref(`analytics/online/${sessionId}`);

    const connectedRef = db.ref('.info/connected');
    connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
            presenceRef.set({
                page: page,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            presenceRef.onDisconnect().remove();
        }
    });

    window.addEventListener('beforeunload', () => {
        presenceRef.remove();
    });
}

// =========================================
// Click Tracking
// =========================================
const _clickTimestamps = {};
const CLICK_COOLDOWN_MS = 1000;

function trackClick(category, action) {
    if (!analyticsReady || !authReady) return;

    const cooldownKey = `${category}:${action}`;
    const now = Date.now();
    if (_clickTimestamps[cooldownKey] && now - _clickTimestamps[cooldownKey] < CLICK_COOLDOWN_MS) {
        return;
    }
    _clickTimestamps[cooldownKey] = now;

    const key = `${category}--${action}`.replace(/[.#$\[\]\/\s]/g, '_');
    const today = getTodayDate();

    safeIncrement(`analytics/clicks/${key}/total`);
    safeIncrement(`analytics/clicks/${key}/daily/${today}`);
    safeIncrement(`analytics/totals/clicks`);
}

window.trackClick = trackClick;

function bindClickTracking() {
    document.addEventListener('click', (e) => {
        const tracked = e.target.closest('[data-track]');
        if (!tracked) return;

        const trackValue = tracked.getAttribute('data-track');
        if (!trackValue) return;

        const [category, action] = trackValue.split(':');
        if (category && action) {
            trackClick(category, action);
        }
    });
}

// =========================================
// Navbar Stats
// =========================================
let _navbarViewsDebounce = null;

function initNavbarStats() {
    if (!analyticsReady) return;

    // Онлайн — реальное время
    db.ref('analytics/online').on('value', (snap) => {
        const data = snap.val();
        const count = data ? Object.keys(data).length : 0;

        document.querySelectorAll('.navbar-online-count').forEach(el => {
            el.textContent = count;
        });

        // Также обновляем панель статистики
        document.querySelectorAll('.sp-online-number').forEach(el => {
            el.textContent = count;
        });

        // Список онлайн пользователей в панели
        renderOnlineList(data);
    });

    // Просмотры — с debounce чтобы не моргало
    db.ref('analytics/totals/pageviews').on('value', (snap) => {
        const val = snap.val();
        if (val == null) return;

        clearTimeout(_navbarViewsDebounce);
        _navbarViewsDebounce = setTimeout(() => {
            document.querySelectorAll('.navbar-views-count, .sp-pageviews').forEach(el => {
                el.textContent = formatNumber(val);
            });
        }, 400);
    });

    // Посетители
    db.ref('analytics/totals/unique_visitors').on('value', (snap) => {
        const val = snap.val();
        if (val == null) return;
        document.querySelectorAll('.sp-visitors').forEach(el => {
            el.textContent = formatNumber(val);
        });
    });

    // Клики
    db.ref('analytics/totals/clicks').on('value', (snap) => {
        const val = snap.val();
        if (val == null) return;
        document.querySelectorAll('.sp-clicks').forEach(el => {
            el.textContent = formatNumber(val);
        });
    });
}

function renderOnlineList(data) {
    const container = document.getElementById('spOnlineList');
    if (!container) return;

    if (!data || Object.keys(data).length === 0) {
        container.innerHTML = '';
        return;
    }

    const items = Object.entries(data).map(([id, info]) => {
        const page = PAGE_NAMES[info.page] || info.page;
        return `
            <div class="sp-online-item">
                <span class="sp-online-item-dot"></span>
                <span>${id.substring(0, 10)}…</span>
                <span class="sp-online-item-page">${page}</span>
            </div>
        `;
    });

    container.innerHTML = items.join('');
}

// =========================================
// Colab Click Counters (читает каждый ключ отдельно)
// =========================================
function initColabCounters() {
    const counterElements = document.querySelectorAll('[data-click-key]');
    if (counterElements.length === 0) return;

    // Индивидуальные счётчики на кнопках
    counterElements.forEach(el => {
        const key = el.getAttribute('data-click-key');
        if (!key) return;

        db.ref(`analytics/clicks/${key}/total`).on('value', (snap) => {
            const count = snap.val() || 0;
            const countEl = el.querySelector('.click-count');
            if (countEl) {
                countEl.textContent = count > 0 ? formatNumber(count) : '0';
                el.classList.add('loaded');
            }
        });
    });

    // Суммарные счётчики карточек
    document.querySelectorAll('[data-total-keys]').forEach(el => {
        const keys = el.getAttribute('data-total-keys').split(',').map(k => k.trim());
        const counts = {};

        keys.forEach(key => {
            counts[key] = 0;

            db.ref(`analytics/clicks/${key}/total`).on('value', (snap) => {
                counts[key] = snap.val() || 0;
                const total = Object.values(counts).reduce((a, b) => a + b, 0);
                const countEl = el.querySelector('.total-count');
                if (countEl) {
                    countEl.textContent = formatNumber(total);
                    el.classList.add('loaded');
                }
            });
        });
    });
}

// =========================================
// Stats Panel
// =========================================
function initStatsPanel() {
    const panel = document.getElementById('statsPanel');
    const openBtn = document.getElementById('openStatsBtn');
    const closeBtn = document.getElementById('closeStatsBtn');
    const overlay = document.getElementById('statsPanelOverlay');

    if (!panel || !openBtn) return;

    openBtn.addEventListener('click', () => {
        panel.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadStatsPanelData();
    });

    const close = () => {
        panel.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            close();
        }
    });
}

function loadStatsPanelData() {
    if (!analyticsReady) return;

    // Загрузить скачивания из GitHub кэша
    updatePanelDownloads();

    // Страницы
    db.ref('analytics/pageviews').once('value', (snap) => {
        renderPanelPages(snap.val());
    });

    // Клики
    db.ref('analytics/clicks').once('value', (snap) => {
        renderPanelClicks(snap.val());
    });
}

function updatePanelDownloads() {
    const cacheKey = 'gh_stats_MuXolotl/MuXolotl-Converter';
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        try {
            const { data } = JSON.parse(cached);
            if (data && data.downloads !== undefined) {
                document.querySelectorAll('.sp-downloads').forEach(el => {
                    el.textContent = formatNumber(data.downloads);
                });
                return;
            }
        } catch (e) {}
    }

    document.querySelectorAll('.sp-downloads').forEach(el => {
        el.textContent = '—';
    });
}

function renderPanelPages(pageviews) {
    const container = document.getElementById('spPages');
    if (!container) return;

    if (!pageviews) {
        container.innerHTML = '<div class="sp-list-empty">Нет данных</div>';
        return;
    }

    const sorted = Object.entries(pageviews)
        .map(([page, data]) => ({ page, total: data.total || 0 }))
        .sort((a, b) => b.total - a.total);

    const maxVal = sorted[0]?.total || 1;

    container.innerHTML = sorted.map(({ page, total }) => {
        const name = PAGE_NAMES[page] || page;
        const width = Math.max((total / maxVal) * 100, 3);
        return `
            <div class="sp-list-item">
                <span class="sp-list-item-name">${name}</span>
                <div class="sp-list-item-bar">
                    <div class="sp-list-item-bar-fill" style="width:${width}%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);"></div>
                </div>
                <span class="sp-list-item-count">${formatNumber(total)}</span>
            </div>
        `;
    }).join('');
}

function renderPanelClicks(clicks) {
    const container = document.getElementById('spClicks');
    if (!container) return;

    if (!clicks) {
        container.innerHTML = '<div class="sp-list-empty">Нет данных</div>';
        return;
    }

    const sorted = Object.entries(clicks)
        .map(([key, data]) => ({ key, total: data.total || 0 }))
        .filter(item => item.total > 0)
        .sort((a, b) => b.total - a.total)
        .slice(0, 15);

    if (sorted.length === 0) {
        container.innerHTML = '<div class="sp-list-empty">Нет данных</div>';
        return;
    }

    const maxVal = sorted[0]?.total || 1;

    container.innerHTML = sorted.map(({ key, total }) => {
        const name = CLICK_NAMES[key] || key.replace(/--/g, ' → ');
        const width = Math.max((total / maxVal) * 100, 3);
        return `
            <div class="sp-list-item">
                <span class="sp-list-item-name">${name}</span>
                <div class="sp-list-item-bar">
                    <div class="sp-list-item-bar-fill" style="width:${width}%;background:linear-gradient(90deg,#f59e0b,#f97316);"></div>
                </div>
                <span class="sp-list-item-count">${formatNumber(total)}</span>
            </div>
        `;
    }).join('');
}

// =========================================
// Public API
// =========================================
window.MxAnalytics = {
    getDatabase: () => db,
    isReady: () => analyticsReady && authReady,

    onOnlineCount: (callback) => {
        if (!analyticsReady) return;
        db.ref('analytics/online').on('value', (snap) => {
            const data = snap.val();
            const count = data ? Object.keys(data).length : 0;
            callback(count, data);
        });
    },

    getAllStats: () => {
        if (!analyticsReady) return Promise.resolve(null);
        return db.ref('analytics').once('value').then(snap => snap.val());
    },

    onStats: (path, callback) => {
        if (!analyticsReady) return;
        db.ref(`analytics/${path}`).on('value', (snap) => {
            callback(snap.val());
        });
    },

    getAuth: () => firebase.auth()
};

// =========================================
// Init
// =========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}