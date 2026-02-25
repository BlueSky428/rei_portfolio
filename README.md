# 🌊 Yamate Sasaki Portfolio

A modern, responsive portfolio website built with React, Vite, TypeScript, and Tailwind CSS. Features a beautiful ocean-themed design with Japanese cultural elements and bilingual support.

## ✨ Features

- **🌊 Ocean Theme**: Rotating ocean backgrounds with 7 different moods
- **🇯🇵 Bilingual Support**: Full Japanese and English language support
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance**: Built with Vite for fast development and optimized builds
- **🎨 Modern UI**: Beautiful animations with Framer Motion
- **♿ Accessible**: WCAG compliant design and navigation
- **🔍 SEO Optimized**: Meta tags, structured data, and performance optimization

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Main navigation with language toggle
│   └── Footer.tsx       # Site footer with links and info
├── pages/              # Page components
│   ├── Home.tsx        # Hero section with rotating backgrounds
│   ├── About.tsx       # Personal introduction and values
│   ├── Experience.tsx  # Career timeline and achievements
│   ├── Projects.tsx    # Project showcase with modals
│   ├── Skills.tsx      # Technical skills by category
│   ├── Achievements.tsx # Awards, certifications, publications
│   ├── Testimonials.tsx # Client and colleague feedback
│   ├── Blog.tsx        # Technical articles and insights
│   ├── Gallery.tsx     # Ocean and Japan-themed photography
│   └── Contact.tsx     # Contact form and social links
├── contexts/           # React contexts
│   └── LanguageContext.tsx # Language state management
├── types/              # TypeScript type definitions
│   ├── language.ts     # Language types
│   └── portfolio.ts    # Portfolio data types
├── utils/              # Utility functions
│   └── dataLoader.ts   # Data loading and localization
└── App.tsx             # Main app component
```

## 🎨 Design System

### Colors
- **Ocean**: Blue gradient palette for primary elements
- **Japanese**: Traditional colors (red, gold, indigo, emerald)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Primary**: Inter (English) + Noto Sans JP (Japanese)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with optimal line height

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Primary and secondary variants
- **Forms**: Accessible with proper validation
- **Modals**: Smooth animations and backdrop blur

## 🌐 Internationalization

The portfolio supports both English and Japanese with:
- Complete content translation
- RTL-friendly design considerations
- Cultural adaptation of UI elements
- Proper date and number formatting

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bluesky428/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimized with Vite

## 🎯 SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Open Graph and Twitter Card support
- Structured data markup
- Sitemap generation
- Robot.txt configuration

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- Alt text for images

## 🔧 Customization

### Adding New Sections

1. Create a new page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`
4. Add data structure in `portfolio/` directory

### Modifying Data

All content is stored in JSON files in the `portfolio/` directory:
- `home.json` - Hero section data
- `about.json` - Personal information
- `experience.json` - Career timeline
- `projects.json` - Project showcase
- `skills.json` - Technical skills
- `achievements.json` - Awards and certifications
- `testimonials.json` - Client feedback
- `blog.json` - Article content
- `gallery.json` - Photo gallery
- `contact.json` - Contact information
- `footer.json` - Footer links and info

### Styling

The design system uses Tailwind CSS with custom configurations:
- Colors defined in `tailwind.config.js`
- Custom animations and keyframes
- Responsive utilities
- Component classes in `src/index.css`

## 📝 Content Guidelines

### Writing Style
- Professional yet approachable tone
- Clear and concise language
- Cultural sensitivity for Japanese content
- Consistent terminology across languages

### Images
- High-quality, optimized images
- Consistent aspect ratios
- Alt text for accessibility
- WebP format for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ocean photography inspiration
- Japanese design principles
- Modern web development best practices
- Open source community

## 📞 Contact

**Yamate Sasaki**
- Email: yamatesasaki1@gmail.com
- GitHub: [github.com/bluesky428](https://github.com/bluesky428)

---

Made with ❤️ in Tokyo, Japan
