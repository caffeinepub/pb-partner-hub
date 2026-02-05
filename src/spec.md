# Specification

## Summary
**Goal:** Add a PB Partner Hub brand logo asset and ensure it renders consistently across the site (Header/Footer) as a static frontend file.

**Planned changes:**
- Generate a square, transparent PB Partner Hub logo PNG and add it under `frontend/public/assets/generated/` with the exact filename `pb-partner-hub-logo-transparent.dim_200x200.png`.
- Ensure the logo is served as a frontend static asset (no backend routing) and is used anywhere the site logo appears (at minimum: Header and Footer), without broken images.

**User-visible outcome:** The Header and Footer display a crisp PB Partner Hub logo (including at ~40x40 size) loaded from `/assets/generated/pb-partner-hub-logo-transparent.dim_200x200.png`.
