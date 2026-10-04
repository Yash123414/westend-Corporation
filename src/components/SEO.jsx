import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * SEO component for managing page meta tags and structured data
 */
const SEO = ({
    title = 'Acornpensy Exports - Premium International Food Exporter | USA, Canada & Worldwide',
    description = 'Leading international food exporter from India. Shipping to USA, Canada & worldwide. FSSAI certified. Premium groceries, pulses, spices & frozen vegetables. B2B bulk orders. Competitive export pricing since 2014.',
    keywords = 'Acornpensy Exports, Acornpensy Exports India, Acornpensy Exports Delhi, Acornpensy Foods, Acornpensy, food exporters, food exporters India, food exports, worldwide food exporter, international food exporter, global food exporters, food export company, Indian food exporters, food exporters to USA, food exporters to Canada, food exporters worldwide, bulk food exporters, wholesale food exporters, organic food exporters, B2B food exporters, FSSAI certified exporters, spices exporters, pulses exporters, frozen vegetables exporters',
    ogImage = 'https://acornpensyexports.com/og-image.jpg',
    ogType = 'website',
    structuredData = null,
    canonical = null
}) => {
    const siteUrl = 'https://acornpensyexports.com'
    const fullCanonical = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl)

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Acornpensy Exports" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Additional SEO Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="Acornpensy Exports" />
            <meta name="geo.region" content="IN-DL" />
            <meta name="geo.placename" content="Delhi" />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO

// Helper function to generate organization structured data
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Acornpensy Exports",
    "url": "https://acornpensyexports.com",
    "logo": {
        "@type": "ImageObject",
        "url": "https://acornpensyexports.com/logo.png"
    },
    "description": "Premium international food exporter from India",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "B-106, Phase-1, Okhla",
        "addressLocality": "New Delhi",
        "postalCode": "110020",
        "addressCountry": "IN"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9599042226",
        "contactType": "Customer Service",
        "email": "Export@acornpensyexports.com"
    }
})

// Helper function to generate WebSite structured data for sitelinks
export const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Acornpensy Exports",
    "alternateName": "Acornpensy Foods & Exports",
    "url": "https://acornpensyexports.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://acornpensyexports.com/products?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    },
    "about": {
        "@type": "Organization",
        "name": "Acornpensy Exports"
    }
})

// Helper function to generate product structured data
export const getProductSchema = (product) => {
    // Get all product images (main + additional)
    const productImages = []

    // Add main image
    if (product.image) {
        const mainImage = product.image.startsWith('http')
            ? product.image
            : `https://acornpensyexports.com${product.image}`
        productImages.push(mainImage)
    }

    // Add additional images
    if (product.image_2) {
        const image2 = product.image_2.startsWith('http')
            ? product.image_2
            : `https://acornpensyexports.com${product.image_2}`
        productImages.push(image2)
    }

    if (product.image_3) {
        const image3 = product.image_3.startsWith('http')
            ? product.image_3
            : `https://acornpensyexports.com${product.image_3}`
        productImages.push(image3)
    }

    // NO PLACEHOLDER - Only use real product images from backend

    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": productImages,
        "description": product.description || `International bulk exporter of ${product.name}. Premium quality, FSSAI certified. Exporting to USA, Canada, and worldwide. Minimum order quantity: ${product.moq || 'Contact for details'}. Contact for competitive export pricing.`,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Acornpensy Organic"
        },
        "category": product.vertical_name || "Food Products",
        "sku": `WC-${product.id}`,
        "mpn": `WC-${product.id}`,
        "manufacturer": {
            "@type": "Organization",
            "name": "Acornpensy Exports",
            "description": "Leading International Food Exporter - Shipping to USA, Canada & Worldwide"
        },
        "offers": {
            "@type": "Offer",
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "price": "0", // 0 indicates 'Contact for Price' in some contexts, but priceSpecification is better
            "priceCurrency": "USD",
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "url": `https://acornpensyexports.com/product/${product.slug}`,
            "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceType": "https://schema.org/InvoicePrice",
                "priceCurrency": "USD",
                "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": product.moq || "Bulk Orders",
                    "unitText": "MOQ"
                }
            },
            "businessFunction": "http://purl.org/goodrelations/v1#Sell",
            "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "minValue": "1",
                "unitText": "International Bulk Orders"
            },
            "eligibleRegion": [
                {
                    "@type": "Place",
                    "name": "United States"
                },
                {
                    "@type": "Place",
                    "name": "Canada"
                },
                {
                    "@type": "Place",
                    "name": "Worldwide"
                }
            ],
            "seller": {
                "@type": "Organization",
                "name": "Acornpensy Exports - International Food Exporter",
                "description": "Premium food exporter to USA, Canada, and worldwide markets since 2014",
                "url": "https://acornpensyexports.com",
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN",
                    "addressLocality": "Delhi"
                }
            }
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Minimum Order Quantity",
                "value": product.moq || "Contact for details"
            },
            {
                "@type": "PropertyValue",
                "name": "Packaging",
                "value": product.packaging || "Export-quality bulk packaging"
            },
            {
                "@type": "PropertyValue",
                "name": "Business Type",
                "value": "International Exporter, Bulk Supplier, B2B - USA, Canada, Worldwide"
            },
            {
                "@type": "PropertyValue",
                "name": "Certifications",
                "value": product.certifications || "FSSAI Certified, Export Quality"
            },
            {
                "@type": "PropertyValue",
                "name": "Export Markets",
                "value": "USA, Canada, and Worldwide"
            }
        ]
    }
}

// Helper function to generate breadcrumb structured data
export const getBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
})

// Helper function to generate FAQ structured data for products
export const getFAQSchema = (product) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": `What is the minimum order quantity for ${product.name}?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `The minimum order quantity (MOQ) for ${product.name} is ${product.moq || 'available on request'}. We cater to bulk and wholesale orders for international export.`
            }
        },
        {
            "@type": "Question",
            "name": `Do you export ${product.name} to USA and Canada?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `Yes, we export ${product.name} to USA, Canada, and worldwide markets. Acornpensy Exports is a leading international food exporter with FSSAI certification and export-quality packaging.`
            }
        },
        {
            "@type": "Question",
            "name": `Is ${product.name} FSSAI certified?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `Yes, all our products including ${product.name} are FSSAI certified and meet international export quality standards. We ensure premium quality for all bulk orders.`
            }
        },
        {
            "@type": "Question",
            "name": `What is the packaging for bulk ${product.name} orders?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `${product.name} is available in ${product.packaging || 'export-quality bulk packaging'}. We can customize packaging based on your requirements for international shipping.`
            }
        }
    ]
})

