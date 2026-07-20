# Pipelines

## Test Pipelines

- This pipeline should be implemented as GitHub Actions workflow.
-Name the pipeline "Run Playwright Tests"
- Run all the tests in `tests` directory using npm test command.
- Enable the pipeline to run in three ways:
  1. Whenever a pull request is opened.
  2.Whenever changes merge into `main` branch.
  3.When someone manually triggers the pipeline from Actions page of the repository
- The pipeline should cache files like Node packages and Playwright browsers for the subsequent runs.