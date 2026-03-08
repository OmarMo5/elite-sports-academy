

# Sports Academy Egypt — Full Website Plan

## Branding & Design System
- **Colors:** Primary #0057B8 (deep blue), #FFD700 (gold), #FFFFFF, #F0F0F0. Accents: #FF6F61 (red), #00C49F (green)
- **Fonts:** Montserrat Bold (headings), Poppins Semi-Bold (subheadings), Open Sans (body) via Google Fonts
- **Effects:** CSS 3D transforms, parallax scrolling, fade-in/stagger animations, hover transitions, floating keyframe animations
- **Dark/light mode** toggle with smooth transitions

---

## Pages to Build (in order)

### 1. Homepage
- **Hero:** Full-width gradient background with floating sports icons (CSS animated), dynamic headline + subtitle, particle-like dots animation, "Join Now" CTA with glow hover
- **Academy Overview:** Animated counters (branches, students, years, awards) + interactive milestone timeline
- **Featured Sports:** 3D-perspective cards (swimming, tennis, etc.) — hover reveals coach name, schedule snippet, achievements
- **Competitions Slider:** Upcoming events carousel with highlight cards
- **Testimonials:** Parent/student quotes with avatar cards
- **Footer:** Links, social icons, newsletter signup

### 2. About Page
- Academy story with parallax image sections
- Coach team grid — flip cards (front: photo + name, back: bio + social links)
- Awards showcase — animated carousel of trophies/achievements with counters

### 3. Sports Programs Page
- Filterable grid (by age, skill level, branch)
- Sport cards with CSS 3D tilt effect, animated progress bars for stats
- Each card expands or links to detail: schedule, coaches, achievements
- Floating sport illustrations (CSS keyframe animations)

### 4. Branches Page
- Stylized Egypt map (SVG-based) with animated location markers
- Click marker → modal/popup with branch details, images, address, contact
- Branch card list with hover lift animations

### 5. Membership/Pricing Page
- Animated pricing table (3 tiers) with highlighted recommended plan
- Benefits comparison, hover effects on plan cards
- Subscription form with input validation and success/error toasts

### 6. Competitions & Events Page
- Interactive timeline with tabs (past/upcoming)
- Photo/video gallery in masonry grid, hover zoom, lightbox overlay
- Event stats: animated bar/radial charts (using Recharts)

### 7. Gallery Page
- Filterable photo grid (sports, competitions, training)
- 3D card hover effect, smooth transitions, lightbox for full view

### 8. Contact Page
- Animated contact form with validation (name, email, phone, message)
- Embedded map placeholder (static image or iframe-ready)
- Contact info cards with hover animations, social links

### 9. Member Dashboard (Mock Data)
- Login page with form validation (mock auth — no real backend)
- Dashboard layout with sidebar navigation
- **Child Profile View:**
  - Attendance table with animated data
  - Performance charts: radial progress (per sport), line charts (progress over time) using Recharts
  - Strengths/weaknesses cards with visual indicators
  - Upcoming classes/competitions calendar view
  - Notifications feed (achievements, reminders)
  - "Download Report" button (mock PDF generation)
- Clean, card-based layout consistent with brand colors

---

## Global Components
- **Sticky navbar** with smooth scroll, mobile hamburger menu
- **Animated preloader** with academy logo
- **Dark/light mode** toggle in navbar
- **Scroll-to-top** button
- **Responsive** across desktop, tablet, mobile

## Tech Approach
- All CSS 3D effects (perspective transforms, card flips, parallax via scroll listeners)
- Recharts for dashboard charts
- React Router for page navigation
- Mock data files for all dynamic content (easy to swap with real backend later)
- Google Fonts loaded via CSS import

