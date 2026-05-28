// ─── SETUP UI ────────────────────────────────────────────────────────────────
// Pas de Supabase ici — le frontend ne connaît plus les clés
// Il parle uniquement à notre serveur Express

const mesLettres = "abcdefghijklmnopqrstuvwxyz".split("")

const reload = document.querySelector("#reload")
reload.addEventListener("click", function() { location.reload() })

const rules = document.querySelector("#launch-rules")
const modalRules = document.querySelector(".modal#rules")
rules.addEventListener("click", function() {
  modalRules.classList.add("active")
  modalRules.addEventListener("click", function() { modalRules.classList.remove("active") })
})

const modalEnd  = document.querySelector(".modal#end")
const modalClue = document.querySelector(".modal#clue")

// ─── FETCH MOT — appel vers notre serveur Express ────────────────────────────
// NOUVEAUTÉ : au lieu de db.from('mots'), on appelle /api/mot
// Express va chercher dans Supabase et nous renvoie le résultat

async function fetchMotAleatoire() {
  const response = await fetch('/api/mot')
  const motData  = await response.json()
  return motData
}

// ─── METTRE À JOUR LE SCORE — appel vers notre serveur Express ───────────────

async function mettreAJourScore(prenom, tentativesRestantes, victoire) {
  await fetch('/api/joueurs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prenom, tentatives_restantes: tentativesRestantes, victoire })
  })
}

// ─── AFFICHER LE CLASSEMENT — appel vers notre serveur Express ───────────────

async function afficherClassement() {
  const response = await fetch('/api/joueurs')
  const data     = await response.json()

  const scoresList = document.querySelector("#scores-list")

  if (data.length === 0) {
    scoresList.innerHTML = '<p class="leaderboard-empty">Aucun score pour l\'instant. Sois le premier !</p>'
  } else {
    const medals = ['🥇', '🥈', '🥉']
    scoresList.innerHTML = data.map(function(joueur, index) {
      const rang = medals[index] || (index + 1) + '.'
      return `
        <div class="leaderboard-row">
          <span class="rang">${rang}</span>
          <span class="prenom">${joueur.prenom}</span>
          <span class="stats">${joueur.victoires}/${joueur.parties} parties</span>
          <span class="score">${joueur.points} pts</span>
        </div>
      `
    }).join('')
  }

  const modalLeaderboard = document.querySelector(".modal#leaderboard")
  modalLeaderboard.classList.add("active")
  modalLeaderboard.addEventListener("click", function() {
    modalLeaderboard.classList.remove("active")
  }, { once: true })
}

document.querySelector("#launch-leaderboard").addEventListener("click", afficherClassement)

// ─── INIT JEU ────────────────────────────────────────────────────────────────

async function initJeu() {
  const motData = await fetchMotAleatoire()
  if (!motData) return

  const randomWord = motData.mot
  const wordClues  = [motData.indice_1, motData.indice_2]
  const randomWordArraySolution = randomWord.split("")
  const randomWordArrayGuess    = Array(randomWordArraySolution.length).fill("_")

  const wordDisplay = document.querySelector("#word")
  wordDisplay.textContent = randomWordArrayGuess.join("")
  document.querySelector("#letters-count").textContent = randomWord.length

  const lettersDisplay = document.querySelector("#letters")
  mesLettres.forEach(function(letter) {
    const letterBtn = document.createElement("h3")
    letterBtn.className = "letter-btn"
    letterBtn.textContent = letter
    lettersDisplay.appendChild(letterBtn)
  })

  let tentatives = 10
  const attemptDisplay = document.querySelector("#attempt")
  attemptDisplay.textContent = tentatives

  document.querySelectorAll(".letter-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const clickedLetterValue = btn.textContent.toUpperCase()
      let presence = false

      for (let i = 0; i < randomWordArraySolution.length; i++) {
        if (clickedLetterValue === randomWordArraySolution[i].toUpperCase()) {
          randomWordArrayGuess[i] = clickedLetterValue
          presence = true
          btn.classList.add("present")
        }
      }
      wordDisplay.textContent = randomWordArrayGuess.join("")

      if (!presence) {
        tentatives -= 1
        btn.classList.add("non-present")
        const activeImg = document.querySelector(".img-display.active")
        if (activeImg) {
          activeImg.classList.remove("active")
          if (activeImg.nextElementSibling) activeImg.nextElementSibling.classList.add("active")
        }
      }

      attemptDisplay.textContent = tentatives

      const victoire = randomWordArrayGuess.join("") === randomWordArraySolution.join("").toUpperCase()
      if (victoire || tentatives === 0) {
        let message = ""
        if (victoire) {
          if (tentatives === 10)   message = "Bravo 🎉 ! One shot ! Quel talent ! 😍"
          else if (tentatives > 3) message = "Bravo 🎉 ! Encore un peu d'entraînement ! 💪"
          else                     message = "Bravo 🎉 ! Tu l'as échappé belle ! 🥲"
          wordDisplay.classList.add("text-green")
        } else {
          message = "Bon ben... Tu feras mieux la prochaine fois ! 🤞"
          modalEnd.classList.add("lost")
        }

        setTimeout(function() {
          modalEnd.classList.add("active")
          modalEnd.style.animation = 'none'
          modalEnd.style.top = '50vh'
          modalEnd.innerHTML = `
            <div>
              <h5>${message}</h5>
              <div class="score-form">
                <input type="text" id="input-prenom" placeholder="Ton prénom" maxlength="20" />
                <button id="btn-sauver">Sauver mon score</button>
              </div>
            </div>
          `

          document.querySelector("#btn-sauver").addEventListener("click", async function() {
            const prenom = document.querySelector("#input-prenom").value.trim()
            if (!prenom) return
            await mettreAJourScore(prenom, tentatives, victoire)
            modalEnd.classList.remove("active")
            await afficherClassement()
            setTimeout(function() { location.reload() }, 6000)
          })
        }, 1000)
      }
    })
  })

  document.querySelector("#btn-clue").addEventListener("click", function() {
    const randomClue = wordClues[Math.floor(Math.random() * wordClues.length)]
    modalClue.innerHTML = `<h5>${randomClue}</h5>`
    modalClue.classList.add("active")
    setTimeout(function() { modalClue.classList.remove("active") }, 6000)
    modalClue.addEventListener("click", function() { modalClue.classList.remove("active") })
  })
}

initJeu()
