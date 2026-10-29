// Sozlamalar: shu faylni o'zingizga moslab o'zgartiring
window.CONFIG = {
  VERSION: "v1.4.0",
  BOT: "AsmaulHusnarobot",
  CHANNEL: "AsmaulHusnaOfficial",

  // Audio fayllar ro'yxati: papkadagi fayl nomlari, ISM TARTIBI BILAN (1-ism, 2-ism, ... 99-ism). Misol: "11. Ал-Мутакаббир.mp3"
  AUDIO_REPO: "khujamnazarov07/telegram-mini-app",
  AUDIO_DIR: "audio1/",
  AUDIO_FILES: [],
  AUDIO_URL: function (n) {
    var f = (window.CONFIG.AUDIO_FILES || [])[n - 1]
    if (f) return window.CONFIG.AUDIO_DIR + f
    return window.CONFIG.AUDIO_DIR + ("00" + n).slice(-3) + ".mp3"
  },

  // Kanaldagi video postlar raqami, masalan [5, 6, 7]. Bo'sh bo'lsa, video bo'limi ko'rsatma chiqaradi.
  // Umumiy reyting uchun server manzili: GET -> {avg,count,likes}; POST {uid,rate,like} -> shu format. Bo'sh bo'lsa umumiy reyting "—" ko'rinadi.
  RATE_URL: "",

  // Statistika serveri (Cloudflare Worker) manzili, masalan "https://asmo-stats.XXXX.workers.dev". Bo'sh bo'lsa hisoblanmaydi.
  STATS_URL: "https://asmo-stats.islombek-xojamnazarov-007.workers.dev",

  VIDEO_POSTS: [],

  // Videolar (sahifaning o'zida ko'riladi). Sifatlar ixtiyoriy: faqat borlarini yozing, Auto internet tezligiga qarab tanlaydi.
  // Misol: { t: "Sarlavha", poster: "video/1.jpg", src: { 1080: "video/1_1080.mp4", 720: "video/1_720.mp4", 480: "video/1_480.mp4" } }
  // Telegram kanal posti ham bo'ladi (ochiq kanal): { t: "Film", tg: "AsmaulHusnaOfficial/12" } yoki to'liq t.me havolasi. Sifat tanlovi bunda yo'q.
  VIDEOS: [
    { t: { uz: "Allohning go'zal ismlari — 1", uz_kr: "Аллоҳнинг гўзал исмлари — 1", ru: "Прекрасные имена Аллаха — 1", en: "The Beautiful Names of Allah — 1", ar: "أسماء الله الحسنى — 1", tr: "Allah'ın Güzel İsimleri — 1", id: "Asmaul Husna — 1", zh: "真主的美名 — 1", hi: "अल्लाह के सुंदर नाम — 1", es: "Los Hermosos Nombres de Alá — 1" }, src: { 720: "1.mp4" } },
    { t: { uz: "Allohning go'zal ismlari — 2", uz_kr: "Аллоҳнинг гўзал исмлари — 2", ru: "Прекрасные имена Аллаха — 2", en: "The Beautiful Names of Allah — 2", ar: "أسماء الله الحسنى — 2", tr: "Allah'ın Güzel İsimleri — 2", id: "Asmaul Husna — 2", zh: "真主的美名 — 2", hi: "अल्लाह के सुंदर नाम — 2", es: "Los Hermosos Nombres de Alá — 2" }, src: { 720: "2.mp4" } },
    { t: { uz: "Allohning go'zal ismlari — 3", uz_kr: "Аллоҳнинг гўзал исмлари — 3", ru: "Прекрасные имена Аллаха — 3", en: "The Beautiful Names of Allah — 3", ar: "أسماء الله الحسنى — 3", tr: "Allah'ın Güzel İsimleri — 3", id: "Asmaul Husna — 3", zh: "真主的美名 — 3", hi: "अल्लाह के सुंदर नाम — 3", es: "Los Hermosos Nombres de Alá — 3" }, src: { 720: "3.mp4" } },
    { t: { uz: "Jannat onalar oyog'i ostida", uz_kr: "Жаннат оналар оёғи остида", ru: "Рай под ногами матерей", en: "Paradise Lies at the Feet of Mothers" }, tg: "AsmaulHusnaOfficial/67" }
  ]
}
