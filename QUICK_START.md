# Skill Saarthi Landing Page - Quick Start Checklist

## ✅ Pre-Installation Checklist

Before you start, make sure you have:

- [ ] Node.js 16.0 or higher installed
- [ ] npm or yarn package manager
- [ ] A text editor (VS Code recommended)
- [ ] Git installed (for version control)
- [ ] ~1GB free disk space

**Check Node version:**
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
```

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```
**Expected time:** 2-3 minutes

✅ **Check:** No errors in terminal. `node_modules` folder created.

### Step 2: Start Development Server
```bash
npm run dev
```
**Expected output:**
```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

✅ **Check:** Server running without errors.

### Step 3: Open in Browser
Visit `http://localhost:3000` in your web browser.

✅ **Check:** Landing page loads with no white screen.

---

## 🔍 Post-Installation Verification (10 Minutes)

### 1. Visual Elements ✅

- [ ] Accessibility bar visible at very top
- [ ] Navbar present with "Skill Saarthi" branding
- [ ] Hero section with large headline visible
- [ ] Background colors are correct (light blue, white)
- [ ] Text is readable and properly formatted
- [ ] Images/icons load correctly

### 2. Navigation & Interactions ✅

- [ ] Click "Home" link - smooth scroll to top
- [ ] Click "About" link - scroll to problem section
- [ ] Click "Features" link - scroll to features section
- [ ] Click "How It Works" link - scroll to timeline
- [ ] Click "Impact" link - scroll to metrics
- [ ] Try hamburger menu on mobile (< 1024px width)

### 3. Login Dropdown ✅

- [ ] Click "Sign In" button in navbar
- [ ] Dropdown menu appears with smooth animation
- [ ] "As a Student" option visible and clickable
- [ ] "As a Government Officer" option visible and clickable
- [ ] "As an Admin" option visible and clickable
- [ ] Click "As a Student" → navigates to `/login/student`
- [ ] Click "As a Government Officer" → navigates to `/login/government`
- [ ] Click "As an Admin" → navigates to `/login/admin`
- [ ] Each login page shows placeholder content
- [ ] "Back to Home" button on login pages works

### 4. Animations ✅

- [ ] Smooth scroll behavior when clicking links
- [ ] Hero section content animates on page load
- [ ] Cards fade in and slide up
- [ ] Hover effects on buttons and cards
- [ ] Timeline animates when scrolling into view
- [ ] Number counters animate in Impact section
- [ ] No janky or stuttering animations

### 5. Accessibility ✅

- [ ] Font size increase button works (A+)
- [ ] Font size decrease button works (A-)
- [ ] Font size reset button works
- [ ] High contrast toggle changes colors
- [ ] Language dropdown offers multiple options
- [ ] Tab through page - focus visible on all elements
- [ ] All buttons/links keyboard accessible

### 6. Help Widget ✅

- [ ] Floating "Ask Saarthi" button appears bottom-right
- [ ] Click button - chat modal opens
- [ ] Close (X) button closes modal
- [ ] Quick question buttons work
- [ ] Can type and send custom messages
- [ ] Bot responds with predefined answers

### 7. Responsive Design ✅

**Mobile (< 640px):**
- [ ] No horizontal scroll
- [ ] Hamburger menu appears
- [ ] Navigation stacks vertically
- [ ] Buttons full width
- [ ] Hero image is vertical/responsive
- [ ] Timeline is vertical
- [ ] Text readable without zoom

**Tablet (640-1024px):**
- [ ] 2-column grid for cards
- [ ] Proportional spacing
- [ ] Images scale appropriately

**Desktop (> 1024px):**
- [ ] Full navbar visible (no hamburger)
- [ ] Multi-column layouts
- [ ] Horizontal timeline
- [ ] Large images/illustrations

### 8. Browser Console ✅

Open browser DevTools (F12) and check Console tab:

- [ ] No red error messages
- [ ] No warnings about missing dependencies
- [ ] No 404 errors for assets

**Example of what should NOT appear:**
```
❌ GET http://localhost:3000/missing-file.js 404
❌ TypeError: Cannot read property...
❌ Missing required prop...
```

### 9. Performance ✅

- [ ] Page loads in < 3 seconds
- [ ] Smooth 60fps scrolling
- [ ] No lag when clicking buttons
- [ ] Animations run smoothly

### 10. Links & Routing ✅

- [ ] All internal links work
- [ ] External links work (if any)
- [ ] Login routes properly configured
- [ ] No broken links in footer

---

## 📋 Pre-Deployment Checklist

Before deploying to production, complete this checklist:

### Code Quality
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Code is formatted and clean
- [ ] No hardcoded values (use config/env)

### Content & Copy
- [ ] No placeholder text remaining
- [ ] All typos fixed
- [ ] Links point to correct URLs
- [ ] Contact email is correct
- [ ] Disclaimer is present and accurate

### Functionality
- [ ] All buttons have hover states
- [ ] All interactive elements respond
- [ ] Navigation works on all breakpoints
- [ ] Login dropdown works smoothly
- [ ] Help widget is functional

### Accessibility
- [ ] WCAG AA contrast compliance ✅
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Reduced motion respected

### Responsive Design
- [ ] Mobile layout tested
- [ ] Tablet layout tested
- [ ] Desktop layout tested
- [ ] No horizontal scroll on mobile
- [ ] Text readable on all sizes

### Performance
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] CSS/JS minified

### SEO
- [ ] Meta tags present
- [ ] Title tag is descriptive
- [ ] Meta description is accurate
- [ ] Open Graph tags set
- [ ] Sitemap present (if applicable)

### Security
- [ ] HTTPS enabled (for production)
- [ ] No sensitive data in code
- [ ] Environment variables used for secrets
- [ ] CSP headers configured
- [ ] No known vulnerabilities: `npm audit`

### Browser Testing
- [ ] Chrome/Chromium ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Edge ✅
- [ ] Mobile browsers ✅

---

## 🐛 Troubleshooting Common Issues

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or kill the process using port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

---

### Issue: "npm: command not found"

**Solution:**
```bash
# Reinstall Node.js from https://nodejs.org
# Or update PATH environment variable
```

---

### Issue: "Animations not working"

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run dev
```

---

### Issue: "Styles not loading correctly"

**Solution:**
```bash
# Rebuild Tailwind
npx tailwindcss -i ./app/globals.css -o ./output.css

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

---

### Issue: "Login pages show 404"

**Solution:**
- Check files exist in `/app/login/` directory
- Verify file names are lowercase
- Restart dev server: `npm run dev`

---

### Issue: "Help widget not appearing"

**Solution:**
- Check `components/HelpWidget.tsx` exists
- Verify it's imported in `app/page.tsx`
- Check browser console for errors
- Clear browser cache (Ctrl+Shift+Delete)

---

## 📞 Getting Help

If you encounter issues:

1. **Check the console** (F12 → Console tab)
2. **Read error messages carefully**
3. **Check the README.md** for detailed info
4. **Check IMPLEMENTATION_GUIDE.md** for component help
5. **Contact:** hello@skillsaarthi.gov.in

---

## 🎯 Next Steps After Setup

### Option 1: Customize the Content
Edit files in `components/` to change text, colors, and structure.

### Option 2: Add Backend Integration
Create `.env.local` with your API URL and use fetch in components.

### Option 3: Implement Login Pages
Update `/app/login/*/page.tsx` with real authentication logic.

### Option 4: Deploy to Production
Follow the deployment guide in IMPLEMENTATION_GUIDE.md

---

## ✨ Success Indicators

You'll know everything is working correctly when:

✅ Landing page loads immediately
✅ All sections visible and animated
✅ Navigation works smoothly
✅ Login dropdown functional
✅ Help widget interactive
✅ No console errors
✅ Mobile view responsive
✅ All links work
✅ Accessibility features functional
✅ Ready for presentation!

---

## 📝 Notes

- **Development Server:** Runs on `http://localhost:3000`
- **Build Command:** `npm run build`
- **Production Start:** `npm start`
- **Environment File:** `.env.local`
- **Documentation:** See README.md and IMPLEMENTATION_GUIDE.md

---

**Last Updated:** 2026-09-07
**Status:** Ready for SIH Presentation
**Time to Complete:** ~15 minutes
