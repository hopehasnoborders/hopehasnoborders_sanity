import { groq } from 'next-sanity'

// ========================================
// GLOBAL QUERIES
// ========================================

// Bootstrap query - fetches all global data needed on every page
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  announcement {
    active,
    label,
    text,
    linkText,
    linkType,
    internalRoute,
    externalUrl
  },
  contact,
  social,
  ogImage
}`

// ========================================
// PAGE QUERIES
// ========================================

export const homePageQuery = groq`
  *[_type == "pageHome"][0] {
    hero,
    stats,
    videoSection,
    servicesSection,
    testimonialSection,
    seo
  }
`

export const aboutPageQuery = groq`
  *[_type == "pageAbout"][0] {
    hero {
      title,
      subtitle
    },
    content,
    mission,
    values[],
    seo
  }
`

export const programsPageQuery = groq`
  *[_type == "pagePrograms"][0] {
    hero {
      title,
      subtitle
    },
    seo
  }
`

export const resourcesPageQuery = groq`
  *[_type == "pageResources"][0] {
    hero {
      title,
      subtitle
    },
    resources[] {
      title,
      description,
      icon,
      link
    },
    seo
  }
`

export const storiesPageQuery = groq`
  *[_type == "pageStories"][0] {
    hero {
      title,
      subtitle
    },
    seo
  }
`

export const volunteerPageQuery = groq`
  *[_type == "pageVolunteer"][0] {
    hero {
      title,
      subtitle
    },
    opportunities[] {
      title,
      description
    },
    seo
  }
`

export const donatePageQuery = groq`
  *[_type == "pageDonate"][0] {
    hero {
      title,
      subtitle
    },
    amounts[],
    featuredProduct {
      title,
      price,
      description,
      image
    },
    seo
  }
`

// ========================================
// DOCUMENT QUERIES
// ========================================

export const allProgramsQuery = groq`
  *[_type == "program"] | order(order asc) {
    _id,
    title,
    slug,
    summary,
    description,
    icon,
    action
  }
`

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    quote,
    author,
    location,
    image,
    fullStory
  }
`
