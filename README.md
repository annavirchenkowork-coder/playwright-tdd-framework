# 🧪 Playwright TDD Framework (JavaScript)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) <br>
This repository contains a complete **Test-Driven Development (TDD)** automation framework built with **JavaScript** and **Playwright**.
It includes fully runnable end-to-end tests covering essential user flows, a clean Page Object Model, reusable utilities, and a production-ready project structure.

The framework is designed for clarity, maintainability, and easy expansion — making it useful for both personal projects and real-world automation work.

Developers who wish to add new scenarios can follow the recommended **TDD workflow**:

> Write the failing test → implement the minimal solution → refactor → repeat.

This ensures consistency, clean design, and test reliability as the framework grows.

The project validates a complete *self-enrollment and checkout workflow*, including:

- application start
- personal details entry
- payment plan selection
- agreement confirmation
- final payment submission

The goal is to showcase strong *testing architecture*, solid *TDD practices*, and production-quality *Playwright implementation*.

## 📚 Table of Contents
1. [Prerequisites](#Prerequisites)
2. [Environment Setup](#environment-setup)
3. [How to Run Tests](#how-to-run-tests)
4. [Project Structure](#project-structure)
5. [Feature Coverage Map](#-feature-coverage-map)
6. [TDD Workflow for Adding New Tests](#-tdd-workflow-for-adding-new-tests)
7. [Why TDD?](#-why-tdd)
8. [Supported Test Types](#-supported-test-types)
9. [Supported Browsers](#-supported-browsers)
10. [Git Workflow](#git-workflow)<br>

## ⚙️ Prerequisites

Before you start, make sure the following tools are installed on your machine:
- **Node.js** (v18 or higher)
- **npm** (v6 or higher — included with Node.js)
- **Visual Studio Code** (or any IDE of your choice)
- **Git**

## 💻 Environment Setup
This project is fully set up and ready to run. To explore or test it on your own device:

### 1. Clone the Repository
```sh
git clone https://github.com/<your-username>/playwright-tdd-framework.git
```

### 2. Open the Project in Your IDE
Navigate to the cloned folder and open it in VS Code or any preferred editor.

### 3. Install Dependencies
```sh
npm install
```

### 4. Configure Environment Variables
This framework uses sample credentials to run end-to-end tests on the demo environment.

If you’d like to run the tests locally, create a `.env` file in the project root with the following content:
```
SEP_QA_URL = https://qa.sep.tdtm.cydeo.com/taws
SEP_USERNAME = automation-user
SEP_PASSWORD = 123abc

CARD_NUMBER = 4242424242424242
EXPIRATION_DATE = 12/28
CVC = 368
ZIP_CODE = 22102
```

⚠️ These are demo credentials for the public test environment. No personal or sensitive data is involved.

The framework uses the dotenv package to load these variables securely into your local environment.

## ▶️ How to Run Tests
#### Run the full test suite:
```sh
npm test
```

#### Run a specific test folder or file:
```sh
npx playwright test tests/payment-plans
```

#### Generate an HTML report:
```sh
npm run report
```
The generated report will appear under /playwright-report.
## 🗂️ Project Structure

```
playwright-js-tdd-framework
│
├── data
│   └── qa_data.json              # Test data for UI workflows
│
├── pages                         # Page Object Model classes
│   ├── BasePage.js
│   ├── LeftMainPage.js
│   ├── PaymentPlanPage.js
│   ├── ReviewPaymentPage.js
│   └── StartApplicationPage.js
│
├── tests                         # Automated test suites (fully runnable)
│   ├── getting-started
│   ├── payment-plans
│   └── submitting-payment
│
├── utilities                     # Shared helper functions
│   ├── qa-data-reader.js
│   └── sep-ui-utilities.js
│
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```
## 📌 Feature Coverage Map

This framework automates the complete **self-enrollment & checkout workflow** of the SEP application.<br>
Below is the full list of **implemented features**, grouped by functional area:
### 🟩 Getting Started
| Feature | Description |
|--------|-------------|
| **SEP07 – View product landing page** | Verifies program information is visible |
| **SEP08 – Start stepper: initial state** | Ensures Step 1 loads correctly |
| **SEP09 – Product information** | Validates price, discount, and program details |
| **SEP10 – Personal details step** | Validates form fields and required inputs |
| **SEP11 – Start refund date** | Checks refund policy visibility |
| **SEP19 – Start application stepper progression** | Checks stepper state changes |

---

### 🟦 Payment Plans
| Feature | Description |
|--------|-------------|
| **SEP14 – Payment plan selection** | Selecting upfront vs installments |
| **SEP16 – Payment plan: Next button behavior** | Ensures user cannot proceed without selection |
| **SEP17 – Payment plan display** | Validates plan card UI, labels, and pricing |
| **SEP18 – Payment plan summary from qa_data.json** | Verifies base price, discounts, installments, and per-month amounts match test data |

---

### 🟪 Submitting Payment
| Feature | Description |
|--------|-------------|
| **SEP21 – Pay button state** | Visibility & disabled state before accepting Terms |
| **SEP23 – Successful payment** | Valid test card → confirmation page |
| **SEP25 – Invalid card number error** | Incomplete / invalid card → inline errors |
| **SEP27 – Invalid expiration date** | Short or past expiration → inline errors |
| **SEP29 – Invalid CVC code** | Too-short CVC → inline error |
| **NEG1 – Pay disabled when Terms not accepted** | Validation preventing submission |
| **NEG2 – Invalid card number → alert & no confirmation** | “Something went wrong” dialog |
| **NEG3 – Invalid ZIP code → alert & no confirmation** | Invalid ZIP + “Something went wrong” |

### Framework Highlights
- **Clear POM structure** — reusable methods, clean locators
- **Organized tests** — grouped by workflow for easy navigation
- **Data handling** — separate test data for maintainability
- **Utilities** — helper modules for common UI actions

## 🔧 TDD Workflow for Adding New Tests
This framework **already includes complete, runnable test suites**, but if you want to extend it or create additional scenarios, the recommended process is:
### 1. Write a failing test (Red)
Create a new test file or case that expresses the expected behavior — it should fail initially.
### 2. Implement only the minimum required code (Green)
Add or update:
- Page Object methods
- utilities
- locators
- data <br>

until the test passes.
### 3. Refactor
Once the test passes:
- clean duplicated code
- rename unclear methods
- reorganize logic
- apply DRY & clean code principles

This cycle ensures every new test contributes to a healthy, maintainable codebase.

## 💡 Why TDD?

This project follows **Test-Driven Development (TDD)** to ensure long-term quality and maintainability.

### 1. Higher Confidence in Code
You always know your code works because the tests define the expected behavior *before* writing the implementation.

### 2. Cleaner Architecture
TDD naturally encourages:
- smaller functions  
- better abstractions  
- clear responsibilities  
Because you only write what the test requires — nothing more.

### 3. Better Automation Design
When you write the test first:
- You think like a user  
- You design more understandable steps  
- Your Page Object methods become more reusable  

### 4. Easier Refactoring
With all tests passing, you can safely:
- redesign page objects  
- optimize utilities  
- improve selectors  
without breaking behavior.

### 5. Repeatability & Reliability
TDD produces stable, deterministic tests.  
Flaky tests are dramatically reduced because every test was originally written to fail for the right reason.

### 6. Scalable Codebase
As your project grows:
- POM stays clean  
- Utilities expand in a controlled way  
- New scenarios are easy to add  

TDD gives you a **strong, future-proof automation framework** instead of a messy pile of scripts.

## 🧪 Supported Test Types

The framework supports multiple testing approaches that give flexibility and depth:

### 1. UI End-to-End Tests
- Full real-browser navigation  
- Covers start → plan → review → payment  
- Valid & invalid payment flows  
- Stripe iframe handling  

### 2. Component / Page-Level Testing
- Tests focus on a single page’s logic and UI  
- Uses Page Object Model for isolation  
- Great for validating form behavior or error states  

### 3. Integration-Style Multi-Step Tests
- Data flows from page to page  
- Ensures correct transitions between steps  
- Example: selecting plan → verifying subtotal → reaching payment page  

### 4. Data-Driven Testing
- Centralized JSON file under `/data`  
- Allows testing variations of inputs without code duplication  
- Easy to extend for future scenarios  

## 🌐 Supported Browsers

Playwright supports all major browser engines out of the box.  
This framework is compatible with:

| Browser | Engine |
|---------|--------|
| **Chromium / Google Chrome** | Blink |
| **Firefox** | Gecko |
| **WebKit / Safari** | WebKit |

You can run all browsers with:

```sh
npx playwright test --browser=all
```

Or run just one:

```sh
npx playwright test --browser=chromium
```

## 🌱 Git Workflow
A simple, clean branching strategy is recommended:
### 1. Clone the repo
```sh
git clone https://github.com/<your-username>/playwright-tdd-framework.git
```
### 2. Create a new branch (for enhancements, fixes, or new tests)
```sh
git checkout -b feature/your-feature-name
```
### 3. Commit your changes
```sh
git add .
git commit -m "Add new feature test for payment flow"
```

### 4. Push to GitHub
```sh
git push origin feature/your-feature-name
```

### 5. Open a Pull Request
Submit a PR to the develop branch once your feature or fix is ready for review.

## ✅ Final Note
This framework provides a ready-to-use Playwright setup with complete tests, clean architecture, modular utilities, and a welcoming structure for further expansion.

Whether you’re learning TDD, practicing automation design, or contributing new features, this project gives you a strong foundation — and a clear workflow to grow it confidently. 🚀