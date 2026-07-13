import SpaceBackground from '@/components/SpaceBackground'
import RouteBox from '@/components/RouteBox'

export default function Home() {
  return (
    <>
      <SpaceBackground />
      {/* Filmisk grain-overlay ovanpå rymden för textur */}
      <div className="grain pointer-events-none fixed inset-0 -z-[5]" aria-hidden />
      <main className="relative flex min-h-[100dvh] w-full items-center justify-center py-10">
        <RouteBox />
      </main>
    </>
  )
}
