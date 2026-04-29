# lowlow Kombucha - Deployment Guide

## Sicherheit ✅

Die Website nutzt jetzt eine **sichere Backend-Architektur**:
- ✅ API-Key (`RESEND_API_KEY`) ist **nicht** im HTML-Code
- ✅ Der Schlüssel wird nur auf dem Vercel-Server gespeichert
- ✅ Emails werden sicher über das Backend versendet

## Verzeichnisstruktur

```
lowlow-kombucha/
├── index.html              (Hauptseite)
├── api/
│   └── send-code.js       (Backend-Funktion für Email-Versand)
├── public/                (Bilder & Assets)
├── package.json           (Node.js-Abhängigkeiten)
├── vercel.json           (Vercel-Konfiguration)
├── .env.example          (Template für Umgebungsvariablen)
└── .gitignore            (Git-Ausschlüsse)
```

## Deployment auf Vercel

### 1. GitHub Repository erstellen
```bash
cd /Users/growiseconsulting/Documents/Claude/Projects/lowlow\ Kombucha
git init
git add .
git commit -m "Initial lowlow Kombucha website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lowlow-kombucha.git
git push -u origin main
```

### 2. Auf Vercel deployen
1. Gehe zu https://vercel.com
2. Melde dich an (mit GitHub)
3. Klick **"New Project"**
4. Wähle dein `lowlow-kombucha` Repository
5. **Wichtig:** Füge Environment-Variablen hinzu:
   - Name: `RESEND_API_KEY`
   - Value: `re_au74wrjg_8GcCzzwdvhixtJCgndJXn7wn`
6. Klick **"Deploy"**

### 3. Domain verbinden
Nach erfolgreichem Deployment:
1. Gehe zu "Settings" → "Domains"
2. Klick **"Add Domain"**
3. Gib deine Domain ein: `raise.wine/lowlow` oder `lowlow.raise.wine`
4. Folge den DNS-Anweisungen

## Lokales Testen

```bash
# 1. Dependencies installieren
npm install

# 2. Entwicklungsserver starten
npm run dev

# 3. Browser öffnen
# http://localhost:3000

# API-Endpoint testen:
# POST http://localhost:3000/api/send-code
# Body: { "email": "test@example.com" }
```

## Resend API-Einrichtung

Falls die Email-Domain noch nicht verifiziert ist:

1. Gehe zu https://resend.com/dashboard
2. Geh zu **"Domains"**
3. Füge `hello.lowlow.de` hinzu
4. Folge den DNS-Anweisungen (CNAME-Record)
5. Nach Verifizierung → Emails funktionieren ✅

## Umgebungsvariablen (Vercel)

Diese Datei wird in Production verwendet:
```
RESEND_API_KEY = re_au74wrjg_8GcCzzwdvhixtJCgndJXn7wn
```

Die `.env.local` wird von Git ignoriert (`/.gitignore`).

## Troubleshooting

### ❌ "Failed to send email"
- Überprüfe: Ist die Umgebungsvariable in Vercel gesetzt?
- Prüfe: Ist die Domain `hello.lowlow.de` bei Resend verifiziert?

### ❌ CORS-Fehler
- Das sollte nicht vorkommen, da `/api/send-code` auf gleichem Origin läuft

### ❌ Modal bleibt sichtbar
- Überprüfe Browser-Console (F12)
- Stelle sicher: localStorage funktioniert

## Nächste Schritte

- [ ] Repository auf GitHub erstellen
- [ ] Auf Vercel deployen
- [ ] Environment-Variable `RESEND_API_KEY` setzen
- [ ] Domain DNS konfigurieren
- [ ] Resend-Domain verifizieren
- [ ] Test-Login durchführen
- [ ] Hero-Video einbauen
- [ ] Live gehen auf raise.wine/lowlow

## Support

Fragen? Kontakt: ruediger.kuehnle@sealteamgreen.org
