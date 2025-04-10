"use client"

import { X } from "lucide-react"

interface DatenschutzModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DatenschutzModal({ isOpen, onClose }: DatenschutzModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gray-900 text-white border border-gray-800 rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-[#8c9a56]">DATENSCHUTZ</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="text-sm space-y-4">
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung.
            </p>
            <p>
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf
              unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben
              werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre
              ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
              möglich.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">COOKIES</h3>
            <p>
              Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
              Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver
              und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr
              Browser speichert.
            </p>
            <p>
              Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies". Sie werden nach Ende Ihres
              Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese
              löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies
              nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie
              das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von
              Cookies kann die Funktionalität dieser Website eingeschränkt sein.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">SSL-VERSCHLÜSSELUNG</h3>
            <p>
              Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
              Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf
              "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p>
              Wenn die SSL-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von
              Dritten mitgelesen werden.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">GOOGLE ANALYTICS</h3>
            <p>
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600
              Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics verwendet so genannte „Cookies". Das
              sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website
              durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website
              werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
            </p>
            <p>
              Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage
              von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des
              Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">IP ANONYMISIERUNG</h3>
            <p>
              Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von
              Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens
              über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt. Nur in Ausnahmefällen wird
              die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des
              Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website
              auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der
              Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu
              erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit
              anderen Daten von Google zusammengeführt.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">BROWSER PLUGIN</h3>
            <p>
              Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software
              verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
              Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der
              durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an
              Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link
              verfügbare Browser-Plugin herunterladen und installieren: https://tools.google.com/dlpage/gaoptout?hl=de.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">WIDERSCHRUCH GEGEN DATENERFASSUNG</h3>
            <p>
              Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf folgenden Link
              klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen Besuchen dieser
              Website verhindert: Google Analytics deaktivieren.
            </p>
            <p>
              Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung
              von Google: https://support.google.com/analytics/answer/6004245?hl=de.
            </p>

            <h3 className="text-xl font-bold text-[#8c9a56] mt-6">GOOGLE WEB FONTS</h3>
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google
              bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren
              Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
            </p>
            <p>
              Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen.
              Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die
              Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung
              unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO
              dar.
            </p>
            <p>
              Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.
              Weitere Informationen zu Google Web Fonts finden Sie unter https://developers.google.com/fonts/faq und in
              der Datenschutzerklärung von Google: https://www.google.com/policies/privacy/.
            </p>
          </div>
          <footer className="mt-10 text-sm text-gray-500">
              Bilder stammen von{" "}
              <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer" className="underline">
                Freepik
              </a>
            </footer>
        </div>
      </div>
    </div>
  )
}

