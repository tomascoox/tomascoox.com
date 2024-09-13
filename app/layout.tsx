import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
    variable: '--font-lato',
})

export const metadata: Metadata = {
    title: 'Full-Stack Developer, Musician, & Graphic Designer | Tomas Coox',
    description:
        'Explore the versatile portfolio of Tomas Coox, a full-stack web developer, talented musician, and skilled graphic designer specializing in both still and motion graphics. Discover innovative web solutions, captivating music projects, and stunning visual designs.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={lato.variable}
        >
            <body className="font-sans bg-black text-white">
                {children}
            </body>
        </html>
    )
}
