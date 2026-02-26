# Poonama Yadav - Professional Portfolio

A modern, advanced portfolio website built with HTML, CSS, JavaScript, and Three.js featuring stunning scroll animations, gradient effects, and 3D elements.

## 🌟 Features

### ✨ Visual Effects
- **3D Hero Section**: Interactive Three.js scene with animated particles and rotating cube
- **Gradient Effects**: Beautiful gradient backgrounds and text animations throughout
- **Smooth Scroll Animations**: AOS (Animate On Scroll) library for smooth page transitions
- **Parallax Effects**: Dynamic parallax scrolling for visual depth
- **Particle Effects**: Click-triggered particle animations
- **Interactive Cards**: Hover effects on project and skill cards

### 📱 Responsive Design
- Fully responsive design for all devices
- Mobile-first approach
- Hamburger menu for mobile navigation
- Touch-friendly interface

### 🎨 Design Features
- Professional color scheme with gradients
- Smooth transitions and hover effects
- Progress bars for skill visualization
- Beautiful card designs for projects and skills
- Sticky navigation bar with smooth scrolling

### 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Build Tool**: Vite
- **3D Graphics**: Three.js
- **Animations**: AOS, CSS3 Animations
- **Icons**: Font Awesome
- **Framework**: Bootstrap (included via CDN)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
```bash
cd "poonam trial web app"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The portfolio will open in your browser at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📂 Project Structure

```
poonam trial web app/
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── main.js             # JavaScript with Three.js and interactions
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🎯 Sections

### 1. **Navigation Bar**
- Fixed navigation with smooth scroll links
- Mobile hamburger menu
- Active link highlighting

### 2. **Hero Section**
- Large heading with gradient text
- 3D animated scene with Three.js
- Call-to-action buttons
- Scroll indicator with animation

### 3. **About Section**
- Personal introduction
- Statistics cards showing experience
- Professional background

### 4. **Skills Section**
- Organized skill categories (Frontend, Tools, Design)
- Skill cards with icons
- Animated progress bars
- Visual skill level indicators

### 5. **Projects Section**
- 6 Featured projects with card design
- Project descriptions and tags
- Gradient backgrounds for each project
- View and source code links

### 6. **Contact Section**
- Contact form with validation
- Contact information (email, phone, location)
- Social media links
- Styled input fields

### 7. **Footer**
- Copyright information
- Technology stack mention

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| H | Jump to Home |
| A | Jump to About |
| S | Jump to Skills |
| P | Jump to Projects |
| C | Jump to Contact |

## 🎨 Customization

### Update Personal Information

**Edit index.html:**
- Change name "Poonama Yadav" to your name
- Update email, phone, and location
- Modify project descriptions and links
- Update social media links

### Change Colors

**Edit style.css - CSS Variables section:**
```css
:root {
    --primary: #667eea;      /* Primary gradient color */
    --secondary: #764ba2;    /* Secondary gradient color */
    --tertiary: #f093fb;     /* Tertiary accent color */
    --accent: #f5576c;       /* Accent color */
    /* ... more colors ... */
}
```

### Modify Animations

All animations are in **style.css** under the @keyframes rules:
- `gradientShift` - Gradient text animation
- `bounce` - Scroll indicator bounce
- `fillWidth` - Progress bar fill animation
- `fadeIn` - Fade in animation

### Customize 3D Scene

Edit **main.js** in the `initThreeJS()` function:
- Change particle count and colors
- Modify cube geometry and materials
- Adjust lighting
- Change animation speeds

## 📦 Dependencies

### Runtime Dependencies
- **three** (v128+) - 3D graphics library
- **aos** (v2.3.4+) - Animate on scroll library

### Dev Dependencies
- **vite** (v4.3.9+) - Build tool and dev server

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Canvas not showing?
- Ensure JavaScript is enabled
- Check browser console for errors
- Clear browser cache and reload

### Scroll animations not working?
- Verify AOS library is loaded
- Check that data-aos attributes are present
- Ensure CSS is properly linked

### 3D scene performance issues?
- Reduce particle count in `initThreeJS()`
- Disable parallax effect on mobile
- Use lower quality textures

## 📝 License

This portfolio template is open source and free to use for personal projects.

## 💡 Tips for Best Results

1. **Update all contact information** with your actual details
2. **Add your real projects** with descriptions and links
3. **Customize the color scheme** to match your brand
4. **Add your real images** to project cards
5. **Test on multiple devices** to ensure responsiveness
6. **Update skills** to match your actual expertise
7. **Deploy to a web server** for sharing

## 🚀 Deployment Options

### Netlify
1. Push to GitHub
2. Connect to Netlify
3. Deploy automatically on push

### Vercel
1. Create account on Vercel
2. Import project from GitHub
3. Deploy with one click

### GitHub Pages
1. Create gh-pages branch
2. Push dist folder to gh-pages
3. Enable GitHub Pages in settings

## 📞 Need Help?

Refer to:
- [Three.js Documentation](https://threejs.org/docs/index.html)
- [AOS Documentation](https://michalsnik.github.io/aos/)
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

## ⭐ Credit

Built with ❤️ using modern web technologies.

---

**Happy coding! Make this portfolio your own and showcase your amazing work! 🎉**
