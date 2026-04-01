# PB Partners Hub

## Current State
Multi-page insurance partner support website with Home, About, Partner Support, Insurance Services, Contact, Partner Onboarding, and several other pages. Has navigation, WhatsApp floating button, chatbot, and footer.

## Requested Changes (Diff)

### Add
- New page: `/offline-quote` — "Offline Quote Made Easy" feature page
- Shows the 7-step WhatsApp-based offline motor insurance quote workflow
- Prominent WhatsApp CTA button to start the process
- Visual step-by-step flow with icons
- Link in navigation header

### Modify
- App.tsx: add route for `/offline-quote`
- Header.tsx: add "Offline Quote" nav link
- HomePage.tsx: add a highlight section for the offline quote feature

### Remove
- Nothing

## Implementation Plan
1. Create `OfflineQuotePage.tsx` with 7-step visual flow
2. Register route in App.tsx
3. Add nav link in Header
4. Add teaser section on HomePage
