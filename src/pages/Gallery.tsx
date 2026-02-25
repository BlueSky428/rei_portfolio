import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { Photo } from '../types/portfolio'
import { X, Heart, Eye, MapPin, Calendar, Camera, Settings, ExternalLink } from 'lucide-react'

const Gallery: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const galleryData = data.gallery
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  const filteredPhotos = selectedCategory === 'all' 
    ? [...galleryData.featured_photos, ...galleryData.recent_photos]
    : [...galleryData.featured_photos, ...galleryData.recent_photos].filter(photo => photo.category === selectedCategory)

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
                {getLocalizedText(galleryData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-white/90 leading-relaxed">
              {getLocalizedText(galleryData, 'description', language)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              {language === 'ja' ? 'ギャラリー統計' : 'Gallery Statistics'}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(galleryData.gallery_stats).map(([key, value], index) => {
                if (key.startsWith('japanese_')) return null
                
                const japaneseKey = `japanese_${key}`
                const japaneseValue = galleryData.gallery_stats[japaneseKey as keyof typeof galleryData.gallery_stats]
                
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

      {/* Category Filter */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              {language === 'ja' ? 'カテゴリでフィルター' : 'Filter by Category'}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-ocean-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'ja' ? 'すべて' : 'All'}
              </button>
              {galleryData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-ocean-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getLocalizedText(category, 'name', language)}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card overflow-hidden cursor-pointer group"
                onClick={() => openPhotoModal(photo)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={photo.thumbnail_url}
                    alt={getLocalizedText(photo, 'title', language)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-soft-800">
                      <h3 className="text-lg font-semibold mb-2">
                        {getLocalizedText(photo, 'title', language)}
                      </h3>
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {photo.likes}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {photo.views}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {photo.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                        {language === 'ja' ? '注目' : 'Featured'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {getLocalizedText(photo, 'title', language)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {getLocalizedText(photo, 'description', language)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {getLocalizedText(photo, 'location', language)}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {getLocalizedText(photo, 'date_taken', language)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Photo Collections */}
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
                {language === 'ja' ? 'フォトコレクション' : 'Photo Collections'}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryData.photo_collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card overflow-hidden cursor-pointer group"
              >
                <div className="aspect-video relative">
                  <img
                    src={getLocalizedText(collection, 'cover_photo', language)}
                    alt={getLocalizedText(collection, 'name', language)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {getLocalizedText(collection, 'name', language)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {getLocalizedText(collection, 'description', language)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {getLocalizedText(collection, 'photo_count', language)} {language === 'ja' ? '枚の写真' : 'photos'}
                    </span>
                    <span>
                      {getLocalizedText(collection, 'created_date', language)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={closePhotoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedPhoto.japanese_image_url && language === 'ja' ? selectedPhoto.japanese_image_url : selectedPhoto.image_url}
                  alt={getLocalizedText(selectedPhoto, 'title', language)}
                  className="w-full h-64 sm:h-96 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closePhotoModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Photo Info */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {getLocalizedText(selectedPhoto, 'title', language)}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {getLocalizedText(selectedPhoto, 'description', language)}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                    <div>
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{getLocalizedText(selectedPhoto, 'location', language)}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{getLocalizedText(selectedPhoto, 'date_taken', language)}</span>
                      </div>
                      <div className="flex items-center">
                        <Camera className="w-4 h-4 mr-2" />
                        <span>{selectedPhoto.camera}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Settings className="w-4 h-4 mr-2" />
                        <span>{selectedPhoto.settings}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="mr-2">{language === 'ja' ? 'レンズ' : 'Lens'}:</span>
                        <span>{selectedPhoto.lens}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === 'ja' ? 'タグ' : 'Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getLocalizedArray(selectedPhoto, 'tags', language).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{selectedPhoto.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{selectedPhoto.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a
                      href={selectedPhoto.japanese_image_url && language === 'ja' ? selectedPhoto.japanese_image_url : selectedPhoto.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-ocean-600 hover:text-ocean-700 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === 'ja' ? 'フルサイズで見る' : 'View Full Size'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
