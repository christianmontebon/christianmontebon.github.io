export type Project = {
  title: string
  description: string
  url: string
  scope: 'Personal' | 'Work' | 'Side Project'
  image: string
  tools: string[]
}

export const projects: Project[] = [
  {
    title: 'christianmontebon.github.io',
    description: 'My personal website',
    url: 'https://christianmontebon.github.io',
    scope: 'Personal',
    image: '/images/projects/christianmontebon.github.io.png',
    tools: ['React', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Hayley at One – RSVP',
    description:
      'A simple, private RSVP web app for Hayley’s first birthday. Guests receive unique links per invite, can accept or decline without accounts, and are grouped by family or circle for easy headcount tracking.',
    url: 'https://hayleyatone.com',
    scope: 'Side Project',
    image: '/images/projects/hayley-at-one.png',
    tools: ['React', 'Supabase', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'TAGR',
    description:
      'A mobile self-checkout platform that lets shoppers use their smartphones to scan, pay, and leave stores without needing an app or account',
    url: 'https://tagr.io',
    scope: 'Work',
    image: '/images/projects/tagr.png',
    tools: [
      'React',
      'Tailwind CSS',
      'TypeScript',
      'PWA',
      'Laravel',
      'MySQL',
      'PHP',
      'Merchant Warrior',
      'VendPOS',
      'Square',
      'Shopify',
      'Stripe',
    ],
  },
  {
    title: 'Digikey Conversion Tools',
    description:
      'Interactive calculators used by thousands of users worldwide.',
    url: 'https://www.digikey.ph/en/resources/online-conversion-calculators',
    scope: 'Work',
    image: '/images/projects/digikey.png',
    tools: ['HTML', 'CSS', 'JavaScript', 'JQuery'],
  },
  {
    title: 'House of Joy',
    description:
      'A website built with clarity and accessibility in mind for a local organization.',
    url: 'https://www.houseofjoycdo.org',
    scope: 'Work',
    image: '/images/projects/house-of-joy.jpeg',
    tools: ['Wordpress', 'PHP'],
  },
  {
    title: 'Highlands Realty PH',
    description:
      'A real estate website with custom content management features.',
    url: 'https://www.highlandsrealtyph.com',
    scope: 'Work',
    image: '/images/projects/highlandsrealty.jpeg',
    tools: ['Wordpress', 'PHP'],
  },
  {
    title: 'QRThis',
    description:
      'A simple and practical QR code solution for businesses and individuals.',
    url: 'https://qrthis.io',
    scope: 'Work',
    image: '',
    tools: ['React', 'Tailwind CSS', 'Laravel', 'Stripe'],
  },
]
