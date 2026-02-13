/**
 * MuXolotl - Main Site Logic
 * Includes: GitHub API integration, Carousel, and UI interactions.
 */

// =========================================
// UI: Mobile & Navigation
// =========================================
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

// =========================================
// GitHub API & Dynamic Links
// =========================================
async function fetchGitHubStats(repo) {
    const CACHE_KEY = `gh_stats_${repo}`;
    const CACHE_EXPIRATION_MS = 60 * 60 * 1000;

    try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        let releasesData = null;
        let result = null;

        if (cachedRaw) {
            const { timestamp, data, releases } = JSON.parse(cachedRaw);
            if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
                if (releases) updateDownloadLinks(releases);
                return data;
            }
        }

        const repoResponse = await fetch(`https://api.github.com/repos/${repo}`);
        if (!repoResponse.ok) throw new Error('Repo fetch failed');
        const repoData = await repoResponse.json();
        
        const releasesResponse = await fetch(`https://api.github.com/repos/${repo}/releases`);
        if (!releasesResponse.ok) throw new Error('Releases fetch failed');
        releasesData = await releasesResponse.json();
        
        let totalDownloads = 0;
        let lastReleaseDate = null;
        let latestRelease = null;
        
        if (Array.isArray(releasesData) && releasesData.length > 0) {
            latestRelease = releasesData[0]; 
            lastReleaseDate = latestRelease.published_at;
            releasesData.forEach(release => {
                release.assets?.forEach(asset => {
                    totalDownloads += asset.download_count;
                });
            });
            
            updateDownloadLinks(latestRelease);
        }
        
        result = {
            stars: repoData.stargazers_count || 0,
            forks: repoData.forks_count || 0,
            downloads: totalDownloads,
            lastRelease: lastReleaseDate,
            version: latestRelease ? latestRelease.tag_name : 'v1.0.0'
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: result,
            releases: latestRelease
        }));
        
        return result;

    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            const cache = JSON.parse(cachedRaw);
            if (cache.releases) updateDownloadLinks(cache.releases);
            return cache.data;
        }
        return null;
    }
}

function updateDownloadLinks(release) {
    if (!release || !release.assets) return;

    document.querySelectorAll('.version-tag').forEach(el => {
        el.textContent = release.tag_name;
    });

    const assets = release.assets;
    const updateLink = (selector, typeIdentifier) => {
        const btn = document.querySelector(selector);
        if (!btn) return;
        const asset = assets.find(a => a.name.toLowerCase().includes(typeIdentifier));
        if (asset) btn.href = asset.browser_download_url;
    };

    // TODO: Refactor this mapping if more assets appear
    updateLink('[data-download="windows-installer"]', '.msi');
    updateLink('[data-download="windows-portable"]', 'portable.exe');
    updateLink('[data-download="windows-ffmpeg"]', 'windows-x64.zip');
    updateLink('[data-download="macos-intel"]', 'macos-intel.dmg');
    updateLink('[data-download="macos-silicon"]', 'apple-silicon.dmg');
    updateLink('[data-download="macos-intel-ffmpeg"]', 'macos-intel.zip');
    updateLink('[data-download="macos-silicon-ffmpeg"]', 'macos-arm64.zip');
    updateLink('[data-download="linux-deb"]', '.deb');
    updateLink('[data-download="linux-ffmpeg"]', 'linux-x64.tar.gz');
}

function formatRelativeDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
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
}

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
            lastUpdateEl.textContent = `Обновлено ${relativeDate}`;
            lastUpdateEl.classList.remove('hidden');
        }
    }
}

// =========================================
// UI Components: Share, Lightbox, OS
// =========================================
function initShareButtons() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.dataset.share;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
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

function handleImageError(img) {
    img.onerror = null;
    
    const placeholder = document.createElement('div');
    placeholder.className = 'img-placeholder';
    
    const height = img.style.height || (img.parentElement.clientHeight > 0 ? img.parentElement.clientHeight + 'px' : '200px');
    placeholder.style.height = height;

    placeholder.innerHTML = `
        <svg class="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <span class="text-sm font-medium">Изображение не загружено</span>
    `;
    
    img.parentNode.replaceChild(placeholder, img);
}
window.handleImageError = handleImageError;

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function initMobileWarning() {
    const warning = document.getElementById('mobileWarning');
    const closeBtn = document.getElementById('closeMobileWarning');
    
    if (warning && isMobileDevice()) {
        if (!sessionStorage.getItem('mobileWarningClosed')) {
            warning.classList.remove('hidden');
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                warning.classList.add('hidden');
                sessionStorage.setItem('mobileWarningClosed', 'true');
            });
        }
    }
}

function openLightbox(src) {
    if (src.includes('placeholder')) return;

    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
window.openLightbox = openLightbox;

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeStatusModal();
    }
});

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

    function detectOS() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('win')) return 'windows';
        if (ua.includes('mac')) return 'macos-intel';
        if (ua.includes('linux')) return 'linux';
        return 'windows';
    }

    if (!isMobileDevice()) {
        const detected = detectOS();
        const btn = document.querySelector(`[data-os="${detected}"]`);
        if (btn) btn.click();
    }
}

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const btnPrev = document.querySelector('.carousel-btn.prev');
    const btnNext = document.querySelector('.carousel-btn.next');

    if (!track || !btnPrev || !btnNext) return;

    const scrollAmount = () => {
        const itemWidth = track.children[0].offsetWidth;
        const gap = 24;
        return itemWidth + gap;
    };

    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
}

// =========================================
// Colab Status Modal
// =========================================
function openStatusModal(element) {
    const modal = document.getElementById('statusModal');
    const icon = modal.querySelector('.status-modal-icon');
    const title = modal.querySelector('h3');
    const desc = modal.querySelector('p');
    
    const isOnline = element.classList.contains('online');
    
    icon.className = `status-modal-icon ${isOnline ? 'online' : 'offline'}`;
    icon.innerHTML = isOnline 
        ? '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
        : '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    
    title.textContent = isOnline ? 'Блокнот доступен' : 'Блокнот заблокирован';
    desc.textContent = isOnline 
        ? 'Ссылка работает. Вы можете открыть блокнот в Google Colab и начать работу.'
        : 'Google заблокировал этот блокнот. Пожалуйста, используйте резервную ссылку или подождите обновления.';
    
    modal.classList.add('active');
}
window.openStatusModal = openStatusModal;

function closeStatusModal() {
    const modal = document.getElementById('statusModal');
    if (modal) {
        modal.classList.remove('active');
    }
}
window.closeStatusModal = closeStatusModal;

// =========================================
// Colab Status Loader
// =========================================
async function initColabStatus() {
    const statusElements = document.querySelectorAll('.status-badge');
    if (statusElements.length === 0) return;

    try {
        const response = await fetch('colab-status.json');
        if (!response.ok) return;

        const statuses = await response.json();
        
        Object.keys(statuses).forEach(key => {
            const element = document.getElementById(`status-${key}`);
            if (element) {
                const isOnline = statuses[key] === 'online';
                element.className = `status-badge ${isOnline ? 'online' : 'offline'}`;
                
                const textSpan = element.querySelector('.status-text');
                if (textSpan) {
                    textSpan.textContent = isOnline ? 'Работает' : 'Недоступно';
                }
            }
        });
    } catch (e) {
        console.log('Colab status check skipped or failed');
    }
}

// =========================================
// Initialization
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollTopButton();
    initScrollAnimations();
    initSmoothScroll();
    initMobileWarning();
    initShareButtons();
    initOSSelector();
    initCarousel();
    initColabStatus();
    
    if (document.querySelector('[data-stat="stars"]')) {
        fetchGitHubStats('MuXolotl/MuXolotl-Converter').then(updateGitHubStatsUI);
    }
});