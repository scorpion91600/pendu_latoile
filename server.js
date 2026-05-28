// ─── IMPORTS ─────────────────────────────────────────────────────────────────

const express = require('express')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

// ─── SETUP ───────────────────────────────────────────────────────────────────

const app = express()
app.use(express.json())

// Servir les fichiers statiques du dossier "public" (notre frontend)
app.use(express.static('public'))

// Connexion Supabase — les clés viennent du fichier .env, pas du code
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// ─── ROUTES API ──────────────────────────────────────────────────────────────
// Ce sont les "portes" que notre frontend peut appeler

// GET /api/mot — retourne un mot aléatoire depuis la base
app.get('/api/mot', async (req, res) => {
  const { data, error } = await db.from('mots').select('*')

  if (error) {
    return res.status(500).json({ erreur: error.message })
  }

  const motAleatoire = data[Math.floor(Math.random() * data.length)]
  res.json(motAleatoire)
})

// POST /api/joueurs — met à jour le score d'un joueur (INSERT ou UPDATE)
app.post('/api/joueurs', async (req, res) => {
  const { prenom, tentatives_restantes, victoire } = req.body
  const points = victoire ? tentatives_restantes * 10 : 0

  // Chercher si le joueur existe déjà
  const { data: joueur } = await db
    .from('joueurs')
    .select('*')
    .eq('prenom', prenom)
    .maybeSingle()

  if (joueur) {
    // Il existe → UPDATE
    const { error } = await db
      .from('joueurs')
      .update({
        points:    joueur.points    + points,
        victoires: joueur.victoires + (victoire ? 1 : 0),
        parties:   joueur.parties   + 1
      })
      .eq('prenom', prenom)

    if (error) return res.status(500).json({ erreur: error.message })
  } else {
    // Nouveau joueur → INSERT
    const { error } = await db
      .from('joueurs')
      .insert({ prenom, points, victoires: victoire ? 1 : 0, parties: 1 })

    if (error) return res.status(500).json({ erreur: error.message })
  }

  res.json({ succes: true })
})

// GET /api/joueurs — retourne le classement (top 10 par points)
app.get('/api/joueurs', async (req, res) => {
  const { data, error } = await db
    .from('joueurs')
    .select('*')
    .order('points', { ascending: false })
    .limit(10)

  if (error) return res.status(500).json({ erreur: error.message })
  res.json(data)
})

// ─── DÉMARRAGE ───────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
