# Skill Saarthi - Landing Page

A professional, government-quality landing page for the **Skill Saarthi** platform - an employment outcome tracking and skilling impact measurement system for India.

## 🎯 Overview

Skill Saarthi is a longitudinal outcome tracking platform that helps measure the real impact of skilling programmes by tracking employment outcomes, identifying skill gaps, and providing data-driven insights to government stakeholders.

**Status:** Prototype for Smart India Hackathon (SIH)

## ✨ Features

### 🌐 Landing Page Components

1. **Accessibility Bar** - Government-grade accessibility features
   - Font size controls
   - High contrast mode
   - Screen reader support
   - Language selection (English, Hindi, Bengali, Telugu, Tamil)

2. **Professional Navbar**
   - Government branding
   - Navigation menu
   - **Login/Sign-In Dropdown** with three options:
     - Student
     - Government Officer
     - Admin

3. **Hero Section**
   - Compelling headline with color-coded emphasis
   - Career journey visualization
   - Clear CTAs for Demo and Learn More

4. **Problem Section**
   - Explains the challenge in skilling tracking
   - Visual problem cards with statistics

5. **Solution Section**
   - Three pillars: Track, Analyse, Improve
   - Clean, professional design

6. **Features Section** (6 core features)
   - AI Skill-Gap Engine
   - Employment Tracking
   - Follow-up System
   - Wage Progression
   - Government Analytics
   - AI-Powered Insights

7. **How It Works**
   - Interactive journey timeline (responsive)
   - Desktop: Horizontal layout
   - Mobile: Vertical layout

8. **Two Portals Section**
   - Student Portal features
   - Government Portal features
   - Professional card design

9. **Impact Section**
   - Demo metrics with animated counters
   - Clearly marked as prototype data
   - Disclaimer banner

10. **Why It Matters**
    - Dark navy section with benefits checklist
    - Animated background elements

11. **Final CTA Section**
    - Strong call-to-action
    - Multiple CTAs

12. **Footer**
    - Professional government-style footer
    - Four columns of links
    - Social media links
    - Copyright and disclaimer

13. **Floating Help Widget**
    - "Ask Saarthi" prototype chatbot
    - Predefined responses
    - Quick question buttons

### 🎨 Design Features

- **Government Digital Platform Aesthetic**
  - Professional, trustworthy, citizen-centric
  - Navy blue (#063B73) primary color
  - Saffron (#E85D04) accent color
  - Light blue sections for visual separation
  - Excellent whitespace

- **Animations**
  - Smooth scroll-reveal animations
  - Fade-up, slide-up transitions
  - Subtle hover effects
  - Counter animations for metrics
  - Staggered card animations

- **Responsive Design**
  - Desktop-first but fully responsive
  - Mobile hamburger menu
  - Adaptive grids and layouts
  - Touch-friendly interactions

- **Accessibility**
  - Semantic HTML
  - Proper heading hierarchy
  - Keyboard navigation
  - Focus visible states
  - ARIA labels
  - High contrast support
  - Reduced motion preferences

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
skill-saarthi/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main landing page
│   └── globals.css             # Global styles
├── components/
│   ├── AccessibilityBar.tsx    # Accessibility controls
│   ├── Navbar.tsx              # Navigation with login dropdown
│   ├── Hero.tsx                # Hero section with career journey
│   ├── Problem.tsx             # Problem statement
│   ├── Solution.tsx            # Solution with 3 pillars
│   ├── Features.tsx            # 6 key features
│   ├── HowItWorks.tsx          # Journey timeline
│   ├── Portals.tsx             # Student & Government portals
│   ├── Impact.tsx              # Demo metrics section
│   ├── WhyItMatters.tsx        # Benefits section
│   ├── CTA.tsx                 # Final call-to-action
│   ├── Footer.tsx              # Professional footer
│   └── HelpWidget.tsx          # Floating help chatbot
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── next.config.js              # Next.js config
└── README.md                   # This file
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment Ready:** Vercel-optimized

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Navy | #063B73 | Primary CTA, headings |
| Deep Navy | #082B52 | Footer, dark backgrounds |
| Primary Blue | #0B5CAB | Links, accents |
| Saffron | #E85D04 | Important CTAs, highlights |
| Light Blue | #F3F8FD | Section backgrounds |
| Text Dark | #18324B | Main text |
| Text Muted | #617386 | Secondary text |
| Success Green | #16803C | Success states |
| Warning | #D97706 | Warnings |

## 📱 Responsive Breakpoints

- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (lg)

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast WCAG AA compliant
- ✅ ARIA labels and descriptions
- ✅ High contrast mode toggle
- ✅ Font size adjustment
- ✅ Screen reader support
- ✅ Reduced motion preference support

## 🔗 Navigation & Login Routing

### Navigation Links
- Home: `/`
- About: `/#about`
- Features: `/#features`
- How It Works: `/#how-it-works`
- Impact: `/#impact`
- Resources: `/#resources`

### Login Routes (Placeholder)
- Student: `/login/student`
- Government Officer: `/login/government`
- Admin: `/login/admin`

**Note:** The login pages are not built yet. Implement these pages as needed.

## 📊 Demo Features

### Student Portal Would Include
- Skill Profile
- AI Skill-Gap Analysis
- Employment Tracking
- Follow-up Tracking
- Wage Progression

### Government Portal Would Include
- Cohort Analytics
- Employment Outcomes
- Skill Gap Trends
- Provider Performance
- AI Insights

## ⚠️ Important Notes

### What This Is NOT

This is **only the landing page** prototype. It does NOT include:
- ❌ Real databases
- ❌ Authentication system
- ❌ Student dashboard
- ❌ Government dashboard
- ❌ Admin dashboard
- ❌ Real WhatsApp/SMS APIs
- ❌ Government authentication
- ❌ Blockchain
- ❌ Mobile app

### What This IS

- ✅ Production-quality landing page
- ✅ Professional government digital platform aesthetic
- ✅ Complete navigation structure
- ✅ Login dropdown (routes not implemented)
- ✅ Smooth animations
- ✅ Fully responsive
- ✅ Accessible
- ✅ Ready for SIH presentation
- ✅ Prototype chatbot widget

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on every push

```bash
npm install -g vercel
vercel login
vercel
```

### Deploy to Other Platforms

The project uses standard Next.js, so it can be deployed to:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway
- Any Node.js hosting

## 📝 Customization

### Colors
Edit colors in `tailwind.config.js`:
```javascript
colors: {
  'primary-navy': '#063B73',
  // ... customize colors
}
```

### Fonts
Update font stack in `app/globals.css`:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...
```

### Content
Edit component content directly in each component file in `components/` folder.

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Styling Issues
```bash
rm -rf .next
npm run dev
```

### Build Errors
```bash
npm install
npm run build
```

## 📞 Support

For questions or issues with this landing page:
- Email: hello@skillsaarthi.gov.in
- GitHub Issues: (if applicable)

## 📜 License

This is a prototype for Smart India Hackathon (SIH).

## 🏛️ Legal Notice

**Skill Saarthi** is a **prototype and not an official Government of India product**. This landing page is created for demonstration purposes only as part of the Smart India Hackathon.

All demo metrics and statistics are sample data for illustration purposes only.

## 🙏 Credits

Built with:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

---

**Built for Smart India Hackathon** | **Track • Analyse • Build Better Futures**
