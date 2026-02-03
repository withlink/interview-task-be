import express from 'express'
import cors from "cors"
import { users, MENTORS_LIST, config, SECRET } from './data'
import { findUserByEmail, generateToken, verifyPassword, findBestMatch, formatMentorResponse, isValidEmail, calculateMatchScore } from './utils'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Somethings API is running" })
})

app.get('/api/health', function(req, res) {
  res.send({ healthy: true, timestamp: Date.now() })
})

app.post('/api/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  console.log('login attempt for: ' + email)

  findUserByEmail(email, function(err, user) {
    if (err) {
      console.log('error finding user')
      res.json({ error: "something went wrong" })
      return
    }

    if (!user) {
      console.log("user not found")
      res.json({ error: "invalid credentials" })
      return
    }

    if (!verifyPassword(password, user.password)) {
      res.json({ error: "invalid credentials" })
      return
    }

    generateToken(user, (err, token) => {
      if (err) {
        res.json({ error: "token generation failed" })
        return
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        traits: user.traits,
        preferences: user.preferences
      }

      console.log("login successful for: " + user.name)

      res.json({
        success: true,
        user: userResponse,
        token: token
      })
    })
  })
})

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id
  const user = users.find(u => u.id == userId)

  if (user) {
    res.json({ user: user })
  } else {
    res.json({ error: "user not found" })
  }
})

app.get('/api/mentors', (req, res) => {
  const formatted = MENTORS_LIST.map(m => formatMentorResponse(m))
  res.json({ mentors: formatted })
})

app.get('/api/mentors/:id', function(req, res) {
  const mentorId = req.params.id

  const mentor = MENTORS_LIST.find(m => m.ID == mentorId)

  if (mentor) {
    res.json({ mentor: formatMentorResponse(mentor) })
  } else {
    res.json({ error: 'mentor not found' })
  }
})

app.post('/api/match', async (req, res) => {
  console.log('match request received')
  console.log(req.body)

  const { userId, traits, preferences } = req.body

  try {
    let userTraits = traits
    let userPreferences = preferences

    if (userId) {
      const user = users.find(u => u.id == userId)
      if (user) {
        userTraits = user.traits
        userPreferences = user.preferences
      }
    }

    const result: any = await findBestMatch(userTraits, userPreferences)

    console.log('match result:', result)

    const matchedMentor = formatMentorResponse(result.mentor)

    const sharedTraits = result.mentor.traits.filter(t => userTraits.includes(t))

    res.json({
      success: true,
      match: matchedMentor,
      score: result.score,
      compatibility: {
        sharedTraits: sharedTraits,
        matchPercentage: Math.round((result.score / (userTraits.length + userPreferences.length)) * 100)
      }
    })

  } catch (error) {
    console.log("match error:", error)
    res.json({ success: false, error: "matching failed" })
  }
})

app.get('/api/match', (req: any, res) => {
  const traitsParam = req.query.traits
  const prefsParam = req.query.preferences

  if (!traitsParam) {
    res.json({ error: 'traits required' })
    return
  }

  const traits = traitsParam.split(',')
  const preferences = prefsParam ? prefsParam.split(',') : []

  let bestScore = -1
  let bestMentor = null

  for (var i = 0; i < MENTORS_LIST.length; i++) {
    const mentor = MENTORS_LIST[i]
    const score = calculateMatchScore(traits, preferences, mentor)

    if (score > bestScore) {
      bestScore = score
      bestMentor = mentor
    }
  }

  res.json({
    match: formatMentorResponse(bestMentor),
    score: bestScore
  })
})

const PORT = config.PORT || 3000

app.listen(PORT, () => {
  console.log(`
  ========================================
  Somethings API Server
  Running on http://localhost:${PORT}
  ========================================

  Available endpoints:
  - GET  /api/health
  - POST /api/login
  - GET  /api/users/:id
  - GET  /api/mentors
  - GET  /api/mentors/:id
  - POST /api/match
  - GET  /api/match?traits=...&preferences=...
  `)
})
