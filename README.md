# Daniel Rivera's Portfolio

A modern, responsive portfolio website built with HTML, CSS (Tailwind), and JavaScript.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with blue and white color scheme
- **Smooth Navigation**: Single-page application with smooth scrolling and section transitions
- **Interactive Elements**: Hover effects, animations, and scroll spy navigation
- **Contact Modal**: Functional contact form with social media integration
- **Tech Stack**: HTML, CSS, JavaScript, Tailwind CSS, C++

## 📁 Project Structure

```
my-portfolio-main/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Custom styles and animations
├── js/
│   └── app.js         # Main JavaScript application logic
└── assets/
    └── 2x2.jpeg       # Profile picture
```

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Dynamic content and interactions
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **VS Code**: Code editor
- **Git**: Version control
- **GitHub**: Code hosting and collaboration

## 🎯 Key Features

### Navigation System
- **Home**: Scroll-based page with all sections (Hero, About, Skills, Projects)
- **About**: Individual section with personal information
- **Skills**: Tech stack and certifications display
- **Projects**: Portfolio projects showcase

### Interactive Elements
- **Scroll Spy**: Active navigation highlighting based on scroll position
- **Typing Animation**: Dynamic text animation on home page
- **Hover Effects**: Smooth transitions and lift effects
- **Mobile Menu**: Responsive navigation for mobile devices

### Contact Features
- **Email**: `danieljimenezjr30@gmail.com`
- **Phone**: `+63 991 057 6711`
- **Location**: Quezon City, Philippines
- **Social Media**:
  - [Facebook](https://www.facebook.com/profile.php?id=61578111940192)
  - [Instagram](https://www.instagram.com/dnlrvrx_?igsh=NTc4MTIwNjQ2YQ==)
  - [GitHub](https://github.com/Dnielllll)
  
## 🎨 Design System

### Color Scheme
- **Primary**: Blue (`#3B82F6`, `#2563EB`)
- **Secondary**: White (`#FFFFFF`)
- **Accent**: Light blue (`#DBEAFE`, `#93C5FD`)
- **Text**: Stone gray (`#1F2937`, `#4B5563`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 700, 900
- **Responsive**: Scalable text sizes for all devices

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px` (md:)
- **Tablet**: `768px - 1024px` (md:)
- **Desktop**: `> 1024px` (lg:)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for external resources

### Installation
1. Clone or download the project
2. Open `index.html` in your web browser
3. No build process required - it's ready to use!

### Local Development
```bash
# Serve the files locally (optional)
python -m http.server 8000
# or
npx serve .
```

## 📄 Pages

### Home Page
- Hero section with animated typing effect
- Highlights cards with key features
- Smooth scroll navigation to sections

### About Page
- Personal information and background
- Education and location details
- Professional profile picture

### Skills Page
- Tech stack display with logos
- Professional certifications
- Interactive hover effects

### Projects Page
- Portfolio project showcase
- Project descriptions and links
- Responsive grid layout

## 🔧 Customization

### Adding New Projects
Edit the `getProjectsSectionHTML()` function in `js/app.js`:

```javascript
// Add new project card
<div class="bg-blue-100 border-2 border-blue-300 p-6 rounded-xl shadow-md text-center animate-on-scroll hover-lift">
    <h3 class="text-xl font-semibold text-stone-800 mb-4">Your Project</h3>
    <p class="text-zinc-600 mb-4">Project description here</p>
    <div class="flex gap-4 justify-center">
        <a href="#" class="bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded text-blue-700 font-medium">Live Demo</a>
        <a href="#" class="bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded text-blue-700 font-medium">View Code</a>
    </div>
</div>
```

### Updating Colors
Modify the CSS variables in `css/style.css` or update Tailwind classes in `js/app.js`.

### Adding New Sections
1. Create new HTML template function in `js/app.js`
2. Add navigation link in `index.html`
3. Update `showSection()` function with new case

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari (iOS 12+)

## 📊 Performance

- **Lightweight**: Minimal dependencies for fast loading
- **Optimized**: Compressed images and efficient code
- **SEO Ready**: Semantic HTML and meta tags
- **Accessible**: ARIA labels and keyboard navigation

## 🤝 Contributing

Feel free to fork this project and make pull requests for:
- Bug fixes
- New features
- Performance improvements
- Documentation updates

## 📞 Contact

- **Email**: danieljimenezjr30@gmail.com
- **Phone**: +63 991 057 6711
- **Location**: Quezon City, Philippines

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using HTML, CSS, and JavaScript**
