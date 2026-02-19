class AppNavbar extends HTMLElement {
    connectedCallback() {
        // Проверяем, внутренняя ли это страница
        const isInner = this.getAttribute('page') === 'inner';
        const rootPath = isInner ? 'index.html' : '#';
        
        // Разный набор ссылок для главной и внутренних страниц
        const links = isInner ? `
            <a href="index.html" class="text-gray-300 hover:text-white transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span>На главную</span>
            </a>
        ` : `
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

        // Мобильное меню нужно только на главной
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

        this.innerHTML = `
        <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
            <div class="max-w-6xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <a href="${rootPath}" class="flex items-center gap-3">
                        <img src="images/icon.png" alt="Icon" class="w-10 h-10 object-contain">
                        <span class="text-xl font-semibold">MuXolotl</span>
                    </a>
                    ${links}
                </div>
                ${mobileMenu}
            </div>
        </nav>
        `;
    }
}

class AppFooter extends HTMLElement {
    connectedCallback() {
        // Динамический год (забирает текущий из системы пользователя)
        const currentYear = new Date().getFullYear();

        this.innerHTML = `
        <footer class="py-8 px-6 border-t border-gray-800 relative z-10">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <img src="images/icon.png" alt="Icon" class="w-8 h-8 object-contain">
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