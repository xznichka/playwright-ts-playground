Playwright & TypeScript Test Automation Playground

A demonstration test automation framework for the Automation Exercise web application.

The project shows a clean and maintainable test structure built with Playwright, TypeScript, the Page Object Model (POM) and API testing.

Key Features

1. Hybrid UI & API tests
   API lifecycle tests: an APIFunctions wrapper over Playwright's APIRequestContext covers the full user account lifecycle (create, verify, delete).
   Unique test data: @faker-js/faker and timestamps generate fresh data on every run, so tests are independent and safe to run in parallel. Each test cleans up the data it creates.
2. Ad-blocking fixture (fixtures/test.ts)

The target site shows Google ads and pop-ups that cover page elements and make tests flaky. A custom fixture deals with this in two ways:

Network level: page.route aborts requests to ad-related domains.
DOM level: page.addInitScript injects a small script with a MutationObserver that removes pop-ups and iframes before they interfere with interactions. 3. Page Object Model
Locators: all locators are readonly fields set in the page class constructor. Methods contain no hardcoded selectors.
Assertions: page objects only read and prepare UI data (for example, item prices and quantities in the cart). All expect assertions stay in the test specs, so reports show clearly what is being checked. 4. Configuration
Base URL and credentials are read from a .env file (via dotenv).
Tests run in Chromium, Firefox and WebKit with fullyParallel: true.
Traces, screenshots and videos are saved when a test fails.
Repository Structure
├── .env.example # Template for environment variables
├── .gitignore # Excludes secrets, reports and node_modules
├── .github/workflows/ # CI workflow (GitHub Actions)
├── playwright.config.ts # Playwright configuration
├── api/
│ └── api.functions.ts # API client wrapper for endpoints
├── fixtures/
│ └── test.ts # Custom fixture: ad blocking and DOM cleanup
├── page-objects/ # Page Object classes
│ ├── base.page.ts # Base page object
│ ├── cart.page.ts # Cart actions and price calculations
│ └── products.page.ts # Catalog navigation and search
├── test-data/ # Test data
└── tests/
├── api/
│ └── user.spec.ts # User account lifecycle (API)
└── ui/
├── cart.spec.ts # Cart workflows
└── products.spec.ts # Catalog and search workflows
Quick Start

1. Clone and install
   git clone https://github.com/xznichka/playwright-ts-playground.git
   cd playwright-ts-playground
   npm install
   npx playwright install --with-deps
2. Configure environment variables

Create a local .env file from the template:

cp .env.example .env

Then fill in your values:

BASE_URL=https://www.automationexercise.com
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password 3. Run tests
Run all tests (UI and API) in headless mode:
npx playwright test
Run in Playwright UI Mode (useful for debugging):
npx playwright test --ui
Run API tests only:
npx playwright test tests/api
Open the HTML report:
npx playwright show-report
