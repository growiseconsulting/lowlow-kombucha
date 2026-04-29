# lowlow Kombucha - Firebase Deployment Guide

## ✅ Sicherheit
- ✅ API-Key ist **nicht** im HTML-Code
- ✅ Der Schlüssel wird nur auf Firebase gespeichert
- ✅ Emails werden sicher über Cloud Function versendet

## Projekt-Struktur

```
lowlow-kombucha/
├── index.html                    (Website)
├── *.jpg / *.png                (Bilder & Assets)
├── firebase.json                (Firebase-Konfiguration)
├── functions/
│   ├── index.js                (Cloud Function: sendCode)
│   └── package.json            (Dependencies)
└── .env.example                (API-Key Template)
```

---

## 📋 Firebase Setup (Schnellstart)

### 1. Firebase Projekt erstellen

1. Gehe zu: https://console.firebase.google.com
2. Klick **"Create Project"**
3. Name: `lowlow-kombucha`
4. Klick **"Continue"** → **"Create project"**

### 2. Firebase CLI installieren

```bash
npm install -g firebase-tools
firebase login
firebase init
```

Während `firebase init`:
- ✅ Hosting
- ✅ Functions
- Wähle dein Project: `lowlow-kombucha`
- Public directory: `.` (Punkt - Root)

### 3. Environment Variable in Firebase setzen

```bash
firebase functions:config:set resend.api_key="re_au74wrjg_8GcCzzwdvhixtJCgndJXn7wn"
```

### 4. Deploy zu Firebase

```bash
cd ~/Documents/Claude/Projects/lowlow\ Kombucha
firebase deploy
```

Firebase wird dann:
- ✅ Die Website hochladen (zu Hosting)
- ✅ Cloud Function deployen (sendCode)
- ✅ Dir eine Live-URL geben

---

## 🔗 Domain verbinden (raise.wine/lowlow)

Nach erfolgreichem Deploy:

1. Gehe zu Firebase Console → Hosting
2. Klick **"Connect domain"**
3. Gib ein: `raise.wine/lowlow` oder `lowlow.raise.wine`
4. Folge den DNS-Anweisungen
5. Firebase verifiziert automatisch

---

## 🧪 Testen

Nach Deploy:

1. Öffne die Firebase-URL (z.B. `lowlow-kombucha.web.app`)
2. Gib eine Email ein
3. Klick **"Code anfordern"**
4. Überprüfe deine Email - Code sollte ankommen ✅
5. Gib Code ein: `lowlow8777`
6. Willkommen! 🎉

---

## ⚙️ Troubleshooting

### ❌ "Failed to send email"
- Überprüfe: Ist `RESEND_API_KEY` in Firebase gesetzt?
  ```bash
  firebase functions:config:get
  ```
- Prüfe: Ist Domain bei Resend verifiziert? (hello.lowlow.de)

### ❌ "Cannot find module"
- Cloud Functions wurden nicht richtig deployed
  ```bash
  firebase deploy --only functions
  ```

### ❌ CORS-Fehler
- Sollte nicht vorkommen (firebase.json hat CORS konfiguriert)
- Check: Console im Browser (F12) → Network

---

## 📝 Nächste Schritte

- [ ] Firebase Projekt erstellen (console.firebase.google.com)
- [ ] Firebase CLI installieren & login
- [ ] `firebase init` durchführen
- [ ] Environment Variable setzen: `firebase functions:config:set resend.api_key="..."`
- [ ] Deploy: `firebase deploy`
- [ ] Domain verbinden (raise.wine/lowlow)
- [ ] Test-Login durchführen
- [ ] Hero-Video einbauen
- [ ] Live-Check vor Launch

---

## 🚀 Quick Commands

```bash
# Deploy alles
firebase deploy

# Deploy nur Website
firebase deploy --only hosting

# Deploy nur Functions
firebase deploy --only functions

# View Logs
firebase functions:log

# Config anzeigen
firebase functions:config:get
```

---

**Brauchst du Hilfe? Sag Bescheid!** 💪
