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

  VIDEO_POSTS: [],

  // Videolar (sahifaning o'zida ko'riladi). Sifatlar ixtiyoriy: faqat borlarini yozing, Auto internet tezligiga qarab tanlaydi.
  // Misol: { t: "Sarlavha", poster: "video/1.jpg", src: { 1080: "video/1_1080.mp4", 720: "video/1_720.mp4", 480: "video/1_480.mp4" } }
  VIDEOS: []
}
