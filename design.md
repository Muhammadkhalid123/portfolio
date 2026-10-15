# Aura

## Overview

**Product:** Aura
**URL:** https://offset-advertisin.aura.build/
**Surface type:** marketing
**Audience:** Business decision-makers and potential customers
**Brand character:** Conversion-focused marketing presence with a balanced color system and single-typeface typography.

> **Note:** Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

- Consistency over novelty — reuse existing patterns before inventing new ones.
- Token-driven — every visual decision references a token, not a magic number.
- Accessible by default — compliance is a baseline, not a feature.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-4 | `#FFFFFF` | Background |
| color-1 | `#171717` | Text Primary |
| color-3 | `#E6E6E6` | Border |
| color-2 | `#D4D4D4` | Text Light |

## Typography

**Font stack:** Inter

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 11px | Captions, metadata |
| text-sm | 16px | Labels, secondary text |

**Weight scale:** 400 · 500
**Line heights:** 16.5px · 24px

## Spacing

**Base unit:** 8px

`space-1: 4px` · `space-2: 8px` · `space-3: 16px`

## Shapes

**Border radius:** `radius-sm: 12px`

## Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px, rgba(0, 0, 0, 0.15) 0px 10px 10px 0px, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-slow:** `color 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), fill 0.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-slow:** `0.5s`

## Components

- **Buttons:** 2 detected
- **Links:** 1 detected
- **Lists:** 1 detected
- **Images:** 1 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (12px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Concise, confident, implementation-focused. Avoid filler preambles.
