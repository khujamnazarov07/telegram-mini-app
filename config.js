// Sozlamalar: shu faylni o'zingizga moslab o'zgartiring
window.CONFIG = {
  VERSION: "v1.4.0",
  BOT: "AsmaulHusnarobot",
  CHANNEL: "AsmaulHusnaOfficial",

  // Audio fayl manzili (n = 1..99). Mp3 fayllarni shu saytga yuklang: audio/001.mp3 ... audio/099.mp3
  AUDIO_URL: function (n) {
    return "audio111.mp3/" + ("00" + n).slice(-3) + ".mp3"
  },

  // Kanaldagi video postlar raqami, masalan [5, 6, 7]. Bo'sh bo'lsa, video bo'limi ko'rsatma chiqaradi.
  // Umumiy reyting uchun server manzili: GET -> {avg,count,likes}; POST {uid,rate,like} -> shu format. Bo'sh bo'lsa umumiy reyting "—" ko'rinadi.
  RATE_URL: "",

  VIDEO_POSTS: []
}
