import { useCallback, useEffect, useState } from "react"
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import styles from "../styles/bouquet.css?url"

/* =====================================================================
   BOUQUET MEDITERRANEO · rediseño 20/11/2026 (Lweb)
   El restaurante cerró. La web sigue en línea como referencia de Lweb:
   se ve viva, pero sin reservas ni pedidos (no hay nadie al otro lado),
   y el pie lo dice claramente. La web antigua sigue en components/
   (pizzeria-website.tsx) por si hiciera falta volver.
   ===================================================================== */

export const meta: MetaFunction = () => [
  { title: "Bouquet Mediterraneo · Cucina Mediterranea & Pizza · Sevelen" },
  { name: "description", content: "Neapolitanische Pizza aus dem Holzofen, Antipasti und Aperitivo in Sevelen. Website von Lweb." },
  { name: "theme-color", content: "#f4eee3" },
  { property: "og:title", content: "Bouquet Mediterraneo" },
  { property: "og:description", content: "Cucina Mediterranea & Pizza · Sevelen" },
  { property: "og:image", content: "/neu/forno-pizza.webp" },
]

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@400;500;600;700&display=swap" },
  { rel: "stylesheet", href: styles },
  { rel: "preload", as: "image", href: "/neu/forno-pizza.webp" },
]

type Gericht = { n: string; d: string; p: string; tag?: string }
type Kapitel = { id: string; titel: string; it: string; bild: string; alt: string; gerichte: Gericht[] }

const KARTE: Kapitel[] = [
  {
    id: "antipasti", titel: "Antipasti & Insalate", it: "Per cominciare", bild: "/neu/tagliere.webp", alt: "Tagliere mit Salumi und Formaggi",
    gerichte: [
      { n: "Tagliere di salumi e formaggi", d: "Italienische Salumi und Käse, mit Brot serviert", p: "26.50", tag: "Zum Teilen" },
      { n: "Lasagna", d: "Traditionell, mit Ragù und Béchamel", p: "24.50" },
      { n: "Parmigiana di Melanzane", d: "Auberginen aus dem Ofen, Tomate, Mozzarella, Parmigiano", p: "22.00", tag: "Vegetarisch" },
      { n: "Insalata Mista", d: "Tomaten, Gurken, Oliven und Zwiebeln", p: "14.00" },
      { n: "Insalata Verde", d: "Frische grüne Blattsalate", p: "11.00" },
    ],
  },
  {
    id: "pizze", titel: "Pizze napoletane", it: "Dal forno a legna", bild: "/neu/forno-pizza.webp", alt: "Pizza im Holzofen",
    gerichte: [
      { n: "Marinara", d: "Pomodoro, aglio, origano, basilico, olio evo", p: "17.50" },
      { n: "Margherita", d: "Pomodoro, mozzarella, basilico, olio evo", p: "19.00", tag: "Klassiker" },
      { n: "Bufalina", d: "Pomodoro, mozzarella di bufala, parmigiano, basilico", p: "20.00" },
      { n: "Vegetariana", d: "Mozzarella, melanzane, zucchine, datterini", p: "22.00", tag: "Vegetarisch" },
      { n: "4 Formaggi", d: "Fiordilatte, provola affumicata, gorgonzola, parmigiano", p: "22.00" },
      { n: "L’autentica", d: "Pomodoro, mozzarella, prosciutto cotto, funghi", p: "22.50" },
      { n: "Diavola", d: "Pomodoro, mozzarella, salame piccante, basilico", p: "22.50", tag: "Scharf" },
      { n: "Provola e Pepe", d: "Pomodoro, provola, pepe, basilico", p: "23.50" },
      { n: "Napoli", d: "Pomodoro, mozzarella, alici, capperi, olive, origano", p: "23.50" },
      { n: "4 Sapori", d: "Carciofi, prosciutto cotto, funghi, olive", p: "23.90" },
      { n: "Tonno e Cipolla", d: "Filetti di tonno sott’olio, cipolla, basilico", p: "27.00" },
      { n: "Burrata e Crudo", d: "Prosciutto crudo, burrata, basilico", p: "27.00", tag: "Empfehlung" },
      { n: "Crudo, Rucola e Grana", d: "Prosciutto crudo, rucola, grana", p: "27.00" },
      { n: "Salsiccia e Friarielli", d: "Fiordilatte, salsiccia, friarielli, basilico", p: "28.00" },
      { n: "Calzone Ripieno", d: "Fiordilatte, provola affumicata, cotto, salame", p: "28.00" },
      { n: "Mortadella e Pistacchio", d: "Mortadella al pistacchio, pistacchio, basilico", p: "28.50", tag: "Empfehlung" },
    ],
  },
  {
    id: "dolci", titel: "Dolci", it: "Fatti in casa", bild: "/neu/tiramisu.webp", alt: "Tiramisù",
    gerichte: [
      { n: "Tiramisù della casa", d: "Hausgemacht, mit Mascarpone und Espresso", p: "11.00" },
      { n: "Mini Cannoli Siciliani", d: "Gefüllt mit süsser Ricotta-Creme", p: "14.00" },
      { n: "Pizza alla Nutella", d: "Mit Puderzucker, zum Teilen", p: "16.00" },
    ],
  },
  {
    id: "drinks", titel: "Aperitivo & Drinks", it: "L’ora dell’aperitivo", bild: "/neu/spritz.webp", alt: "Spritz",
    gerichte: [
      { n: "Aperol Spritz", d: "Aperol, Prosecco, Soda", p: "14.00" },
      { n: "Campari Spritz", d: "Campari, Prosecco, Soda", p: "14.00" },
      { n: "Limoncello Spritz", d: "Limoncello, Prosecco, Soda", p: "14.00" },
      { n: "Negroni", d: "Gin, Campari, Vermouth", p: "16.50" },
      { n: "Negroni Sbagliato", d: "Mit Prosecco statt Gin", p: "16.00" },
      { n: "Americano", d: "Campari, Vermouth, Soda", p: "15.00" },
      { n: "Portofino Gin Tonic", d: "Mit mediterranen Kräutern", p: "18.50" },
      { n: "Crodino oder San Bitter Spritz", d: "Alkoholfrei", p: "8.50" },
      { n: "Birra Moretti 33 cl", d: "Auch als Zero 0,0 % (5.70)", p: "5.50" },
    ],
  },
]

/* Las ocho de la vitrina. Fotos de Unsplash (licencia libre), ver public/neu/QUELLEN.txt */
const VITRINE = [
  { n: "Margherita", b: "/neu/p-margherita.webp", tag: "Klassiker" },
  { n: "Bufalina", b: "/neu/p-bufalina.webp" },
  { n: "Burrata e Crudo", b: "/neu/p-crudo.webp", tag: "Empfehlung" },
  { n: "Diavola", b: "/neu/p-diavola.webp", tag: "Scharf" },
  { n: "4 Formaggi", b: "/neu/p-formaggi.webp" },
  { n: "Napoli", b: "/neu/p-napoli.webp" },
  { n: "Vegetariana", b: "/neu/p-vegetariana.webp", tag: "Vegetarisch" },
  { n: "Salsiccia e Friarielli", b: "/neu/p-friarielli.webp" },
]

const GALERIE = [
  { b: "/neu/forno.webp", a: "Der Holzofen glüht", k: "hoch" },
  { b: "/neu/u-sala.webp", a: "Der Gastraum am Abend" },
  { b: "/neu/pizzas.webp", a: "Zwei Pizze auf dem Tisch" },
  { b: "/neu/u-brindisi.webp", a: "Anstossen mit Rotwein" },
  { b: "/neu/aperitivo.webp", a: "Aperitivo auf der Terrasse", k: "hoch" },
  { b: "/neu/pasta.webp", a: "Pasta al pomodoro" },
  { b: "/neu/u-tavola.webp", a: "Gedeckter Tisch" },
  { b: "/neu/tagliere.webp", a: "Tagliere mit Salumi und Formaggi" },
  { b: "/neu/u-forno-fuoco.webp", a: "Pizza vor dem Feuer", k: "breit" },
  { b: "/neu/teig.webp", a: "Der Teig wird von Hand gezogen" },
  { b: "/neu/u-sala2.webp", a: "Gemütliche Tische" },
  { b: "/neu/terrasse.webp", a: "Die Terrasse an der Bahnhofstrasse" },
]

/* Reseñas reales de Google (las mismas que llevaba la web antigua). */
const STIMMEN = [
  { n: "Mauro Musarra", t: "5 Sterne sind zu wenig! Gemütlicher Ort, freundliches und kompetentes Personal und köstliche Pizzen. Meine neue Lieblingspizzeria." },
  { n: "Karin Bless", t: "Die Pizza war sensationell, mit frischen Zutaten. Da der Besitzer Sommelier ist, haben wir einen ausgezeichneten Wein getrunken. Man fühlt sich, als wäre man in Italien." },
  { n: "Stefano Calati", t: "Absolut die beste Pizza im Tal. Perfekte Pizza im Napoli-Stil und nach italienischen Standards." },
  { n: "Agam Unterreiner", t: "Das Essen war ein absoluter Genuss! Dari, der Besitzer, ist ein ausgezeichneter Sommelier. Als Vorspeise hatten wir das Tagliere – ein echter Genuss." },
  { n: "Ana Busuioc", t: "Ausgezeichnetes Preis-Leistungs-Verhältnis. Das Essen ist authentisch und köstlich." },
  { n: "Rico Turnell", t: "Wow, diese Pizza ist unglaublich, vielen Dank für das Geschmackserlebnis." },
]

const NAV = [
  { h: "#geschichte", t: "Über uns" },
  { h: "#pizze", t: "Pizze" },
  { h: "#karte", t: "Speisekarte" },
  { h: "#galerie", t: "Galerie" },
  { h: "#besuch", t: "Besuch" },
]

function Olive({ className = "" }: { className?: string }) {
  return <img className={className} src="/neu/olive.png" alt="" aria-hidden="true" width={60} height={54} />
}

function Sterne() {
  return (
    <span className="bq-sterne" aria-label="5 von 5 Sternen">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
      ))}
    </span>
  )
}

/* =====================================================================
   RESERVAS DE MUESTRA (20/11/2026)
   Formulario completo y bonito, pero no envía nada a ningún sitio:
   al pulsar «reservieren» enseña que el restaurante está cerrado.
   Sirve de escaparate para restaurantes que quieran un sistema así.
   ===================================================================== */
const TAGE_KURZ = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
const MONATE = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."]

function slots(tag: number) {
  // Mo Ruhetag · Di–Fr Mittag + Abend · Sa–So nur Abend (wie die Öffnungszeiten)
  if (tag === 1) return { mittag: [], abend: [] }
  const mittag = tag >= 2 && tag <= 5 ? ["11:30", "12:00", "12:30", "13:00"] : []
  const abend = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
  return { mittag, abend }
}

function TischIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11h16M8 11v8M16 11v8M2.5 6.5v12.5M2.5 15h3.5v4M21.5 6.5v12.5M21.5 15H18v4" />
      <path d="M10.6 3.2h2.8l-.35 2.9a1.05 1.05 0 0 1-2.1 0zM12 7.2v3.8" />
    </svg>
  )
}

function Reservieren({ onClose }: { onClose: () => void }) {
  const [tage] = useState(() => {
    const out: Date[] = []
    const d = new Date(); d.setHours(12, 0, 0, 0)
    for (let i = 0; i < 21; i++) { out.push(new Date(d)); d.setDate(d.getDate() + 1) }
    return out
  })
  const ersterOffen = tage.findIndex((t) => t.getDay() !== 1)
  const [personen, setPersonen] = useState(2)
  const [tagI, setTagI] = useState(ersterOffen)
  const [zeit, setZeit] = useState("19:00")
  const [bereich, setBereich] = useState("Innen")
  const [anlass, setAnlass] = useState("")
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [mail, setMail] = useState("")
  const [wunsch, setWunsch] = useState("")
  const [hinweis, setHinweis] = useState(false)

  const tag = tage[tagI]
  const sl = slots(tag.getDay())
  const alle = [...sl.mittag, ...sl.abend]
  const zeitOk = alle.includes(zeit) ? zeit : alle[0]
  const datumLang = `${TAGE_KURZ[tag.getDay()]}, ${tag.getDate()}. ${MONATE[tag.getMonth()]}`

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", k)
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = "" }
  }, [onClose])

  return (
    <div className="bq-res" role="dialog" aria-modal="true" aria-labelledby="bq-res-titel" onClick={onClose}>
      <div className="bq-res__karte" onClick={(e) => e.stopPropagation()}>
        <button className="bq-res__zu" aria-label="Schliessen" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <aside className="bq-res__bild">
          <img src="/neu/u-tavola.webp" alt="" />
          <div className="bq-res__bildtxt">
            <Olive className="bq-res__olive" />
            <p>«Un tavolo per voi.»</p>
            <span>Bahnhofstrasse 46 · Sevelen</span>
          </div>
        </aside>

        <div className="bq-res__inhalt">

          {!hinweis ? (
            <form className="bq-res__form" noValidate onSubmit={(e) => { e.preventDefault(); setHinweis(true) }}>
              <p className="bq-kicker">Prenotazione</p>
              <h2 id="bq-res-titel">Tisch <em>reservieren</em></h2>

              <fieldset className="bq-res__feld">
                <legend>Personen</legend>
                <div className="bq-res__chips">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <button type="button" key={n} className={"bq-chip" + (personen === n ? " is-an" : "")} aria-pressed={personen === n} onClick={() => setPersonen(n)}>{n}</button>
                  ))}
                  <button type="button" className={"bq-chip bq-chip--breit" + (personen > 8 ? " is-an" : "")} aria-pressed={personen > 8} onClick={() => setPersonen(10)}>9+</button>
                </div>
              </fieldset>

              <fieldset className="bq-res__feld">
                <legend>Datum</legend>
                <div className="bq-res__tage">
                  {tage.map((t, i) => {
                    const zu = t.getDay() === 1
                    return (
                      <button type="button" key={i} disabled={zu} className={"bq-tag" + (i === tagI ? " is-an" : "") + (zu ? " is-zu" : "")} aria-pressed={i === tagI}
                        onClick={() => setTagI(i)} aria-label={zu ? `${t.getDate()}. ${MONATE[t.getMonth()]}: Ruhetag` : undefined}>
                        <span>{i === 0 ? "Heute" : i === 1 ? "Morgen" : TAGE_KURZ[t.getDay()]}</span>
                        <b>{t.getDate()}</b>
                        <small>{zu ? "Ruhetag" : MONATE[t.getMonth()]}</small>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <fieldset className="bq-res__feld">
                <legend>Uhrzeit</legend>
                {sl.mittag.length > 0 && (
                  <div className="bq-res__gruppe"><span>Mittag</span>
                    <div className="bq-res__chips">{sl.mittag.map((z) => <button type="button" key={z} className={"bq-chip" + (zeitOk === z ? " is-an" : "")} aria-pressed={zeitOk === z} onClick={() => setZeit(z)}>{z}</button>)}</div>
                  </div>
                )}
                <div className="bq-res__gruppe"><span>Abend</span>
                  <div className="bq-res__chips">{sl.abend.map((z) => <button type="button" key={z} className={"bq-chip" + (zeitOk === z ? " is-an" : "")} aria-pressed={zeitOk === z} onClick={() => setZeit(z)}>{z}</button>)}</div>
                </div>
              </fieldset>

              <div className="bq-res__zwei">
                <fieldset className="bq-res__feld">
                  <legend>Bereich</legend>
                  <div className="bq-seg">
                    {["Innen", "Terrasse"].map((b) => <button type="button" key={b} className={bereich === b ? "is-an" : ""} aria-pressed={bereich === b} onClick={() => setBereich(b)}>{b}</button>)}
                  </div>
                </fieldset>
                <label className="bq-res__feld">
                  <span className="bq-res__lbl">Anlass <i>(optional)</i></span>
                  <select value={anlass} onChange={(e) => setAnlass(e.target.value)}>
                    <option value="">Kein besonderer</option>
                    <option>Geburtstag</option>
                    <option>Jahrestag</option>
                    <option>Geschäftsessen</option>
                    <option>Familienfeier</option>
                  </select>
                </label>
              </div>

              <div className="bq-res__zwei">
                <label className="bq-res__feld"><span className="bq-res__lbl">Name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Vor- und Nachname" /></label>
                <label className="bq-res__feld"><span className="bq-res__lbl">Telefon</span>
                  <input value={tel} onChange={(e) => setTel(e.target.value)} type="tel" autoComplete="tel" placeholder="+41 …" /></label>
              </div>
              <label className="bq-res__feld"><span className="bq-res__lbl">E-Mail</span>
                <input value={mail} onChange={(e) => setMail(e.target.value)} type="email" autoComplete="email" placeholder="Für die Bestätigung" /></label>
              <label className="bq-res__feld"><span className="bq-res__lbl">Wünsche <i>(optional)</i></span>
                <textarea value={wunsch} onChange={(e) => setWunsch(e.target.value)} rows={2} placeholder="Allergien, Kinderstuhl, Tisch am Fenster …" /></label>

              <div className="bq-res__fuss">
                <p className="bq-res__summe">
                  <TischIcon className="bq-res__summe-i" />
                  <span><b>{datumLang} · {zeitOk}</b>{personen > 8 ? "9+ Personen" : `${personen} ${personen === 1 ? "Person" : "Personen"}`} · {bereich}</span>
                </p>
                <button type="submit" className="bq-btn bq-res__los">Tisch reservieren</button>
              </div>
            </form>
          ) : (
            <div className="bq-res__zu-info" role="alert">
              <div className="bq-res__zu-icon"><TischIcon /></div>
              <p className="bq-kicker">Chiuso</p>
              <h2 id="bq-res-titel">Reservationen sind <em>derzeit nicht möglich</em></h2>
              <p>Das Restaurant Bouquet Mediterraneo ist zurzeit nicht geöffnet. Ihre Anfrage wurde deshalb <b>nicht gesendet</b> und es wurden keine Daten gespeichert.</p>
              <p className="bq-res__lweb">Ein Reservationssystem wie dieses für Ihr eigenes Restaurant? <a href="https://www.lweb.ch" target="_blank" rel="noopener">Website von Lweb →</a></p>
              <div className="bq-res__knoepfe">
                <button className="bq-btn" onClick={onClose}>Schliessen</button>
                <button className="bq-btn bq-btn--linie" onClick={() => setHinweis(false)}>Zurück zum Formular</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Bouquet() {
  const [tab, setTab] = useState("pizze")
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-r]"))
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } })
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    if (!menu) return
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [menu])

  const [lb, setLb] = useState<number | null>(null)
  const [res, setRes] = useState(false)
  const offen = () => { setMenu(false); setRes(true) }
  const zu = useCallback(() => setRes(false), [])
  useEffect(() => {
    if (lb === null) return
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null)
      if (e.key === "ArrowRight") setLb((i) => (i === null ? i : (i + 1) % GALERIE.length))
      if (e.key === "ArrowLeft") setLb((i) => (i === null ? i : (i - 1 + GALERIE.length) % GALERIE.length))
    }
    window.addEventListener("keydown", k)
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = "" }
  }, [lb])

  const kap = KARTE.find((k) => k.id === tab) || KARTE[1]
  const pizze = KARTE.find((k) => k.id === "pizze")!.gerichte

  return (
    <div className="bq">
      {/* Antes de pintar: marca que hay JS para que las apariciones empiecen ocultas.
          Si algo falla, a los 3 s se enseña todo igualmente. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('bq-js');setTimeout(function(){document.documentElement.classList.add('bq-todo')},3000);" }} />

      <header className={"bq-hdr" + (scrolled ? " is-scrolled" : "")}>
        <a href="#top" className="bq-marke" aria-label="Bouquet Mediterraneo, nach oben">
          <Olive className="bq-marke__olive" />
          <span className="bq-marke__t">Bouquet<em>Mediterraneo</em></span>
        </a>
        <nav className="bq-nav" aria-label="Hauptnavigation">
          {NAV.map((l) => <a key={l.h} href={l.h}>{l.t}</a>)}
        </nav>
        <button type="button" className="bq-btn bq-btn--klein bq-hdr__cta" onClick={offen}>Tisch reservieren</button>
        <button className={"bq-burger" + (menu ? " is-open" : "")} aria-label="Menü" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <span /><span />
        </button>
      </header>

      <div className={"bq-sheet" + (menu ? " is-open" : "")} aria-hidden={!menu}>
        <nav>
          {NAV.map((l, i) => (
            <a key={l.h} href={l.h} onClick={() => setMenu(false)} style={{ ["--i" as string]: i } as React.CSSProperties}>
              {l.t}<span aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
        <button type="button" className="bq-btn bq-sheet__res" onClick={offen}><TischIcon className="bq-btn__i" />Tisch reservieren</button>
        <p className="bq-sheet__fuss">Bahnhofstrasse 46 · 9475 Sevelen</p>
      </div>

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="bq-hero">
          <div className="bq-hero__txt">
            <p className="bq-kicker bq-auf" style={{ ["--d" as string]: "0ms" } as React.CSSProperties}>
              <span className="bq-punkt" /> Cucina Mediterranea &amp; Pizza · Sevelen
            </p>
            <h1 className="bq-auf" style={{ ["--d" as string]: "120ms" } as React.CSSProperties}>
              Pizza aus dem Holzofen,<br /><em>wie in Napoli.</em>
            </h1>
            <p className="bq-lead bq-auf" style={{ ["--d" as string]: "240ms" } as React.CSSProperties}>
              Langsam gereifter Teig, Zutaten aus Italien und ein Sommelier, der Ihnen den passenden Wein dazu einschenkt.
              Ein Stück Italien an der Bahnhofstrasse.
            </p>
            <div className="bq-hero__cta bq-auf" style={{ ["--d" as string]: "360ms" } as React.CSSProperties}>
              <a href="#karte" className="bq-btn">Speisekarte ansehen</a>
              <button type="button" className="bq-btn bq-btn--linie" onClick={offen}>Tisch reservieren</button>
            </div>
            <ul className="bq-hero__fakten bq-auf" style={{ ["--d" as string]: "480ms" } as React.CSSProperties}>
              <li><b>16</b><span>Pizze napoletane</span></li>
              <li><b>Forno</b><span>a legna</span></li>
              <li><b>Vino</b><span>vom Sommelier</span></li>
            </ul>
          </div>
          <div className="bq-hero__bild">
            <div className="bq-bogen bq-auf bq-auf--bild" style={{ ["--d" as string]: "100ms" } as React.CSSProperties}>
              <img src="/neu/forno-pizza.webp" alt="Pizza im Holzofen von Bouquet Mediterraneo" width={1181} height={787} />
            </div>
            <div className="bq-rund bq-auf bq-auf--bild" style={{ ["--d" as string]: "420ms" } as React.CSSProperties}>
              <img src="/neu/pizzas.webp" alt="Zwei Pizze auf dem Tisch" width={1041} height={980} />
            </div>
            <svg className="bq-siegel" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="bq-kreis" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <circle cx="100" cy="100" r="98" className="bq-siegel__bg" />
              <text><textPath href="#bq-kreis" startOffset="0">FORNO A LEGNA · PIZZA NAPOLETANA · SEVELEN ·</textPath></text>
              <image href="/neu/olive.png" x="70" y="72" width="60" height="54" />
            </svg>
          </div>
        </section>

        {/* ============ BAND ============ */}
        <div className="bq-band" aria-hidden="true">
          <div className="bq-band__spur">
            {[0, 1].map((k) => (
              <span key={k}>Pizza Napoletana <i>✦</i> Antipasti <i>✦</i> Aperitivo <i>✦</i> Vino italiano <i>✦</i> Dolci della casa <i>✦</i> Forno a legna <i>✦</i> </span>
            ))}
          </div>
        </div>

        {/* ============ GESCHICHTE ============ */}
        <section className="bq-sek bq-geschichte" id="geschichte">
          <div className="bq-geschichte__bilder" data-r>
            <div className="bq-geschichte__gross"><img src="/neu/teig.webp" alt="Pizzateig wird von Hand gezogen" loading="lazy" width={1151} height={759} /></div>
            <div className="bq-geschichte__klein"><img src="/neu/zutaten.webp" alt="Zutaten: Tomate, Basilikum, Zitrone" loading="lazy" width={1181} height={787} /></div>
          </div>
          <div className="bq-geschichte__txt" data-r>
            <p className="bq-kicker">La nostra storia</p>
            <h2>Neu in Sevelen.<br /><em>Tradition seit jeher.</em></h2>
            <p>
              Bouquet Mediterraneo ist neu in Sevelen, aber unsere Leidenschaft für die italienische Küche reicht weit zurück.
              Ein gebürtiger Italiener und ausgezeichneter Sommelier bringt ein Stück seiner Heimat an die Bahnhofstrasse.
            </p>
            <p>
              Unser Geheimnis? Langsam gereifter Teig, handverlesene Zutaten aus Italien und die Leidenschaft für echte
              neapolitanische Pizza – mit luftigem Rand, gebacken in wenigen Minuten im Holzofen.
            </p>
            <div className="bq-zitat">
              <Olive />
              <p>«Der Chef bedient dich persönlich – man fühlt sich, als wäre man in Italien.»<span>aus einer Google-Bewertung</span></p>
            </div>
          </div>
        </section>

        {/* ============ VITRINA DE PIZZAS ============ */}
        <section className="bq-pizze" id="pizze">
          <div className="bq-pizze__kopf" data-r>
            <div>
              <p className="bq-kicker">Le nostre pizze</p>
              <h2>Acht Lieblinge <em>aus dem Ofen</em></h2>
            </div>
            <p className="bq-pizze__intro">Neapolitanischer Teig, ein luftiger, leicht verbrannter Rand und Zutaten aus Italien – in wenigen Minuten bei voller Hitze gebacken.</p>
          </div>
          <div className="bq-pizze__raster">
            {VITRINE.map((v, i) => {
              const g = pizze.find((p) => p.n === v.n)
              return (
                <a key={v.n} href="#karte" onClick={() => setTab("pizze")} className="bq-pizza" data-r style={{ ["--i" as string]: i % 4 } as React.CSSProperties}>
                  <div className="bq-pizza__bild">
                    <img src={v.b} alt={"Pizza " + v.n} loading="lazy" />
                    {v.tag && <span className={"bq-pizza__tag" + (v.tag === "Scharf" ? " scharf" : "")}>{v.tag}</span>}
                  </div>
                  <div className="bq-pizza__txt">
                    <h3>{v.n}</h3>
                    <p>{g?.d}</p>
                    <span className="bq-pizza__p">CHF {g?.p}</span>
                  </div>
                </a>
              )
            })}
          </div>
          <div className="bq-pizze__mehr" data-r>
            <a href="#karte" className="bq-btn bq-btn--linie" onClick={() => setTab("pizze")}>Alle 16 Pizze ansehen</a>
          </div>
        </section>

        {/* ============ FRANJA ============ */}
        <section className="bq-banner" aria-label="Impasto, fuoco, pazienza">
          <img src="/neu/u-filante.webp" alt="" loading="lazy" />
          <div className="bq-banner__txt" data-r>
            <p className="bq-kicker bq-kicker--hell">La filosofia</p>
            <h2>Impasto, fuoco<br /><em>&amp; pazienza.</em></h2>
            <p>Mehr braucht eine gute Pizza nicht. Aber davon das Beste.</p>
          </div>
        </section>

        {/* ============ KARTE ============ */}
        <section className="bq-karte" id="karte">
          <div className="bq-karte__in">
            <div className="bq-karte__kopf" data-r>
              <p className="bq-kicker bq-kicker--hell">Il menù</p>
              <h2>Unsere Speisekarte</h2>
              <p className="bq-karte__sub">Alle Preise in CHF</p>
            </div>
            <div className="bq-tabs" role="tablist" aria-label="Kapitel der Speisekarte" data-r>
              {KARTE.map((k) => (
                <button key={k.id} role="tab" aria-selected={tab === k.id} className={tab === k.id ? "is-an" : ""} onClick={() => setTab(k.id)}>
                  {k.titel}
                </button>
              ))}
            </div>
            <div className="bq-karte__body" key={kap.id}>
              <figure className="bq-karte__bild">
                <img src={kap.bild} alt={kap.alt} loading="lazy" />
                <figcaption><em>{kap.it}</em></figcaption>
              </figure>
              <ul className={"bq-liste" + (kap.gerichte.length > 8 ? " bq-liste--zwei" : "")}>
                {kap.gerichte.map((g, i) => (
                  <li key={g.n} style={{ ["--i" as string]: i } as React.CSSProperties}>
                    <div className="bq-liste__zeile">
                      <span className="bq-liste__n">{g.n}</span>
                      <span className="bq-liste__punkte" aria-hidden="true" />
                      <span className="bq-liste__p">{g.p}</span>
                    </div>
                    <p>{g.d}{g.tag && <span className={"bq-tag" + (g.tag === "Scharf" ? " bq-tag--scharf" : "")}>{g.tag}</span>}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ SOMMELIER ============ */}
        <section className="bq-sek bq-wein">
          <div className="bq-wein__bild" data-r>
            <img src="/neu/u-vino.webp" alt="Rotwein wird eingeschenkt" loading="lazy" />
            <span className="bq-wein__stempel">Vino<br /><em>consigliato</em></span>
          </div>
          <div className="bq-wein__txt" data-r>
            <p className="bq-kicker">Il sommelier</p>
            <h2>Zu jeder Pizza<br /><em>der richtige Wein.</em></h2>
            <p>Dari, unser Gastgeber, ist Sommelier. Er kennt jede Flasche auf der Karte persönlich und schenkt Ihnen ein, was zu Ihrem Gericht passt – vom frischen Weissen zur Marinara bis zum kräftigen Roten zur Salsiccia.</p>
            <ul className="bq-wein__paare">
              <li><b>Margherita</b><span>Frischer Weisswein aus Kampanien</span></li>
              <li><b>Diavola</b><span>Fruchtiger, junger Rotwein</span></li>
              <li><b>Tagliere</b><span>Ein Glas Prosecco zum Start</span></li>
            </ul>
          </div>
        </section>

        {/* ============ GALERIE ============ */}
        <section className="bq-sek bq-galerie" id="galerie">
          <div className="bq-sek__kopf" data-r>
            <p className="bq-kicker">Uno sguardo</p>
            <h2>Einblicke in unser <em>Restaurant</em></h2>
          </div>
          <div className="bq-mosaik">
            {GALERIE.map((g, i) => (
              <button key={g.b} className={"bq-mosaik__f" + (g.k ? " " + g.k : "")} onClick={() => setLb(i)} aria-label={"Bild vergrössern: " + g.a} data-r style={{ ["--i" as string]: i % 4 } as React.CSSProperties}>
                <img src={g.b} alt={g.a} loading="lazy" />
                <span className="bq-mosaik__lupe" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg></span>
              </button>
            ))}
          </div>
        </section>

        {lb !== null && (
          <div className="bq-lb" role="dialog" aria-modal="true" aria-label={GALERIE[lb].a} onClick={() => setLb(null)}>
            <button className="bq-lb__zu" aria-label="Schliessen" onClick={() => setLb(null)}>×</button>
            <button className="bq-lb__pfeil links" aria-label="Vorheriges Bild" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + GALERIE.length) % GALERIE.length) }}>‹</button>
            <figure onClick={(e) => e.stopPropagation()} key={lb}>
              <img src={GALERIE[lb].b} alt={GALERIE[lb].a} />
              <figcaption>{GALERIE[lb].a}<span>{lb + 1} / {GALERIE.length}</span></figcaption>
            </figure>
            <button className="bq-lb__pfeil rechts" aria-label="Nächstes Bild" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % GALERIE.length) }}>›</button>
          </div>
        )}

        {/* ============ STIMMEN ============ */}
        <section className="bq-stimmen">
          <div className="bq-sek__kopf" data-r>
            <p className="bq-kicker">Dicono di noi</p>
            <h2>Was unsere Gäste <em>sagen</em></h2>
            <p className="bq-stimmen__quelle"><Sterne /> Google-Bewertungen</p>
          </div>
          <div className="bq-stimmen__spur" data-r>
            {STIMMEN.map((s) => (
              <figure key={s.n} className="bq-stimme">
                <Sterne />
                <blockquote>«{s.t}»</blockquote>
                <figcaption><span className="bq-stimme__ini">{s.n.split(" ").map((w) => w[0]).join("")}</span>{s.n}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ============ BESUCH ============ */}
        <section className="bq-sek bq-besuch" id="besuch">
          <div className="bq-besuch__bild" data-r>
            <img src="/neu/terrasse.webp" alt="Die Terrasse an der Bahnhofstrasse" loading="lazy" />
          </div>
          <div className="bq-besuch__txt" data-r>
            <p className="bq-kicker">Vieni a trovarci</p>
            <h2>Besuchen <em>Sie uns</em></h2>
            <div className="bq-info">
              <div>
                <h3>Adresse</h3>
                <p>Bahnhofstrasse 46<br />9475 Sevelen</p>
                <a className="bq-link" href="https://www.google.com/maps/search/?api=1&query=Bahnhofstrasse+46+9475+Sevelen" target="_blank" rel="noopener">Route planen →</a>
              </div>
              <div>
                <h3>Öffnungszeiten</h3>
                <dl className="bq-zeiten">
                  <dt>Dienstag – Freitag</dt><dd>11:00 – 13:30<br />17:30 – 22:00</dd>
                  <dt>Samstag – Sonntag</dt><dd>17:30 – 22:00</dd>
                  <dt>Montag</dt><dd className="zu">Ruhetag</dd>
                </dl>
              </div>
            </div>
            <button type="button" className="bq-btn bq-besuch__res" onClick={offen}><TischIcon className="bq-btn__i" />Tisch reservieren</button>
          </div>
        </section>
      </main>

      <footer className="bq-fuss">
        <div className="bq-fuss__oben">
          <a href="#top" className="bq-marke bq-marke--hell">
            <Olive className="bq-marke__olive" />
            <span className="bq-marke__t">Bouquet<em>Mediterraneo</em></span>
          </a>
          <nav aria-label="Fussnavigation">{NAV.map((l) => <a key={l.h} href={l.h}>{l.t}</a>)}</nav>
        </div>
        <div className="bq-hinweis">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><path d="M12 7.5v5.5M12 16.2v.3" /></svg>
          <p><b>Das Restaurant Bouquet Mediterraneo hat seinen Betrieb eingestellt.</b> Diese Website bleibt als Arbeitsprobe online. Reservationen und Bestellungen sind nicht mehr möglich.</p>
        </div>
        <div className="bq-fuss__unten">
          <span>© Bouquet Mediterraneo · Sevelen</span>
          <span>Website von <a href="https://www.lweb.ch" target="_blank" rel="noopener">Lweb</a></span>
        </div>
      </footer>

      {/* Botón flotante con la mesa: abre la reserva directamente */}
      <button type="button" className={"bq-fab" + (res || menu || lb !== null ? " is-weg" : "")} onClick={offen} aria-label="Tisch reservieren">
        <TischIcon className="bq-fab__i" />
        <span className="bq-fab__t">Tisch reservieren</span>
      </button>

      {res && <Reservieren onClose={zu} />}
    </div>
  )
}
