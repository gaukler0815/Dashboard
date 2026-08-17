# wiki/assets

Hero-Grafik der Wikierklärung 9_04.

| Datei | Zweck |
|---|---|
| `eloxal-massprinzip.jpg` | Wird eingebettet. Beschnitten und auf JPEG q94 optimiert (327 KB statt 1,8 MB). |
| `eloxal-massprinzip-source.png` | Original wie hochgeladen, unverändert. |

`node wiki/build-pdf.mjs` bindet die Grafik automatisch oben in die PDF ein und
ersetzt die eingebaute SVG-Nachzeichnung. Titel und Untertitel stehen bereits in
der Grafik; darunter bleibt nur die englische Untertitelzeile stehen.

Ist keine Grafik vorhanden, wird die SVG-Nachzeichnung verwendet.
Reihenfolge der Suche: `.jpg`, `.jpeg`, `.png`, `.webp`.
