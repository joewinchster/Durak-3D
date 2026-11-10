# Durak 3D

3D-Durak für 2–4 Spieler an einem Gerät oder gegen den Computer – HTML5, Three.js und Vanilla JS/CSS. Läuft ohne Internet.

## Auf jedem Gerät spielen

| Weg | So geht's |
|---|---|
| **Eine Datei** | `durak.html` enthält alles (Code, Three.js, Bilder). Auf das Gerät kopieren oder verschicken und im Browser öffnen. Auf dem iPhone/iPad öffnet die Dateien-App HTML nur als Vorschau – dort den Weg „Als App“ nehmen. |
| **Als App (PWA)** | Den ganzen Ordner auf einen Webspace mit https legen (z. B. GitHub Pages, Netlify). Dann im Browser „Zum Startbildschirm hinzufügen“ bzw. den Button „Als App installieren“ – danach läuft es offline im Vollbild. |
| **Am PC entwickeln** | `python tools/dev_server.py` und <http://127.0.0.1:8123/> öffnen, oder `index.html` doppelklicken. |

Nach jeder Änderung an Code oder `assets/`: **`python tools/build.py`** – das erzeugt `durak.html`, `sw.js` und `js/assets.js` neu.

## Gemeinsam auf mehreren Geräten

Titelbild → **🌐 Online spielen** → Namen eintragen.

- **Spiel eröffnen:** zeigt einen vierstelligen Raum-Code (und, wenn das Spiel im Internet liegt, einen Link zum Teilen).
- **Beitreten:** Code eintippen oder den Link öffnen. Bis zu 4 Spieler, freie Plätze kann der Gastgeber mit Computern füllen.
- Jeder sieht nur seine eigene Hand; die Kamera steht am eigenen Platz. Bricht eine Verbindung ab, tritt das Gerät von selbst wieder bei.
- Alle müssen **dieselbe Adresse** bzw. dieselbe Version von `durak.html` benutzen und brauchen Internet (nur für den Verbindungsaufbau; die Spieldaten laufen direkt zwischen den Geräten).
- **Ohne Internet im WLAN:** am PC `python tools/dev_server.py --lan` starten und auf den Handys die angezeigte Adresse öffnen.
- Der Gastgeber führt das Spiel: schließt er die Seite, ist die Partie für alle zu Ende. Der Stand wird unverschlüsselt an die Mitspieler geschickt – wer am PC die Entwicklerwerkzeuge öffnet, könnte fremde Karten sehen.

Texteingabe: Auf Handy und Tablet erscheint die normale Tastatur. Am PC wird mit der Tastatur getippt; tippt man das Feld auf einem Touchscreen mit dem Finger an, erscheint die eingebaute Bildschirmtastatur.

## Spiel

- **Neues Spiel:** 2–4 Spieler, Namen, je Platz Mensch oder Computer. Regeln: 36 oder 52 Karten, Weitergeben, erster Angriff max. 5 Karten, Spielrichtung.
- **Ablauf:** Jeder bekommt 6 Karten, der Trumpf wird aufgedeckt, der niedrigste Trumpf beginnt. Die Kamera schwenkt zu dem Menschen, der handeln muss.
- **Sichtschutz:** „Gerät weitergeben“-Bildschirm vor jedem Zug (abschaltbar); Karten per Antippen, Halten oder automatisch aufdecken. Spielt nur ein Mensch gegen Computer, bleibt die eigene Hand offen.
- **Spielen:** Karte antippen (wählen) und nochmal antippen oder in die Mitte ziehen. Buttons: Angreifen/Schlagen/Nachlegen, Weitergeben, Nehmen (Bery), Fertig (Bito).
- **Kamera:** Regler und ⟲/⟳ (±15°), Wischen auf freier Fläche, ⇋ spiegelt, 👁 deckt zum Testen alles auf.
- **Punktestand:** Siege und Durak-Zähler pro Name über mehrere Partien (im Gerät gespeichert).

## Eigene Dateien (optional)

Einfach in `assets/` legen und `python tools/build.py` ausführen. Was fehlt, wird vom Spiel selbst erzeugt.

| Datei | Wirkung |
|---|---|
| `assets/audio/laugh1.mp3`, `laugh2.mp3`, … | echte Lacher (zufällige Auswahl) |
| `assets/audio/place*.mp3`, `take*.mp3`, `deal*.mp3`, `win*.mp3` | Karten legen / nehmen / austeilen / Gewinner |
| `assets/audio/music1.mp3`, `music2.mp3`, `music3.mp3` | ersetzen die Musikstücke „Volksweise“, „Abendruhe“, „Tanz“ |
| `assets/cards/hearts_6.png` … `spades_14.png`, `back.png` | eigene Karten (11 = B, 12 = D, 13 = K, 14 = A; Farben: hearts, diamonds, spades, clubs) |
| `assets/cards/card_normal.png`, `card_roughness.png` | PBR-Maps der Karten |
| `assets/table/felt_*.jpg/png`, `wood_*.jpg/png`, `background.jpg` | Tisch und Hintergrund (aktuell Blender-Renderings) |
| `assets/title/logo.png` | Titelbild (Blender-Rendering der Schachtel) |

Auch `.ogg` und `.wav` gehen. Texturen werden nur über http(s) oder in `durak.html` geladen, nicht bei Doppelklick auf `index.html`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `js/config.js` | Konstanten, Asset-Zugriff, Einstellungen, Punktestand |
| `js/rules.js` | Reine Durak-Regeln (ohne DOM, in Node testbar) |
| `js/ai.js` | Computer-Gegner |
| `js/textures.js` | Karten, Tisch und Logo als Canvas-Texturen; Slots für Diffuse/Normal/Roughness |
| `js/audio.js` | Musik, Karten-Sounds, Lacher, Fanfare (WebAudio) + Audiodatei-Slots |
| `js/scene.js` | Three.js-Szene, Karten-Meshes, Kamera, Layout |
| `js/ui.js`, `js/main.js` | Oberfläche, Spielablauf, Touch-Steuerung |
| `js/net.js`, `js/online.js` | Verbindung zwischen Geräten (WebRTC), Raum-Code, Lobby |
| `js/app.js` | Bildschirmtastatur, Installation als App |
| `tools/build.py` | baut `durak.html`, `sw.js`, `js/assets.js` |
| `tools/sim_test.js` | Regel-Test: `node tools/sim_test.js` spielt 3000 Zufallspartien |
| `blender/durak_karten.blend` | Szenen „Durak“ (52 Karten, Schachtel, Titel-Kamera) und „Durak_Tex“ (Filz, Holz, Himmel) |
| `blender/textures/` | Kartenbilder für Blender; neu erzeugen mit `http://127.0.0.1:8123/?export=1` |
