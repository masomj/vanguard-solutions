// Site-wide structured data.
//
// One @graph with stable @id values, so Google and AI answer engines resolve a
// single business entity that the WebSite and every Service point back to,
// rather than three unrelated objects. Page-level blocks (BreadcrumbList,
// FAQPage, Offer catalogues) reference `businessId` for the same reason.

export const SITE_ORIGIN = 'https://vanguarddigitalsolutions.co.uk'

export const businessId = `${SITE_ORIGIN}/#business`
export const websiteId = `${SITE_ORIGIN}/#website`

/** Towns and areas covered. Mirrors the `home.areas` copy shown on the site. */
const areaServed = [
  { '@type': 'City', name: 'Bridgend' },
  { '@type': 'City', name: 'Cardiff' },
  { '@type': 'City', name: 'Swansea' },
  { '@type': 'City', name: 'Newport' },
  { '@type': 'City', name: 'Neath' },
  { '@type': 'City', name: 'Port Talbot' },
  { '@type': 'City', name: 'Merthyr Tydfil' },
  { '@type': 'City', name: 'Pontypridd' },
  { '@type': 'City', name: 'Barry' },
  { '@type': 'City', name: 'Caerphilly' },
  { '@type': 'AdministrativeArea', name: 'Rhondda Cynon Taf' },
  { '@type': 'AdministrativeArea', name: 'Vale of Glamorgan' },
  { '@type': 'AdministrativeArea', name: 'South Wales' },
]

function service(slug: string, name: string, serviceType: string, url: string) {
  return {
    '@type': 'Service',
    '@id': `${SITE_ORIGIN}/services#${slug}`,
    name,
    serviceType,
    provider: { '@id': businessId },
    areaServed: { '@type': 'AdministrativeArea', name: 'South Wales' },
    url: `${SITE_ORIGIN}${url}`,
  }
}

export const siteSchemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_ORIGIN}/`,
      name: 'Vanguard Digital Solutions',
      inLanguage: ['en-GB', 'cy'],
      publisher: { '@id': businessId },
    },
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': businessId,
      name: 'Vanguard Digital Solutions',
      alternateName: 'VDS',
      description:
        'Web design and software development company building websites, online shops, booking systems and bespoke web applications for small businesses across South Wales.',
      url: `${SITE_ORIGIN}/`,
      image: `${SITE_ORIGIN}/og-image.png`,
      logo: `${SITE_ORIGIN}/icon-512.png`,
      email: 'enquiries@vanguarddigitalsolutions.co.uk',
      priceRange: '££',
      currenciesAccepted: 'GBP',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bridgend',
        addressRegion: 'South Wales',
        addressCountry: 'GB',
      },
      areaServed,
      knowsLanguage: ['en-GB', 'cy'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'enquiries@vanguarddigitalsolutions.co.uk',
        areaServed: 'GB',
        availableLanguage: ['English', 'Welsh'],
      },
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@id': `${SITE_ORIGIN}/services#small-business-websites` } },
        { '@type': 'Offer', itemOffered: { '@id': `${SITE_ORIGIN}/services#ecommerce` } },
        { '@type': 'Offer', itemOffered: { '@id': `${SITE_ORIGIN}/services#booking-systems` } },
        { '@type': 'Offer', itemOffered: { '@id': `${SITE_ORIGIN}/services#business-websites` } },
        { '@type': 'Offer', itemOffered: { '@id': `${SITE_ORIGIN}/services#bespoke-apps` } },
      ],
    },
    service('small-business-websites', 'Small Business Websites', 'Web design', '/small-business'),
    service('ecommerce', 'Online Shops and eCommerce', 'Web development', '/services/ecommerce'),
    service('booking-systems', 'Booking and Appointment Systems', 'Web application development', '/services/booking-systems'),
    service('business-websites', 'Business Websites', 'Web design', '/services/business-website'),
    service('bespoke-apps', 'Bespoke Web Applications', 'Software development', '/services/bespoke-software'),
  ],
}
