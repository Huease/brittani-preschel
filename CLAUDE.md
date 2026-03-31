# Project: Brittani Preschel Personal Brand Site
# Client: Brittani Preschel, CEO D2 Advertising
# Stack: Plain HTML/CSS/JavaScript
# Deploy: Cloudflare Pages via GitHub
# Repo: Huease/brittani-preschel
# Live URL: brittani-preschel.pages.dev
# Working file: index.html ONLY — never touch v2.html

## Brand colors
--color-primary: #CE0058 (pink — CTAs only)
--color-accent: #8B6914 (dark gold — borders, accents)
--color-bg-1: #0a0a0a (darkest sections)
--color-bg-2: #111111 (mid sections)
--color-bg-3: #131313 (lighter sections)

## Fonts
Display: Barlow Condensed (headlines)
Body: Lato (paragraph text)
Never use Inter or Roboto

## Layout rules — NON-NEGOTIABLE
Every section inner wrapper:
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;
  box-sizing: border-box;
Mobile breakpoint max-width 768px: padding: 0 24px
Section vertical padding: 80-100px
Two-column grid: grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
Body text: 17px minimum, line-height: 1.7
Hero H1: clamp(48px, 8vw, 80px)

## Pending items (needs Brittani input)
- [BRITTANI_LINKEDIN_URL] — replace in footer + schema
- [BRITTANI_INSTAGRAM_URL] — replace in footer + schema
- [BRITTANI_FACEBOOK_URL] — replace in footer + schema
- [WEB3FORMS_API_KEY_PLACEHOLDER] — replace in both forms

## Mandatory workflow
1. Read index.html before any edit
2. Grep for actual class names before writing CSS
3. Screenshot before and after every visual change
4. Run Playwright to verify before pushing to GitHub
5. Commit message must describe what changed

## Known lessons
MISTAKE: Writing CSS fixes without reading actual class names first
CORRECTION: Always grep the file for exact class names before writing any CSS

MISTAKE: Using different padding values across sections
CORRECTION: All section wrappers use exactly padding: 0 80px desktop, 0 24px mobile

MISTAKE: Fixing centering when the real problem was column alignment
CORRECTION: Ask what they see visually before assuming which CSS property to change

## Do not touch
- v2.html (reference backup only)
- backup-v1.html
- backup-original-index.html
