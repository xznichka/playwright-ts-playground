# Playwright & TypeScript Test Automation Playground

This repository contains a demonstration test automation framework built for the [Automation Exercise](https://automationexercise.com/) web application.

The primary goal of this project is to demonstrate a clean, scalable, and resilient test architecture using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## Architectural Highlights & Key Engineering Decisions

### 1. Advanced Anti-Ad Blocking Fixture (`fixtures/test.ts`)

The target application (_Automation Exercise_) is heavily overlaid with dynamic Google Ads and pop-ups that frequently block DOM elements and induce flakiness.

- **Network-Level Interception:** A custom test fixture intercepts network requests using `page.route` to immediately drop (`abort`) ad-related domains.
- **DOM MutationObserver & CSS Injection:** Automatically injects a lightweight script via `page.addInitScript` that continuously observes DOM changes on page navigation, stripping out modal pop-ups and iframes before they interfere with element interactions.

### 2. Strict Page Object Model & Data Provider Pattern

- **Locator Encapsulation:** All locators are instantiated as `readonly` fields inside page class `constructor`s. Method bodies contain zero hardcoded selectors.
- **Separation of Concerns:** Page Objects act as _Data Providers_—they fetch and prepare raw UI state/data (e.g., retrieving itemized prices in a cart), leaving all business-level assertions (`expect`) strictly within test specs for transparent reporting and easy debugging.

### 3. Environment Variable Security

- Sensitive test credentials and target environment configurations are decoupled from codebase using `.env` files (managed via `dotenv`).
- Strict `.gitignore` rules prevent accidental commits of secrets, local `.env` files, and cached authentication states (`playwright/.auth/`).

### 4. Optimized `playwright.config.ts`

- Cross-browser test runner configured for Chromium, Firefox, and WebKit.
- Parallel execution enabled (`fullyParallel: true`).
- Comprehensive failure diagnostics configured with auto-tracing (`trace: 'on-first-retry'`), failure screenshots, and video recordings.

---

## Repository Structure

```text
├── .env.example          # Public environment variables template
├── .gitignore            # Git exclusion rules (secrets, reports, node_modules)
├── playwright.config.ts  # Global Playwright configuration
├── fixtures/
│   └── test.ts           # Custom test fixture with network ad-blocking & DOM overrides
├── page-objects/         # Page Object Model classes
│   ├── base.page.ts      # Base page object
│   ├── cart.page.ts      # Cart interaction & calculation provider
│   └── products.page.ts  # Catalog navigation & search actions
└── tests/                # Automated test specifications
    ├── cart.spec.ts
    └── products.spec.ts
```
