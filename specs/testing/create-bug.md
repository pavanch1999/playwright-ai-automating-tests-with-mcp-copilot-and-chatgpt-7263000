# Create Bug E2E Plan

## Application Overview

End-to-end test plan for the create-bug workflow in BuggyBoard, covering modal entry, form validation, save behavior, cancellation behavior, and board verification.

## Test Scenarios

### 1. Open create-bug modal from the board

**Seed:** `tests/seed.spec.ts`

**File:** `tests/create-bug.spec.ts`

**Steps:**
1. Sign in to BuggyBoard with a valid user from users.json.
2. Navigate to the board page.
3. Click the New Bug button.

**Expect:**
- The create-bug modal opens.
- The modal contains fields for title, severity, owner, and description.
- The modal includes Save and Cancel buttons.

### 2. Default owner is prefilled for the current user

**Steps:**
1. Sign in as a valid user.
2. Open the create-bug modal.

**Expect:**
- The owner field is prefilled with the signed-in user.

### 3. Create a new bug with valid data

**Steps:**
1. Open the create-bug modal.
2. Enter a title, choose a severity, confirm the owner value, and add a description.
3. Click Save.

**Expect:**
- The modal closes.
- The new bug is saved and appears in the board list.

### 4. Cancel creating a bug without saving

**Steps:**
1. Open the create-bug modal.
2. Enter some values in the form.
3. Click Cancel.

**Expect:**
- The modal closes.
- No new bug is saved.

### 5. Close the modal with the X button

**Steps:**
1. Open the create-bug modal.
2. Enter some values.
3. Click the X button in the upper-right corner.

**Expect:**
- The modal closes.
- No new bug is saved.

### 6. Close the modal with the Escape key

**Steps:**
1. Open the create-bug modal.
2. Enter some values.
3. Press Escape.

**Expect:**
- The modal closes.
- No new bug is saved.

### 7. Clicking outside the modal does not close it

**Steps:**
1. Open the create-bug modal.
2. Enter some values.
3. Click outside the modal backdrop.

**Expect:**
- The modal remains open.
- The entered values are preserved.

### 8. Save is blocked when required fields are blank

**Steps:**
1. Open the create-bug modal.
2. Leave one or more required fields empty.
3. Click Save.

**Expect:**
- The bug is not saved.
- The modal stays open.
- Validation feedback is shown for the missing fields.

### 9. Each required field is validated individually

**Steps:**
1. Open the create-bug modal.
2. Leave one field empty at a time while providing valid values for the others.
3. Click Save.

**Expect:**
- The bug is not saved for each invalid case.
- The modal remains open until the missing field is corrected.

## Additional Board Scenarios (discovered via Playwright MCP exploration)

The planner inspected the live `/board` page and confirmed presence of the search field, New Bug and Logout buttons, state filters (Open/Closed), and the bugs table with sortable headers. Based on that, add these scenarios to cover board behaviours:

### 10. Search bugs by title

**Steps:**
1. On the board, type a search query into the search field.
2. Observe the board updates as you type.

**Expect:**
- Only bugs whose titles match the normalized query are shown.
- Clearing the search shows all bugs again.

### 11. Sort board columns

**Steps:**
1. On the board, click a column header (ID, Severity, Title, Owner).
2. Click the same header again to toggle sort direction.

**Expect:**
- The active column shows a sort indicator.
- Bugs are ordered according to the selected column and direction.

### 12. Filter by bug state (Open / Closed)

**Steps:**
1. Click the Open or Closed state filter on the board.

**Expect:**
- The table displays only bugs with the selected state.
- Sorting and search continue to apply to the filtered set.

### 13. Edit bug from the board

**Steps:**
1. Click a bug row to open the edit-bug modal.
2. Confirm the modal shows ID (read-only), title, severity, owner, description, and state (if present).

**Expect:**
- The modal displays the bug details with ID read-only and other fields editable.
- A Save button updates the bug and closes the modal.

### 14. Delete bug from edit modal

**Steps:**
1. Open the edit modal for a bug.
2. Click Delete and confirm if a confirmation is required.

**Expect:**
- The bug is removed from the database and the board no longer displays it.

---

Notes from exploration:
- Search field was detected and is present on the board.
- New Bug and Logout buttons are present.
- The edit modal opened from a row but the `Delete` button and an explicit `state` select were not detected in the brief inspection; add the edit/delete scenarios but validate these controls in implementation tests.

