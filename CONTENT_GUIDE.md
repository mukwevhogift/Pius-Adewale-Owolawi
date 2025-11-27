# Quick Content Update Guide

## 📝 How to Update Content

### 1. Hero Section (Name, Title, Stats)
**File**: `components/Hero.tsx`

```typescript
// Line 107-112: Update name
<h1 id="hero-name">
  Prof. Pius <br/>Owolawi
</h1>

// Line 95-102: Update stats
<blockquote>200+</blockquote>
<p>Publications</p>
```

### 2. Experience Section
**File**: `components/Experience.tsx`

```typescript
// Line 47-90: Add/edit experiences
const experiences = [
  {
    title: "Your Title",
    organization: "Organization Name",
    period: "Start – End",
    description: "Description...",
    highlights: ["Achievement 1", "Achievement 2"]
  }
];
```

### 3. Education Section
**File**: `components/Education.tsx`

```typescript
// Line 60-95: Add/edit qualifications
const educationData = [
  {
    degree: "Degree Name",
    institution: "University Name",
    year: "Year Range",
    specialization: "Focus area"
  }
];
```

### 4. Research Projects
**File**: `components/Project.tsx`

```typescript
// Line 36-85: Update research areas
const researchAreas = [
  {
    title: "Research Area",
    icon: "ri-icon-name",
    color: "from-blue-500 to-cyan-500",
    projects: ["Project 1", "Project 2"]
  }
];
```

### 5. Awards & Recognition
**File**: `components/Achieved.tsx`

```typescript
// Line 38-90: Add/edit awards
const awards = [
  {
    title: "Award Name",
    year: "Year",
    organization: "Organization",
    icon: "ri-trophy-line",
    color: "from-yellow-500 to-orange-500",
    description: "Description"
  }
];
```

### 6. Contact Information
**File**: `components/Footer.tsx`

```typescript
// Line 24-60: Update contact details
<a href="tel:+27829750484">+27 82 975 0484</a>
<a href="mailto:OwolawiPA@tut.ac.za">OwolawiPA@tut.ac.za</a>
```

### 7. Community Initiatives
**File**: `components/RecommendationText.tsx`

```typescript
// Line 51-110: Update initiatives
<h3>Initiative Name</h3>
<p>Description...</p>
```

## 🎨 Styling Quick Reference

### Colors
```typescript
// Gradient combinations
"from-blue-500 to-cyan-500"     // Blue gradient
"from-purple-500 to-pink-500"   // Purple gradient
"from-green-500 to-emerald-500" // Green gradient
"from-orange-500 to-red-500"    // Orange gradient
```

### Icons (Remix Icon)
```html
<i className="ri-trophy-line"></i>      <!-- Trophy -->
<i className="ri-graduation-cap-line"></i> <!-- Education -->
<i className="ri-building-line"></i>    <!-- Building -->
<i className="ri-global-line"></i>      <!-- Global -->
<i className="ri-team-line"></i>        <!-- Team -->
```

Find more icons at: https://remixicon.com/

### Common Patterns

**Card with gradient border:**
```html
<div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
  Content here
</div>
```

**Stat display:**
```html
<div className="text-center">
  <h4 className="text-5xl font-bold text-white mb-2">200+</h4>
  <p className="text-gray-300">Publications</p>
</div>
```

**Icon with gradient background:**
```html
<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
  <i className="ri-icon-name text-3xl text-white"></i>
</div>
```

## 🖼️ Adding New Images

1. Add image to `/public/img/`
2. Reference in component:
```html
<img src="/img/your-image.jpg" alt="Description" />
```

## 🚀 Testing Changes

1. Save your file
2. Check http://localhost:3000
3. Changes auto-reload (hot reload enabled)

## 📱 Responsive Design

Components automatically adjust for mobile. Test on different screen sizes:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🎯 Common Tasks

### Add a new award:
1. Open `components/Achieved.tsx`
2. Add to `awards` array (line 38)
3. Save and check browser

### Update contact info:
1. Open `components/Footer.tsx`
2. Update phone/email (line 24-60)
3. Save and verify

### Add research project:
1. Open `components/Project.tsx`
2. Add to `researchAreas` or `industrialProjects`
3. Save and scroll to projects section

## 💡 Tips

- Use consistent color schemes (blue, purple, green gradients)
- Keep text concise and impactful
- Use icons to add visual interest
- Test on mobile after changes
- Maintain the premium aesthetic

## 🆘 Need Help?

- Check component files for examples
- All components follow similar patterns
- Icons: https://remixicon.com/
- Tailwind CSS: https://tailwindcss.com/docs
