# Étape 4 — Serveur Express et déploiement

## Objectif
Créer un vrai serveur backend avec Express, sécuriser les clés Supabase côté serveur,
et mettre le jeu en ligne sur Render.

**Notions introduites : Backend, variables d'environnement, déploiement**

---

## Problème à résoudre d'abord

Ouvre les DevTools → **Sources** → cherche `SUPABASE_KEY` dans `script.js`.
Tu la vois ? N'importe qui peut faire pareil sur ton site.

→ Solution : mettre les clés sur un **serveur**, pas dans le code du navigateur.

---

## Ce que tu vas faire

### 1. Installer Node.js
- Va sur [nodejs.org](https://nodejs.org) → télécharge la version **LTS**
- Installe-le (tout par défaut)
- Vérifie dans le terminal : `node --version` → doit afficher un numéro

### 2. Installer les dépendances
Dans le terminal, depuis le dossier `etape-4-express` :

```bash
npm install
```

Cette commande lit `package.json` et installe tout ce qu'il faut.

### 3. Créer ton fichier `.env`
- Copie le fichier `.env.example` et renomme-le `.env`
- Remplis-le avec tes vraies clés Supabase :

```
SUPABASE_URL=https://ton-url.supabase.co
SUPABASE_KEY=ta-clé-anon
PORT=3000
```

⚠️ Ce fichier ne doit **jamais** être envoyé sur GitHub (il est déjà dans `.gitignore`)

### 4. Observer `server.js`
Ouvre `server.js` et repère :
- Comment Express est initialisé (`const app = express()`)
- Les 3 routes : `GET /api/mot`, `POST /api/joueurs`, `GET /api/joueurs`
- Comment les clés Supabase viennent de `process.env` (pas du code)
- Comment Express sert les fichiers du dossier `public/`

**Questions à se poser :**
- Qu'est-ce qui se passe quand on fait `GET /api/mot` ?
- Pourquoi les clés Supabase ne sont plus dans le `public/script.js` ?

### 5. Comparer avec l'étape 3
Ouvre `public/script.js` et compare avec le `script.js` de l'étape 3 :
- Étape 3 : `db.from('mots').select('*')` → appel direct à Supabase
- Étape 4 : `fetch('/api/mot')` → appel à notre propre serveur

### 6. Lancer le serveur
Dans le terminal :

```bash
npm run dev
```

- Ouvre [http://localhost:3000](http://localhost:3000) → le jeu doit marcher
- Le serveur tourne sur **ton ordinateur**. Arrête-le avec `Ctrl + C`.

### 7. Mettre le code sur GitHub
- Crée un compte sur [github.com](https://github.com) si pas encore fait
- Crée un nouveau repository
- Push le dossier `etape-4-express` (sans le `.env` !)

### 8. Déployer sur Render
- Crée un compte sur [render.com](https://render.com)
- **New +** → **Web Service** → connecte ton repo GitHub
- Configuration :
  - **Build command** : `npm install`
  - **Start command** : `node server.js`
- **Environment** → ajoute tes variables :
  - `SUPABASE_URL` = ton URL Supabase
  - `SUPABASE_KEY` = ta clé anon
- Clique **Create Web Service** → attends 2-3 minutes

### 9. Tester en ligne
- Render te donne une URL en `.onrender.com`
- Ouvre-la sur ton téléphone → le jeu marche depuis n'importe où !
- Envoie le lien à quelqu'un → les scores se mettent à jour dans le classement

---

## Points de vérification
- [ ] `npm install` s'est exécuté sans erreur
- [ ] Le fichier `.env` existe avec les vraies clés
- [ ] `npm run dev` lance le serveur sur localhost:3000
- [ ] Le jeu fonctionne sur localhost:3000
- [ ] Les clés Supabase ne sont **plus visibles** dans les DevTools → Sources
- [ ] Le jeu est accessible en ligne via l'URL Render
- [ ] Un ami peut jouer et son score apparaît dans le classement

## À retenir
```
AVANT : Navigateur → Supabase  (clés visibles dans le code)
APRÈS : Navigateur → Express → Supabase  (clés cachées côté serveur)
```
