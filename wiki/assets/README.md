# wiki/assets

Lege die Hero-Grafik der Wikierklärung 9_04 hier ab:

    eloxal-massprinzip.png    (auch .jpg / .jpeg / .webp)

`node wiki/build-pdf.mjs` bindet sie dann automatisch oben in die PDF ein und
ersetzt die eingebaute SVG-Nachzeichnung. Titel und Untertitel stehen bereits
in der Grafik; darunter bleibt nur die englische Untertitelzeile stehen.

Ist keine Datei vorhanden, wird die SVG-Nachzeichnung verwendet.
