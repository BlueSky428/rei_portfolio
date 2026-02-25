import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Calendar, Clock, Eye, Heart, MessageCircle, ExternalLink, Tag } from 'lucide-react'

const Blog: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const blogData = data.blog
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-soft-50">
      {/* Hero Section */}
      <section className="section-padding hero-section">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            ref={ref}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool mb-4">
                {getLocalizedText(blogData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-soft-600 leading-relaxed">
              {getLocalizedText(blogData, 'description', language)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Stats */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              {language === 'ja' ? 'ブログ統計' : 'Blog Statistics'}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(blogData.blog_stats).map(([key, value], index) => {
                if (key.startsWith('japanese_')) return null
                
                const japaneseKey = `japanese_${key}`
                const japaneseValue = blogData.blog_stats[japaneseKey as keyof typeof blogData.blog_stats]
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-ocean-600 mb-2">
                      {value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'ja' ? japaneseValue : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? '最新の投稿' : 'Recent Posts'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            {blogData.recent_posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Featured Image */}
                  <div className="lg:col-span-1">
                    <img
                      src={getLocalizedText(post, 'featured_image', language)}
                      alt={getLocalizedText(post, 'title', language)}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="lg:col-span-2">
                    {/* Category & Date */}
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-ocean-100 text-ocean-700 text-sm font-medium rounded-full">
                        {getLocalizedText(post, 'category', language)}
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {getLocalizedText(post, 'date', language)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {getLocalizedText(post, 'read_time', language)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {getLocalizedText(post, 'title', language)}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {getLocalizedText(post, 'excerpt', language)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {getLocalizedArray(post, 'tags', language).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </div>
                      </div>
                      <button className="flex items-center text-ocean-600 hover:text-ocean-700 transition-colors duration-200">
                        <span className="mr-2">{language === 'ja' ? '続きを読む' : 'Read More'}</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? 'カテゴリ' : 'Categories'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${category.color}20` }}>
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: category.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedText(category, 'name', language)}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {getLocalizedText(category, 'description', language)}
                </p>
                <div className="text-2xl font-bold" style={{ color: category.color }}>
                  {category.post_count} {language === 'ja' ? '投稿' : 'Posts'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
                {language === 'ja' ? '人気のタグ' : 'Popular Tags'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {blogData.popular_tags.map((tag, index) => (
              <motion.div
                key={tag.tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ 
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                  border: `1px solid ${tag.color}40`
                }}
              >
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  {getLocalizedText(tag, 'tag', language)}
                  <span className="ml-2 text-xs opacity-75">({tag.count})</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding hero-section">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-soft-800 mb-4">
              {getLocalizedText(blogData.newsletter, 'title', language)}
            </h2>
            <p className="text-xl text-soft-600 mb-8">
              {getLocalizedText(blogData.newsletter, 'description', language)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={getLocalizedText(blogData.newsletter, 'placeholder', language)}
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-ocean-600 font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200">
                {getLocalizedText(blogData.newsletter, 'button_text', language)}
              </button>
            </div>
            
            <p className="text-soft-500 text-sm mt-4">
              {getLocalizedText(blogData.newsletter, 'subscribers', language)} {language === 'ja' ? '人の購読者' : 'subscribers'}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog
