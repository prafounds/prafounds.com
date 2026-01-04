# PraFounds Site - Local Development Setup

## Quick Start

### Prerequisites
- Node.js 18+ (recommend v22.x)
- PostgreSQL database (or mock connection)

### Installation & Running

```bash
cd PraFounds-Site

# Install dependencies
npm install

# Set database URL (required to start server)
export DATABASE_URL="postgresql://localhost/prafounds"

# Start development server
npm run dev

# Server will start on http://localhost:5000
# (or http://localhost:3000 if PORT=3000 is set)
```

## What's New

### Visual Enhancements Added
1. **Floating Background Orbs** - Subtle animated elements in the background
2. **Gradient Backgrounds** - Each section has sophisticated gradient overlays
3. **Premium Card Effects** - Cards lift and glow on hover
4. **Texture Overlays** - Subtle noise pattern for depth
5. **Smooth Animations** - All transitions are fluid and GPU-accelerated

### New Components
- `client/src/components/BackgroundEffects.tsx` - Background animation system

### Updated Files
- `client/src/App.tsx` - Added BackgroundEffects component
- `client/src/pages/Home.tsx` - Applied premium styling to all sections
- `client/src/index.css` - Added 20+ new animation utilities
- `server/index.ts` - Fixed localhost binding for local development

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm start

# Validate database
npm run db:push
```

## Visual Effects to Notice

### Hero Section
- Floating orbs in background
- Smooth fade-in animations on scroll
- Premium typography treatment

### What We Do Section
- Gradient background with dot pattern
- Smooth text reveal animations
- Subtle depth with layered backgrounds

### Investment Focus Cards
- Premium card styling with borders
- Hover elevation effect (lift)
- Glow effect on hover
- Smooth color transitions

### Philosophy Section (Dark)
- Dark background with texture overlay
- Enhanced contrast for readability
- Smooth animations for list items

### Support Cards
- Grid layout with premium cards
- Gradient separator bars
- Hover lift animations
- Interactive feedback states

### Pipeline Section
- Gradient background treatment
- Premium card for featured investment
- Pulsing activity indicator

### Call-to-Action Section
- Professional dark background
- Interactive elements with hover states
- Smooth scaling on button hover

## Customization Guide

### Changing Colors
Edit `client/src/index.css` - CSS variables in `:root` section:
```css
:root {
  --primary: 215 40% 18%;      /* Main color (Navy) */
  --accent: 160 30% 35%;        /* Accent color (Green) */
  /* ... other colors ... */
}
```

### Adjusting Animations
Edit animation durations in `client/src/index.css`:
```css
@keyframes float {
  /* Adjust translateY/X values for movement range */
  /* Adjust duration in animation property */
}
```

### Modifying Background Effects
Edit `client/src/components/BackgroundEffects.tsx`:
```tsx
// Adjust orb count
for (let i = 0; i < 4; i++) { createOrb(); } // Change 4 to desired count

// Adjust colors
background: radial-gradient(...); // Change colors here
```

### Changing Section Backgrounds
Edit `client/src/pages/Home.tsx`:
```tsx
// Add/remove classes from section elements:
<section className="gradient-bg-2 noise-bg"> {/* Add gradient-bg-1, etc */}
```

## Troubleshooting

### Database Connection Error
```
Error: DATABASE_URL must be set. Did you forget to provision a database?
```
**Solution:** Set the DATABASE_URL environment variable:
```bash
export DATABASE_URL="postgresql://localhost/prafounds"
npm run dev
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Use a different port:
```bash
PORT=3001 npm run dev
```

### Animations Not Smooth
- Check browser DevTools Performance tab
- Ensure GPU acceleration is enabled
- Close other CPU-heavy applications
- Test on latest browser version

## Browser Support

✅ **Fully Supported:**
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

⚠️ **Partial Support:**
- IE 11 (No animations, but functional)

## Performance Tips

1. **Enable Hardware Acceleration**
   - Chrome: Settings → System → toggle "Use hardware acceleration"
   - Firefox: about:config → gfx.webrender.enabled → true

2. **Monitor Bundle Size**
   ```bash
   npm run build
   # Check dist/public folder size
   ```

3. **Profile Performance**
   - Chrome DevTools → Performance tab → Record
   - Look for smooth 60fps animations

## Testing the Enhancements

### Test Checklist
- [ ] Page loads without errors
- [ ] Floating orbs animate smoothly in background
- [ ] Gradient backgrounds display correctly
- [ ] Cards lift on hover
- [ ] Text animations trigger on scroll
- [ ] Mobile responsive - test on mobile devices
- [ ] Dark mode works correctly
- [ ] All links and forms functional

### Mobile Testing
```bash
# Get your machine's IP
ipconfig getifaddr en0  # macOS
# or
hostname -I  # Linux

# Access from mobile: http://<your-ip>:5000
```

## Deployment

### Building for Production
```bash
npm run build

# This creates:
# - dist/index.cjs (server)
# - dist/public/ (frontend assets)
```

### Running Production Build
```bash
npm run start
```

## Need Help?

1. Check the ENHANCEMENT_SUMMARY.md for detailed feature overview
2. Review the component files for implementation details
3. Check browser console for error messages
4. Verify all dependencies are installed: `npm list`

---

**Last Updated:** January 4, 2026
**Node Version Tested:** v22.19.0
**Package Manager:** npm v10.x+
