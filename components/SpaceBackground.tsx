'use client'

import { useEffect, useRef } from 'react'

/**
 * SpaceBackground — Canvas 2D rymdeffekt.
 *
 * - Stjärnor med äkta Z-DJUP som färdas mot betraktaren: föds långt bort nära
 *   mitten, växer och rör sig utåt (perspektiv-projektion), respawnar vid passage.
 * - Musparallax ovanpå: nära stjärnor (stor skala) förskjuts mest av pekaren.
 * - Mjuk nebulosa-glöd som följer pekaren/fingret trögt (lerp).
 * - Lever utan mus: långsam autonom drift alltid igång; touch följer fingret.
 * - Stjärnfall (meteorer) då och då.
 * - devicePixelRatio-medveten, pausar vid document.hidden.
 * - prefers-reduced-motion: statiska stjärnor, ingen animation, ingen glöd-drift.
 *
 * Inga dependencies. requestAnimationFrame-driven.
 */

type Star = {
  // Position i normaliserat "rymdplan" kring mitten (-1..1), projiceras med 1/z.
  x: number
  y: number
  z: number // 1 = längst bort, → 0 = framme vid betraktaren
  speed: number // z-enheter per sekund
  r: number // basradie i css-px (vid z = REF_Z)
  a: number // basalfa
  tw: number // twinkle-fas
  tws: number // twinkle-hastighet
}

// Nebulosa-toner (kalla rymdblått + en varm glimt) — låg mättnad, premium.
const NEBULA = [
  { c: '99, 132, 255', w: 0.55 }, // svalt blått
  { c: '150, 120, 255', w: 0.35 }, // violett
  { c: '90, 200, 210', w: 0.28 }, // cyan-glimt
]

const Z_NEAR = 0.08 // respawn-gräns
const Z_FAR = 1

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const context = el.getContext('2d', { alpha: false })
    if (!context) return
    // Non-null-alias så control-flow-narrowingen håller inne i nested closures.
    const canvas: HTMLCanvasElement = el
    const ctx: CanvasRenderingContext2D = context

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1

    const stars: Star[] = []

    // Pekar-styrning (normaliserad -0.5..0.5 kring mitten).
    const pointer = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 } // trög lerp av pointer
    // Autonom drift (lever utan mus).
    let driftT = 0

    function spawnStar(initial: boolean): Star {
      return {
        x: (Math.random() * 2 - 1) * 1.1,
        y: (Math.random() * 2 - 1) * 1.1,
        // Vid sidstart sprids djupet över hela spannet (annars föds alla samtidigt
        // långt bort och kommer som en "våg"); vid respawn börjar de längst bort.
        z: initial ? Z_NEAR + Math.random() * (Z_FAR - Z_NEAR) : Z_FAR,
        speed: 0.018 + Math.random() * 0.03, // ~30-55 s resa → lugnt, inte hyperspace
        r: 0.5 + Math.random() * 0.9,
        a: 0.35 + Math.random() * 0.6,
        tw: Math.random() * Math.PI * 2,
        tws: 0.6 + Math.random() * 1.6,
      }
    }

    function seedStars() {
      stars.length = 0
      // Täthet skalar med yta så mobil inte överlastas.
      const count = Math.min(Math.max(Math.round((width * height) / 5500), 70), 340)
      for (let s = 0; s < count; s++) stars.push(spawnStar(true))
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedStars()
    }

    // Stjärnfall — enstaka meteorer med glödande svans.
    type Meteor = {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }
    const meteors: Meteor[] = []
    let nextMeteor = 2 + Math.random() * 3

    function spawnMeteor() {
      const fromLeft = Math.random() < 0.5
      const speed = 550 + Math.random() * 350
      const angle = (25 + Math.random() * 20) * (Math.PI / 180)
      meteors.push({
        x: width * (fromLeft ? Math.random() * 0.4 : 0.6 + Math.random() * 0.4),
        y: height * (0.05 + Math.random() * 0.3),
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.5,
      })
    }

    function drawMeteors(dt: number) {
      nextMeteor -= dt
      if (nextMeteor <= 0 && meteors.length < 3) {
        spawnMeteor()
        nextMeteor = 3 + Math.random() * 5
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.life += dt
        if (m.life >= m.maxLife) {
          meteors.splice(i, 1)
          continue
        }
        m.x += m.vx * dt
        m.y += m.vy * dt
        // Mjuk in/ut-fade över livslängden.
        const p = m.life / m.maxLife
        const alpha = Math.sin(Math.PI * p) * 0.9
        const tail = 0.11 // sekunder av svans
        const tx = m.x - m.vx * tail
        const ty = m.y - m.vy * tail
        const g = ctx!.createLinearGradient(tx, ty, m.x, m.y)
        g.addColorStop(0, 'rgba(180,200,255,0)')
        g.addColorStop(1, `rgba(230,240,255,${alpha})`)
        ctx!.strokeStyle = g
        ctx!.lineWidth = 1.6
        ctx!.lineCap = 'round'
        ctx!.beginPath()
        ctx!.moveTo(tx, ty)
        ctx!.lineTo(m.x, m.y)
        ctx!.stroke()
        // Liten glödande kärna längst fram.
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = '#f2f6ff'
        ctx!.beginPath()
        ctx!.arc(m.x, m.y, 1.4, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
      }
    }

    function drawNebula(cx: number, cy: number) {
      const big = Math.max(width, height) * 0.9
      NEBULA.forEach((n, i) => {
        const ox = cx + Math.cos(driftT * 0.3 + i) * width * 0.05
        const oy = cy + Math.sin(driftT * 0.24 + i) * height * 0.05
        const rad = big * (0.6 + i * 0.22)
        const g = ctx!.createRadialGradient(ox, oy, 0, ox, oy, rad)
        g.addColorStop(0, `rgba(${n.c}, ${0.28 * n.w})`)
        g.addColorStop(0.4, `rgba(${n.c}, ${0.13 * n.w})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.fillStyle = g
        ctx!.fillRect(0, 0, width, height)
      })
    }

    /**
     * Projicerar och ritar en stjärna. Perspektiv: skala = REF/z → nära
     * stjärnor är större, längre från mitten och svarar mest på parallaxen.
     */
    function drawStar(star: Star, camX: number, camY: number, dt: number) {
      const persp = 0.32 / star.z // projektionsfaktor
      const spread = Math.min(width, height) * 0.9
      // Parallax: skalar med närhet (persp) — nära stjärnor förskjuts mest.
      const parX = -camX * 90 * persp
      const parY = -camY * 90 * persp
      const px = width / 2 + star.x * spread * persp + parX
      const py = height / 2 + star.y * spread * persp + parY

      // Utanför synfält med marginal → återföd långt bort.
      if (px < -60 || px > width + 60 || py < -60 || py > height + 60) {
        Object.assign(star, spawnStar(false))
        return
      }

      star.tw += star.tws * dt
      const twinkle = 0.7 + Math.sin(star.tw) * 0.3
      // Fade-in från fjärran (z nära 1 → svag) så respawn aldrig "poppar".
      const depthFade = Math.min(1, (Z_FAR - star.z) * 3 + 0.15)
      const radius = star.r * (0.35 + persp * 1.6)

      ctx!.globalAlpha = star.a * twinkle * depthFade
      ctx!.fillStyle = '#e6ecff'
      ctx!.beginPath()
      ctx!.arc(px, py, radius, 0, Math.PI * 2)
      ctx!.fill()
    }

    function paintStatic() {
      // reduced-motion: en enda stilla ram (projicerad, men utan rörelse).
      ctx!.fillStyle = '#000'
      ctx!.fillRect(0, 0, width, height)
      drawNebula(width * 0.5, height * 0.42)
      ctx!.globalCompositeOperation = 'lighter'
      for (const star of stars) drawStar(star, 0, 0, 0)
      ctx!.globalAlpha = 1
      ctx!.globalCompositeOperation = 'source-over'
    }

    let raf = 0
    let last = performance.now()

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      driftT += dt

      // Trög lerp mot pekaren (mjuk nebulosa-/parallax-följning).
      smooth.x += (pointer.x - smooth.x) * 0.085
      smooth.y += (pointer.y - smooth.y) * 0.085

      // Autonom drift så scenen lever utan mus.
      const autoX = Math.cos(driftT * 0.08) * 0.5 + Math.sin(driftT * 0.033) * 0.3
      const autoY = Math.sin(driftT * 0.06) * 0.5 + Math.cos(driftT * 0.027) * 0.3

      const camX = smooth.x + autoX * 0.35
      const camY = smooth.y + autoY * 0.35

      ctx!.fillStyle = '#000'
      ctx!.fillRect(0, 0, width, height)

      // Nebulosa centrerad kring pekare (annars mitten) + drift.
      const nebCx = width * (0.5 + smooth.x * 0.55) + autoX * width * 0.04
      const nebCy = height * (0.44 + smooth.y * 0.45) + autoY * height * 0.04
      drawNebula(nebCx, nebCy)

      ctx!.globalCompositeOperation = 'lighter'
      for (const star of stars) {
        // Färdas mot betraktaren; snabbare ju närmare (lätt acceleration).
        star.z -= star.speed * (0.6 + (Z_FAR - star.z) * 0.8) * dt
        if (star.z <= Z_NEAR) {
          Object.assign(star, spawnStar(false))
        }
        drawStar(star, camX, camY, dt)
      }

      drawMeteors(dt)

      ctx!.globalAlpha = 1
      ctx!.globalCompositeOperation = 'source-over'

      raf = requestAnimationFrame(frame)
    }

    function setPointerFromClient(clientX: number, clientY: number) {
      pointer.x = clientX / width - 0.5
      pointer.y = clientY / height - 0.5
    }

    function onMouseMove(e: MouseEvent) {
      setPointerFromClient(e.clientX, e.clientY)
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        setPointerFromClient(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    function onVisibility() {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      } else if (!reduced && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    function onResize() {
      resize()
      if (reduced) paintStatic()
    }

    resize()

    if (reduced) {
      paintStatic()
    } else {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchstart', onTouchMove, { passive: true })
      raf = requestAnimationFrame(frame)
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  )
}
