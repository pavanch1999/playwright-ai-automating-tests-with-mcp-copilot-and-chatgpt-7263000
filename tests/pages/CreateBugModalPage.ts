import { type Locator, type Page } from '@playwright/test';

export class CreateBugModalPage {
  constructor(private readonly page: Page) { }

  get dialog(): Locator {
    return this.page.getByRole('dialog', { name: 'Create bug' });
  }

  get titleInput(): Locator {
    return this.dialog.locator('#bug-title');
  }

  get severitySelect(): Locator {
    return this.dialog.locator('#bug-severity');
  }

  get ownerInput(): Locator {
    return this.dialog.locator('#bug-owner');
  }

  get descriptionTextarea(): Locator {
    return this.dialog.locator('#bug-description');
  }

  get saveButton(): Locator {
    return this.dialog.getByRole('button', { name: 'Save' });
  }

  get cancelButton(): Locator {
    return this.dialog.getByRole('button', { name: 'Cancel' });
  }

  async createBug({
    title,
    severity = 'mid',
    owner = 'buggy',
    description = 'Temporary bug for verification',
  }: {
    title: string;
    severity?: string;
    owner?: string;
    description?: string;
  }) {
    await this.titleInput.fill(title);
    await this.severitySelect.selectOption(severity);
    await this.ownerInput.fill(owner);
    await this.descriptionTextarea.fill(description);
    await this.saveButton.click();
  }
}
