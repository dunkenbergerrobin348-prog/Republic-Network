# Galactic Forum

Mobile Sci-Fi Roleplay Forum PWA mit Node-Backend, PostgreSQL/SQLite-Datenbank, Einheitsbereichen, Registerpruefung, Mitgliederakten, Rechten, Beitraegen und Einheitschat.

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
- Discord-Login per OAuth2 (`identify`, `email`)
- Account-Freischaltung und Einheitszuweisung durch Admins und Owner
- Admin-Dashboard fuer Nutzerstatus, Rollen und Einheiten
- Rollen `user`, `admin`, `owner`
- Thread-Erstellung pro Einheitskategorie auf User/Admin/Owner begrenzbar
- Audit-Log fuer Admin-Aktionen
- Owner-Passwortreset fuer Nutzer
- Ranghistorie in Personalakten
- Rollenvergabe und Passwortreset serverseitig auf Owner beschraenkt
- Einheitsfarben, Dossier-Design und Comms-Chat-Look
- Offizielle Wiki-Seiten fuer Regeln, Bewaffnung und Funkcodes
- Bewerbungssystem fuer Einheiten
- Benachrichtigungszentrum
- Erweiterte Akten mit Notizen, Verwarnungen, Auszeichnungen und Einsatzhistorie
- Automatische Chat-Aktualisierung
- PWA-Manifest und Service Worker fuer App-Installation

## Hinweis

Online nutzt das Backend automatisch PostgreSQL, sobald `DATABASE_URL` gesetzt ist. Lokal faellt es auf `data/galactic-forum.sqlite` zurueck. Der Owner-Code wird nur fuer das erste Owner-Setup benoetigt; normale Nutzer registrieren sich ohne Owner-Code und werden danach durch Admins oder Owner freigeschaltet.
