/**
 * Vezbec Portfolio - Contact & Scoping Form Handler (contact.js)
 * Manages form validation, simulated dispatch, FAQ accordion, and URL pre-filling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initFaqAccordion();
  prefillFromUrl();
});

/**
 * Initializes form submission, validation, and feedback toasts.
 */
function initContactForm() {
  const form = document.getElementById('projectContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const lang = window.currentLang || 'fr';
    const dict = window.translations ? window.translations[lang] : {};
    const notifs = dict.notifications || {};

    const nameInput = document.getElementById('clientName');
    const emailInput = document.getElementById('clientEmail');
    const platformInput = document.getElementById('clientPlatform');
    const budgetInput = document.getElementById('clientBudget');
    const messageInput = document.getElementById('clientMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Basic Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !platformInput.value || !budgetInput.value || !messageInput.value.trim()) {
      window.showToast(
        notifs.formErrorTitle || "Erreur de validation",
        notifs.formErrorMsg || "Veuillez remplir tous les champs obligatoires (*).",
        'error'
      );
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      const emailErrorMsg = lang === 'fr' ? "Veuillez entrer une adresse courriel valide." : "Please enter a valid email address.";
      window.showToast("Email invalide", emailErrorMsg, 'error');
      emailInput.focus();
      return;
    }

    // Simulate sending state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>${dict.contactPage ? dict.contactPage.btnSubmitting : 'Envoi en cours...'}</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show success toast
      window.showToast(
        notifs.formSuccessTitle || "Demande envoyée !",
        notifs.formSuccessMsg || "Merci de votre intérêt. Nous vous répondrons sous 24h ouvrées.",
        'success'
      );

      // Reset form
      form.reset();
    }, 1200);
  });
}

/**
 * FAQ Accordion Expand / Collapse
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');

    if (trigger && answer) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/**
 * Prefills platform & message if directed from project modal or URL query parameters
 */
function prefillFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const platform = urlParams.get('platform');
  const ref = urlParams.get('ref');

  if (platform) {
    const platformSelect = document.getElementById('clientPlatform');
    if (platformSelect) {
      platformSelect.value = platform;
    }
  }

  if (ref) {
    const msgArea = document.getElementById('clientMessage');
    if (msgArea && !msgArea.value) {
      const lang = window.currentLang || 'fr';
      if (lang === 'fr') {
        msgArea.value = `Bonjour, je souhaite échanger sur une solution similaire au projet "${decodeURIComponent(ref)}". Nos besoins spécifiques sont les suivants :\n`;
      } else {
        msgArea.value = `Hello, I would like to discuss building a custom solution inspired by "${decodeURIComponent(ref)}". Our specific requirements are:\n`;
      }
    }
  }
}

