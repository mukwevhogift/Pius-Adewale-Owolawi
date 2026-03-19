import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.piusowolawi.com'

    // NOTE: Google ignores URL fragments (#anchor), so only the main page
    // URL is included. All sections are part of the single-page app.
    return [
        {
            url: baseUrl,
            lastModified: '2026-03-19',
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
