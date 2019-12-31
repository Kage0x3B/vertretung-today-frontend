Stores ist ein Svelte Konzept um Variablen zwischen verschiedenen Komponenten und anderen Teilen der App
auszutauschen aber dabei die Reaktivität nicht zu verlieren. Bedeutet, wenn irgendwo im Code gerade ein Wert geändert wird,
der währenddessen auch auf einer Seite dargestellt wird, wird der Wert auf der Seite automatisch aktualisiert. -> Reaktivität

Die tempStore Datei enthält normale Stores die nur für Reaktivität da sind, die permanentStore Datei macht erstmal das Gleiche,
speichert und lädt die Werte aber auch direkt in den Localstorage um das Neuladen der Website zu überleben.
Und wenn angefragt, lädt es die Werte auch auf den Backend Server hoch um mit dem Account verknüpft zu werden,
praktisch z.B. wenn man in der App die eigene Stufe und Liste mit Kursen einstellt und dann sich auf dem Computer nochmal
anmeldet, dann hat man die gleichen Einstellungen immer noch.