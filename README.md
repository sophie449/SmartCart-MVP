# 🛒 SmartCart

SmartCart ist eine moderne Webanwendung zur Einkaufsplanung mit Vorratsverwaltung, Rezeptvorschlägen und Nachhaltigkeitsintegration.  
Ziel ist es, den Lebensmitteleinkauf smarter zu gestalten, Foodwaste zu vermeiden und regionale Produkte stärker zu berücksichtigen.

Smart einkaufen – Nachhaltig gedacht

---

## 🚧 Projektstatus 🚧

🔨 In Entwicklung (MVP Phase)  
📦 Geplant für Web & Mobile (MVP nur Web)
🐳 Docker-ready  
🔒 Sicherheits- und API-Vorbereitung inklusive

---
# 🚀 Anwendung mit Docker starten

## 🔑 Voraussetzungen

Docker
Docker Compose
Ein laufender MySQL Server
Eine Datenbank mit dem Namen smartcart

## 🔨 1. .env Datei erstellen 

Erstelle im Ordner backend/ eine Datei mit dem Namen .env und folgendem Inhalt:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=DEIN_DATENBANK_PASSWORT
DB_NAME=smartcart
DB_PORT=3306
```
💡 Hinweis: Ersetze DEIN_DATENBANK_PASSWORT mit dem Passwort deines MySQL-Servers.

## 🐳 2. Docker starten

Im Hauptverzeichnis des Projekts (SmartCart-MVP) folgenden Befehl ausführen:
```bash
docker-compose up --build
```

## 🔥 3. Anwendung aufrufen

Frontend: http://localhost:4200

Backend: http://localhost:3000


---
## 📧 Kontakt

Falls du Fragen hast, melde dich gerne!
