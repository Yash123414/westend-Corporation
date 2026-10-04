import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Products', href: '/products' },
      { name: 'Why Choose Us', href: '/#why-choose-us' },
      { name: 'Certifications', href: '/certifications' }
    ],
    products: [
      { name: 'Spices & Seasonings', href: '/products?category=Spices%20%26%20Seasonings' },
      { name: 'Processed Drinks & Confectionery', href: '/products?category=Processed%20Drinks%20%26%20Confectionery' },
      { name: 'Baked Goods', href: '/products?category=Baked%20Goods' },
      { name: 'Health Mixes', href: '/products?category=Health%20Mixes' },
      { name: 'Frozen Vegetables', href: '/products?category=Frozen%20Vegetables' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Request Quote', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Acornpensy Exports
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for premium quality groceries, frozen vegetables, and processed foods since 2014.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start">
                <MapPin className="mr-2 flex-shrink-0 mt-1 text-primary-500" size={16} />
                <span className="hover:text-primary-400 transition-colors">
                  B-106, Phase-1, Okhla, New Delhi 110020
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 flex-shrink-0 text-primary-500" size={16} />
                <a
                  href="tel:+919599042226"
                  className="hover:text-primary-400 transition-colors"
                >
                  +91 9599042226
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 flex-shrink-0 text-primary-500" size={16} />
                <a
                  href="mailto:Export@acornpensy.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  Export@acornpensy.com
                </a>
              </div>
            </div>
            
            {/* Social Media Links - Coming Soon */}
            {/* <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                Social media links coming soon
              </div>
            </div> */}
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Acornpensy Exports Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {/* Social Media Links - Coming Soon */}
              {/* <div className="flex space-x-3 mr-6">
                Social media coming soon
              </div> */}
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                <a href="/contact" className="hover:text-primary-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-primary-600" />
    </footer>
  )
}

export default Footer
