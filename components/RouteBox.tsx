import Image from 'next/image'

/**
 * RouteBox — den centrerade glasiga "vägdelaren".
 *
 * Datadriven: fyll på VENTURES med en rad för fler verksamheter.
 * En slot med `href` blir en länk; utan `href` en passiv slot (redo att
 * swappas till länk senare). En slot med `logo` visar bild, annars wordmark.
 */

type Venture = {
  name: string
  /** Liten kontextrad ("eyebrow") — berättar VAD verksamheten är. */
  eyebrow?: string
  href?: string
  logo?: {
    src: string
    width: number
    height: number
    alt: string
    /** Höjdklass per logga — vissa märken behöver optiskt mindre yta. */
    heightClass?: string
  }
}

// Friklippt porträtt (Cloudinary AI bg-removal on-the-fly) till medaljongen.
const AVATAR_URL =
  'https://res.cloudinary.com/dlgygfs0a/image/upload/e_background_removal/c_thumb,g_face,z_0.95,ar_1:1,w_400/f_png/v1733583224/tomas-cool-solglasogon_tauhyi.png'

const VENTURES: Venture[] = [
  {
    name: 'Studio Joox AB',
    eyebrow: 'VD & ägare • App- och webbutveckling',
    href: 'https://joox.se',
    logo: {
      src: 'https://res.cloudinary.com/dlgygfs0a/image/upload/f_auto,q_auto,w_600/v1783930192/logo_chrome-800x318_dgpysq.png',
      width: 800,
      height: 318,
      alt: 'Studio Joox AB',
    },
  },
  {
    name: 'Timrå Kulturskola',
    eyebrow: 'Lärare i piano och spelutveckling',
    href: 'https://studyalong.se/timra',
    logo: {
      src: 'https://res.cloudinary.com/dlgygfs0a/image/upload/f_auto,q_auto,w_600/v1783930999/TIKU_Logo_-_Bl%C3%A5_bmhav0.png',
      width: 600,
      height: 201,
      alt: 'Timrå Kulturskola',
      heightClass: 'h-[3.5rem]',
    },
  },
  {
    name: 'Roulette',
    eyebrow: 'Keyboardist i AOR-bandet Roulette',
    href: 'https://www.rouletteswe.se/',
    logo: {
      src: 'https://res.cloudinary.com/dlgygfs0a/image/upload/f_auto,q_auto,w_600/v1783929893/ROULETTE_LOGO_2023_GOLDEN_EDGE_djdapx.png',
      width: 600,
      height: 249,
      alt: 'Roulette',
    },
  },
  {
    name: 'Wonderland',
    eyebrow: 'Keyboardist i disco partybandet Wonderland',
    href: 'https://www.facebook.com/Wonderlandsundsvall',
    logo: {
      src: 'https://res.cloudinary.com/dlgygfs0a/image/upload/f_auto,q_auto,w_600/v1783968031/Wonderland_u524qh.png',
      width: 600,
      height: 142,
      alt: 'Wonderland',
    },
  },
  {
    // Wordmark tills ev. logga finns.
    name: 'Martin Häggström',
    eyebrow:
      'Pianist/keyboardist med artisten och sångaren Martin Häggström i hans olika konstellationer',
  },
]

function SlotInner({ venture }: { venture: Venture }) {
  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      {venture.logo ? (
        <Image
          src={venture.logo.src}
          alt={venture.logo.alt}
          width={venture.logo.width}
          height={venture.logo.height}
          priority
          className={`${venture.logo.heightClass ?? 'h-[4.5rem]'} w-auto max-w-[86%] select-none object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
        />
      ) : (
        // Wordmark-fallback — samma slot-känsla som logo-slots.
        <span className="block w-full select-none text-center text-[1.35rem] font-bold uppercase leading-[1.1] tracking-[0.2em] [text-indent:0.2em] text-white transition-colors duration-300 group-hover:text-white">
          {venture.name}
        </span>
      )}
      {venture.eyebrow && (
        <span className="block w-full select-none text-center text-[0.58rem] font-medium uppercase tracking-[0.32em] [text-indent:0.32em] text-white">
          {venture.eyebrow}
        </span>
      )}
    </div>
  )
}

const SLOT_BASE =
  'group relative flex w-full items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 transition-all duration-300'

export default function RouteBox() {
  return (
    <div className="animate-rise relative w-full max-w-[450px] px-5 pt-20 sm:max-w-[660px]">
      {/* Medaljong — friklippt porträtt svävande över lådans övre kant */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
        <div className="animate-breathe relative h-40 w-40 overflow-hidden rounded-full border border-white/20 bg-[radial-gradient(circle_at_50%_28%,#1a2247,#05070f_75%)] shadow-[0_0_70px_-12px_rgba(130,160,255,0.55)]">
          <Image
            src={AVATAR_URL}
            alt="Tomas Coox"
            fill
            priority
            sizes="160px"
            className="translate-y-3 scale-[1.08] object-cover"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] px-7 pb-8 pt-[6.75rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* Svag topp-glimt så lådan svävar mot rymden */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* Namn / rubrik */}
        <header className="mb-10 text-center">
          <h1 className="text-[1.45rem] font-semibold uppercase leading-none tracking-[0.28em] text-white">
            <span className="ml-[0.28em]">Tomas&nbsp;Coox</span>
          </h1>
          <p className="mt-3.5 text-[0.72rem] font-light uppercase tracking-[0.3em] text-white">
            <span className="ml-[0.3em]">Musiker&nbsp;·&nbsp;Utvecklare&nbsp;·&nbsp;Lärare</span>
          </p>
          <p className="mx-auto mt-4 max-w-[30ch] text-[0.9rem] font-light leading-relaxed text-white">
            Trettio år av scen, mediaproduktion, kod och undervisning.
          </p>
        </header>

        {/* Verksamhets-slots (datadrivna) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VENTURES.map((venture, i) => {
            // Udda antal → sista sloten spänner båda kolumnerna (ser avsiktligt ut).
            const spanFull =
              VENTURES.length % 2 === 1 && i === VENTURES.length - 1
                ? ' sm:col-span-2'
                : ''
            return venture.href ? (
              <a
                key={venture.name}
                href={venture.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={venture.name}
                style={{ animationDelay: `${300 + i * 110}ms` }}
                className={`${SLOT_BASE} animate-slot-rise cursor-pointer hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-8px_rgba(150,180,255,0.35)] active:scale-[0.98]${spanFull}`}
              >
                <SlotInner venture={venture} />
              </a>
            ) : (
              <div
                key={venture.name}
                aria-label={venture.name}
                style={{ animationDelay: `${300 + i * 110}ms` }}
                className={`${SLOT_BASE} animate-slot-rise${spanFull}`}
              >
                <SlotInner venture={venture} />
              </div>
            )
          })}
        </div>

        {/* Kontakt — diskret, avdelare ovanför */}
        <footer className="mt-9 border-t border-white/[0.07] pt-6 text-center">
          <div className="flex flex-col items-center gap-1.5 text-[0.8rem] font-light tracking-wide text-white">
            <a
              href="mailto:tomas@joox.se"
              className="transition-colors duration-200 hover:text-white/75"
            >
              tomas@joox.se
            </a>
            <a
              href="tel:+46706426805"
              className="transition-colors duration-200 hover:text-white/75"
            >
              070-642&nbsp;68&nbsp;05
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
