import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 mr-5 bg-transparent">
            <Link href="/" className="w-12 h-12 rounded-full overflow-hidden border border-white border-opacity-30">
                <Image
                    src="/disney-tomas.png"
                    alt="Tomas Coox"
                    width={48}
                    height={48}
                    objectFit="cover"
                    className="object-center -mt-1"
                />
            </Link>
            <ul className="flex space-x-6">
                <li>
                    <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                </li>
                <li>
                    <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
                </li>
                <li>
                    <Link href="/experience" className="hover:text-cyan-400 transition-colors">Experience</Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
