# Cybersecurity Portfolio Website

A minimalist, interactive Flask portfolio website with 3D elements, live website previews, and a black/white/blue color scheme. All content is configurable via environment variables.

## Features

- **Minimalist Design**: Clean black, white, and blue color palette
- **3D Elements**: Interactive rotating cube and floating background shapes
- **Live Website Previews**: Hover over project cards to see animated scrolling previews of live websites
- **Auto-Scroll Animation**: Smooth 8-second auto-scroll effect when hovering over project previews
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Scroll-triggered animations, parallax effects, and hover interactions
- **Environment-Based Configuration**: All content managed through `.env` file
- **Sections Include**:
  - Hero section with glitch text effect and typing animation
  - About Me with key skills (up to 6)
  - Featured Projects with live previews (3-5 projects)
  - Achievements & Certifications (up to 6)
  - Personal interests (up to 6)
  - Resume download
  - Contact information with social links

## Installation

1. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure your `.env` file (see Configuration section below)

4. Run the application:
```bash
python app.py
```

5. Open your browser and navigate to:
```
http://localhost:5000
```

## Configuration

All portfolio content is configured through the `.env` file. A template file `.env.example` is provided.

### Personal Information
```env
PORTFOLIO_NAME=Your Name
PORTFOLIO_TITLE=Your Professional Title
PORTFOLIO_EMAIL=your.email@example.com
PORTFOLIO_PHONE=+1 (555) 123-4567
```

### About Me Section
```env
ABOUT_INTRO=Your introduction paragraph
ABOUT_PARAGRAPH_1=First detailed paragraph
ABOUT_PARAGRAPH_2=Second detailed paragraph
```

### Social Media Links
```env
SOCIAL_LINKEDIN=https://linkedin.com/in/yourprofile
SOCIAL_GITHUB=https://github.com/yourusername
SOCIAL_TWITTER=https://twitter.com/yourhandle
SOCIAL_WEBSITE=https://yourwebsite.com
```

### Skills (Up to 6)
```env
SKILL_1_ICON=🔐
SKILL_1_NAME=Skill Name
SKILL_1_DESCRIPTION=Brief description of the skill

# Repeat for SKILL_2 through SKILL_6
```

### Projects (3-5 Projects with Live Previews)

Each project supports live website previews that auto-scroll on hover:

```env
PROJECT_1_NAME=Project Name
PROJECT_1_TYPE=Project Category (e.g., Security Tool, Web App)
PROJECT_1_DESCRIPTION=Detailed project description
PROJECT_1_TECH=Python,Flask,React,PostgreSQL  # Comma-separated
PROJECT_1_LIVE_URL=https://your-live-project.com
PROJECT_1_GITHUB_URL=https://github.com/you/project
PROJECT_1_HAS_PREVIEW=true  # Set to true for live preview

# Repeat for PROJECT_2 through PROJECT_5
```

**Note on Live Previews:**
- Set `PROJECT_X_HAS_PREVIEW=true` to enable iframe preview
- The website at `PROJECT_X_LIVE_URL` will be displayed in a scaled-down iframe
- On hover, the preview will automatically scroll through the page
- Use `https://` URLs for proper iframe loading
- Some sites may block iframe embedding (X-Frame-Options)
- Test with sites like: `https://example.com`, `https://react.dev`, `https://tailwindcss.com`, etc.

### Achievements (Up to 6)
```env
ACHIEVEMENT_1_ICON=🏆
ACHIEVEMENT_1_TITLE=Achievement Title
ACHIEVEMENT_1_DATE=Month Year
ACHIEVEMENT_1_DESCRIPTION=Description of the achievement

# Repeat for ACHIEVEMENT_2 through ACHIEVEMENT_6
```

### Interests (Up to 6)
```env
INTEREST_1_EMOJI=☕
INTEREST_1_TEXT=Your interest or hobby

# Repeat for INTEREST_2 through INTEREST_6
```

### Resume & Contact
```env
RESUME_DESCRIPTION=Text description for resume section
CONTACT_INTRO=Introduction text for contact section
```

## Project Structure

```
Website-Portfolio/
├── .env                    # Your configuration (DO NOT COMMIT)
├── .env.example           # Template for configuration
├── app.py                 # Flask application with env loading
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template with Jinja2
├── static/
│   ├── css/
│   │   └── style.css     # Enhanced styles with preview support
│   ├── js/
│   │   └── script.js     # Interactive features and animations
│   └── resume/
│       └── resume.pdf    # Downloadable resume
└── README.md             # This file
```

## Customization

### Replace Resume

Replace the placeholder PDF at `static/resume/resume.pdf` with your actual resume.

### Modify Color Scheme

Edit the CSS variables in `static/css/style.css`:

```css
:root {
    --color-bg: #0a0a0a;           /* Background color */
    --color-surface: #1a1a1a;      /* Card backgrounds */
    --color-accent: #00a8ff;       /* Primary accent (blue) */
    --color-text: #ffffff;         /* Main text color */
}
```

### Adjust Auto-Scroll Speed

In `static/css/style.css`, find the `.project-preview` class:

```css
.project-preview {
    transition: transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

Change `8s` to your preferred duration (e.g., `6s` for faster, `12s` for slower).

## Technologies Used

- **Backend**: Python Flask, python-dotenv
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Features**:
  - CSS 3D Transforms for rotating cubes
  - Intersection Observer API for scroll animations
  - iframe with CSS transforms for live previews
  - Smooth scrolling and parallax effects
  - Responsive grid layouts

## Live Preview Feature

The portfolio includes an innovative live website preview system:

1. **How it works**: Each project card can display a live iframe of your actual website
2. **Auto-scroll**: On hover, the preview smoothly scrolls through the page content
3. **Performance**: iframes are lazy-loaded for optimal performance
4. **Security**: Sandboxed iframes with pointer-events disabled

### Adding Your Own Projects

1. Update the `.env` file with your project details
2. Set `PROJECT_X_LIVE_URL` to your deployed website URL
3. Set `PROJECT_X_HAS_PREVIEW=true` to enable the preview
4. The preview will automatically scale and scroll on hover

**Example Projects in Template:**
- Project 1: Example.com (basic placeholder)
- Project 2: React.dev (documentation site)
- Project 3: Tailwind CSS (framework site)
- Project 4: Three.js (3D library site)
- Project 5: Stripe (payment platform)

Replace these with your actual project URLs!

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅

## Security Considerations

- `.env` file is gitignored to protect sensitive information
- iframe previews use `sandbox` attribute for security
- `pointer-events: none` prevents iframe interaction
- Social media links include `rel="noopener noreferrer"`

## Performance Optimization

- Lazy loading for iframe previews
- Intersection Observer for scroll animations
- CSS transforms for GPU-accelerated animations
- Optimized asset loading
- Minimal external dependencies

## License

Free to use and modify for your personal portfolio.

---

**Pro Tips:**
- Use high-quality project screenshots if iframe embedding fails
- Test all links before deployment
- Keep project descriptions concise (2-3 sentences)
- Use HTTPS URLs for all external links
- Update your resume PDF regularly
