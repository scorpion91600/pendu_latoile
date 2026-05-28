@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

a {
  text-decoration: none;
}

/* ── IMAGE ──────────────────────────────────────────────────────── */

#box-img {
  width: 100%;
  height: clamp(200px, 42vh, 480px);
}

#box-img img {
  height: clamp(200px, 42vh, 480px);
  object-fit: contain;
  width: 100%;
  display: none;
}

#box-img img.active {
  display: block;
}

/* ── UTILITAIRES ────────────────────────────────────────────────── */

.d-flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.d-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-center {
  text-align: center;
}

.text-green {
  color: #52b69a;
}

/* ── HEADER ─────────────────────────────────────────────────────── */

#logo {
  font-family: 'Nanum Pen Script', cursive;
  font-size: 38px;
  margin-bottom: 0;
}

.tabs {
  display: flex;
}

#launch-leaderboard {
  color: black;
  font-size: 26px;
  margin: 0;
  margin-right: 20px;
  cursor: pointer;
}

#launch-rules {
  color: black;
  font-size: 26px;
  margin: 0;
  margin-right: 20px;
  cursor: pointer;
}

#reload {
  color: black;
  font-size: 26px;
  margin: 0;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

#reload:hover {
  color: #FF5B5B;
}

/* ── LAYOUT ─────────────────────────────────────────────────────── */

.columns {
  height: 100vh;
  overflow: hidden;
  padding: 28px 32px;
}

.box-guess {
  margin: 16px 0;
}

/* ── MOT À DEVINER ──────────────────────────────────────────────── */

#word {
  letter-spacing: clamp(0.15rem, 0.5vw, 0.5rem);
  font-size: clamp(22px, 2.8vw, 40px);
}

#attempt {
  font-weight: bold;
}

/* ── GRILLE DE LETTRES ──────────────────────────────────────────── */

#letters {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-top: 20px;
}

/* Correction clé : Skeleton impose 30px sur h3 → on surcharge ici */
.letter-btn {
  font-size: 14px;
  color: #000000;
  padding: 10px 6px;
  margin: 0;
  background: white;
  text-transform: capitalize;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 10px rgba(114, 79, 79, 0.15));
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.letter-btn:hover {
  background: #8b7979;
  color: white;
}

.present {
  box-shadow: 0px 0px 0px 1px;
}

.non-present {
  opacity: 0.2;
}

#btn-clue {
  grid-column: span 2;
  font-size: 13px;
  color: white;
  padding: 10px 6px;
  margin: 0;
  background: black;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 10px rgba(114, 79, 79, 0.15));
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

#btn-clue:hover {
  background: #FF5B5B;
  color: white;
}

/* ── MODALES ────────────────────────────────────────────────────── */

.modal#clue {
  background: #ffffff78;
  backdrop-filter: blur(10px);
  color: #FF5B5B;
  border-radius: 20px;
}

.modal#rules {
  background: #52b69a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.modal#end {
  background: #52b69a;
  color: white;
  font-weight: bold;
}

.modal.lost#end {
  background: #FF5B5B;
  color: white;
  font-weight: bold;
}

.modal.active {
  position: absolute;
  animation: 5s slidein;
  top: -100vh;
  left: 50vw;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 100px lightgrey;
}

.modal#rules.active {
  animation: 10s slidein;
}

@keyframes slidein {
  0%   { top: -100vh; }
  15%  { top: 50vh; }
  88%  { top: 50vh; }
  93%  { top: 51vh; }
  100% { top: -100vh; }
}

/* ── FORMULAIRE DE SCORE (modale de fin) ────────────────────────── */

#end > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.score-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
}

.score-form input {
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  text-align: center;
  width: min(220px, 70vw);
  outline: none;
}

.score-form button {
  padding: 12px 0;
  width: min(220px, 70vw);
  background: white;
  color: #52b69a;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.score-form button:hover  { background: #f0f0f0; }
.score-form button:active { transform: scale(0.97); }
.modal.lost .score-form button { color: #FF5B5B; }

/* ── LEADERBOARD ────────────────────────────────────────────────── */

.modal#leaderboard {
  background: #1a1a2e;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 40px;
  overflow-y: auto;
}

.modal#leaderboard h4 {
  color: white;
  margin-bottom: 32px;
}

#scores-list {
  width: 100%;
  max-width: 500px;
}

.leaderboard-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 15px;
}

.leaderboard-row .rang   { font-size: 20px; width: 40px; }
.leaderboard-row .prenom { flex: 1; font-weight: bold; }
.leaderboard-row .stats  { color: #aaa; font-size: 13px; margin-right: 16px; }
.leaderboard-row .score  { color: #52b69a; font-weight: bold; min-width: 60px; text-align: right; }
.leaderboard-empty       { color: #aaa; text-align: center; margin-top: 20px; }

/* ── TABLETTE (550px – 960px) ───────────────────────────────────── */

@media (max-width: 960px) {
  .columns {
    padding: 20px 24px;
  }

  #box-img,
  #box-img img {
    height: clamp(160px, 34vh, 360px);
  }

  .box-guess {
    margin: 10px 0;
  }

  #letters {
    gap: 6px;
    margin-top: 14px;
  }

  .modal#leaderboard {
    padding: 40px 20px;
  }
}

/* ── MOBILE (< 550px — breakpoint de Skeleton) ──────────────────── */

@media (max-width: 550px) {
  /* On autorise le scroll vertical sur mobile */
  body {
    height: auto;
    overflow-y: auto;
  }

  .columns {
    height: auto;
    overflow: visible;
    padding: 16px;
  }

  /* Colonne image : padding réduit */
  .columns:last-child {
    padding-top: 0;
  }

  #box-img,
  #box-img img {
    height: 190px;
  }

  #logo {
    font-size: 28px;
  }

  #launch-leaderboard,
  #launch-rules,
  #reload {
    font-size: 20px;
    margin-right: 14px;
  }

  .box-guess {
    margin: 8px 0;
  }

  #word {
    font-size: 20px;
    letter-spacing: 0.15rem;
  }

  #letters {
    gap: 5px;
    margin-top: 12px;
  }

  .letter-btn {
    padding: 9px 4px;
    font-size: 13px;
    border-radius: 4px;
  }

  #btn-clue {
    padding: 9px 4px;
    font-size: 12px;
  }

  /* Leaderboard compact sur mobile */
  .modal#leaderboard {
    padding: 30px 16px;
  }

  .leaderboard-row {
    padding: 10px 12px;
    font-size: 13px;
  }

  .leaderboard-row .rang  { font-size: 16px; width: 30px; }
  .leaderboard-row .stats { font-size: 11px; margin-right: 8px; }
  .leaderboard-row .score { min-width: 48px; }
}
