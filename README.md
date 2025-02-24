# Sub-Handle List API

Questa API consente di gestire un'applicazione List, con funzionalità per:

- Creare un utente, effettuare il login con credenziali valide e generare un token per l'autenticazione.
- Gestire le attività di un utente autenticato: creazione, lettura, aggiornamento ed eliminazione.

---

## Tecnologie Utilizzate

- **Autenticazione:** JSON Web Token (JWT)
- **Logging:** Morgan
- **Validazione Input:** Joi
- **Backend:** Node.js con Express.js
- **Database:** MongoDB
- **Linguaggio:** TypeScript (ES6)
- **Containerizzazione:** Docker

---

## Tabella dei Contenuti

- [Installazione🛠️](#installazione🛠️)
- [Utilizzo⚙️](#utilizzo⚙️)
  - [Configurazione🛠️](#configurazione🛠️)
  - [Comandi di Avvio▶️](#comandi-di-avvio▶️)
- [Configurazione con Docker 🐳](#configurazione-con-docker🐳)
  - [Requisiti📋](#requisiti📋)
  - [Build dell'Immagine🖼️](#build-dellimmagine🖼️)
  - [Avvio del Container🚀](#avvio-del-container🚀)
  - [Stop e Rimozione del Container🛑](#stop-e-rimozione-del-container🛑)
- [API Endpoints 🌐](#api-endpoints🌐)
  - [Task Management](#task-Management-🔒)
  - [User Management](#user-management)

---

## Installazione🛠️

Eseguire i seguenti comandi per clonare il repository e installare le dipendenze:

```bash
git clone
cd ToDo
```

Installa le dependencies:

##### ⚠️ in caso di sviluppo rimuovere `--production`

Se usi **npm**:

```bash
npm install --production
```

Se usi **yarn**:

```bash
yarn install --production
```

## Utilizzo⚙️

### Configurazione🛠️

Usare il file `example.env` come riferimento per configurare le variabili d'ambiente in `.env`.

### Comandi di Avvio▶️

#### Modalità sviluppo:

1. Avvia la modalità watch per il compilatore Typescript

```bash
npx tsc -w --noEmit
```

```bash
npm run dev
```

#### Avvio del server in produzione:

```bash
npm run build
npm start
```

## Configurazione con Docker 🐳

### Requisiti📋

- Docker installato sul sistema

### Build dell'Immagine🖼️

Eseguire il comando seguente per costruire l'immagine Docker:

```bash
docker build -t sub-handler .
```

### Avvio del Container🚀

```bash
docker run -d -p 3000:3000 --env-file .env --name sub-handler sub-handler
```

Il server sarà accessibile su `http://localhost:3000`.

### Stop e Rimozione del Container🛑

```bash
docker stop  sub-handler
docker rm sub-handler
```

## API Endpoints🌐
