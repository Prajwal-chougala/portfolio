---
name: Prajwal Portfolio
colors:
  primary: '#c084fc'
  on-primary: '#0f172a'
  secondary: '#22d3ee'
  on-secondary: '#0f172a'
  background: '#0f172a'
  on-background: '#f1f5f9'
  surface: '#1e293b'
  on-surface: '#cbd5e1'
  outline: '#334155'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-bold:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

# Design System: Prajwal Portfolio
**Project ID:** 1278497750829339042

## 1. Visual Theme & Atmosphere
The portfolio utilizes a sophisticated, high-end agency aesthetic combining minimalist layout grids with smooth interactive transitions. The interface leverages a dual-theme configuration designed to shift between clean, clinical light canvas spaces and vibrant, nocturnal dark spaces. High-contrast layout borders (1px width) are paired with subtle, low-opacity glassmorphic layers to communicate depth and technical elegance without visual clutter.

## 2. Color Palette & Roles

### Primary Foundation
- **Canvas Light** (#f8fafc) — Root background for light theme
- **Canvas Dark** (#0f172a) — Root background for dark theme
- **Surface Light** (#ffffff) — Cards, containers, and elevated panels for light theme
- **Surface Dark** (#1e293b) — Cards, containers, and elevated panels for dark theme

### Accent & Interactive
- **Accent Purple (Light: #6d28d9 / Dark: #c084fc)** — Primary branding accent, call-to-actions, focus states, and primary glows
- **Accent Cyan (Light: #0284c7 / Dark: #22d3ee)** — Secondary tech accent, statistics, active states, and secondary glows
- **Accent Teal (Light: #0f766e / Dark: #2dd4bf)** — Status pills, badges, success states
- **Accent Magenta (Light: #c2185b / Dark: #f43f5e)** — Interactive highlights, secondary metrics

### Typography & Text Hierarchy
- **Heading Light** (#0f172a) — Primary headers in light theme
- **Heading Dark** (#f1f5f9) — Primary headers in dark theme
- **Body Light** (#334155) — Paragraphs and details in light theme
- **Body Dark** (#cbd5e1) — Paragraphs and details in dark theme
- **Muted Light** (#64748b) — Metadata, labels, and helper text in light theme
- **Muted Dark** (#94a3b8) — Metadata, labels, and helper text in dark theme

---

## 3. Typography Rules

### Hierarchy & Weights
- **Display Headings**: Rendered using the **Syne** typeface with heavy weights (ExtraBold/Black, '800' or '900') and tight tracking (-0.02em). These headings are styled to establish strong, structural focal points.
- **Body Text**: Rendered using **Geist Sans** (fallback to system sans-serif) at regular/light weights ('300' or '400') with relaxed line-heights (1.5 to 1.6) to guarantee legibility.
- **Monospace Text**: Rendered using **JetBrains Mono** ('700' or '500') for status fields, coordinates, numbers, technical statistics, code previews, and labels.

---

## 4. Component Stylings

### Buttons
- **Shape & Structure**: Rounded pill profiles (minimum height 44px for touch targets) with thin, crisp borders.
- **Transitions**: Smooth state changes (background and borders transition over 0.2s to 0.3s). 
- **States**: Primary buttons fill with solid accent color. Secondary buttons use transparent glass backgrounds with subtle outline colors that glow on hover.

### Cards & Bento Panels
- **Aesthetic**: Glassmorphism (`.glass-card`). Uses backdrop filter blurs (8px) and a hairline border (1px) with high-translucency variables matching the active theme.
- **Corner Rounding**: Standardized on `0.75rem` (12px) for card components to preserve a clean grid alignment.

---

## 5. Layout Principles

### Grid & Spacing
- Uses a unified Grid rhythm. Spacing increments scale on a 4px/8px baseline.
- **Layout Margins**: Responsive page padding (20px margins on mobile, 40px on desktop) to ensure data-dense rows are contained cleanly within a max-width envelope (1400px).
- **Responsive Behavior**: Clean, single-column stacked hierarchy on mobile devices (< 768px) to eliminate horizontal scrolling.
