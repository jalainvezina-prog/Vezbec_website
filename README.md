# Vezbec — Portfolio No-Code & Low-Code (AppSheet, Glide, Zite)

A clean, modern, high-performance portfolio website built in French and English with an ultra-sleek dark mode aesthetic.

---

## 🌟 Key Features

- **🌐 100% Bilingual Core (FR / EN)**:
  - Instant client-side language switching between French and English with zero page reloads.
  - User preference automatically persisted in `localStorage`.
  - Comprehensive translations for all headers, metrics, platform features, sample project cards, modals, form inputs, validation alerts, and FAQ items.
- **🎨 Modern Dark Mode Design System**:
  - Deep midnight canvas (`#070A11`, `#0F172A`) paired with luminous glowing accents:
    - **Google AppSheet**: Cyan / Google Cloud Blue (`#38BDF8`)
    - **Glide App**: Electric Indigo / Violet (`#818CF8`)
    - **Zite Platform**: Emerald / Mint (`#10B981`)
  - Glassmorphic card surfaces (`backdrop-filter: blur(16px)`), subtle borders, glowing active indicators, and smooth micro-interactions.
- **📱 9 Production-Grade Sample Projects**:
  - **AppSheet**: *Vezbec FieldOps* (Offline inspection & CMMS), *LogistiQ Pro* (Barcode scanner inventory), *FleetMaster* (Fleet safety & maintenance).
  - **Glide App**: *TalentPortal HR* (Employee hub & onboarding), *SalesSprint* (Mobile CRM & deal pipeline), *EventHub VIP* (Summit guide & QR pass).
  - **Zite**: *Zite ClientPortal* (Client extranet & blueprint review), *Analytics Hub* (Executive KPI cockpit), *SupportDesk Portal* (Ticketing & SLA tracking).
- **🔍 Interactive Gallery Engine**:
  - Filter by platform (**Tous / All**, **Google AppSheet**, **Glide App**, **Zite**).
  - Instant live keyword search querying titles, industries, tags, and stack.
  - Interactive project detail modal dialog showing complete app overview, core features, business impact metrics, and target personas.
- **✉️ Interactive Contact & Project Scoping Form**:
  - Structured fields for full name, business email, phone, company, target platform, budget range, and timeline.
  - Real-time client-side validation and toast notifications.
  - Deep linking pre-fill support: clicking *"Commander une solution similaire"* in any project modal pre-selects the platform and populates the inquiry message.
  - Interactive FAQ accordion addressing timelines, multiplatform support, data ownership, and offline field work.
- **⚡ Zero Build Dependencies**:
  - Built with pure semantic HTML5, modern CSS3 (Custom Properties & Flexbox/Grid), and Vanilla ES6+ JavaScript.
  - Instant loading, SEO friendly, and ready for deployment on GitHub Pages, Netlify, Vercel, or any standard web server.

---

## 📁 Project Structure

```
Vezbec_website/
├── index.html                  # Homepage (Hero, Stats, Platforms, Featured, Value, Process, Testimonials)
├── gallery.html                # Gallery & Project Showcase (Filter tabs, Search, 9 projects, Modal)
├── contact.html                # Contact & Project Scoping (Form, Direct channels, Interactive FAQ)
├── css/
│   └── styles.css              # Dark mode design system, layout, responsive breakpoints, animations
├── js/
│   ├── translations.js         # Complete bilingual dictionary (FR / EN)
│   ├── projects-data.js        # Detailed dataset for the 9 AppSheet, Glide, and Zite apps
│   ├── main.js                 # Global navigation, language toggle engine, toast system
│   ├── gallery.js              # Gallery filter engine, live search, and project modal dialog
│   └── contact.js              # Form validation, pre-filling from URL parameters, FAQ accordion
└── assets/
    ├── icons/
    │   └── vezbec-logo.svg     # Vector brand emblem and typography
    └── mockups/
        ├── appsheet-fieldops.svg
        ├── appsheet-logistiq.svg
        ├── appsheet-fleetmaster.svg
        ├── glide-talentportal.svg
        ├── glide-salessprint.svg
        ├── glide-eventhub.svg
        ├── zite-clientportal.svg
        ├── zite-analyticshub.svg
        └── zite-supportdesk.svg
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or launch a lightweight local server:

### Using Python (recommended)
```bash
# In the project directory:
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 🛠️ Customization & Deployment

- **Deploy to GitHub Pages**: Commit the repository and enable GitHub Pages in settings pointing to the root branch.
- **Deploy to Vercel or Netlify**: Drag-and-drop the directory or connect your repository with zero build configuration needed.
- **Add New Projects**: Simply append an object into the `projectsData` array in `js/projects-data.js`.

