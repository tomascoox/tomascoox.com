import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-6 mr-5 bg-black text-white">
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
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/projects">Projects</Link>
                </li>
                <li>
                    <Link href="/experience">Experience</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
