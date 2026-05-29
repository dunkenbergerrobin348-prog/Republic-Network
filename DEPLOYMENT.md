# Galactic Forum online stellen

Diese App hat jetzt ein Node-Backend mit SQLite-Datenbank. Fuer gemeinsame Online-Daten muss sie auf einem Host laufen, der Node.js ausfuehren und Dateien dauerhaft speichern kann.

## Vor dem Upload pruefen

```powershell
npm run check
```

## Lokal starten

```powershell
npm start
```

Danach oeffnen:

```text
http://localhost:4173
```

## Backend-Dateien

- `server.js` liefert die App aus und stellt `/api/state` bereit.
- `data/galactic-forum.sqlite` wird beim Start automatisch erstellt.
- `app.js` speichert Beitraege, Chats, Akten, Owner und Rechte ueber das Backend.

## Geeignete Hosting-Anbieter

Geeignet sind z.B. Render, Railway, Fly.io, ein VPS oder ein eigener Server mit Node.js 24 oder neuer. Reines statisches Hosting reicht fuer gemeinsame Daten nicht mehr.

## Render Beispiel

1. Projekt in ein GitHub-Repository hochladen.
2. Bei Render einen neuen "Web Service" erstellen.
3. Repository verbinden.
4. Runtime: Node.
5. Build Command leer lassen oder `npm install`.
6. Node-Version auf `24` oder neuer setzen.
7. Start Command:

```text
npm start
```

7. Einen persistenten Disk/Mount fuer den Ordner `data` anlegen, wenn die Daten nach Deploys erhalten bleiben sollen.

## Railway Beispiel

1. Projekt in ein GitHub-Repository hochladen.
2. Bei Railway "New Project" und "Deploy from GitHub repo" waehlen.
3. Start Command:

```text
npm start
```

4. Persistent Storage fuer `data/` aktivieren, wenn verfuegbar.

## VPS oder eigener Server

```bash
npm install
npm start
```

Optional mit einem Process Manager:

```bash
npm install -g pm2
pm2 start server.js --name galactic-forum
```

## Statisches Hosting

Netlify, Vercel Static oder normaler Webspace koennen die App weiterhin anzeigen, aber ohne Backend haben alle Nutzer getrennte lokale Daten.

### Netlify Static

1. Projektordner in ein GitHub-Repository hochladen.
2. Bei Netlify "Add new site" waehlen.
3. Repository verbinden.
4. Build command leer lassen.
5. Publish directory auf `.` setzen.
6. Deploy starten.

Die Datei `netlify.toml` ist fuer statisches Hosting vorbereitet.

### Vercel Static

1. Projektordner in ein GitHub-Repository hochladen.
2. Bei Vercel "Add New Project" waehlen.
3. Repository importieren.
4. Framework Preset auf "Other" lassen.
5. Build Command leer lassen.
6. Output Directory leer oder `.` lassen.
7. Deploy starten.

Die Datei `vercel.json` ist fuer statisches Hosting vorbereitet.

## Normaler Webspace

Lade alle Dateien aus diesem Ordner in den Webroot hoch:

```text
index.html
styles.css
app.js
manifest.webmanifest
service-worker.js
icon.svg
_headers
```

## Erster Start

Beim ersten Oeffnen nach dem Deploy erscheint ein Setup-Login. Dort erstellst du den ersten Owner-Account. Danach muessen sich Nutzer vor der App anmelden.

## Wichtige Einschraenkung

Das Backend speichert gemeinsame Daten in SQLite und Accounts mit Passwort-Hashing. Die Einheits-Registerpruefung bleibt zusaetzlich ein RP-System innerhalb der App.
