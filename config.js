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

  // Katta videolar (Cloudflare R2 ochiq manzili, oxirida / siz). Bo'sh bo'lsa o'chiq. R2 ichidagi videos.json ro'yxatni beradi.
  VIDEO_BASE: "",

  // Videolar (sahifaning o'zida ko'riladi). Sifatlar ixtiyoriy: faqat borlarini yozing, Auto internet tezligiga qarab tanlaydi.
  // Misol: { t: "Sarlavha", poster: "video/1.jpg", src: { 1080: "video/1_1080.mp4", 720: "video/1_720.mp4", 480: "video/1_480.mp4" } }
  // Telegram kanal posti ham bo'ladi (ochiq kanal): { t: "Film", tg: "AsmaulHusnaOfficial/12" } yoki to'liq t.me havolasi. Sifat tanlovi bunda yo'q.
  VIDEOS: [
    { t: { uz: "Allohning 99 go'zal ismi", uz_kr: "Аллоҳнинг 99 гўзал исми", ru: "99 прекрасных имён Аллаха", en: "The 99 Beautiful Names of Allah" }, yt: "OYj5-nBzt4U" },
    { t: { uz: "Asmaul Husna (bolalar uchun)", uz_kr: "Асмаул Хусна (болалар учун)", ru: "Асмаул Хусна (для детей)", en: "Asmaul Husna (for kids)" }, yt: "aNUAEaendno" },
    { t: { uz: "Asma-ul-Husna — Shayx Muhammad Sodiq", uz_kr: "Асма-ул-Хусна — Шайх Муҳаммад Содиқ", ru: "Асма-уль-Хусна — Шейх Мухаммад Содик", en: "Asma-ul-Husna — Sheikh Muhammad Sodiq" }, yt: "IwuuyC4hMeg" },
    { t: { uz: "Jannat onalar oyog'i ostida — 1-qism", uz_kr: "Жаннат оналар оёғи остида — 1-қисм", ru: "Рай под ногами матерей — часть 1", en: "Paradise Lies at the Feet of Mothers — Part 1" }, yt: "TWtLQjuA5sI" },
    { t: { uz: "Jannat onalar oyog'i ostida — 2-qism", uz_kr: "Жаннат оналар оёғи остида — 2-қисм", ru: "Рай под ногами матерей — часть 2", en: "Paradise Lies at the Feet of Mothers — Part 2" }, yt: "-arXzf9f_8g" }
  ]
}
