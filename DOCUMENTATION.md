# Prof. Pius Adewale Owolawi - Portfolio Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Development](#development)
7. [Deployment](#deployment)
8. [SEO Optimization](#seo-optimization)
9. [Content Management](#content-management)
10. [Customization Guide](#customization-guide)
11. [Performance Optimization](#performance-optimization)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a professional academic portfolio website for **Prof. Pius Adewale Owolawi**, PhD, ECSA, MIEEE, SAIEE - Distinguished Professor and Assistant Dean at Tshwane University of Technology.

### Purpose
- Showcase academic achievements and research excellence
- Highlight 200+ publications and R94M+ research funding
- Display professional credentials and awards
- Provide contact information for collaboration

### Target Audience
- Academic institutions
- Research collaborators
- Industry partners
- Students and postgraduate candidates
- Conference organizers

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.5.4** - React framework with server-side rendering
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing
- **Custom CSS** - Additional styling and animations

### Animations
- **GSAP 3.13.0** - Professional-grade animation library
- **@gsap/react 2.1.2** - React integration for GSAP
- **Lenis 1.3.11** - Smooth scrolling library

### Icons & Fonts
- **Remix Icon 4.6.0** - Icon library
- **Google Fonts** - Bebas Neue, Montserrat, Inter

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript** - Type checking

---

## 📁 Project Structure

```
professor-portfolio/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Home page
│   ├── robots.ts             # Robots.txt configuration
│   └── sitemap.ts            # XML sitemap generator
│
├── components/
│   ├── Achieved.tsx          # Awards & recognition section
│   ├── Education.tsx         # Education & qualifications
│   ├── Experience.tsx        # Leadership & experience (commented out)
│   ├── Footer.tsx            # Footer with contact info
│   ├── Gallery.tsx           # Image gallery (commented out)
│   ├── Hero.tsx              # Hero & about sections
│   ├── Preloader.tsx         # Loading animation
│   ├── Project.tsx           # Research & projects
│   ├── RecommendationText.tsx # Community impact
│   ├── SmoothScroll.tsx      # Smooth scrolling wrapper
│   ├── StructuredData.tsx    # SEO structured data
│   └── WhatHaveDone.tsx      # Key achievements
│
├── public/
│   └── img/                  # Images directory
│       ├── prof-owolawi.jpg
│       ├── prof-owolawi-2.jpg
│       ├── lab-4ir.jpg
│       ├── lab-drone.jpg
│       ├── lab-ai.jpg
│       ├── conference-1.jpg
│       ├── research-team.jpg
│       ├── award-ceremony.jpg
│       └── arrow.png
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
└── DOCUMENTATION.md
```

---

## ✨ Features

### 1. **Hero Section**
- Professional introduction with name and credentials
- Statistics showcase (200+ publications, R94M+ funding)
- Professional portrait with gradient background
- Smooth scroll indicator

### 2. **About Section**
- Comprehensive background information
- Three key highlights with icons
- Professional photo gallery
- Responsive card layout

### 3. **Education & Qualifications**
- 6 academic degrees displayed in card format
- Professional certifications (8 badges)
- Ongoing studies section
- Animated timeline (desktop)
- Statistics summary

### 4. **Research & Projects**
- 6 research areas with horizontal scrolling
- Featured industrial projects
- Research impact statistics
- Color-coded categories

### 5. **Key Achievements**
- Horizontal scrolling showcase
- 6 major achievement categories
- Additional statistics
- Animated on scroll

### 6. **Honours & Recognition**
- 8 major awards displayed
- Professional memberships (5 organizations)
- Academic impact statistics
- Research philosophy quote

### 7. **Community Impact**
- 4 community initiatives
- Testimonials section
- Global partnerships (8 organizations)
- Social impact showcase

### 8. **Footer**
- Complete contact information
- Office addresses (SA & USA)
- Social media links
- Philosophy quotes
- Professional credentials

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager
- Git (optional)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd professor-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Add Images**
   Place the following images in `public/img/`:
   - `prof-owolawi.jpg` - Main portrait
   - `prof-owolawi-2.jpg` - Secondary portrait
   - `lab-4ir.jpg` - Laboratory image
   - `lab-drone.jpg` - Drone lab image
   - `lab-ai.jpg` - AI lab image
   - `conference-1.jpg` - Conference photo
   - `research-team.jpg` - Team photo
   - `award-ceremony.jpg` - Award photo

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Development Server
- Runs on `http://localhost:3000`
- Hot reload enabled
- Fast refresh for React components

### File Watching
- Automatic recompilation on file changes
- CSS updates without page reload
- Component hot reloading

---

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

### Deployment Platforms

#### **Vercel (Recommended)**
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

#### **Netlify**
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

#### **Custom Server**
```bash
npm run build
npm start
```

### Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://piusowolawi.com
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

---

## 🔍 SEO Optimization

### Implemented Features

#### **1. Metadata**
- Comprehensive title and description
- Keywords array for search engines
- Author and publisher information
- Open Graph tags for social media
- Twitter Card metadata

#### **2. Structured Data (JSON-LD)**
Located in `components/StructuredData.tsx`:
- Person schema
- Job title and affiliation
- Education and awards
- Professional memberships
- Social media profiles

#### **3. Sitemap**
Auto-generated at `/sitemap.xml`:
- All major sections included
- Priority and frequency settings
- Last modified timestamps

#### **4. Robots.txt**
Auto-generated at `/robots.txt`:
- Allow all search engines
- Sitemap reference
- Crawl directives

### SEO Best Practices

✅ **Technical SEO**
- XML Sitemap
- Robots.txt
- Canonical URLs
- Structured Data
- Meta tags
- Open Graph
- Twitter Cards

✅ **On-Page SEO**
- Optimized titles
- Meta descriptions
- Header hierarchy (H1, H2, H3)
- Alt text for images
- Internal linking

✅ **Performance**
- Fast loading times
- Optimized images
- Efficient CSS
- Minimal JavaScript

### Monitoring

**Google Search Console:**
1. Verify ownership
2. Submit sitemap
3. Monitor indexing
4. Track performance

**Google Analytics:**
1. Add tracking code
2. Monitor traffic
3. Track conversions

---

## 📝 Content Management

### Updating Content

#### **1. Personal Information** (`components/Hero.tsx`)

```tsx
// Update name (line 110-112)
<h1 id="hero-name">
  Prof. Pius <br />Owolawi
</h1>

// Update credentials (line 113)
<p>PhD, ECSA, MIEEE, SAIEE</p>

// Update statistics (lines 95-102)
<blockquote>200+</blockquote>
<p>Publications</p>
```

#### **2. Education** (`components/Education.tsx`)

```tsx
// Add/edit degrees (lines 77-126)
const educationData = [
  {
    degree: "PhD in Electronic Engineering",
    institution: "University Name",
    country: "Country",
    year: "2006 – 2010",
    specialization: "Focus area...",
    icon: "ri-graduation-cap-fill",
    color: "from-blue-600 to-cyan-600"
  }
];
```

#### **3. Research Projects** (`components/Project.tsx`)

```tsx
// Update research areas (lines 36-85)
const researchAreas = [
  {
    title: "Research Area",
    icon: "ri-brain-line",
    color: "from-blue-500 to-cyan-500",
    projects: ["Project 1", "Project 2"]
  }
];
```

#### **4. Awards** (`components/Achieved.tsx`)

```tsx
// Add/edit awards (lines 37-102)
const awards = [
  {
    title: "Award Name",
    year: "Year",
    organization: "Organization",
    icon: "ri-trophy-line",
    color: "from-yellow-500 to-orange-500",
    description: "Description..."
  }
];
```

#### **5. Contact Information** (`components/Footer.tsx`)

```tsx
// Update contact details (lines 24-60)
<a href="tel:+27829750484">+27 82 975 0484</a>
<a href="mailto:OwolawiPA@tut.ac.za">Email</a>
```

---

## 🎨 Customization Guide

### Color Scheme

The portfolio uses a gradient color scheme:

```css
/* Primary Colors */
Blue: #3b82f6
Purple: #9333ea
Slate: #0f172a

/* Background */
Light: #f8f8f8
Dark: #0f172a to #1e3a8a

/* Gradients */
from-blue-600 to-purple-600
from-slate-900 via-blue-900 to-slate-800
```

### Typography

```css
/* Headings */
font-family: "Bebas Neue", sans-serif

/* Body Text */
font-family: "Montserrat", sans-serif

/* Responsive Sizes */
Mobile: 14px base
Tablet: 15px base
Desktop: 16px base
```

### Icons

Using Remix Icon library:
```tsx
<i className="ri-trophy-line"></i>
<i className="ri-graduation-cap-fill"></i>
<i className="ri-building-line"></i>
```

Browse icons: [https://remixicon.com](https://remixicon.com)

### Animations

GSAP animations in components:
```tsx
gsap.from(".element", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: "#section",
    start: "top 80%"
  }
});
```

---

## ⚡ Performance Optimization

### Implemented Optimizations

1. **Image Optimization**
   - Responsive images
   - Proper sizing
   - Lazy loading (Next.js default)

2. **Font Loading**
   - Google Fonts with `display=swap`
   - Prevents FOIT (Flash of Invisible Text)

3. **CSS Optimization**
   - Tailwind CSS purging
   - Minimal custom CSS
   - Efficient selectors

4. **JavaScript**
   - Code splitting (Next.js)
   - Tree shaking
   - Minification

### Performance Metrics

Target scores:
- **Lighthouse Performance**: 90+
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1

### Testing

```bash
# Build production version
npm run build

# Test with Lighthouse
# Open Chrome DevTools > Lighthouse
```

---

## 🐛 Troubleshooting

### Common Issues

#### **1. Hydration Error**
**Problem:** Console warning about hydration mismatch

**Solution:** Already fixed with `suppressHydrationWarning` on body tag

#### **2. Images Not Loading**
**Problem:** Images show broken icon

**Solution:**
- Check images are in `public/img/`
- Verify file names match exactly
- Check file extensions (.jpg, .png)

#### **3. Animations Not Working**
**Problem:** GSAP animations don't trigger

**Solution:**
- Ensure component is client-side (`"use client"`)
- Check ScrollTrigger is registered
- Verify element selectors are correct

#### **4. Build Errors**
**Problem:** Build fails with TypeScript errors

**Solution:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### **5. Slow Performance**
**Problem:** Page loads slowly

**Solution:**
- Optimize images (compress, resize)
- Check network tab in DevTools
- Run Lighthouse audit
- Enable production mode

### Getting Help

1. Check console for errors
2. Review component code
3. Test in incognito mode
4. Clear browser cache
5. Restart development server

---

## 📞 Support & Contact

### Technical Support
- **Developer**: [Your Name]
- **Email**: [Your Email]
- **Documentation**: This file

### Prof. Owolawi Contact
- **Email**: OwolawiPA@tut.ac.za
- **Phone (SA)**: +27 82 975 0484
- **Phone (USA)**: +1 478 381 4264
- **Office**: Block 13, Room 153, TUT

---

## 📄 License

© 2025 Prof. Pius Adewale Owolawi. All rights reserved.

---

## 🔄 Version History

### Version 1.0.0 (November 27, 2025)
- ✅ Initial release
- ✅ Complete portfolio website
- ✅ SEO optimization
- ✅ Responsive design
- ✅ All sections implemented
- ✅ Production-ready

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Remix Icon](https://remixicon.com/)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema Markup Validator](https://validator.schema.org/)

---

**Last Updated:** November 27, 2025
**Maintained By:** Development Team
**Status:** Production Ready ✅
