# Coding Standards

- **Be simple and direct** rather than complicated and clever.
- **Resolve all errors and linter warnings** before considering a task complete.
- **Keep packages up to date** within the constraints of the stack.
- **Follow Domain Driven Design (DDD) principles** where applicable (bounded contexts, clear domain language, see `specs/product/glossary.md`).
- **Keep business logic in the service layer** and out of the frontend as much as possible; the frontend should orchestrate and display, not implement core rules.
- **Follow the project-wide Playwright test automation patterns** in `specs/engineering/test-automation-patterns.md` for all new and refactored tests.
- **Use page objects for UI tests** rather than long raw page call chains; place page object classes under `tests/pages/`, create one class per page or major screen, and keep each file limited to one page object class.
