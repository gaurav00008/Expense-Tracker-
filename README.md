# Expense Tracker

A simple, dark-themed expense tracker with 4 linked pages: Home, Dashboard, Login, and Sign Up.

## Folder Structure

```
expense-tracker-project/
│
├── index.html          → Home page
├── dashboard.html       → Interactive dashboard (add/delete transactions)
├── login.html            → Login page (validated, simulated)
├── signup.html          → Sign up page (validated, simulated)
│
├── css/
│   ├── base.css          → Shared variables, reset, navbar, buttons (used on every page)
│   ├── home.css           → Styles only for index.html
│   ├── dashboard.css   → Styles only for dashboard.html
│   └── auth.css           → Shared styles for login.html + signup.html
│
└── js/
    ├── dashboard.js    → Add/delete transaction logic, live totals
    ├── login.js            → Login form validation + simulated login
    └── signup.js         → Signup form validation + password strength + simulated signup
```

## How the pages link together

- Home → "Get Started" goes to Sign Up, "Login" goes to Login
- Sign Up → after validating, redirects to Login
- Login → after validating, redirects to Dashboard
- Dashboard → fully functional: add transactions, delete transactions, live balance/income/expense totals
- Every page shares the same navbar so you can jump between Home / Dashboard / Login / Sign Up anytime

## Notes

- Login and Sign Up are **client-side only** — there's no backend or database yet, so they validate input and simulate the flow, but don't store real accounts.
- The dashboard's transaction data lives in memory (JavaScript variables), so it resets on page refresh. Adding real persistence would need a backend (e.g. Node.js + a database) or browser storage.

## Deploying on GitHub Pages

1. Upload this entire folder's contents to your repo (keep the `css/` and `js/` folders as-is).
2. Make sure `index.html` is in the root of the repo.
3. In repo Settings → Pages → Deploy from branch → main → / (root) → Save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
