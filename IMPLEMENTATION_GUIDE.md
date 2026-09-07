# Skill Saarthi Landing Page - Implementation Guide

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Installation & Setup](#installation--setup)
3. [Project Structure](#project-structure)
4. [Component Documentation](#component-documentation)
5. [Customization Guide](#customization-guide)
6. [Deployment Guide](#deployment-guide)
7. [Testing & Quality Checks](#testing--quality-checks)
8. [FAQ](#faq)

## 🎯 Project Overview

### What is Skill Saarthi?

Skill Saarthi is a government digital platform designed to track employment outcomes and measure the real impact of skilling programmes. The landing page presents this platform in a professional, accessible, and visually engaging manner.

### Key Statistics

- **13 Sections** with distinct purposes
- **100+ Components** with smooth animations
- **Fully Responsive** design
- **WCAG AA Accessible** with accessibility features
- **Production-Ready** code
- **TypeScript** for type safety

### Target Users

- Government officials
- Training providers
- Students/Job seekers
- Policy makers
- Educational institutions

## 🚀 Installation & Setup

### Step 1: Prerequisites

Ensure you have installed:
- **Node.js** 16.0+: [Download](https://nodejs.org/)
- **npm** or **yarn**: Usually comes with Node.js
- **Git**: For version control

### Step 2: Clone/Setup Project

```bash
# Navigate to project directory
cd "d:\skill saarthi"

# Install dependencies
npm install
# or
yarn install
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Step 4: Verify Installation

Check if:
- ✅ Accessibility bar appears at top
- ✅ Navbar with login dropdown works
- ✅ Smooth scroll animations
- ✅ Responsive design (test on mobile)
- ✅ Help widget appears at bottom-right
- ✅ No console errors

## 📁 Project Structure

### Root Configuration Files

```
next.config.js          - Next.js configuration
tailwind.config.js      - Tailwind CSS design tokens
tsconfig.json           - TypeScript configuration
postcss.config.js       - CSS processing
package.json            - Dependencies and scripts
.gitignore              - Git ignore rules
.env.example            - Environment variable template
README.md               - Quick start guide
```

### App Directory

```
app/
├── layout.tsx           - Root layout with metadata
├── page.tsx             - Main landing page (imports all components)
├── globals.css          - Global styles and CSS variables
└── login/
    ├── student/page.tsx         - Student login placeholder
    ├── government/page.tsx      - Government login placeholder
    └── admin/page.tsx           - Admin login placeholder
```

### Components Directory

Each component is a reusable, self-contained piece:

```
components/
├── AccessibilityBar.tsx     - Top accessibility controls
├── Navbar.tsx               - Header with navigation and login dropdown
├── Hero.tsx                 - Hero section with career journey
├── Problem.tsx              - Problem statement with visual cards
├── Solution.tsx             - Three pillars solution
├── Features.tsx             - Six key features grid
├── HowItWorks.tsx           - Journey timeline (responsive)
├── Portals.tsx              - Student & Government portal cards
├── Impact.tsx               - Demo metrics with animations
├── WhyItMatters.tsx         - Dark section with benefits
├── CTA.tsx                  - Final call-to-action
├── Footer.tsx               - Professional footer
└── HelpWidget.tsx           - Floating AI chatbot
```

## 📚 Component Documentation

### 1. AccessibilityBar

**Purpose:** Provides accessibility controls at the top of the page.

**Features:**
- Font size adjustment (80-150%)
- High contrast toggle
- Screen reader info
- Language selection (5 languages)
- Country selection

**Key Props:** None (self-contained)

**Customization Points:**
```typescript
// In AccessibilityBar.tsx
const handleFontDecrease = () => {
  // Adjust min/max values here
  if (fontSize > 80) setFontSize(fontSize - 10);
};
```

**Languages Available:**
- English
- Hindi (हिन्दी)
- Bengali (বাংলা)
- Telugu (తెలుగు)
- Tamil (தமிழ்)

---

### 2. Navbar

**Purpose:** Sticky navigation with branding and login dropdown.

**Features:**
- Government branding at top
- Skill Saarthi logo with tagline
- 6 navigation links
- Search icon placeholder
- **Login dropdown with 3 options:**
  - Student
  - Government Officer
  - Admin

**Routing:**
```typescript
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Features', href: '/#features' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Impact', href: '/#impact' },
  { name: 'Resources', href: '/#resources' },
];

const loginOptions = [
  { label: 'As a Student', href: '/login/student', ... },
  { label: 'As a Government Officer', href: '/login/government', ... },
  { label: 'As an Admin', href: '/login/admin', ... },
];
```

**Mobile Behavior:**
- Hamburger menu on screens < 1024px
- Full nav available when menu opened
- Touch-friendly spacing

---

### 3. Hero

**Purpose:** First impression with compelling headline and career journey visualization.

**Features:**
- Dual-tone headline (navy + saffron)
- Supporting text
- Two CTAs (Try Demo, Learn More)
- Responsive career journey illustration
- Animated decorative elements

**Customization:**
```typescript
// Edit headline
<span className="text-primary-navy">Your headline here</span>

// Edit stages
const careerStages = [
  { label: 'Stage 1', delay: 0 },
  { label: 'Stage 2', delay: 0.2 },
  // ...
];
```

---

### 4. Problem

**Purpose:** Explain the challenge in skilling outcome tracking.

**Features:**
- Problem statement text
- 4 problem cards with icons
- Scroll-triggered animations
- Responsive grid

**Cards:**
- Training Completed (90%)
- Employment Rate (?)
- Skill Gaps (Invisible)
- Long-term Retention (?)

---

### 5. Solution

**Purpose:** Present the three-pillar solution.

**Features:**
- Solution headline
- 3 pillar cards with gradient icons
- Animated connecting arrows
- Hover elevation effects

**The Three Pillars:**
1. **Track** - Employment and career outcomes
2. **Analyse** - Skill gaps and outcome patterns
3. **Improve** - Training programmes using data-driven insights

---

### 6. Features

**Purpose:** Showcase 6 key platform features.

**Features Included:**
1. AI Skill-Gap Engine
2. Employment Tracking
3. Follow-up System
4. Wage Progression
5. Government Analytics
6. AI-Powered Insights

**Each Feature Card Has:**
- Gradient icon
- Title
- Description
- Hover animations

---

### 7. HowItWorks

**Purpose:** Show the complete journey from training to follow-up.

**Desktop View:** Horizontal timeline with connecting line

**Mobile View:** Vertical timeline with left border

**6 Stages:**
1. Training
2. Assessment
3. Skill Gap
4. Apprenticeship
5. Employment
6. Follow-up

**Responsive Behavior:**
- Desktop (lg): 6-column horizontal grid with line
- Mobile/Tablet: Vertical flex with staggered animations

---

### 8. Portals

**Purpose:** Present Student and Government portals side-by-side.

**Student Portal Features:**
- Skill Profile & Assessment
- AI Skill-Gap Analysis
- Employment Tracking
- Wage Progression
- Career Analytics

**Government Portal Features:**
- Cohort Analytics
- Employment Outcomes
- Skill Gap Trends
- Provider Performance
- AI Insights & Alerts

**Design:**
- Two equal-width cards (responsive)
- Different color themes (blue vs saffron)
- Clear CTAs to login pages

---

### 9. Impact

**Purpose:** Showcase platform impact with animated metrics.

**Demo Metrics:**
- 25,420 Trainees Tracked
- 68.4% Employment Rate
- 74.8% 6-Month Retention
- ₹19.4K Average Wage

**Features:**
- Animated number counters
- Disclaimer banner (clearly marked as demo data)
- Responsive grid layout

**Important:** All metrics are clearly marked as prototype demo data.

---

### 10. WhyItMatters

**Purpose:** Dark-themed section emphasizing importance.

**Features:**
- Dark navy background
- Animated background elements
- 6 benefits with checkmarks
- Animated hover effects

**Benefits:**
1. Better employment outcomes
2. Data-driven policy decisions
3. Stronger skilling ecosystems
4. Early identification of skill gaps
5. Long-term outcome tracking
6. Better programme impact measurement

---

### 11. CTA

**Purpose:** Final strong call-to-action.

**Features:**
- Large headline
- Supporting text
- Two primary buttons
- Scroll-triggered animations

**Buttons:**
- "Try Demo" (Saffron)
- "Explore How It Works" (Light Blue)

---

### 12. Footer

**Purpose:** Professional government-style footer.

**Sections:**
1. **Skill Saarthi** - Branding and description
2. **Quick Links** - Navigation links
3. **Resources** - FAQs, Help, Privacy, Terms
4. **Portals** - Login links

**Social Media:**
- GitHub
- Twitter
- LinkedIn
- Email

**Bottom:**
- Copyright notice
- Disclaimer (not official GoI product)

---

### 13. HelpWidget

**Purpose:** Floating AI chatbot for user support.

**Features:**
- Floating button (bottom-right)
- Animated modal popup
- Pre-defined responses
- Quick question buttons
- Disclaimer about prototype

**Quick Questions:**
- "What are the main features?"
- "How does it work?"
- "How do I login?"

**Responses Can Be Customized:**
```typescript
const predefinedResponses: { [key: string]: string } = {
  features: 'Your response here',
  'how does it work': 'Your response here',
  // ...
};
```

## 🎨 Customization Guide

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'primary-navy': '#063B73',        // Change primary color
  'deep-navy': '#082B52',           // Darker navy
  'primary-blue': '#0B5CAB',        // Secondary blue
  'saffron': '#E85D04',             // CTA color
  'light-blue': '#F3F8FD',          // Background
  // ...
}
```

### Change Fonts

Edit `app/globals.css`:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', /* YOUR FONT */, sans-serif;
```

### Change Animation Speed

Edit individual component animations. Example in `Hero.tsx`:

```typescript
transition={{ duration: 0.8, ease: 'easeOut' }} // Change duration
```

### Change Logo/Branding

In `Navbar.tsx`:

```typescript
<div className="w-10 h-10 bg-gradient-to-br from-primary-navy to-primary-blue rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-lg">Your Logo</span> {/* Change this */}
</div>
```

### Add New Navigation Link

In `Navbar.tsx`:

```typescript
const navLinks = [
  { name: 'Home', href: '/' },
  // ... existing links
  { name: 'Your New Link', href: '/your-route' }, // Add here
];
```

### Customize Content

Most text content is directly in components. Simply edit the component files to change:
- Headlines
- Descriptions
- Button text
- Feature names
- Etc.

## 🚀 Deployment Guide

### Option 1: Vercel (Recommended)

**Easiest option with automatic deployments.**

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repo
4. Click "Deploy"
5. Vercel automatically builds and deploys

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=.next
```

### Option 3: Traditional Server (AWS, DigitalOcean, etc.)

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

3. Server will run on port 3000 (configurable)

### Environment Variables

Create `.env.production` for production:

```env
NEXT_PUBLIC_API_URL=https://your-production-domain.com
```

## 🧪 Testing & Quality Checks

### Run These Checks Before Deployment

#### 1. ✅ Navbar & Navigation

- [ ] All navigation links work
- [ ] Hamburger menu works on mobile
- [ ] Login dropdown opens/closes smoothly
- [ ] All 3 login options navigate correctly
- [ ] Navbar is sticky on scroll

#### 2. ✅ Responsive Design

- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] No horizontal overflow
- [ ] Text is readable on all sizes

#### 3. ✅ Animations

- [ ] Smooth scroll animations
- [ ] Hero animations work
- [ ] Card hover effects work
- [ ] Number counters animate in Impact section
- [ ] Timeline animations smooth

#### 4. ✅ Accessibility

- [ ] Tab through all links/buttons
- [ ] Focus states visible
- [ ] Accessibility bar works
- [ ] Font size increases/decreases
- [ ] High contrast toggle works
- [ ] Language dropdown works

#### 5. ✅ Help Widget

- [ ] Floating button appears
- [ ] Chat modal opens/closes
- [ ] Quick questions work
- [ ] Message sending works
- [ ] Can send custom messages

#### 6. ✅ Console

- [ ] No JavaScript errors
- [ ] No CSS warnings
- [ ] Images load correctly
- [ ] No 404 errors

#### 7. ✅ Browser Support

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### Performance Testing

Check performance with:

```bash
npm run build
npm start
```

Then use:
- Chrome DevTools Lighthouse
- WebPageTest
- GTmetrix

Target Scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

## ❓ FAQ

### Q: How do I add a new section to the landing page?

A: Create a new component in `components/` folder, then import and add it to `app/page.tsx`:

```typescript
import YourNewComponent from '@/components/YourNewComponent';

export default function Home() {
  return (
    <>
      <AccessibilityBar />
      <Navbar />
      <main id="main-content">
        {/* ... existing sections ... */}
        <YourNewComponent /> {/* Add your component */}
      </main>
      <Footer />
      <HelpWidget />
    </>
  );
}
```

### Q: How do I implement the login pages?

A: The login pages are currently placeholders at:
- `/app/login/student/page.tsx`
- `/app/login/government/page.tsx`
- `/app/login/admin/page.tsx`

Implement full authentication and UI as needed.

### Q: Can I use this with a backend API?

A: Yes! Add environment variables to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-api.com
```

Then use fetch or axios in components:

```typescript
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/endpoint`
);
```

### Q: How do I change the demo metrics?

A: Edit the `metrics` array in `Impact.tsx`:

```typescript
const metrics = [
  {
    value: 25420,  // Change this
    label: 'Trainees Tracked',
    // ...
  },
  // ...
];
```

### Q: How do I disable animations?

A: Edit `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Q: How do I add dark mode?

A: Tailwind CSS supports dark mode. Update `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  // ...
};
```

Then use `dark:` classes in components.

### Q: What's the difference between sections with IDs?

A: Sections with `id` attributes are linked in navbar for smooth scrolling:
- `#about` - Problem section
- `#features` - Features section
- `#how-it-works` - How It Works section
- `#impact` - Impact section
- `#resources` - Footer (no specific section)

---

## 📞 Support & Contact

- **Email:** hello@skillsaarthi.gov.in
- **GitHub Issues:** [Create an issue](https://github.com/your-repo/issues)

---

**Last Updated:** 2026-09-07
**Version:** 1.0.0
**Status:** Production Ready
