class AppNavbar extends HTMLElement {
    connectedCallback() {
        const isInner = this.getAttribute('page') === 'inner';
        const rootPath = isInner ? 'index.html' : '#';
        const imgPath = 'images/icon.png';
        
        const statsBadges = `
            <div class="navbar-stats" id="navbarStats">
                <div class="navbar-online-badge" id="navbarOnline">
                    <span class="navbar-online-dot"></span>
                    <span class="navbar-online-count">—</span>
                    <span class="navbar-online-label">онлайн</span>
                </div>
                <button class="navbar-stats-btn" id="openStatsBtn" title="Статистика">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </button>
            </div>
        `;

        const links = isInner ? `
            ${statsBadges}
            <a href="index.html" class="text-gray-300 hover:text-white transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span>На главную</span>
            </a>
        ` : `
            ${statsBadges}
            <div class="hidden md:flex items-center gap-8">
                <a href="#about" class="nav-link text-gray-300 hover:text-white transition">О нас</a>
                <a href="#software" class="nav-link text-gray-300 hover:text-white transition">Программы</a>
                <a href="#games" class="nav-link text-gray-300 hover:text-white transition">Игры</a>
                <a href="#contact" class="nav-link text-gray-300 hover:text-white transition">Контакты</a>
            </div>
            <button id="mobileMenuBtn" class="md:hidden text-gray-300 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        `;

        const mobileMenu = isInner ? '' : `
        <div id="mobileMenu" class="hidden md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div class="flex flex-col gap-4">
                <a href="#about" class="text-gray-300 hover:text-white transition">О нас</a>
                <a href="#software" class="text-gray-300 hover:text-white transition">Программы</a>
                <a href="#games" class="text-gray-300 hover:text-white transition">Игры</a>
                <a href="#contact" class="text-gray-300 hover:text-white transition">Контакты</a>
            </div>
        </div>
        `;

        const statsPanel = `
        <div id="statsPanel" class="stats-panel">
            <div class="stats-panel-overlay" id="statsPanelOverlay"></div>
            <div class="stats-panel-drawer">
                <div class="stats-panel-header">
                    <div>
                        <h2 class="text-lg font-bold flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                            Статистика
                        </h2>
                        <p class="text-xs text-gray-500 mt-0.5">Обновляется в реальном времени</p>
                    </div>
                    <button id="closeStatsBtn" class="stats-panel-close">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="stats-panel-body">
                    <div class="sp-section">
                        <div class="sp-online-card">
                            <span class="sp-online-dot"></span>
                            <span class="sp-online-number navbar-online-count">—</span>
                            <span class="sp-online-label">сейчас на сайте</span>
                        </div>
                        <div id="spOnlineList" class="sp-online-list"></div>
                    </div>
                    <div class="sp-section">
                        <div class="sp-section-title">Общая статистика</div>
                        <div class="sp-metrics-grid">
                            <div class="sp-metric">
                                <div class="sp-metric-icon" style="background:rgba(59,130,246,0.1);">
                                    <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                </div>
                                <div>
                                    <div class="sp-metric-number sp-pageviews">—</div>
                                    <div class="sp-metric-label">просмотров</div>
                                </div>
                            </div>
                            <div class="sp-metric">
                                <div class="sp-metric-icon" style="background:rgba(139,92,246,0.1);">
                                    <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                </div>
                                <div>
                                    <div class="sp-metric-number sp-visitors">—</div>
                                    <div class="sp-metric-label">посетителей</div>
                                </div>
                            </div>
                            <div class="sp-metric">
                                <div class="sp-metric-icon" style="background:rgba(245,158,11,0.1);">
                                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>
                                </div>
                                <div>
                                    <div class="sp-metric-number sp-clicks">—</div>
                                    <div class="sp-metric-label">кликов</div>
                                </div>
                            </div>
                            <div class="sp-metric">
                                <div class="sp-metric-icon" style="background:rgba(34,197,94,0.1);">
                                    <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                </div>
                                <div>
                                    <div class="sp-metric-number sp-downloads">—</div>
                                    <div class="sp-metric-label">скачиваний</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sp-section">
                        <div class="sp-section-title">Популярные страницы</div>
                        <div id="spPages" class="sp-list">
                            <div class="sp-list-empty">Загрузка...</div>
                        </div>
                    </div>
                    <div class="sp-section">
                        <div class="sp-section-title">Популярные действия</div>
                        <div id="spClicks" class="sp-list">
                            <div class="sp-list-empty">Загрузка...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.innerHTML = `
        <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
            <div class="max-w-6xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <a href="${rootPath}" class="flex items-center gap-3">
                        <img src="${imgPath}" alt="Icon" class="w-10 h-10 object-contain">
                        <span class="text-xl font-semibold">MuXolotl</span>
                    </a>
                    ${links}
                </div>
                ${mobileMenu}
            </div>
        </nav>
        ${statsPanel}
        `;
    }
}

class AppFooter extends HTMLElement {
    connectedCallback() {
        const currentYear = new Date().getFullYear();
        const imgPath = 'images/icon.png';

        this.innerHTML = `
        <footer class="py-8 px-6 border-t border-gray-800 relative z-10">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <img src="${imgPath}" alt="Icon" class="w-8 h-8 object-contain">
                    <span class="text-gray-400">© ${currentYear} MuXolotl. Все права защищены.</span>
                </div>
                <div class="flex items-center gap-6 text-sm text-gray-500">
                    <a href="index.html#about" class="hover:text-gray-300 transition">О нас</a>
                    <a href="index.html#software" class="hover:text-gray-300 transition">Программы</a>
                    <a href="index.html#games" class="hover:text-gray-300 transition">Игры</a>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('app-navbar', AppNavbar);
customElements.define('app-footer', AppFooter);