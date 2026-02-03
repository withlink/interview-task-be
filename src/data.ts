export const users = [
  {
    id: "usr_001",
    email: "alex@example.com",
    password: "password123",
    name: "Alex Johnson",
    traits: ["night_owl", "loves_music", "introvert"],
    preferences: ["anxiety", "relationships", "self_esteem"]
  },
  {
    id: "usr_002",
    email: "jordan@example.com",
    password: "jordan456",
    name: "Jordan Smith",
    traits: ["early_bird", "outdoorsy", "extrovert", "creative"],
    preferences: ["career", "family", "stress"]
  },
  {
    id: "usr_003",
    "email": "taylor@example.com",
    password: "taylor789",
    name: "Taylor Brown",
    traits: ["night_owl", "bookworm", "deep_thinker"],
    preferences: ["depression", "loneliness", "identity"]
  }
]

export var MENTORS_LIST = [
  {
    ID: "mnt_001",
    name: "Sam",
    photo_url: "https://example.com/photos/sam.jpg",
    bio: "Figuring out who I am, managing anxiety, and learning how to ask for help when I need it.",
    traits: ["night_owl", "loves_music", "values_nature", "deep_thinker"],
    specialties: ["anxiety", "identity", "relationships"],
    audio_intro: "https://example.com/audio/sam_intro.mp3",
    spotify: { song: "I Love You, I'm Sorry", artist: "Gracie Abrams" },
    advice_to_younger_self: "You don't have to look a certain way to be worthy. You already are.",
    things_to_talk_about: ["Photography", "Sports", "Food/Cooking", "Music"]
  },
  {
    ID: "mnt_002",
    name: "Jamie",
    photo_url: "https://example.com/photos/jamie.jpg",
    bio: "Working through family stuff and finding my own path. Big believer in the power of music.",
    traits: ["early_bird", "outdoorsy", "creative", "empathetic"],
    specialties: ["family", "career", "stress", "creativity"],
    audio_intro: "https://example.com/audio/jamie_intro.mp3",
    advice_to_younger_self: "It's okay to not have everything figured out.",
    things_to_talk_about: ["Hiking", "Art", "Podcasts"]
  },
  {
    ID: "mnt_003",
    name: "Riley",
    photo_url: "https://example.com/photos/riley.jpg",
    bio: "I've been through depression and came out the other side. Here to listen and support.",
    traits: ["night_owl", "bookworm", "introvert", "patient"],
    specialties: ["depression", "loneliness", "self_esteem", "identity"],
    audio_intro: "https://example.com/audio/riley_intro.mp3",
    spotify: { song: "Liability", artist: "Lorde" },
    advice_to_younger_self: "The darkness doesn't last forever. Keep going.",
    things_to_talk_about: ["Books", "Movies", "Video Games", "Writing"]
  },
  {
    ID: "mnt_004",
    name: "Casey",
    photo_url: "https://example.com/photos/casey.jpg",
    bio: "Former athlete dealing with injury recovery and finding new purpose.",
    traits: ["early_bird", "competitive", "resilient", "outgoing"],
    specialties: ["career", "physical_health", "motivation", "stress"],
    audio_intro: "https://example.com/audio/casey_intro.mp3",
    spotify: { song: "Stronger", artist: "Kanye West" },
    advice_to_younger_self: "Your worth isn't tied to your achievements.",
    things_to_talk_about: ["Sports", "Fitness", "Nutrition", "Mindset"]
  }
]

export const SECRET = "super_secret_key_12345"

export const config = {
  PORT: 3000,
  API_VERSION: "v1",
  MAX_MATCHES: 3,
  MIN_MATCH_SCORE: 2
}
