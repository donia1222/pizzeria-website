"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PrivacyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "privacy" | "terms"
}

export function PrivacyModal({ open, onOpenChange, type }: PrivacyModalProps) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [open, onOpenChange])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => onOpenChange(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 w-[90vw] max-w-4xl max-h-[85vh] bg-gray-900 rounded-lg border border-gray-800 shadow-lg p-6 overflow-hidden"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#8c9a56]">{type === "privacy" ? "Datenschutz" : "AGB"}</h2>
                <button
                  className="h-8 w-8 p-0 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Schließen</span>
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-80px)] pr-2 text-sm text-gray-300 leading-relaxed">
                {type === "privacy" ? (
                  <div>
                    <h2 className="text-lg font-bold mb-4 text-white">DATENSCHUTZ</h2>
                    <p className="mb-4">
                      Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                      Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
                      sowie dieser Datenschutzerklärung.
                    </p>
                    <p className="mb-4">
                      Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
                      auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen)
                      erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden
                      ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                    </p>
                    <p className="mb-8">
                      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per
                      E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
                      Dritte ist nicht möglich.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">COOKIES</h3>
                    <p className="mb-4">
                      Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner
                      keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot
                      nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf
                      Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
                    </p>
                    <p className="mb-8">
                      Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies". Sie werden nach
                      Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert,
                      bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch
                      wiederzuerkennen.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">SSL-VERSCHLÜSSELUNG</h3>
                    <p className="mb-8">
                      Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte,
                      wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine
                      SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
                      Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">GOOGLE ANALYTICS</h3>
                    <p className="mb-4">
                      Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google
                      Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics verwendet so
                      genannte „Cookies". Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine
                      Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten
                      Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in
                      den USA übertragen und dort gespeichert.
                    </p>
                    <p className="mb-8">
                      Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf
                      Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an
                      der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">IP ANONYMISIERUNG</h3>
                    <p className="mb-8">
                      Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre
                      IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen
                      Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die
                      USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA
                      übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese
                      Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die
                      Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung
                      verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google
                      Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google
                      zusammengeführt.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">BROWSER PLUGIN</h3>
                    <p className="mb-8">
                      Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software
                      verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht
                      sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus
                      die Erfassung der durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten
                      (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern,
                      indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren:
                      https://tools.google.com/dlpage/gaoptout?hl=de.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">WIDERSCHRUCH GEGEN DATENERFASSUNG</h3>
                    <p className="mb-8">
                      Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf folgenden
                      Link klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen
                      Besuchen dieser Website verhindert: Google Analytics deaktivieren.
                    </p>

                    <h3 className="text-md font-bold mb-2 text-white">GOOGLE WEB FONTS</h3>
                    <p className="mb-4">
                      Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von
                      Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in
                      ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
                    </p>
                    <p className="mb-4">
                      Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google
                      aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website
                      aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und
                      ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne
                      von Art. 6 Abs. 1 lit. f DSGVO dar.
                    </p>
                    <p className="mb-4">
                      Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer
                      genutzt. Weitere Informationen zu Google Web Fonts finden Sie unter
                      https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google:
                      https://www.google.com/policies/privacy/.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-bold mb-4 text-white">AGB</h2>
                    <p className="mb-4">Bouquet Mediterraneo</p>
                    <p className="mb-4">
                      <strong>Adresse</strong>
                      <br />
                      Bahnhofstrasse 46, 9475 Sevelen
                    </p>
                    <p className="mb-4">
                      <strong>Telefon</strong>
                      <br />
                      081 785 10 00
                    </p>
                    <p className="mb-4">
                      <strong>E-Mail</strong>
                      <br />
                      info@bouquetmediterraneo.ch
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

