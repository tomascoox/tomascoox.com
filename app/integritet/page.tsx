import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integritetspolicy – JAX',
  robots: { index: false },
}

export default function Integritet() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Integritetspolicy för JAX</h1>
      <div className="mt-8 space-y-5 text-base font-light leading-relaxed text-white/80">
        <p>
          JAX är ett privat verktyg som Tomas Coox (Studio Joox AB) använder för att hantera sina
          egna Google-tjänster, som Search Console och Google Kalender.
        </p>
        <p>Appen används bara av Tomas Coox och är inte tillgänglig för andra.</p>
        <p>
          De data appen läser från ditt Google-konto används enbart för att visa och hantera dina
          egna tjänster. De sparas lokalt på Tomas Coox egen dator och delas inte med, säljs inte
          till och överförs inte till någon tredje part.
        </p>
        <p>
          Åtkomsten kan när som helst återkallas under myaccount.google.com/permissions.
        </p>
        <p>
          Kontakt:{' '}
          <a className="underline" href="mailto:info@joox.se">
            info@joox.se
          </a>
        </p>
      </div>
    </main>
  )
}
