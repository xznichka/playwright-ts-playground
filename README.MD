# Playwright & TypeScript Test Automation Playground

This repository contains a production-grade demonstration test automation framework built for the Automation Exercise ([https://automationexercise.com/](https://automationexercise.com/?utm_source=gemini)) web application.

The primary goal of this project is to demonstrate a clean, scalable, and resilient test architecture using Playwright, TypeScript, Page Object Model (POM), and API Testing.

---

## Architectural Highlights & Key Engineering Decisions

### 1. Hybrid UI & API Testing Layer

- End-to-End API Lifecycle: Features dedicated API integration tests (APIFunctions wrapper utilizing Playwright's APIRequestContext) covering full user account CRUD lifecycles (creation, verification, and automated teardown).
- Data Isolation & Generators: Integrates @faker-js/faker and dynamic timestamping to generate unique runtime test data. Tests remain completely isolated, atomic, and safe for parallel execution with zero database clutter.

### 2. Advanced Anti-Ad Blocking Fixture (fixtures/test.ts)

The target application (Automation Exercise) is heavily overlaid with dynamic Google Ads and pop-ups that frequently block DOM elements and induce flakiness.

- Network-Level Interception: A custom test fixture intercepts network requests using page.route to immediately drop (abort) ad-related domains.
- DOM MutationObserver & CSS Injection: Automatically injects a lightweight script via page.addInitScript that continuously observes DOM changes on page navigation, stripping out modal pop-ups and iframes before they interfere with element interactions.

### 3. Strict Page Object Model & Data Provider Pattern

- Locator Encapsulation: All locators are instantiated as readonly fields inside page class constructors. Method bodies contain zero hardcoded selectors.
- Separation of Concerns: Page Objects act as Data Providers—they fetch and prepare raw UI state/data (e.g., retrieving itemized price/quantity calculations in the cart), leaving all business-level assertions (expect) strictly within test specs for transparent reporting.

### 4. Environment Variable Security & Cross-Browser Configuration

- Sensitive credentials and base URLs are managed via .env files (powered by dotenv).
- Configured for multi-browser execution (Chromium, Firefox, WebKit) with parallel runner settings (fullyParallel: true) and diagnostic artifacts on failure (traces, screenshots, videos).

---

## Repository Structure

```text
├── .env.example          # Public environment variables template
├── .gitignore            # Git exclusion rules (secrets, reports, node_modules)
├── playwright.config.ts  # Global Playwright configuration
├── api/                  # API Layer
│   └── api.functions.ts  # API Client / Service wrapper for endpoints
├── fixtures/
│   └── test.ts           # Custom test fixture with network ad-blocking & DOM overrides
├── page-objects/         # Page Object Model classes (UI Data Providers)
│   ├── base.page.ts      # Base page object
│   ├── cart.page.ts      # Cart interaction & calculation provider
│   └── products.page.ts  # Catalog navigation & search actions
└── tests/                # Automated test specifications
    ├── api/              # API test specifications (CRUD lifecycle)
    │   └── user.spec.ts
    └── ui/               # UI test specifications (E-commerce workflows)
        ├── cart.spec.ts
        └── products.spec.ts

```

---

## Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/xznichka/playwright-ts-playground.git
cd playwright-ts-playground
npm install
npx playwright install --with-deps

```

### 2. Configure Environment Variables

Create a local .env file in the project root based on .env.example:

```bash
cp .env.example .env

```

Fill in your local environment credentials:

```env
BASE_URL=https://www.automationexercise.com
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password

```

### 3. Execute Tests

- Run all tests (UI & API) in headless mode:

```bash
npx playwright test

```

- Run via Playwright Interactive UI Mode (Recommended for debugging):

```bash
npx playwright test --ui

```

- Run API tests specifically:

```bash
npx playwright test tests/api

```

- Generate & view HTML Execution Report:

```bash
npx playwright show-report

```
