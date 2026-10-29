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
    gender: "Jins|Жинс|Пол|Gender|الجنس|Cinsiyet|Jenis kelamin|性别|लिंग|Género",
    g_female: "Ayol|Аёл|Женский|Female|أنثى|Kadın|Perempuan|女|महिला|Mujer",
    g_male: "Erkak|Эркак|Мужской|Male|ذكر|Erkek|Laki-laki|男|पुरुष|Hombre",
    hikmat: "Kun hikmati|Кун ҳикмати|Мудрость дня|Wisdom of the day|حكمة اليوم|Günün hikmeti|Hikmah hari ini|每日智慧|आज की हिकमत|Sabiduría del día",
    more_t: "Ko'proq|Кўпроқ|Ещё|More|المزيد|Daha fazla|Selengkapnya|更多|और देखें|Más",
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
    mood_all: "Hammasi|Ҳаммаси|Все|Show all|عرض الكل|Tümü|Semua|全部|सभी|Todos",
    mood_less: "Yopish|Ёпиш|Свернуть|Collapse|إغلاق|Kapat|Tutup|收起|बंद करें|Cerrar",
    mood_again: "Qayta tanlash|Қайта танлаш|Выбрать заново|Choose again|اختر مرة أخرى|Yeniden seç|Pilih lagi|重新选择|फिर से चुनें|Elegir de nuevo",
    mood_times: "Tanlangan|Танланган|Выбрано|Chosen|تم اختياره|Seçildi|Dipilih|已选|चुना गया|Elegido",
    daily: "Kunlik salavot|Кунлик салавот|Ежедневный салават|Daily Salawat|الصلاة اليومية|Günlük Salavat|Salawat Harian|每日赞圣|दैनिक सलावात|Salawat diario",
    daily_ask: "Kuniga nechta salavot aytmoqchisiz?|Кунига нечта салавот айтмоқчисиз?|Сколько салаватов в день?|How many salawat per day?|كم صلاة في اليوم؟|Günde kaç salavat?|Berapa salawat per hari?|每天多少次？|रोज़ कितने सलावात?|¿Cuántos salawat al día?",
    mode_goal: "Maqsad bilan|Мақсад билан|С целью|With goal|بهدف|Hedefli|Dengan target|设定目标|लक्ष्य के साथ|Con meta",
    mode_free: "Xohlagancha|Хоҳлаганча|Без цели|Free count|بلا حد|Serbest|Bebas|不限次数|मनचाहा|Libre",
    total_n: "Jami|Жами|Всего|Total|المجموع|Toplam|Total|总计|कुल|Total",
    cycle_n: "Davra|Давра|Цикл|Cycle|الدورة|Döngü|Siklus|循环|चक्र|Ciclo",
    free_hint: "+ bosing yoki qumsoatning past/yuqorisini yonga tortib qo'yib yuboring|+ босинг ёки қумсоатнинг паст/юқорисини ёнга тортиб қўйиб юборинг|Нажимайте + или потяните низ/верх песочных часов вбок и отпустите|Tap + or pull the top/bottom of the hourglass sideways and let go|اضغط + أو اسحب أعلى/أسفل الساعة الرملية جانبًا ثم أفلتها|+ tuşuna basın veya kum saatinin üstünü/altını yana çekip bırakın|Ketuk + atau tarik atas/bawah jam pasir ke samping lalu lepaskan|点按 + 或将沙漏上/下端向侧面拉动后松手|+ दबाएँ या रेतघड़ी का ऊपरी/निचला हिस्सा बगल में खींचकर छोड़ दें|Toca + o tira de la parte superior/inferior del reloj hacia un lado y suelta",
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
    remind: "Botdan eslatmalar|Ботдан эслатмалар|Напоминания от бота|Bot reminders|تذكيرات البوت|Bot hatırlatmaları|Pengingat bot|机器人提醒|बॉट रिमाइंडर|Recordatorios del bot",
    rm_daily: "Kunlik eslatma|Кунлик эслатма|Ежедневное напоминание|Daily reminder|تذكير يومي|Günlük hatırlatma|Pengingat harian|每日提醒|दैनिक रिमाइंडर|Recordatorio diario",
    rm_due: "Salavot eslatmasi|Салавот эслатмаси|Напоминание о салавате|Salawat reminder|تذكير الصلاة|Salavat hatırlatması|Pengingat salawat|赞圣提醒|सलावात रिमाइंडर|Recordatorio de salawat",
    rm_owed: "Qarz haqida ogohlantirish|Қарз ҳақида огоҳлантириш|Предупреждение о долге|Overdue warning|تنبيه التأخير|Borç uyarısı|Peringatan utang|欠款提醒|बकाया चेतावनी|Aviso de atraso",
    about: "Haqida|Ҳақида|О приложении|About|حول|Hakkında|Tentang|关于|के बारे में|Acerca de",
    rate_all: "Umumiy reyting|Умумий рейтинг|Общий рейтинг|Overall rating|التقييم العام|Genel puan|Rating umum|总评分|कुल रेटिंग|Valoración general",
    rate_my: "Sizning bahoyingiz|Сизнинг баҳойингиз|Ваша оценка|Your rating|تقييمك|Puanınız|Penilaian Anda|您的评分|आपकी रेटिंग|Tu valoración",
    like_app: "Ilova yoqdi|Илова ёқди|Нравится|Like|أعجبني|Beğen|Suka|喜欢|पसंद|Me gusta",
    settings: "Sozlamalar|Созламалар|Настройки|Settings|الإعدادات|Ayarlar|Pengaturan|设置|सेटिंग्स|Ajustes",
    tz_dev: "Qurilma vaqti|Қурилма вақти|Время устройства|Device time|وقت الجهاز|Cihaz saati|Waktu perangkat|设备时间|डिवाइस समय|Hora del dispositivo",
    tz_hint: "Kun va tun avtomatik almashishi uchun o'z shahringizni yoki davlatingizga yaqin shaharni tanlang. Tanlov faqat shu uchun, hech qanday ma'lumot yig'ilmaydi.|Кун ва тун автоматик алмашиши учун ўз шаҳрингизни ёки давлатингизга яқин шаҳарни танланг. Танлов фақат шу учун, ҳеч қандай маълумот йиғилмайди.|Чтобы день и ночь переключались автоматически, выберите свой город или ближайший к вашей стране. Выбор нужен только для этого, никакие данные не собираются.|To switch day and night automatically, pick your city or one near your country. The choice is used only for this; no data is collected.|لتبديل النهار والليل تلقائيًا، اختر مدينتك أو مدينة قريبة من بلدك. يُستخدم الاختيار لهذا فقط ولا تُجمع أي بيانات.|Gece ve gündüzün otomatik değişmesi için şehrinizi veya ülkenize yakın bir şehri seçin. Seçim yalnızca bunun için kullanılır, veri toplanmaz.|Agar siang dan malam berganti otomatis, pilih kota Anda atau yang dekat dengan negara Anda. Pilihan hanya untuk ini, tidak ada data yang dikumpulkan.|为了自动切换日夜，请选择您所在的城市或靠近您国家的城市。此选择仅用于此，不会收集任何数据。|दिन और रात अपने आप बदलने के लिए अपना शहर या अपने देश के पास का शहर चुनें। यह चुनाव केवल इसी के लिए है, कोई डेटा एकत्र नहीं होता।|Para cambiar automáticamente entre día y noche, elige tu ciudad o una cercana a tu país. La elección solo sirve para esto; no se recopilan datos.",
    nh_sub: "{n} go'zal ism|{n} гўзал исм|{n} прекрасных имён|{n} beautiful names|{n} اسمًا حسنى|{n} güzel isim|{n} nama indah|{n}个尊名|{n} सुंदर नाम|{n} nombres hermosos",
    theme_t: "Mavzu|Мавзу|Тема|Theme|السمة|Tema|Tema|主题|थीम|Tema",
    th_auto: "Avtomatik|Автоматик|Автоматически|Automatic|تلقائي|Otomatik|Otomatis|自动|स्वचालित|Automático",
    th_male: "Erkaklar uchun|Эркаклар учун|Для мужчин|For men|للرجال|Erkekler için|Untuk pria|男士|पुरुषों के लिए|Para hombres",
    th_female: "Ayollar uchun|Аёллар учун|Для женщин|For women|للنساء|Kadınlar için|Untuk wanita|女士|महिलाओं के लिए|Para mujeres",
    gender_info: "O'z genderingizni tanlashingiz qulayroq bo'lishi mumkin|Ўз гендерингизни танлашингиз қулайроқ бўлиши мумкин|Вам может быть удобнее выбрать тему для своего пола|Choosing the theme for your own gender may feel more comfortable|قد يكون اختيار السمة المناسبة لجنسك أكثر راحة|Kendi cinsiyetinize uygun temayı seçmek daha rahat olabilir|Memilih tema sesuai jenis kelamin Anda mungkin lebih nyaman|选择适合您性别的主题可能更舒适|अपने लिंग के अनुसार थीम चुनना अधिक सुविधाजनक हो सकता है|Elegir el tema para tu género puede resultar más cómodo",
    flt_all: "Odatiy|Одатий|Обычный|Default|افتراضي|Varsayılan|Default|默认|डिफ़ॉल्ट|Predeterminado",
    flt_note: "Qaydli|Қайдли|С заметками|With notes|مع ملاحظات|Notlu|Dengan catatan|有笔记|नोट वाले|Con notas",
    mode_t: "Rejim|Режим|Режим|Mode|الوضع|Mod|Mode|模式|मोड|Modo",
    quality: "Sifat|Сифат|Качество|Quality|الجودة|Kalite|Kualitas|画质|गुणवत्ता|Calidad",
    t_color: "Rang|Ранг|Цвет|Color|اللون|Renk|Warna|颜色|रंग|Color",
    t_glass: "Shisha|Шиша|Стекло|Glass|الزجاج|Cam|Kaca|玻璃|काँच|Cristal",
    t_gon: "Shisha effekti|Шиша эффекти|Эффект стекла|Glass effect|تأثير الزجاج|Cam efekti|Efek kaca|玻璃效果|काँच प्रभाव|Efecto cristal",
    t_solid: "Fon rangi|Фон ранги|Цвет фона|Background color|لون الخلفية|Arka plan rengi|Warna latar|背景颜色|पृष्ठभूमि का रंग|Color de fondo",
    t_blur: "Xiralik|Хиралик|Размытие|Blur|التمويه|Bulanıklık|Buram|模糊|धुंधलापन|Desenfoque",
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
  var S = { lang: "", gender: "", theme: "auto", tz: "", favs: {}, notes: {}, moodHist: {}, daily: null, savedAt: 0 }
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
    syncPrefs()
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
  var U = { nf: "all", tab: "names", detail: 0, q: "", mode: "video", audioN: 1, moodPage: 1, moodPick: "", more: "menu", quoteIdx: -1, dpanel: "", dir: "", moodOpen: false }
  var app = document.getElementById("app")
  var navEl = document.getElementById("nav")
  var NAVS = [
    ["names", "menu_book", "nav_names"],
    ["media", "movie", "nav_media"],
    ["mood", "mood", "nav_mood"],
    ["daily", "hourglass_top", "nav_daily"],
    ["more", "auto_awesome", "nav_more"]
  ]

  function aboutRate() {
    var g = U.rg, my = S.rate || 0, st = "", mine = ""
    for (var i = 1; i <= 5; i++) mine += '<button class="star' + (i <= my ? " on" : "") + '" data-act="rateApp" data-v="' + i + '">' + ic("star") + "</button>"
    return '<div class="rate"><div class="rrow"><span>' + esc(tr("rate_all")) + '</span><b>' + (g && g.count ? "★ " + (+g.avg).toFixed(1) + " · " + g.count : "—") + '</b></div>' +
      '<div class="rrow"><span>' + esc(tr("rate_my")) + '</span><span class="stars">' + mine + '</span></div>' +
      '<button class="btn block' + (S.appLike ? " success" : "") + '" data-act="likeApp">' + ic("favorite", S.appLike ? "fill" : "") + " " + esc(tr("like_app")) + (g && g.likes ? " · " + g.likes : "") + "</button></div>"
  }
  function rateSync(send) {
    var u = CFG.RATE_URL || (CFG.STATS_URL ? CFG.STATS_URL.replace(/\/$/, "") + "/rating" : ""); if (!u || !window.fetch) return
    var o = {}
    if (send) {
      if (!tg || !tg.initData) return
      o = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ initData: tg.initData, rate: S.rate || 0, like: S.appLike ? 1 : 0 }) }
    }
    fetch(u, o).then(function (r) { return r.json() }).then(function (j) { U.rg = j; if (U.more === "about") render() }).catch(function () {})
  }
  function ic(name, cls) { return '<span class="msi' + (cls ? " " + cls : "") + '" aria-hidden="true">' + name + "</span>" }
  function renderNav() {
    var h = ""
    for (var i = 0; i < NAVS.length; i++) {
      h += '<button data-act="tab" data-v="' + NAVS[i][0] + '" class="' + (U.tab === NAVS[i][0] && !U.detail ? "on" : "") + '">' + ic(NAVS[i][1], "ic") + '<span>' + esc(tr(NAVS[i][2])) + "</span></button>"
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
        (S.favs[n] ? '<span class="fav">' + ic("favorite", "fill") + '</span>' : "") +
        (S.notes[n] ? '<span class="fav nt' + (S.favs[n] ? " two" : "") + '">' + ic("bookmark") + '</span>' : "") +
        '<div class="ar">' + d.a + '</div><div class="tr">' + esc(d.t) + "</div></button>"
    }
    return h + "</div>"
  }
  function snorm(x) {
    x = String(x).toLowerCase()
    try { x = x.normalize("NFD") } catch (e) {}
    return x.replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, "").replace(/[\s'`\u2019\u02bc\u2018\u02bb\u02bf\u02be\-.,]/g, "")
      .replace(/ё/g, "е").replace(/ў/g, "у").replace(/ҳ/g, "х").replace(/қ/g, "к").replace(/ғ/g, "г").replace(/ъ|ь/g, "")
  }
  var SN = null
  function sMatch(i, qn) {
    if (!qn) return false
    if (!window.SEARCH_IDX) { loadJs("search.js?v=47", function () { SN = null; var g = document.getElementById("grid"); if (g && U.q.trim()) { g.innerHTML = nameCards(filterNames()); nsUpdate() } }); return false }
    if (!SN) { SN = {}; var ix = window.SEARCH_IDX || {}; for (var k in ix) SN[k] = ix[k].map(snorm) }
    var l = SN[i]; if (!l) return false
    for (var j = 0; j < l.length; j++) if (l[j].indexOf(qn) >= 0) return true
    return false
  }
  function filterNames() {
    var q = plain(U.q.trim()), qn = snorm(U.q.trim())
    var out = []
    for (var i = 1; i <= 99; i++) {
      if (U.nf === "fav" && !S.favs[i]) continue
      if (U.nf === "note" && !S.notes[i]) continue
      if (!q || plain(D.names[i - 1].t).indexOf(q) >= 0 || D.names[i - 1].a.indexOf(U.q.trim()) >= 0 || String(i) === q || sMatch(i, qn)) out[out.length] = i
    }
    return out
  }
  function viewNames() {
    var searching = !!U.q.trim() || U.nf !== "all", open = U.namesOpen || searching
    var fl = '<div class="flt">'
    var FL = [["all", "format_list_numbered", "flt_all"], ["fav", "favorite", "favs"], ["note", "bookmark", "flt_note"]]
    for (var fi = 0; fi < FL.length; fi++) fl += '<button class="fchip' + (U.nf === FL[fi][0] ? " on" : "") + '" data-act="nf" data-v="' + FL[fi][0] + '">' + ic(FL[fi][1]) + "<span>" + esc(tr(FL[fi][2])) + "</span></button>"
    fl += "</div>"
    return '<div class="nhead"><div class="nh-t"><span class="nh-ic">' + ic("menu_book") + '</span><div class="nh-x"><b>' + esc(tr("nav_names")) + '</b><small>' + esc(tr("nh_sub")).replace("{n}", '<i id="nhn" class="nhn">99</i>') + '</small></div></div>' +
      '<div id="sbox" class="sbox' + (U.q ? " has" : "") + '"><input id="q" class="search" type="search" autocomplete="off" aria-label="' + esc(tr("search")) + '" value="' + esc(U.q) + '">' +
      '<div id="ph" class="ph" aria-hidden="true"><span></span><span></span></div>' +
      '<button class="sgo" data-act="sgo" aria-label="' + esc(tr("search")) + '">' + ic("search") + "</button></div></div>" + fl +
      '<div id="ngrid" class="ngrid' + (open ? " open" : "") + '"><div id="grid">' + nameCards(filterNames()) + "</div></div>" +
      '<button id="ntog" class="btn block moodtog" data-act="namesToggle"' + (searching ? " hidden" : "") + ">" + ic(U.namesOpen ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.namesOpen ? "mood_less" : "mood_all")) + "</span></button>" +
      '<button class="hikrow" data-act="hikmat"><span>' + esc(tr("hikmat")) + "</span>" + ic("chevron_right") + "</button>"
  }
  // umumiy soat: 99 hisobi va header g'ildiraklari bir ritmda (barmoq tegsa to'xtaydi, qo'yilgach 3s dan keyin boshidan)
  var CLK = { tc: 0, block: 0 }
  function clkTouch(on) {
    if (on) { CLK.tc++; CLK.block = 1e15; if (wheels.lang) wheels.lang.spinEnd(); if (wheels.theme) wheels.theme.spinEnd() }
    else { CLK.tc = Math.max(0, CLK.tc - 1); if (!CLK.tc) CLK.block = performance.now() + 3000 }
  }
  var nhRaf = 0
  function nhStart() {
    cancelAnimationFrame(nhRaf)
    var el = document.getElementById("nhn")
    if (!el || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return
    var CT = 3000, HOLD = 7000
    function step(ts) {
      if (!document.getElementById("nhn")) return
      nhRaf = requestAnimationFrame(step)
      var d = ts % (CT + HOLD), v = 99
      if (d < CT) { var p = d / CT; v = Math.max(1, Math.round(99 * (1 - Math.pow(1 - p, 2)))) }
      if (el.textContent !== String(v)) el.textContent = v
    }
    nhRaf = requestAnimationFrame(step)
  }
  var phT = null
  function phStart() {
    clearInterval(phT); phT = null
    var box = document.getElementById("ph")
    if (!box) return
    var cur = box.firstChild, oth = box.lastChild, k = 0
    var items = [tr("search"), D.names[0].t, D.names[3].t, D.names[11].t, D.names[12].t]
    function put(el, y, o, tt) { el.style.transition = tt ? "transform .5s cubic-bezier(.3,.7,.2,1), opacity .5s" : "none"; el.style.transform = "translateY(" + y + "%)"; el.style.opacity = o }
    cur.textContent = items[0]; put(cur, 0, 1, false); put(oth, 120, 0, false)
    phT = setInterval(function () {
      if (!document.getElementById("ph")) { clearInterval(phT); phT = null; return }
      if (document.hidden) return
      k = (k + 1) % items.length
      oth.textContent = items[k]; put(oth, 120, 0, false); void oth.offsetWidth
      put(cur, -120, 0, true); put(oth, 0, 1, true)
      var t = cur; cur = oth; oth = t
    }, 2000)
  }
  // ====================
  // ISMLAR UCHUN YASHIL SKROLL (ramka ichida yuradi, raqamli pufak bilan)
  // ====================
  var nsb = document.createElement("div")
  nsb.id = "nsb"
  nsb.innerHTML = '<div class="th"></div><div class="bub"></div>'
  document.body.appendChild(nsb)
  var nsG = { top: 0, h: 0, th: 0, max: 1 }, nsDrag = false, nsTimer = null
  function isMile(n) { return n === 1 || n === 99 || n % 5 === 0 }
  function nsLabel(p) {
    var cards = document.querySelectorAll("#grid .name-card"), nums = []
    for (var i = 0; i < cards.length; i++) nums.push(parseInt(cards[i].getAttribute("data-v"), 10))
    if (!nums.length) return ""
    var rows = Math.ceil(nums.length / 3), r = Math.round(p * (rows - 1))
    var row = nums.slice(r * 3, r * 3 + 3), j
    for (j = 0; j < row.length; j++) if (isMile(row[j])) return row[j]
    var mx = row[row.length - 1]
    for (j = r * 3 - 1; j >= 0; j--) if (isMile(nums[j]) && nums[j] <= mx) return nums[j]
    return row[0]
  }
  function nsUpdate() {
    var grid = document.getElementById("grid")
    var docH = document.documentElement.scrollHeight, vh = window.innerHeight
    if (!grid || U.tab !== "names" || U.detail || docH < vh * 1.5) { nsb.style.display = "none"; return }
    nsb.style.display = "block"
    var hdr = document.getElementById("hdr"), hb = hdr ? hdr.getBoundingClientRect().bottom : 60
    var y = window.pageYOffset || 0
    var top = hb + 6
    var bottom = navEl.getBoundingClientRect().top - 24
    var h = Math.max(80, bottom - top)
    var th = Math.max(48, Math.min(h * 0.5, h * vh / docH))
    var max = Math.max(1, docH - vh), p = Math.min(1, Math.max(0, y / max))
    nsG = { top: top, h: h, th: th, max: max }
    nsb.style.top = top + "px"; nsb.style.height = h + "px"
    var t = nsb.firstChild
    t.style.height = th + "px"; t.style.top = p * (h - th) + "px"
    var b = nsb.lastChild
    b.style.top = p * (h - th) + th / 2 - 19 + "px"
    if (nsb.classList.contains("on")) b.textContent = nsLabel(p)
  }
  function nsPoke() {
    nsb.classList.add("on")
    clearTimeout(nsTimer)
    nsTimer = setTimeout(function () { if (!nsDrag) nsb.classList.remove("on") }, 1100)
  }
  function nsFromY(cy) {
    var p = (cy - nsG.top - nsG.th / 2) / Math.max(1, nsG.h - nsG.th)
    window.scrollTo(0, Math.min(1, Math.max(0, p)) * nsG.max)
  }
  nsb.addEventListener("pointerdown", function (e) {
    nsDrag = true; nsb.classList.add("drag"); nsPoke()
    try { nsb.setPointerCapture(e.pointerId) } catch (x) {}
    nsFromY(e.clientY); e.preventDefault()
  })
  nsb.addEventListener("pointermove", function (e) { if (nsDrag) nsFromY(e.clientY) })
  function nsEnd() { nsDrag = false; nsb.classList.remove("drag"); nsPoke() }
  nsb.addEventListener("pointerup", nsEnd)
  nsb.addEventListener("pointercancel", nsEnd)
  window.addEventListener("scroll", function () { nsPoke(); nsUpdate() }, { passive: true })
  window.addEventListener("resize", nsUpdate)

  // ====================
  // AUDIO / DETAIL
  // ====================
  // Audio fayllar ro'yxati GitHub'dagi audio papkasidan avtomatik olinadi (ism tartibi fayl nomidagi raqamdan)
  var AUDMAP = null
  function audBuild(files) {
    var items = [], map = {}, has = {}, i, k, m
    files = files.filter(function (x) { return /\.(mp3|m4a|ogg|wav)$/i.test(x) })
    for (i = 0; i < files.length; i++) {
      m = /^\s*(\d+)(?:\s*[-\u2013\u2014]\s*(\d+))?/.exec(files[i])
      if (!m) continue
      var lo = parseInt(m[1], 10), hi = m[2] ? parseInt(m[2], 10) : lo
      if (hi < lo || hi - lo > 5) hi = lo
      items[items.length] = [lo, hi, files[i]]
      for (k = lo; k <= hi; k++) has[k] = 1
    }
    if (items.length < files.length / 2) {
      files.sort()
      for (i = 0; i < files.length && i < 99; i++) map[i + 1] = files[i]
      return map
    }
    // 1-raqamli fayl "Alloh" (umumiy ism) bo'lsa, ism raqami = fayl raqami - 1; "25-26" kabi fayl ikki ismga xizmat qiladi
    var off = (has[100] || (!has[1] && has[2]) || (has[1] && has[99] && !has[0] && items.length >= 99)) ? 1 : 0
    for (i = 0; i < items.length; i++) for (k = items[i][0]; k <= items[i][1]; k++) if (k - off >= 1 && k - off <= 99) map[k - off] = items[i][2]
    return map
  }
  function audInit() {
    var repo = CFG.AUDIO_REPO, dir = String(CFG.AUDIO_DIR || "audio1/").replace(/\/$/, "")
    if (!repo || !window.fetch) return
    try {
      var c = JSON.parse(localStorage.getItem("asmo_aud") || "null")
      if (c && c.files && c.files.length) { AUDMAP = audBuild(c.files); if (Date.now() - c.t < 6 * 3600000) return }
    } catch (e) {}
    fetch("https://api.github.com/repos/" + repo + "/contents/" + dir).then(function (r) { return r.json() }).then(function (j) {
      if (!j || !j.length) return
      var fl = []
      for (var i = 0; i < j.length; i++) if (j[i].type === "file") fl[fl.length] = j[i].name
      if (!fl.length) return
      AUDMAP = audBuild(fl)
      try { localStorage.setItem("asmo_aud", JSON.stringify({ t: Date.now(), files: fl })) } catch (e) {}
      if (U.tab === "media" || U.detail) render()
    }).catch(function () {})
  }
  function audioUrl(n) {
    if (AUDMAP && AUDMAP[n]) return encodeURI(String(CFG.AUDIO_DIR || "audio1/") + AUDMAP[n])
    try {
      var u = CFG.AUDIO_URL
      if (typeof u === "function") return encodeURI(String(u(n)))
      if (typeof u === "string") return u + n + ".mp3"
    } catch (e) {}
    return ""
  }
  function audioBlock(n) {
    return '<audio id="player" controls preload="none" src="' + esc(audioUrl(n)) + '"></audio><p id="audioErr" class="notice" hidden>' + esc(tr("no_audio")) + "</p>"
  }
  // Ism ma'nosi (meanings.js dan): tanlangan til -> en -> uz -> ru -> birinchi bo'sh bo'lmagani
  var LOADED = {}
  function loadJs(src, cb) {
    if (LOADED[src]) { if (LOADED[src] === 2) { cb && cb() } else if (cb) LOADED[src + "_cb"] = (LOADED[src + "_cb"] || []).concat(cb); return }
    LOADED[src] = 1
    var sc = document.createElement("script")
    sc.src = src; sc.async = true
    sc.onload = function () { LOADED[src] = 2; var l = LOADED[src + "_cb"] || []; for (var i = 0; i < l.length; i++) l[i](); cb && cb() }
    sc.onerror = function () { LOADED[src] = 0; if (/^meanings\//.test(src)) loadJs("meanings.js?v=47", function () { if (U.detail || U.dpanel) render() }) }
    document.head.appendChild(sc)
  }
  function loadMean(lang) {
    var by = window.MEANINGS_BY || {}
    if (by[lang]) return true
    loadJs("meanings/" + lang + ".js?v=47", function () { if (U.detail || U.dpanel) render() })
    return false
  }
  function meaningOf(n) {
    var by = window.MEANINGS_BY || {}
    if (by[S.lang]) return String(by[S.lang][n - 1] || "").trim()
    var m = window.MEANINGS && window.MEANINGS[n - 1]
    if (m) {
      var v = typeof m === "string" ? m : (m[S.lang] || m.en || m.uz || m.ru || "")
      return String(v).trim()
    }
    loadMean(S.lang); return ""
  }
  // Xavfsiz oddiy HTML: faqat ruxsat etilgan teglar, qolgani matn
  function rich(s) {
    var t = esc(s)
    t = t.replace(/&lt;(\/?)(b|strong|i|em|u|s|code|blockquote)&gt;/gi, "<$1$2>")
    t = t.replace(/&lt;tg-spoiler&gt;/gi, '<span class="sp" data-act="spoil">').replace(/&lt;\/tg-spoiler&gt;/gi, "</span>")
    return t.replace(/\r?\n/g, "<br>")
  }

  function nextN(n, dir) { return dir > 0 ? (n === 99 ? 1 : n + 1) : (n === 1 ? 99 : n - 1) }
  function panelHtml(n) {
    if (U.dpanel === "audio") return '<div class="card panel">' + audioBlock(n) + "</div>"
    if (U.dpanel === "note") return '<div class="card panel stack"><strong>' + ic("stylus_note") + " " + esc(tr("note")) + '</strong><div class="nline"><div class="nbox"><div class="trashw' + (S.notes[n] ? "" : " none") + '" id="trashw" data-v="' + n + '"><i class="hr"></i><i class="hr red"></i><button id="trashBtn" class="trash" aria-label="Delete">' + ic("delete") + '</button></div><div id="noteText" class="nta" contenteditable="plaintext-only" role="textbox" spellcheck="false" data-ph="' + esc(tr("note_ph")) + '">' + esc(S.notes[n] || "") + "</div></div></div>" +
      '<div class="nrow"><button id="noteSave" class="btn success block" data-act="saveNote" data-v="' + n + '" hidden>' + esc(tr("save")) + "</button></div></div>"
    return ""
  }
  function viewDetail() {
    var n = U.detail, d = D.names[n - 1]
    var liked = !!S.favs[n], dirCls = U.dir ? " in-" + U.dir : ""
    U.dir = ""
    var mean = meaningOf(n)
    return '<button class="btn small back" data-act="closeDetail">' + ic("chevron_left") + esc(tr("back")) + "</button>" +
      '<div class="slidewrap"><div id="slide" class="slide' + dirCls + '" data-n="' + n + '">' +
      '<div class="card hero"><div class="hnav" dir="ltr"><button class="rb" data-act="step" data-v="-1" aria-label="Previous">' + ic("chevron_left") + '</button><div class="no">' + n + ' / 99</div><button class="rb" data-act="step" data-v="1" aria-label="Next">' + ic("chevron_right") + "</button></div>" +
      '<div class="ar">' + d.a + '</div><div class="tr">' + esc(d.t) + "</div></div>" +
      (mean ? '<div class="card mean"><strong>' + ic("menu_book") + " " + esc(tr("meaning")) + '</strong><div class="mt clamp' + (U.mexp ? " open" : "") + '">' + rich(mean) + '</div><button class="mtog" data-act="meanTog" hidden>' + ic(U.mexp ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.mexp ? "mood_less" : "more_t")) + "</span></button></div>" : "") +
      '<div class="likepop" aria-hidden="true">' + ic("favorite", "fill") + "</div></div></div>" +
      '<div class="acts" dir="ltr">' +
      '<button class="act' + (U.dpanel === "audio" ? " on" : "") + '" data-act="dpanel" data-v="audio" aria-label="Audio">' + ic("music_note") + "</button>" +
      '<button class="act' + (U.dpanel === "note" ? " on" : "") + (S.notes[n] ? " has" : "") + '" data-act="dpanel" data-v="note" aria-label="Note">' + ic("stylus_note") + "</button>" +
      '<button class="act" data-act="shareName" data-v="' + n + '" aria-label="Share">' + ic("share") + "</button>" +
      '<button id="actFav" class="act like' + (liked ? " liked" : "") + '" data-act="fav" data-v="' + n + '" aria-label="Like">' + ic("favorite", liked ? "fill" : "") + "</button></div>" +
      '<div id="dpanel">' + panelHtml(n) + "</div>"
  }
  function meanFit() {
    var mt = document.querySelector("#slide .mt.clamp")
    if (!mt) return
    var btn = mt.parentNode.querySelector(".mtog")
    var fs = parseFloat(getComputedStyle(mt).fontSize) || 16
    var wasOpen = mt.classList.contains("open")
    mt.classList.remove("clamp", "open")
    var full = mt.scrollHeight
    mt.classList.add("clamp"); if (wasOpen) mt.classList.add("open")
    if (full <= fs * 11.5 + 10) { mt.classList.add("fits"); if (btn) btn.hidden = true }
    else if (btn) btn.hidden = false
  }
  function setLike(n, on) {
    if (on) S.favs[n] = 1; else delete S.favs[n]
    save()
    var b = document.getElementById("actFav")
    if (!b) return
    b.classList.toggle("liked", on)
    b.firstChild.className = "msi" + (on ? " fill" : "")
    if (!on) return
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop")
    for (var i = 0; i < 8; i++) {
      var p = document.createElement("i")
      var ang = (i / 8) * Math.PI * 2 + Math.random() * 0.5, dist = 26 + Math.random() * 22
      p.className = "bp msi fill"; p.textContent = "favorite"
      p.style.setProperty("--x", Math.cos(ang) * dist + "px"); p.style.setProperty("--y", Math.sin(ang) * dist - 10 + "px")
      p.style.fontSize = 9 + Math.random() * 8 + "px"
      b.appendChild(p)
      setTimeout((function (el) { return function () { if (el.parentNode) el.parentNode.removeChild(el) } })(p), 800)
    }
  }
  function bigHeart() {
    var el = document.querySelector("#slide .likepop")
    if (!el) return
    el.classList.remove("show"); void el.offsetWidth; el.classList.add("show")
  }
  // keyingi (dir>0, chapga surish) / oldingi (dir<0, o'ngga surish) ism
  var navBusy = false
  function navDetail(dir) {
    if (!U.detail) return
    var el = document.getElementById("slide"), ghost = null
    if (el) {
      ghost = el.cloneNode(true)
      ghost.removeAttribute("id")
      ghost.className = "slide ghost"
      ghost.style.width = el.offsetWidth + "px"
      ghost.style.transform = el.style.transform || "none"
      ghost.style.opacity = el.style.opacity || "1"
    }
    U.detail = nextN(U.detail, dir); U.dir = dir > 0 ? "next" : "back"; U.dpanel = ""; U.mexp = false
    if (ghost && dir < 0) { ghost.className = "slide ghost under"; ghost.style.transform = "none"; ghost.style.opacity = "1" }
    render()
    var w = document.querySelector(".slidewrap")
    if (ghost && w && dir < 0) {
      w.appendChild(ghost)
      var ns = document.getElementById("slide")
      if (ns) { ghost.style.height = ns.offsetHeight + "px"; ghost.style.overflow = "hidden" }
      setTimeout(function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost) }, 470)
    } else if (ghost && w) {
      w.appendChild(ghost)
      void ghost.offsetWidth
      ghost.style.transition = document.documentElement.getAttribute("data-gender") === "female" ? "transform .4s cubic-bezier(.45, 0, .85, .55)" : "transform .4s cubic-bezier(.45, 0, .85, .55), opacity .4s ease-in"
      ghost.style.transform = "translateX(" + (dir > 0 ? -135 : 135) + "%) rotate(" + (dir > 0 ? -12 : 12) + "deg)"
      if (document.documentElement.getAttribute("data-gender") !== "female") ghost.style.opacity = "0"
      setTimeout(function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost) }, 450)
    }
  }
  var awayAt = 0
  function resumeApp() {
    navBusy = false; sw = null
    if (awayAt && Date.now() - awayAt > 15000) { awayAt = 0; location.reload(); return }
    awayAt = 0
    try { render() } catch (x) { location.reload() }
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) awayAt = Date.now(); else resumeApp() })
  window.addEventListener("pageshow", function (e) { if (e.persisted) location.reload() })
  var sw = null, swipedAt = 0, lastTap = 0
  document.addEventListener("pointerdown", function (e) {
    var el = U.detail && e.target.closest && e.target.closest("#app") && !e.target.closest("textarea, audio, input") ? document.getElementById("slide") : null
    if (!el) { sw = null; return }
    sw = { x: e.clientX, y: e.clientY, dx: 0, t: Date.now(), drag: false, el: el }
  })
  document.addEventListener("pointermove", function (e) {
    if (!sw) return
    var dx = e.clientX - sw.x, dy = e.clientY - sw.y
    if (!sw.drag) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) { sw.drag = true; sw.el.style.transition = "none"; sw.el.style.animation = "none"; try { sw.el.setPointerCapture(e.pointerId) } catch (x) {} }
      else if (Math.abs(dy) > 12) { sw = null; return }
    }
    if (sw && sw.drag) {
      sw.dx = dx
      if (dx < 0) {
        sw.el.style.transform = "translateX(" + dx + "px) rotate(" + dx / 26 + "deg)"
        if (document.documentElement.getAttribute("data-gender") !== "female") sw.el.style.opacity = String(1 - Math.min(Math.abs(dx) / 420, 0.5))
      }
    }
  })
  function swEnd(e) {
    if (!sw) return
    var s = sw; sw = null
    if (!s.drag) {
      if (e.type === "pointerup" && e.target.closest && e.target.closest("#slide") && !e.target.closest("button, a, [data-act], textarea, audio")) {
        var now = Date.now()
        if (now - lastTap < 320) { lastTap = 0; if (!S.favs[U.detail]) setLike(U.detail, true); bigHeart() } else lastTap = now
      }
      return
    }
    swipedAt = Date.now()
    var v = Math.abs(s.dx) / Math.max(1, Date.now() - s.t)
    if (Math.abs(s.dx) > 90 || (v > 0.5 && Math.abs(s.dx) > 40)) navDetail(s.dx < 0 ? 1 : -1)
    else {
      s.el.style.transition = "transform .22s, opacity .22s"; s.el.style.transform = ""; s.el.style.opacity = ""
      setTimeout(function () { s.el.style.transition = "" }, 240)
    }
  }
  var seekEl = null
  function seekTo(e) {
    var r = seekEl.getBoundingClientRect(), f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
    if (seekEl.id === "vseek") { var vid = document.getElementById("vid"); if (vid && vid.duration) { vid.currentTime = f * vid.duration; V.t = vid.currentTime; vUi() } }
    else if (AU.duration) { AU.currentTime = f * AU.duration; audUi() }
  }
  document.addEventListener("pointerdown", function (e) { var t = e.target.closest && e.target.closest("#vseek, #aseek"); if (t) { seekEl = t; seekTo(e); e.stopPropagation() } }, true)
  document.addEventListener("pointermove", function (e) { if (seekEl) seekTo(e) })
  document.addEventListener("pointerup", function () { seekEl = null })
  document.addEventListener("pointerup", swEnd)
  document.addEventListener("pointercancel", swEnd)

  // ====================
  // MEDIA
  // ====================
  function pagerHtml(page, pages, act) {
    var prev = page === 1 ? pages : page - 1
    var next = page === pages ? 1 : page + 1
    return '<div class="pager"><button class="btn small" data-act="' + act + '" data-v="' + prev + '">《</button><span class="pg">' + page + "/" + pages + '</span><button class="btn small" data-act="' + act + '" data-v="' + next + '">》</button></div>'
  }
  // ---------- AUDIO (global pleyer, tab almashganda ham davom etadi)
  var AU = new Audio(), A = { n: 0 }
  AU.preload = "none"
  function fmtT(t) { t = Math.max(0, Math.floor(t || 0)); var m = Math.floor(t / 60), x = t % 60; return m + ":" + (x < 10 ? "0" : "") + x }
  function audUi() {
    var n = A.n || 1, d = D.names[n - 1]
    var b = document.getElementById("apb"); if (b) b.innerHTML = ic(AU.paused ? "play_arrow" : "pause")
    var lb = audLbl(n)
    var t = document.getElementById("apt"); if (t) t.textContent = lb.num + ". " + lb.t
    var ar = document.getElementById("apa"); if (ar) ar.textContent = lb.a
    var p = document.getElementById("app_"), dur = AU.duration || 0
    if (p) p.style.width = dur ? Math.min(100, AU.currentTime * 100 / dur) + "%" : "0%"
    var c1 = document.getElementById("ptc"); if (c1) c1.textContent = fmtT(AU.currentTime)
    var c2 = document.getElementById("ptd"); if (c2) c2.textContent = fmtT(dur)
    var pl = document.getElementById("aplr"); if (pl) pl.classList.toggle("playing", !AU.paused)
    var mn = document.getElementById("mini")
    if (mn && !mn.hidden) {
      mn.classList.toggle("playing", !AU.paused)
      var q1 = document.getElementById("mpt"); if (q1) q1.textContent = lb.num + ". " + lb.t
      var q2 = document.getElementById("mpa"); if (q2) q2.textContent = lb.a
      var q3 = document.getElementById("mpb"); if (q3) q3.innerHTML = ic(AU.paused ? "play_arrow" : "pause")
      var q4 = document.getElementById("mpu"); if (q4) q4.style.width = dur ? Math.min(100, AU.currentTime * 100 / dur) + "%" : "0%"
    }
    var cur = document.querySelectorAll("[data-act=aud].cur"), i
    for (i = 0; i < cur.length; i++) cur[i].classList.remove("cur", "play")
    var now = document.querySelector("[data-act=aud][data-v='" + audStart(A.n || 1) + "']")
    if (now) { now.classList.add("cur"); if (!AU.paused) now.classList.add("play") }
  }
  function miniSync() {
    var want = !!U.audMini && !U.detail, m = document.getElementById("mini")
    document.body.classList.toggle("hasmini", want)
    if (!want) { if (m) m.hidden = true; return }
    var n = A.n || 1, d = D.names[n - 1]
    if (!m) { m = document.createElement("div"); m.id = "mini"; m.className = "mini"; m.setAttribute("data-act", "audOpen"); document.body.appendChild(m) }
    m.innerHTML = '<div class="mdisc"><i class="plg"></i></div><div class="mtx"><b id="mpt">' + audLbl(n).num + ". " + esc(audLbl(n).t) + '</b><span id="mpa" class="apa">' + audLbl(n).a + '</span></div>' +
      '<button data-act="audPrev" aria-label="prev">' + ic("skip_previous") + '</button><button id="mpb" class="mpb" data-act="audToggle" aria-label="play">' + ic(AU.paused ? "play_arrow" : "pause") + '</button><button data-act="audNext" aria-label="next">' + ic("skip_next") + '</button><i class="mpr"><u id="mpu"></u></i>'
    m.hidden = false; m.classList.toggle("playing", !AU.paused)
    audUi()
  }
  // bitta fayl bir necha ismga xizmat qilsa (24-25), ular birga ko'rsatiladi
  function audStart(n) { var u = audioUrl(n); while (n > 1 && audioUrl(n - 1) === u) n--; return n }
  function audEnd(n) { var u = audioUrl(n); while (n < 99 && audioUrl(n + 1) === u) n++; return n }
  function audLbl(n) {
    var s = audStart(n), e = audEnd(n), a = D.names[s - 1], b = D.names[e - 1]
    if (s === e) return { num: String(s), t: a.t, a: a.a, s: s, e: e }
    return { num: s + "\u2013" + e, t: a.t + " \u00b7 " + b.t, a: a.a + " \u00b7 " + b.a, s: s, e: e }
  }
  function audStep(dir) {
    var cur = A.n || (dir > 0 ? 0 : 1), n = cur, u = cur ? audioUrl(cur) : "", c = 0
    do { n += dir; if (n > 99) n = 1; if (n < 1) n = 99; c++ } while (c < 99 && u && audioUrl(n) === u)
    audPlay(n)
  }
  function audPlay(n) {
    if (PV.ctx && PV.ctx.state === "suspended") { try { PV.ctx.resume() } catch (e) {} }
    if (A.n === n) { if (AU.paused) { var r = AU.play(); if (r && r.catch) r.catch(function () {}) } else AU.pause(); audUi(); return }
    A.n = n; AU.src = audioUrl(n)
    pvHook()
    var r2 = AU.play(); if (r2 && r2.catch) r2.catch(function () {})
    audUi()
    var row = document.querySelector("[data-act=aud][data-v='" + n + "']")
    if (row && row.scrollIntoView && U.tab === "media") { /* ro'yxat o'zi turadi */ }
  }
  ;["timeupdate", "play", "pause", "loadedmetadata", "durationchange"].forEach(function (e) { AU.addEventListener(e, audUi) })
  AU.addEventListener("ended", function () { audStep(1) })
  AU.addEventListener("error", function () { if (A.n) toast(tr("no_audio")) })
  // ---------- Jonli vizual (ovoz tahlili: WebAudio; bo'lmasa taqlid)
  var PV = { ctx: null, an: null, data: null, hooked: false, fail: false, e: [0, 0, 0, 0, 0], bv: [], t: 0, raf: 0, col: [217, 98, 140], cc: 0, idle: false }
  function pvHook() {
    if (PV.hooked || PV.fail) return
    try {
      var AC = window.AudioContext || window.webkitAudioContext
      if (!AC || location.origin === "null") { PV.fail = true; return }
      var u = new URL(AU.src || "", location.href)
      if (u.origin !== location.origin) { PV.fail = true; return }
      PV.ctx = new AC()
      var src = PV.ctx.createMediaElementSource(AU)
      PV.an = PV.ctx.createAnalyser(); PV.an.fftSize = 256; PV.an.smoothingTimeConstant = .72
      src.connect(PV.an); PV.an.connect(PV.ctx.destination)
      PV.data = new Uint8Array(PV.an.frequencyBinCount); PV.hooked = true
      if (PV.ctx.state === "suspended") PV.ctx.resume()
    } catch (e) { PV.fail = true }
  }
  function pvStart() {
    cancelAnimationFrame(PV.raf)
    var cv = document.getElementById("pcv")
    if (!cv || !cv.getContext) return
    var W = cv.clientWidth || 300, dpr = Math.min(2, window.devicePixelRatio || 1), last = 0
    cv.width = W * dpr; cv.height = W * dpr
    var cv0 = document.getElementById("pcv0"), g0 = cv0 ? cv0.getContext("2d") : null
    if (cv0) { cv0.width = W * dpr; cv0.height = W * dpr }
    var g = cv.getContext("2d"), NB = 64
    var cw = document.getElementById("pcw"), gw = cw ? cw.getContext("2d") : null
    if (cw) { cw.width = W * dpr; cw.height = W * dpr }
    PV.idle = false
    function frame(ts) {
      if (document.getElementById("pcv") !== cv) return
      PV.raf = requestAnimationFrame(frame)
      if (document.hidden || ts - last < 30) return
      var dt = last ? Math.min(.1, (ts - last) / 1000) : .03; last = ts; PV.t += dt
      if (!PV.cc--) { PV.cc = 40; var m = /(\d+)\D+(\d+)\D+(\d+)/.exec(getComputedStyle(cv).color); if (m) PV.col = [+m[1], +m[2], +m[3]] }
      var playing = !AU.paused && !AU.ended, e = PV.e, tg = [0, 0, 0, 0, 0], i, d = null
      if (playing) {
        if (PV.hooked && PV.ctx.state === "running") {
          PV.an.getByteFrequencyData(PV.data); d = PV.data
          var R = [[0, 2], [3, 6], [7, 14], [15, 35], [36, 90]]
          for (i = 0; i < 5; i++) { var sm = 0, cn = 0; for (var k = R[i][0]; k <= R[i][1] && k < d.length; k++) { sm += d[k]; cn++ } tg[i] = Math.min(1, Math.pow(sm / cn / 255, 1.1) * 1.55) }
        } else {
          for (i = 0; i < 5; i++) tg[i] = .3 + .32 * Math.abs(Math.sin(PV.t * (1.3 + .41 * i) + i * 1.9)) * (.65 + .35 * Math.sin(PV.t * .7 + i))
        }
      }
      var still = true
      for (i = 0; i < 5; i++) { e[i] += (tg[i] - e[i]) * (tg[i] > e[i] ? .5 : .1); if (e[i] > .01) still = false }
      if (still && !playing) { if (PV.idle) return; PV.idle = true } else PV.idle = false
      var S2 = W / 300, c = PV.col, cx = 150, cy = 150
      function rgba(a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")" }
      g.setTransform(dpr * S2, 0, 0, dpr * S2, 0, 0)
      g.clearRect(0, 0, 300, 300)
      // to'lqin radiusi: sukunatda doira chetiga yopishadi, musiqada kengayadi
      var ea = (e[0] + e[1] + e[2] + e[3] + e[4]) / 5, RB = 71 + ea * 40, pts = []
      for (var q = 0; q <= 120; q++) {
        var th = q / 120 * 6.2832, rv = RB
        for (var k2 = 0; k2 < 5; k2++) rv += e[k2] * 7 * Math.sin((k2 + 2) * th + PV.t * (.7 + .25 * k2) * (k2 % 2 ? 1 : -1) + k2)
        rv = Math.max(71, Math.min(112, rv))
        pts[q] = [cx + Math.cos(th) * rv, cy + Math.sin(th) * rv]
      }
      // eng orqa fon: 5 ta yumaloq nur erkin suzib yuradi
      if (g0) {
        g0.setTransform(dpr * S2, 0, 0, dpr * S2, 0, 0); g0.clearRect(0, 0, 300, 300)
        for (i = 0; i < 5; i++) {
          var px = cx + 100 * Math.sin(PV.t * (.17 + .05 * i) + i * 1.7) * Math.cos(PV.t * .09 + i), py = cy + 100 * Math.cos(PV.t * (.13 + .043 * i) + i * 2.3) * Math.sin(PV.t * .07 + i * .8 + 1), rr = 30 + e[i] * 46
          var gr = g0.createRadialGradient(px, py, 0, px, py, rr)
          gr.addColorStop(0, rgba(.36 + e[i] * .55)); gr.addColorStop(1, rgba(0))
          g0.fillStyle = gr; g0.beginPath(); g0.arc(px, py, rr, 0, 6.2832); g0.fill()
        }
      }
      // nur chiziqlari (pastki qatlam, uzunligi chegaralangan)
      var segs = []
      g.lineCap = "round"; g.lineWidth = 3.2; g.strokeStyle = rgba(.98)
      for (i = 0; i < NB; i++) {
        var mm = Math.abs(i - NB / 2) / (NB / 2), v
        if (d) { var bi = Math.min(d.length - 1, 1 + Math.floor(Math.pow(mm, 1.25) * 70)); v = d[bi] / 255 * 1.25 }
        else { var fp = mm * 4, f0 = Math.floor(fp), f1 = Math.min(4, f0 + 1); v = (e[f0] + (e[f1] - e[f0]) * (fp - f0)) * (.75 + .25 * Math.sin(i * .9 + PV.t * 5)) }
        v = Math.min(1, Math.max(0, v))
        PV.bv[i] = (PV.bv[i] || 0) + (v - (PV.bv[i] || 0)) * (v > (PV.bv[i] || 0) ? .6 : .2)
        var an = i / NB * 6.2832 - 1.5708, r0 = 74, r1 = Math.min(128, r0 + 4 + PV.bv[i] * 52)
        segs[i] = [cx + Math.cos(an) * r0, cy + Math.sin(an) * r0, cx + Math.cos(an) * r1, cy + Math.sin(an) * r1]
        g.beginPath(); g.moveTo(segs[i][0], segs[i][1]); g.lineTo(segs[i][2], segs[i][3]); g.stroke()
      }
      // chiziqlar ustida: to'lqin ichida chiziqlar xira (yumshoq) ko'rinadi + shisha qoplama
      g.save(); g.beginPath()
      for (var z = 0; z < pts.length; z++) { if (z) g.lineTo(pts[z][0], pts[z][1]); else g.moveTo(pts[z][0], pts[z][1]) }
      g.closePath(); g.clip(); g.clearRect(0, 0, 300, 300)
      var pass = [[13, .1], [8, .16], [4.5, .3]]
      for (var ps = 0; ps < pass.length; ps++) {
        g.lineWidth = pass[ps][0]; g.strokeStyle = rgba(pass[ps][1])
        for (i = 0; i < NB; i++) { g.beginPath(); g.moveTo(segs[i][0], segs[i][1]); g.lineTo(segs[i][2], segs[i][3]); g.stroke() }
      }
      var gg = g.createRadialGradient(cx, cy, 70, cx, cy, 116)
      gg.addColorStop(0, "rgba(255,255,255,.3)"); gg.addColorStop(1, "rgba(255,255,255,.07)")
      g.fillStyle = gg; g.fillRect(0, 0, 300, 300)
      g.restore()
      if (gw) {
        gw.setTransform(dpr * S2, 0, 0, dpr * S2, 0, 0); gw.clearRect(0, 0, 300, 300)
        gw.beginPath(); for (var z2 = 0; z2 < pts.length; z2++) { if (z2) gw.lineTo(pts[z2][0], pts[z2][1]); else gw.moveTo(pts[z2][0], pts[z2][1]) }
        gw.closePath(); gw.strokeStyle = "rgba(255,255,255,.8)"; gw.lineWidth = 1.8; gw.stroke()
      }
    }
    PV.raf = requestAnimationFrame(frame)
  }
  function audioView() {
    var n = A.n || 1, grid = S.audView === "grid", d = D.names[n - 1]
    var h = U.audMini ? "" : '<div id="aplr" class="aplayer pro card' + (AU.paused ? "" : " playing") + '"><div class="pcv"><canvas id="pcv0"></canvas><canvas id="pcv"></canvas><canvas id="pcw"></canvas><div class="pdisc"><i class="plg"></i></div></div>' +
      '<div class="ptitle"><div id="apt" class="pt1">' + audLbl(n).num + ". " + esc(audLbl(n).t) + '</div><div id="apa" class="apa">' + audLbl(n).a + '</div></div>' +
      '<div class="pseek"><span id="ptc" class="ptm">0:00</span><div id="aseek" class="aseek"><i id="app_"></i></div><span id="ptd" class="ptm">0:00</span></div>' +
      '<div class="pctl"><button data-act="audPrev" aria-label="prev">' + ic("skip_previous") + '</button><button id="apb" class="apb" data-act="audToggle" aria-label="play">' + ic(AU.paused ? "play_arrow" : "pause") + '</button><button data-act="audNext" aria-label="next">' + ic("skip_next") + '</button><button class="pmin" data-act="audMin" aria-label="minimize">' + ic("expand_more") + "</button></div></div>"
    h += '<div class="audhead"><span>' + ic("graphic_eq") + " 99 · " + esc(tr("audio")) + '</span><div class="vseg"><button class="' + (grid ? "on" : "") + '" data-act="audView" data-v="grid" aria-label="grid">' + ic("apps") + '</button><button class="' + (grid ? "" : "on") + '" data-act="audView" data-v="list" aria-label="list">' + ic("lists") + "</button></div></div>"
    if (grid) {
      h += '<div class="grid3">'
      for (var i = 1; i <= 99; i = audEnd(i) + 1) {
        var lg = audLbl(i), cu = A.n && audStart(A.n) === i
        h += '<button class="name-card' + (cu ? " cur" + (AU.paused ? "" : " play") : "") + '" data-act="aud" data-v="' + i + '"><span class="num">' + lg.num + '</span><div class="ar">' + lg.a + '</div><div class="tr">' + esc(lg.t) + "</div></button>"
      }
      return h + "</div>"
    }
    h += '<div class="alist">'
    for (var jj = 1; jj <= 99; jj = audEnd(jj) + 1) {
      var lj = audLbl(jj), cj = A.n && audStart(A.n) === jj
      h += '<button class="arow' + (cj ? " cur" + (AU.paused ? "" : " play") : "") + '" data-act="aud" data-v="' + jj + '"><span class="an">' + lj.num + '</span><span class="at">' + esc(lj.t) + '</span><span class="aa">' + lj.a + "</span>" + ic("graphic_eq", "eq") + "</button>"
    }
    return h + "</div>"
  }
  // ---------- VIDEO (YouTube kabi: avto sifat, sahifa ichida)
  var V = { i: -1, q: "auto", cur: 0, t: 0, stalls: [], timer: 0 }
  function vList() { return CFG.VIDEOS || [] }
  function vQs(v) { var k = Object.keys(v.src || {}).map(Number).sort(function (a, b) { return b - a }); return k }
  function vSpeed() {
    var c = navigator.connection || navigator.mozConnection || {}
    var d = c.downlink || 5
    if (c.saveData) d = Math.min(d, 1.5)
    return d
  }
  function vNeed(q) { return q >= 1080 ? 6 : q >= 720 ? 3 : q >= 480 ? 1.6 : 0.8 }
  function vAuto(v) {
    var qs = vQs(v), sp = vSpeed()
    for (var i = 0; i < qs.length; i++) if (sp >= vNeed(qs[i])) return qs[i]
    return qs[qs.length - 1]
  }
  function vSet(q, keep) {
    var vid = document.getElementById("vid"), v = vList()[V.i]
    if (!vid || !v || !v.src[q]) return
    var t = keep ? vid.currentTime : (V.t || 0), was = keep ? !vid.paused : false
    V.cur = q; vid.src = v.src[q]
    vid.addEventListener("loadedmetadata", function f() { vid.removeEventListener("loadedmetadata", f); if (t) try { vid.currentTime = t } catch (e) {} ; if (was) { var r = vid.play(); if (r && r.catch) r.catch(function () {}) } })
    vqUi()
  }
  function vqUi() {
    var b = document.getElementById("vqb"); if (b) b.textContent = (V.q === "auto" ? "Auto · " : "") + V.cur + "p"
  }
  function vUi() {
    var vid = document.getElementById("vid"); if (!vid) return
    var d = vid.duration || 0
    var pb = document.getElementById("vpb"); if (pb) pb.innerHTML = ic(vid.paused ? "play_arrow" : "pause")
    var big = document.getElementById("vbig"); if (big) big.classList.toggle("hide", !vid.paused)
    var ps = document.getElementById("vpos"); if (ps) ps.style.width = d ? vid.currentTime * 100 / d + "%" : "0%"
    var bf = document.getElementById("vbuf"); if (bf) { var e = 0; try { for (var i = 0; i < vid.buffered.length; i++) if (vid.buffered.start(i) <= vid.currentTime + .5) e = vid.buffered.end(i) } catch (x) {} bf.style.width = d ? e * 100 / d + "%" : "0%" }
    var tc = document.getElementById("vtc"); if (tc) tc.textContent = fmtT(vid.currentTime) + " / " + fmtT(d)
    var sp = document.getElementById("vsp"); if (sp) sp.classList.toggle("on", vid.readyState < 3 && !vid.paused)
    V.t = vid.currentTime
  }
  function vAhead(vid) { try { for (var i = 0; i < vid.buffered.length; i++) if (vid.buffered.start(i) <= vid.currentTime + .5) return vid.buffered.end(i) - vid.currentTime } catch (e) {} return 0 }
  function vAdapt() {
    var vid = document.getElementById("vid"), v = vList()[V.i]
    if (!vid) { clearInterval(V.timer); V.timer = 0; return }
    if (V.q !== "auto" || !v || vid.paused) return
    var qs = vQs(v), k = qs.indexOf(V.cur), now = Date.now()
    V.stalls = V.stalls.filter(function (x) { return now - x < 40000 })
    if (V.stalls.length >= 2 && k < qs.length - 1) { V.stalls = []; V.last = now; vSet(qs[k + 1], true); return }
    if (k > 0 && vAhead(vid) > 25 && !V.stalls.length && now - (V.last || 0) > 45000 && vSpeed() >= vNeed(qs[k - 1]) * 1.3) { V.last = now; vSet(qs[k - 1], true) }
  }
  function mediaInit() {
    var vid = document.getElementById("vid")
    if (!vid) { if (V.timer) { clearInterval(V.timer); V.timer = 0 } audUi(); pvStart(); return }
    var v = vList()[V.i]; if (!v) return
    V.cur = V.q === "auto" ? vAuto(v) : (v.src[V.q] ? +V.q : vAuto(v))
    vid.preload = "auto"; vid.src = v.src[V.cur]; if (v.poster) vid.poster = v.poster
    vid.addEventListener("loadedmetadata", function () { if (V.t) try { vid.currentTime = V.t } catch (e) {}; vUi() }, { once: true })
    ;["timeupdate", "play", "pause", "progress", "durationchange", "canplay", "playing"].forEach(function (e) { vid.addEventListener(e, vUi) })
    vid.addEventListener("waiting", function () { if (!vid.seeking) V.stalls.push(Date.now()); vUi() })
    vid.addEventListener("ended", function () { vUi() })
    if (V.timer) clearInterval(V.timer)
    V.timer = setInterval(vAdapt, 4000)
    vqUi(); vUi()
  }
  function vTitle(v, i) { var t = v.t; if (t && typeof t === "object") t = t[S.lang] || t.en || t.uz; return t || (tr("video") + " " + (i + 1)) }
  function videoView() {
    var list = vList()
    if (!list.length) return '<p class="empty">' + ic("movie") + " " + esc(tr("no_video")) + "<br><small>config.js → VIDEOS</small></p>"
    var h = ""
    if (V.i >= 0 && list[V.i] && list[V.i].tg) {
      var tgp = String(list[V.i].tg).replace(/^https?:\/\/t\.me\//, "").replace(/^\//, "")
      h += '<div class="vp vtgp"><iframe src="https://t.me/' + esc(tgp) + '?embed=1&mode=tme&dark=' + (effTheme() === "dark" ? 1 : 0) + '" allowfullscreen loading="lazy"></iframe></div><div class="vtitle">' + esc(vTitle(list[V.i], V.i)) + "</div>"
    } else if (V.i >= 0 && list[V.i]) {
      var v = list[V.i], qs = vQs(v), menu = '<button data-act="vqset" data-v="auto"' + (V.q === "auto" ? ' class="on"' : "") + ">Auto</button>"
      for (var k = 0; k < qs.length; k++) menu += '<button data-act="vqset" data-v="' + qs[k] + '"' + (String(V.q) === String(qs[k]) ? ' class="on"' : "") + ">" + qs[k] + "p</button>"
      h += '<div class="vp" id="vp"><video id="vid" playsinline webkit-playsinline preload="auto"></video><div id="vbig" class="vbig" data-act="vplay">' + ic("play_arrow") + '</div><div id="vsp" class="vspin"></div>' +
        '<div class="vctl"><button id="vpb" data-act="vplay">' + ic("play_arrow") + '</button><div id="vseek" class="vseek"><i id="vbuf"></i><i id="vpos"></i></div><span id="vtc" class="vtc">0:00 / 0:00</span>' + (qs.length > 1 ? '<button id="vqb" class="vqb" data-act="vq"></button>' : "") + '<button data-act="vfs">' + ic("fullscreen") + '</button></div>' +
        '<div id="vmenu" class="vmenu" hidden><div class="vmt">' + esc(tr("quality")) + "</div>" + menu + "</div></div>" +
        '<div class="vtitle">' + esc(vTitle(v, V.i)) + "</div>"
    }
    h += '<div class="vlist">'
    for (var i = 0; i < list.length; i++) h += '<button class="vcard' + (i === V.i ? " cur" : "") + '" data-act="vsel" data-v="' + i + '"><span class="vth"' + (list[i].poster ? ' style="background-image:url(' + esc(list[i].poster) + ')"' : "") + ">" + ic("play_arrow") + '</span><span class="vtt">' + esc(vTitle(list[i], i)) + "</span></button>"
    return h + "</div>"
  }
  function viewMedia() {
    var h = '<div class="mhead"><h1>' + ic("movie") + " " + esc(tr("nav_media")) + '</h1><div class="vseg mseg"><button class="' + (U.mode === "video" ? "on" : "") + '" data-act="mode" data-v="video">' + ic("movie") + "<span>" + esc(tr("video")) + '</span></button>' +
      '<button class="' + (U.mode === "audio" ? "on" : "") + '" data-act="mode" data-v="audio">' + ic("music_note") + "<span>" + esc(tr("audio")) + "</span></button></div></div>"
    return h + (U.mode === "video" ? videoView() : audioView())
  }

  // ====================
  // MOOD
  // ====================
  // kayfiyat -> [ikonka, rang guruhi]
  var MOODIC = {
    "001": ["sentiment_very_satisfied", "pos"], "002": ["mood", "pos"], "004": ["sentiment_satisfied", "pos"], "005": ["emoji_events", "pos"],
    "010": ["eco", "calm"], "011": ["nightlight", "calm"], "012": ["volunteer_activism", "pos"], "013": ["auto_awesome", "pos"],
    "017": ["favorite", "love"], "019": ["thumb_up", "pos"], "021": ["wb_twilight", "calm"], "025": ["air", "calm"],
    "026": ["sentiment_neutral", "neu"], "027": ["balance", "neu"], "030": ["bedtime", "neu"], "031": ["battery_alert", "neu"],
    "033": ["hourglass_empty", "neu"], "034": ["help", "neu"], "035": ["psychology", "neu"], "038": ["trending_down", "sad"],
    "039": ["sentiment_dissatisfied", "sad"], "041": ["warning", "fear"], "042": ["mood_bad", "fear"], "045": ["water_drop", "sad"],
    "047": ["heart_broken", "love"], "050": ["sentiment_very_dissatisfied", "sad"], "056": ["radio_button_unchecked", "sad"], "058": ["compress", "fear"],
    "061": ["local_fire_department", "ang"], "062": ["whatshot", "ang"], "075": ["block", "sad"], "076": ["visibility_off", "fear"],
    "077": ["mail", "love"], "080": ["shield", "fear"], "082": ["pan_tool", "fear"], "086": ["undo", "rep"],
    "087": ["cleaning_services", "rep"], "088": ["restart_alt", "rep"], "089": ["handshake", "rep"], "091": ["cloud", "sad"],
    "092": ["group_off", "ang"], "093": ["voice_over_off", "sad"], "094": ["person", "sad"], "097": ["tornado", "fear"], "098": ["timer_off", "ang"]
  }
  function moodIc(id, big) {
    var m = MOODIC[id] || ["mood", "pos"]
    return '<span class="mi t-' + m[1] + (big ? " big" : "") + '">' + ic(m[0]) + "</span>"
  }
  function viewMood() {
    if (U.moodPick) {
      var m = null
      for (var i = 0; i < D.moods.length; i++) if (D.moods[i].id === U.moodPick) m = D.moods[i]
      var h = '<div class="card center stack">' + moodIc(m.id, true) + "<h1>" + esc(pick(m.l)) + "</h1>" +
        '<div class="sub">' + esc(tr("mood_times")) + ": " + ((S.moodHist[m.id] || {}).count || 1) + "×</div></div>" +
        '<h1 style="margin-top:18px">' + ic("auto_awesome", "hico") + " " + esc(tr("mood_names")) + '</h1><div class="chips">'
      for (var j = 0; j < m.n.length; j++) {
        h += '<button class="chip" data-act="open" data-v="' + m.n[j] + '">' + D.names[m.n[j] - 1].a + " · " + esc(D.names[m.n[j] - 1].t) + "</button>"
      }
      return h + '</div><button class="btn block" style="margin-top:18px" data-act="moodAgain">' + ic("restart_alt") + " " + esc(tr("mood_again")) + "</button>"
    }
    var g = '<h1>' + ic("mood", "hico") + " " + esc(tr("nav_mood")) + '</h1><p class="sub">' + esc(tr("mood_title")) + '</p><div class="moodgrid' + (U.moodOpen ? " open" : "") + '" id="moodgrid"><div class="grid3">'
    for (var k = 0; k < D.moods.length; k++) {
      g += '<button class="mood-card" data-act="mood" data-v="' + D.moods[k].id + '">' + moodIc(D.moods[k].id) + '<span class="lb">' + esc(pick(D.moods[k].l)) + "</span></button>"
    }
    return g + '</div></div><button class="btn block moodtog" data-act="moodToggle">' + ic(U.moodOpen ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.moodOpen ? "mood_less" : "mood_all")) + "</span></button>"
  }

  // ====================
  // DAILY
  // ====================
  function dailyTick() {
    var ds = S.daily
    if (!ds || !ds.target) return
    if (ds.mode === "free") { ds.lastCheckedDate = todayStr(); ds.todayDone = false; ds.owedDays = 0; return }
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
  var R = 2.9                        // qum donasi radiusi
  var NECK = 4.6                     // bo'yincha yarim kengligi
  var HC = 100, HT = 47, HB = 253, HM = 150, HNS = 64
  var HDY = (HB - HT) / HNS
  var GATE_Y = 145                   // "eshik": har bosishda faqat kerakli miqdordagi dona o'tkaziladi
  var WL = [], WR = []

  // shisha profili: yuqori/pastki to'p + silliq bo'yincha
  function hwAt(y) {
    var d = Math.abs(y - HM)
    if (d > 103) d = 103
    var v = (d - 68) / 68, e = 58 * Math.sqrt(Math.max(0, 1 - v * v))
    return Math.sqrt(NECK * NECK + e * e)
  }
  for (var hk = 0; hk <= HNS; hk++) { var hy = HT + hk * HDY, hh = hwAt(hy); WL.push([HC - hh, hy]); WR.push([HC + hh, hy]) }

  function simStep(s) {
    var G = s.g, n = G.length, i, j, p, q, maxv = 0
    if (s.wake > 0) s.wake--
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
        if (p.y < HT + R - 1.5) p.y = HT + R - 1.5
        if (p.y > HB - R + 1.5) { p.y = HB - R + 1.5; p.t = true }
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
      if (p.t && mv < 0.11 && !(s.wake > 0) && (s.allow <= 0 || p.crossed)) { p.px = p.x; p.py = p.y; mv = 0 }
      if (mv > maxv) maxv = mv
    }
    s.maxv = maxv
  }

  function simBuild(fallen) {
    var s = { g: [], allow: 0, crossed: 0, stall: 0, maxv: 1, rest: 0, raf: 0, els: null, sps: null, spi: [], onIdle: null }
    var cand = [], sp = 6.2, rowH = sp * 0.866
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
    s.spi = idx.slice(0, 6)
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
    s.crossed = 0; s.allow = fallen; s.stall = 0; s.maxv = 1; s.rest = 0; s.wake = 360
  }

  function hgFallen(ds) {
    if (ds.todayDone) return 100
    return Math.max(0, Math.min(100, Math.floor((ds.draft || 0) * 100 / ds.target)))
  }

  // ---- SVG tuzilma yordamchilari ----
  function f2(n) { return n.toFixed(2) }
  function arcPts(inset, k) {
    var o = [], w = hwAt(HB) - inset, ry = 4.6 - inset * 0.5, t, N = 14
    for (var i = 1; i < N; i++) { t = Math.PI * i / N; o.push(f2(k * (HC - w * Math.cos(t))) + " " + f2(k * (HB + ry * Math.sin(t)))) }
    return o
  }
  function glassPath(inset) {
    var a = [], b = [], N = 96, i, y, h
    for (i = 0; i <= N; i++) { y = HT + i * (HB - HT) / N; h = hwAt(y) - inset; a.push(f2(HC - h) + " " + f2(y)); b.push(f2(HC + h) + " " + f2(y)) }
    return "M" + a.join("L") + "L" + arcPts(inset, 1).join("L") + "L" + b.reverse().join("L") + "Z"
  }
  function edgePath(side, y0, y1, inset) {
    var pts = []
    for (var y = y0; y <= y1; y += 3) pts.push(f2(HC + side * (hwAt(y) - inset)) + " " + f2(y))
    return "M" + pts.join("L")
  }
  function glassPx(k) {
    var a = [], b = [], N = 96, i, y, h
    for (i = 0; i <= N; i++) { y = HT + i * (HB - HT) / N; h = hwAt(y); a.push(f2(k * (HC - h)) + " " + f2(k * y)); b.push(f2(k * (HC + h)) + " " + f2(k * y)) }
    return "M" + a.join("L") + "L" + arcPts(0, k).join("L") + "L" + b.reverse().join("L") + "Z"
  }
  function baseArc(inset) { return "M" + (f2(HC - hwAt(HB) + inset) + " " + f2(HB)) + "L" + arcPts(inset, 1).join("L") + "L" + f2(HC + hwAt(HB) - inset) + " " + f2(HB) }
  var HG_BACK = "", HG_FRONT = "", HG_CLIP = ""
  function capTop() {
    return '<path d="M42 37 L42 46 A58 8 0 0 0 158 46 L158 37 Z" fill="url(#hgCapSide)"/>' +
      '<path d="M44 40 A56 7 0 0 0 156 40" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.2" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="37" rx="58" ry="8" fill="url(#hgCapFace)" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>' +
      '<ellipse cx="100" cy="37.6" rx="47" ry="5.2" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="1"/>' +
      '<path d="M58 34.2 Q100 29.6 142 34.2" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.5" stroke-linecap="round"/>'
  }
  function capBottom() {
    return '<path d="M42 253 L42 262 A58 8 0 0 0 158 262 L158 253 Z" fill="url(#hgCapSide)"/>' +
      '<ellipse cx="100" cy="253" rx="58" ry="8" fill="url(#hgCapFace)" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>' +
      '<ellipse cx="100" cy="253.6" rx="47" ry="5.2" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="1"/>' +
      '<path d="M58 250.2 Q100 245.6 142 250.2" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.5" stroke-linecap="round"/>'
  }
  function hgStatic() {
    if (HG_BACK) return
    var defs = '<defs>' +
      '<linearGradient id="hgGlass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient>' +
      '<linearGradient id="hgSand" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="' + HT + '" y2="' + HB + '"><stop offset="0" style="stop-color:var(--s1)"/><stop offset=".5" style="stop-color:var(--s2)"/><stop offset="1" style="stop-color:var(--s1)"/></linearGradient>' +
      '<linearGradient id="hgRim" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity=".95"/></linearGradient>' +
      '<linearGradient id="hgCapFace" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#9df0cd" stop-opacity=".92"/><stop offset="1" stop-color="#2fb487" stop-opacity=".92"/></linearGradient>' +
      '<linearGradient id="hgCapSide" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#1f8f6a" stop-opacity=".95"/><stop offset=".35" stop-color="#4fcfa1" stop-opacity=".95"/><stop offset="1" stop-color="#157a5b" stop-opacity=".95"/></linearGradient>' +
      '<radialGradient id="hgBodyT" gradientUnits="userSpaceOnUse" cx="76" cy="96" r="78"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".45" stop-color="#e9fff6" stop-opacity=".14"/><stop offset="1" stop-color="#0b6a50" stop-opacity=".42"/></radialGradient>' +
      '<radialGradient id="hgBodyB" gradientUnits="userSpaceOnUse" cx="76" cy="204" r="78"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".45" stop-color="#e9fff6" stop-opacity=".14"/><stop offset="1" stop-color="#0b6a50" stop-opacity=".42"/></radialGradient>' +
      '<linearGradient id="hgWin" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="hgShade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".38" stop-color="#fff" stop-opacity=".02"/><stop offset=".72" stop-color="#00382a" stop-opacity=".06"/><stop offset="1" stop-color="#00382a" stop-opacity=".34"/></linearGradient>' +
      '<radialGradient id="hgFloor"><stop offset="0" stop-color="#00382a" stop-opacity=".42"/><stop offset="1" stop-color="#00382a" stop-opacity="0"/></radialGradient>' +
      '<filter id="hgBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4"/></filter>' +
      '<clipPath id="hgClip"><path d="' + glassPath(0.6) + '"/></clipPath>' +
      '<filter id="hgGoo" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="300" color-interpolation-filters="sRGB">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="1.3" result="b"/>' +
      '<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="g"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="4" result="n"/>' +
      '<feColorMatrix in="n" type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1" result="ng"/>' +
      '<feComposite in="g" in2="ng" operator="arithmetic" k1=".4" k2=".86" k3="0" k4="0" result="gt"/>' +
      '<feComposite in="gt" in2="g" operator="in"/></filter></defs>'
    HG_BACK = defs + '<ellipse cx="100" cy="273" rx="66" ry="9" fill="url(#hgFloor)"/>' + '<path d="' + glassPath(0) + '" fill="url(#hgGlass)"/>' + capBottom()
    HG_FRONT = '<g clip-path="url(#hgClip)"><rect x="40" y="44" width="120" height="106" fill="url(#hgBodyT)"/><rect x="40" y="150" width="120" height="116" fill="url(#hgBodyB)"/>' +
      '<path d="' + glassPath(0) + '" fill="none" stroke="#06503c" stroke-opacity=".55" stroke-width="5" filter="url(#hgBlur)"/>' +
      '<path d="' + glassPath(0) + '" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="9" filter="url(#hgBlur)" transform="translate(-1.5 0)"/></g>' +
      '<path d="M63 82 Q57 104 64 128 L71 126 Q65 104 69 84Z" fill="url(#hgWin)" opacity=".8"/>' +
      '<path d="M131 190 Q137 168 130 148 L123 150 Q129 168 125 188Z" fill="url(#hgWin)" opacity=".65" transform="rotate(180 128 169)"/>' +
      '<path d="M76 70 Q96 63 124 70" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M76 230 Q100 237 124 230" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="66" cy="76" r="2.4" fill="#fff"/><circle cx="134" cy="224" r="2.4" fill="#fff"/><circle cx="72" cy="70" r="1.2" fill="#fff"/>' +
      '<path d="' + baseArc(0) + '" fill="none" stroke="#04523d" stroke-opacity=".35" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="' + baseArc(1.6) + '" fill="none" stroke="#fff" stroke-opacity=".95" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 44, 253, 0) + '" fill="none" stroke="#04523d" stroke-opacity=".35" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 44, 253, 0) + '" fill="none" stroke="#04523d" stroke-opacity=".35" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 44, 253, 1.6) + '" fill="none" stroke="#fff" stroke-opacity=".95" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 44, 253, 1.6) + '" fill="none" stroke="#fff" stroke-opacity=".95" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 44, 253, 4) + '" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 44, 253, 4) + '" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="' + edgePath(-1, 84, 134, 5.5) + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path d="' + edgePath(1, 166, 216, 5.5) + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/>' +
      capTop()
    var uri = "url('data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 264"><path d="' + glassPx(0.88) + '"/></svg>').replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29") + "')"
    HG_CLIP = "-webkit-mask:" + uri + " center/100% 100% no-repeat;mask:" + uri + " center/100% 100% no-repeat"
  }
  function hgSvg(fallen) {
    if (hgFlip && SIM) hgMirror(SIM, fallen)
    else if (!SIM || SIM.crossed + SIM.allow !== fallen) simBuild(fallen)
    hgFlip = false
    hgStatic()
    var h = '<div class="hgw"><div class="hgfrost" style="' + HG_CLIP + '"></div><svg id="hgsvg" class="hg" viewBox="0 0 200 300" aria-hidden="true">' + HG_BACK +
      '<g clip-path="url(#hgClip)"><g filter="url(#hgGoo)">', i, p
    for (i = 0; i < 100; i++) {
      p = SIM.g[i]
      h += '<circle class="sg" cx="' + f2(p.x) + '" cy="' + f2(p.y) + '" r="' + f2(R * 1.2) + '" fill="url(#hgSand)"/>'
    }
    h += '</g><g>'
    for (i = 0; i < SIM.spi.length; i++) {
      p = SIM.g[SIM.spi[i]]
      h += '<g class="spg" transform="translate(' + f2(p.x) + " " + f2(p.y) + ')"><path class="spk" style="--t:' + (1.6 + Math.random() * 1.8).toFixed(2) + "s;--dl:-" + (Math.random() * 3).toFixed(2) + "s;--sc:" + (0.7 + Math.random() * 0.7).toFixed(2) + '" d="M0 -3 L.8 -.8 L3 0 L.8 .8 L0 3 L-.8 .8 L-3 0 L-.8 -.8Z" fill="#fff"/></g>'
    }
    for (i = 0; i < 10; i++) {   // shisha ichidagi mayda chang zarralari
      var top = i < 5, my = top ? 62 + Math.random() * 34 : 206 + Math.random() * 30
      var mx = HC + (Math.random() - 0.5) * 2 * (hwAt(my) - 8)
      h += '<circle class="mote" style="animation-delay:-' + (Math.random() * 6).toFixed(1) + 's" cx="' + f2(mx) + '" cy="' + f2(my) + '" r="' + (0.7 + Math.random() * 0.8).toFixed(2) + '" fill="#fff"/>'
    }
    return h + '</g><rect x="40" y="44" width="120" height="222" fill="url(#hgShade)"/></g>' + HG_FRONT + "</svg></div>"
  }
  // markaziy fon: minimal naqsh, nur, suzuvchi zarralar
  function hgBg() {
    var h = '<svg class="hgpat" viewBox="0 0 320 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<pattern id="hgPt" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 4 L44 24 L24 44 L4 24Z" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="1"/><circle cx="24" cy="24" r="1.3" fill="#fff" fill-opacity=".12"/></pattern></defs>' +
      '<rect width="320" height="420" fill="url(#hgPt)"/></svg><div class="hgaura"></div>'
    h += '<i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i><i class="orb o4"></i>'
    var kinds = ["ring", "dia", "dot", "ring", "dia", "dot", "bar"], i
    for (i = 0; i < 10; i++) {
      var sz = 6 + Math.random() * 8
      h += '<i class="fx ' + kinds[i % kinds.length] + '" style="top:' + (6 + (i * 10.5) % 84).toFixed(0) + "%;--z:" + sz.toFixed(0) + "px;--d:" + (13 + Math.random() * 12).toFixed(1) + "s;--dl:-" + (Math.random() * 22).toFixed(1) + 's"></i>'
    }
    h += '<i class="hgsweep"></i>'
    var cols = ["#3fcf9c", "#7fd8ff", "#5fe0ab", "#34c3b4"]
    for (var k = 0; k < 14; k++) {
      var sz2 = 1.2 + Math.random() * 2
      h += '<i class="pt' + (Math.random() < 0.22 ? " ring" : "") + '" style="left:' + (4 + Math.random() * 92).toFixed(1) + "%;top:" + (4 + Math.random() * 78).toFixed(1) + "%;--s:" + sz2.toFixed(1) + "px;--c:" + cols[k % cols.length] + ";--d:" + (4 + Math.random() * 5).toFixed(1) + "s;--dl:-" + (Math.random() * 8).toFixed(1) + "s;--dx:" + ((Math.random() - 0.5) * 16).toFixed(0) + 'px"></i>'
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
  function dBarHtml(ds, target, draft) {
    var free = ds.mode === "free", pct = Math.min(100, Math.floor(draft * 100 / target))
    return '<div class="dbar"><div class="dnums"><b>' + fmtNum(target) + '</b><b id="dDone">' + draft + '</b><b id="dLeft">' + Math.max(0, target - draft) + "</b></div>" +
      '<div class="dtrack"><i id="dFill" style="width:' + pct + '%"></i></div>' +
      '<div class="dcap"><span>' + esc(tr("needed")) + "</span><span>" + esc(tr("done_n")) + "</span><span>" + esc(tr("left_n")) + "</span></div>" +
      (free ? '<div class="dtot"><span>' + esc(tr("total_n")) + ': </span><b id="dTot">' + (ds.count || 0) + "</b></div>" : "") + "</div>"
  }
  function hgStats(full) {
    var ds = S.daily
    var d = document.getElementById("dDone"), l = document.getElementById("dLeft")
    var tt = document.getElementById("dTot"); if (tt) tt.textContent = ds.count || 0
    if (d) d.textContent = ds.draft || 0
    if (l) l.textContent = Math.max(0, ds.target - (ds.draft || 0))
    var f = document.getElementById("dFill")
    if (f) {
      f.style.width = (full ? 100 : Math.min(100, Math.floor((ds.draft || 0) * 100 / ds.target))) + "%"
      if (full) setTimeout(function () { var g = document.getElementById("dFill"); if (g && S.daily) g.style.width = Math.min(100, Math.floor((S.daily.draft || 0) * 100 / S.daily.target)) + "%" }, 1100)
    }
  }

  // ---- 6 xonali "soat" tanlagich: 000,000 (har bir raqam vertikal g'ildirak)
  var goal = [0, 0, 0, 0, 0, 0], goalWheels = []
  function fmtNum(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
  function goalNum() { return parseInt(goal.join(""), 10) || 0 }
  function showGoal() { var e = document.getElementById("goalVal"); if (e) e.textContent = fmtNum(goalNum()) }
  function goalSet(v) {
    var str = ("000000" + Math.max(0, Math.min(999999, v))).slice(-6)
    for (var i = 0; i < 6; i++) if (goalWheels[i]) goalWheels[i].set(parseInt(str.charAt(i), 10))
    showGoal()
  }
  function initDigits() {
    goalWheels = []
    var host = document.getElementById("digits")
    if (!host) return
    var cols = host.querySelectorAll(".dg"), IH = 36, COP = 5, MIDC = 2
    for (var c = 0; c < cols.length; c++) {
      ;(function (idx, col) {
        var track = col.firstChild, start = parseInt(col.getAttribute("data-d"), 10), h = '<div class="dg-pad"></div>'
        for (var k = 0; k < COP; k++) for (var d = 0; d < 10; d++) h += '<div class="dg-i">' + d + "</div>"
        track.innerHTML = h + '<div class="dg-pad"></div>'
        var timer = null, last = start
        function digitAt() { return ((Math.round(track.scrollTop / IH) % 10) + 10) % 10 }
        function jumpTo(d) {
          track.classList.add("jump")
          track.scrollTop = (MIDC * 10 + d) * IH
          void track.offsetWidth
          track.classList.remove("jump")
        }
        goalWheels[idx] = { set: function (d) { goal[idx] = d; last = d; jumpTo(d) } }
        track.addEventListener("scroll", function () {
          var d = digitAt(), p = Math.round(track.scrollTop / IH)
          if (d !== last) { last = d; haptic("light") }
          goal[idx] = d
          showGoal()
          if (p < 10 || p > 40) jumpTo(d)
          clearTimeout(timer)
          timer = setTimeout(function () { jumpTo(digitAt()) }, 140)
        })
        goalWheels[idx].set(start)
      })(c, cols[c])
    }
    showGoal()
  }
  function viewDaily() {
    var ds = S.daily
    var formHtml = function () {
      var gv = ds && ds.target ? Math.min(ds.target, 999999) : 0, cols = ""
      var pad = ("000000" + gv).slice(-6)
      for (var gi = 0; gi < 6; gi++) {
        cols += '<div class="dg" data-d="' + pad.charAt(gi) + '"><div class="dg-track"></div></div>'
        if (gi === 2) cols += '<span class="dg-comma">,</span>'
      }
      var dm = U.dmode || (ds && ds.mode) || "goal"
      var seg = '<div class="seg"><button data-act="dmode" data-v="goal" class="' + (dm === "goal" ? "on" : "") + '">' + esc(tr("mode_goal")) + '</button><button data-act="dmode" data-v="free" class="' + (dm === "free" ? "on" : "") + '">' + esc(tr("mode_free")) + "</button></div>"
      if (dm === "free") return '<div class="card stack goalbox">' + seg + '<p class="sub center" style="margin:4px 0">' + esc(tr("free_hint")) + '</p><button class="btn success block" data-act="saveDaily">' + esc(tr("save")) + "</button></div>"
      return '<div class="card stack goalbox">' + seg + '<div class="goalhead"><span>' + esc(tr("target_lbl")) + '</span><b id="goalVal">' + fmtNum(gv) + "</b></div>" +
        '<div class="digits" id="digits" dir="ltr">' + cols + "</div>" +
        '<div class="chips">' + [33, 100, 300, 1000].map(function (x) { return '<button class="chip" data-act="preset" data-v="' + x + '">' + fmtNum(x) + "</button>" }).join("") + "</div>" +
        '<button class="btn success block" data-act="saveDaily">' + esc(tr("save")) + "</button></div>"
    }
    if (!ds || !ds.target) {
      if (U.dmode === "free") return '<h1>📿 ' + esc(tr("daily")) + '</h1>' + formHtml()
      return '<h1>📿 ' + esc(tr("daily")) + '</h1><p class="sub">' + esc(tr("daily_ask")) + "</p>" + formHtml()
    }
    dailyTick()
    var target = ds.target, step = ds.step || 1, draft = ds.draft || 0, owed = ds.owedDays || 0
    hgShown = hgFallen(ds)
    var h = '<div class="daily"><div class="dhead"><h1>📿 ' + esc(tr("daily")) + '</h1><button class="gear' + (U.dailyMenu ? " on" : "") + '" data-act="dailyMenu" aria-label="Settings">' + ic("settings") + '</button></div>'
    if (U.dailyMenu) h += '<div style="margin-bottom:10px">' + formHtml() + "</div>"
    if (owed > 0) h += '<p class="owed center">⊘ ' + esc(tr("owed").replace("{n}", owed)) + "</p>"
    h += '<div id="hgwrap" class="hgwrap"><div id="hgstage" class="hgstage">' + hgBg() + '<div id="hgbox" class="hgbox' + (ds.mode === "free" ? " free" : "") + '">' + hgSvg(hgShown) + "</div>"
    if (ds.todayDone) h += '<div class="done center">✦ ' + esc(tr("cong")) + "</div>"
    else h += dBarHtml(ds, target, draft)
    h += "</div></div>"
    h += ds.todayDone ? '<button class="tap-round off" disabled>✓</button>' : '<div class="tapzone"><i class="tb b1"></i><i class="tb b2"></i><i class="tb b3"></i><button class="tap-round" data-act="tap" aria-label="+">' + (ic("add") + (step > 1 ? '<b class="stp">' + step + "</b>" : "")) + "</button></div>"
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
    if (U.more === "theme") {
      return '<button class="btn small back" data-act="moreBack">' + ic("arrow_back") + " " + esc(tr("back")) + "</button><h1>" + ic("palette") + " " + esc(tr("theme_t")) + '</h1><p class="sub">&nbsp;</p><div id="vwTheme" class="vw"><div class="vw-track"></div></div>' +
        '<div id="themeOpts" class="topts">' + themeOpts() + '</div><p class="ginfo">' + ic("info") + " <span>" + esc(tr("gender_info")) + "</span></p>"
    }
    if (U.more === "mode") {
      var mm = '<button class="btn small back" data-act="moreBack">' + ic("arrow_back") + " " + esc(tr("back")) + "</button><h1>" + ic("contrast") + " " + esc(tr("mode_t")) + '</h1><div class="list">'
      var MD = ["auto", "light", "dark"]
      for (var mi = 0; mi < MD.length; mi++) mm += '<button class="' + (S.theme === MD[mi] ? "sel" : "") + '" data-act="setMode" data-v="' + MD[mi] + '">' + ic(THEME_ICONS[MD[mi]]) + " " + esc(tr("th_" + MD[mi])) + (S.theme === MD[mi] ? ic("check", "chk") : "") + "</button>"
      mm += "</div>"
      if (S.theme === "auto") mm += '<div class="globe"><canvas id="gl"></canvas><div id="gtxt" class="gtxt"></div><button class="btn small' + (S.tz ? "" : " success") + '" data-act="tzDev">' + esc(tr("tz_dev")) + '</button><p class="ginfo">' + ic("info") + " <span>" + esc(tr("tz_hint")) + "</span></p></div>"
      return mm
    }
    if (U.more === "settings") {
      var cg = S.gender === "female" ? "th_female" : S.gender === "male" ? "th_male" : "th_auto"
      return '<button class="btn small back" data-act="moreBack">' + ic("arrow_back") + " " + esc(tr("back")) + "</button><h1>" + ic("settings") + " " + esc(tr("settings")) + '</h1><p class="sub">&nbsp;</p><div class="list">' +
        '<button data-act="more" data-v="mode">' + ic("contrast") + " " + esc(tr("mode_t")) + " · " + esc(tr("th_" + S.theme)) + "</button>" +
        '<button data-act="more" data-v="theme">' + ic("palette") + " " + esc(tr("theme_t")) + " · " + esc(tr(cg)) + "</button>" +
        '<button data-act="more" data-v="lang">' + ic("translate") + " " + esc(tr("lang")) + " · " + LANG_NAMES[S.lang] + "</button>" +
        '<div class="rrow" data-act="more" data-v="remind">' + ic("notifications") + "<span>" + esc(tr("remind")) + '</span><button class="tgl' + (S.remind === false ? "" : " on") + '" data-act="rmt" data-v="all" aria-label="remind"><i></i></button></div></div>'
    }
    if (U.more === "remind") {
      var rp = rmGet(), on0 = S.remind !== false
      function rrow(lbl, key, hk) {
        var wh = hk ? '<div class="dg hw" data-rm="' + hk + '" data-h="' + rp[hk] + '"><div class="dg-track"></div></div>' : ""
        return '<div class="topt rmrow"><div class="tl"><span>' + esc(tr(lbl)) + '</span><span class="rmr">' + wh + '<button class="tgl' + (rp[key] ? " on" : "") + '" data-act="rmt" data-v="' + key + '" aria-label="' + key + '"><i></i></button></span></div></div>'
      }
      return '<button class="btn small back" data-act="moreBack">' + ic("arrow_back") + " " + esc(tr("back")) + "</button><h1>" + ic("notifications") + " " + esc(tr("remind")) + '</h1><p class="sub">&nbsp;</p><div class="card stack">' +
        '<div class="topt"><div class="tl"><span><b>' + esc(tr("remind")) + '</b></span><button class="tgl' + (on0 ? " on" : "") + '" data-act="rmt" data-v="all" aria-label="all"><i></i></button></div></div>' +
        '<div class="rmlist' + (on0 ? "" : " off") + '">' + rrow("rm_daily", "d", "dh") + rrow("rm_due", "s", "sh") + rrow("rm_owed", "o", "") + "</div></div>"
    }
    if (U.more === "lang") {
      var l = '<button class="btn small back" data-act="moreBack">' + ic("arrow_back") + " " + esc(tr("back")) + "</button><h1>" + ic("translate") + " " + esc(tr("lang")) + '</h1><div class="grid3" style="grid-template-columns:1fr 1fr">'
      for (var j = 0; j < LANGS.length; j++) l += '<button class="btn ' + (S.langSet !== false && S.lang === LANGS[j] ? "success" : "") + '" data-act="setLang" data-v="' + LANGS[j] + '">' + LANG_NAMES[LANGS[j]] + "</button>"
      return l + "</div>"
    }
    if (U.more === "about") {
      return '<button class="btn small back" data-act="moreBack">' + ic("arrow_back") + " " + esc(tr("back")) + "</button><h1>" + ic("info") + " " + esc(tr("about")) + '</h1><div class="card stack"><p>' + ic("auto_awesome", "ab") + " " + esc(tr("about_text")) + '</p><p class="sub">' + ic("bookmark", "ab") + " Mini App " + CFG.VERSION + "</p>" + aboutRate() +
        '<button class="btn primary block" data-act="openBot">' + ic("smart_toy") + " " + esc(tr("open_bot")) + '</button><button class="btn block" data-act="openChannel">' + ic("campaign") + " " + esc(tr("open_channel")) + "</button></div>"
    }
    return '<h1>' + ic("auto_awesome") + " " + esc(tr("nav_more")) + '</h1><p class="sub">&nbsp;</p><div class="list">' +
      '<button data-act="more" data-v="settings">' + ic("settings") + " " + esc(tr("settings")) + "</button>" +
      '<button data-act="more" data-v="about">' + ic("info") + " " + esc(tr("about")) + "</button></div>"
  }

  // ====================
  // RENDER
  // ====================
  function render() {
    document.documentElement.lang = S.lang.slice(0, 2)
    document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr"
    var h
    try {
      if (U.detail) h = viewDetail()
      else if (U.tab === "names") h = viewNames()
      else if (U.tab === "media") h = viewMedia()
      else if (U.tab === "mood") h = viewMood()
      else if (U.tab === "daily") h = viewDaily()
      else h = viewMore()
    } catch (err) {
      h = '<div class="card"><strong>⚠️ Error</strong><p>' + esc(String(err && err.message || err)) + "</p></div>"
    }
    app.innerHTML = h
    document.body.classList.toggle("indetail", !!U.detail)
    initDigits()
    initHours()
    hgAttach()
    meanFit()
    phStart(); nhStart(); mediaInit(); themeInit()
    nsUpdate()
    miniSync()
    if (U.tab === "more" && U.more === "mode") startGlobe()
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
    if (U.tab === "more" && U.more !== "menu") {
      if (U.hikBack) { U.hikBack = false; U.tab = "names" }
      U.more = (U.more === "lang" || U.more === "theme" || U.more === "mode" || U.more === "remind") ? "settings" : "menu"; render(); return
    }
    if (U.tab === "mood" && U.moodPick) { U.moodPick = ""; render() }
  }


  // ====================
  // HEADER: silindr (wheel) tanlagichlar
  // ====================
  // ====================
  // GLOBUS (avto kun/tun: tanlangan shahar vaqti bo'yicha)
  // ====================
  var GMASK = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001efefd800000000000000000000000000000000000000b2bf3b00000000005000000000000000000000000786da02edc000000011f769828000000000000002374c1f10b83ef80000e001efffc5d7630000000000003f3b9ff747c3f84000ffbbffffffcee7fff8000000000efff5ffd0f03807002dffaffddfbffdfffc000000000293afbdc02803000005eeef56ff346bafe700000000007802f9be03e00000008dfc8ffc5ffcbe0060000000001800bff5fb7e000005840edbfc57de6ff8068000000000000ffffffff800006d7ffffffffffffff8180000000000007bf3ffe10000031f9fffbffffefefca00000000000000dff65de0000000ffb6ef65fad377fd90000000000000175fe0fa00000000ef35d3ffffacc778000000000000039e6d0650000004d1e803127744e78f40000000000000335fe1b00000001a7f04685fff7cc7f080000000000007fff65800000007a092e69cd8bf7ffd000000000000007dffef80000000620c3f59febfff7d38c0000000000007fffcf0000000037e047fceef9bdff13e0000000000007b5bd6000000005ac8059fff6bfed689800000000000025fd58000000012de88322de34996d02000000000000022e9b000000001174fbc8ffc5ff8ba200000000000000053018000000006db0db54cff5936d80000000000000013401800000007dad7d5bf2f7afed680000000000000003e01000000007ffeffcae49dfbfffd0000000000000009c0040000000eeebddf5b40bef77580000000000000001e164000000077f6f7e7ec05fbfba20000000000000001c10400000007feecf97de07f8ff000000000000000000f70300000007e7fbb89f001707b000000000000000000ff010000000ff7ffdabd001607b01800000000000000003c00000000ff8cfb7cf001801c01000000000000000007c00000001beebfe6700008007c1800000000000000001c24000000fdffbffa2000c00ec0800000000000000000076800000dbdf9fbf3000200ac0e00000000000000000d7fc0000037ff6bbfe000600c824000000000000000000fec000003c6faf7780003000006000000000000000000ee680000088cfe73e0001004020000000000000000000d97e00000006fecbc000000a060000000000000000000f6fc00000003f7b7800000040e0000000000000000001a9ee000000077d4f000000003ae800000000000000000df5c00000006f6fa0000000b359600000000000000002ff6fe0000001b7fc000000073d8f20800000000000000f77fe8000001f7b800000002a581f0000000000000001df5db8000000fe7800000002010155400000000000001e9ef7e0000006f6800000000310078600000000000001b6fe7c000001fdb4000000003fa03e180000000000000eb7ffe000001ff5800000000014003180000000000000f34df8000000b798000000000000000c00000000000006f3fb8000000bf702000000000030800000000000000057f7e80000015ebc3000000000252000000000000000037b7e80000019fbda0000000007da00100000000000001f5ff80000016fe0e0000000007f9000000000000000009fba8000000eec1c000000001777800000000000000003fff0000001fd41c00000000feafc040000000000000075ed0000000f9a2c00000000fcdd402000000000000003ee800000006bc1000000001f5efa00000000000000005d980000000ffc0000000001fff7e000000000000000077f80000000ffc00000000007fffe00000000000000007f7000000003d80000000001fedfc00000000000000007de000000003e00000000000bdfd400000000000000005ea000000002400000000000e1f780000000000000000768000000000000000000000002c000000000000000006780000000000000000000000038003000000000000003e00000000000000000000000000003000000000000001a00000000000000000000000018006000000000000001800000000000000000000000010030000000000000000c00000000000000000000000000040000000000000001c00000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000b000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  var CITIES = [
    ["Moskva", 37.6, 55.8, "Europe/Moscow"], ["Seul", 127, 37.5, "Asia/Seoul"], ["London", -0.1, 51.5, "Europe/London"], ["Toshkent", 69.3, 41.3, "Asia/Tashkent"],
    ["Makka", 39.8, 21.4, "Asia/Riyadh"], ["Istanbul", 29, 41, "Europe/Istanbul"], ["Dubay", 55.3, 25.3, "Asia/Dubai"], ["Nyu-York", -74, 40.7, "America/New_York"],
    ["Tokio", 139.7, 35.7, "Asia/Tokyo"], ["Pekin", 116.4, 39.9, "Asia/Shanghai"], ["Dehli", 77.2, 28.6, "Asia/Kolkata"], ["Jakarta", 106.8, -6.2, "Asia/Jakarta"],
    ["Sidney", 151.2, -33.9, "Australia/Sydney"], ["Qohira", 31.2, 30, "Africa/Cairo"], ["Lagos", 3.4, 6.5, "Africa/Lagos"], ["Nayrobi", 36.8, -1.3, "Africa/Nairobi"],
    ["Madrid", -3.7, 40.4, "Europe/Madrid"], ["Parij", 2.3, 48.9, "Europe/Paris"], ["Tehron", 51.4, 35.7, "Asia/Tehran"], ["Karachi", 67, 24.9, "Asia/Karachi"],
    ["Dakka", 90.4, 23.8, "Asia/Dhaka"], ["Bangkok", 100.5, 13.8, "Asia/Bangkok"], ["Almati", 76.9, 43.2, "Asia/Almaty"], ["Los-Anjeles", -118.2, 34, "America/Los_Angeles"],
    ["Mexiko", -99.1, 19.4, "America/Mexico_City"], ["San-Paulu", -46.6, -23.5, "America/Sao_Paulo"]
  ]
  var CCOL = ["#ff5d73", "#ffb020", "#3ddc97", "#4cc9f0", "#c77dff", "#ff8fab", "#f4d35e", "#5eead4"]
  var CNAMES = {
    "Moskva": "Moskva|Москва|Москва|Moscow|موسكو|Moskova|Moskow|莫斯科|मॉस्को|Moscú",
    "Seul": "Seul|Сеул|Сеул|Seoul|سيول|Seul|Seoul|首尔|सियोल|Seúl",
    "London": "London|Лондон|Лондон|London|لندن|Londra|London|伦敦|लंदन|Londres",
    "Toshkent": "Toshkent|Тошкент|Ташкент|Tashkent|طشقند|Taşkent|Tashkent|塔什干|ताशकंद|Taskent",
    "Makka": "Makka|Макка|Мекка|Mecca|مكة المكرمة|Mekke|Makkah|麦加|मक्का|La Meca",
    "Istanbul": "Istanbul|Истанбул|Стамбул|Istanbul|إسطنبول|İstanbul|Istanbul|伊斯坦布尔|इस्तांबुल|Estambul",
    "Dubay": "Dubay|Дубай|Дубай|Dubai|دبي|Dubai|Dubai|迪拜|दुबई|Dubái",
    "Nyu-York": "Nyu-York|Нью-Йорк|Нью-Йорк|New York|نيويورك|New York|New York|纽约|न्यूयॉर्क|Nueva York",
    "Tokio": "Tokio|Токио|Токио|Tokyo|طوكيو|Tokyo|Tokyo|东京|टोक्यो|Tokio",
    "Pekin": "Pekin|Пекин|Пекин|Beijing|بكين|Pekin|Beijing|北京|बीजिंग|Pekín",
    "Dehli": "Dehli|Деҳли|Дели|Delhi|دلهي|Delhi|Delhi|德里|दिल्ली|Delhi",
    "Jakarta": "Jakarta|Жакарта|Джакарта|Jakarta|جاكرتا|Cakarta|Jakarta|雅加达|जकार्ता|Yakarta",
    "Sidney": "Sidney|Сидней|Сидней|Sydney|سيدني|Sidney|Sydney|悉尼|सिडनी|Sídney",
    "Qohira": "Qohira|Қоҳира|Каир|Cairo|القاهرة|Kahire|Kairo|开罗|काहिरा|El Cairo",
    "Lagos": "Lagos|Лагос|Лагос|Lagos|لاغوس|Lagos|Lagos|拉各斯|लागोस|Lagos",
    "Nayrobi": "Nayrobi|Найроби|Найроби|Nairobi|نيروبي|Nairobi|Nairobi|内罗毕|नैरोबी|Nairobi",
    "Madrid": "Madrid|Мадрид|Мадрид|Madrid|مدريد|Madrid|Madrid|马德里|मैड्रिड|Madrid",
    "Parij": "Parij|Париж|Париж|Paris|باريس|Paris|Paris|巴黎|पेरिस|París",
    "Tehron": "Tehron|Теҳрон|Тегеран|Tehran|طهران|Tahran|Teheran|德黑兰|तेहरान|Teherán",
    "Karachi": "Karachi|Карачи|Карачи|Karachi|كراتشي|Karaçi|Karachi|卡拉奇|कराची|Karachi",
    "Dakka": "Dakka|Дакка|Дакка|Dhaka|دكا|Dakka|Dhaka|达卡|ढाका|Daca",
    "Bangkok": "Bangkok|Бангкок|Бангкок|Bangkok|بانكوك|Bangkok|Bangkok|曼谷|बैंकॉक|Bangkok",
    "Almati": "Almati|Алмати|Алматы|Almaty|ألماتي|Almatı|Almaty|阿拉木图|अल्माटी|Almatý",
    "Los-Anjeles": "Los-Anjeles|Лос-Анжелес|Лос-Анджелес|Los Angeles|لوس أنجلوس|Los Angeles|Los Angeles|洛杉矶|लॉस एंजिल्स|Los Ángeles",
    "Mexiko": "Mexiko|Мексика|Мехико|Mexico City|مدينة مكسيكو|Meksiko|Kota Meksiko|墨西哥城|मेक्सिको सिटी|Ciudad de México",
    "San-Paulu": "San-Paulu|Сан-Паулу|Сан-Паулу|São Paulo|ساو باولو|São Paulo|São Paulo|圣保罗|साओ पाउलो|São Paulo"
  }
  function cname(c) { var a = (CNAMES[c[0]] || c[0]).split("|"), i = LANGS.indexOf(S.lang); return a[i < 0 ? 3 : i] || a[3] || c[0] }
  function cityByName(n) { for (var i = 0; i < CITIES.length; i++) if (CITIES[i][0] === n) return CITIES[i]; return null }
  function cityHour(c) {
    try {
      if (c && window.Intl && Intl.DateTimeFormat) {
        var p = new Intl.DateTimeFormat("en-GB", { timeZone: c[3], hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()).split(":")
        return { h: parseInt(p[0], 10) % 24, m: parseInt(p[1], 10) }
      }
    } catch (e) {}
    var d = new Date()
    return { h: d.getHours(), m: d.getMinutes() }
  }
  function effTheme() {
    if (S.theme !== "auto") return S.theme
    var t = cityHour(cityByName(S.tz))
    return (t.h >= 20 || t.h < 8) ? "dark" : "light"
  }
  var curEff = ""
  function gText() {
    var c = cityByName(S.tz), t = cityHour(c), n = (t.h >= 20 || t.h < 8)
    var el = document.getElementById("gtxt")
    if (el) el.innerHTML = ic(n ? "dark_mode" : "light_mode") + " <b>" + esc(c ? cname(c) : tr("tz_dev")) + "</b> · " + ("0" + t.h).slice(-2) + ":" + ("0" + t.m).slice(-2)
  }
  function startGlobe() {
    var cv = document.getElementById("gl")
    if (!cv || !cv.getContext) return
    var W = cv.clientWidth || 240, dpr = Math.min(2, window.devicePixelRatio || 1)
    cv.width = W * dpr; cv.height = W * dpr
    var g = cv.getContext("2d"), R = W / 2 - 6
    var sel = cityByName(S.tz)
    var lon0 = sel ? sel[1] : -new Date().getTimezoneOffset() / 4, tilt = 0.38, drag = false, sx = 0, sl = 0, moved = 0, last = 0, ph = 0
    var land = []
    for (var i = 0; i < 16200; i++) if (parseInt(GMASK.charAt(i >> 2), 16) & (8 >> (i & 3))) land[land.length] = [-180 + (i % 180 + 0.5) * 2, 90 - (Math.floor(i / 180) + 0.5) * 2]
    var cs = getComputedStyle(cv), fg = cs.color
    function pr(lo, la) {
      var l = (lo - lon0) * Math.PI / 180, p = la * Math.PI / 180
      var x = Math.cos(p) * Math.sin(l), y = Math.cos(tilt) * Math.sin(p) - Math.sin(tilt) * Math.cos(p) * Math.cos(l), z = Math.sin(tilt) * Math.sin(p) + Math.cos(tilt) * Math.cos(p) * Math.cos(l)
      return [W / 2 + x * R, W / 2 - y * R, z]
    }
    function draw(ts) {
      if (document.getElementById("gl") !== cv) return
      requestAnimationFrame(draw)
      if (document.hidden || ts - last < 33) return
      var dt = last ? (ts - last) / 1000 : 0
      last = ts; ph += dt
      if (!drag) lon0 += 5 * dt
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, W)
      var grd = g.createRadialGradient(W * .4, W * .38, R * .1, W / 2, W / 2, R)
      grd.addColorStop(0, "rgba(120,160,150,.16)"); grd.addColorStop(1, "rgba(120,160,150,.04)")
      g.fillStyle = grd; g.beginPath(); g.arc(W / 2, W / 2, R, 0, 6.2832); g.fill()
      g.strokeStyle = "rgba(128,150,145,.35)"; g.lineWidth = 1; g.stroke()
      g.fillStyle = fg
      for (var k = 0; k < land.length; k++) {
        var q = pr(land[k][0], land[k][1])
        if (q[2] <= 0.02) continue
        g.globalAlpha = 0.2 + 0.6 * q[2]
        var r = 1 + 1 * q[2]
        g.fillRect(q[0] - r / 2, q[1] - r / 2, r, r)
      }
      g.globalAlpha = 1
      for (var m = 0; m < CITIES.length; m++) {
        var c = CITIES[m], p2 = pr(c[1], c[2])
        if (p2[2] <= 0.05) continue
        var on = sel && sel[0] === c[0], col = CCOL[m % CCOL.length], pu = 0.5 + 0.5 * Math.sin(ph * 2.2 + m)
        g.globalAlpha = 0.25 + 0.3 * pu; g.fillStyle = col
        g.beginPath(); g.arc(p2[0], p2[1], (on ? 8 : 5.5) + 2 * pu, 0, 6.2832); g.fill()
        g.globalAlpha = 1; g.beginPath(); g.arc(p2[0], p2[1], on ? 4 : 3, 0, 6.2832); g.fill()
        if (on) { g.strokeStyle = fg; g.lineWidth = 1.5; g.beginPath(); g.arc(p2[0], p2[1], 6, 0, 6.2832); g.stroke() }
      }
      if (sel) {
        var sp = pr(sel[1], sel[2])
        if (sp[2] > 0.05) {
          var nm = cname(sel), fs = 11
          g.font = "600 " + fs + "px system-ui, sans-serif"
          var tw = g.measureText(nm).width, bw = tw + 12, bh = fs + 8, dx = 12, hl = 14
          var dir = sp[0] >= W / 2 ? 1 : -1
          if (dir > 0 && sp[0] + dx + hl + bw > W - 2) dir = -1
          else if (dir < 0 && sp[0] - dx - hl - bw < 2) dir = 1
          var x1 = sp[0] + dir * dx, y1 = sp[1] - dx, x2 = x1 + dir * hl, bx = dir > 0 ? x2 : x2 - bw
          g.strokeStyle = fg; g.globalAlpha = 0.85; g.lineWidth = 1.2
          g.beginPath(); g.moveTo(sp[0] + dir * 4, sp[1] - 4); g.lineTo(x1, y1); g.lineTo(x2, y1); g.stroke()
          g.fillStyle = "rgba(120,150,140,.22)"; g.globalAlpha = 1
          g.beginPath(); if (g.roundRect) g.roundRect(bx, y1 - bh / 2, bw, bh, 6); else g.rect(bx, y1 - bh / 2, bw, bh); g.fill()
          g.strokeStyle = "rgba(128,150,145,.55)"; g.lineWidth = 1; g.stroke()
          g.fillStyle = fg; g.textBaseline = "middle"; g.textAlign = "center"
          g.fillText(nm, bx + bw / 2, y1 + 0.5)
          g.textAlign = "start"; g.textBaseline = "alphabetic"
        }
      }
      g.fillStyle = fg
    }
    requestAnimationFrame(draw)
    cv.addEventListener("pointerdown", function (e) { drag = true; moved = 0; sx = e.clientX; sl = lon0 })
    cv.addEventListener("pointermove", function (e) { if (!drag) return; moved = Math.max(moved, Math.abs(e.clientX - sx)); lon0 = sl - (e.clientX - sx) * 0.5 })
    cv.addEventListener("pointercancel", function () { drag = false })
    cv.addEventListener("pointerup", function (e) {
      var was = drag; drag = false
      if (!was || moved > 6) return
      var rc = cv.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top, best = null, bd = 22 * 22
      for (var m = 0; m < CITIES.length; m++) {
        var p3 = pr(CITIES[m][1], CITIES[m][2])
        if (p3[2] <= 0.05) continue
        var d = (p3[0] - x) * (p3[0] - x) + (p3[1] - y) * (p3[1] - y)
        if (d < bd) { bd = d; best = CITIES[m] }
      }
      if (best) { S.tz = best[0]; sel = best; save(); applyTheme(); gText() }
    })
    gText()
  }
  setInterval(function () { if (S.theme === "auto" && effTheme() !== curEff) applyTheme(); gText() }, 30000)

  var THEMES = ["light", "dark", "auto"]
  var THEME_ICONS = { light: "light_mode", dark: "dark_mode", auto: "brightness_auto" }
  var wheels = {}

  var PINKS = [
    { a: "#d9628c", a2: "#ef8db0", b: ["#f8e2e6", "#f2cdd7", "#ebbfcc"], d: ["#3a2230", "#2c1b25", "#22141c"], h: 180, bh: 0 },
    { a: "#e3745f", a2: "#f2a08f", b: ["#fbe6df", "#f5d0c4", "#eec1b3"], d: ["#3b2520", "#2d1b17", "#22130f"], h: 222, bh: 42 },
    { a: "#9b6fd0", a2: "#bd9be8", b: ["#eee6f8", "#ddd0f0", "#cfc0e8"], d: ["#2e2340", "#221a30", "#181022"], h: 115, bh: -65 },
    { a: "#c2415f", a2: "#e0708a", b: ["#f6dde2", "#ecc3cd", "#e2adba"], d: ["#3a1f27", "#2b161d", "#200f15"], h: 195, bh: 15 },
    { a: "#c98a7a", a2: "#e0ac9e", b: ["#f6e6e0", "#ecd3ca", "#e1c1b6"], d: ["#392923", "#2b1e19", "#20150f"], h: 225, bh: 45 }
  ]
  var MALES = [
    { a: "#e5202f", a2: "#a30f1b", a3: "#ff4b58", h: 210, t: "#fff" },
    { a: "#0f9f6e", a2: "#06694a", a3: "#34d399", h: 0, t: "#fff" },
    { a: "#3b7bff", a2: "#1f4fc4", a3: "#7aa6ff", h: 70, t: "#fff" },
    { a: "#f26a1b", a2: "#b8430a", a3: "#ff9a52", h: 225, t: "#fff" }
  ]
  var SOLF = [["#fbeef1", "#ffffff", "#2a1a22", "#38262f"], ["#fdf1e8", "#fffaf5", "#2b1d17", "#3a2a22"], ["#f2eefa", "#fbf9ff", "#241d33", "#30284a"], ["#eaf5ef", "#f8fffb", "#16251f", "#21332b"], ["#f6efe4", "#fffdf8", "#27221a", "#362f24"], ["#eaf1f8", "#f9fcff", "#18222d", "#233241"]]
  var SOLM = [["#f2f2f3", "#ffffff", "#0c0c0e", "#151518"], ["#eef2f8", "#ffffff", "#0a1020", "#121a2e"], ["#eef4ef", "#ffffff", "#0a140f", "#122019"], ["#f6eef0", "#ffffff", "#150a0d", "#21121a"], ["#eef0f3", "#ffffff", "#101317", "#1a1f26"], ["#f4efe9", "#ffffff", "#14100c", "#201a14"], ["#f2eff8", "#ffffff", "#110d1c", "#1b1530"]]
  function gOn() { return S.gender === "female" ? S.fgon !== false : S.gender === "male" ? S.mgon === true : false }
  // Erkak mavzusi: shisha ortidagi dumaloqlar (tasodifiy sekin harakat: jamlanish va tarqalish)
  var BG = { cv: null, on: false, b: [], t: 0, last: 0, mode: 0, col: [] }
  // Ayollar mavzusi: sekin yog'ilib tushuvchi sakura barglari
  var PT = { cv: null, on: false, p: [], last: 0, t: 0, w: 0, h: 0 }
  function petalFx() {
    var want = S.gender === "female" && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)
    if (!want) { PT.on = false; if (PT.cv) PT.cv.style.display = "none"; return }
    var cs = getComputedStyle(document.documentElement), c1 = cs.getPropertyValue("--fa2").trim() || "#ef8db0", c2 = cs.getPropertyValue("--fa").trim() || "#d9628c"
    PT.col = [c1, "#ffffff", c1, c2]
    if (!PT.cv) {
      PT.cv = document.createElement("canvas"); PT.cv.id = "fpc"
      PT.cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none"
      document.body.insertBefore(PT.cv, document.body.firstChild)
      for (var i = 0; i < 30; i++) PT.p[i] = pReset({}, true)
    }
    PT.cv.style.display = "block"
    if (PT.on) return
    PT.on = true
    function pReset(o, init) {
      var W = window.innerWidth, H = window.innerHeight
      o.x = Math.random() * W; o.y = init ? Math.random() * H : -20 - Math.random() * 80
      o.s = 4 + Math.random() * 7; o.vy = 20 + o.s * 3.2 + Math.random() * 14
      o.amp = 14 + Math.random() * 34; o.fx = .4 + Math.random() * .7; o.ph = Math.random() * 6.28
      o.r = Math.random() * 6.28; o.vr = (Math.random() - .5) * 1.6; o.fl = Math.random() * 6.28; o.vf = .8 + Math.random() * 1.6
      o.a = .55 + Math.random() * .4; o.c = Math.floor(Math.random() * 4); o.x0 = o.x
      return o
    }
    function loop(ts) {
      if (!PT.on) return
      requestAnimationFrame(loop)
      if (document.hidden || ts - PT.last < 33) return
      var dt = Math.min(.1, (ts - PT.last) / 1000); PT.last = ts; PT.t += dt
      var cv = PT.cv, W = window.innerWidth, H = window.innerHeight
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H }
      var g = cv.getContext("2d")
      g.clearRect(0, 0, W, H)
      var dark = document.documentElement.getAttribute("data-theme") === "dark" || (document.documentElement.getAttribute("data-theme") === "auto" && curEff === "dark")
      for (var i = 0; i < PT.p.length; i++) {
        var o = PT.p[i]
        o.y += o.vy * dt; o.r += o.vr * dt; o.fl += o.vf * dt
        o.x = o.x0 + Math.sin(PT.t * o.fx + o.ph) * o.amp + PT.t * 0
        if (o.y > H + 24) { pReset(o, false) }
        var sx = Math.cos(o.fl), s = o.s
        g.save(); g.translate(o.x, o.y); g.rotate(o.r); g.scale(Math.max(.18, Math.abs(sx)), 1)
        g.globalAlpha = o.a * (dark ? .6 : 1)
        g.fillStyle = PT.col[o.c]
        g.beginPath(); g.moveTo(0, -s); g.bezierCurveTo(s * .95, -s * .5, s * .8, s * .7, 0, s); g.bezierCurveTo(-s * .8, s * .7, -s * .95, -s * .5, 0, -s); g.fill()
        g.globalAlpha = o.a * .5 * (dark ? .6 : 1); g.fillStyle = "#fff"
        g.beginPath(); g.moveTo(0, -s * .6); g.quadraticCurveTo(s * .35, 0, 0, s * .6); g.quadraticCurveTo(-s * .35, 0, 0, -s * .6); g.fill()
        g.restore()
      }
    }
    requestAnimationFrame(loop)
  }
  function bgFx() {
    var want = S.gender === "male" && gOn() && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)
    var cs = getComputedStyle(document.documentElement)
    BG.col = [cs.getPropertyValue("--ma").trim() || "#e5202f", cs.getPropertyValue("--ma2").trim() || "#a30f1b", cs.getPropertyValue("--ma3").trim() || "#ff4b58"]
    if (!want) { BG.on = false; if (BG.cv) BG.cv.style.display = "none"; return }
    if (!BG.cv) {
      BG.cv = document.createElement("canvas"); BG.cv.id = "bgc"; document.body.insertBefore(BG.cv, document.body.firstChild)
      for (var i = 0; i < 6; i++) BG.b[i] = { x: Math.random(), y: Math.random(), r: .1 + Math.random() * .16, tx: Math.random(), ty: Math.random(), tr: .1 + Math.random() * .16, c: i % 3 }
    }
    BG.cv.style.display = "block"
    if (BG.on) return
    BG.on = true
    function loop(ts) {
      if (!BG.on) return
      requestAnimationFrame(loop)
      if (document.hidden || ts - BG.last < 40) return
      var dt = Math.min(.1, (ts - BG.last) / 1000); BG.last = ts; BG.t += dt
      var cv = BG.cv, w = Math.round(window.innerWidth / 3), h = Math.round(window.innerHeight / 3)
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h }
      if (BG.t > 7 + Math.random() * 3) {
        BG.t = 0; BG.mode = 1 - BG.mode
        for (var k = 0; k < BG.b.length; k++) {
          var o = BG.b[k]
          if (BG.mode) { o.tx = .5 + (Math.random() - .5) * .22; o.ty = .5 + (Math.random() - .5) * .22 } else { o.tx = Math.random(); o.ty = Math.random() }
          o.tr = .08 + Math.random() * .2
        }
      }
      var g = cv.getContext("2d"), m = Math.max(w, h)
      g.clearRect(0, 0, w, h)
      for (var j = 0; j < BG.b.length; j++) {
        var p = BG.b[j], f = Math.min(1, dt * .35)
        p.x += (p.tx - p.x) * f; p.y += (p.ty - p.y) * f; p.r += (p.tr - p.r) * f
        var rad = p.r * m, gr = g.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, rad)
        gr.addColorStop(0, BG.col[p.c]); gr.addColorStop(.55, BG.col[p.c] + "99"); gr.addColorStop(1, "rgba(0,0,0,0)")
        g.globalAlpha = .55; g.fillStyle = gr; g.beginPath(); g.arc(p.x * w, p.y * h, rad, 0, 6.2832); g.fill()
      }
    }
    requestAnimationFrame(loop)
  }
  function applyGender() {
    var root = document.documentElement, st = root.style
    var ng = S.gender === "female" ? "female" : S.gender === "male" ? "male" : "auto"
    if (root.getAttribute("data-gender") && root.getAttribute("data-gender") !== ng) {
      root.classList.add("tsw"); clearTimeout(window._tsw); window._tsw = setTimeout(function () { root.classList.remove("tsw") }, 450)
    }
    root.setAttribute("data-gender", ng)
    var P = PINKS[S.fcolor | 0] || PINKS[0], M = MALES[S.mcolor | 0] || MALES[0]
    var fem = S.gender === "female"
    var gl = fem ? (S.fgl == null ? 100 : S.fgl) : (S.mgl == null ? 100 : S.mgl), bl = fem ? (S.fbl == null ? 2 : S.fbl) : (S.mbl == null ? 2 : S.mbl)
    var SO = fem ? (SOLF[S.fsol | 0] || SOLF[0]) : (SOLM[S.msol | 0] || SOLM[0])
    root.setAttribute("data-glass", gOn() ? "on" : "off")
    st.setProperty("--sbl", SO[0]); st.setProperty("--scl", SO[1]); st.setProperty("--sbd", SO[2]); st.setProperty("--scd", SO[3])
    st.setProperty("--fa", P.a); st.setProperty("--fa2", P.a2)
    for (var i = 0; i < 3; i++) { st.setProperty("--fb" + (i + 1), P.b[i]); st.setProperty("--fd" + (i + 1), P.d[i]) }
    st.setProperty("--fh", P.h + "deg"); st.setProperty("--fbh", P.bh + "deg")
    st.setProperty("--gk", (1.65 - gl / 100 * 1.3).toFixed(2)); st.setProperty("--bk", (bl / 9).toFixed(2))
    st.setProperty("--ma", M.a); st.setProperty("--ma2", M.a2); st.setProperty("--ma3", M.a3); st.setProperty("--mh", M.h + "deg"); st.setProperty("--mat", M.t)
    bgFx()
    petalFx()
  }
  function themeOpts() {
    var h = "", i, fem = S.gender === "female", mal = S.gender === "male"
    if (!fem && !mal) return ""
    var arr = fem ? PINKS : MALES, cur = (fem ? S.fcolor : S.mcolor) | 0, act = fem ? "fcolor" : "mcolor"
    for (i = 0; i < arr.length; i++) h += '<button class="sws' + (i === cur ? " on" : "") + '" data-act="' + act + '" data-v="' + i + '" style="--c:' + arr[i].a + '" aria-label="color"></button>'
    var on = gOn(), dk = effTheme() === "dark"
    var out = '<div class="topt"><div class="tl"><span>' + esc(tr("t_color")) + '</span></div><div class="swrow">' + h + "</div></div>" +
      '<div class="topt"><div class="tl"><span>' + esc(tr("t_gon")) + '</span><button class="tgl' + (on ? " on" : "") + '" data-act="gtoggle" aria-label="glass"><i></i></button></div></div>'
    if (on) {
      var gl = fem ? (S.fgl == null ? 100 : S.fgl) : (S.mgl == null ? 100 : S.mgl), bl = fem ? (S.fbl == null ? 2 : S.fbl) : (S.mbl == null ? 2 : S.mbl)
      out += '<div class="topt"><div class="tl"><span>' + esc(tr("t_glass")) + '</span><span id="fglv">' + gl + '</span></div><input id="fglr" class="rng" type="range" min="0" max="100" value="' + gl + '"></div>' +
        '<div class="topt"><div class="tl"><span>' + esc(tr("t_blur")) + '</span><span id="fblv">' + bl + '</span></div><input id="fblr" class="rng" type="range" min="0" max="24" value="' + bl + '"></div>'
    } else {
      var SL = fem ? SOLF : SOLM, sc = (fem ? S.fsol : S.msol) | 0, sh = ""
      for (i = 0; i < SL.length; i++) sh += '<button class="sws' + (i === sc ? " on" : "") + '" data-act="gsol" data-v="' + i + '" style="--c:' + (dk ? SL[i][3] : SL[i][0]) + '" aria-label="color"></button>'
      out += '<div class="topt"><div class="tl"><span>' + esc(tr("t_solid")) + '</span></div><div class="swrow">' + sh + "</div></div>"
    }
    return out
  }
  var TKEYS = ["auto", "male", "female"], TICONS = ["brightness_auto", "man", "woman"], TLAB = ["th_auto", "th_male", "th_female"]
  function themeInit() {
    var host = document.getElementById("vwTheme")
    if (!host) return
    var N = 3, IH = 52, COP = 9, MID = 4, track = host.firstChild
    var h = '<div class="vw-pad"></div>'
    for (var k = 0; k < COP; k++) for (var j = 0; j < N; j++) h += '<div class="vw-i">' + ic(TICONS[j]) + "<span>" + esc(tr(TLAB[j])) + "</span></div>"
    track.innerHTML = h + '<div class="vw-pad"></div>'
    var cur = S.gender === "female" ? 2 : S.gender === "male" ? 1 : 0, last = cur, timer = null
    function jumpTo(i) { track.classList.add("jump"); track.scrollTop = (MID * N + i) * IH; void track.offsetWidth; track.classList.remove("jump") }
    jumpTo(cur)
    track.addEventListener("scroll", function () {
      if (!track.isConnected || !track.clientHeight) return
      var p = Math.round(track.scrollTop / IH), i = ((p % N) + N) % N
      if (i !== last) {
        last = i; haptic("light")
        S.gender = TKEYS[i]; applyGender()
        var o = document.getElementById("themeOpts"); if (o) o.innerHTML = themeOpts()
      }
      if (p < N * 2 || p > N * (COP - 2)) jumpTo(i)
      clearTimeout(timer)
      timer = setTimeout(function () { save(); if (track.isConnected && track.clientHeight) jumpTo(last) }, 160)
    })
    track.addEventListener("click", function (e) {
      var it = e.target.closest && e.target.closest(".vw-i"); if (!it) return
      var idx = Array.prototype.indexOf.call(track.children, it) - 1
      track.scrollTo({ top: idx * IH, behavior: "smooth" })
    })
  }
  function applyTheme() {
    applyGender()
    curEff = effTheme()
    document.documentElement.setAttribute("data-theme", curEff)
    if (tg && tg.setHeaderColor) {
      try {
        if (curEff === "light") { tg.setHeaderColor("#f6f7f4"); tg.setBackgroundColor && tg.setBackgroundColor("#f6f7f4") }
        else if (curEff === "dark") { tg.setHeaderColor("#131816"); tg.setBackgroundColor && tg.setBackgroundColor("#131816") }
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
    var cur = startIdx, quiet = true, timer = null, raf = 0, lastC = -1, busy = false, touching = false, demo = false

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
      if (cc !== lastC) { if (lastC !== -1 && !quiet && !demo) haptic("light"); lastC = cc }
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
    function commit() {
      if (track.classList.contains("drag") || touching || demo) return
      var n = idxOf(absPos())
      recenter()
      if (!quiet && n !== cur) { cur = n; onPick(n) }
    }
    track.addEventListener("scroll", function () {
      if (!raf) raf = requestAnimationFrame(paint)
      if (demo) return
      // chekkaga yaqinlashganda darrov o'rtaga qaytarish
      var p = track.scrollLeft / iw()
      if (!busy && (p < N || p > N * (COPIES - 1) - 1)) { busy = true; recenter(); busy = false }
      clearTimeout(timer)
      timer = setTimeout(commit, 130)
    })
    // barmoq ushlab turilganda tanlov o'zgarmaydi: faqat qo'yib yuborilgach
    track.addEventListener("touchstart", function () { touching = true; clearTimeout(timer); clkTouch(true) }, { passive: true })
    function tend() { if (!touching) return; touching = false; clearTimeout(timer); timer = setTimeout(commit, 180); clkTouch(false) }
    track.addEventListener("touchend", tend, { passive: true })
    track.addEventListener("touchcancel", tend, { passive: true })
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
    // avtomatik aylanish: f = 0..1, dir = -1/1 (bir to'liq aylanib o'sha joyga qaytadi)
    function spin(f, dir) {
      if (touching || down || track.classList.contains("drag")) return
      if (!demo) { demo = true; track.classList.add("jump") }
      track.scrollLeft = (MID * N + cur) * iw() + dir * f * N * iw()
    }
    function spinEnd() {
      if (!demo) return
      track.scrollLeft = (MID * N + cur) * iw()
      demo = false
      track.classList.remove("jump")
      paint()
    }
    return { set: set, spin: spin, spinEnd: spinEnd }
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
    for (var j = 0; j < THEMES.length; j++) themeLabels[j] = ic(THEME_ICONS[THEMES[j]], "ic") + '<span class="lb">' + esc(tr("th_" + THEMES[j])) + "</span>"
    wheels.theme = makeWheel("wTheme", themeLabels, Math.max(0, THEMES.indexOf(S.theme)), function (i) {
      S.theme = THEMES[i]; save(); applyTheme()
    })
    // 99 hisobi bilan bir xil ritm: 3s aylanish + 7s kutish, har safar qarama-qarshi tomonga
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches
    var spinning = false
    function hs(ts) {
      requestAnimationFrame(hs)
      if (reduced) return
      var cs = Math.floor(ts / 10000) * 10000, d = ts - cs, dir = (Math.floor(ts / 10000) % 2) ? 1 : -1
      // barmoq tegsa to'xtaydi; qo'yilgach 3s o'tib, keyingi 99 hisobi boshlanishida birga davom etadi
      var ok = !document.hidden && CLK.tc === 0 && cs >= CLK.block
      if (ok && d < 3000) {
        var f = 1 - Math.pow(1 - d / 3000, 2)
        wheels.lang.spin(f, dir); wheels.theme.spin(f, dir); spinning = true
      } else if (spinning) { wheels.lang.spinEnd(); wheels.theme.spinEnd(); spinning = false }
    }
    requestAnimationFrame(hs)
  }

  // ====================
  // EVENTS
  // ====================
  document.addEventListener("click", function (ev) {
    var el = ev.target
    while (el && el !== document && !(el.getAttribute && el.getAttribute("data-act"))) el = el.parentNode
    if (!el || el === document) return
    var act = el.getAttribute("data-act"), v = el.getAttribute("data-v")
    if (Date.now() - swipedAt < 350) return
    haptic("light")

    if (act === "tab") { U.tab = v; U.hikBack = false; U.detail = 0; U.more = "menu"; U.moodPick = ""; render() }
    else if (act === "open") { U.detail = parseInt(v, 10); U.dpanel = ""; U.dir = ""; U.mexp = false; render() }
    else if (act === "closeDetail" || act === "moreBack") goBack()
    else if (act === "fav") { var n = parseInt(v, 10); setLike(n, !S.favs[n]) }
    else if (act === "step") navDetail(parseInt(v, 10))
    else if (act === "dpanel") {
      U.dpanel = U.dpanel === v ? "" : v
      var pn = document.getElementById("dpanel")
      if (pn) { pn.innerHTML = panelHtml(U.detail); noteDirty() }
      var bs = document.querySelectorAll(".acts .act[data-act=dpanel]")
      for (var bi = 0; bi < bs.length; bi++) bs[bi].classList.toggle("on", bs[bi].getAttribute("data-v") === U.dpanel)
      if (U.dpanel === "audio") autoplay()
    }
    else if (act === "saveNote") {
      var n2 = parseInt(v, 10), val = noteVal(document.getElementById("noteText"))
      if (val) S.notes[n2] = val.slice(0, 1000); else delete S.notes[n2]
      document.getElementById("noteText").textContent = S.notes[n2] || ""
      save(); toast("✓ " + tr("saved")); noteDirty()
      var nb = document.querySelector(".acts .act[data-v=note]"); if (nb) nb.classList.toggle("has", !!S.notes[n2])
    }
    else if (act === "mode") { U.mode = v; var vv = document.getElementById("vid"); if (vv) { V.t = vv.currentTime; vv.pause() } render() }
    else if (act === "aud") audPlay(parseInt(v, 10))
    else if (act === "audMin") { U.audMini = true; render() }
    else if (act === "audOpen") { U.audMini = false; U.detail = 0; U.tab = "media"; U.mode = "audio"; render() }
    else if (act === "audToggle") audPlay(A.n || 1)
    else if (act === "audPrev") audStep(-1)
    else if (act === "audNext") audStep(1)
    else if (act === "audView") { S.audView = v === "list" ? "list" : "grid"; save(); render() }
    else if (act === "vsel") { V.i = parseInt(v, 10); V.t = 0; V.stalls = []; render(); var v2 = document.getElementById("vid"); if (v2) { var pr = v2.play(); if (pr && pr.catch) pr.catch(function () {}) } }
    else if (act === "vplay") { var v3 = document.getElementById("vid"); if (v3) { if (v3.paused) { var p3 = v3.play(); if (p3 && p3.catch) p3.catch(function () {}) } else v3.pause() } }
    else if (act === "vq") { var m = document.getElementById("vmenu"); if (m) m.hidden = !m.hidden }
    else if (act === "vqset") { V.q = v; var m2 = document.getElementById("vmenu"); var vd = vList()[V.i]; vSet(v === "auto" ? vAuto(vd) : +v, true); if (m2) { m2.hidden = true; var bs = m2.querySelectorAll("button"); for (var bi = 0; bi < bs.length; bs[bi].classList.toggle("on", bs[bi].getAttribute("data-v") === v), bi++); } vqUi() }
    else if (act === "vfs") { var v4 = document.getElementById("vp"), v5 = document.getElementById("vid"); try { if (document.fullscreenElement) document.exitFullscreen(); else if (v4 && v4.requestFullscreen) v4.requestFullscreen(); else if (v5 && v5.webkitEnterFullscreen) v5.webkitEnterFullscreen() } catch (e) {} }
    else if (act === "audGroup") { U.audioN = (parseInt(v, 10) - 1) * 9 + 1; render(); autoplay() }
    else if (act === "video") openTg("https://t.me/" + CFG.CHANNEL + "/" + v)
    else if (act === "mood") {
      var h = S.moodHist[v] || { count: 0 }
      h.count++; h.lastAt = Date.now(); S.moodHist[v] = h
      U.moodPick = v; save(); render()
    }
    else if (act === "moodAgain") { U.moodPick = ""; render() }
    else if (act === "moodPage") { U.moodPage = parseInt(v, 10); render() }
    else if (act === "namesToggle") {
      U.namesOpen = !U.namesOpen
      var ng2 = document.getElementById("ngrid")
      if (ng2) ng2.classList.toggle("open", U.namesOpen)
      el.innerHTML = ic(U.namesOpen ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.namesOpen ? "mood_less" : "mood_all")) + "</span>"
      nsUpdate(); setTimeout(nsUpdate, 250); setTimeout(nsUpdate, 520)
    }
    else if (act === "hikmat") {
      var dt = new Date(), dn = Math.floor((Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()) - Date.UTC(dt.getFullYear(), 0, 0)) / 864e5)
      U.tab = "more"; U.more = "quote"; U.quoteIdx = dn % D.quotes.length; U.hikBack = true; render()
    }
    else if (act === "meanTog") {
      U.mexp = !U.mexp
      var mt = document.querySelector("#slide .mt")
      if (mt) mt.classList.toggle("open", U.mexp)
      el.innerHTML = ic(U.mexp ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.mexp ? "mood_less" : "more_t")) + "</span>"
    }
    else if (act === "moodToggle") {
      U.moodOpen = !U.moodOpen
      var mg = document.getElementById("moodgrid")
      if (mg) mg.classList.toggle("open", U.moodOpen)
      el.innerHTML = ic(U.moodOpen ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.moodOpen ? "mood_less" : "mood_all")) + "</span>"
    }
    else if (act === "preset") goalSet(parseInt(v, 10))
    else if (act === "saveDaily") {
      var t = goalNum(), st = 1
      var old = S.daily || {}
      if ((U.dmode || old.mode || "goal") === "free") {
        S.daily = { mode: "free", target: 100, step: 1, owedDays: 0, draft: old.mode === "free" ? (old.draft || 0) : 0, count: old.count || 0, lastCheckedDate: todayStr(), todayDone: false }
        U.dmode = ""; U.dailyMenu = false; save(); render(); return
      }
      if (!t || t < 1) { toast("⚠️"); return }
      U.dmode = ""
      S.daily = { mode: "goal", target: Math.min(t, 999999), step: st, owedDays: old.owedDays || 0, draft: old.draft || 0, lastCheckedDate: old.lastCheckedDate || todayStr(), todayDone: !!old.todayDone }
      U.dailyMenu = false; save(); render()
    }
    else if (act === "dailyMenu") { U.dailyMenu = !U.dailyMenu; U.dmode = ""; render() }
    else if (act === "dmode") { U.dmode = v; render() }
    else if (act === "tap") {
      dailyTick()
      var ds = S.daily
      if (ds.todayDone) return
      var cycles = 0
      ds.draft = (ds.draft || 0) + (ds.step || 1)
      if (ds.mode === "free") ds.count = (ds.count || 0) + (ds.step || 1)
      while (ds.draft >= ds.target) {
        ds.draft -= ds.target
        cycles++
        if (ds.mode === "free") continue
        if (ds.owedDays > 0) ds.owedDays--; else ds.todayDone = true
      }
      save()
      var to = cycles > 0 ? 100 : Math.min(100, Math.floor(ds.draft * 100 / ds.target))
      var from = hgShown
      if (to > from) { hgDrop(from, to); hgShown = to }
      var stg = document.getElementById("hgstage")
      if (stg) { stg.classList.remove("pulse"); void stg.offsetWidth; stg.classList.add("pulse") }
      hgStats(cycles > 0)
      if (cycles > 0) {
        hgWhenIdle(function () {
          try { tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success") } catch (e) {}
          var w = document.getElementById("hgbox")
          if (!w) render()
          else { w.classList.add("flip"); setTimeout(function () { hgFlip = true; render() }, 900) }
        })
      }
    }
    else if (act === "spoil") el.classList.toggle("show")
    else if (act === "rateApp") { S.rate = +v; save(); rateSync(true); render() }
    else if (act === "rmt") { if (v === "all") S.remind = S.remind === false; else { var rq = rmGet(); rq[v] = rq[v] ? 0 : 1; S.rm = rq } save(); render() }
    else if (act === "likeApp") { S.appLike = !S.appLike; save(); rateSync(true); render() }
    else if (act === "more") { U.more = v; if (v === "about") rateSync(false); if (v === "quote") U.quoteIdx = -1; render() }
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
    else if (act === "setGender") { S.gender = v; save(); applyGender(); render() }
    else if (act === "tzDev") { S.tz = ""; save(); applyTheme(); render() }
    else if (act === "setMode") { S.theme = v; save(); applyTheme(); if (wheels.theme) wheels.theme.set(THEMES.indexOf(v), true); render() }
    else if (act === "sgo") { var qq = document.getElementById("q"); if (qq) { qq.focus(); if (qq.value) qq.select() } }
    else if (act === "gtoggle") { if (S.gender === "female") S.fgon = !gOn(); else S.mgon = !gOn(); applyGender(); save(); var o3 = document.getElementById("themeOpts"); if (o3) o3.innerHTML = themeOpts() }
    else if (act === "gsol") { if (S.gender === "female") S.fsol = parseInt(v, 10); else S.msol = parseInt(v, 10); applyGender(); save(); var o4 = document.getElementById("themeOpts"); if (o4) o4.innerHTML = themeOpts() }
    else if (act === "fcolor") { S.fcolor = parseInt(v, 10); applyGender(); save(); var o1 = document.getElementById("themeOpts"); if (o1) o1.innerHTML = themeOpts() }
    else if (act === "mcolor") { S.mcolor = parseInt(v, 10); applyGender(); save(); var o2 = document.getElementById("themeOpts"); if (o2) o2.innerHTML = themeOpts() }
    else if (act === "nf") { U.nf = v; render() }
    else if (act === "setLang") { S.langSet = true; S.lang = v; TCACHE = {}; save(); U.more = "settings"; render(); if (wheels.lang) wheels.lang.set(LANGS.indexOf(v), true) }
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

  function noteGrow(ta) {}
  function noteVal(el) { return String((el && el.innerText) || "").replace(/\r/g, "").trim() }
  new MutationObserver(function () {
    var ta = document.getElementById("noteText")
    if (ta && !ta._g) { ta._g = 1; noteGrow(ta) }
  }).observe(document.body, { childList: true, subtree: true })
  var hgDrag = null, hgAnim = null
  function hgAngle(w) {
    var m = getComputedStyle(w).transform
    if (!m || m === "none") return 0
    var v = m.match(/matrix\(([^)]+)\)/)
    if (!v) return 0
    var p = v[1].split(",")
    return Math.atan2(parseFloat(p[1]), parseFloat(p[0])) * 180 / Math.PI
  }
  document.addEventListener("pointerdown", function (e) {
    var w = e.target.closest && e.target.closest("#hgbox.free .hgw")
    if (!w || document.querySelector("#hgbox.flip")) return
    var a0 = 0
    if (hgAnim) { a0 = hgAngle(w); hgAnim.onfinish = null; hgAnim.cancel(); hgAnim = null; w.style.transform = "rotate(" + a0.toFixed(1) + "deg)" }
    var r = w.getBoundingClientRect()
    hgDrag = { w: w, x: e.clientX, half: r.height / 2, bottom: e.clientY >= r.top + r.height / 2, a0: a0, a: a0, armed: Math.abs(a0) < 6 }
    try { w.setPointerCapture(e.pointerId) } catch (x) {}
  })
  document.addEventListener("pointermove", function (e) {
    if (!hgDrag) return
    var dx = e.clientX - hgDrag.x, a = hgDrag.a0 + Math.atan(dx / hgDrag.half) * 180 / Math.PI * (hgDrag.bottom ? -1 : 1)
    hgDrag.a = Math.max(-38, Math.min(38, a))
    hgDrag.w.style.transform = "rotate(" + hgDrag.a.toFixed(1) + "deg)"
    if (Math.abs(hgDrag.a) < 6) hgDrag.armed = true
    else if (hgDrag.armed && Math.abs(hgDrag.a) >= 14) {
      hgDrag.armed = false
      haptic("medium")
      var b = document.querySelector("[data-act=tap]"); if (b) b.click()
    }
  })
  function hgRelease() {
    if (!hgDrag) return
    var d = hgDrag, a = d.a; hgDrag = null
    if (Math.abs(a) < 0.5) { d.w.style.transform = ""; return }
    var an = d.w.animate([
      { transform: "rotate(" + a + "deg)" }, { transform: "rotate(" + (-a * 0.38) + "deg)" }, { transform: "rotate(" + (a * 0.14) + "deg)" },
      { transform: "rotate(" + (-a * 0.05) + "deg)" }, { transform: "rotate(0deg)" }
    ], { duration: 900, easing: "ease-in-out" })
    hgAnim = an
    an.onfinish = function () { d.w.style.transform = ""; if (hgAnim === an) hgAnim = null }
  }
  document.addEventListener("pointerup", hgRelease)
  document.addEventListener("pointercancel", hgRelease)

  function noteDirty() {
    var ta = document.getElementById("noteText"), sb = document.getElementById("noteSave"), tw = document.getElementById("trashw")
    if (!ta || !sb) return
    var n = U.detail, cur = noteVal(ta), old = (S.notes[n] || "").trim()
    sb.hidden = cur === old
    if (tw) tw.classList.toggle("none", !cur && !old)
  }
  var trashT = null
  function trashStop() {
    clearTimeout(trashT); trashT = null
    var w = document.getElementById("trashw"); if (w) w.classList.remove("hold")
  }
  document.addEventListener("pointerdown", function (e) {
    var b = e.target.closest && e.target.closest("#trashBtn")
    if (!b) return
    var w = document.getElementById("trashw"); if (!w) return
    w.classList.add("hold")
    clearTimeout(trashT)
    trashT = setTimeout(function () {
      trashT = null; w.classList.remove("hold")
      var n = parseInt(w.getAttribute("data-v"), 10), ta = document.getElementById("noteText")
      delete S.notes[n]; save()
      if (ta) ta.textContent = ""
      var nb = document.querySelector(".acts .act[data-v=note]"); if (nb) { nb.classList.remove("has"); nb.classList.remove("on") }
      noteDirty()
      var pn2 = document.querySelector("#dpanel .panel")
      U.dpanel = ""
      if (pn2) {
        pn2.style.overflow = "hidden"; pn2.style.maxHeight = pn2.offsetHeight + "px"
        void pn2.offsetHeight
        pn2.style.transition = "max-height .65s ease, opacity .65s ease, padding .65s ease, margin .65s ease, border-width .65s ease"
        pn2.style.maxHeight = "0px"; pn2.style.opacity = "0"; pn2.style.paddingTop = "0"; pn2.style.paddingBottom = "0"; pn2.style.marginTop = "0"; pn2.style.borderWidth = "0"
        setTimeout(function () { var d2 = document.getElementById("dpanel"); if (d2 && U.dpanel === "") d2.innerHTML = "" }, 700)
      }
      try { if (navigator.vibrate) navigator.vibrate(20) } catch (x) {}
      toast("✓ " + tr("saved"))
    }, 1000)
  })
  ;["pointerup", "pointercancel", "pointerleave"].forEach(function (t) {
    document.addEventListener(t, function (e) { if (trashT && (t !== "pointerleave" || (e.target.closest && e.target.closest("#trashBtn")))) trashStop() }, true)
  })
  document.addEventListener("contextmenu", function (e) { if (e.target.closest && e.target.closest("#trashw")) e.preventDefault() })

  document.addEventListener("input", function (ev) {
    if (ev.target && (ev.target.id === "fglr" || ev.target.id === "fblr")) {
      var rv = parseInt(ev.target.value, 10)
      var fm = S.gender === "female"
      if (ev.target.id === "fglr") { if (fm) S.fgl = rv; else S.mgl = rv; var l1 = document.getElementById("fglv"); if (l1) l1.textContent = rv } else { if (fm) S.fbl = rv; else S.mbl = rv; var l2 = document.getElementById("fblv"); if (l2) l2.textContent = rv }
      applyGender(); clearTimeout(window._rt); window._rt = setTimeout(save, 400)
    }
    if (ev.target && ev.target.id === "noteText") { noteGrow(ev.target); noteDirty() }
    if (ev.target && ev.target.id === "q") {
      U.q = ev.target.value
      document.getElementById("grid").innerHTML = nameCards(filterNames())
      var sq = !!U.q.trim() || U.nf !== "all", ng = document.getElementById("ngrid"), nt = document.getElementById("ntog"), sbx = document.getElementById("sbox")
      if (ng) ng.classList.toggle("open", U.namesOpen || sq)
      if (nt) nt.hidden = sq
      if (sbx) sbx.classList.toggle("has", !!U.q)
      nsUpdate()
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
  var firstRun = !S.lang
  if (firstRun) { S.lang = detectLang(); S.langSet = false }
  if (tg) {
    try {
      tg.ready()
      tg.expand()
      if (tg.BackButton) tg.BackButton.onClick(goBack)
      if (tg.setHeaderColor) tg.setHeaderColor("bg_color")
    } catch (e) {}
  }
  audInit()
  applyTheme()
  render()
  window.__asmoReady = true
  var lastHit = 0
  function rmGet() {
    var o = S.rm || {}
    return { d: o.d === 0 ? 0 : 1, dh: typeof o.dh === "number" ? o.dh : 9, s: o.s === 0 ? 0 : 1, sh: typeof o.sh === "number" ? o.sh : 20, o: o.o === 0 ? 0 : 1 }
  }
  function initHours() {
    var hs = document.querySelectorAll(".hw")
    for (var c = 0; c < hs.length; c++) {
      ;(function (col) {
        var track = col.firstChild, key = col.getAttribute("data-rm"), IH = 17, N = 24, h = '<div class="dg-pad"></div>'
        for (var k = 0; k < 3; k++) for (var d = 0; d < N; d++) h += '<div class="dg-i">' + ("0" + d).slice(-2) + ":00</div>"
        track.innerHTML = h + '<div class="dg-pad"></div>'
        var timer = null, user = false, want = parseInt(col.getAttribute("data-h"), 10) || 0, last = want
        function at() { return ((Math.round(track.scrollTop / IH) % N) + N) % N }
        function jump(d) { track.classList.add("jump"); track.scrollTop = (N + d) * IH; void track.offsetWidth; track.classList.remove("jump") }
        var down = false, hideT = 0
        function hideLater() { clearTimeout(hideT); hideT = setTimeout(function () { if (!down) col.classList.remove("act") }, 220) }
        function mark() { user = true; down = true; clearTimeout(hideT); col.classList.add("act") }
        function up() { down = false; hideLater() }
        track.addEventListener("touchstart", mark, { passive: true })
        track.addEventListener("pointerdown", mark, { passive: true })
        track.addEventListener("touchend", up, { passive: true })
        track.addEventListener("touchcancel", up, { passive: true })
        track.addEventListener("pointerup", up, { passive: true })
        track.addEventListener("pointercancel", up, { passive: true })
        track.addEventListener("wheel", function () { user = true; col.classList.add("act"); hideLater() }, { passive: true })
        jump(want)
        requestAnimationFrame(function () { if (!user) jump(want) })
        setTimeout(function () { if (!user) jump(want) }, 250)
        track.addEventListener("scroll", function () {
          var d = at(), p = Math.round(track.scrollTop / IH)
          if (!user || !track.isConnected || !track.clientHeight) return
          if (!down) hideLater()
          if (d !== last) { last = d; haptic("light"); var q0 = rmGet(); if (q0[key] !== d) { q0[key] = d; S.rm = q0; save() } }
          if (p < 6 || p > 2 * N - 6) jump(d)
          clearTimeout(timer)
          timer = setTimeout(function () { if (!track.isConnected || !track.clientHeight) return; jump(at()); var q = rmGet(), v = at(); if (q[key] !== v) { q[key] = v; S.rm = q; save() } }, 160)
        })
      })(hs[c])
    }
  }
  var spT = 0, spLast = ""
  function syncPrefs() {
    var u = CFG.STATS_URL
    if (!u || !tg || !tg.initData || !window.fetch) return
    clearTimeout(spT)
    spT = setTimeout(function () {
      var ds = S.daily || {}
      var p = { initData: tg.initData, lang: S.lang || "uz", tz: -new Date().getTimezoneOffset(), remind: S.remind === false ? 0 : 1, mode: ds.mode || "", done: ds.todayDone ? 1 : 0, owed: ds.owedDays || 0, date: ds.lastCheckedDate || "", rm: rmGet() }
      var k = JSON.stringify([p.lang, p.tz, p.remind, p.mode, p.done, p.owed, p.date, p.rm])
      if (k === spLast) return
      spLast = k
      try { fetch(u.replace(/\/$/, "") + "/sync", { method: "POST", body: JSON.stringify(p), keepalive: true }).catch(function () { spLast = "" }) } catch (e) {}
    }, 3000)
  }
  function track() {
    var u = CFG.STATS_URL
    if (!u || !tg || !tg.initData || !window.fetch || Date.now() - lastHit < 1800000) return
    lastHit = Date.now()
    try { fetch(u.replace(/\/$/, "") + "/hit", { method: "POST", body: tg.initData, keepalive: true }).catch(function () {}) } catch (e) {}
  }
  track()
  syncPrefs()
  document.addEventListener("visibilitychange", function () { if (!document.hidden) track() })
  initHeader()
  cloudRead()
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1200) }
  idle(function () { loadMean(S.lang); loadJs("search.js?v=47") })
  try { if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister() }) }); if (window.caches) caches.keys().then(function (ks) { ks.forEach(function (k) { caches.delete(k) }) }) } catch (e) {}
  if (firstRun) {
    var frT = [], frOn = true
    function frStop() { frOn = false; for (var i = 0; i < frT.length; i++) clearTimeout(frT[i]); if (S.langSet === false) { S.langSet = true; save(); render() } }
    function frAt(ms, fn) { frT.push(setTimeout(function () { if (frOn) fn() }, ms)) }
    document.addEventListener("pointerdown", function () { if (frOn) frStop() }, true)
    frAt(1600, function () { U.tab = "more"; U.more = "menu"; render() })
    frAt(2700, function () { U.more = "settings"; render() })
    frAt(3800, function () { U.more = "lang"; render() })
    frAt(5000, function () { frOn = false; S.langSet = true; save(); render() })
  }
})()
