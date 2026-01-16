import { client } from '@/lib/sanity'
import { allProgramsQuery } from '@/lib/queries'

const EXTERNAL_DATA_URL = 'https://hopehasnoborders.org'

function generateSiteMap(programs: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/programs</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/resources</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/stories</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/volunteer</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/donate</loc>
     </url>
     ${programs
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/programs/${slug.current}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function GET() {
  const programs = await client.fetch(allProgramsQuery)
  const sitemap = generateSiteMap(programs)

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
