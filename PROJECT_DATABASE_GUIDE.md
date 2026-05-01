# Student Capstone Projects Database Guide

## Overview
This document explains the new professional-grade student capstone projects showcase system organized by technology domains.

## Project Structure

### Database Location
All project data is centralized in: `/lib/data.ts`

### Data Schema
Each project contains:
```typescript
{
  domain: ProjectDomain,                // Category: AI/ML, Web Dev, Mobile, etc.
  title: string,                        // Project name
  description: string,                  // 1-2 sentence overview
  videoLink: string,                    // YouTube video URL
  highlights?: string[],                // Key technologies (2-3 items)
}
```

### Available Domains
1. **AI/ML & Data Science** - Machine learning, NLP, predictive analytics
2. **Web Development** - Full-stack, Django, MERN applications
3. **Mobile Apps** - Flutter, React Native applications
4. **Healthcare & Biotech** - Medical AI, health monitoring, drug interactions
5. **Blockchain & Web3** - Smart contracts, transaction verification, security
6. **Business Intelligence** - Analytics, dashboards, data visualization

## How to Add New Projects

### Step 1: Update data.ts
```typescript
export const projects = [
  // Existing projects...
  {
    domain: "AI/ML & Data Science",                    // Choose domain
    title: "Your Project Title",
    description: "Short description of what the project does.",
    videoLink: "https://youtu.be/VIDEO_ID",           // YouTube link
    highlights: ["React", "TensorFlow", "Real-time"], // Max 3 highlights
  },
  // More projects...
]
```

### Step 2: Video Link Format
- **YouTube:** `https://youtu.be/VIDEO_ID` or `https://www.youtube.com/watch?v=VIDEO_ID`
- The system automatically extracts the video ID and embeds it

### Step 3: Best Practices
- Keep descriptions under 15 words
- Use 2-3 most relevant technologies as highlights
- Ensure video links are public and accessible
- Group similar projects together in the file

## File Architecture

### Components
- **ProjectsSection.tsx** - Desktop version with domain filtering and video modal
- **ProjectsSectionMobile.tsx** - Mobile-optimized version
- **ProjectVideoModal.tsx** - Elegant video player modal with keyboard shortcuts

### Features
✓ Domain-based filtering with tab selection
✓ Professional video modal (click card or "Watch Full Demo" button)
✓ Responsive design (desktop, tablet, mobile)
✓ Project statistics display (count, domains, industry-ready)
✓ Technology highlights badges
✓ Hover animations and transitions
✓ ESC key to close video modal
✓ Touch-friendly on mobile devices

## Filtering Logic

The system automatically:
1. Groups projects by domain
2. Filters when domain tab is clicked
3. Shows "All Projects" view by default
4. Displays filtered project count

```typescript
// Filter example
if (activeDomain === "All Projects") return projects
return projects.filter((p) => p.domain === activeDomain)
```

## Video Modal Features

- **Full-screen YouTube embedding**
- **Auto-extract video IDs** from YouTube URLs
- **ESC key support** to close modal
- **Click outside** to close modal
- **Professional styling** with shadow effects
- **Keyboard accessible** with aria-labels

## Database Scalability

### Current Stats
- **50+ Projects** delivered
- **6 Technology Domains**
- **Organized structure** for easy expansion

### To Add 100+ Projects
Simply add more objects to the `projects` array in `/lib/data.ts`. The system will automatically:
- Handle filtering
- Display in grid/list format
- Manage video playback
- Show statistics

## SEO & Meta Data

Projects are dynamically rendered with:
- Proper semantic HTML
- Accessible video players
- Schema-friendly structure
- Mobile viewport optimization

## Customization Options

### Colors & Styling
Located in components:
- Primary/accent colors use CSS variables
- Gradients defined in tailwind classes
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### Domain Names
To add new domains:
1. Update `projectDomains` array in `/lib/data.ts`
2. Update `ProjectDomain` type
3. Assign projects to new domain

### Video Settings
Modify in `ProjectVideoModal.tsx`:
- `autoplay=1` → set to 0 to disable autoplay
- `modestbranding=1` → removes YouTube logo
- `rel=0` → hides related videos

## Performance

- **Lazy-loaded iframes** (embedded only when visible)
- **Optimized filtering** with useMemo
- **Minimal re-renders**
- **Responsive images** (aspect-ratio preserved)

## Future Enhancements

Recommended additions:
- [ ] Search functionality across projects
- [ ] Sort by upload date / popularity
- [ ] Team member profile links
- [ ] Live demo links (separate from videos)
- [ ] Project ratings/testimonials
- [ ] Export project list to PDF
- [ ] Pagination for 100+ projects
- [ ] Analytics tracking for views

## Troubleshooting

### Video not playing?
- Verify YouTube URL is correct
- Check video is public/unlisted (not private)
- Ensure URL format: `youtu.be/ID` or `youtube.com/watch?v=ID`

### Domain not showing?
- Verify domain name matches exactly in `projectDomains` array
- Check spelling (case-sensitive)
- Add project to projects array with matching domain

### Styling issues?
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check CSS variables in globals.css

## API Reference

### Components

#### ProjectsSection (Desktop)
```typescript
<ProjectsSection />
// No props required - uses data from /lib/data.ts
```

#### ProjectsSectionMobile
```typescript
<ProjectsSectionMobile />
// No props required - uses data from /lib/data.ts
```

#### ProjectVideoModal
```typescript
<ProjectVideoModal
  isOpen={boolean}
  videoLink={string}        // YouTube URL
  title={string}            // Project title
  onClose={() => void}      // Close handler
/>
```

## Support & Updates

When updating projects:
1. ✓ Always add highlights array (2-3 items)
2. ✓ Keep descriptions concise
3. ✓ Test video URLs before adding
4. ✓ Maintain alphabetical order by domain (optional)
5. ✓ Run build to verify no errors

For questions or issues, refer to the component files or this guide.
