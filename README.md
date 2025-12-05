# WEB UI Test project TypeScript + Playwright

This project provides automated tests for the public website [https://www.saucedemo.com/](https://www.saucedemo.com/), built using **TypeScript** and the **Playwright** framework.

## 📁 Project Structure

<pre>
📁 project-root/
│
├── 📁 pages/                      # Page Object Model (POM). Contains locators and navigations for pages
│   ├── cart-page.ts
│   ├── checkout-complete-page.ts
│   ├── checkout-step-one-page.ts
│   ├── checkout-step-two-page.ts
│   ├── home-page.ts
│   └── inventory-page.ts
│
├── 📁 reporters/                  # Contains custom reports
│   ├── custom-html.ts
│   └── custom-list.ts
│
├── 📁 tests/                      # Test modules organized by scenarios
│   ├── scenario-1.spec.ts
│   └── scenario-2.spec.ts
│
├── 📁 utils/                      # General-purpose utility functions and fixtures
│   ├── fixtures.ts
│   └── utils.ts
│
├── playwright.config.ts           # Playwright configurations
└── tsconfig.json                  # TypeScript settings
</pre>

## ⚙️ Requirements

- TypeScript
- [Playwright](https://playwright.dev/)


## 🚀 How to Run Tests
* ```npx playwright test```

## 🚀 How to Run Specific Tests
If tests are grouped by tags "smoke", "regression":
* ```npx playwright test -g "smoke"```
* ```npx playwright test -g "regression"```
* ```npx playwright test -g "smoke|regression"```

## 🌐 Environments
The project supports running tests on multiple environments such as dev, test, stage, production and others
* Environments are defined in playwright.config.ts
* By default, tests are running on 'test' environment
* To run tests on specific environment, put the environment name into the command (dev, test, stage etc.):<br>
```$env:TEST_ENV="test"; npx playwright test```

## ✅ Features Covered
1. Scenario 1:
    * Log in with the standard user
    * Add the first and the last item in the cart, verify the correct items are added
    * Remove the first item and add previous to the last item to the cart, verify the content again
    * Go to checkout
    * Finish the order
    * Verify order is placed
    * Verify cart is empty
    * Logout from the system
2. Scenario 2:
    * Log in with the standard user
    * Verify when for sorting it is selected "Price (high to low)"
    * Then the items are sorted in the correct manner
    * Logout from the system

## 📝 Notes
* baseURL is defined in playwright.config.ts and shared across tests
* Tests are configured to be run on "chromium", "firefox" and "webkit" browsers
* "headless" mode is configured to "true"
* Project is designed to be scalable and extendable

## 📊 How to activate custom reports
Uncomment the report you want to use in the file playwright.config.ts:
* line
* list
* html
* custom-list
* custom-html
* json

## 👤 Author - Georgi Bordukov, Senior Software QA Engineer
* LinkedIn profile - https://www.linkedin.com/in/george-bordukov/