(function () {
  "use strict"

  var CFG = window.CONFIG
  var D = window.DATA
  var tg = window.Telegram && window.Telegram.WebApp
  var LANGS = ["uz", "uz_kr", "ru", "en", "ar", "tr", "id", "zh", "hi", "es"]
  var LANG_NAMES = { uz: "O'zbekcha", uz_kr: "Ўзбекча", ru: "Русский", en: "English", ar: "العربية", tr: "Türkçe", id: "Indonesia", zh: "中文", hi: "हिन्दी", es: "Español" }

  // ====================
  // TRANSLATIONS  (tartib: uz | uz_kr | ru | en | ar | tr | id | zh | hi | es)
  // ====================
  var TXT = {
    nav_names: "Ismlar|Исмлар|Имена|Names|الأسماء|İsimler|Nama|名字|नाम|Nombres",
    nav_media: "Media|Медиа|Медиа|Media|الوسائط|Medya|Media|媒体|मीडिया|Multimedia",
    nav_mood: "Kayfiyat|Кайфият|Настроение|Mood|المزاج|Ruh hali|Suasana|心情|मनोदशा|Ánimo",
    nav_daily: "Salavot|Салавот|Салават|Salawat|الصلاة|Salavat|Salawat|赞圣|सलावात|Salawat",
    nav_more: "Yana|Яна|Ещё|More|المزيد|Daha|Lainnya|更多|और|Más",
    search: "Ism qidirish...|Исм қидириш...|Поиск имени...|Search a name...|ابحث عن اسم...|İsim ara...|Cari nama...|搜索名字...|नाम खोजें...|Buscar nombre...",
    favs: "Sevimlilar|Севимлилар|Избранное|Favorites|المفضلة|Favoriler|Favorit|收藏|पसंदीदा|Favoritos",
    favs_empty: "Hali belgilangan ism yo'q|Ҳали белгиланган исм йўқ|Пока нет отмеченных имён|No favorites yet|لا توجد أسماء مفضلة بعد|Henüz favori yok|Belum ada favorit|暂无收藏|अभी कोई पसंदीदा नहीं|Aún no hay favoritos",
    no_result: "Hech narsa topilmadi|Ҳеч нарса топилмади|Ничего не найдено|Nothing found|لم يتم العثور على شيء|Sonuç yok|Tidak ditemukan|没有结果|कुछ नहीं मिला|Sin resultados",
    note: "Eslatma|Эслатма|Заметка|Note|ملاحظة|Not|Catatan|备注|नोट|Nota",
    note_ph: "Shaxsiy eslatma yozing...|Шахсий эслатма ёзинг...|Напишите личную заметку...|Write a personal note...|اكتب ملاحظة شخصية...|Kişisel not yazın...|Tulis catatan pribadi...|写下个人备注...|व्यक्तिगत नोट लिखें...|Escribe una nota personal...",
    save: "Saqlash|Сақлаш|Сохранить|Save|حفظ|Kaydet|Simpan|保存|सहेजें|Guardar",
    saved: "Saqlandi|Сақланди|Сохранено|Saved|تم الحفظ|Kaydedildi|Tersimpan|已保存|सहेजा गया|Guardado",
    video: "Video|Видео|Видео|Video|فيديو|Video|Video|视频|वीडियो|Vídeo",
    audio: "Audio|Аудио|Аудио|Audio|صوت|Ses|Audio|音频|ऑडियो|Audio",
    no_audio: "Audio topilmadi|Аудио топилмади|Аудио не найдено|Audio not found|لم يتم العثور على الصوت|Ses bulunamadı|Audio tidak ditemukan|未找到音频|ऑडियो नहीं मिला|Audio no encontrado",
    no_video: "Video postlari hali kiritilmagan|Видео постлари ҳали киритилмаган|Видео пока не добавлены|No videos added yet|لم تتم إضافة فيديوهات بعد|Henüz video eklenmedi|Belum ada video|尚未添加视频|अभी कोई वीडियो नहीं|Aún no hay vídeos",
    video_open: "Kanalda ochish|Каналда очиш|Открыть в канале|Open in channel|افتح في القناة|Kanalda aç|Buka di kanal|在频道打开|चैनल में खोलें|Abrir en el canal",
    pick_num: "Tinglash uchun raqamni tanlang|Тинглаш учун рақамни танланг|Выберите номер для прослушивания|Pick a number to listen|اختر رقماً للاستماع|Dinlemek için numara seçin|Pilih nomor untuk mendengarkan|选择编号收听|सुनने के लिए संख्या चुनें|Elige un número para escuchar",
    mood_title: "Hozir kayfiyatingiz qanday?|Ҳозир кайфиятингиз қандай?|Какое у вас сейчас настроение?|How do you feel now?|كيف حالك الآن؟|Şu an nasıl hissediyorsun?|Bagaimana perasaanmu sekarang?|你现在感觉如何？|अभी आप कैसा महसूस कर रहे हैं?|¿Cómo te sientes ahora?",
    mood_names: "Sizga mos ismlar|Сизга мос исмлар|Подходящие имена|Names for you|أسماء مناسبة لك|Sana uygun isimler|Nama untuk Anda|适合你的名字|आपके लिए नाम|Nombres para ti",
    mood_again: "Qayta tanlash|Қайта танлаш|Выбрать заново|Choose again|اختر مرة أخرى|Yeniden seç|Pilih lagi|重新选择|फिर से चुनें|Elegir de nuevo",
    mood_times: "Tanlangan|Танланган|Выбрано|Chosen|تم اختياره|Seçildi|Dipilih|已选|चुना गया|Elegido",
    daily: "Kunlik salavot|Кунлик салавот|Ежедневный салават|Daily Salawat|الصلاة اليومية|Günlük Salavat|Salawat Harian|每日赞圣|दैनिक सलावात|Salawat diario",
    daily_ask: "Kuniga nechta salavot aytmoqchisiz?|Кунига нечта салавот айтмоқчисиз?|Сколько салаватов в день?|How many salawat per day?|كم صلاة في اليوم؟|Günde kaç salavat?|Berapa salawat per hari?|每天多少次？|रोज़ कितने सलावात?|¿Cuántos salawat al día?",
    needed: "Kerak|Керак|Нужно|Needed|مطلوب|Gerekli|Diperlukan|需要|आवश्यक|Necesario",
    done_n: "Bajarildi|Бажарилди|Выполнено|Done|تم|Tamamlandı|Selesai|已完成|पूर्ण|Hecho",
    left_n: "Qoldi|Қолди|Осталось|Remaining|متبقي|Kalan|Tersisa|剩余|शेष|Restante",
    owed: "{n} kunlik qarzingiz bor!|{n} кунлик қарзингиз бор!|У вас долг за {n} дн.!|You have {n} day(s) overdue!|لديك {n} يوم متأخر!|{n} günlük borcunuz var!|Anda memiliki tunggakan {n} hari!|您有 {n} 天的欠款！|आपके पास {n} दिन का बकाया है!|¡Tiene {n} día(s) atrasado(s)!",
    cong: "Bugungi vazifa bajarildi! Barakalla!|Бугунги вазифа бажарилди! Баракалла!|Сегодня выполнено! Молодец!|Today's task is done! Well done!|تم إنجاز مهمة اليوم! أحسنت!|Bugünkü görev tamamlandı! Aferin!|Tugas hari ini selesai! Kerja bagus!|今天的任务已完成！做得好！|आज का काम पूरा! शाबाश!|¡Tarea de hoy completa! ¡Bien hecho!",
    step_lbl: "Bir bosishda|Бир босишда|За одно нажатие|Per tap|لكل نقرة|Tek dokunuşta|Per ketukan|每次点击|प्रति टैप|Por toque",
    target_lbl: "Kunlik maqsad|Кунлик мақсад|Дневная цель|Daily target|الهدف اليومي|Günlük hedef|Target harian|每日目标|दैनिक लक्ष्य|Meta diaria",
    quote: "Iqtibos|Иқтибос|Цитата|Quote|اقتباس|Alıntı|Kutipan|语录|उद्धरण|Cita",
    share: "Ulashish|Улашиш|Поделиться|Share|مشاركة|Paylaş|Bagikan|分享|शेयर करें|Compartir",
    another: "Yana|Яна|Ещё|Another|آخر|Başka|Lainnya|换一条|और|Otra",
    lang: "Til|Тил|Язык|Language|اللغة|Dil|Bahasa|语言|भाषा|Idioma",
    about: "Haqida|Ҳақида|О приложении|About|حول|Hakkında|Tentang|关于|के बारे में|Acerca de",
    about_text: "Asmo ul-Husna — Allohning 99 go'zal ismini o'rganish va his qilish uchun yaratilgan.|Асмо ул-Ҳусна — Аллоҳнинг 99 гўзал исмини ўрганиш ва ҳис қилиш учун яратилган.|Асмо уль-Хусна создан для изучения и осмысления 99 прекрасных имён Аллаха.|Asmo ul-Husna was created to learn and reflect on the 99 Beautiful Names of Allah.|تم إنشاء أسماء الله الحسنى لتعلم والتفكر في 99 اسماً من أسماء الله الحسنى.|Esma ül-Hüsna, Allah'ın 99 Güzel İsmini öğrenmek ve üzerinde düşünmek için oluşturuldu.|Asmaul Husna dibuat untuk mempelajari dan merenungkan 99 Nama Indah Allah.|真主的99个美名旨在帮助您学习并默思真主的99个美名。|असमाउल हुस्ना अल्लाह के 99 सुंदर नामों को सीखने और उन पर विचार करने के लिए बनाया गया है।|Asma ul-Husna fue creado para aprender y reflexionar sobre los 99 Hermosos Nombres de Alá.",
    open_bot: "Botni ochish|Ботни очиш|Открыть бота|Open bot|افتح البوت|Botu aç|Buka bot|打开机器人|बॉट खोलें|Abrir bot",
    open_channel: "Kanal|Канал|Канал|Channel|القناة|Kanal|Kanal|频道|चैनल|Canal",
    back: "Orqaga|Орқага|Назад|Back|رجوع|Geri|Kembali|返回|वापस|Atrás",
    reset: "Qayta boshlash|Қайта бошлаш|Сбросить|Reset|إعادة|Sıfırla|Atur ulang|重置|रीसेट|Reiniciar",
    th_light: "Kun|Кун|День|Day|نهار|Gün|Siang|日间|दिन|Día",
    th_dark: "Tun|Тун|Ночь|Night|ليل|Gece|Malam|夜间|रात|Noche",
    th_auto: "Avto|Авто|Авто|Auto|تلقائي|Oto|Oto|自动|ऑटो|Auto",
    meaning: "Ma'nosi|Маъноси|Значение|Meaning|المعنى|Anlamı|Makna|含义|अर्थ|Significado",
    names_for: "Ismlar|Исмлар|Имена|Names|الأسماء|İsimler|Nama|名字|नाम|Nombres"
  }
  var TCACHE = {}
  function tr(key) {
    if (!TCACHE[key]) TCACHE[key] = TXT[key].split("|")
    var i = LANGS.indexOf(S.lang)
    return TCACHE[key][i < 0 ? 3 : i] || TCACHE[key][3]
  }
  function pick(o) { return o[S.lang] || o.en }

  // ====================
  // STATE + STORAGE
  // ====================
  var KEY = "asmo_miniapp_v1"
  var S = { lang: "", theme: "auto", favs: {}, notes: {}, moodHist: {}, daily: null, savedAt: 0 }
  var memStore = null

  function load() {
    var raw = null
    try { raw = window.localStorage.getItem(KEY) } catch (e) { raw = memStore }
    if (raw) { try { var o = JSON.parse(raw); for (var k in o) S[k] = o[k] } catch (e2) {} }
  }
  var cloudTimer = null
  var cloudPrev = 0
  function cloudWrite() {
    var cs = tg && tg.CloudStorage
    if (!cs || !cs.setItem) return
    var raw = JSON.stringify(S), CH = 3800, parts = []
    for (var i = 0; i < raw.length; i += CH) parts[parts.length] = raw.slice(i, i + CH)
    if (parts.length > 100) return
    var items = {}
    items[KEY + "_n"] = String(parts.length)
    for (var j = 0; j < parts.length; j++) items[KEY + "_" + j] = parts[j]
    var keys = Object.keys(items)
    for (var k = 0; k < keys.length; k++) { try { cs.setItem(keys[k], items[keys[k]]) } catch (e) {} }
    if (cloudPrev > parts.length && cs.removeItems) {
      var extra = []
      for (var x = parts.length; x < cloudPrev; x++) extra[extra.length] = KEY + "_" + x
      try { cs.removeItems(extra) } catch (e2) {}
    }
    cloudPrev = parts.length
  }
  function save() {
    S.savedAt = Date.now()
    var raw = JSON.stringify(S)
    memStore = raw
    try { window.localStorage.setItem(KEY, raw) } catch (e) {}
    clearTimeout(cloudTimer)
    cloudTimer = setTimeout(cloudWrite, 800)
  }
  // Telegram bulutidan o'qish: boshqa qurilmadagi yangiroq ma'lumot bo'lsa, almashtiriladi
  function cloudRead() {
    var cs = tg && tg.CloudStorage
    if (!cs || !cs.getItem) return
    try {
      cs.getItem(KEY + "_n", function (err, val) {
        var n = parseInt(val, 10)
        if (err || !n) return
        var keys = []
        for (var i = 0; i < n; i++) keys[keys.length] = KEY + "_" + i
        cloudPrev = n
        cs.getItems(keys, function (err2, vals) {
          if (err2 || !vals) return
          var raw = ""
          for (var j = 0; j < n; j++) raw += vals[KEY + "_" + j] || ""
          try {
            var o = JSON.parse(raw)
            if (o && (o.savedAt || 0) > (S.savedAt || 0)) {
              for (var k in o) S[k] = o[k]
              TCACHE = {}
              applyTheme()
              if (wheels.lang) wheels.lang.set(Math.max(0, LANGS.indexOf(S.lang)), false)
              if (wheels.theme) wheels.theme.set(Math.max(0, THEMES.indexOf(S.theme)), false)
              try { window.localStorage.setItem(KEY, JSON.stringify(S)) } catch (e) {}
              render()
            }
          } catch (e3) {}
        })
      })
    } catch (e4) {}
  }

  function detectLang() {
    var c = (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code) || (navigator.language || "en")
    c = String(c).toLowerCase()
    if (c === "uz-cyrl") return "uz_kr"
    var short = c.slice(0, 2)
    if (short === "uz") return "uz"
    return LANGS.indexOf(short) >= 0 ? short : "en"
  }

  // ====================
  // HELPERS
  // ====================
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] }) }
  function pad3(n) { return ("00" + n).slice(-3) }
  function todayStr() {
    var d = new Date()
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)
  }
  function plain(s) { return s.normalize ? s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’ʿʾ]/g, "").toLowerCase() : s.toLowerCase() }
  function haptic(kind) { try { tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred(kind || "light") } catch (e) {} }
  var toastTimer = null
  function toast(msg) {
    var el = document.getElementById("toast")
    el.textContent = msg
    el.className = "toast show"
    clearTimeout(toastTimer)
    toastTimer = setTimeout(function () { el.className = "toast" }, 1600)
  }
  function openTg(url) {
    if (tg && tg.openTelegramLink) tg.openTelegramLink(url)
    else window.open(url, "_blank")
  }

  // ====================
  // UI STATE
  // ====================
  var U = { tab: "names", detail: 0, q: "", mode: "video", audioN: 1, moodPage: 1, moodPick: "", more: "menu", quoteIdx: -1 }
  var app = document.getElementById("app")
  var navEl = document.getElementById("nav")
  var NAVS = [
    ["names", "📖", "nav_names"],
    ["media", "🎞", "nav_media"],
    ["mood", "🫶", "nav_mood"],
    ["daily", "📿", "nav_daily"],
    ["more", "✨", "nav_more"]
  ]

  function renderNav() {
    var h = ""
    for (var i = 0; i < NAVS.length; i++) {
      h += '<button data-act="tab" data-v="' + NAVS[i][0] + '" class="' + (U.tab === NAVS[i][0] && !U.detail ? "on" : "") + '"><span class="ic">' + NAVS[i][1] + '</span>' + esc(tr(NAVS[i][2])) + "</button>"
    }
    navEl.innerHTML = h
    navEl.className = "nav" + (U.detail ? " hidden" : "")
  }

  // ====================
  // NAMES
  // ====================
  function nameCards(list) {
    if (!list.length) return '<p class="empty">' + esc(tr("no_result")) + "</p>"
    var h = '<div class="grid3">'
    for (var i = 0; i < list.length; i++) {
      var n = list[i]
      var d = D.names[n - 1]
      h += '<button class="name-card" data-act="open" data-v="' + n + '"><span class="num">' + n + "</span>" +
        (S.favs[n] ? '<span class="fav">❣️</span>' : "") +
        '<div class="ar">' + d.a + '</div><div class="tr">' + esc(d.t) + "</div></button>"
    }
    return h + "</div>"
  }
  function filterNames() {
    var q = plain(U.q.trim())
    var out = []
    for (var i = 1; i <= 99; i++) {
      if (!q || plain(D.names[i - 1].t).indexOf(q) >= 0 || D.names[i - 1].a.indexOf(U.q.trim()) >= 0 || String(i) === q) out[out.length] = i
    }
    return out
  }
  function viewNames() {
    return '<h1>📖 ' + esc(tr("nav_names")) + '</h1><p class="sub">Asmo ul-Husna · 99</p>' +
      '<input id="q" class="search" type="search" autocomplete="off" placeholder="' + esc(tr("search")) + '" value="' + esc(U.q) + '">' +
      '<div id="grid">' + nameCards(filterNames()) + "</div>"
  }

  // ====================
  // AUDIO / DETAIL
  // ====================
  function audioBlock(n) {
    return '<audio id="player" controls preload="none" src="' + esc(CFG.AUDIO_URL(n)) + '"></audio><p id="audioErr" class="notice" hidden>' + esc(tr("no_audio")) + "</p>"
  }
  // Ism ma'nosi (meanings.js dan): tanlangan til -> en -> uz -> ru -> birinchi bo'sh bo'lmagani
  function meaningOf(n) {
    var m = window.MEANINGS && window.MEANINGS[n - 1]
    if (!m) return ""
    if (typeof m === "string") return m
    var v = m[S.lang] || m.en || m.uz || m.ru || ""
    if (!v) for (var k in m) if (m[k]) { v = m[k]; break }
    return String(v).trim()
  }
  // Xavfsiz oddiy HTML: faqat ruxsat etilgan teglar, qolgani matn
  function rich(s) {
    var t = esc(s)
    t = t.replace(/&lt;(\/?)(b|strong|i|em|u|s|code|blockquote)&gt;/gi, "<$1$2>")
    t = t.replace(/&lt;tg-spoiler&gt;/gi, '<span class="sp" data-act="spoil">').replace(/&lt;\/tg-spoiler&gt;/gi, "</span>")
    return t.replace(/\r?\n/g, "<br>")
  }

  function viewDetail() {
    var n = U.detail, d = D.names[n - 1]
    var note = S.notes[n] || ""
    return '<button class="btn small back" data-act="closeDetail">‹ ' + esc(tr("back")) + "</button>" +
      '<div class="card hero"><div class="no">' + n + " / 99</div><div class=\"ar\">" + d.a + '</div><div class="tr">' + esc(d.t) + "</div>" + audioBlock(n) + "</div>" +
      '<div class="row" style="margin:12px 0"><button class="btn grow" data-act="open" data-v="' + (n === 1 ? 99 : n - 1) + '">⏮</button>' +
      '<button class="btn grow ' + (S.favs[n] ? "success" : "") + '" data-act="fav" data-v="' + n + '">' + (S.favs[n] ? "❣️" : "♡") + "</button>" +
      '<button class="btn grow" data-act="open" data-v="' + (n === 99 ? 1 : n + 1) + '">⏭</button></div>' +
      '<button class="btn block" style="margin-bottom:12px" data-act="shareName" data-v="' + n + '">📲 ' + esc(tr("share")) + "</button>" +
      (meaningOf(n) ? '<div class="card mean" style="margin-bottom:12px"><strong>📖 ' + esc(tr("meaning")) + '</strong><div class="mt">' + rich(meaningOf(n)) + "</div></div>" : "") +
      '<div class="card stack"><strong>📝 ' + esc(tr("note")) + '</strong><textarea id="noteText" placeholder="' + esc(tr("note_ph")) + '">' + esc(note) + "</textarea>" +
      '<button class="btn success block" data-act="saveNote" data-v="' + n + '">' + esc(tr("save")) + "</button></div>"
  }

  // ====================
  // MEDIA
  // ====================
  function pagerHtml(page, pages, act) {
    var prev = page === 1 ? pages : page - 1
    var next = page === pages ? 1 : page + 1
    return '<div class="pager"><button class="btn small" data-act="' + act + '" data-v="' + prev + '">《</button><span class="pg">' + page + "/" + pages + '</span><button class="btn small" data-act="' + act + '" data-v="' + next + '">》</button></div>'
  }
  function viewMedia() {
    var h = '<h1>🎞 ' + esc(tr("nav_media")) + '</h1><p class="sub">&nbsp;</p>' +
      '<div class="seg"><button class="btn ' + (U.mode === "video" ? "success" : "") + '" data-act="mode" data-v="video">🎬 ' + esc(tr("video")) + "</button>" +
      '<button class="btn ' + (U.mode === "audio" ? "success" : "") + '" data-act="mode" data-v="audio">🎧 ' + esc(tr("audio")) + "</button></div>"
    if (U.mode === "video") {
      var posts = CFG.VIDEO_POSTS || []
      if (!posts.length) return h + '<p class="empty">🎬 ' + esc(tr("no_video")) + "<br><small>config.js → VIDEO_POSTS</small></p>"
      h += '<div class="grid3">'
      for (var i = 0; i < posts.length; i++) {
        h += '<button class="btn" data-act="video" data-v="' + posts[i] + '">▶ ' + (i + 1) + "</button>"
      }
      return h + "</div>"
    }
    var n = U.audioN, d = D.names[n - 1]
    h += '<div class="card hero"><div class="no">' + n + " / 99</div><div class=\"ar\">" + d.a + '</div><div class="tr">' + esc(d.t) + "</div>" + audioBlock(n) + "</div>"
    var group = Math.ceil(n / 9), from = (group - 1) * 9 + 1, to = Math.min(from + 8, 99)
    h += '<p class="sub center" style="margin-top:14px">' + esc(tr("pick_num")) + '</p><div class="nums">'
    var row = '<div class="row5">'
    for (var j = from; j <= to; j++) {
      row += '<button class="num-btn ' + (j === n ? "on" : "") + '" data-act="aud" data-v="' + j + '">' + j + "</button>"
      if ((j - from) === 4 || j === to) { h += row + "</div>"; row = '<div class="row5">' }
    }
    h += "</div>" + pagerHtml(group, 11, "audGroup")
    return h
  }

  // ====================
  // MOOD
  // ====================
  function viewMood() {
    var MP = 9, pages = Math.ceil(D.moods.length / MP)
    if (U.moodPick) {
      var m = null
      for (var i = 0; i < D.moods.length; i++) if (D.moods[i].id === U.moodPick) m = D.moods[i]
      var h = '<div class="card center stack"><div class="bigemoji">' + m.e + "</div><h1>" + esc(pick(m.l)) + "</h1>" +
        '<div class="sub">' + esc(tr("mood_times")) + ": " + ((S.moodHist[m.id] || {}).count || 1) + "×</div></div>" +
        '<h1 style="margin-top:18px">✨ ' + esc(tr("mood_names")) + '</h1><div class="chips">'
      for (var j = 0; j < m.n.length; j++) {
        h += '<button class="chip" data-act="open" data-v="' + m.n[j] + '">' + D.names[m.n[j] - 1].a + " · " + esc(D.names[m.n[j] - 1].t) + "</button>"
      }
      return h + '</div><button class="btn block" style="margin-top:18px" data-act="moodAgain">🔄 ' + esc(tr("mood_again")) + "</button>"
    }
    var page = Math.min(Math.max(U.moodPage, 1), pages)
    var list = D.moods.slice((page - 1) * MP, page * MP)
    var g = '<h1>🫶 ' + esc(tr("nav_mood")) + '</h1><p class="sub">' + esc(tr("mood_title")) + '</p><div class="grid3">'
    for (var k = 0; k < list.length; k++) {
      var h2 = S.moodHist[list[k].id]
      g += '<button class="mood-card" data-act="mood" data-v="' + list[k].id + '"><span class="em">' + list[k].e + '</span><span class="lb">' + esc(pick(list[k].l)) + "</span></button>"
    }
    return g + "</div>" + pagerHtml(page, pages, "moodPage")
  }

  // ====================
  // DAILY
  // ====================
  function dailyTick() {
    var ds = S.daily
    if (!ds || !ds.target) return
    var today = todayStr()
    if (ds.lastCheckedDate !== today) {
      var gap = Math.round((new Date(today) - new Date(ds.lastCheckedDate || today)) / 86400000) - (ds.todayDone ? 1 : 0)
      if (gap > 0) ds.owedDays = (ds.owedDays || 0) + gap
      ds.lastCheckedDate = today
      ds.todayDone = false
      save()
    }
  }
  // ====================
  // QUMSOAT (SVG: naqshli ramka + shisha + 100 ta qum donasi, fizika)
  // ====================
  var SIM = null
  var hgShown = 0
  var hgFlip = false
  var R = 3.6                        // qum donasi radiusi
  var NECK = 6.8                     // bo'yincha yarim kengligi
  var HC = 100, HT = 54, HB = 246, HM = 150, HNS = 64
  var HDY = (HB - HT) / HNS
  var GATE_Y = 145                   // "eshik": har bosishda faqat kerakli miqdordagi dona o'tkaziladi
  var WL = [], WR = []

  // shisha profili: yuqori/pastki to'p + silliq bo'yincha
  function hwAt(y) {
    var d = Math.abs(y - HM)
    if (d > 96) d = 96
    if (d <= 50) { var u = d / 50; return NECK + (50 - NECK) * Math.pow(0.5 * (1 - Math.cos(Math.PI * u)), 1.15) }
    var v = (d - 50) / 46
    return 38 + 12 * Math.sqrt(Math.max(0, 1 - v * v))
  }
  for (var hk = 0; hk <= HNS; hk++) { var hy = HT + hk * HDY, hh = hwAt(hy); WL.push([HC - hh, hy]); WR.push([HC + hh, hy]) }

  function simStep(s) {
    var G = s.g, n = G.length, i, j, p, q, maxv = 0
    for (i = 0; i < n; i++) {
      p = G[i]
      var vx = (p.x - p.px) * 0.985, vy = (p.y - p.py) * 0.985
      var sp = vx * vx + vy * vy
      if (sp > 4.84) { var k = 2.2 / Math.sqrt(sp); vx *= k; vy *= k }
      p.px = p.x; p.py = p.y; p.t = false
      p.x += vx; p.y += vy + 0.05
      if (s.allow > 0 && !p.crossed && p.y > 108) {   // oqim: bo'yinchaga tomon tasodifiy tortilish
        p.y += 0.05
        p.x += (HC - p.x) * 0.006 + (Math.random() - 0.5) * 0.12
      }
    }
    var gateOpen = s.allow > 0
    if (gateOpen) {
      s.stall++
      if (s.stall > 45) {
        s.stall = 0
        for (i = 0; i < n; i++) { p = G[i]; if (!p.crossed && p.y > GATE_Y - 14) { p.x += (Math.random() - 0.5) * 1.6; p.y -= Math.random() * 0.8 } }
      }
    }
    var D2 = R * 2 * R * 2, DD = R * 2
    for (var it = 0; it < 3; it++) {
      for (i = 0; i < n; i++) {
        p = G[i]
        for (j = i + 1; j < n; j++) {
          q = G[j]
          var dx = q.x - p.x
          if (dx > DD || dx < -DD) continue
          var dy = q.y - p.y
          if (dy > DD || dy < -DD) continue
          var d2 = dx * dx + dy * dy
          if (d2 >= D2) continue
          var d = Math.sqrt(d2) || 0.0001
          var push = (DD - d) / 2, nx = dx / d, ny = dy / d
          p.x -= nx * push; p.y -= ny * push
          q.x += nx * push; q.y += ny * push
          p.t = true; q.t = true
          if (it === 0) {   // ishqalanish
            p.px += (p.x - p.px) * 0.08; p.py += (p.y - p.py) * 0.08
            q.px += (q.x - q.px) * 0.08; q.py += (q.y - q.py) * 0.08
          }
        }
      }
      for (i = 0; i < n; i++) {
        p = G[i]
        var k0 = Math.floor((p.y - HT) / HDY)
        for (var sd = 0; sd < 2; sd++) {
          var Wp = sd ? WR : WL
          for (var kk = k0 - 1; kk <= k0 + 1; kk++) {
            if (kk < 0 || kk >= HNS) continue
            var ax = Wp[kk][0], ay = Wp[kk][1], bx = Wp[kk + 1][0] - ax, by = Wp[kk + 1][1] - ay
            var t = ((p.x - ax) * bx + (p.y - ay) * by) / (bx * bx + by * by)
            t = t < 0 ? 0 : t > 1 ? 1 : t
            var cx = ax + bx * t, cy = ay + by * t
            var ex = p.x - cx, ey = p.y - cy, ed = Math.sqrt(ex * ex + ey * ey)
            if (ed < R) {
              if (ed < 0.0001) { ex = sd ? -1 : 1; ey = 0; ed = 1 }
              var wn = (R - ed) / ed
              p.x += ex * wn; p.y += ey * wn
              p.t = true
              if (it === 2) { p.px += (p.x - p.px) * 0.15; p.py += (p.y - p.py) * 0.15 }
            }
          }
        }
        if (p.y < HT + R) p.y = HT + R
        if (p.y > HB - R) { p.y = HB - R; p.t = true }
        if (!gateOpen && !p.crossed && p.y > GATE_Y - R && p.y < GATE_Y + 4) { p.y = GATE_Y - R; p.py = p.y; p.t = true }
      }
    }
    for (i = 0; i < n; i++) {
      p = G[i]
      if (!p.crossed && p.y > GATE_Y + 3) {
        if (s.allow <= 0) {
          p.y = GATE_Y + 2.9; p.py = p.y
        } else {
          p.crossed = true
          s.crossed++
          s.stall = 0
          s.allow--
          p.x += (Math.random() - 0.5) * 0.6
          p.px = p.x - (Math.random() - 0.5) * 0.5
        }
      }
      var mv = Math.abs(p.x - p.px) + Math.abs(p.y - p.py)
      if (p.t && mv < 0.11 && (s.allow <= 0 || p.crossed)) { p.px = p.x; p.py = p.y; mv = 0 }
      if (mv > maxv) maxv = mv
    }
    s.maxv = maxv
  }

  function simBuild(fallen) {
    var s = { g: [], allow: 0, crossed: 0, stall: 0, maxv: 1, rest: 0, raf: 0, els: null, sps: null, spi: [], onIdle: null }
    var cand = [], sp = 7.7, rowH = sp * 0.866
    for (var y = HT + R + 2; y <= GATE_Y - R - 1; y += rowH) {
      var hw = hwAt(y) - R - 0.3
      if (hw < 0) continue
      var n = Math.floor(2 * hw / sp) + 1
      var x0 = HC - (n - 1) * sp / 2
      for (var k = 0; k < n; k++) cand.push({ x: x0 + k * sp, y: y })
    }
    cand.sort(function (p, q) { return q.y - p.y || Math.abs(p.x - HC) - Math.abs(q.x - HC) })
    var i
    for (i = 0; i < 100; i++) {
      var x = cand[i].x + (Math.random() - 0.5) * 0.5, yy = cand[i].y + (Math.random() - 0.5) * 0.5
      s.g.push({ x: x, y: yy, px: x, py: yy, crossed: false })
    }
    var idx = []
    for (i = 0; i < 100; i++) idx.push(i)
    for (i = 99; i > 0; i--) { var r = Math.floor(Math.random() * (i + 1)), tmp = idx[i]; idx[i] = idx[r]; idx[r] = tmp }
    s.spi = idx.slice(0, 16)
    var steps = 0, calm = 0
    while (steps < 700 && calm < 12) { simStep(s); steps++; calm = s.maxv < 0.012 ? calm + 1 : 0 }
    if (fallen > 0) {
      s.allow = fallen; steps = 0; calm = 0
      while (steps < 6000 && !(s.allow <= 0 && calm >= 12)) { simStep(s); steps++; calm = (s.allow <= 0 && s.maxv < 0.012) ? calm + 1 : 0 }
      s.allow = 0
    }
    for (i = 0; i < 100; i++) { s.g[i].px = s.g[i].x; s.g[i].py = s.g[i].y }
    s.maxv = 0
    SIM = s
    return s
  }

  // qumsoatni aylantirish: hamma narsa 180° buriladi, qum yana tepada, haqiqiy fizika bilan qayta tushadi
  function hgMirror(s, fallen) {
    for (var i = 0; i < s.g.length; i++) {
      var p = s.g[i]
      p.x = 2 * HC - p.x; p.y = HT + HB - p.y
      p.px = p.x; p.py = p.y; p.crossed = false; p.t = false
    }
    s.crossed = 0; s.allow = fallen; s.stall = 0; s.maxv = 1; s.rest = 0
  }

  function hgFallen(ds) {
    if (ds.todayDone) return 100
    return Math.max(0, Math.min(100, Math.floor((ds.draft || 0) * 100 / ds.target)))
  }

  // ---- SVG tuzilma yordamchilari ----
  function f2(n) { return n.toFixed(2) }
  function glassPath(inset) {
    var a = [], b = [], N = 96, i, y, h
    for (i = 0; i <= N; i++) { y = HT + i * (HB - HT) / N; h = hwAt(y) - inset; a.push(f2(HC - h) + " " + f2(y)); b.push(f2(HC + h) + " " + f2(y)) }
    return "M" + a.join("L") + "L" + b.reverse().join("L") + "Z"
  }
  function edgePath(side, y0, y1, inset) {
    var pts = []
    for (var y = y0; y <= y1; y += 3) pts.push(f2(HC + side * (hwAt(y) - inset)) + " " + f2(y))
    return "M" + pts.join("L")
  }
  function gemSvg(cx, cy, r, delay) {
    return '<g class="gm"><circle class="halo" style="animation-delay:' + delay + 's" cx="' + cx + '" cy="' + cy + '" r="' + f2(r * 2.3) + '" fill="url(#hgHalo)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + f2(r + 1.8) + '" fill="url(#hgGoldV)" stroke="#6b4210" stroke-width=".5"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#hgGem)"/>' +
      '<ellipse cx="' + f2(cx - r * 0.32) + '" cy="' + f2(cy - r * 0.4) + '" rx="' + f2(r * 0.4) + '" ry="' + f2(r * 0.23) + '" fill="#fff" opacity=".85" transform="rotate(-28 ' + f2(cx - r * 0.32) + " " + f2(cy - r * 0.4) + ')"/></g>'
  }
  function plateSvg() {
    return '<rect x="18" y="22" width="164" height="26" rx="11" fill="url(#hgBlue)" stroke="url(#hgGoldV)" stroke-width="1.8"/>' +
      '<rect x="31" y="46" width="138" height="13" rx="6" fill="url(#hgBlueD)" stroke="url(#hgGoldV)" stroke-width="1.3"/>' +
      '<path d="M27 26.5 H173" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M24 37 H176" stroke="url(#hgGoldH)" stroke-width="1.6"/>' +
      '<path d="M80 37 C72 27 62 28 58 34 C55 39 60 44 64 41" fill="none" stroke="url(#hgGoldH)" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M120 37 C128 27 138 28 142 34 C145 39 140 44 136 41" fill="none" stroke="url(#hgGoldH)" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M100 19 L119 38 L100 61 L81 38Z" fill="url(#hgGoldV)" stroke="#6b4210" stroke-width=".7" stroke-linejoin="round"/>' +
      '<path d="M100 24 L113 38 L100 55 L87 38Z" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".6"/>' +
      gemSvg(100, 38, 6.2, -0.4) + gemSvg(44, 37, 2.6, -1.1) + gemSvg(156, 37, 2.6, -2)
  }
  function pillarSvg(cx) {
    var P = [[0, 6.4], [6, 6], [11, 3.6], [20, 3], [32, 4.1], [38, 3.1], [52, 2.9], [66, 3.9], [72, 3.1], [84, 2.9], [90, 3.9], [94, 4.4], [97, 3.8]]
    function hwP(d) {
      for (var i = 0; i < P.length - 1; i++) {
        if (d >= P[i][0] && d <= P[i + 1][0]) {
          var t = (d - P[i][0]) / (P[i + 1][0] - P[i][0])
          t = (1 - Math.cos(Math.PI * t)) / 2
          return P[i][1] + (P[i + 1][1] - P[i][1]) * t
        }
      }
      return P[P.length - 1][1]
    }
    var a = [], b = [], c = [], e = [], y, d
    for (y = HM - 97; y <= HM + 97.01; y += 3) {
      d = Math.abs(y - HM)
      a.push(f2(cx - hwP(d)) + " " + f2(y)); b.push(f2(cx + hwP(d)) + " " + f2(y))
      if (d >= 14 && d <= 84) { c.push(f2(cx - hwP(d) * 0.34) + " " + f2(y)); e.push(f2(cx + hwP(d) * 0.34) + " " + f2(y)) }
    }
    return '<path d="M' + a.join("L") + "L" + b.reverse().join("L") + 'Z" fill="url(#hgGoldH)" stroke="#6b4210" stroke-width=".5"/>' +
      '<path d="M' + c.slice(0, c.length >> 1).join("L") + "L" + e.slice(0, e.length >> 1).reverse().join("L") + 'Z" fill="url(#hgGem)" opacity=".75"/>' +
      '<path d="M' + c.slice(c.length >> 1).join("L") + "L" + e.slice(c.length >> 1).reverse().join("L") + 'Z" fill="url(#hgGem)" opacity=".75"/>' +
      gemSvg(cx, HM, 6.2, cx < HC ? -0.7 : -1.8)
  }
  var HG_BACK = "", HG_FRONT = ""
  function hgStatic() {
    if (HG_BACK) return
    var defs = '<defs>' +
      '<linearGradient id="hgGoldH" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#7a4c10"/><stop offset=".3" stop-color="#e6bd5c"/><stop offset=".5" stop-color="#fff3c4"/><stop offset=".72" stop-color="#d4a03c"/><stop offset="1" stop-color="#6e450e"/></linearGradient>' +
      '<linearGradient id="hgGoldV" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".4" stop-color="#e8b84a"/><stop offset=".75" stop-color="#b57a1f"/><stop offset="1" stop-color="#7a4c10"/></linearGradient>' +
      '<linearGradient id="hgBlue" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#b3d2ff"/><stop offset=".3" stop-color="#5a86ea"/><stop offset=".7" stop-color="#2f4bb0"/><stop offset="1" stop-color="#1c2a74"/></linearGradient>' +
      '<linearGradient id="hgBlueD" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4466d6"/><stop offset=".6" stop-color="#1b2a78"/><stop offset="1" stop-color="#121b55"/></linearGradient>' +
      '<radialGradient id="hgGem" cx=".38" cy=".34" r=".75"><stop offset="0" stop-color="#e9f8ff"/><stop offset=".35" stop-color="#58aaff"/><stop offset=".78" stop-color="#1b3fd0"/><stop offset="1" stop-color="#0e1f7a"/></radialGradient>' +
      '<radialGradient id="hgHalo"><stop offset="0" stop-color="#8fd6ff" stop-opacity=".85"/><stop offset=".5" stop-color="#5a9bff" stop-opacity=".28"/><stop offset="1" stop-color="#5a9bff" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="hgGlass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#cfe2ff" stop-opacity=".22"/><stop offset=".5" stop-color="#8fa8ff" stop-opacity=".10"/><stop offset="1" stop-color="#b9a4ff" stop-opacity=".20"/></linearGradient>' +
      '<linearGradient id="hgSand" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="' + HT + '" y2="' + HB + '"><stop offset="0" stop-color="#fff2b0"/><stop offset=".42" stop-color="#f7bd3c"/><stop offset=".5" stop-color="#ffd878"/><stop offset="1" stop-color="#d98a1e"/></linearGradient>' +
      '<clipPath id="hgClip"><path d="' + glassPath(0.6) + '"/></clipPath>' +
      '<filter id="hgGoo" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="300" color-interpolation-filters="sRGB">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b"/>' +
      '<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="g"/>' +
      '<feGaussianBlur in="g" stdDeviation="3.6" result="gl"/>' +
      '<feColorMatrix in="gl" mode="matrix" values="1 0 0 0 .08  0 1 0 0 .04  0 0 1 0 0  0 0 0 .6 0" result="gl2"/>' +
      '<feMerge><feMergeNode in="gl2"/><feMergeNode in="g"/></feMerge></filter></defs>'
    HG_BACK = defs + pillarSvg(33) + pillarSvg(167) +
      '<rect x="87" y="146.5" width="26" height="7" rx="3.5" fill="url(#hgGoldH)" stroke="#6b4210" stroke-width=".5"/>' +
      '<path d="' + glassPath(0) + '" fill="url(#hgGlass)"/>'
    HG_FRONT = '<path d="' + glassPath(0) + '" fill="none" stroke="#cfe0ff" stroke-opacity=".6" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="' + edgePath(-1, 70, 114, 9) + '" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 186, 230, 9) + '" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 64, 118, 5.5) + '" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 182, 236, 5.5) + '" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 124, 138, 5) + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 162, 176, 5) + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 70, 100, 4.5) + '" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 200, 230, 4.5) + '" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.6" stroke-linecap="round"/>' +
      '<circle cx="64" cy="71" r="1.7" fill="#fff" opacity=".9"/><circle cx="136" cy="229" r="1.7" fill="#fff" opacity=".9"/>' +
      '<g>' + plateSvg() + '</g><g transform="translate(0 ' + (HT + HB) + ') scale(1 -1)">' + plateSvg() + '</g>'
  }
  function hgSvg(fallen) {
    if (hgFlip && SIM) hgMirror(SIM, fallen)
    else if (!SIM || SIM.crossed + SIM.allow !== fallen) simBuild(fallen)
    hgFlip = false
    hgStatic()
    var h = '<svg id="hgsvg" class="hg" viewBox="0 0 200 300" aria-hidden="true">' + HG_BACK +
      '<g clip-path="url(#hgClip)"><g filter="url(#hgGoo)">', i, p
    for (i = 0; i < 100; i++) {
      p = SIM.g[i]
      h += '<circle class="sg" cx="' + f2(p.x) + '" cy="' + f2(p.y) + '" r="' + f2(R * 1.15) + '" fill="url(#hgSand)"/>'
    }
    h += '</g><g>'
    for (i = 0; i < SIM.spi.length; i++) {
      p = SIM.g[SIM.spi[i]]
      h += '<g class="spg" transform="translate(' + f2(p.x) + " " + f2(p.y) + ')"><path class="spk" style="--t:' + (1.6 + Math.random() * 1.8).toFixed(2) + "s;--dl:-" + (Math.random() * 3).toFixed(2) + "s;--sc:" + (0.7 + Math.random() * 0.7).toFixed(2) + '" d="M0 -5 L1.3 -1.3 L5 0 L1.3 1.3 L0 5 L-1.3 1.3 L-5 0 L-1.3 -1.3Z" fill="#fffbe6"/></g>'
    }
    for (i = 0; i < 10; i++) {   // shisha ichidagi mayda chang zarralari
      var top = i < 5, my = top ? 62 + Math.random() * 34 : 206 + Math.random() * 30
      var mx = HC + (Math.random() - 0.5) * 2 * (hwAt(my) - 8)
      h += '<circle class="mote" style="animation-delay:-' + (Math.random() * 6).toFixed(1) + 's" cx="' + f2(mx) + '" cy="' + f2(my) + '" r="' + (0.7 + Math.random() * 0.8).toFixed(2) + '" fill="#fff6c8"/>'
    }
    return h + '</g></g>' + HG_FRONT + "</svg>"
  }
  // markaziy fon: minimal naqsh, nur, suzuvchi zarralar
  function hgBg() {
    var h = '<svg class="hgpat" viewBox="0 0 320 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<pattern id="hgPt" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 4 L44 24 L24 44 L4 24Z" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="1"/><circle cx="24" cy="24" r="1.3" fill="#fff" fill-opacity=".10"/></pattern>' +
      '<linearGradient id="hgBig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a4ff" stop-opacity=".16"/><stop offset="1" stop-color="#6c8dff" stop-opacity=".02"/></linearGradient></defs>' +
      '<rect width="320" height="420" fill="url(#hgPt)"/>'
    var big = [[262, 118, 92], [52, 318, 84], [280, 330, 70], [34, 96, 58]]
    for (var i = 0; i < big.length; i++) {
      h += '<rect x="' + (-big[i][2] / 2) + '" y="' + (-big[i][2] / 2) + '" width="' + big[i][2] + '" height="' + big[i][2] + '" rx="' + Math.round(big[i][2] / 5) + '" transform="translate(' + big[i][0] + " " + big[i][1] + ') rotate(45)" fill="url(#hgBig)" stroke="#fff" stroke-opacity=".08"/>'
    }
    h += '</svg><div class="hgaura"></div>'
    var cols = ["#ffd978", "#8fd0ff", "#c9a8ff", "#ffb3d9", "#ffe9a8"]
    for (var k = 0; k < 16; k++) {
      var sz = 2 + Math.random() * 4
      h += '<i class="pt' + (Math.random() < 0.22 ? " ring" : "") + '" style="left:' + (4 + Math.random() * 92).toFixed(1) + "%;top:" + (4 + Math.random() * 78).toFixed(1) + "%;--s:" + sz.toFixed(1) + "px;--c:" + cols[k % cols.length] + ";--d:" + (4 + Math.random() * 5).toFixed(1) + "s;--dl:-" + (Math.random() * 8).toFixed(1) + "s;--dx:" + ((Math.random() - 0.5) * 16).toFixed(0) + 'px"></i>'
    }
    return h
  }
  function simLoop() {
    var s = SIM
    if (!s || !s.els) return
    s.raf = 0
    if (!document.body.contains(s.els[0])) { s.els = null; return }
    for (var k = 0; k < 3; k++) simStep(s)
    var i
    for (i = 0; i < 100; i++) {
      s.els[i].setAttribute("cx", s.g[i].x.toFixed(2))
      s.els[i].setAttribute("cy", s.g[i].y.toFixed(2))
    }
    if (s.sps) for (i = 0; i < s.sps.length; i++) { var g = s.g[s.spi[i]]; s.sps[i].setAttribute("transform", "translate(" + g.x.toFixed(2) + " " + g.y.toFixed(2) + ")") }
    if (s.allow > 0 || s.maxv > 0.02) { s.rest = 0 } else { s.rest++ }
    if (s.rest < 18) { s.raf = requestAnimationFrame(simLoop); return }
    for (i = 0; i < 100; i++) { s.g[i].px = s.g[i].x; s.g[i].py = s.g[i].y }
    if (s.onIdle) { var f = s.onIdle; s.onIdle = null; f() }
  }
  function simWake() {
    if (SIM && SIM.els && !SIM.raf) { SIM.rest = 0; SIM.raf = requestAnimationFrame(simLoop) }
  }
  function hgAttach() {
    var svg = document.getElementById("hgsvg")
    if (!svg || !SIM) return
    SIM.els = svg.querySelectorAll("circle.sg")
    SIM.sps = svg.querySelectorAll(".spg")
    if (SIM.raf) { cancelAnimationFrame(SIM.raf); SIM.raf = 0 }
    simWake()
  }
  function hgDrop(from, to) {
    if (!SIM) return
    SIM.allow += Math.max(0, to - from)
    simWake()
  }
  function hgWhenIdle(cb) {
    if (!SIM || !SIM.els || !SIM.raf) { setTimeout(cb, SIM && SIM.allow > 0 ? 400 : 250); return }
    SIM.onIdle = cb
  }
  function hgStats() {
    var ds = S.daily
    var d = document.getElementById("dDone"), l = document.getElementById("dLeft")
    if (d) d.textContent = ds.draft || 0
    if (l) l.textContent = Math.max(0, ds.target - (ds.draft || 0))
  }

  function viewDaily() {
    var ds = S.daily
    var formHtml = function () {
      return '<div class="card stack"><label>' + esc(tr("target_lbl")) + '<input id="dTarget" class="field" type="number" inputmode="numeric" min="1" max="1000000" value="' + (ds && ds.target ? ds.target : "") + '"></label>' +
        '<div class="chips">' + [33, 100, 300, 1000].map(function (x) { return '<button class="chip" data-act="preset" data-v="' + x + '">' + x + "</button>" }).join("") + "</div>" +
        '<label>' + esc(tr("step_lbl")) + '<input id="dStep" class="field" type="number" inputmode="numeric" min="1" max="100000" value="' + ((ds && ds.step) || 1) + '"></label>' +
        '<button class="btn success block" data-act="saveDaily">' + esc(tr("save")) + "</button></div>"
    }
    if (!ds || !ds.target) {
      return '<h1>📿 ' + esc(tr("daily")) + '</h1><p class="sub">' + esc(tr("daily_ask")) + "</p>" + formHtml()
    }
    dailyTick()
    var target = ds.target, step = ds.step || 1, draft = ds.draft || 0, owed = ds.owedDays || 0
    hgShown = hgFallen(ds)
    var h = '<div class="daily"><div class="dhead"><h1>📿 ' + esc(tr("daily")) + '</h1><button class="gear' + (U.dailyMenu ? " on" : "") + '" data-act="dailyMenu" aria-label="Settings">⚙️</button></div>'
    if (U.dailyMenu) h += '<div style="margin-bottom:10px">' + formHtml() + "</div>"
    if (owed > 0) h += '<p class="owed center">⊘ ' + esc(tr("owed").replace("{n}", owed)) + "</p>"
    h += '<div id="hgwrap" class="hgwrap"><div id="hgstage" class="hgstage">' + hgBg() + '<div id="hgbox" class="hgbox">' + hgSvg(hgShown) + "</div>"
    if (ds.todayDone) h += '<div class="done center">✦ ' + esc(tr("cong")) + "</div>"
    else h += '<div class="stats mini"><div><b>' + target + "</b><span>" + esc(tr("needed")) + '</span></div><div><b id="dDone">' + draft + "</b><span>" + esc(tr("done_n")) + '</span></div><div><b id="dLeft">' + Math.max(0, target - draft) + "</b><span>" + esc(tr("left_n")) + "</span></div></div>"
    h += "</div></div>"
    h += ds.todayDone ? '<button class="tap-round off" disabled>✓</button>' : '<button class="tap-round" data-act="tap" aria-label="+">' + (step > 1 ? "＋" + step : "＋") + "</button>"
    return h + "</div>"
  }

  // ====================
  // MORE: quote / favs / lang / about
  // ====================
  function quoteData(i) {
    var q = D.quotes[i]
    var title = pick(q.h), body = pick(q.q), src = pick(D.quran) + " " + q.ref
    return { q: q, title: title, body: body, src: src, share: q.e + " " + title + "\n\n" + body + "\n\n📖 " + src }
  }
  function viewMore() {
    if (U.more === "quote") {
      if (U.quoteIdx < 0) U.quoteIdx = Math.floor(Math.random() * D.quotes.length)
      var d = quoteData(U.quoteIdx)
      return '<button class="btn small back" data-act="moreBack">‹ ' + esc(tr("back")) + "</button>" +
        '<div class="card quote"><div class="em">' + d.q.e + "</div><strong>" + esc(d.title) + '</strong><div class="qt">' + esc(d.body) + '</div><div class="ref">📖 ' + esc(d.src) + '</div><div class="ref">🤖 @' + CFG.BOT + "</div></div>" +
        '<div class="row wrap" style="margin-top:12px"><button class="btn success grow" data-act="share">📲 ' + esc(tr("share")) + '</button><button class="btn grow" data-act="open" data-v="' + d.q.n + '">✨ ' + esc(D.names[d.q.n - 1].t) + '</button><button class="btn grow" data-act="quoteNext">🔄</button></div>'
    }
    if (U.more === "favs") {
      var ids = []
      for (var k in S.favs) if (S.favs[k]) ids[ids.length] = parseInt(k, 10)
      ids.sort(function (a, b) { return a - b })
      var h = '<button class="btn small back" data-act="moreBack">‹ ' + esc(tr("back")) + "</button><h1>❣️ " + esc(tr("favs")) + "</h1>"
      if (!ids.length) return h + '<p class="empty">' + esc(tr("favs_empty")) + "</p>"
      h += nameCards(ids)
      for (var i = 0; i < ids.length; i++) {
        if (S.notes[ids[i]]) h += '<div class="card" style="margin-top:10px"><strong>' + D.names[ids[i] - 1].a + " · " + esc(D.names[ids[i] - 1].t) + "</strong><div>" + esc(S.notes[ids[i]]) + "</div></div>"
      }
      return h
    }
    if (U.more === "lang") {
      var l = '<button class="btn small back" data-act="moreBack">‹ ' + esc(tr("back")) + "</button><h1>🌐 " + esc(tr("lang")) + '</h1><div class="grid3" style="grid-template-columns:1fr 1fr">'
      for (var j = 0; j < LANGS.length; j++) l += '<button class="btn ' + (S.lang === LANGS[j] ? "success" : "") + '" data-act="setLang" data-v="' + LANGS[j] + '">' + LANG_NAMES[LANGS[j]] + "</button>"
      return l + "</div>"
    }
    if (U.more === "about") {
      return '<button class="btn small back" data-act="moreBack">‹ ' + esc(tr("back")) + "</button><h1>ℹ️ " + esc(tr("about")) + '</h1><div class="card stack"><p>✨ ' + esc(tr("about_text")) + '</p><p class="sub">🔖 Mini App ' + CFG.VERSION + "</p>" +
        '<button class="btn primary block" data-act="openBot">🤖 ' + esc(tr("open_bot")) + '</button><button class="btn block" data-act="openChannel">📢 ' + esc(tr("open_channel")) + "</button></div>"
    }
    return '<h1>✨ ' + esc(tr("nav_more")) + '</h1><p class="sub">&nbsp;</p><div class="list">' +
      '<button data-act="more" data-v="quote"><span class="ic">💬</span>' + esc(tr("quote")) + "</button>" +
      '<button data-act="more" data-v="favs"><span class="ic">❣️</span>' + esc(tr("favs")) + "</button>" +
      '<button data-act="more" data-v="lang"><span class="ic">🌐</span>' + esc(tr("lang")) + " · " + LANG_NAMES[S.lang] + "</button>" +
      '<button data-act="more" data-v="about"><span class="ic">ℹ️</span>' + esc(tr("about")) + "</button></div>"
  }

  // ====================
  // RENDER
  // ====================
  function render() {
    document.documentElement.lang = S.lang.slice(0, 2)
    document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr"
    var h
    if (U.detail) h = viewDetail()
    else if (U.tab === "names") h = viewNames()
    else if (U.tab === "media") h = viewMedia()
    else if (U.tab === "mood") h = viewMood()
    else if (U.tab === "daily") h = viewDaily()
    else h = viewMore()
    app.innerHTML = h
    hgAttach()
    renderNav()
    if (wheels.theme) updateThemeLabels()
    if (tg && tg.BackButton) {
      if (U.detail || (U.tab === "more" && U.more !== "menu") || (U.tab === "mood" && U.moodPick)) tg.BackButton.show()
      else tg.BackButton.hide()
    }
    window.scrollTo(0, 0)
  }
  function goBack() {
    if (U.detail) { U.detail = 0; render(); return }
    if (U.tab === "more" && U.more !== "menu") { U.more = "menu"; render(); return }
    if (U.tab === "mood" && U.moodPick) { U.moodPick = ""; render() }
  }


  // ====================
  // HEADER: silindr (wheel) tanlagichlar
  // ====================
  var THEMES = ["light", "dark", "auto"]
  var THEME_ICONS = { light: "☀️", dark: "🌙", auto: "🌓" }
  var wheels = {}

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", S.theme)
    if (tg && tg.setHeaderColor) {
      try {
        if (S.theme === "light") { tg.setHeaderColor("#f6f7f4"); tg.setBackgroundColor && tg.setBackgroundColor("#f6f7f4") }
        else if (S.theme === "dark") { tg.setHeaderColor("#131816"); tg.setBackgroundColor && tg.setBackgroundColor("#131816") }
        else tg.setHeaderColor("bg_color")
      } catch (e) {}
    }
  }

  // Cheksiz (aylanma) silindr: elementlar bir necha nusxada joylanadi, markaz doim o'rta nusxaga qaytariladi
  function makeWheel(id, labels, startIdx, onPick) {
    var N = labels.length
    var COPIES = N < 6 ? 9 : 5
    var MID = Math.floor(COPIES / 2)
    var host = document.getElementById(id)
    var track = document.createElement("div")
    track.className = "w-track"
    var h = '<span class="w-pad"></span>'
    for (var c = 0; c < COPIES; c++) {
      for (var i = 0; i < N; i++) h += '<div class="w-item" data-i="' + i + '" data-p="' + (c * N + i) + '" role="option">' + labels[i] + "</div>"
    }
    h += '<span class="w-pad"></span>'
    track.innerHTML = h
    host.appendChild(track)

    var items = track.querySelectorAll(".w-item")
    var cur = startIdx, quiet = true, timer = null, raf = 0, lastC = -1, busy = false

    function iw() { return items[0].offsetWidth }
    function absPos() { return Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / iw()))) }
    function idxOf(p) { return ((p % N) + N) % N }
    function paint() {
      raf = 0
      var w = iw(), mid = track.scrollLeft + track.clientWidth / 2
      var center = Math.round((mid - items[0].offsetLeft - w / 2) / w)
      var from = Math.max(0, center - 3), to = Math.min(items.length - 1, center + 3)
      for (var i = from; i <= to; i++) {
        var d = (items[i].offsetLeft + w / 2 - mid) / w
        var ad = Math.min(Math.abs(d), 2)
        var ang = Math.max(-2, Math.min(2, d)) * -34
        items[i].style.transform = "rotateY(" + ang + "deg) scale(" + (1 - 0.1 * ad) + ")"
        items[i].style.opacity = String(Math.max(0.25, 1 - 0.42 * ad))
        items[i].setAttribute("aria-selected", ad < 0.5 ? "true" : "false")
      }
      var cc = absPos()
      if (cc !== lastC) { if (lastC !== -1 && !quiet) haptic("light"); lastC = cc }
    }
    // ko'rinishi bir xil bo'lgan o'rta nusxaga ko'chirish (sakrash sezilmaydi)
    function recenter() {
      var w = iw(), p = absPos()
      var target = (MID * N + idxOf(p)) * w
      if (Math.abs(target - track.scrollLeft) > 1) {
        track.classList.add("jump")
        track.scrollLeft = target
        void track.offsetWidth
        track.classList.remove("jump")
      }
    }
    // eng qisqa yo'l bilan i-indeksga o'tish
    function set(i, smooth) {
      cur = i
      quiet = true
      var p = absPos(), delta = idxOf(i) - idxOf(p)
      if (delta > N / 2) delta -= N
      if (delta < -N / 2) delta += N
      if (!smooth) {
        track.scrollLeft = (MID * N + i) * iw()
      } else {
        track.scrollTo({ left: (p + delta) * iw(), behavior: "smooth" })
      }
      paint()
      setTimeout(function () { quiet = false }, smooth ? 420 : 60)
    }
    track.addEventListener("scroll", function () {
      if (!raf) raf = requestAnimationFrame(paint)
      // chekkaga yaqinlashganda darrov o'rtaga qaytarish
      var p = track.scrollLeft / iw()
      if (!busy && (p < N || p > N * (COPIES - 1) - 1)) { busy = true; recenter(); busy = false }
      clearTimeout(timer)
      timer = setTimeout(function () {
        if (track.classList.contains("drag")) return
        var n = idxOf(absPos())
        recenter()
        if (!quiet && n !== cur) { cur = n; onPick(n) }
      }, 130)
    })
    // sichqoncha bilan sudrash (kompyuter)
    var down = false, sx = 0, sl = 0
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return
      down = true; sx = e.clientX; sl = track.scrollLeft
      track.classList.add("drag")
      try { track.setPointerCapture(e.pointerId) } catch (x) {}
    })
    track.addEventListener("pointermove", function (e) { if (down) track.scrollLeft = sl - (e.clientX - sx) })
    function up() {
      if (!down) return
      down = false
      track.classList.remove("drag")
      track.scrollTo({ left: absPos() * iw(), behavior: "smooth" })
    }
    track.addEventListener("pointerup", up)
    track.addEventListener("pointercancel", up)
    track.addEventListener("click", function (e) {
      var it = e.target.closest ? e.target.closest(".w-item") : null
      if (it && !track.classList.contains("drag")) {
        var p = parseInt(it.getAttribute("data-p"), 10)
        if (idxOf(p) !== cur) { quiet = false; track.scrollTo({ left: p * iw(), behavior: "smooth" }) }
      }
    })
    window.addEventListener("resize", function () { set(cur, false) })
    set(startIdx, false)
    setTimeout(function () { set(cur, false) }, 250)
    return { set: set }
  }

  function updateThemeLabels() {
    var els = document.querySelectorAll("#wTheme .w-item")
    for (var i = 0; i < els.length; i++) {
      var lb = els[i].querySelector(".lb")
      if (lb) lb.textContent = tr("th_" + THEMES[parseInt(els[i].getAttribute("data-i"), 10)])
    }
  }

  function initHeader() {
    var langLabels = []
    var SHORT = { uz: "O'zbek", uz_kr: "Ўзбек", ru: "Русский", en: "English", ar: "العربية", tr: "Türkçe", id: "Indonesia", zh: "中文", hi: "हिन्दी", es: "Español" }
    for (var i = 0; i < LANGS.length; i++) langLabels[i] = SHORT[LANGS[i]]
    wheels.lang = makeWheel("wLang", langLabels, Math.max(0, LANGS.indexOf(S.lang)), function (i) {
      S.lang = LANGS[i]; TCACHE = {}; save(); render()
    })
    var themeLabels = []
    for (var j = 0; j < THEMES.length; j++) themeLabels[j] = '<span class="ic">' + THEME_ICONS[THEMES[j]] + '</span><span class="lb">' + esc(tr("th_" + THEMES[j])) + "</span>"
    wheels.theme = makeWheel("wTheme", themeLabels, Math.max(0, THEMES.indexOf(S.theme)), function (i) {
      S.theme = THEMES[i]; save(); applyTheme()
    })
  }

  // ====================
  // EVENTS
  // ====================
  document.addEventListener("click", function (ev) {
    var el = ev.target
    while (el && el !== document && !(el.getAttribute && el.getAttribute("data-act"))) el = el.parentNode
    if (!el || el === document) return
    var act = el.getAttribute("data-act"), v = el.getAttribute("data-v")
    haptic("light")

    if (act === "tab") { U.tab = v; U.detail = 0; U.more = "menu"; U.moodPick = ""; render() }
    else if (act === "open") { U.detail = parseInt(v, 10); render() }
    else if (act === "closeDetail" || act === "moreBack") goBack()
    else if (act === "fav") {
      var n = parseInt(v, 10)
      if (S.favs[n]) delete S.favs[n]; else S.favs[n] = 1
      save(); render()
    }
    else if (act === "saveNote") {
      var n2 = parseInt(v, 10), val = document.getElementById("noteText").value.trim()
      if (val) S.notes[n2] = val.slice(0, 1000); else delete S.notes[n2]
      save(); toast("✓ " + tr("saved"))
    }
    else if (act === "mode") { U.mode = v; render() }
    else if (act === "aud") { U.audioN = parseInt(v, 10); render(); autoplay() }
    else if (act === "audGroup") { U.audioN = (parseInt(v, 10) - 1) * 9 + 1; render(); autoplay() }
    else if (act === "video") openTg("https://t.me/" + CFG.CHANNEL + "/" + v)
    else if (act === "mood") {
      var h = S.moodHist[v] || { count: 0 }
      h.count++; h.lastAt = Date.now(); S.moodHist[v] = h
      U.moodPick = v; save(); render()
    }
    else if (act === "moodAgain") { U.moodPick = ""; render() }
    else if (act === "moodPage") { U.moodPage = parseInt(v, 10); render() }
    else if (act === "preset") document.getElementById("dTarget").value = v
    else if (act === "saveDaily") {
      var t = parseInt(document.getElementById("dTarget").value, 10), st = parseInt(document.getElementById("dStep").value, 10)
      if (!t || t < 1) { toast("⚠️"); return }
      if (!st || st < 1) st = 1
      var old = S.daily || {}
      S.daily = { target: Math.min(t, 1000000), step: Math.min(st, 100000), owedDays: old.owedDays || 0, draft: old.draft || 0, lastCheckedDate: old.lastCheckedDate || todayStr(), todayDone: !!old.todayDone }
      U.dailyMenu = false; save(); render()
    }
    else if (act === "dailyMenu") { U.dailyMenu = !U.dailyMenu; render() }
    else if (act === "tap") {
      dailyTick()
      var ds = S.daily
      if (ds.todayDone) return
      var cycles = 0
      ds.draft = (ds.draft || 0) + (ds.step || 1)
      while (ds.draft >= ds.target) {
        ds.draft -= ds.target
        cycles++
        if (ds.owedDays > 0) ds.owedDays--; else ds.todayDone = true
      }
      save()
      var to = cycles > 0 ? 100 : Math.min(100, Math.floor(ds.draft * 100 / ds.target))
      var from = hgShown
      if (to > from) { hgDrop(from, to); hgShown = to }
      var stg = document.getElementById("hgstage")
      if (stg) { stg.classList.remove("pulse"); void stg.offsetWidth; stg.classList.add("pulse") }
      hgStats()
      if (cycles > 0) {
        hgWhenIdle(function () {
          try { tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success") } catch (e) {}
          var w = document.getElementById("hgbox")
          if (ds.todayDone || !w) render()
          else { w.classList.add("flip"); setTimeout(function () { hgFlip = true; render() }, 900) }
        })
      }
    }
    else if (act === "spoil") el.classList.toggle("show")
    else if (act === "more") { U.more = v; if (v === "quote") U.quoteIdx = -1; render() }
    else if (act === "quoteNext") {
      var i = Math.floor(Math.random() * D.quotes.length)
      if (i === U.quoteIdx) i = (i + 1) % D.quotes.length
      U.quoteIdx = i; render()
    }
    else if (act === "share") {
      var d = quoteData(U.quoteIdx)
      var url = "https://t.me/share/url?url=" + encodeURIComponent("https://t.me/" + CFG.BOT) + "&text=" + encodeURIComponent(d.share)
      openTg(url)
    }
    else if (act === "shareName") {
      var sn = parseInt(v, 10), nd = D.names[sn - 1]
      openTg("https://t.me/share/url?url=" + encodeURIComponent("https://t.me/" + CFG.BOT) + "&text=" + encodeURIComponent("✨ " + sn + ". " + nd.a + " — " + nd.t + "\n🤖 @" + CFG.BOT))
    }
    else if (act === "setLang") { S.lang = v; TCACHE = {}; save(); U.more = "menu"; render(); if (wheels.lang) wheels.lang.set(LANGS.indexOf(v), true) }
    else if (act === "openBot") openTg("https://t.me/" + CFG.BOT)
    else if (act === "openChannel") openTg("https://t.me/" + CFG.CHANNEL)
  })

  var homeLink = document.getElementById("home")
  if (homeLink) {
    homeLink.addEventListener("click", function (ev) {
      ev.preventDefault()
      haptic("light")
      U.tab = "names"; U.detail = 0; U.q = ""; U.more = "menu"; U.moodPick = ""; U.dailyMenu = false
      render()
    })
  }

  document.addEventListener("input", function (ev) {
    if (ev.target && ev.target.id === "q") {
      U.q = ev.target.value
      document.getElementById("grid").innerHTML = nameCards(filterNames())
    }
  })

  // audio xatosi (error hodisasi ko'tarilmaydi, shuning uchun capture)
  document.addEventListener("error", function (ev) {
    if (ev.target && ev.target.id === "player") {
      var m = document.getElementById("audioErr")
      if (m) m.hidden = false
    }
  }, true)

  function autoplay() {
    var p = document.getElementById("player")
    if (p && p.play) { var r = p.play(); if (r && r.catch) r.catch(function () {}) }
  }

  // ====================
  // START
  // ====================
  load()
  if (!S.lang) S.lang = detectLang()
  if (tg) {
    try {
      tg.ready()
      tg.expand()
      if (tg.BackButton) tg.BackButton.onClick(goBack)
      if (tg.setHeaderColor) tg.setHeaderColor("bg_color")
    } catch (e) {}
  }
  applyTheme()
  render()
  initHeader()
  cloudRead()
})()
