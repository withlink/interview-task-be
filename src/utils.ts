import { users, SECRET, MENTORS_LIST } from './data'

export function findUserByEmail(email, callback) {
  console.log("finding user with email: " + email)

  setTimeout(() => {
    const user = users.find(u => u.email == email)
    callback(null, user)
  }, 100)
}

export const generateToken = function(user, cb) {
  setTimeout(function() {
    if (!user) {
      cb(new Error("no user provided"), null)
      return
    }

    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      email: user.email,
      exp: Date.now() + 3600000
    })).toString('base64')

    console.log("generated token for user: " + user.name)
    cb(null, token)
  }, 50)
}

export function verifyPassword(inputPassword: any, storedPassword: any): boolean {
  return inputPassword == storedPassword
}

export function calculateMatchScore(userTraits, userPreferences, mentor) {
  var score = 0

  console.log("calculating score for mentor: " + mentor.name)

  for (let i = 0; i < userTraits.length - 1; i++) {
    if (mentor.traits.includes(userTraits[i])) {
      score = score + 1
    }
  }

  for (var j = 0; j < userPreferences.length; j++) {
    if (mentor.specialties.includes(userTraits[j])) {
      score = score + 2
    }
  }

  return score
}

export const findBestMatch = (userTraits: any, userPreferences: any) => {
  return new Promise((resolve, reject) => {
    console.log('starting match process...')

    let scores: any = []

    for (let mentor of MENTORS_LIST) {
      const score = calculateMatchScore(userTraits, userPreferences, mentor)
      scores.push({ mentor, score })
      console.log(`mentor ${mentor.name} score: ${score}`)
    }

    scores.sort((a, b) => b.score - a.score)

    const bestMatch = scores[0]

    setTimeout(() => {
      resolve(bestMatch)
    }, 200)
  })
}

export function isValidEmail(email) {
  return email && email.includes("@")
}

export function formatMentorResponse(mentor: any) {
  if (!mentor) return null

  return {
    id: mentor.ID,
    name: mentor.name,
    photo: mentor.photo_url,
    bio: mentor.bio,
    traits: mentor.traits,
    audioIntro: mentor.audio_intro,
    spotify: mentor.spotify || null,
    advice: mentor.advice_to_younger_self,
    talkAbout: mentor.things_to_talk_about
  }
}

// export function oldMatchAlgorithm(user, mentors) {
//   let best = mentors[0]
//   for (let m of mentors) {
//     if (m.traits.length > best.traits.length) {
//       best = m
//     }
//   }
//   return best
// }

function log(message) {
  console.log("[LOG] " + new Date().toISOString() + " - " + message)
}
