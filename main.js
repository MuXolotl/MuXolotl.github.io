// ===== MuXolotl - Общий JavaScript =====

// Тексты для мультиязычности
const translations = {
    ru: {
        // Навигация
        'nav.about': 'О нас',
        'nav.software': 'Программы',
        'nav.games': 'Игры',
        'nav.contact': 'Контакты',
        'nav.back': 'На главную',
        'nav.back_short': 'Главная',
        
        // Hero
        'hero.subtitle': 'Разрабатываю программы и игры. Все проекты с открытым исходным кодом.',
        'hero.projects': 'Мои проекты',
        'hero.contact': 'Связаться',
        
        // О проекте
        'about.title': 'О проекте',
        'about.software': 'Программы',
        'about.software.desc': 'Утилиты для повседневных задач',
        'about.games': 'Игры',
        'about.games.desc': 'Игровые проекты в разработке',
        'about.opensource': 'Open Source',
        'about.opensource.desc': 'Весь код открыт на GitHub',
        
        // Программы
        'software.title': 'Программы',
        'software.soon': 'Новые проекты скоро',
        'software.converter.desc': 'Конвертер медиафайлов с простым интерфейсом',
        'software.indev': 'В разработке',
        
        // Игры
        'games.title': 'Игры',
        'games.soon': 'Скоро',
        'games.soon.desc': 'Игровые проекты в процессе разработки',
        
        // Контакты
        'contact.title': 'Контакты',
        'contact.desc': 'Есть вопросы, идеи или просто хочешь написать? Найди меня на GitHub.',
        
        // Footer
        'footer.rights': '© 2025 MuXolotl. Все права защищены.',
        'footer.back': '← Вернуться на главную',
        
        // Converter страница
        'converter.subtitle': 'Конвертер медиафайлов с простым и понятным интерфейсом. Конвертируй аудио и видео в нужный формат.',
        'converter.download': 'Скачать',
        'converter.features': 'Возможности',
        'converter.audio': 'Аудио конвертация',
        'converter.audio.desc': 'Поддержка популярных форматов: MP3, WAV, FLAC, OGG и других',
        'converter.video': 'Видео конвертация',
        'converter.video.desc': 'Конвертируй видео в MP4, AVI, MKV и другие форматы',
        'converter.ui': 'Простой интерфейс',
        'converter.ui.desc': 'Минималистичный дизайн — ничего лишнего',
        'converter.quality': 'Настройки качества',
        'converter.quality.desc': 'Выбирай битрейт и качество выходного файла',
        
        // Загрузка
        'download.title': 'Скачать',
        'download.os': 'Операционная система',
        'download.type': 'Тип установки',
        'download.installer': 'Установщик (.msi)',
        'download.recommended': 'Рекомендуется',
        'download.portable': 'Portable (.exe)',
        'download.noinstall': 'Без установки',
        'download.dmg': 'Скачать .dmg',
        'download.intel': 'Для Mac с процессором Intel',
        'download.silicon': 'Для Mac M1 / M2 / M3 / M4',
        'download.deb': 'Скачать .deb',
        'download.debian': 'Для Debian / Ubuntu',
        'download.ffmpeg': 'FFmpeg бинарники',
        'download.allversions': 'Все версии на GitHub →',
        'download.builtwith': 'Создано с:',
        
        // Участие
        'contrib.title': 'Участие в разработке',
        'contrib.heading': 'Проект открыт для контрибьюторов',
        'contrib.desc': 'MuXolotl-Converter — open source проект. Буду рад любой помощи: исправление багов, новые функции, улучшение документации или просто идеи.',
        'contrib.bug': 'Сообщить о баге',
        'contrib.pr': 'Pull Requests',
        
        // Мобильное предупреждение
        'mobile.title': 'Только для компьютеров',
        'mobile.desc': 'MuXolotl-Converter — десктопное приложение для Windows, macOS и Linux. На мобильных устройствах оно не работает.',
        'mobile.btn': 'Понятно',
        
        // GitHub статистика
        'stats.stars': 'звёзд',
        'stats.forks': 'форков',
        'stats.downloads': 'скачиваний',
        
        // Форматы
        'formats.title': 'Поддерживаемые форматы',
        'formats.audio': 'Аудио',
        'formats.audio.count': '21 формат',
        'formats.video': 'Видео',
        'formats.video.count': '22 формата',
        'formats.note': 'Конвертация работает на базе FFmpeg — поддерживаются практически все популярные форматы',
        
        // Поделиться
        'share.title': 'Поделиться:'
    },
    en: {
        // Navigation
        'nav.about': 'About',
        'nav.software': 'Software',
        'nav.games': 'Games',
        'nav.contact': 'Contact',
        'nav.back': 'Back to home',
        'nav.back_short': 'Home',
        
        // Hero
        'hero.subtitle': 'Developing software and games. All projects are open source.',
        'hero.projects': 'My Projects',
        'hero.contact': 'Contact',
        
        // About
        'about.title': 'About',
        'about.software': 'Software',
        'about.software.desc': 'Utilities for everyday tasks',
        'about.games': 'Games',
        'about.games.desc': 'Game projects in development',
        'about.opensource': 'Open Source',
        'about.opensource.desc': 'All code is open on GitHub',
        
        // Software
        'software.title': 'Software',
        'software.soon': 'New projects coming soon',
        'software.converter.desc': 'Media file converter with a simple interface',
        'software.indev': 'In Development',
        
        // Games
        'games.title': 'Games',
        'games.soon': 'Coming Soon',
        'games.soon.desc': 'Game projects are in development',
        
        // Contact
        'contact.title': 'Contact',
        'contact.desc': 'Have questions, ideas, or just want to say hi? Find me on GitHub.',
        
        // Footer
        'footer.rights': '© 2025 MuXolotl. All rights reserved.',
        'footer.back': '← Back to home',
        
        // Converter page
        'converter.subtitle': 'Media file converter with a simple and intuitive interface. Convert audio and video to any format.',
        'converter.download': 'Download',
        'converter.features': 'Features',
        'converter.audio': 'Audio Conversion',
        'converter.audio.desc': 'Support for popular formats: MP3, WAV, FLAC, OGG and more',
        'converter.video': 'Video Conversion',
        'converter.video.desc': 'Convert video to MP4, AVI, MKV and other formats',
        'converter.ui': 'Simple Interface',
        'converter.ui.desc': 'Minimalist design — nothing extra',
        'converter.quality': 'Quality Settings',
        'converter.quality.desc': 'Choose bitrate and output file quality',
        
        // Download
        'download.title': 'Download',
        'download.os': 'Operating System',
        'download.type': 'Installation Type',
        'download.installer': 'Installer (.msi)',
        'download.recommended': 'Recommended',
        'download.portable': 'Portable (.exe)',
        'download.noinstall': 'No installation',
        'download.dmg': 'Download .dmg',
        'download.intel': 'For Mac with Intel processor',
        'download.silicon': 'For Mac M1 / M2 / M3 / M4',
        'download.deb': 'Download .deb',
        'download.debian': 'For Debian / Ubuntu',
        'download.ffmpeg': 'FFmpeg binaries',
        'download.allversions': 'All versions on GitHub →',
        'download.builtwith': 'Built with:',
        
        // Contributing
        'contrib.title': 'Contributing',
        'contrib.heading': 'Open for contributors',
        'contrib.desc': 'MuXolotl-Converter is an open source project. Any help is welcome: bug fixes, new features, documentation improvements, or just ideas.',
        'contrib.bug': 'Report a bug',
        'contrib.pr': 'Pull Requests',
        
        // Mobile warning
        'mobile.title': 'Desktop Only',
        'mobile.desc': 'MuXolotl-Converter is a desktop application for Windows, macOS, and Linux. It does not work on mobile devices.',
        'mobile.btn': 'Got it',
        
        // GitHub stats
        'stats.stars': 'stars',
        'stats.forks': 'forks',
        'stats.downloads': 'downloads',
        
        // Formats
        'formats.title': 'Supported Formats',
        'formats.audio': 'Audio',
        'formats.audio.count': '21 formats',
        'formats.video': 'Video',
        'formats.video.count': '22 formats',
        'formats.note': 'Conversion is powered by FFmpeg — almost all popular formats are supported',
        
        // Share
        'share.title': 'Share:'
    }
};

// Текущий язык (по умолчанию из localStorage или браузера)
let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');

// Получить перевод
function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// Применить переводы к странице
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    // Обновить активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

// Переключить язык
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
}

// ===== Мобильное меню =====
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

// ===== Кнопка "Наверх" =====
function initScrollTopButton() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Анимация появления секций =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== Плавный скролл =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== GitHub API статистика с кешированием =====
async function fetchGitHubStats(repo) {
    const CACHE_KEY = `gh_stats_${repo}`;
    const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 час жизни кеша

    try {
        // 1. Проверяем кеш
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            const { timestamp, data } = JSON.parse(cachedRaw);
            // Если кеш свежий (меньше 1 часа), возвращаем его
            if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
                console.log('Using cached GitHub stats');
                return data;
            }
        }

        // 2. Если кеша нет или он протух — делаем запрос
        console.log('Fetching new GitHub stats...');
        const repoResponse = await fetch(`https://api.github.com/repos/${repo}`);
        if (!repoResponse.ok) throw new Error('Repo fetch failed');
        const repoData = await repoResponse.json();
        
        const releasesResponse = await fetch(`https://api.github.com/repos/${repo}/releases`);
        if (!releasesResponse.ok) throw new Error('Releases fetch failed');
        const releasesData = await releasesResponse.json();
        
        let totalDownloads = 0;
        let lastReleaseDate = null;
        
        if (Array.isArray(releasesData) && releasesData.length > 0) {
            lastReleaseDate = releasesData[0].published_at;
            releasesData.forEach(release => {
                release.assets?.forEach(asset => {
                    totalDownloads += asset.download_count;
                });
            });
        }
        
        const result = {
            stars: repoData.stargazers_count || 0,
            forks: repoData.forks_count || 0,
            downloads: totalDownloads,
            lastRelease: lastReleaseDate
        };

        // 3. Сохраняем в кеш
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: result
        }));
        
        return result;

    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        // Если запрос упал, пробуем вернуть старый кеш, даже если он протух
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            return JSON.parse(cachedRaw).data;
        }
        return null;
    }
}

// Форматирование относительной даты
function formatRelativeDate(dateString) {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (currentLang === 'ru') {
        if (diffDays === 0) return 'сегодня';
        if (diffDays === 1) return 'вчера';
        if (diffDays < 7) return `${diffDays} ${pluralize(diffDays, 'день', 'дня', 'дней')} назад`;
        if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} ${pluralize(weeks, 'неделю', 'недели', 'недель')} назад`;
        }
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')} назад`;
        }
        const years = Math.floor(diffDays / 365);
        return `${years} ${pluralize(years, 'год', 'года', 'лет')} назад`;
    } else {
        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }
}

// Склонение слов (для русского)
function pluralize(n, one, few, many) {
    if (n % 10 === 1 && n % 100 !== 11) return one;
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
    return many;
}

function updateGitHubStatsUI(stats) {
    const starsEl = document.querySelector('[data-stat="stars"] .count');
    const forksEl = document.querySelector('[data-stat="forks"] .count');
    const downloadsEl = document.querySelector('[data-stat="downloads"] .count');
    const lastUpdateEl = document.getElementById('lastUpdate');
    
    if (starsEl && stats) {
        starsEl.textContent = stats.stars;
        starsEl.closest('.github-stat')?.classList.remove('loading');
    }
    if (forksEl && stats) {
        forksEl.textContent = stats.forks;
        forksEl.closest('.github-stat')?.classList.remove('loading');
    }
    if (downloadsEl && stats) {
        downloadsEl.textContent = stats.downloads;
        downloadsEl.closest('.github-stat')?.classList.remove('loading');
    }
    if (lastUpdateEl && stats?.lastRelease) {
        const relativeDate = formatRelativeDate(stats.lastRelease);
        if (relativeDate) {
            const prefix = currentLang === 'ru' ? 'Обновлено' : 'Updated';
            lastUpdateEl.textContent = `${prefix} ${relativeDate}`;
            lastUpdateEl.classList.remove('hidden');
        }
    }
}

// ===== Кнопки "Поделиться" =====
function initShareButtons() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.dataset.share;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent(currentLang === 'ru' 
                ? 'Конвертер медиафайлов с простым интерфейсом' 
                : 'Media file converter with a simple interface');
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'telegram':
                    shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
                    break;
                case 'reddit':
                    shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// ===== Определение мобильного устройства =====
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ===== Предупреждение для мобильных =====
function initMobileWarning() {
    const warning = document.getElementById('mobileWarning');
    const closeBtn = document.getElementById('closeMobileWarning');
    
    if (warning && isMobileDevice()) {
        warning.classList.remove('hidden');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                warning.classList.add('hidden');
            });
        }
    }
}

// ===== Переключатель языка =====
function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Применить переводы при загрузке
    applyTranslations();
}

// ===== Лайтбокс для изображений =====
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== Переключатель ОС (страница загрузки) =====
function initOSSelector() {
    const osButtons = document.querySelectorAll('.os-btn');
    const downloadPanels = document.querySelectorAll('.download-panel');
    
    if (osButtons.length === 0) return;

    osButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const os = btn.dataset.os;
            
            osButtons.forEach(b => {
                b.classList.remove('bg-blue-500/20', 'border-blue-500', 'text-white');
                b.classList.add('border-gray-600');
            });
            btn.classList.add('bg-blue-500/20', 'border-blue-500', 'text-white');
            btn.classList.remove('border-gray-600');
            
            downloadPanels.forEach(panel => panel.classList.add('hidden'));
            document.getElementById(`download-${os}`)?.classList.remove('hidden');
        });
    });

    // Определяем ОС
    function detectOS() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('win')) return 'windows';
        if (ua.includes('mac')) {
            return navigator.platform === 'MacIntel' ? 'macos-intel' : 'macos-arm';
        }
        if (ua.includes('linux')) return 'linux';
        return 'windows';
    }

    // Автовыбор ОС при загрузке (только на десктопе)
    if (!isMobileDevice()) {
        const btn = document.querySelector(`[data-os="${detectOS()}"]`);
        if (btn) btn.click();
    }
}

// ===== Инициализация =====
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollTopButton();
    initScrollAnimations();
    initSmoothScroll();
    initLanguageSwitcher();
    initMobileWarning();
    initShareButtons();
    initOSSelector();
    
    // Загрузить GitHub статистику если есть элемент
    if (document.querySelector('.github-stats')) {
        fetchGitHubStats('MuXolotl/MuXolotl-Converter').then(updateGitHubStatsUI);
    }
});