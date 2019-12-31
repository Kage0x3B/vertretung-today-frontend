In dem Hauptordner befinden sich ein paar Dateien für den Node Package Manager, womit man Bibliotheken einfach
installieren kann und Konfigurationen für das Programm um das Projekt zusammen zu bauen, was für kompliziertere Webseiten
und besonders Javascript Anwedungen heutzutage benötigt wird.

Besonders auch weil dieses Projekt "Svelte" benutzt, eine Bibliothek um mit Javascript gesteuerten
Komponenten zu arbeiten und Reaktivität bereitzustellen. Wichtig ist, dass Svelte nicht wirklich ein normales
Framework ist, sondern ein Compiler, es wandelt die ganzen *.svelte Dateien in normales Javascript um.

Dieses hat einige Vorteile zu anderen Lösungen wie React, Vue oder AngularJS, weil es schnellere und kleinere
Anwendungen generiert (weniger Overhead und Dateien durch ein riesiges Framework) und außerdem flexibler ist,
was das Format des Quellcodes angeht. React z.B. benutzt zwar auch ein paar Tricks um JSX zu Javascript umzuwandeln,
Svelte macht da aber viel mehr und erlaubt so, meiner Meinung nach, angenehmer Code zu schreiben und auch schöneren.

===
Zur Ordner Struktur:

- build/
Enthält nur eine intermediäre Version der Service Worker sw.js Datei, die weiterverarbeitet und in public/ gepackt wird.
- public/
Enthält alle fertigen Dateien die von der App benötigt werden, teilweise automatisch dort reingepackt von Rollup
- src/
Enthält die eigentliche Applikation, alle Javascript Dateien und Svelte Dateien (Mischung aus HTML, CSS und Javascript)
- theme/
Eine Datei für die Farben die im Material Design Theme benutzt werden


---> In sehr vielen Unterordnern in src/ sind weitere README.txt Dateien für die Inhalte der Ordner