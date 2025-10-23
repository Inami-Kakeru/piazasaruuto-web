import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/booking', '/api'],
    },
    sitemap: 'https://piazza-salute.com/sitemap.xml',
  }
}
