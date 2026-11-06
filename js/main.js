/**
 * Vezbec Portfolio - Core JavaScript (main.js)
 * Manages language switching, responsive navigation, and global UI components.
 */

// Global State
window.currentLang = localStorage.getItem('vezbec_lang') || 'fr';

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initNavigation();
  initHeaderScroll();
  renderFeaturedCards();

  window.addEventListener('languageChanged', () => {
    renderFeaturedCards();
  });
});

/**
 * Renders homepage featured project cards if container is present
 */
function renderFeaturedCards() {
  const container = document.getElementById('featuredGrid');
  if (!container || !window.projectsData) return;

  const lang = window.currentLang || 'fr';
  const dict = window.translations ? window.translations[lang] : {};
  const btnLabel = (dict.featured && dict.featured.viewDetails) || "Voir la fiche projet";
  const featuredList = window.projectsData.filter(p => p.featured);

  container.innerHTML = featuredList.map(project => {
    const title = project.title[lang] || project.title.en;
    const cat = project.category[lang] || project.category.en;
    const desc = project.shortDesc[lang] || project.shortDesc.en;

    return `
      <article class="project-card" onclick="openProjectModal('${project.id}')">
        <div class="project-card-thumb">
          <img src="assets/mockups/${project.thumbnailSvg}" alt="${title}" loading="lazy">
          <div class="project-card-thumb-overlay">
            <span class="platform-badge ${project.badgeClass}">${project.platformName}</span>
          </div>
        </div>
        <div class="project-card-body">
          <div class="project-card-category">${cat}</div>
          <h3 class="project-card-title">${title}</h3>
          <p class="project-card-desc">${desc}</p>
          <div class="project-tags-list">
            ${project.stack.slice(0, 3).map(tech => `<span class="project-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <span class="card-link-btn">
              ${btnLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Initializes the bilingual engine and binds language toggles.
 */
function initLanguage() {
  applyLanguage(window.currentLang);

  // Bind all language switcher buttons (desktop & mobile)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      if (selectedLang && selectedLang !== window.currentLang) {
        setLanguage(selectedLang);
      }
    });
  });
}

/**
 * Switches the global language and updates all DOM elements.
 * @param {string} lang - 'fr' or 'en'
 */
function setLanguage(lang) {
  window.currentLang = lang;
  localStorage.setItem('vezbec_lang', lang);
  applyLanguage(lang);

  // Dispatch custom event for gallery/contact modules to re-render
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Traverses elements with data-i18n attributes and updates text content.
 * @param {string} lang - 'fr' or 'en'
 */
function applyLanguage(lang) {
  document.documentElement.lang = lang;

  // Update active states on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const dict = window.translations ? window.translations[lang] : null;
  if (!dict) return;

  // Translate standard text content
  const i18nElements = document.querySelectorAll('[data-i18n]');
  i18nElements.forEach(el => {
    const keyPath = el.getAttribute('data-i18n');
    const value = getNestedTranslation(dict, keyPath);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // Translate placeholders (inputs, textareas)
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const keyPath = el.getAttribute('data-i18n-placeholder');
    const value = getNestedTranslation(dict, keyPath);
    if (value !== undefined) {
      el.placeholder = value;
    }
  });

  // Translate aria-labels
  const ariaElements = document.querySelectorAll('[data-i18n-aria]');
  ariaElements.forEach(el => {
    const keyPath = el.getAttribute('data-i18n-aria');
    const value = getNestedTranslation(dict, keyPath);
    if (value !== undefined) {
      el.setAttribute('aria-label', value);
    }
  });
}

/**
 * Helper to resolve nested keys like "hero.titlePre"
 */
function getNestedTranslation(obj, path) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : undefined;
  }, obj);
}

/**
 * Mobile Drawer Menu & Navigation Active State
 */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when clicking outside or clicking a nav link
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active link based on current page pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Header scroll shadow elevation effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Global Toast Notification Helper
 * @param {string} title
 * @param {string} message
 * @param {'success'|'error'} type
 */
window.showToast = function(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconSvg = type === 'success'
    ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
};
