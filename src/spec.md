# Specification

## Summary
**Goal:** Add an admin-only approved-recipient list for WhatsApp numbers and enforce approval before sending WhatsApp messages via the Meta API.

**Planned changes:**
- Add backend storage for an admin-managed list of approved WhatsApp recipient phone numbers, pre-populated with `9168761915`.
- Expose admin-only backend methods to list, add, and remove approved recipient numbers; deny non-admin access.
- Update the WhatsApp admin dashboard to display the approved list, allow adding a number, and allow removing a number, with immediate UI updates and English success confirmations.
- Enforce approved-number checks on WhatsApp send: reject sends to non-approved recipients in the backend and show an English error message in the frontend; allow sends when the recipient is approved.

**User-visible outcome:** Admins can view and manage approved WhatsApp recipient numbers in the dashboard, and messages can only be sent to recipients that have been approved (including `9168761915`), with clear English success/error feedback.
