/**
 * Vezbec Portfolio - Gallery & Project Filter Engine (gallery.js)
 * Powers platform filtering, live search, and interactive modal dialog.
 */

let activeFilter = 'all';
let searchQuery = '';
let currentOpenProjectId = null;

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initModal();

  // Listen for language switch events from main.js
  window.addEventListener('languageChanged', () => {
    renderProjects();
    if (currentOpenProjectId) {
      populateModal(currentOpenProjectId);
    }
  });
});

/**
 * Initializes filter buttons, search input, and initial project rendering.
 */
function initGallery() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('gallerySearch');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter') || 'all';
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }

  // Check URL query parameters for direct filtering (e.g., gallery.html?platform=glide)
  const urlParams = new URLSearchParams(window.location.search);
  const platformParam = urlParams.get('platform');
  if (platformParam) {
    const matchingTab = document.querySelector(`.filter-tab[data-filter="${platformParam}"]`);
    if (matchingTab) {
      filterTabs.forEach(t => t.classList.remove('active'));
      matchingTab.classList.add('active');
      activeFilter = platformParam;
    }
  }

  renderProjects();
}

/**
 * Renders project cards to the grid according to active filter & search query.
 */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !window.projectsData) return;

  const lang = window.currentLang || 'fr';
  const dict = window.translations ? window.translations[lang] : {};
  const galleryLabels = dict.galleryPage || {};

  const filtered = window.projectsData.filter(project => {
    // 1. Platform filter check
    const matchesPlatform = activeFilter === 'all' || project.platform === activeFilter;
    if (!matchesPlatform) return false;

    // 2. Search query check
    if (!searchQuery) return true;

    const titleText = (project.title[lang] || '').toLowerCase();
    const descText = (project.shortDesc[lang] || '').toLowerCase();
    const catText = (project.category[lang] || '').toLowerCase();
    const stackText = project.stack.join(' ').toLowerCase();

    return titleText.includes(searchQuery) ||
           descText.includes(searchQuery) ||
           catText.includes(searchQuery) ||
           stackText.includes(searchQuery);
  });

  // Empty state handling
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <svg style="width:48px;height:48px;margin:0 auto 1rem auto;color:var(--text-muted);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p style="font-size:1.125rem;color:var(--text-primary);margin-bottom:0.5rem;">${galleryLabels.noResults || "Aucune application ne correspond à votre recherche."}</p>
        <button class="btn btn-secondary" onclick="resetGalleryFilters()">${galleryLabels.btnReset || "Réinitialiser les filtres"}</button>
      </div>
    `;
    return;
  }

  // Render cards
  grid.innerHTML = filtered.map(project => {
    const title = project.title[lang] || project.title.en;
    const desc = project.shortDesc[lang] || project.shortDesc.en;
    const cat = project.category[lang] || project.category.en;
    const btnLabel = galleryLabels.btnDetails || "Voir la fiche";

    return `
      <article class="project-card" data-project-id="${project.id}" onclick="openProjectModal('${project.id}')">
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
            ${project.stack.length > 3 ? `<span class="project-tag">+${project.stack.length - 3}</span>` : ''}
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
 * Resets filter tabs and search input
 */
window.resetGalleryFilters = function() {
  activeFilter = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('gallerySearch');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-tab').forEach(t => {
    if (t.getAttribute('data-filter') === 'all') {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  renderProjects();
};

/**
 * Modal Dialog Controller
 */
function initModal() {
  const backdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', closeProjectModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }
}

/**
 * Opens modal for a specific project by id
 */
window.openProjectModal = function(projectId) {
  currentOpenProjectId = projectId;
  populateModal(projectId);

  const backdrop = document.getElementById('projectModal');
  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

/**
 * Closes modal
 */
window.closeProjectModal = function() {
  currentOpenProjectId = null;
  const backdrop = document.getElementById('projectModal');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/**
 * Populates modal elements based on project object & language
 */
function populateModal(projectId) {
  const project = window.projectsData.find(p => p.id === projectId);
  if (!project) return;

  const lang = window.currentLang || 'fr';
  const dict = window.translations ? window.translations[lang] : {};
  const labels = dict.galleryPage || {};

  const modalImg = document.getElementById('modalPreviewImg');
  const modalBadge = document.getElementById('modalPlatformBadge');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalMetricsGrid = document.getElementById('modalMetricsGrid');
  const modalStackTags = document.getElementById('modalStackTags');
  const modalTargetUsers = document.getElementById('modalTargetUsers');
  const modalCtaBtn = document.getElementById('modalCtaBtn');

  if (modalImg) {
    modalImg.src = `assets/mockups/${project.thumbnailSvg}`;
    modalImg.alt = project.title[lang];
  }

  if (modalBadge) {
    modalBadge.textContent = project.platformName;
    modalBadge.className = `platform-badge ${project.badgeClass}`;
  }

  if (modalCategory) {
    modalCategory.textContent = project.category[lang];
  }

  if (modalTitle) {
    modalTitle.textContent = project.title[lang];
  }

  if (modalDesc) {
    modalDesc.textContent = project.fullDesc[lang];
  }

  if (modalFeaturesList && project.features[lang]) {
    modalFeaturesList.innerHTML = project.features[lang].map(feat => `
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${feat}</span>
      </li>
    `).join('');
  }

  if (modalMetricsGrid && project.metrics[lang]) {
    modalMetricsGrid.innerHTML = project.metrics[lang].map(metric => `
      <div class="modal-metric-card">
        <div class="metric-val">${metric.value}</div>
        <div class="metric-lbl">${metric.label}</div>
      </div>
    `).join('');
  }

  if (modalStackTags && project.stack) {
    modalStackTags.innerHTML = project.stack.map(tech => `
      <span class="modal-stack-tag">${tech}</span>
    `).join('');
  }

  if (modalTargetUsers && project.users[lang]) {
    modalTargetUsers.textContent = project.users[lang];
  }

  if (modalCtaBtn) {
    modalCtaBtn.textContent = labels.modalRequestSimilar || "Commander une solution similaire";
    modalCtaBtn.onclick = () => {
      closeProjectModal();
      window.location.href = `contact.html?platform=${project.platform}&ref=${encodeURIComponent(project.title[lang])}`;
    };
  }
}

