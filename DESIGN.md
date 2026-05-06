# Focus Timer - Design System

## Design Direction: Skeuomorphic Flip Clock

**Primary Experience:** Realistic flip clock with tangible depth and texture. The interface centers around physical affordances—cards that flip, shadows that project, surfaces that reflect light.

**Visual Strategy:** Skeuomorphism with restraint. Rich tactile details where they matter (flip cards), minimal decoration elsewhere.

## Color Strategy

**Dark neutral foundation with subtle blue tint**

All colors use OKLCH with minimal chroma (0.005-0.008) tinted toward 240° hue (blue).

### Tinted Neutrals
```css
Background: oklch(8% 0.005 240)     /* Deep charcoal with blue tint */
Text: oklch(100% 0.005 240)         /* Near-white with blue tint */
Card surfaces: #2a2a2a → #0a0a0a    /* Gradient for flip cards */
Secondary text: #808080             /* Mid-gray for subtexts */
```

### Opacity Scale
```
Full opacity:     1.0
Primary text:     1.0
Secondary text:   0.5
Tertiary text:    0.3
Borders rest:     0.10-0.15
Borders hover:    0.30-0.40
Backgrounds:      0.02-0.08
```

## Typography

### Font Stack
```css
font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
/* Inter from next/font/google, weights 300, 400, 500, 600 */
```

**Font Features Enabled:**
- `tnum` (tabular numerals) - Fixed-width numbers for perfect alignment
- `cv08` - Alternate character variant for cleaner appearance

### Scale & Weights
```
Timer display:  3.5-6.5rem / medium (500)
Headings:       1.25-2rem / semibold (600)
Section labels: 0.625-0.75rem / medium (500)
Body:           1rem / normal (400)
Buttons:        0.75-0.875rem / semibold (600)
Secondary:      0.75-0.875rem / medium (500)
Tertiary:       0.75rem / normal (400)
```

### Letter Spacing
```
Timer:         0.05em (tight for large numbers)
Headings:      0.15-0.2em (moderate tracking)
Body:          0.05-0.08em (tight for readability)
Labels:        0.2-0.25em (open for small caps)
All uppercase for UI elements
```

### Hierarchy Strategy
- **Contrast through weight:** 3 distinct levels (400 → 500 → 600)
- **Progressive sizing:** 1.25 ratio minimum between levels
- **Tabular numerals:** All numbers use fixed-width for alignment
- **Reduced tracking:** Tighter letter-spacing than previous monospace
- **Medium as baseline:** Timer uses weight 500 for presence without heaviness

## Spacing Scale

Based on 4px base unit:

```
xs:   12px  (gap-3)
sm:   16px  (gap-4)
md:   20px  (gap-5)
lg:   32px  (gap-8, space-y-8)
xl:   40px  (p-10)
2xl:  64px  (p-16)
```

## Elevation

### Glass Effect (Minimal)
```css
backdrop-filter: blur(8px);
background: oklch(0% 0.005 240 / 0.3);
border: 1px solid oklch(100% 0.008 240 / 0.08);
box-shadow: 0 4px 12px 0 oklch(0% 0.005 240 / 0.3);
```

### Card Shadow (Subtle)
```css
box-shadow: 0 8px 24px oklch(0% 0.005 240 / 0.4);
```

### Flip Card Depth (Rich Skeuomorphism)
```css
box-shadow:
  0 8px 16px rgba(0, 0, 0, 0.6),      /* Main shadow */
  0 2px 4px rgba(0, 0, 0, 0.4),        /* Contact shadow */
  inset 0 1px 0 rgba(255, 255, 255, 0.08),  /* Top highlight */
  inset 0 -1px 0 rgba(0, 0, 0, 0.5);   /* Bottom edge */

/* Shadow projection beneath card */
radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%);
```

## Border Radius

```
sm:   12px  (rounded-xl)
md:   16px  (rounded-2xl)
lg:   32px  (rounded-[2rem])
full: 9999px (rounded-full)
```

## Motion

### Durations
```
Fast:     150ms
Default:  300ms
Slow:     500ms
Shimmer:  1000ms
```

### Easing
```css
/* Ease-out quint for natural deceleration */
cubic-bezier(0.16, 1, 0.3, 1)
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Interactive States

### Button States
```
Default:  base styles
Hover:    opacity change, scale, or border
Focus:    outline-2 outline-offset-2 outline-white
Active:   scale-[0.98]
Disabled: opacity-30 cursor-not-allowed
```

### Scale Transforms
```
Hover lift:   translateY(-2px)
Active press: scale-[0.98]
Selected:     scale-[1.02]
```

## Components

### Primary Button
```tsx
className="
  bg-white text-black 
  py-5 px-8 
  rounded-2xl 
  shadow-lg shadow-white/20
  hover:bg-white/95 
  active:scale-[0.98]
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-white
  transition-all duration-300
"
```

### Secondary Button
```tsx
className="
  border border-white/15
  py-5 px-8
  rounded-2xl
  backdrop-blur-sm
  hover:border-white/40 hover:bg-white/5
  active:scale-[0.98]
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-white
  transition-all duration-500
"
```

### Glass Card
```tsx
className="
  glass-effect glow-effect
  rounded-[2rem]
  p-10 md:p-16
"
```

## Accessibility

### Contrast Ratios
- Normal text: 7:1+ (AAA)
- Large text: 4.5:1+ (AA)
- UI components: 3:1+ (AA)

### Focus Indicators
Always visible 2px white outline with 2px offset

### ARIA Labels
Required on:
- Icon-only buttons
- Range inputs
- Modal dialogs
- Toggle buttons

### Keyboard Navigation
All interactive elements must be keyboard accessible with visible focus states

## Design Principles

### Primary Experience
- **Flip clock is default** - Skeuomorphic cards are the hero experience
- **Tangible depth** - Shadows, highlights, and reflections create physical presence
- **Purposeful decoration** - Rich detail on flip cards, restraint elsewhere

### Banned Patterns
- ❌ Gradient text (`background-clip: text`)
- ❌ Pure `#000` or `#fff` (use tinted OKLCH)
- ❌ Excessive glassmorphism (reduced to minimal blur)
- ❌ Multiple layered glows (single subtle shadow only)
- ❌ Decorative shimmer animations

### Required
- ✅ OKLCH for all colors except flip card surfaces
- ✅ Reduced motion support
- ✅ Focus indicators on all interactive elements
- ✅ ARIA labels where needed
- ✅ Skeuomorphic depth on primary interactive elements
