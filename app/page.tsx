// Main entry of site wow
import Hero from '@/components/Hero'
import Background3D from '@/components/Background3D'
import AnimatedSection from '@/components/AnimatedSection'

export default function Home() {
    return (
        <main className="relative w-full scroll-smooth">
            <Background3D />
            
            <div className="relative z-10">
                <section id="home" className="min-h-screen flex items-center pt-16">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <Hero />
                    </div>
                </section>
                
                <AnimatedSection />
            </div>
        </main>
    )
}
