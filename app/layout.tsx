import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
    variable: '--font-lato',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://tomascoox.com'),
    title: 'Tomas Coox — Musiker · Utvecklare · Lärare',
    description:
        'Jag bygger saker — på scen, i kod och i klassrummet. Studio Joox, Timrå Kulturskola, Roulette.',
    openGraph: {
        title: 'Tomas Coox',
        description: 'Musiker · Utvecklare · Lärare — på scen, i kod och i klassrummet.',
        url: 'https://tomascoox.com',
        siteName: 'Tomas Coox',
        locale: 'sv_SE',
        type: 'website',
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tomas Coox' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tomas Coox',
        description: 'Musiker · Utvecklare · Lärare',
        images: ['/og.png'],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="sv"
            className={lato.variable}
        >
            <body className="font-sans bg-black text-white">
                {children}
            </body>
        </html>
    )
}
