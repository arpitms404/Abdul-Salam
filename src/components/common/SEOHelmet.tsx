import { useEffect } from 'react';
import { INDIVIDUAL_SERVICES_DATA } from '../../data/servicePagesData';

interface SEOProps {
  currentPath: string;
}

interface RouteSEOMeta {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath: string;
  breadcrumbName: string;
  parentPath?: string;
  parentName?: string;
}

const ROUTE_SEO_MAP: Record<string, RouteSEOMeta> = {
  '/': {
    title: 'M/S Abdul Salam Constructions Company | Residential Turnkey Construction Bhadohi',
    description: 'M/S Abdul Salam Constructions Company provides residential turnkey construction, RCC civil engineering, and building works in Bhadohi, Uttar Pradesh based on transparent quotation rates and verified BOQ specifications.',
    keywords: 'Abdul Salam Construction Company, M/S Abdul Salam Constructions Company, construction company in bhadohi, building contractor bhadohi, turnkey house construction uttar pradesh, civil contractor aurai road, residential turnkey construction gyanpur, commercial construction gopiganj, house construction rates bhadohi',
    canonicalPath: '/',
    breadcrumbName: 'Home'
  },
  '/services': {
    title: 'Construction & Civil Engineering Services in Bhadohi | M/S Abdul Salam Constructions Company',
    description: 'Core construction services by M/S Abdul Salam Constructions Company: Residential turnkey construction, building civil works, RCC casting, brickwork, plastering, electrical, plumbing, flooring, woodwork, and painting.',
    keywords: 'civil construction services bhadohi, turnkey house builders, commercial complexes bhadohi, rcc frame contractors uttar pradesh, brickwork masonry bhadohi, civil engineering boq',
    canonicalPath: '/services',
    breadcrumbName: 'Services'
  },
  '/packages': {
    title: 'Turnkey Construction Packages & BOQ Rates (₹1500–₹2250/sq.ft) | M/S Abdul Salam Constructions Company',
    description: 'Turnkey construction quotation rates by M/S Abdul Salam Constructions Company: Residential Hall (₹1,500/sq.ft), Standard Residential (₹1,850/sq.ft), and Premium Residential (₹2,250/sq.ft) + 18% GST. Itemized BOQ specifications and brand standards.',
    keywords: 'construction rate per sq ft bhadohi, turnkey package rates uttar pradesh, house building cost bhadohi, ultratech tata tiscon construction boq, civil engineering quote bhadohi',
    canonicalPath: '/packages',
    breadcrumbName: 'Packages & BOQ'
  },
  '/projects': {
    title: 'Construction Projects & Case Studies in Bhadohi | M/S Abdul Salam Constructions Company',
    description: 'Portfolio of residential villas, multi-storey houses, and commercial structures executed across Bhadohi, Aurai Road, Gyanpur, and Gopiganj by M/S Abdul Salam Constructions Company.',
    keywords: 'construction projects bhadohi, completed duplex homes bhadohi, residential villa photos aurai road, commercial building contractor projects gyanpur',
    canonicalPath: '/projects',
    breadcrumbName: 'Projects Portfolio'
  },
  '/service-areas': {
    title: 'Service Areas & Site Coverage in Bhadohi District | M/S Abdul Salam Constructions Company',
    description: 'Active site construction deployment across Bhadohi City, Aurai Road, Gyanpur, Gopiganj GT Road, Suriyawan, Khamaria, and surrounding Sant Ravidas Nagar district corridors.',
    keywords: 'builders in bhadohi, contractors in gyanpur, construction company gopiganj, civil contractor aurai road, builders suriyawan, construction sant ravidas nagar',
    canonicalPath: '/service-areas',
    breadcrumbName: 'Service Areas'
  },
  '/get-a-quote': {
    title: 'Construction Cost Calculator & Estimate | M/S Abdul Salam Constructions Company',
    description: 'Calculate instant construction cost for your plot in Bhadohi. Select built-up area and quotation tier (₹1,500, ₹1,850, ₹2,250/sq.ft) to inspect 7-stage milestone payment schedules.',
    keywords: 'house construction cost calculator bhadohi, building cost estimator uttar pradesh, calculate construction price per sq ft, civil estimate bhadohi',
    canonicalPath: '/get-a-quote',
    breadcrumbName: 'Estimate Calculator'
  },
  '/about': {
    title: 'About Company & Entity Profile | M/S Abdul Salam Constructions Company Bhadohi',
    description: 'About M/S Abdul Salam Constructions Company: Registered building contractor and civil engineering firm located at Phase-II, Rajpura Colony, Opposite H.P. Petrol Pump, Aurai Road, Bhadohi, Uttar Pradesh (221401).',
    keywords: 'about abdul salam construction company, m/s abdul salam constructions company, builders bhadohi, civil engineering contractors bhadohi, registered contractor uttar pradesh',
    canonicalPath: '/about',
    breadcrumbName: 'About Us'
  },
  '/faq': {
    title: 'Construction FAQs, Specifications & Payment Terms | M/S Abdul Salam Constructions Company',
    description: 'Detailed client answers regarding construction costs in Bhadohi, 7-stage milestone payments, concrete mix 3:2:1, UltraTech/ACC cement, Fe 550D TMT rebar, and quotation inclusions & exclusions.',
    keywords: 'house construction questions bhadohi, turnkey payment stages faq, construction approval uttar pradesh, concrete mix 3 2 1 faq',
    canonicalPath: '/faq',
    breadcrumbName: 'FAQ'
  },
  '/contact': {
    title: 'Contact Engineering Office in Bhadohi | M/S Abdul Salam Constructions Company',
    description: 'Office address: Phase-II, Rajpura Colony, Opposite H.P. Petrol Pump, Aurai Road, Bhadohi, UP (221401). Call +91 70075 29965 / 94155 25965 or schedule an on-site plot inspection.',
    keywords: 'contact construction company bhadohi, civil engineer phone number bhadohi, office address aurai road bhadohi, book site inspection bhadohi',
    canonicalPath: '/contact',
    breadcrumbName: 'Contact & Location'
  }
};

export const SEOHelmet: React.FC<SEOProps> = ({ currentPath }) => {
  useEffect(() => {
    const cleanPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';
    let meta = ROUTE_SEO_MAP[cleanPath];
    let isServiceDetail = false;
    let serviceDetailSlug = '';

    // Check individual service routes
    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      const sData = INDIVIDUAL_SERVICES_DATA[slug];
      if (sData) {
        meta = {
          title: sData.metaTitle,
          description: sData.metaDescription,
          canonicalPath: `/services/${slug}`,
          breadcrumbName: sData.shortTitle,
          parentPath: '/services',
          parentName: 'Services'
        };
        isServiceDetail = true;
        serviceDetailSlug = slug;
      }
    }

    if (!meta && cleanPath.startsWith('/projects/')) {
      const slug = cleanPath.replace('/projects/', '');
      const formattedTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      meta = {
        title: `${formattedTitle} Project Case Study | M/S Abdul Salam Constructions Company`,
        description: `Architectural parameters, structural execution, and civil specifications for ${formattedTitle} in Bhadohi, Uttar Pradesh.`,
        canonicalPath: cleanPath,
        breadcrumbName: formattedTitle,
        parentPath: '/projects',
        parentName: 'Projects'
      };
    }

    if (!meta) {
      meta = ROUTE_SEO_MAP['/'];
    }

    // 1. Update Title tag
    document.title = meta.title;

    // 2. Update Meta Description
    let descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }

    // 3. Update Canonical Tag
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', `https://abdulconstruction.com${meta.canonicalPath}`);
    }

    // 4. Update Open Graph Tags
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', `https://abdulconstruction.com${meta.canonicalPath}`);

    // 5. Update Twitter Tags
    const twitterTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleEl) twitterTitleEl.setAttribute('content', meta.title);

    const twitterDescEl = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescEl) twitterDescEl.setAttribute('content', meta.description);

    // 6. Dynamic BreadcrumbList JSON-LD Schema
    const existingBreadcrumbScript = document.getElementById('jsonld-breadcrumbs');
    if (existingBreadcrumbScript) {
      existingBreadcrumbScript.remove();
    }

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://abdulconstruction.com/'
      }
    ];

    if (meta.parentPath && meta.parentName) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': meta.parentName,
        'item': `https://abdulconstruction.com${meta.parentPath}`
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 3,
        'name': meta.breadcrumbName,
        'item': `https://abdulconstruction.com${meta.canonicalPath}`
      });
    } else if (meta.canonicalPath !== '/') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 2,
        'name': meta.breadcrumbName,
        'item': `https://abdulconstruction.com${meta.canonicalPath}`
      });
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems
    };

    const bScript = document.createElement('script');
    bScript.id = 'jsonld-breadcrumbs';
    bScript.type = 'application/ld+json';
    bScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(bScript);

    // 7. Dynamic Schema.org Service injection on Service Detail pages
    const existingServiceScript = document.getElementById('jsonld-service');
    if (existingServiceScript) {
      existingServiceScript.remove();
    }

    if (isServiceDetail && serviceDetailSlug) {
      const sData = INDIVIDUAL_SERVICES_DATA[serviceDetailSlug];
      if (sData) {
        const serviceSchema = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `https://abdulconstruction.com/services/${serviceDetailSlug}#service`,
          'name': sData.title,
          'serviceType': sData.serviceEntity,
          'category': sData.category,
          'description': sData.definition,
          'provider': {
            '@type': 'GeneralContractor',
            '@id': 'https://abdulconstruction.com/#business',
            'name': 'M/S ABDUL SALAM CONSTRUCTIONS COMPANY',
            'telephone': '+917007529965',
            'priceRange': '₹1500 - ₹2250 per sq.ft (+ 18% GST)',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Phase-II, Rajpura Colony, Opposite H.P. Petrol Pump, Aurai Road',
              'addressLocality': 'Bhadohi',
              'addressRegion': 'Uttar Pradesh',
              'postalCode': '221401',
              'addressCountry': 'IN'
            }
          },
          'areaServed': [
            { '@type': 'City', 'name': 'Bhadohi' },
            { '@type': 'AdministrativeArea', 'name': 'Gyanpur' },
            { '@type': 'AdministrativeArea', 'name': 'Aurai' },
            { '@type': 'AdministrativeArea', 'name': 'Gopiganj' },
            { '@type': 'AdministrativeArea', 'name': 'Suriyawan' },
            { '@type': 'AdministrativeArea', 'name': 'Khamaria' },
            { '@type': 'AdministrativeArea', 'name': 'Sant Ravidas Nagar District' }
          ],
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Construction Quotation Packages',
            'itemListElement': sData.packageComparison.map((pkg) => ({
              '@type': 'Offer',
              'name': pkg.packageName,
              'priceSpecification': {
                '@type': 'PriceSpecification',
                'price': pkg.rate,
                'priceCurrency': 'INR'
              },
              'description': pkg.scopeSummary
            }))
          }
        };

        const sScript = document.createElement('script');
        sScript.id = 'jsonld-service';
        sScript.type = 'application/ld+json';
        sScript.text = JSON.stringify(serviceSchema);
        document.head.appendChild(sScript);
      }
    }
  }, [currentPath]);

  return null;
};
