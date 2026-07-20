# Delete Bug Test Plan

## Application Overview

End-to-end test plan for deleting a bug in BuggyBoard, with a fresh bug created during test setup before the delete flow is exercised.

## Test Scenario

### Delete a freshly created bug from the edit modal

**Seed:** `tests/seed.spec.ts`

**File:** `tests/delete-bug/delete-bug.spec.ts`

**Test Setup**
1. Sign in to BuggyBoard with a valid user from users.json.
2. Navigate to the board page.
3. Open the create-bug modal by clicking New Bug.
4. Create a fresh bug with a unique title such as Delete Me - <timestamp>, provide valid values for the required fields, and click Save.
5. Confirm the new bug is saved and appears on the board.
6. Open the newly created bug from the board so the edit modal is available for deletion.

**Steps**
1. Verify the edit modal opens for the freshly created bug.
2. Confirm the modal shows the bug details and includes a Delete button.
3. Click Delete.
4. Verify the modal closes and the bug no longer appears on the board.

**Expect**
- A fresh bug is created as part of the test setup before deletion begins.
- The delete action removes the bug from the board.
- The edit modal closes after the bug is deleted.
