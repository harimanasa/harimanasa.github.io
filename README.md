# Manasa Hari - Portfolio Website

A modern, responsive portfolio website built for GitHub Pages showcasing Manasa Hari's professional achievements, career timeline, and personal projects.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on all devices (desktop, tablet, mobile)
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Loading**: Optimized images and efficient code
- **Easy Content Management**: Simple JSON-based content system
- **Interactive Elements**: Smooth scrolling, hover effects, and animations

## 📁 Project Structure

```
harimanasa.github.io/
├── index.html                 # Main homepage (data-driven timeline & testimonials)
├── css/
│   ├── main.css              # Modern CSS with responsive design
│   └── timeline.css          # Timeline-specific styles
├── scripts/
│   ├── main.js               # Core JavaScript functionality
│   └── content-manager.js    # Content management system
├── data/
│   └── content.json          # All content data (profile, achievements, testimonials, career, navigation)
├── pages/
│   ├── achievements.html     # Achievements page (data-driven)
│   ├── hackathons.html       # Hackathons page
│   ├── projects.html         # Projects page
│   ├── testimonials.html     # Testimonials page
│   └── music.html           # Music & Dance page
├── images/
│   ├── profile.png          # Profile picture
│   ├── achievements/        # Achievement images
│   ├── testimonials/        # Testimonial images
│   └── music/              # Music-related images
└── files/
    └── Taulia_Certificate_of_Internship.pdf
```

## 🛠️ How to Add New Content

### 1. Adding New Achievements

**Option A: Using the Admin Panel (Easiest)**
1. Visit your site with `?admin=true` added to the URL
   - Example: `https://harimanasa.github.io/pages/achievements.html?admin=true`
2. Click "Add Achievement" button
3. Fill out the form with:
   - Title
   - Year and Month
   - Description
   - Category (scholarship, hackathon, recognition, public-speaking, other)
   - Image URL (optional)
   - Link URL (optional)
4. Click "Add Achievement"

**Option B: Direct JSON Editing**
1. Open `data/content.json`
2. Add a new achievement object to the `achievements` array:

```json
{
  "id": "unique-achievement-id",
  "title": "Your Achievement Title",
  "year": "2024",
  "month": "JAN",
  "description": "Description of your achievement",
  "image": "images/achievements/your-image.jpg",
  "link": "https://your-link.com",
  "category": "scholarship"
}
```

### 2. Adding New Testimonials

Home page testimonials are rendered from the `testimonials` array in `data/content.json`.
Edit `data/content.json` and add to the `testimonials` array:

```json
{
  "id": "person-name",
  "quote": "Their testimonial quote here",
  "author": "Person Name",
  "title": "Their Job Title at Company",
  "linkedin": "https://linkedin.com/in/their-profile"
}
```

### 3. Adding New Career Timeline Items

The home page career timeline is rendered from the `career` array in `data/content.json`.
Edit `data/content.json` and add:

```json
{
  "id": "unique-career-id",
  "title": "Job Title",
  "company": "Company Name",
  "companyUrl": "https://company.com",
  "year": "2024",
  "month": "JAN",
  "description": "Description of your role and achievements"
}
```

### 4. Adding New Navigation Items

Edit `data/content.json` and add to the `navigation` array:

```json
{
  "title": "New Page",
  "url": "pages/new-page.html",
  "icon": "fas fa-icon-name"
}
```

## 🎨 Customization

### Colors and Theme

Edit the CSS variables in `css/main.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Secondary color */
    --accent-color: #3b82f6;       /* Accent color */
    --text-primary: #1f2937;       /* Primary text color */
    --text-secondary: #6b7280;     /* Secondary text color */
    --bg-primary: #ffffff;         /* Primary background */
    --bg-secondary: #f9fafb;       /* Secondary background */
}
```

### Fonts

The site uses Inter font by default. To change fonts:

1. Update the Google Fonts link in HTML files
2. Change the `font-family` in `css/main.css`

## 📱 Mobile Responsiveness

The site is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🚀 Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Minified CSS**: Optimized stylesheets
- **Efficient JavaScript**: Modern ES6+ code
- **Optimized Images**: Proper sizing and compression
- **CDN Resources**: Fast loading external resources

## 🔧 Technical Features

- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **Accessibility**: ARIA labels, semantic HTML
- **Cross-browser Compatible**: Works on all modern browsers
- **Print Styles**: Optimized for printing
- **Smooth Animations**: CSS transitions and JavaScript animations

## 📊 Analytics Setup

To add Google Analytics:

1. Get your tracking ID from Google Analytics
2. Add this script to the `<head>` section of all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure images exist
2. **Styles not applying**: Clear browser cache or check CSS file paths
3. **JavaScript errors**: Check browser console for error messages
4. **Mobile menu not working**: Ensure `main.js` is properly loaded

### Debug Mode

Add `?debug=true` to any URL to enable debug mode with additional console logging.

## 📝 Content Guidelines

### Writing Achievements
- Keep titles concise but descriptive
- Include specific dates when possible
- Add relevant links for verification
- Use appropriate categories for filtering

### Image Guidelines
- Use JPG format for photos, PNG for graphics
- Optimize images for web (compress to reasonable file sizes)
- Use descriptive filenames
- Maintain consistent aspect ratios

## 🔄 Updates and Maintenance

### Regular Tasks
1. **Monthly**: Review and update achievements
2. **Quarterly**: Update career timeline
3. **Annually**: Refresh testimonials and profile information

### Backup Strategy
- Use Git for version control
- Export content data regularly using the admin panel
- Keep backups of images and documents

## 📞 Support

For technical issues or questions about the site:
1. Check the browser console for errors
2. Review the content.json file for syntax errors
3. Ensure all file paths are correct
4. Test on different browsers and devices

---

**Built with ❤️ for showcasing professional achievements and career growth**