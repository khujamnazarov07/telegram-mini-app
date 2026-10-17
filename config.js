// Sozlamalar: shu faylni o'zingizga moslab o'zgartiring
window.CONFIG = {
  VERSION: "v1.2.0",
  BOT: "AsmaulHusnarobot",
  CHANNEL: "AsmaulHusnaOfficial",

  // Audio fayl manzili (n = 1..99). Mp3 fayllarni shu saytga yuklang: audio/001.mp3 ... audio/099.mp3
  AUDIO_URL: function (n) {
    return "audio/" + ("00" + n).slice(-3) + ".mp3"
  },

  // Kanaldagi video postlar raqami, masalan [5, 6, 7]. Bo'sh bo'lsa, video bo'limi ko'rsatma chiqaradi.
  VIDEO_POSTS:[2, 6, 20, 67]
}
