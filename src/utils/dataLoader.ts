// Data loading utilities
import homeData from '../../portfolio/home.json'
import aboutData from '../../portfolio/about.json'
import experienceData from '../../portfolio/experience.json'
import projectsData from '../../portfolio/projects.json'
import skillsData from '../../portfolio/skills.json'
import achievementsData from '../../portfolio/achievements.json'
import testimonialsData from '../../portfolio/testimonials.json'
import blogData from '../../portfolio/blog.json'
import galleryData from '../../portfolio/gallery.json'
import contactData from '../../portfolio/contact.json'
import footerData from '../../portfolio/footer.json'

export const loadPortfolioData = () => {
  return {
    home: homeData,
    about: aboutData,
    experience: experienceData,
    projects: projectsData,
    skills: skillsData,
    achievements: achievementsData,
    testimonials: testimonialsData,
    blog: blogData,
    gallery: galleryData,
    contact: contactData,
    footer: footerData,
  }
}

export const getLocalizedText = (obj: any, key: string, language: 'en' | 'ja') => {
  if (language === 'ja' && obj[`japanese_${key}`]) {
    return obj[`japanese_${key}`]
  }
  return obj[key] || obj[`japanese_${key}`] || ''
}

export const getLocalizedArray = (obj: any, key: string, language: 'en' | 'ja') => {
  if (language === 'ja' && obj[`japanese_${key}`]) {
    return obj[`japanese_${key}`]
  }
  return obj[key] || obj[`japanese_${key}`] || []
}
