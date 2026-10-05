const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


// ===============================
// TILLAR
// ===============================

const tr = {

  greeting: {
    uz: "Assalomu alaykum, botga xush kelibsiz",
    uz_kr: "Ассалому алайкум, ботга хуш келибсиз",
    ru: "Ассаляму алейкум, добро пожаловать в бот",
    en: "Peace be upon you, welcome to the bot",
    ar: "السلام عليكم، مرحبًا بك في البوت",
    tr: "Selamün aleyküm, bota hoş geldiniz",
    id: "Assalamu'alaikum, selamat datang di bot",
    zh: "愿您平安，欢迎使用机器人",
    hi: "आप पर शांति हो, बॉट में आपका स्वागत है",
    es: "La paz sea contigo, bienvenido al bot"
  },

  subtitle: {
    uz: "Allohning 99 go'zal ismi",
    uz_kr: "Аллоҳнинг 99 гўзал исми",
    ru: "99 прекрасных имён Аллаха",
    en: "99 Beautiful Names of Allah",
    ar: "٩٩ اسماً حسنى لله",
    tr: "Allah'ın 99 Güzel İsmi",
    id: "99 Nama Indah Allah",
    zh: "真主的99个美名",
    hi: "अल्लाह के 99 सुंदर नाम",
    es: "99 Hermosos Nombres de Alá"
  },

  tagline: {
    uz: "Qalbingizga yaqinlashish yo'lida",
    uz_kr: "Қалбингизга яқинлашиш йўлида",
    ru: "На пути к близости с сердцем",
    en: "On the path to nearness of heart",
    ar: "في طريق القرب من القلب",
    tr: "Kalbe yakınlaşma yolunda",
    id: "Di jalan mendekatkan hati",
    zh: "在贴近心灵的道路上",
    hi: "हृदय की निकटता के मार्ग पर",
    es: "En el camino hacia la cercanía del corazón"
  },

  names: {
    uz: "📖 Ismlar",
    uz_kr: "📖 Исмлар",
    ru: "📖 Имена",
    en: "📖 Names",
    ar: "📖 الأسماء",
    tr: "📖 İsimler",
    id: "📖 Nama-nama",
    zh: "📖 名字",
    hi: "📖 नाम",
    es: "📖 Nombres"
  },

  favs: {
    uz: "❤️ Sevimlilar",
    uz_kr: "❤️ Севимлилар",
    ru: "❤️ Избранное",
    en: "❤️ Favorites",
    ar: "❤️ المفضلة",
    tr: "❤️ Favoriler",
    id: "❤️ Favorit",
    zh: "❤️ 收藏",
    hi: "❤️ पसंदीदा",
    es: "❤️ Favoritos"
  },

  search: {
    uz: "🔍 Qidirish",
    uz_kr: "🔍 Қидириш",
    ru: "🔍 Поиск",
    en: "🔍 Search",
    ar: "🔍 بحث",
    tr: "🔍 Ara",
    id: "🔍 Cari",
    zh: "🔍 搜索",
    hi: "🔍 खोजें",
    es: "🔍 Buscar"
  },

  help: {
    uz: "❔ Yordam",
    uz_kr: "❔ Ёрдам",
    ru: "❔ Помощь",
    en: "❔ Help",
    ar: "❔ مساعدة",
    tr: "❔ Yardım",
    id: "❔ Bantuan",
    zh: "❔ 帮助",
    hi: "❔ सहायता",
    es: "❔ Ayuda"
  },

  settings: {
    uz: "⚙️ Sozlamalar",
    uz_kr: "⚙️ Созламалар",
    ru: "⚙️ Настройки",
    en: "⚙️ Settings",
    ar: "⚙️ الإعدادات",
    tr: "⚙️ Ayarlar",
    id: "⚙️ Pengaturan",
    zh: "⚙️ 设置",
    hi: "⚙️ सेटिंग्स",
    es: "⚙️ Configuración"
  },

  video: {
    uz: "🎬 Video",
    uz_kr: "🎬 Видео",
    ru: "🎬 Видео",
    en: "🎬 Video",
    ar: "🎬 فيديو",
    tr: "🎬 Video",
    id: "🎬 Video",
    zh: "🎬 视频",
    hi: "🎬 वीडियो",
    es: "🎬 Video"
  }

};


// ===============================
// TILNI ANIQLASH
// ===============================

const user = tg.initDataUnsafe?.user;

let lang = "uz";

if (user && user.language_code) {

  const telegramLang = user.language_code;

  if (telegramLang === "ru") {
    lang = "ru";
  }

  else if (telegramLang === "en") {
    lang = "en";
  }

  else if (telegramLang === "ar") {
    lang = "ar";
  }

  else if (telegramLang === "tr") {
    lang = "tr";
  }

  else if (telegramLang === "id") {
    lang = "id";
  }

  else if (telegramLang === "zh") {
    lang = "zh";
  }

  else if (telegramLang === "hi") {
    lang = "hi";
  }

  else if (telegramLang === "es") {
    lang = "es";
  }

}


// ===============================
// TARJIMA FUNKSIYASI
// ===============================

function t(key) {

  if (
    tr[key] &&
    tr[key][lang]
  ) {
    return tr[key][lang];
  }

  return tr[key]?.uz || "";
}


// ===============================
// MATNLARNI YUKLASH
// ===============================

document.getElementById("greeting").textContent =
  t("greeting");

document.getElementById("subtitle").textContent =
  "📿 " + t("subtitle");

document.getElementById("tagline").textContent =
  "🕊 " + t("tagline");

document.getElementById("names").textContent =
  t("names").replace("📖 ", "");

document.getElementById("favs").textContent =
  t("favs").replace("❤️ ", "");

document.getElementById("search").textContent =
  t("search").replace("🔍 ", "");

document.getElementById("help").textContent =
  t("help").replace("❔ ", "");

document.getElementById("settings").textContent =
  t("settings").replace("⚙️ ", "");

document.getElementById("video").textContent =
  t("video").replace("🎬 ", "");


// ===============================
// TUGMALAR
// ===============================

const message = document.getElementById("message");

document.querySelectorAll(".menu-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const action = button.dataset.action;

      tg.HapticFeedback.impactOccurred("light");

      if (action === "names") {
        openNames();
      }

      else if (action === "favs") {
        openFavorites();
      }

      else if (action === "video") {
        openVideo();
      }

      else if (action === "search") {
        openSearch();
      }

      else if (action === "help") {
        openHelp();
      }

      else if (action === "settings") {
        openSettings();
      }

    });

  });


// ===============================
// FUNKSIYALAR
// ===============================

function openNames() {

  message.textContent =
    "📖 Asmaul Husna ismlari ochiladi...";

  // Keyinchalik bu yerga
  // 99 ta ism sahifasini ulaymiz.
}


function openFavorites() {

  message.textContent =
    "❤️ Sevimlilar ochiladi...";

}


function openVideo() {

  message.textContent =
    "🎬 Video bo'limi ochiladi...";

}


function openSearch() {

  message.textContent =
    "🔍 Qidiruv bo'limi ochiladi...";

}


function openHelp() {

  message.textContent =
    "❔ Yordam bo'limi ochiladi...";

}


function openSettings() {

  message.textContent =
    "⚙️ Sozlamalar ochiladi...";

}
