# Galactic Forum

Mobile Sci-Fi Roleplay Forum PWA mit Node-Backend, SQLite-Datenbank, Einheitsbereichen, Registerpruefung, Mitgliederakten, Rechten, Beitraegen und Einheitschat.

## Starten

```powershell
npm start
```

Danach im Browser oeffnen:

```text
http://localhost:4173
```

## Pruefen

```powershell
npm run check
```

## Online stellen

Siehe [DEPLOYMENT.md](DEPLOYMENT.md).

## Enthaltene Funktionen

- Geschuetzte Einheits-Reiter
- RP-Unterkategorien wie Regeln, Bewaffnung und Funkcodes
- Mitgliederakten mit Fortbildungen und Rangverwaltung
- Owner- und Rechteverwaltung pro Einheit
- Einheitschat pro Einheit
- Login-System mit erstem Owner-Setup
- Account-Freischaltung und Einheitszuweisung durch Owner
- Admin-Dashboard fuer Nutzerstatus, Rollen und Einheiten
- Rollen `user`, `admin`, `owner`
- Thread-Erstellung pro Einheitskategorie auf User/Admin/Owner begrenzbar
- Audit-Log fuer Admin-Aktionen
- Owner-Passwortreset fuer Nutzer
- Ranghistorie in Personalakten
- Adminbereich serverseitig und clientseitig auf Owner beschraenkt
- Erweiterte Akten mit Notizen, Verwarnungen, Auszeichnungen und Einsatzhistorie
- Automatische Chat-Aktualisierung
- PWA-Manifest und Service Worker fuer App-Installation

## Hinweis

Gemeinsame Daten werden ueber `server.js` in `data/galactic-forum.sqlite` gespeichert. Profil und aktueller Registerzugriff bleiben lokal im Browser. Fuer oeffentliche Nutzung sollte als naechstes ein echtes Account-/Passwortsystem ergaenzt werden.
