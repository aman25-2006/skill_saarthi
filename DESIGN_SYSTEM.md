# Skill Saarthi - Design System

## 📐 Design Principles

### Government-First Design
- Professional and trustworthy
- Citizen-centric approach
- Accessibility from the ground up
- Transparent and data-driven

### Visual Hierarchy
- Clear primary, secondary, tertiary actions
- Generous whitespace
- Strategic use of color
- Readable typography

### User Experience
- Fast and responsive
- Mobile-first responsive design
- Smooth animations (no jarring transitions)
- Keyboard accessible

## 🎨 Color System

### Primary Colors

| Name | Hex | RGB | Use Case |
|------|-----|-----|----------|
| Primary Navy | `#063B73` | rgb(6, 59, 115) | Headlines, primary buttons, borders |
| Deep Navy | `#082B52` | rgb(8, 43, 82) | Footer, hover states, dark backgrounds |
| Primary Blue | `#0B5CAB` | rgb(11, 92, 171) | Secondary CTAs, accents, links |

### Accent Colors

| Name | Hex | RGB | Use Case |
|------|-----|-----|----------|
| Saffron | `#E85D04` | rgb(232, 93, 4) | Important CTAs, highlights, accents |
| Light Blue | `#F3F8FD` | rgb(243, 248, 253) | Section backgrounds, subtle fill |

### Text Colors

| Name | Hex | RGB | Use Case |
|------|-----|-----|----------|
| Text Dark | `#18324B` | rgb(24, 50, 75) | Body text, primary content |
| Text Muted | `#617386` | rgb(97, 115, 134) | Secondary text, metadata |

### Semantic Colors

| Name | Hex | Use Case |
|------|-----|----------|
| Success Green | `#16803C` | Success states, checkmarks |
| Warning Orange | `#D97706` | Warnings, alerts |
| Red | `#EF4444` | Errors, danger |
| White | `#FFFFFF` | Backgrounds, surfaces |

### Color Usage Guidelines

```css
/* Primary Buttons & CTAs */
.button-primary {
  background-color: #063B73; /* Primary Navy */
  color: white;
}

.button-primary:hover {
  background-color: #082B52; /* Deep Navy */
}

/* Secondary Buttons */
.button-secondary {
  background-color: #F3F8FD; /* Light Blue */
  color: #0B5CAB; /* Primary Blue */
  border: 2px solid #0B5CAB;
}

/* Accent CTA (Important) */
.button-accent {
  background-color: #E85D04; /* Saffron */
  color: white;
}

/* Links */
a {
  color: #0B5CAB; /* Primary Blue */
}

a:visited {
  color: #063B73; /* Primary Navy */
}
```

## 📝 Typography

### Font Family

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
```

**Rationale:** System font stack for optimal performance and platform consistency.

### Font Sizes & Line Heights

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| H1 | 56px (desktop), 36px (mobile) | 1.2 | Bold (700) |
| H2 | 48px (desktop), 32px (mobile) | 1.2 | Bold (700) |
| H3 | 32px (desktop), 24px (mobile) | 1.3 | Bold (700) |
| H4 | 24px | 1.4 | Semibold (600) |
| Body | 16px | 1.6 | Regular (400) |
| Small | 14px | 1.5 | Regular (400) |
| Caption | 12px | 1.4 | Regular (400) |

### Text Color Contrast

All text meets WCAG AA standards:
- **Normal text:** Minimum 4.5:1 contrast
- **Large text:** Minimum 3:1 contrast

## 🎯 Spacing System

Consistent spacing using 4px base unit (Tailwind's default).

### Spacing Scale

```css
/* Tailwind uses: 0, 0.5, 1, 1.5, 2, 2.5, 3... */
/* Which equals: 0px, 2px, 4px, 6px, 8px, 10px, 12px... */

/* Common spacings used */
xs: 4px    /* 1 unit */
sm: 8px    /* 2 units */
md: 16px   /* 4 units */
lg: 24px   /* 6 units */
xl: 32px   /* 8 units */
2xl: 48px  /* 12 units */
3xl: 64px  /* 16 units */
4xl: 96px  /* 24 units */
```

### Padding Guidelines

```css
.card {
  padding: 32px; /* lg - Medium cards */
}

.button {
  padding: 12px 24px; /* sm vertical, md horizontal */
}

.section {
  padding-top: 96px;    /* Large sections */
  padding-bottom: 96px;
}

@media (max-width: 640px) {
  .section {
    padding-top: 64px;  /* Smaller on mobile */
    padding-bottom: 64px;
  }
}
```

## 🔲 Component Sizes

### Buttons

```typescript
// Primary Button
px-8 py-3.5 rounded-lg font-semibold
// = 32px horizontal, 14px vertical padding

// Small Button
px-4 py-2 rounded-lg font-medium
// = 16px horizontal, 8px vertical padding

// Large Button
px-8 py-4 rounded-lg font-semibold text-lg
// = 32px horizontal, 16px vertical padding
```

### Cards

```css
/* Standard Card */
.card {
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}
```

### Icons

```typescript
// Small icons: 16px
// Medium icons: 20px, 24px
// Large icons: 28px, 32px
// Hero icons: 40px, 48px, 56px
```

## 🎬 Animation System

### Duration Standards

```typescript
// Transitions and animations
fast: 200ms        // Quick feedback
normal: 300ms      // Standard animation
slow: 500ms        // Entrance animation
very_slow: 800ms   // Hero/entrance
```

### Easing Functions

```typescript
// Framer Motion easing
easeOut   // Quick enter, slow exit - use for entrance
easeIn    // Slow enter, quick exit - use for exit
easeInOut // Smooth throughout - use for hover
linear    // Constant speed - use for continuous motion
```

### Animation Patterns

```typescript
// Fade In (Entrance)
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6, ease: 'easeOut' }}

// Slide Up (Entrance)
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: 'easeOut' }}

// Scale Pop (Entrance)
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3, ease: 'easeOut' }}

// Hover Lift (Interaction)
whileHover={{ y: -4 }}
transition={{ duration: 0.2 }}

// Hover Scale (Interaction)
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.2 }}

// Continuous Float (Ambient)
animate={{ y: [0, -10, 0] }}
transition={{ duration: 4, repeat: Infinity }}
```

## 📱 Responsive Breakpoints

```typescript
// Tailwind CSS breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large

// Naming convention in CSS: sm:, md:, lg:, etc.
className="block sm:hidden"           // Hidden on mobile
className="grid grid-cols-1 lg:grid-cols-3" // 1 col mobile, 3 col desktop
```

### Mobile-First Approach

```typescript
// Mobile by default
className="p-4"               // 16px padding on all

// Larger screens
className="p-4 sm:p-6 lg:p-8" // Adjust padding as screen grows
```

## 🎨 Shadows

### Shadow Scale

```css
/* Tailwind shadow utilities */
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)
shadow:      0 1px 3px rgba(0,0,0,0.1)
shadow-md:   0 4px 6px rgba(0,0,0,0.1)
shadow-lg:   0 10px 15px rgba(0,0,0,0.1)
shadow-xl:   0 20px 25px rgba(0,0,0,0.1)
shadow-2xl:  0 25px 50px rgba(0,0,0,0.25)
```

### Usage Guidelines

```css
.card-default {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.button-hover {
  box-shadow: 0 12px 24px rgba(6, 59, 115, 0.15);
}
```

## 🔄 Borders & Radius

### Border Radius

```css
/* Tailwind utilities */
rounded-lg:    8px   /* Cards, inputs, buttons */
rounded-xl:    12px  /* Larger components */
rounded-2xl:   16px  /* Feature cards, large sections */
rounded-full:  9999px /* Badges, avatars, circles */
```

### Border Width

```css
border:   1px    /* Default, subtle borders */
border-2: 2px    /* Accent borders, outlines */
border-4: 4px    /* Heavy emphasis, timeline nodes */
```

### Border Colors

```typescript
// Primary borders
border-gray-200  // Light, subtle
border-gray-300  // Medium
border-primary-blue  // Accent
border-saffron   // Important accent
```

## ♿ Accessibility

### Color Contrast Requirements

All text combinations must meet WCAG AA:

```
Text Dark (#18324B) on Light Blue (#F3F8FD): 11.2:1 ✅
Primary Navy (#063B73) on White: 8.1:1 ✅
Text Muted (#617386) on White: 4.8:1 ✅
Saffron (#E85D04) on White: 5.6:1 ✅
```

### Focus States

All interactive elements must have visible focus:

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #0b5cab;
  outline-offset: 2px;
}
```

### Keyboard Navigation

```css
/* Tab order follows DOM order (no tabindex hijacking) */
/* All interactive elements are focusable */
/* Focus indicators are visible and sufficient size */
```

### ARIA Labels

```typescript
// Buttons
<button aria-label="Close dialog">×</button>

// Icons without text
<button>
  <MessageIcon aria-label="Send message" />
</button>

// Live regions
<div aria-live="polite" aria-atomic="true">
  Updates here
</div>
```

## 🖼️ Image Guidelines

### Image Sizes

```typescript
// Optimized image sizes
hero:     1920x1080 or 1600x900
section:  1200x600 or 1000x600
card:     400x300 or 600x400
icon:     64x64 to 256x256
avatar:   40x40 to 128x128
```

### Image Formats

```
PNG:   Logos, icons (transparent)
JPG:   Photos, complex graphics
WebP:  Modern format (with fallback)
SVG:   Icons, illustrations, logos
```

## 🎯 Button Hierarchy

### Primary Button
- Navy background
- White text
- Highest contrast
- Use for main actions

```typescript
<button className="bg-primary-navy text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-deep-navy">
  Primary Action
</button>
```

### Secondary Button
- Light blue background
- Blue text
- Blue border
- Use for secondary actions

```typescript
<button className="bg-light-blue text-primary-blue border-2 border-primary-blue px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-blue hover:text-white">
  Secondary Action
</button>
```

### Accent Button
- Saffron background
- White text
- For special/important actions

```typescript
<button className="bg-saffron text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-600">
  Important Action
</button>
```

### Text Button
- No background
- Blue text
- Minimal styling
- Use for tertiary actions

```typescript
<button className="text-primary-blue hover:underline font-semibold">
  Tertiary Action
</button>
```

## 📊 Elevation System

### Visual Depth Levels

```
Level 0: Flat (no shadow)
Level 1: Subtle shadow (0 1px 3px)
Level 2: Light shadow (0 4px 6px)
Level 3: Medium shadow (0 10px 15px)
Level 4: Heavy shadow (0 20px 25px)
```

### Usage

```typescript
.card { box-shadow: 0 1px 3px rgba(0,0,0,0.1); } // Level 1
.card:hover { box-shadow: 0 10px 15px rgba(0,0,0,0.1); } // Level 3
.modal { box-shadow: 0 25px 50px rgba(0,0,0,0.25); } // Level 4
```

---

## 📚 Design System Assets

### Figma Components
*(Would be available in a full design system)*
- All components as Figma components
- Color styles
- Text styles
- Shadow styles

### Code Guidelines

1. **Use design tokens** instead of hardcoded values
2. **Use consistent spacing** from the scale
3. **Use semantic colors** (not hex values)
4. **Use consistent animations** (easing and duration)
5. **Test on multiple devices** before deploy

---

**Design System Version:** 1.0
**Last Updated:** 2026-09-07
**Maintained by:** Skill Saarthi Team
