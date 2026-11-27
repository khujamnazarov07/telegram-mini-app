(function () {
  "use strict"

  var CFG = window.CONFIG
  var D = window.DATA
  var tg = window.Telegram && window.Telegram.WebApp
  var LANGS = ["uz", "uz_kr", "uz_new", "ru", "en", "ar", "tr", "id", "zh", "hi", "es"]
  var TXI = ["uz", "uz_kr", "ru", "en", "ar", "tr", "id", "zh", "hi", "es"]
  var LANG_NAMES = { uz: "O'zbekcha", uz_kr: "Ўзбекча", uz_new: "Özbekça", ru: "Русский", en: "English", ar: "العربية", tr: "Türkçe", id: "Indonesia", zh: "中文", hi: "हिन्दी", es: "Español" }

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
    qb0: "Oddiy|Оддий|Обычный|Plain|عادي|Düz|Polos|默认|सादा|Normal",
    qb1: "Naqsh|Нақш|Узор|Pattern|نقش|Desen|Pola|图案|पैटर्न|Patrón",
    qb2: "Shisha|Шиша|Стекло|Glass|زجاج|Cam|Kaca|玻璃|काँच|Cristal",
    qb3: "Zumrad|Зумрад|Изумруд|Emerald|زمرد|Zümrüt|Zamrud|翡翠|पन्ना|Esmeralda",
    t_font: "Shrift|Шрифт|Шрифт|Font|الخط|Yazı tipi|Font|字体|फ़ॉन्ट|Fuente",
    dv_hg: "Qumsoat|Қумсоат|Песочные часы|Hourglass|ساعة رملية|Kum saati|Jam pasir|沙漏|रेतघड़ी|Reloj de arena",
    dv_tb: "Tasbeh|Тасбеҳ|Тасбих|Tasbih|مسبحة|Tesbih|Tasbih|念珠|तस्बीह|Tasbih",
    hk2: "Iqtiboslar|Иқтибослар|Цитаты|Quotes|اقتباسات|Alıntılar|Kutipan|语录|उद्धरण|Citas",
    hk3: "Allohning so‘zlari|Аллоҳнинг сўзлари|Слова Аллаха|Words of Allah|كلمات الله|Allah’ın sözleri|Firman Allah|真主的话语|अल्लाह के शब्द|Palabras de Alá",
    hk4: "Qalb tasallisi|Қалб тасаллиси|Утешение для сердца|Comfort for the heart|سلوى القلب|Kalbe teselli|Penghibur hati|心灵慰藉|दिल का सुकून|Consuelo del corazón",
    hk6: "Ruhiy tasalli|Руҳий тасалли|Душевное утешение|Spiritual comfort|سلوى الروح|Ruhi teselli|Ketenangan jiwa|心灵安慰|आत्मिक सुकून|Consuelo espiritual",
    hk7: "Rahmat so‘zlari|Раҳмат сўзлари|Слова милосердия|Words of mercy|كلمات الرحمة|Rahmet sözleri|Kata-kata rahmat|慈悯之语|रहमत के शब्द|Palabras de misericordia",
    waq_t: "Voqea challenji|Воқеа челленжи|Челлендж «Аль-Вакиа»|Al-Waqi'ah challenge|تحدي الواقعة|Vâkıa challenge'ı|Tantangan Al-Waqi'ah|瓦吉亚挑战|अल-वाक़िआ चैलेंज|Reto Al-Waqi'ah",
    waq_s: "Voqea|Воқеа|Аль-Вакиа|Al-Waqi'ah|الواقعة|Vâkıa|Al-Waqi'ah|瓦吉亚|अल-वाक़िआ|Al-Waqi'ah",
    fx_t: "Effektlar|Эффектлар|Эффекты|Effects|التأثيرات|Efektler|Efek|特效|प्रभाव|Efectos",
    wg_t: "So'z o'yini|Сўз ўйини|Игра слов|Word game|لعبة الكلمات|Kelime oyunu|Permainan kata|文字游戏|शब्द खेल|Juego de palabras",
    wg_m1: "Gorizontal|Горизонтал|Горизонталь|Horizontal|أفقي|Yatay|Horizontal|水平|क्षैतिज|Horizontal",
    wg_m2: "Gorizontal va vertikal|Горизонтал ва вертикал|Горизонталь и вертикаль|Horizontal & vertical|أفقي وعمودي|Yatay ve dikey|Horizontal & vertikal|水平和垂直|क्षैतिज और ऊर्ध्वाधर|Horizontal y vertical",
    wg_m3: "Burchakli|Бурчакли|С поворотом|With a corner|بزاوية|Köşeli|Dengan sudut|带转角|कोने के साथ|Con esquina",
    wg_m4: "Qiyshiq|Қийшиқ|По диагонали|Diagonal|قطري|Çapraz|Diagonal|对角线|तिरछा|Diagonal",
    wg_lim: "Bugungi maqsadimizga erishdik, alhamdulillah. In shaa Alloh, ertaga yana davom etamiz.|Бугунги мақсадимизга эришдик, алҳамдулиллаҳ. Ин шаа Аллоҳ, эртага яна давом этамиз.|Сегодняшней цели мы достигли, альхамдулиллах. Ин ша Аллах, завтра продолжим.|We reached today's goal, alhamdulillah. In shaa Allah, we'll continue tomorrow.|بلغنا هدف اليوم، الحمد لله. إن شاء الله نكمل غدًا.|Bugünkü hedefimize ulaştık, elhamdülillah. İnşallah yarın devam ederiz.|Target hari ini tercapai, alhamdulillah. In syaa Allah kita lanjut besok.|今天的目标已达成，感谢真主。若安拉意欲，明天继续。|आज का लक्ष्य पूरा हुआ, अल्हम्दुलिल्लाह। इंशा अल्लाह कल फिर जारी रखेंगे।|Alcanzamos la meta de hoy, alhamdulillah. In shaa Allah, mañana seguimos.",
    wg_limp: "Premium: kuniga 10 ta level|Премиум: кунига 10 та левел|Премиум: 10 уровней в день|Premium: 10 levels a day|بريميوم: 10 مستويات يوميًا|Premium: günde 10 seviye|Premium: 10 level per hari|高级版：每天10关|प्रीमियम: प्रतिदिन 10 स्तर|Premium: 10 niveles al día",
    wg_all: "Barcha 40 level tugadi!|Барча 40 левел тугади!|Все 40 уровней пройдены!|All 40 levels completed!|اكتملت كل المستويات الـ 40!|40 seviyenin hepsi bitti!|Semua 40 level selesai!|40 关全部完成！|सभी 40 स्तर पूरे!|¡Los 40 niveles completados!",
    wg_ok: "Level tugadi!|Левел тугади!|Уровень пройден!|Level complete!|اكتمل المستوى!|Seviye tamam!|Level selesai!|过关！|स्तर पूरा!|¡Nivel completado!",
    wg_today: "Bugun|Бугун|Сегодня|Today|اليوم|Bugün|Hari ini|今天|आज|Hoy",
    wg_help: "Harflarni barmoq bilan surib ismni yig'ing.|Ҳарфларни бармоқ билан суриб исмни йиғинг.|Проведите пальцем по буквам, чтобы собрать имя.|Drag across the letters to find the name.|اسحب على الحروف للعثور على الاسم.|Harflerin üzerinde sürükleyerek ismi bulun.|Geser di atas huruf untuk menemukan nama.|在字母上滑动找出名字。|नाम खोजने के लिए अक्षरों पर उंगली चलाएँ।|Desliza sobre las letras para encontrar el nombre.",
    pet_t: "Robotcha|Роботча|Робот|Robot|الروبوت|Robot|Robot|机器人|रोबोट|Robot",
    pet_sal: "Bugun salavot aytilmadi shekilli…|Бугун салавот айтилмади шекилли…|Кажется, сегодня салават не читали…|Looks like no salawat today…|يبدو أنه لم يُصلَّ على النبي اليوم…|Galiba bugün salavat getirilmedi…|Sepertinya hari ini belum bershalawat…|今天好像还没念赞圣词…|लगता है आज दरूद नहीं पढ़ा गया…|Parece que hoy no se dijo salawat…",
    pet_hi: "Assalomu alaykum!|Ассалому алайкум!|Ассаляму алейкум!|Assalamu alaykum!|السلام عليكم!|Selamün aleyküm!|Assalamu'alaikum!|愿平安！|अस्सलामु अलैकुम!|¡Assalamu alaykum!",
    pet_ok: "Alhamdulillah!|Алҳамдулиллаҳ!|Альхамдулиллях!|Alhamdulillah!|الحمد لله!|Elhamdülillah!|Alhamdulillah!|感谢真主！|अल्हम्दुलिल्लाह!|¡Alhamdulillah!",
    pet_love: "Hihi, qitiqlayapsiz!|Хихи, қитиқлаяпсиз!|Хи-хи, щекотно!|Hehe, that tickles!|هههه، تدغدغني!|Hihi, gıdıklıyorsun!|Hihi, geli!|嘻嘻，好痒！|हिही, गुदगुदी हो रही है!|¡Jiji, me haces cosquillas!",
    pet_snow: "Mmm, qor!|Ммм, қор!|Ммм, снег!|Mmm, snow!|همم، ثلج!|Mmm, kar!|Mmm, salju!|嗯，雪！|म्म, बर्फ़!|¡Mmm, nieve!",
    pet_hot: "Uf, quyosh qizdirib yubordi!|Уф, қуёш қиздириб юборди!|Уф, солнце печёт!|Phew, the sun is scorching!|أوف، الشمس حارقة!|Off, güneş kavuruyor!|Huft, panas sekali!|哎呀，太阳好晒！|उफ़, धूप बहुत तेज़ है!|¡Uf, qué calor!",
    pet_cold: "Brrr, qanday sovuq!|Бррр, қандай совуқ!|Бррр, как холодно!|Brrr, so cold!|برررر، ما أبرد الجو!|Brrr, ne soğuk!|Brrr, dingin sekali!|好冷啊！|ब्रर्र, कितनी ठंड!|¡Brrr, qué frío!",
    pet_hide: "Kuk-kuk! Men shu yerdaman|Кук-кук! Мен шу ердаман|Ку-ку! Я тут|Peek-a-boo! I'm here|كو-كو! أنا هنا|Cee-cee! Buradayım|Cilukba! Aku di sini|躲猫猫！我在这儿|कू-कू! मैं यहाँ हूँ|¡Cucú! Aquí estoy",
    pet_dz: "Boshim aylanyapti…|Бошим айланяпти…|Голова кружится…|I feel dizzy…|رأسي يدور…|Başım dönüyor…|Kepalaku pusing…|我头晕…|चक्कर आ रहा है…|Me mareo…",
    pet_fly: "Uchyapman!|Учяпман!|Лечу!|Flying!|أطير!|Uçuyorum!|Terbang!|飞起来啦！|उड़ रहा हूँ!|¡Vuelo!",
    pet_goal: "Maqsadga erishdingiz, Alhamdulillah!|Мақсадга эришдингиз, алҳамдулиллаҳ!|Цель достигнута, альхамдулиллях!|Goal reached, alhamdulillah!|تحقق الهدف، الحمد لله!|Hedefe ulaştınız, elhamdülillah!|Target tercapai, alhamdulillah!|目标达成，感谢真主！|लक्ष्य पूरा, अल्हम्दुलिल्लाह!|¡Meta lograda, alhamdulillah!",
    pet_ay: "Ay!|Ай!|Ай!|Ouch!|آخ!|Ay!|Aduh!|哎呀！|आह!|¡Ay!",
    pet_wx: "Hozir {c} shahrida ob-havo {w}, {t}°. {x}|Ҳозир {c} шаҳрида об-ҳаво {w}, {t}°. {x}|Сейчас в городе {c}: {w}, {t}°. {x}|Right now in {c}: {w}, {t}°. {x}|الآن في {c}: الطقس {w}، {t}°. {x}|Şu an {c} şehrinde hava {w}, {t}°. {x}|Saat ini di {c} cuaca {w}, {t}°. {x}|{c}现在天气{w}，{t}°。{x}|अभी {c} में मौसम {w}, {t}° है। {x}|Ahora en {c}: {w}, {t}°. {x}",
    wx_c0: "ochiq|очиқ|ясно|clear|صافٍ|açık|cerah|晴|साफ़|despejado",
    wx_c1: "bulutli|булутли|облачно|cloudy|غائم|bulutlu|berawan|多云|बादल|nublado",
    wx_c2: "tumanli|туманли|туман|foggy|ضبابي|sisli|berkabut|有雾|धुंध|con niebla",
    wx_c3: "yomg'irli|ёмғирли|дождь|rainy|ممطر|yağmurlu|hujan|下雨|बारिश|lluvioso",
    wx_c4: "qorli|қорли|снег|snowy|مثلج|karlı|bersalju|下雪|बर्फ़बारी|nevado",
    wx_c5: "momaqaldiroqli|момақалдироқли|гроза|stormy|عاصف|fırtınalı|badai petir|雷暴|आंधी-तूफ़ान|tormentoso",
    wx_t0: "Kun yaxshi, sayrga chiqsangiz bo'ladi.|Кун яхши, сайрга чиқсангиз бўлади.|Хороший день для прогулки.|Nice day for a walk.|يوم جميل للتنزه.|Yürüyüş için güzel bir gün.|Hari yang bagus untuk jalan-jalan.|适合散步的好天气。|टहलने के लिए अच्छा दिन।|Buen día para pasear.",
    wx_t1: "Yengil kiyim yetarli.|Енгил кийим етарли.|Хватит лёгкой одежды.|Light clothes will do.|يكفي لباس خفيف.|Hafif giysiler yeter.|Pakaian tipis cukup.|穿轻便衣服就行。|हल्के कपड़े काफ़ी हैं।|Basta con ropa ligera.",
    wx_t2: "Ehtiyot bo'ling, ko'rinish yomon.|Эҳтиёт бўлинг, кўриниш ёмон.|Осторожно, плохая видимость.|Be careful, visibility is low.|احذر، الرؤية ضعيفة.|Dikkat, görüş düşük.|Hati-hati, jarak pandang rendah.|小心，能见度低。|सावधान रहें, दृश्यता कम है।|Cuidado, poca visibilidad.",
    wx_t3: "Soyabon beraymi?|Соябон берайми?|Дать зонтик?|Shall I lend you an umbrella?|هل أعطيك مظلة؟|Şemsiye vereyim mi?|Mau kupinjamkan payung?|要借你一把伞吗？|छाता दूँ?|¿Te presto un paraguas?",
    wx_t4: "Soyabon beraymi? Issiqroq kiying.|Соябон берайми? Иссиқроқ кийинг.|Дать зонтик? Оденьтесь теплее.|Shall I lend an umbrella? Dress warm.|هل أعطيك مظلة؟ البس دافئًا.|Şemsiye vereyim mi? Sıcak giyinin.|Mau payung? Berpakaianlah hangat.|要伞吗？请穿暖和些。|छाता दूँ? गर्म कपड़े पहनें।|¿Un paraguas? Abrígate.",
    wx_t5: "Uyda qolgan afzal.|Уйда қолган афзал.|Лучше остаться дома.|Better stay indoors.|الأفضل البقاء في البيت.|Evde kalmak daha iyi.|Lebih baik di rumah.|最好待在家里。|घर पर रहना बेहतर है।|Mejor quédate en casa.",
    jr_t: "Kunlik yo'l|Кунлик йўл|Путь дня|Daily path|الرحلة اليومية|Günlük yol|Jalan harian|每日之路|दैनिक यात्रा|Camino diario",
    jr_days: "kun ketma-ket|кун кетма-кет|дней подряд|day streak|أيام متتالية|gün üst üste|hari beruntun|天连续|दिन लगातार|días seguidos",
    jr_best: "Eng yaxshi:|Энг яхши:|Рекорд:|Best:|الأفضل:|En iyi:|Terbaik:|最佳：|सर्वश्रेष्ठ:|Mejor:",
    jr_nd: "Kun ismi|Кун исми|Имя дня|Name of the day|اسم اليوم|Günün ismi|Nama hari ini|今日之名|आज का नाम|Nombre del día",
    jr_q1: "Kun ismini o'qing|Кун исмини ўқинг|Прочитайте имя дня|Read the name of the day|اقرأ اسم اليوم|Günün ismini okuyun|Baca nama hari ini|阅读今日之名|आज का नाम पढ़ें|Lee el nombre del día",
    jr_q2: "33 ta zikr (tasbeh yoki salavot)|33 та зикр (тасбеҳ ёки салавот)|33 зикра (чётки или салават)|33 dhikr (tasbih or salawat)|33 ذكرًا (سبحة أو صلاة)|33 zikir (tesbih veya salavat)|33 zikir (tasbih atau shalawat)|33次赞念（念珠或赞圣）|33 ज़िक्र (तस्बीह या दरूद)|33 dhikr (tasbih o salawat)",
    jr_q3: "So'z o'yinida 1 level|Сўз ўйинида 1 левел|1 уровень в игре слов|1 level in the word game|مستوى واحد في لعبة الكلمات|Kelime oyununda 1 seviye|1 level di permainan kata|文字游戏1关|शब्द खेल में 1 स्तर|1 nivel en el juego de palabras",
    jr_cards: "Kartalar|Карталар|Карточки|Cards|البطاقات|Kartlar|Kartu|卡片|कार्ड|Tarjetas",
    jr_shop: "Garderob|Гардероб|Гардероб|Wardrobe|الخزانة|Gardırop|Lemari|衣橱|वार्डरोब|Armario",
    jr_lock: "Nur, kartalar va kiyimlar premium uchun.|Нур, карталар ва кийимлар премиум учун.|Нур, карточки и одежда — для Premium.|Light, cards and outfits are for Premium.|النور والبطاقات والأزياء للمشتركين.|Nur, kartlar ve kıyafetler Premium içindir.|Cahaya, kartu dan pakaian untuk Premium.|光点、卡片和服装仅限高级版。|नूर, कार्ड और पोशाकें प्रीमियम के लिए हैं।|La luz, las tarjetas y la ropa son Premium.",
    jr_ok: "Barakallah, vazifa bajarildi!|Баракаллоҳ, вазифа бажарилди!|Баракаллах, задание выполнено!|Barakallah, task done!|بارك الله فيك، تمت المهمة!|Barakallah, görev tamam!|Barakallah, tugas selesai!|愿真主祝福你，任务完成！|बारकल्लाह, कार्य पूरा!|¡Barakallah, tarea hecha!",
    jr_done: "Alhamdulillah! Bugungi yo'l tugadi, yangi kartangiz tayyor!|Алҳамдулиллаҳ! Бугунги йўл тугади, янги картангиз тайёр!|Альхамдулиллях! Путь дня пройден, новая карточка готова!|Alhamdulillah! Today's path is complete, new card unlocked!|الحمد لله! اكتملت رحلة اليوم وحصلت على بطاقة جديدة!|Elhamdülillah! Günün yolu tamam, yeni kartın hazır!|Alhamdulillah! Jalan hari ini selesai, kartu baru terbuka!|感谢真主！今日之路完成，获得新卡片！|अल्हम्दुलिल्लाह! आज की यात्रा पूरी, नया कार्ड मिला!|¡Alhamdulillah! Camino de hoy completo, ¡nueva tarjeta!",
    jr_rm: "{n} kunlik seriyangiz bor! Bugun hali vazifa bajarilmadi.|{n} кунлик серияингиз бор! Бугун ҳали вазифа бажарилмади.|У вас серия {n} дн.! Сегодня задания ещё не выполнены.|You have a {n}-day streak! Today's tasks aren't done yet.|لديك سلسلة {n} أيام! لم تُنجز مهام اليوم بعد.|{n} günlük serin var! Bugünkü görevler henüz yapılmadı.|Kamu punya {n} hari beruntun! Tugas hari ini belum selesai.|你已连续{n}天！今天的任务还没完成。|आपकी {n} दिन की लकीर है! आज के कार्य बाकी हैं।|¡Tienes una racha de {n} días! Hoy aún no hiciste las tareas.",
    jr_rm0: "Kunlik yo'lni boshlaymizmi? Bugun 3 ta oson vazifa bor.|Кунлик йўлни бошлаймизми? Бугун 3 та осон вазифа бор.|Начнём путь дня? Сегодня 3 лёгких задания.|Shall we start the daily path? 3 easy tasks today.|هل نبدأ الرحلة اليومية؟ ثلاث مهام سهلة اليوم.|Günlük yola başlayalım mı? Bugün 3 kolay görev var.|Mulai jalan harian? Ada 3 tugas mudah hari ini.|开始今日之路吧？今天有3个简单任务。|दैनिक यात्रा शुरू करें? आज 3 आसान कार्य हैं।|¿Empezamos el camino diario? Hoy hay 3 tareas fáciles.",
    jr_wk: "Haftalik|Ҳафталик|За неделю|Weekly",
    jr_td: "Bugungi vazifalar|Бугунги вазифалар|Задания на сегодня|Today's tasks",
    jr_dn: "bajarildi|бажарилди|выполнено|done",
    jr_got: "olindi|олинди|получено|earned",
    jr_rw: "mukofot|мукофот|награда|reward",
    pmi_t: "Premium nimalar beradi?|Премиум нималар беради?|Что даёт Premium?|What does Premium give?",
    pmi_1: "Kunlik yo'l: seriya, nur, kartalar va garderob|Кунлик йўл: серия, нур, карталар ва гардероб|Дневной путь: серия, свет, карточки и гардероб|Daily path: streak, light, cards and wardrobe",
    pmi_2: "Salavotda shisha effekti|Салавотда шиша эффекти|Стеклянный эффект в салавате|Glass effect in salawat",
    pmi_3: "Fasl fonlari va robotcha kiyimlari|Фасл фонлари ва роботча кийимлари|Фоны сезонов и наряды робота|Season backgrounds and robot outfits",
    pmi_4: "So'z o'yini: kuniga 10 level (bepulda 1)|Сўз ўйини: кунига 10 левел (бепулда 1)|Игра слов: 10 уровней в день (бесплатно 1)|Word game: 10 levels a day (1 for free)",
    pmi_5: "Iqtiboslar uchun maxsus fonlar|Иқтибослар учун махсус фонлар|Особые фоны для цитат|Special quote backgrounds",
    pm_goalbtn: "Kunlik maqsadni belgilash|Кунлик мақсадни белгилаш|Задать дневную цель|Set daily goal",
    nf_new_t: "Yangi funksiyalar|Янги функциялар|Новые функции|New features",
    nf_new: "Kunlik yo'l, So'z o'yini va robotcha tayyor. Sinab ko'ring!|Кунлик йўл, Сўз ўйини ва роботча тайёр. Синаб кўринг!|Дневной путь, игра слов и робот готовы. Попробуйте!|Daily path, word game and the robot are ready. Try them!",
    nf_pm_t: "Premium haqida|Премиум ҳақида|О Premium|About Premium",
    nf_pm_long: "Premium bilan kunlik yo'l, nur va kartalar, shisha effekti va fasl fonlari ochiladi. Avval kunlik salavot maqsadini belgilang, so'ng premiumni sinab ko'ring.|Премиум билан кунлик йўл, нур ва карталар, шиша эффекти ва фасл фонлари очилади. Аввал кунлик салавот мақсадини белгиланг, сўнг премиумни синаб кўринг.|С Premium открываются дневной путь, свет и карточки, стеклянный эффект и фоны сезонов. Сначала задайте дневную цель салавата, затем попробуйте Premium.|Premium unlocks the daily path, light and cards, glass effect and season backgrounds. First set your daily salawat goal, then try Premium.",
    nf_pm_short: "Premium faol. Kunlik yo'lni va garderobni sinab ko'ring.|Премиум фаол. Кунлик йўлни ва гардеробни синаб кўринг.|Premium активен. Попробуйте дневной путь и гардероб.|Premium is active. Try the daily path and the wardrobe.",
    tip_jr: "Yangi: Kunlik yo'l! Seriya, nur va kartalar yig'ing.|Янги: Кунлик йўл! Серия, нур ва карталар йиғинг.|Новое: дневной путь! Копите серию, свет и карточки.|New: Daily path! Collect streaks, light and cards.",
    tip_wg: "Yangi: So'z o'yini! Yashirin ismlarni toping.|Янги: Сўз ўйини! Яширин исмларни топинг.|Новое: игра слов! Найдите скрытые имена.|New: word game! Find the hidden names.",
    tip_goal: "Kunlik maqsad belgilaymizmi? Salavotni birga sanaymiz.|Кунлик мақсад белгилаймизми? Салавотни бирга санаймиз.|Зададим дневную цель? Будем считать салават вместе.|Shall we set a daily goal? Let's count together.",
    tip_prem: "Premium nimalar berishini bilasizmi? Ko'rib chiqing.|Премиум нималар беришини биласизми? Кўриб чиқинг.|Знаете, что даёт Premium? Посмотрите.|Know what Premium gives? Take a look.",
    bc_new: "Bildirishnoma yaratish|Билдиришнома яратиш|Создать уведомление|Create notification",
    bc_text: "Matn|Матн|Текст|Text",
    bc_btn: "Tugma matni|Тугма матни|Текст кнопки|Button text",
    bc_img: "Rasm tanlash|Расм танлаш|Выбрать картинку|Choose image",
    bc_go: "Yo'naltiriladigan joy|Йўналтириладиган жой|Куда ведёт|Destination",
    bc_send: "Hammaga yuborish|Ҳаммага юбориш|Отправить всем|Send to everyone",
    bc_none: "Yo'naltirmaslik|Йўналтирмаслик|Без перехода|No destination",
    bc_ok: "Yuborildi|Юборилди|Отправлено|Sent",
    bc_err: "Xatolik. Matn yoki server tekshirilsin.|Хатолик. Матн ёки сервер текширилсин.|Ошибка. Проверьте текст или сервер.|Error. Check the text or server.",
    bc_del: "O'chirish|Ўчириш|Удалить|Delete",
    gm_t: "O'yinlar|Ўйинлар|Игры|Games|الألعاب|Oyunlar|Permainan|游戏|खेल|Juegos",
    mm_t: "Xotira o'yini|Хотира ўйини|Игра на память|Memory game",
    mm_sub: "Ism va ma'nosini juftlang|Исм ва маъносини жуфтланг|Соедините имя и смысл|Match the name and meaning",
    mm_e: "Oson|Осон|Лёгкий|Easy", mm_m: "O'rta|Ўрта|Средний|Medium", mm_h: "Qiyin|Қийин|Сложный|Hard",
    mm_best: "Eng yaxshi|Энг яхши|Лучший|Best", mm_mv: "yurish|юриш|ходов|moves",
    mm_win: "Barakalla!|Баракалла!|Барака Аллаh!|Well done!",
    mm_again: "Qayta o'ynash|Қайта ўйнаш|Играть снова|Play again",
    mm_nur: "nur olindi|нур олинди|света получено|light earned",
    mm_cap: "Bugungi mukofot limiti tugadi, o'yin davom etadi|Бугунги мукофот лимити тугади|Лимит наград на сегодня исчерпан|Daily reward limit reached",
    ac_t: "Yutuqlar|Ютуқлар|Достижения|Achievements",
    ac_s: "Seriya: {n} kun|Серия: {n} кун|Серия: {n} дн.|Streak: {n} days",
    ac_c: "Kartalar: {n} ta|Карталар: {n} та|Карточки: {n}|Cards: {n}",
    ac_w: "So'z o'yini: {n}-level|Сўз ўйини: {n}-левел|Игра слов: уровень {n}|Word game: level {n}",
    ac_m: "Xotira: {n} o'yin|Хотира: {n} ўйин|Память: {n} игр|Memory: {n} games",
    ac_get: "Olish|Олиш|Забрать|Claim",
    ac_got: "Olingan|Олинган|Получено|Claimed",
    mn_t: "Kayfiyatga mos ism|Кайфиятга мос исм|Имя по настроению|Name for your mood",
    mn_sub: "Bugun o'zingizni qanday his qilyapsiz?|Бугун ўзингизни қандай ҳис қиляпсиз?|Как вы себя чувствуете сегодня?|How do you feel today?",
    mn_0: "Xavotir|Хавотир|Тревога|Worry", mn_1: "Qayg'u|Қайғу|Печаль|Sadness", mn_2: "Shukr|Шукр|Благодарность|Gratitude",
    mn_3: "Tavba|Тавба|Покаяние|Repentance", mn_4: "Rizq|Ризқ|Удел|Provision", mn_5: "Yo'l|Йўл|Путь|Guidance",
    mn_open: "Ismni ochish|Исмни очиш|Открыть имя|Open name", mn_again: "Boshqasi|Бошқаси|Другое|Another",
    mn_fav: "Saqlash|Сақлаш|Сохранить|Save", mn_h: "Oxirgi tanlovlar|Охирги танловлар|Последние|Recent",
    jr_cap: "Do'ppi|Дўппи|Тюбетейка|Skullcap|طاقية|Takke|Peci|小圆帽|टोपी|Gorro",
    jr_scarf: "Ro'mol|Рўмол|Шарф|Scarf|وشاح|Atkı|Syal|围巾|स्कार्फ़|Bufanda",
    jr_glass: "Ko'zoynak|Кўзойнак|Очки|Glasses|نظارات|Gözlük|Kacamata|眼镜|चश्मा|Gafas",
    jr_crown: "Toj|Тож|Корона|Crown|تاج|Taç|Mahkota|王冠|ताज|Corona",
    jr_eq: "Kiyish|Кийиш|Надеть|Wear|ارتداء|Giy|Pakai|穿上|पहनें|Poner",
    jr_off: "Yechish|Ечиш|Снять|Take off|خلع|Çıkar|Lepas|脱下|उतारें|Quitar",
    waq_new: "Yangi · boshlash|Янги · бошлаш|Новый · начать|New · start|جديد · ابدأ|Yeni · başla|Baru · mulai|新 · 开始|नया · शुरू करें|Nuevo · empezar",
    waq_lv: "Daraja|Даража|Уровень|Level|المستوى|Seviye|Level|等级|स्तर|Nivel",
    waq_debt: "Qoldirilgan|Қолдирилган|Пропущено|Missed|فائت|Kaçan|Terlewat|待补|छूटा|Pendiente",
    waq_dw: "kun|кун|дн.|days|يوم|gün|hari|天|दिन|días",
    waq_today: "Bugun|Бугун|Сегодня|Today|اليوم|Bugün|Hari ini|今天|आज|Hoy",
    waq_left: "Qoldi|Қолди|Осталось|Left|المتبقي|Kalan|Sisa|剩余|शेष|Quedan",
    waq_start: "Boshlash|Бошлаш|Начать|Start|ابدأ|Başla|Mulai|开始|शुरू करें|Empezar",
    waq_rules: "40 kunlik challenj. Daraja = kuniga o'qiladigan marta: 1-kun 1 ta, 2-kun 2 ta … 40-kun 40 ta. O'qilmagan kun «qoldirilgan kun» bo'lib saqlanadi va joriy daraja soniga teng bo'ladi — xohlagan paytingizda to'ldirib olasiz. Avval qoldirilgan kunlar, oxirida bugun yopiladi. Maqsadga yetgach, ortig'i kerak emas. Darajaga yetmagan qoldiq kun oxirida o'chadi.|40 кунлик челлендж. Даража = кунига ўқиладиган марта: 1-кун 1 та, 2-кун 2 та … 40-кун 40 та. Ўқилмаган кун «қолдирилган кун» бўлиб сақланади ва жорий даража сонига тенг бўлади — хоҳлаган пайтингизда тўлдириб оласиз. Аввал қолдирилган кунлар, охирида бугун ёпилади. Мақсадга етгач, ортиғи керак эмас. Даражага етмаган қолдиқ кун охирида ўчади.|40-дневный челлендж. Уровень = сколько раз читать в день: 1-й день 1, 2-й день 2 … 40-й день 40. Пропущенный день не пропадает: он сохраняется как «пропущенный» и равен текущему уровню — восполните, когда будет удобно. Сначала закрываются пропущенные дни, последним — сегодняшний. Достигнув цели, читать больше не нужно. Остаток меньше уровня в конце дня сгорает.|A 40-day challenge. Level = readings per day: day 1 is 1, day 2 is 2 … day 40 is 40. A skipped day is simply kept as a missed day equal to your current level; make it up whenever it suits you. Missed days are completed first, today last. Once the goal is reached, there's no need to read more. A remainder below the level is dropped at the end of the day.|تحدٍّ لمدة 40 يومًا. المستوى = عدد مرات القراءة يوميًا: اليوم 1 مرة، اليوم 2 مرتان … اليوم 40 أربعون مرة. اليوم الفائت يُحفظ لك بقدر المستوى الحالي، وتعوّضه متى شئت. تُكمَل الأيام الفائتة أولًا ثم اليوم الحالي، وبعد بلوغ الهدف لا حاجة للمزيد. ما نقص عن المستوى يُحذف في نهاية اليوم.|40 günlük meydan okuma. Seviye = günlük okuma sayısı: 1. gün 1, 2. gün 2 … 40. gün 40. Okunmayan gün, mevcut seviye kadar “kaçan gün” olarak saklanır; dilediğin zaman tamamlayabilirsin. Önce kaçan günler, en son bugün kapanır. Hedefe ulaşınca fazlasına gerek kalmaz. Seviyeye yetmeyen kalan gün sonunda silinir.|Tantangan 40 hari. Level = jumlah bacaan per hari: hari 1 = 1, hari 2 = 2 … hari 40 = 40. Hari yang terlewat disimpan sebesar level saat ini, kapan pun Anda siap bisa dilengkapi. Hari terlewat ditutup dulu, hari ini terakhir. Setelah target tercapai, tidak perlu menambah lagi. Sisa di bawah level dihapus di akhir hari.|40天挑战。等级 = 每天诵读次数：第1天1次，第2天2次……第40天40次。漏掉的一天会保留为“待补天”，数量等于当前等级，您可随时补上。先补待补天，最后完成今天。达标后无需再多诵。不足等级的余数在当天结束时清零。|40 दिन की चुनौती। स्तर = प्रतिदिन पढ़ने की संख्या: दिन 1 में 1, दिन 2 में 2 … दिन 40 में 40। छूटा दिन “छूटे दिन” के रूप में सुरक्षित रहता है, जो मौजूदा स्तर के बराबर होता है। जब चाहें पूरा कर लें। पहले छूटे दिन, अंत में आज पूरा होता है। लक्ष्य पूरा होने पर और पढ़ने की ज़रूरत नहीं। स्तर से कम बचा हिस्सा दिन के अंत में हट जाता है।|Reto de 40 días. Nivel = lecturas por día: día 1 son 1, día 2 son 2 … día 40 son 40. Un día que se pasa queda guardado como día pendiente, igual al nivel actual; puedes ponerlo al día cuando te venga bien. Primero se cierran los pendientes y al final hoy. Al llegar a la meta, no hace falta leer más. El resto menor al nivel se descarta al final del día.",
    waq_done: "Bugungi daraja yakunlandi, alhamdulillah 🤍|Бугунги даража якунланди, алҳамдулиллаҳ 🤍|Уровень на сегодня завершён, альхамдулиллях 🤍|Today's level is complete, alhamdulillah 🤍|اكتمل مستوى اليوم، الحمد لله 🤍|Bugünün seviyesi tamamlandı, elhamdülillah 🤍|Level hari ini selesai, alhamdulillah 🤍|今日等级已完成，全赞归真主 🤍|आज का स्तर पूरा हुआ, अल्हम्दुलिल्लाह 🤍|El nivel de hoy está completo, alhamdulillah 🤍",
    waq_fin: "Challenj yakunlandi! Alloh qabul qilsin ✨|Челлендж якунланди! Аллоҳ қабул қилсин ✨|Челлендж завершён! Да примет Аллах ✨|Challenge complete! May Allah accept ✨|اكتمل التحدي! تقبّل الله ✨|Meydan okuma tamamlandı! Allah kabul etsin ✨|Tantangan selesai! Semoga Allah menerima ✨|挑战完成！愿真主接受 ✨|चुनौती पूरी हुई! अल्लाह क़बूल करे ✨|¡Reto completado! Que Allah lo acepte ✨",
    waq_reset: "Qaytadan boshlash|Қайтадан бошлаш|Начать заново|Start over|ابدأ من جديد|Baştan başla|Mulai ulang|重新开始|फिर से शुरू करें|Empezar de nuevo",
    waq_resetq: "Natijalar tozalanadi. Yangidan boshlaymizmi?|Натижалар тозаланади. Янгидан бошлаймизми?|Прогресс будет очищен. Начнём заново?|Your progress will be cleared. Shall we start fresh?|سيُمسح التقدم. هل نبدأ من جديد؟|İlerleme temizlenecek. Baştan başlayalım mı?|Progres akan dibersihkan. Mulai dari awal?|进度将被清除，要重新开始吗？|प्रगति साफ़ हो जाएगी। क्या नए सिरे से शुरू करें?|Se borrará el progreso. ¿Empezamos de nuevo?",
    t_plain: "Oddiy|Оддий|Обычный|Plain|عادي|Normal|Biasa|普通|सामान्य|Normal",
    t_seas: "Mavsumiy|Мавсумий|Сезонный|Seasonal|موسمي|Mevsimlik|Musiman|季节|मौसमी|Estacional",
    s_spr: "Bahor|Баҳор|Весна|Spring|الربيع|İlkbahar|Musim semi|春季|वसंत|Primavera",
    s_sum: "Yoz|Ёз|Лето|Summer|الصيف|Yaz|Musim panas|夏季|गर्मी|Verano",
    s_aut: "Kuz|Куз|Осень|Autumn|الخريف|Sonbahar|Musim gugur|秋季|पतझड़|Otoño",
    t_gen: "Jins|Жинс|Пол|Gender|الجنس|Cinsiyet|Gender|性别|लिंग|Género",
    t_bgn: "Mavzu|Мавзу|Тема|Theme|السمة|Tema|Tema|主题|थीम|Tema",
    t_bg4: "Qish|Қиш|Зима|Winter|الشتاء|Kış|Musim dingin|冬季|सर्दी|Invierno",
    t_bg5: "Oddiy|Оддий|Простой|Simple|بسيط|Sade|Sederhana|简约|सादा|Simple",
    pm_bg: "Fon rasmlari Premium bilan ochiladi. Premium foydalanuvchilar masjid, qish va boshqa chiroyli fonlardan birini tanlab, ilovani o'zgartira oladi.|Фон расмлари Premium билан очилади. Premium фойдаланувчилар масжид, қиш ва бошқа гўзал фонлардан бирини танлаб, иловани ўзгартира олади.|Фоновые картинки открываются с Premium. Пользователи Premium могут выбрать мечеть, зиму и другие красивые фоны.|Background images unlock with Premium. Premium users can pick mosque, winter and other beautiful backgrounds.|صور الخلفية تُفتح مع Premium. يمكن لمستخدمي Premium اختيار المسجد أو الشتاء أو خلفيات جميلة أخرى.|Arka plan görselleri Premium ile açılır. Premium kullanıcılar cami, kış ve diğer güzel arka planları seçebilir.|Gambar latar terbuka dengan Premium. Pengguna Premium dapat memilih masjid, musim dingin, dan latar indah lainnya.|背景图片需要 Premium 解锁。Premium 用户可选择清真寺、冬季等精美背景。|पृष्ठभूमि चित्र Premium के साथ खुलते हैं। Premium उपयोगकर्ता मस्जिद, सर्दी और अन्य सुंदर पृष्ठभूमि चुन सकते हैं।|Los fondos se desbloquean con Premium. Los usuarios Premium pueden elegir mezquita, invierno y otros fondos hermosos.",
    pm_hl: "Marker ranglari Premium bilan ochiladi. Standart qizil rang bepul, qolgan ranglarni Premium foydalanuvchilar tanlay oladi.|Маркер ранглари Premium билан очилади. Стандарт қизил ранг бепул, қолган ранглар Premium фойдаланувчилар учун.|Цвета маркера открываются с Premium. Красный бесплатен, остальные доступны пользователям Premium.|Highlighter colors unlock with Premium. Red is free, the other colors are for Premium users.|ألوان القلم تُفتح مع Premium. الأحمر مجاني والبقية لمستخدمي Premium.|Fosforlu kalem renkleri Premium ile açılır. Kırmızı ücretsiz, diğer renkler Premium kullanıcılar içindir.|Warna stabilo terbuka dengan Premium. Merah gratis, warna lain untuk pengguna Premium.|荧光笔颜色需要 Premium 解锁。红色免费，其他颜色仅限 Premium 用户。|मार्कर के रंग Premium के साथ खुलते हैं। लाल मुफ़्त है, बाकी रंग Premium उपयोगकर्ताओं के लिए हैं।|Los colores del marcador se desbloquean con Premium. El rojo es gratis; los demás son para usuarios Premium.",
    pm_font: "Shriftlar Premium bilan ochiladi. Premium foydalanuvchilar 4 xil maxsus shriftdan birini tanlab, butun ilova ko'rinishini o'zgartira oladi.|Шрифтлар Premium билан очилади. Premium фойдаланувчилар 4 хил махсус шрифтдан бирини танлаб, бутун илова кўринишини ўзгартира олади.|Шрифты открываются с Premium. Пользователи Premium могут выбрать один из 4 особых шрифтов и изменить вид всего приложения.|Fonts unlock with Premium. Premium users can pick one of 4 special fonts and change the look of the whole app.|الخطوط تُفتح مع Premium. يمكن لمستخدمي Premium اختيار أحد 4 خطوط خاصة وتغيير مظهر التطبيق بالكامل.|Yazı tipleri Premium ile açılır. Premium kullanıcılar 4 özel yazı tipinden birini seçip tüm uygulamanın görünümünü değiştirebilir.|Font terbuka dengan Premium. Pengguna Premium dapat memilih salah satu dari 4 font khusus dan mengubah tampilan seluruh aplikasi.|字体需要 Premium 解锁。Premium 用户可从 4 种特色字体中选择，更改整个应用的外观。|फ़ॉन्ट Premium के साथ खुलते हैं। Premium उपयोगकर्ता 4 विशेष फ़ॉन्ट में से चुनकर पूरे ऐप का रूप बदल सकते हैं।|Las fuentes se desbloquean con Premium. Los usuarios Premium pueden elegir una de 4 fuentes especiales y cambiar el aspecto de toda la app.",
    waq_p2: "O'qilishi|Ўқилиши|Транскрипция|Reading|النطق|Okunuşu|Cara baca|读音|उच्चारण|Lectura",
    waq_p3: "Tarjima|Таржима|Перевод|Translation|الترجمة|Çeviri|Terjemahan|译文|अनुवाद|Traducción",
    waq_total: "Jami|Жами|Всего|Total|المجموع|Toplam|Total|总计|कुल|Total",
    waq_bonus: "Qo'shimcha|Қўшимча|Дополнительно|Extra|إضافي|Ekstra|Tambahan|额外|अतिरिक्त|Extra",
    hk8: "Eslatma|Эслатма|Напоминание|Reminder|تذكير|Hatırlatma|Pengingat|提醒|याद दिलाना|Recordatorio",
    hk5: "Qur’on nuri|Қуръон нури|Свет Корана|Light of the Qur’an|نور القرآن|Kur’an nuru|Cahaya Al-Qur’an|古兰经之光|क़ुरआन की रोशनी|Luz del Corán",
    hikmat: "Kun hikmati|Кун ҳикмати|Мудрость дня|Wisdom of the day|حكمة اليوم|Günün hikmeti|Hikmah hari ini|每日智慧|आज की हिकमत|Sabiduría del día",
    more_t: "Ko'proq|Кўпроқ|Ещё|More|المزيد|Daha fazla|Selengkapnya|更多|और देखें|Más",
    favs: "Sevimlilar|Севимлилар|Избранное|Favorites|المفضلة|Favoriler|Favorit|收藏|पसंदीदा|Favoritos",
    favs_empty: "Yoqqan ismlaringiz shu yerda yig'iladi 🤍|Ёққан исмларингиз шу ерда йиғилади 🤍|Здесь соберутся имена, которые тронут ваше сердце 🤍|Names that touch your heart will gather here 🤍|هنا تجتمع الأسماء التي تمسّ قلبك 🤍|Gönlüne dokunan isimler burada toplanacak 🤍|Nama-nama yang menyentuh hati Anda akan terkumpul di sini 🤍|触动您心灵的名字会汇集在这里 🤍|जो नाम आपके दिल को छू जाएँ, वे यहाँ जमा होंगे 🤍|Aquí se reunirán los nombres que toquen tu corazón 🤍",
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
    needed: "Maqsad|Мақсад|Цель|Goal|الهدف|Hedef|Target|目标|लक्ष्य|Meta",
    done_n: "Aytildi|Айтилди|Прочитано|Said|تمّت|Getirildi|Terbaca|已诵|पढ़ा|Dicho",
    left_n: "Qoldi|Қолди|Осталось|Remaining|متبقي|Kalan|Tersisa|剩余|शेष|Restante",
    owed: "{n} kun qolib ketdi. Xafa bo'lmang, qulay paytda to'ldirib olamiz 🌿|{n} кун қолиб кетди. Хафа бўлманг, қулай пайтда тўлдириб оламиз 🌿|Пропущено дней: {n}. Не переживайте, восполним в удобное время 🌿|{n} day(s) are waiting. No worries, we'll make them up whenever you like 🌿|تبقّى {n} يوم. لا بأس، نعوّضها في الوقت المناسب 🌿|{n} gün bekliyor. Üzülme, uygun olduğunda birlikte tamamlarız 🌿|Ada {n} hari yang tertinggal. Tidak apa-apa, kita lengkapi saat Anda siap 🌿|有 {n} 天还没补上。不用着急，方便时再补就好 🌿|{n} दिन छूटे हैं। कोई बात नहीं, सुविधा से पूरे कर लेंगे 🌿|Quedan {n} día(s) pendientes. Tranquilo, los ponemos al día cuando quieras 🌿",
    cong: "Alhamdulillah, bugungi salavotlar tugallandi 🤍|Алҳамдулиллаҳ, бугунги салавотлар тугалланди 🤍|Альхамдулиллях, сегодняшние салаваты завершены 🤍|Alhamdulillah, today's salawat are complete 🤍|الحمد لله، تمّت صلواتك على النبي اليوم 🤍|Elhamdülillah, bugünkü salavatlar tamamlandı 🤍|Alhamdulillah, shalawat hari ini sudah selesai 🤍|全赞归真主，今天的赞圣已完成 🤍|अल्हम्दुलिल्लाह, आज की सलावात पूरी हुई 🤍|Alhamdulillah, los salawat de hoy están completos 🤍",
    cong2: "Ma shaa Alloh, bugun ham sabr bilan davom etdingiz ✨|Маша Аллоҳ, бугун ҳам сабр билан давом этдингиз ✨|Ма шаа Аллах, и сегодня вы продолжили с терпением ✨|Ma shaa Allah, you kept going with patience today ✨|ما شاء الله، واصلت اليوم بصبر ✨|Maşallah, bugün de sabırla devam ettin ✨|Masya Allah, hari ini pun Anda tetap sabar melanjutkan ✨|玛莎安拉，您今天也耐心地坚持了 ✨|माशा अल्लाह, आज भी आपने सब्र के साथ जारी रखा ✨|Masha Allah, hoy también seguiste con paciencia ✨",
    cong3: "Alloh rozi bo'lsin, salavotlaringiz qabul bo'lsin 🌸|Аллоҳ рози бўлсин, салавотларингиз қабул бўлсин 🌸|Пусть Аллах будет доволен вами, пусть ваши салаваты будут приняты 🌸|May Allah be pleased with you and accept your salawat 🌸|رضي الله عنكم وتقبّل صلواتكم 🌸|Allah razı olsun, salavatların kabul olsun 🌸|Semoga Allah ridha dan menerima shalawat Anda 🌸|愿真主喜悦，并接受您的赞圣 🌸|अल्लाह राज़ी हो, आपकी सलावात क़ुबूल हों 🌸|Que Allah esté complacido contigo y acepte tus salawat 🌸",
    cong4: "In shaa Alloh, ertaga ham shu nur bilan davom etamiz 🌙|Иншааллоҳ, эртага ҳам шу нур билан давом этамиз 🌙|Ин ша Аллах, и завтра продолжим с этим светом 🌙|In shaa Allah, we'll continue with this light tomorrow 🌙|إن شاء الله، نكمل غدًا بهذا النور 🌙|İnşallah yarın da bu nurla devam ederiz 🌙|Insya Allah, besok kita lanjutkan dengan cahaya yang sama 🌙|若真主意欲，明天我们继续这份光明 🌙|इंशा अल्लाह, कल भी इसी नूर के साथ आगे बढ़ेंगे 🌙|In sha Allah, mañana seguiremos con esta luz 🌙",
    ob_lang: "Adashmasam, sizga <b>{l}</b> qulay ko'rinadi. Yoki xohlasangiz, quyidagi boshqa tillarga ham moslasha olaman 🌿|Янглишмасам, сизга <b>{l}</b> қулай кўринади. Ёки хоҳласангиз, қуйидаги бошқа тилларга ҳам мослаша оламан 🌿|Если я не ошибаюсь, вам удобен <b>{l}</b>. А если хотите, я могу подстроиться и под другие языки ниже 🌿|If I'm not mistaken, <b>{l}</b> feels right for you. Or, if you prefer, I can adapt to any of the languages below 🌿|إن لم أكن مخطئًا، فاللغة <b>{l}</b> تبدو مناسبة لك. أو إن شئت، يمكنني التكيّف مع اللغات الأخرى أدناه 🌿|Yanılmıyorsam, sana <b>{l}</b> uygun görünüyor. Dilersen aşağıdaki diğer dillere de uyum sağlayabilirim 🌿|Kalau saya tidak salah, <b>{l}</b> tampaknya nyaman untuk Anda. Atau, bila berkenan, saya bisa menyesuaikan dengan bahasa lain di bawah 🌿|如果没猜错，<b>{l}</b> 应该比较适合您。您也可以选择下面的其他语言，我会随之调整 🌿|अगर मैं ग़लत नहीं हूँ, तो आपको <b>{l}</b> सुविधाजनक लगेगी। या चाहें तो नीचे दी गई दूसरी भाषाओं में भी मैं ढल सकता हूँ 🌿|Si no me equivoco, <b>{l}</b> te resultará cómodo. O, si prefieres, puedo adaptarme a cualquiera de los idiomas de abajo 🌿",
    step_lbl: "Bir bosishda|Бир босишда|За одно нажатие|Per tap|لكل نقرة|Tek dokunuşta|Per ketukan|每次点击|प्रति टैप|Por toque",
    target_lbl: "Kunlik maqsad|Кунлик мақсад|Дневная цель|Daily target|الهدف اليومي|Günlük hedef|Target harian|每日目标|दैनिक लक्ष्य|Meta diaria",
    quote: "Iqtibos|Иқтибос|Цитата|Quote|اقتباس|Alıntı|Kutipan|语录|उद्धरण|Cita",
    share: "Ulashish|Улашиш|Поделиться|Share|مشاركة|Paylaş|Bagikan|分享|शेयर करें|Compartir",
    another: "Yana|Яна|Ещё|Another|آخر|Başka|Lainnya|换一条|और|Otra",
    lang: "Til|Тил|Язык|Language|اللغة|Dil|Bahasa|语言|भाषा|Idioma",
    st_t: "Statistika|Статистика|Статистика|Statistics|الإحصائيات|İstatistikler|Statistik|统计|आँकड़े|Estadísticas",
    st_today: "Bugun|Бугун|Сегодня|Today|اليوم|Bugün|Hari ini|今天|आज|Hoy",
    st_7: "7 kun|7 кун|7 дней|7 days|7 أيام|7 gün|7 hari|7天|7 दिन|7 días",
    st_time: "Ilovada o'tkazilgan vaqt|Иловада ўтказилган вақт|Время в приложении|Time in app|الوقت في التطبيق|Uygulamada geçen süre|Waktu di aplikasi|应用使用时间|ऐप में समय|Tiempo en la app",
    st_sal: "Salavot|Салавот|Салават|Salawat|الصلاة على النبي|Salavat|Selawat|赞圣|सलावत|Salawat",
    st_names: "Ismlar|Исмлар|Имена|Names|الأسماء|İsimler|Nama|名称|नाम|Nombres",
    st_quotes: "Hikmatlar|Ҳикматлар|Мудрости|Wisdom|الحكم|Hikmetler|Hikmah|箴言|हिकमत|Sabiduría",
    st_hours: "Soatlar bo'yicha faollik|Соатлар бўйича фаоллик|Активность по часам|Activity by hour|النشاط حسب الساعة|Saate göre aktivite|Aktivitas per jam|按小时活动|घंटे के अनुसार गतिविधि|Actividad por hora",
    st_days: "Kunlar bo'yicha vaqt (daqiqa)|Кунлар бўйича вақт (дақиқа)|Время по дням (мин)|Time by day (min)|الوقت حسب اليوم (د)|Güne göre süre (dk)|Waktu per hari (mnt)|按天时长(分钟)|दिन के अनुसार समय (मिनट)|Tiempo por día (min)",
    st_saldays: "Salavot · kunlar bo'yicha|Салавот · кунлар бўйича|Салават · по дням|Salawat · by day|الصلاة · حسب اليوم|Salavat · günlere göre|Selawat · per hari|赞圣 · 按天|सलावत · दिन के अनुसार|Salawat · por día",
    st_namesopen: "Ochilgan ismlar · kunlar bo'yicha|Очилган исмлар · кунлар бўйича|Открытые имена · по дням|Opened names · by day|الأسماء المفتوحة · حسب اليوم|Açılan isimler · günlere göre|Nama dibuka · per hari|已打开名称 · 按天|खोले गए नाम · दिन के अनुसार|Nombres abiertos · por día",
    st_seen: "O'rganilgan ismlar|Ўрганилган исмлар|Изученные имена|Names explored|الأسماء المستكشفة|Keşfedilen isimler|Nama dipelajari|已浏览名称|देखे गए नाम|Nombres explorados",
    st_mood: "Kayfiyat|Кайфият|Настроение|Mood|المزاج|Ruh hali|Suasana hati|心情|मनोदशा|Estado de ánimo",
    st_h: "soat|соат|ч|h|س|sa|j|时|घं|h",
    st_m: "daq|дақ|мин|m|د|dk|m|分|मि|min",
    st_prem: "Premium|Премиум|Премиум|Premium|بريميوم|Premium|Premium|高级版|प्रीमियम|Premium",
    st_lock: "7 kunlik tarix Premium bilan ochiladi|7 кунлик тарих Премиум билан очилади|История за 7 дней доступна в Премиум|7-day history is available with Premium|سجل 7 أيام متاح مع بريميوم|7 günlük geçmiş Premium ile açılır|Riwayat 7 hari tersedia dengan Premium|高级版可查看7天历史|7 दिन का इतिहास प्रीमियम के साथ|El historial de 7 días está disponible con Premium",
    st_empty: "Birinchi qadamlaringiz shu yerda ko'rinadi 🌱|Биринчи қадамларингиз шу ерда кўринади 🌱|Здесь появятся ваши первые шаги 🌱|Your first steps will appear here 🌱|ستظهر خطواتك الأولى هنا 🌱|İlk adımların burada görünecek 🌱|Langkah pertama Anda akan muncul di sini 🌱|您的第一步会显示在这里 🌱|आपके पहले क़दम यहाँ दिखेंगे 🌱|Tus primeros pasos aparecerán aquí 🌱",
    st_of99: "99 tadan|99 тадан|из 99|of 99|من 99|99 içinden|dari 99|共99|99 में से|de 99",
    pm_active: "Premium faol|Премиум фаол|Премиум активен|Premium active|بريميوم مفعل|Premium aktif|Premium aktif|高级版已开启|प्रीमियम सक्रिय|Premium activo",
    pm_goal: "7 kun ketma-ket kunlik salavotni aytsangiz, Premium sovg'a sifatida ochiladi 🎁|7 кун кетма-кет кунлик салавотни айтсангиз, Премиум совға сифатида очилади 🎁|Если читать салават 7 дней подряд, Премиум откроется в подарок 🎁|Say your daily salawat 7 days in a row and Premium opens as a gift 🎁|إن واظبت على صلواتك اليومية 7 أيام متتالية يُفتح لك بريميوم هديةً 🎁|7 gün üst üste günlük salavat getirirsen Premium hediye olarak açılır 🎁|Jika Anda bershalawat 7 hari berturut-turut, Premium terbuka sebagai hadiah 🎁|连续7天完成每日赞圣，高级版将作为礼物开启 🎁|लगातार 7 दिन सलावत पढ़ने पर प्रीमियम उपहार के रूप में खुल जाएगा 🎁|Si dices tu salawat 7 días seguidos, Premium se abre como regalo 🎁",
    pm_days: "kun ketma-ket|кун кетма-кет|дн. подряд|days in a row|أيام متتالية|gün üst üste|hari berturut|天连续|दिन लगातार|días seguidos",
    pm_grace: "Bugun salavot aytsangiz, Premium davom etadi 🌙|Бугун салавот айтсангиз, Премиум давом этади 🌙|Если сегодня прочтёте салават, Премиум продолжится 🌙|Say your salawat today and Premium continues 🌙|إن صلّيت على النبي اليوم يستمر بريميوم 🌙|Bugün salavat getirirsen Premium devam eder 🌙|Jika Anda bershalawat hari ini, Premium berlanjut 🌙|今天诵读赞圣，高级版将继续 🌙|आज सलावत पढ़ लें तो प्रीमियम जारी रहेगा 🌙|Si dices tu salawat hoy, Premium continúa 🌙",
    pm_left: "Qolgan vaqt|Қолган вақт|Осталось|Time left|الوقت المتبقي|Kalan süre|Sisa waktu|剩余时间|शेष समय|Tiempo restante",
    pm_trial: "3 daqiqa sinab ko'rish|3 дақиқа синаб кўриш|Попробовать 3 минуты|Try for 3 minutes|جرّب 3 دقائق|3 dakika dene|Coba 3 menit|试用3分钟|3 मिनट आज़माएँ|Probar 3 minutos",
    pm_trial_on: "Sinov faol|Синов фаол|Пробный режим|Trial active|التجربة مفعّلة|Deneme aktif|Uji coba aktif|试用中|ट्रायल सक्रिय|Prueba activa",
    pm_limit: "Bugun {a}/3 · Hafta {b}/7|Бугун {a}/3 · Ҳафта {b}/7|Сегодня {a}/3 · Неделя {b}/7|Today {a}/3 · Week {b}/7|اليوم {a}/3 · الأسبوع {b}/7|Bugün {a}/3 · Hafta {b}/7|Hari ini {a}/3 · Minggu {b}/7|今天 {a}/3 · 本周 {b}/7|आज {a}/3 · सप्ताह {b}/7|Hoy {a}/3 · Semana {b}/7",
    pm_nolimit: "Bugungi sinov imkoniyatlari tugadi, ertaga yana kutamiz 🌙|Бугунги синов имкониятлари тугади, эртага яна кутамиз 🌙|Пробные попытки на сегодня закончились, ждём вас завтра 🌙|Today's trial attempts are used up; we'll be glad to see you tomorrow 🌙|انتهت محاولات التجربة لهذا اليوم، نراك غدًا 🌙|Bugünkü deneme hakkın doldu, yarın yine bekleriz 🌙|Kesempatan uji coba hari ini sudah habis, kami tunggu besok 🌙|今天的试用次数已用完，明天再见 🌙|आज की ट्रायल कोशिशें पूरी हुईं, कल फिर मिलेंगे 🌙|Los intentos de prueba de hoy se han agotado, te esperamos mañana 🌙",
    pm_got: "Premium ochildi! 🎉|Премиум очилди! 🎉|Премиум открыт! 🎉|Premium unlocked! 🎉|تم فتح بريميوم! 🎉|Premium açıldı! 🎉|Premium terbuka! 🎉|高级版已解锁！🎉|प्रीमियम खुल गया! 🎉|¡Premium desbloqueado! 🎉",
    pm_end: "Premium muddati yakunlandi. Sizni yana kutib qolamiz 🤍|Премиум муддати якунланди. Сизни яна кутиб қоламиз 🤍|Срок Премиума завершился. Будем рады видеть вас снова 🤍|Your Premium has come to an end. We'd be happy to see you again 🤍|انتهت مدة بريميوم. يسعدنا أن نراك مجددًا 🤍|Premium süren sona erdi. Seni tekrar görmekten memnun oluruz 🤍|Masa Premium Anda telah berakhir. Kami senang bila Anda kembali 🤍|您的高级版已到期，期待与您再会 🤍|आपका प्रीमियम पूरा हुआ। आपको फिर देखकर हमें खुशी होगी 🤍|Tu Premium ha finalizado. Nos alegrará verte de nuevo 🤍",
    pm_trial_end: "Sinov muddati yakunlandi, yoqqan bo'lsa deb umid qilamiz 🌿|Синов муддати якунланди, ёққан бўлса деб умид қиламиз 🌿|Пробный период завершён, надеемся, вам понравилось 🌿|The trial has ended; we hope you enjoyed it 🌿|انتهت التجربة، ونأمل أن تكون قد أعجبتك 🌿|Deneme süresi bitti, umarız beğenmişsindir 🌿|Masa uji coba selesai, semoga Anda menyukainya 🌿|试用已结束，希望您喜欢 🌿|ट्रायल पूरा हुआ, उम्मीद है आपको पसंद आया 🌿|La prueba ha terminado, esperamos que te haya gustado 🌿",
    remind: "Bildirishnomalar|Билдиришномалар|Уведомления|Notifications|الإشعارات|Bildirimler|Notifikasi|通知|सूचनाएँ|Notificaciones",
    rm_daily: "Kunlik eslatma|Кунлик эслатма|Ежедневное напоминание|Daily reminder|تذكير يومي|Günlük hatırlatma|Pengingat harian|每日提醒|दैनिक रिमाइंडर|Recordatorio diario",
    rm_due: "Salavot eslatmasi|Салавот эслатмаси|Напоминание о салавате|Salawat reminder|تذكير الصلاة|Salavat hatırlatması|Pengingat salawat|赞圣提醒|सलावात रिमाइंडर|Recordatorio de salawat",
    rm_owed: "Qolib ketgan kunlar eslatmasi|Қолиб кетган кунлар эслатмаси|Напоминание о пропущенных днях|Missed-days reminder|تذكير بالأيام الفائتة|Kaçan günler hatırlatması|Pengingat hari terlewat|待补天提醒|छूटे दिनों की याद|Recordatorio de días pendientes",
    ob_later: "(+ keyinroq sozlashingiz ham mumkin)|(+ кейинроқ созлашингиз ҳам мумкин)|(+ позже это можно изменить в настройках)|(+ you can also change this later in settings)|(+ يمكنك تغيير ذلك لاحقاً من الإعدادات)|(+ daha sonra ayarlardan da değiştirebilirsiniz)|(+ Anda juga dapat mengubahnya nanti di pengaturan)|（+ 稍后也可以在设置中更改）|(+ आप इसे बाद में सेटिंग्स में भी बदल सकते हैं)|(+ también puedes cambiarlo más tarde en ajustes)",
    ob_skip: "Keyinroq|Кейинроқ|Позже|Later|لاحقاً|Sonra|Nanti|稍后|बाद में|Más tarde",
    ob_or: "yoki|ёки|или|or|أو|veya|atau|或|या|o",
    t_bg: "Orqa fon|Орқа фон|Фон|Background|الخلفية|Arka plan|Latar|背景|पृष्ठभूमि|Fondo",
    t_bg0: "Standart|Стандарт|Стандарт|Default|افتراضي|Varsayılan|Bawaan|默认|डिफ़ॉल्ट|Predeterminado",
    t_bg1: "Masjid|Масжид|Мечеть|Mosque|مسجد|Cami|Masjid|清真寺|मस्जिद|Mezquita",
    t_bg2: "Oltin|Олтин|Золото|Gold|ذهبي|Altın|Emas|金色|सुनहरा|Dorado",
    t_bg3: "Krem|Крем|Крем|Cream|كريمي|Krem|Krem|奶油|क्रीम|Crema",
    about: "Haqida|Ҳақида|О приложении|About|حول|Hakkında|Tentang|关于|के बारे में|Acerca de",
    help: "Yordam|Ёрдам|Помощь|Help|المساعدة|Yardım|Bantuan|帮助|मदद|Ayuda",
    notif: "Bildirishnomalar|Билдиришномалар|Уведомления|Notifications|الإشعارات|Bildirimler|Notifikasi|通知|सूचनाएं|Notificaciones",
    h_dev: "Dasturchi|Дастурчи|Разработчик|Developer|المطوّر|Geliştirici|Pengembang|开发者|डेवलपर|Desarrollador",
    h_ph: "Xabar yozing...|Хабар ёзинг...|Напишите сообщение...|Write a message...|اكتب رسالة...|Mesaj yazın...|Tulis pesan...|输入消息...|संदेश लिखें...|Escribe un mensaje...",
    h_ph2: "Xatolik bormi?|Хато борми?|Нашли ошибку?|Found a bug?|وجدت خطأ؟|Hata mı buldun?|Menemukan bug?|发现错误了吗？|कोई गड़बड़ी मिली?|¿Encontraste un error?",
    h_ph3: "Taklifingiz bormi?|Таклифингиз борми?|Есть идея?|Got an idea?|لديك فكرة؟|Bir fikrin var mı?|Punya ide?|有好主意吗？|कोई सुझाव है?|¿Tienes una idea?",
    h_ph4: "Savolingizni yozing...|Саволингизни ёзинг...|Задайте вопрос...|Ask a question...|اطرح سؤالك...|Sorunuzu yazın...|Ajukan pertanyaan...|提出问题...|सवाल पूछें...|Haz una pregunta...",
    h_big: "Fayl 20 MB dan katta bo'lmasin|Файл 20 МБ дан катта бўлмасин|Файл не больше 20 МБ|File must be under 20 MB|يجب ألا يتجاوز الملف 20 ميغابايت|Dosya 20 MB'dan küçük olmalı|File maksimal 20 MB|文件不能超过 20 MB|फ़ाइल 20 MB से छोटी हो|El archivo debe pesar menos de 20 MB",
    h_info: "Savol, xatolik yoki taklifingizni yozing — dasturchi javob beradi. Rasm, video va fayl yuborish mumkin. Yozishmalar 7 kundan so'ng avtomatik o'chiriladi.|Савол, хато ёки таклифингизни ёзинг — дастурчи жавоб беради. Расм, видео ва файл юбориш мумкин. Ёзишмалар 7 кундан сўнг автоматик ўчирилади.|Напишите вопрос, об ошибке или идею — разработчик ответит. Можно отправлять фото, видео и файлы. Переписка автоматически удаляется через 7 дней.|Write a question, a bug report or an idea and the developer will reply. You can send photos, videos and files. Messages are deleted automatically after 7 days.|اكتب سؤالك أو بلاغ الخطأ أو اقتراحك وسيرد المطوّر. يمكنك إرسال الصور والفيديو والملفات. تُحذف الرسائل تلقائيًا بعد 7 أيام.|Sorunuzu, hatayı veya önerinizi yazın, geliştirici yanıtlar. Fotoğraf, video ve dosya gönderebilirsiniz. Mesajlar 7 gün sonra otomatik silinir.|Tulis pertanyaan, laporan bug, atau ide Anda, pengembang akan membalas. Anda bisa mengirim foto, video, dan file. Pesan dihapus otomatis setelah 7 hari.|写下您的问题、错误或建议，开发者会回复。可发送图片、视频和文件。消息将在 7 天后自动删除。|अपना सवाल, गड़बड़ी या सुझाव लिखें, डेवलपर जवाब देगा। फ़ोटो, वीडियो और फ़ाइल भेज सकते हैं। संदेश 7 दिन बाद अपने आप हट जाते हैं।|Escribe tu pregunta, error o idea y el desarrollador responderá. Puedes enviar fotos, vídeos y archivos. Los mensajes se eliminan automáticamente a los 7 días.",
    h_empty: "Savol yoki taklifingizni yozing, dasturchi javob beradi|Савол ёки таклифингизни ёзинг, дастурчи жавоб беради|Напишите вопрос или предложение — разработчик ответит|Write your question or idea and the developer will reply|اكتب سؤالك أو اقتراحك وسيرد عليك المطوّر|Sorunuzu veya önerinizi yazın, geliştirici yanıtlayacak|Tulis pertanyaan atau saran Anda, pengembang akan membalas|写下您的问题或建议，开发者会回复|अपना सवाल या सुझाव लिखें, डेवलपर जवाब देगा|Escribe tu pregunta o idea y el desarrollador responderá",
    h_new: "Dasturchidan yangi xabar|Дастурчидан янги хабар|Новое сообщение от разработчика|New message from the developer|رسالة جديدة من المطوّر|Geliştiriciden yeni mesaj|Pesan baru dari pengembang|开发者的新消息|डेवलपर का नया संदेश|Nuevo mensaje del desarrollador",
    h_none: "Hozircha yangilik yo'q, hammasi tinch 🌿|Ҳозирча янгилик йўқ, ҳаммаси тинч 🌿|Пока всё тихо, новостей нет 🌿|All quiet for now, nothing new 🌿|كل شيء هادئ الآن ولا جديد 🌿|Şimdilik sessiz, yeni bir şey yok 🌿|Untuk saat ini tenang, belum ada kabar 🌿|暂时一切安静，没有新消息 🌿|अभी सब शांत है, कोई नई सूचना नहीं 🌿|Todo tranquilo por ahora, sin novedades 🌿",
    h_del: "Chatni o'chirish|Чатни ўчириш|Удалить чат|Delete chat|حذف المحادثة|Sohbeti sil|Hapus obrolan|删除聊天|चैट हटाएं|Eliminar chat",
    h_delq: "Bu suhbat butunlay o'chiriladi. Davom etamizmi?|Бу суҳбат бутунлай ўчирилади. Давом этамизми?|Эта переписка будет полностью удалена. Продолжим?|This conversation will be deleted completely. Shall we go on?|ستُحذف هذه المحادثة بالكامل. هل نتابع؟|Bu sohbet tamamen silinecek. Devam edelim mi?|Percakapan ini akan dihapus sepenuhnya. Lanjutkan?|此对话将被完全删除，要继续吗？|यह बातचीत पूरी तरह हट जाएगी। आगे बढ़ें?|Esta conversación se eliminará por completo. ¿Seguimos?",
    h_chats: "Chatlar|Чатлар|Чаты|Chats|المحادثات|Sohbetler|Obrolan|聊天|चैट|Chats",
    h_noc: "Hozircha xabar yo'q. Birinchi bo'lib yozishingiz mumkin 🌿|Ҳозирча хабар йўқ. Биринчи бўлиб ёзишингиз мумкин 🌿|Сообщений пока нет. Вы можете написать первым 🌿|No messages yet. Feel free to write first 🌿|لا رسائل بعد. يمكنك أن تبدأ أنت 🌿|Henüz mesaj yok. İlk yazan sen olabilirsin 🌿|Belum ada pesan. Silakan tulis lebih dulu 🌿|还没有消息，您可以先开口 🌿|अभी कोई संदेश नहीं। आप पहले लिख सकते हैं 🌿|Aún no hay mensajes. Puedes escribir primero 🌿",
    h_err: "Yuborilmadi|Юборилмади|Не отправлено|Not sent|لم يتم الإرسال|Gönderilemedi|Tidak terkirim|发送失败|भेजा नहीं गया|No enviado",
    ver: "Versiya|Версия|Версия|Version|الإصدار|Sürüm|Versi|版本|संस्करण|Versión",
    rate_my: "Sizning mahsulotimizga bahoyingiz|Сизнинг маҳсулотимизга баҳойингиз|Ваша оценка нашего продукта|Your rating of our product|تقييمك لمنتجنا|Ürünümüze puanınız|Penilaian Anda untuk produk kami|您对我们产品的评分|हमारे उत्पाद को आपकी रेटिंग|Tu valoración de nuestro producto",
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
    t_hl: "Marker|Маркер|Маркер|Highlighter|قلم التمييز|Fosforlu kalem|Stabilo|荧光笔|हाइलाइटर|Marcador",
    t_color: "Rang|Ранг|Цвет|Color|اللون|Renk|Warna|颜色|रंग|Color",
    t_glass: "Shisha|Шиша|Стекло|Glass|الزجاج|Cam|Kaca|玻璃|काँच|Cristal",
    more_d: "Batafsil|Батафсил|Подробнее|Details|التفاصيل|Detaylar|Detail|详情|विवरण|Detalles",
    pm_free: "Biz Premiumni oxirat uchun harakat qilayotgan insonlar uchun tekin qildik, Alloh yo'lida.|Биз Премиумни охират учун ҳаракат қилаётган инсонлар учун текин қилдик, Аллоҳ йўлида.|Мы сделали Премиум бесплатным для тех, кто трудится ради Ахирата, во имя Аллаха.|We made Premium free for people striving for the Hereafter, for the sake of Allah.|جعلنا بريميوم مجانًا لمن يسعى للآخرة، في سبيل الله.|Premium'u ahiret için çabalayanlara Allah yolunda ücretsiz yaptık.|Kami menggratiskan Premium bagi mereka yang berusaha untuk akhirat, di jalan Allah.|我们为追求后世的人免费开放高级版，为了真主。|हमने प्रीमियम को आख़िरत के लिए प्रयासरत लोगों के लिए अल्लाह की राह में मुफ़्त किया है।|Hicimos Premium gratuito para quienes se esfuerzan por la otra vida, por Alá.",
    dglass: "Shisha effekti|Шиша эффекти|Эффект стекла|Glass effect|تأثير الزجاج|Cam efekti|Efek kaca|玻璃效果|काँच प्रभाव|Efecto cristal",
    pm_need: "Bu funksiya Premium bilan ochiladi|Бу функция Премиум билан очилади|Доступно с Премиум|Available with Premium|متاح مع بريميوم|Premium ile açılır|Tersedia dengan Premium|需要高级版|प्रीमियम के साथ उपलब्ध|Disponible con Premium",
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
  function UZN(s) {
    if (typeof s !== "string") return s
    return s.replace(/o[ʻ‘’'`ʼ]/g, "ö").replace(/O[ʻ‘’'`ʼ]/g, "Ö").replace(/g[ʻ‘’'`ʼ]/g, "ğ").replace(/G[ʻ‘’'`ʼ]/g, "Ğ")
      .replace(/sh/g, "ş").replace(/Sh/g, "Ş").replace(/SH/g, "Ş").replace(/ch/g, "ç").replace(/Ch/g, "Ç").replace(/CH/g, "Ç")
  }
  function tr(key) {
    if (!TCACHE[key]) TCACHE[key] = TXT[key].split("|")
    if (S.lang === "uz_new") { var nk = key + "#n"; if (!TCACHE[nk]) TCACHE[nk] = [UZN(TCACHE[key][0])]; return TCACHE[nk][0] }
    var i = TXI.indexOf(S.lang)
    return TCACHE[key][i < 0 ? 3 : i] || TCACHE[key][3]
  }
  function pick(o) { return S.lang === "uz_new" ? UZN(o.uz || o.en) : (o[S.lang] || o.en) }

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
  function pToast(msg) {
    var el = document.getElementById("toast")
    el.innerHTML = "<span>" + esc(msg) + '</span><button data-act="premGo">' + esc(tr("more_d")) + " ›</button>"
    el.className = "toast show pm"
    clearTimeout(toastTimer)
    toastTimer = setTimeout(function () { el.className = "toast" }, 3500)
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
  if (navEl && !document.getElementById("navbg")) navEl.insertAdjacentHTML("afterend", '<div id="navbg"></div>')
  var NAVS = [
    ["names", "menu_book", "nav_names"],
    ["media", "movie", "nav_media"],
    ["mood", "mood", "nav_mood"],
    ["daily", "hourglass_top", "nav_daily"],
    ["more", "auto_awesome", "nav_more"]
  ]

  function aboutRate() {
    var g = U.rg, my = S.rate || 0, mine = ""
    for (var i = 1; i <= 5; i++) mine += '<button class="rs' + (i <= my ? " on" : "") + '" data-act="rateApp" data-v="' + i + '" aria-label="' + i + '"><img style="width:26px;height:26px;display:block;pointer-events:none" alt="\u2B50" draggable="false" data-k="0" src="' + emSrc("\u2B50", 0) + '" onerror="emErr(this)"></button>'
    return '<div class="itab">' +
      '<div class="ir" data-act="stDev"><span>' + esc(tr("ver")) + "</span><b>Mini app " + CFG.VERSION + "</b></div>" +
      '<div class="ir"><span>' + esc(tr("rate_my")) + '</span><span class="stars">' + mine + "</span></div></div>"
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
  var navInd = null, navDrag = null, navDone = 0
  function navIdx() { for (var i = 0; i < NAVS.length; i++) if (NAVS[i][0] === U.tab) return i; return 0 }
  function navPlace(first) {
    var b = navEl.querySelectorAll("button")[navIdx()]; if (!b || !navInd || !navEl.clientWidth) return
    navInd.style.transition = first ? "transform .35s cubic-bezier(.3,1.3,.4,1)" : "none"
    navInd.style.transform = "translateX(" + b.offsetLeft + "px)"
  }
  var AMT = {}
  function armAuto(flag, sel) {
    clearTimeout(AMT[flag])
    AMT[flag] = setTimeout(function () {
      if (!U[flag]) return
      var b = document.querySelector(sel)
      if (b) b.click(); else U[flag] = false
    }, 30000)
  }
  function goTab(v) {
    if (v === U.tab && !U.detail && !U.waq && !U.wg && !U.mm && !U.ach && !U.mn && !U.jr && U.more === "menu") { window.scrollTo({ top: 0, behavior: "smooth" }); return }
    var from = navIdx(), to = 0
    for (var i = 0; i < NAVS.length; i++) if (NAVS[i][0] === v) to = i
    var go = function () { window.scrollTo(0, 0); U.namesOpen = false; U.waq = false; U.wg = false; U.mm = false; U.ach = false; U.mn = false; MN.m = -1; MM.g = null; U.jr = ""; U.jrRet = false; U.wgOne = false; U.tab = v; U.hikBack = false; U.detail = 0; U.more = "menu"; U.moodPick = ""; render() }
    go()
  }
  var TR = { busy: 0 }
  function vDepth() {
    var st = ["lang", "theme", "mode", "remind", "robot", "premium"]
    return (U.detail ? 1 : 0) + ((U.waq || U.wg || U.mm || U.ach || U.mn || U.jr) ? 1 : 0) + (U.tab === "more" && U.more !== "menu" ? 1 : 0) + (U.tab === "more" && st.indexOf(U.more) >= 0 ? 1 : 0) +
      ((U.mn && MN.m >= 0) || (U.mm && MM.g) || (U.tab === "mood" && U.moodPick) || (U.jr && U.jr !== "main") || (U.tab === "more" && U.hcUid) ? 1 : 0)
  }
  function pageTrans(dir, big, fn) {
    var app = document.getElementById("app")
    if (!app || !app.animate || document.hidden || document.body.classList.contains("onb") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return fn()
    var r = app.getBoundingClientRect(), W = window.innerWidth, cl, wrap = document.createElement("div"), i
    try { cl = app.cloneNode(true) } catch (e) { return fn() }
    var c0 = app.querySelectorAll("canvas"), c1 = cl.querySelectorAll("canvas"), ids = cl.querySelectorAll("[id]")
    for (i = 0; i < c1.length && i < c0.length; i++) { try { c1[i].getContext("2d").drawImage(c0[i], 0, 0) } catch (e) {} }
    for (i = 0; i < ids.length; i++) ids[i].removeAttribute("id")
    var cs = getComputedStyle(app)
    cl.removeAttribute("id"); cl.style.cssText = "position:absolute;margin:0;left:" + r.left + "px;top:" + r.top + "px;width:" + r.width + "px;box-sizing:" + cs.boxSizing + ";padding:" + cs.padding + ";min-height:0;pointer-events:none"
    wrap.className = "pgx"; wrap.appendChild(cl); document.body.appendChild(wrap)
    TR.busy = 1
    document.documentElement.classList.add("sliding")
    fn()
    var a = document.getElementById("app"), fin = false, EZ = "cubic-bezier(.32,.72,0,1)", t = 480, inK, outK
    var done = function () { if (fin) return; fin = true; wrap.remove(); TR.busy = 0; document.documentElement.classList.remove("sliding") }
    if (big) { t = 260; inK = [{ opacity: 0 }, { opacity: 1 }]; outK = [{ opacity: 1 }, { opacity: 0 }] }
    else if (dir > 0) { inK = [{ opacity: 0, transform: "translateX(100%)" }, { opacity: 1, offset: .3 }, { opacity: 1, transform: "none" }]; outK = [{ opacity: 1, transform: "none" }, { opacity: 0, offset: .7 }, { opacity: 0, transform: "translateX(-30%)" }] }
    else if (dir < 0) { inK = [{ opacity: 0, transform: "translateX(-30%)" }, { opacity: 1, offset: .35 }, { opacity: 1, transform: "none" }]; outK = [{ opacity: 1, transform: "none" }, { opacity: 0, offset: .55 }, { opacity: 0, transform: "translateX(100%)" }] }
    else { t = 300; inK = [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }]; outK = [{ opacity: 1 }, { opacity: 0 }] }
    if (a) a.animate(inK, { duration: t, easing: big ? "ease-out" : EZ, fill: "backwards" })
    var o = cl.animate(outK, { duration: t, easing: big ? "ease-in" : EZ, fill: "forwards" })
    o.onfinish = done; setTimeout(done, t + 250)
  }
  ;(function edgeBack() {
    var sx = 0, sy = 0, dx = 0, on = 0, lt = 0, lx = 0, vx = 0, app = null
    function reset() { if (app) { app.style.transform = ""; app.style.opacity = "" } on = 0 }
    document.addEventListener("touchstart", function (e) {
      on = 0; if (e.touches.length !== 1 || TR.busy) return
      var t = e.touches[0]; if (t.clientX > 22 || vDepth() < 1) return
      sx = t.clientX; sy = t.clientY; dx = 0; lt = Date.now(); lx = sx; vx = 0; app = document.getElementById("app"); on = 1
    }, { passive: true })
    document.addEventListener("touchmove", function (e) {
      if (!on || !app) return
      var t = e.touches[0], mx = t.clientX - sx, my = t.clientY - sy
      if (on === 1) { if (Math.abs(my) > Math.abs(mx) + 6 && Math.abs(my) > 10) { on = 0; return } if (mx > 8) on = 2; else return }
      dx = Math.max(0, mx); var n = Date.now(); if (n > lt) vx = (t.clientX - lx) / (n - lt); lt = n; lx = t.clientX
      app.style.transform = "translateX(" + dx + "px)"; app.style.opacity = String(Math.max(.35, 1 - dx / (window.innerWidth * 1.1)))
    }, { passive: true })
    function end() {
      if (on !== 2 || !app) { on = 0; return }
      var W = window.innerWidth, a = app, go = dx > W * .33 || vx > .5
      on = 0
      if (!go) { a.animate([{ transform: "translateX(" + dx + "px)", opacity: a.style.opacity || 1 }, { transform: "none", opacity: 1 }], { duration: 260, easing: "cubic-bezier(.32,.72,0,1)" }); reset(); return }
      TR.busy = 1
      var o = a.animate([{ transform: "translateX(" + dx + "px)", opacity: a.style.opacity || 1 }, { transform: "translateX(" + W + "px)", opacity: 0 }], { duration: 200, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" })
      var fin = function () {
        o.cancel(); reset(); TR.busy = 0; TR.skip = 1; goBack(); TR.skip = 0
        var n = document.getElementById("app"); if (n && n.animate) n.animate([{ transform: "translateX(-22%)", opacity: 0 }, { opacity: 1, offset: .4 }, { transform: "none", opacity: 1 }], { duration: 380, easing: "cubic-bezier(.32,.72,0,1)", fill: "backwards" })
      }
      o.onfinish = fin
    }
    document.addEventListener("touchend", end, { passive: true })
    document.addEventListener("touchcancel", function () { if (on === 2) { reset() } on = 0 }, { passive: true })
  })()
  function navDragInit() {
    navEl.addEventListener("pointerdown", function (e) {
      var bs = navEl.querySelectorAll("button"); if (!bs.length || U.detail) return
      navDrag = { x: e.clientX, moved: 0, w: bs[0].offsetWidth, min: bs[0].offsetLeft, max: bs[bs.length - 1].offsetLeft, rect: navEl.getBoundingClientRect(), start: bs[navIdx()].offsetLeft }
    })
    navEl.addEventListener("pointermove", function (e) {
      if (!navDrag) return
      var dx = e.clientX - navDrag.x
      if (!navDrag.moved && Math.abs(dx) < 6) return
      if (!navDrag.moved) { navDrag.moved = 1; try { navEl.setPointerCapture(e.pointerId) } catch (er) {} navInd.style.transition = "none"; navEl.classList.add("dragging") }
      var x = Math.max(navDrag.min, Math.min(navDrag.max, navDrag.start + dx))
      navDrag.tx = x; if (navDrag.cx == null) navDrag.cx = navDrag.start
      if (!navDrag.raf) { var dd = navDrag; var lp = function () { if (navDrag !== dd) return; dd.cx += (dd.tx - dd.cx) * 0.3; navInd.style.transform = "translateX(" + dd.cx.toFixed(1) + "px)"; dd.raf = requestAnimationFrame(lp) }; dd.raf = requestAnimationFrame(lp) }
      var bs = navEl.querySelectorAll("button"), best = 0, bd = 1e9
      for (var i = 0; i < bs.length; i++) { var d = Math.abs(bs[i].offsetLeft - x); if (d < bd) { bd = d; best = i } }
      for (i = 0; i < bs.length; i++) bs[i].classList.toggle("pv", i === best)
      navDrag.best = best
    })
    function end() {
      if (!navDrag) return
      var d = navDrag; navDrag = null
      navEl.classList.remove("dragging")
      var bs = navEl.querySelectorAll("button"); for (var i = 0; i < bs.length; i++) bs[i].classList.remove("pv")
      if (!d.moved) return
      navDone = Date.now()
      navInd.style.transition = "transform .3s cubic-bezier(.3,1.3,.4,1)"
      goTab(NAVS[d.best == null ? navIdx() : d.best][0])
      navPlace(true)
    }
    navEl.addEventListener("pointerup", end); navEl.addEventListener("pointercancel", end)
    navEl.addEventListener("click", function (e) { if (Date.now() - navDone < 400) { e.stopPropagation(); e.preventDefault() } }, true)
  }
  setTimeout(function () { navDragInit() }, 0)
  function renderNav() {
    var h = ""
    for (var i = 0; i < NAVS.length; i++) {
      h += '<button data-act="tab" data-v="' + NAVS[i][0] + '" aria-label="' + esc(tr(NAVS[i][2])) + '" class="' + (U.tab === NAVS[i][0] && !U.detail ? "on" : "") + (NAVS[i][0] === "more" && HCH.n > 0 ? " hasn" : "") + '">' + ic(NAVS[i][1], "ic") + '<span>' + esc(tr(NAVS[i][2])) + "</span></button>"
    }
    navEl.innerHTML = h
    navEl.className = "nav" + (U.detail ? " hidden" : "")
    if (!navInd) { navInd = document.createElement("i"); navInd.className = "navind" }
    navEl.appendChild(navInd)
    navPlace(true)
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
      viewHomePanel()
  }

  // ====================
  // VOQEA CHALLENJI
  // ====================
  var WQ_MAX = 40
  function wq() { return S.wq || (S.wq = { on: false, level: 1, debt: 0, draft: 0, done: false, last: "", d0: 0, read: 0, total: 0, bonus: 0, fin: false }) }
  function dayNum(k) { var p = k.split("-"); return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 864e5 }
  function addDay(k, n) { var d = new Date((dayNum(k) + n) * 864e5); return d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2) }
  function wqNorm(w) {
    if (!w.dd || w.dd.length !== w.debt) {
      var t = todayStr(); w.dd = []
      for (var i = w.debt; i >= 1; i--) w.dd.push(addDay(t, -i))
    }
    if (!w.dd0 || w.dd0.length !== w.d0) { w.dd0 = w.dd.slice(0, w.d0) }
    return w
  }
  function wqRoll() {
    var w = wq(); if (!w.on || w.fin) return
    wqNorm(w)
    var t = todayStr()
    if (!w.last) { w.last = t; return }
    if (w.last === t) return
    var n = Math.round(dayNum(t) - dayNum(w.last)); if (n < 1) { w.last = t; return }
    if (w.done) { if (w.level < WQ_MAX) w.level++ } else w.dd.push(w.last)
    for (var i = 1; i < n; i++) w.dd.push(addDay(w.last, i))
    w.debt = w.dd.length
    w.done = false; w.draft = 0; w.read = 0; w.bonus = 0; w.d0 = w.debt; w.dd0 = w.dd.slice(); w.last = t
    save()
  }
  function wqLeft(w) { return (w.done ? 0 : w.level) + w.debt * w.level - w.draft }
  function wqLock(w) { return w.fin || (w.done && w.debt === 0) }
  function wqTap() {
    var w = wq(); wqRoll()
    if (wqLock(w)) return
    w.total++; w.draft++; w.read++
    while (w.draft >= w.level) {
      if (w.debt > 0) { w.debt--; if (w.dd) w.dd.shift(); w.draft -= w.level }
      else if (!w.done) { w.done = true; w.draft -= w.level }
      else break
    }
    if (w.done && w.debt === 0) { w.draft = 0; if (w.level >= WQ_MAX) w.fin = true }
    save()
  }
  function wqLoc() { var l = S.lang; return l === "uz_kr" ? "uz-Cyrl" : l === "uz_new" ? "uz" : l === "zh" ? "zh-CN" : l }
  var WQM = {
    uz: "yanvar fevral mart aprel may iyun iyul avgust sentabr oktabr noyabr dekabr",
    uz_kr: "январ феврал март апрел май июн июл август сентабр октабр ноябр декабр",
    ru: "января февраля марта апреля мая июня июля августа сентября октября ноября декабря",
    en: "January February March April May June July August September October November December",
    tr: "Ocak Şubat Mart Nisan Mayıs Haziran Temmuz Ağustos Eylül Ekim Kasım Aralık",
    id: "Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember",
    es: "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre"
  }
  function wqFmt(k, lv) {
    var p = k.split("-"), d = +p[2], mi = +p[1] - 1, l = S.lang === "uz_new" ? "uz" : S.lang, nm
    if (l === "zh") return (mi + 1) + "月" + d + "日"
    if (WQM[l]) nm = WQM[l].split(" ")[mi]
    else {
      try { nm = new Intl.DateTimeFormat(l, { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(+p[0], mi, 15, 12))) } catch (x) { nm = WQM.en.split(" ")[mi] }
    }
    if (lv === 1) nm = nm.slice(0, 3); else if (lv === 2) nm = nm.slice(0, 2)
    var s = d + ((l === "uz" || l === "uz_kr") ? "-" : " ") + nm
    return S.lang === "uz_new" ? UZN(s) : s
  }
  function wqChip(k, today) {
    if (today) { var t = esc(tr("waq_today")); return '<div class="wqdc"><span class="wqchip"><b class="f">' + t + '</b><b class="s">' + t + '</b><b class="t">' + esc(t.slice(0, 3)) + "</b></span></div>" }
    return '<div class="wqdc"><span class="wqchip"><b class="f">' + esc(wqFmt(k, 0)) + '</b><b class="s">' + esc(wqFmt(k, 1)) + '</b><b class="t">' + esc(wqFmt(k, 2)) + "</b></span></div>"
  }
  function wqLv() {
    var w = wqNorm(wq()), L = w.level, N = 1 + w.d0, T = L * N, p = Math.min(w.read, T)
    var D = w.dd0.concat([w.last || todayStr()]), seg = "", lab = N <= 8, chips = "", ticks = "", dots = "", i
    if (N <= 24) {
      for (i = 0; i < N; i++) {
        var f = Math.max(0, Math.min(L, p - i * L))
        seg += '<span class="wqs' + (f >= L ? " full" : "") + '"><i style="width:' + (f / L * 100) + '%"></i>' + (lab ? "<em>" + f + "/" + L + "</em>" : "") + "</span>"
        chips += '<div class="wqcw' + (f >= L ? " ok" : "") + '">' + wqChip(D[i], i === N - 1) + "</div>"
        dots += "<i></i>"
        if (i > 0 && D[i].slice(0, 4) !== D[i - 1].slice(0, 4)) ticks += '<u class="wqyt" style="left:' + (i / N * 100) + '%"><s>' + D[i].slice(0, 4) + "</s></u>"
      }
    } else {
      seg = '<span class="wqs one"><i style="width:' + (p / T * 100) + '%"></i></span>'
      chips = '<div class="wqcw">' + wqChip(D[0], false) + '</div><div class="wqcw"><div class="wqdc"><span class="wqchip">' + N + " " + esc(tr("waq_dw")) + '</span></div></div><div class="wqcw">' + wqChip("", true) + "</div>"
      dots = "<i></i><i></i><i></i>"
      for (i = 1; i < N; i++) if (D[i].slice(0, 4) !== D[i - 1].slice(0, 4)) ticks += '<u class="wqyt" style="left:' + (i / N * 100) + '%"><s>' + D[i].slice(0, 4) + "</s></u>"
    }
    var ncol = N <= 24 ? N : 3
    return '<div class="wqdates" style="--n:' + ncol + '">' + chips + "</div>" +
      '<div class="wqdots" style="--n:' + ncol + '">' + dots + "</div>" +
      '<div class="wqbw' + (ticks ? " yr" : "") + '"><div class="wqbar">' + seg + "</div>" + ticks + "</div>" +
      '<div class="wqnums"><span class="wqg">' + esc(tr("waq_total")) + " <b>" + p + "/" + T + "</b></span>" +
      (w.debt ? '<span class="wqg">' + esc(tr("waq_debt")) + " <b>" + w.debt + " " + esc(tr("waq_dw")) + " × " + L + "</b></span>" : "") +
      '<span class="wqg">' + esc(tr("waq_left")) + " <b>" + Math.max(0, wqLeft(w)) + "</b></span></div>"
  }
  function wqTrans(i) {
    var T = window.WAQ_T || {}, l = S.lang
    if (l === "uz_new") return UZN((T.uz || [])[i] || "")
    return (T[l] || T.en || [])[i] || ""
  }
  function wqTl(i) {
    var R = window.WAQ_R || {}, l = S.lang
    if (l === "uz_new") return UZN((R.uz || [])[i] || "")
    return (R[l] || (l === "ru" ? R.uz_kr : null) || R.en || [])[i] || ""
  }
  function viewWaq() {
    var w = wq(); wqRoll()
    var back = '<button class="btn small back circ" data-act="waqClose" aria-label="back">' + ic("arrow_back") + "</button>"
    if (!w.on) return back + '<div class="card stack goalbox"><h2 class="wqt">' + ic("bedtime") + " " + esc(tr("waq_t")) + '</h2><p class="sub">' + esc(tr("waq_rules")) + '</p><button class="btn success block" data-act="waqStart">' + esc(tr("waq_start")) + "</button></div>"
    var W = window.WAQ || [], ar = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], p1 = "", p2 = "", p3 = ""
    for (var i = 0; i < W.length; i++) {
      var n = String(i + 1).split("").map(function (c) { return ar[+c] }).join("")
      p1 += W[i] + ' <span class="ay">' + n + "</span> "
      p2 += '<p><sup>' + (i + 1) + "</sup> " + esc(wqTl(i)) + "</p>"
      p3 += '<p><sup>' + (i + 1) + "</sup> " + esc(wqTrans(i)) + "</p>"
    }
    var lock = wqLock(w), tabs = [["العربية", 0], [tr("waq_p2"), 1], [tr("waq_p3"), 2]].map(function (t) {
      return '<button class="wqtab' + (t[1] === 0 ? " on" : "") + '" data-act="waqPg" data-v="' + t[1] + '">' + esc(t[0]) + "</button>"
    }).join("")
    return '<div class="wqtop">' + back + '<div class="wqttl"><div class="wqpill">' + ic("bedtime") + "<b>" + esc(tr("waq_t")) + '</b></div><div class="wqlvb" id="wqlvn" title="' + esc(tr("waq_lv")) + '">' + ic("military_tech") + "<b>" + w.level + "</b></div></div><span></span></div>" +
      '<div class="waq"><div class="wqbox"><div class="wqtabs">' + tabs + "</div>" +
      '<div class="wqpg" dir="ltr"><section class="wqp p1" dir="rtl" lang="ar">' + p1 + '</section><section class="wqp p2">' + p2 + '</section><section class="wqp p3">' + p3 + "</section></div></div>" +
      '<div id="wqlv" class="wqlv">' + (w.fin ? '<p class="wqg done center">✦ ' + esc(tr("waq_fin")) + "</p>" : wqLv()) + "</div>" +
      '<div class="tapzone wqtz"><i class="tb b1"></i><i class="tb b2"></i><i class="tb b3"></i><button id="wqplus" class="tap-round' + (lock ? " off" : "") + '" data-act="waqTap" aria-label="+">' + (lock ? "✓" : ic("add")) + "</button></div>" +
      (w.fin ? '<button class="btn small wqrst" data-act="waqReset">' + ic("restart_alt") + " " + esc(tr("waq_reset")) + "</button>" : "") + "</div>"
  }
  function wqPaint() {
    var w = wq(), el = document.getElementById("wqlv"); if (!el) return
    if (w.fin) { render(); return }
    el.innerHTML = wqLv()
    var b = document.getElementById("wqplus"), lock = wqLock(w)
    if (b) { b.classList.toggle("off", lock); b.innerHTML = lock ? "✓" : ic("add") }
  }
  // ===== SO'Z O'YINI (ismlar, inglizcha harflar) =====
  var WGG = [6, 6, 6, 7, 7, 7, 8, 8, 8, 9], WGK = [3, 3, 4, 4, 5, 5, 5, 6, 6, 7], WGMAX = { 1: 10, 2: 10, 3: 10, 4: 10 }
  var WGCOL = ["#3fb98a", "#e8706d", "#f0b455", "#5aa8e0", "#a98be0", "#ee8db0", "#4fc0c0", "#8cc152"]
  var WGP = null, WG = { L: null, path: [], drag: false, fl: null, cache: {}, lk: 0 }
  function wgRng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
  function wgPool() {
    if (WGP) return WGP
    WGP = []
    var pre = { al: 1, ar: 1, as: 1, at: 1, ad: 1, an: 1, az: 1, ash: 1, ath: 1, adh: 1, ag: 1 }, seen = {}
    for (var i = 0; i < D.names.length; i++) {
      var p = plain(D.names[i].t).split("-")
      if (p.length > 1 && pre[p[0]]) p.shift()
      var w = p.join("").replace(/[^a-z]/g, "").toUpperCase()
      if (w.length >= 4 && w.length <= 9 && !seen[w]) { seen[w] = 1; WGP.push({ w: w, i: i }) }
    }
    return WGP
  }
  function wgRev(s) { return s.split("").reverse().join("") }
  function wgSteps(mode, len, rnd) {
    var H = [0, 1], V = [1, 0], st = [], i
    if (mode === 3 && len >= 3 && rnd() < 0.7) {
      var a = 1 + Math.floor(rnd() * (len - 2)), b = len - 1 - a, f = rnd() < 0.5 ? [H, V] : [V, H]
      for (i = 0; i < a; i++) st.push(f[0])
      for (i = 0; i < b; i++) st.push(f[1])
      st.bent = true
      return st
    }
    var ds = mode === 1 ? [H] : mode === 4 ? [H, V, [1, 1], [-1, 1]] : [H, V], d = ds[Math.floor(rnd() * ds.length)]
    for (i = 0; i < len - 1; i++) st.push(d)
    return st
  }
  function wgGen(lv) {
    var mode = Math.floor(lv / 10) + 1, l = lv % 10, n = WGG[l], k = WGK[l], P = wgPool()
    for (var att = 0; att < 120; att++) {
      var rnd = wgRng(lv * 7919 + att * 104729 + 13), pl = P.filter(function (x) { return x.w.length <= n }), j, q
      for (j = pl.length - 1; j > 0; j--) { q = Math.floor(rnd() * (j + 1)); var tt = pl[j]; pl[j] = pl[q]; pl[q] = tt }
      var ch = []
      for (j = 0; j < pl.length && ch.length < k; j++) {
        var w = pl[j].w, rv = wgRev(w), bad = false
        for (q = 0; q < ch.length; q++) { var c = ch[q].w; if (c.indexOf(w) >= 0 || w.indexOf(c) >= 0 || c.indexOf(rv) >= 0 || rv.indexOf(c) >= 0) bad = true }
        if (!bad) ch.push(pl[j])
      }
      if (ch.length < k) continue
      ch.sort(function (a, b) { return b.w.length - a.w.length })
      var g = [], i, ok = true, bends = 0, res = []
      for (i = 0; i < n * n; i++) g.push("")
      for (j = 0; j < ch.length && ok; j++) {
        var W = ch[j].w, placed = false
        for (var t = 0; t < 200 && !placed; t++) {
          var st = wgSteps(mode, W.length, rnd), r = 0, c2 = 0, mnr = 0, mxr = 0, mnc = 0, mxc = 0
          for (i = 0; i < st.length; i++) { r += st[i][0]; c2 += st[i][1]; mnr = Math.min(mnr, r); mxr = Math.max(mxr, r); mnc = Math.min(mnc, c2); mxc = Math.max(mxc, c2) }
          var hr = n - 1 - mxr + mnr, hc = n - 1 - mxc + mnc
          if (hr < 0 || hc < 0) continue
          var r0 = -mnr + Math.floor(rnd() * (hr + 1)), c0 = -mnc + Math.floor(rnd() * (hc + 1)), cells = [[r0, c0]], good = true
          for (i = 0; i < st.length; i++) cells.push([cells[i][0] + st[i][0], cells[i][1] + st[i][1]])
          for (i = 0; i < cells.length; i++) { var cur = g[cells[i][0] * n + cells[i][1]]; if (cur && cur !== W.charAt(i)) { good = false; break } }
          if (!good) continue
          for (i = 0; i < cells.length; i++) g[cells[i][0] * n + cells[i][1]] = W.charAt(i)
          if (st.bent) bends++
          res.push({ w: W, i: ch[j].i, p: cells }); placed = true
        }
        if (!placed) ok = false
      }
      if (!ok || (mode === 3 && bends < Math.ceil(k / 2))) continue
      var pool = res.map(function (x) { return x.w }).join(""), AL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      for (i = 0; i < n * n; i++) if (!g[i]) g[i] = rnd() < 0.55 ? pool.charAt(Math.floor(rnd() * pool.length)) : AL.charAt(Math.floor(rnd() * 26))
      res.sort(function (a, b) { return a.p[0][0] * 20 + a.p[0][1] - b.p[0][0] * 20 - b.p[0][1] })
      return { n: n, mode: mode, g: g, words: res }
    }
    return null
  }
  function wgS() {
    var g = S.wg
    if (!g || typeof g.lv !== "number") g = S.wg = { lv: 0, day: "", n: 0, f: [] }
    if (g.day !== todayStr()) { g.day = todayStr(); g.n = 0 }
    return g
  }
  function wgLim() { return isPrem() ? 10 : 1 }
  function wgLevel(lv) { return WG.cache[lv] || (WG.cache[lv] = wgGen(lv)) }
  function wgFound(g, i) { for (var k = 0; k < g.f.length; k++) if (g.f[k].i === i) return true; return false }
  function wgLine(p, col, inner, cls) {
    var pts = p.map(function (q) { return (q[1] + .5) + "," + (q[0] + .5) }).join(" ")
    if (p.length === 1) pts += " " + pts
    return '<g class="' + (cls || "") + '"><polyline points="' + pts + '" style="stroke:' + col + '" /><polyline class="in" points="' + pts + '" style="stroke:' + inner + '" /></g>'
  }
  function wgDraw() {
    var sv = document.getElementById("wgsv"), g = wgS()
    if (!sv || !WG.L) return
    var h = "", k
    for (k = 0; k < g.f.length; k++) { var c = WGCOL[k % WGCOL.length]; h += wgLine(g.f[k].p, c, "color-mix(in srgb," + c + " 17%,var(--card))", WG.pop === g.f[k].i ? "wgin" : "") }
    WG.pop = -1
    if (WG.fl) h += wgLine(WG.fl.p, "#e8706d", "color-mix(in srgb,#e8706d 15%,var(--card))", "wgfl")
    if (WG.path.length) h += wgLine(WG.path, "var(--accent)", "var(--card)", "")
    sv.innerHTML = h
  }
  function wgChipsHtml() {
    var g = wgS(), L = WG.L, m = L.mode, h = "", i, k, un = [], fd = []
    for (k = 0; k < g.f.length; k++) fd.push(k)
    for (i = 0; i < L.words.length; i++) if (!wgFound(g, L.words[i].i)) un.push(L.words[i])
    if (m === 4) h += '<span class="wgcnt">' + g.f.length + " / " + L.words.length + "</span>"
    else for (i = 0; i < un.length; i++) {
      var w = un[i].w, t = m === 2 ? w.slice(0, -1) + "*" : m === 3 ? w.slice(0, -2) + "**" : w
      h += '<span class="wgw">' + esc(t) + "</span>"
    }
    for (k = 0; k < g.f.length; k++) h += '<button class="wgw ok" data-act="wgName" data-v="' + (g.f[k].i + 1) + '" style="--wc:' + WGCOL[k % WGCOL.length] + '">' + ic("check_circle") + " " + esc(D.names[g.f[k].i].t) + " | " + (g.f[k].i + 1) + "</button>"
    return h
  }
  function wgChips() { var el = document.getElementById("wgwords"); if (el && WG.L) el.innerHTML = wgChipsHtml() }
  function viewWg() {
    var g = wgS(), lim = wgLim(), prem = isPrem()
    var top = '<div class="wqtop"><button class="btn small back circ" data-act="wgClose" aria-label="back">' + ic("arrow_back") + '</button><div class="wqpill wgpill">' + ic("extension") + " " + esc(tr("wg_t")) + '</div><div class="wqlvb">' + ic("military_tech") + "<b>" + Math.min(g.lv + 1, 40) + "</b></div></div>"
    if (g.lv >= 40) return '<div class="wg">' + top + '<div class="card wgmsg">' + ic("military_tech") + "<b>" + esc(tr("wg_all")) + "</b></div></div>"
    if (g.n >= lim) return '<div class="wg">' + top + '<div class="card wgmsg">' + ic("lock_clock") + "<b>" + esc(tr("wg_lim")) + "</b>" + (prem ? "" : '<button class="btn primary" data-act="premGo">' + ic("workspace_premium") + " " + esc(tr("wg_limp")) + "</button>") + "</div></div>"
    var L = wgLevel(g.lv)
    if (!L) return '<div class="wg">' + top + "</div>"
    WG.L = L; WG.path = []; WG.fl = null
    var i
    // chiplar word.i bo'yicha emas, tartib bo'yicha: indeks sifatida ism raqami
    var cs = ""
    for (i = 0; i < L.n * L.n; i++) cs += "<div class=\"wgc\">" + L.g[i] + "</div>"
    setTimeout(function () { wgDraw(); wgChips() }, 0)
    return '<div class="wg">' + top +
      '<div class="wgmeta"><span>' + esc(tr("wg_m" + L.mode)) + "</span><span>" + esc(tr("wg_today")) + " " + g.n + "/" + lim + "</span></div>" +
      '<div id="wgwords" class="wgwords">' + wgChipsHtml() + "</div>" +
      '<div class="wgbox"><div id="wgb" class="wgb" style="--n:' + L.n + '"><svg id="wgsv" class="wgsv" viewBox="0 0 ' + L.n + " " + L.n + '"></svg>' + cs + '</div><div id="wgok" class="wgok"><span>' + ic("check_circle") + " " + esc(tr("wg_ok")) + "</span></div></div>" +
      '<p class="wghint">' + esc(tr("wg_help")) + "</p></div>"
  }
  function wgCell(e) {
    var b = document.getElementById("wgb")
    if (!b || !WG.L) return null
    var r = b.getBoundingClientRect(), n = WG.L.n, x = (e.clientX - r.left) / r.width * n, y = (e.clientY - r.top) / r.height * n, c = Math.floor(x), rr = Math.floor(y)
    if (c < 0 || rr < 0 || c >= n || rr >= n) return null
    if (Math.hypot(x - c - .5, y - rr - .5) > .62) return null
    return [rr, c]
  }
  function wgTurns(p) {
    var t = 0
    for (var i = 2; i < p.length; i++) if (p[i][0] - p[i - 1][0] !== p[i - 1][0] - p[i - 2][0] || p[i][1] - p[i - 1][1] !== p[i - 1][1] - p[i - 2][1]) t++
    return t
  }
  function wgAdd(cell) {
    var p = WG.path, m = WG.L.mode, i
    if (!p.length) { p.push(cell); return true }
    var last = p[p.length - 1]
    if (last[0] === cell[0] && last[1] === cell[1]) return false
    if (p.length > 1 && p[p.length - 2][0] === cell[0] && p[p.length - 2][1] === cell[1]) { p.pop(); return true }
    for (i = 0; i < p.length; i++) if (p[i][0] === cell[0] && p[i][1] === cell[1]) return false
    var dr = cell[0] - last[0], dc = cell[1] - last[1], orth = Math.abs(dr) + Math.abs(dc) === 1, dg = Math.abs(dr) === 1 && Math.abs(dc) === 1
    if (m === 1) { if (dr !== 0 || !orth) return false }
    else if (m === 4) { if (!orth && !dg) return false }
    else if (!orth) return false
    p.push(cell)
    if (wgTurns(p) > (m === 3 ? 1 : 0)) { p.pop(); return false }
    return true
  }
  function wgEnd() {
    var p = WG.path, g = wgS()
    WG.path = []; WG.drag = false
    if (p.length < 2 || !WG.L) { wgDraw(); return }
    var s = p.map(function (q) { return WG.L.g[q[0] * WG.L.n + q[1]] }).join(""), rs = wgRev(s), hit = -1, i
    for (i = 0; i < WG.L.words.length; i++) { var w = WG.L.words[i]; if (hit < 0 && !wgFound(g, w.i) && (w.w === s || w.w === rs)) hit = w.i }
    if (hit >= 0) {
      g.f.push({ i: hit, p: p }); save(); haptic("medium"); WG.pop = hit; wgDraw(); wgChips()
      if (g.f.length === WG.L.words.length) wgDone()
    } else {
      WG.fl = { p: p }; haptic("light"); wgDraw()
      var f = WG.fl
      setTimeout(function () { if (WG.fl === f) { WG.fl = null; wgDraw() } }, 480)
    }
  }
  function wgDone() {
    var g = wgS(), ok = document.getElementById("wgok")
    g.lv++; g.n++; g.f = []; save(); haptic("heavy"); jrMark("g")
    if (ok) ok.classList.add("on")
    var lk = ++WG.lk
    setTimeout(function () { if (lk === WG.lk && U.waq === undefined) { /* noop */ } if (lk === WG.lk && U.wg) { if (U.wgOne) { U.wg = false; U.wgOne = false; WG.L = null; window.scrollTo(0, 0) } render() } }, 1900)
  }
  document.addEventListener("pointerdown", function (e) {
    var b = e.target.closest && e.target.closest("#wgb")
    if (!b || !WG.L) return
    var c = wgCell(e)
    WG.drag = true; WG.path = []
    try { b.setPointerCapture(e.pointerId) } catch (x) {}
    if (c) wgAdd(c)
    wgDraw(); e.preventDefault()
  })
  document.addEventListener("pointermove", function (e) {
    if (!WG.drag) return
    var c = wgCell(e)
    if (c && wgAdd(c)) wgDraw()
  })
  document.addEventListener("pointerup", function () { if (WG.drag) wgEnd() })
  document.addEventListener("pointercancel", function () { if (WG.drag) { WG.path = []; WG.drag = false; wgDraw() } })
  // ===== ROBOT (piksel, JS bilan chiziladi) =====
  var PET = { el: null, cv: null, cx: null, bub: null, x: 70, tx: 70, t: 0, act: "", at: 0, dur: 0, jy: 0, face: "n", gaze: 0, la: "down", ra: "down", by: 0, bt: 0, bl: 0, tm: null, sad: false, seen: false, bubAt: 0, bubT: 0, ph: 0, n: 0, fl: null, lastSad: 0, init: false, oy: 0, toy: 0, fh: 40, sx: 0, fire: false, tint: "", um: false, emo: "", emoUntil: 0, hap: 0, rc: null, rest: 0 }
  var PC = { b: "#cfd8ea", s: "#9fb0cf", d: "#27324d", sc: "#0f1a2e", e: "#5eead4", a: "#ff7a8a", t: "#7dd3fc", p: "#ff9db0" }
  var PARM = {
    down: [[1, 17, 2, 5, "b"], [1, 22, 2, 2, "s"]],
    mid: [[1, 17, 2, 3, "b"], [2, 19, 2, 2, "b"], [3, 20, 2, 2, "s"]],
    droop: [[2, 17, 2, 4, "b"], [2, 21, 2, 3, "s"]],
    out: [[0, 17, 4, 2, "b"], [0, 16, 2, 4, "s"]],
    up: [[0, 16, 3, 2, "b"], [0, 11, 2, 6, "b"], [0, 9, 2, 2, "s"]],
    up2: [[0, 16, 3, 2, "b"], [1, 11, 2, 6, "b"], [1, 9, 2, 2, "s"]],
    wipe: [[3, 17, 2, 2, "b"], [3, 13, 2, 5, "b"], [4, 11, 3, 3, "s"]]
  }
  function petOn() { return S.pet !== false }
  function petSync() {
    var ds = S.daily
    if (!ds) return
    var c = (ds.count || 0) + (ds.draft || 0)
    if (S.petCnt === undefined) { S.petCnt = c; return }
    if (c > S.petCnt) S.petSal = todayStr()
    if (c !== S.petCnt) { S.petCnt = c; save() }
  }
  function petSad() {
    var ds = S.daily
    if (!ds || !ds.target || new Date().getHours() < 10) return false
    petSync()
    return S.petSal !== todayStr() && !ds.todayDone
  }
  function petSnow() { return S.bgmode === "season" && S.season === "winter" && isPrem() && !!document.querySelector("#mbg .snw") }
  function petBub(txt, ms, act) {
    var b = PET.bub
    if (!b) return
    if (!txt) { b.classList.remove("on", "go"); return }
    if (act) { b.innerHTML = "<span>" + esc(txt) + '</span><button class="petgo" data-act="petTip" data-v="' + act + '" aria-label="open">\u203a</button>'; b.classList.add("go") }
    else { b.textContent = txt; b.classList.remove("go") }
    var W = window.innerWidth, sh = PET.x < 100 ? 100 - PET.x : PET.x > W - 100 ? (W - 100) - PET.x : 0
    b.style.setProperty("--sh", sh + "px")
    b.classList.add("on")
    PET.bubAt = PET.t; PET.bubT = ms || 3000
  }
  var PHR = ["Mashaa Alloh!", "Barakallah!", "Alhamdulillah!", "SubhanAllah!", "Jazakallahu khayran!", "Allohu Akbar!"]
  function petSeason() { return (S.bgmode === "season" && isPrem()) ? S.season : "" }
  function petRelease() { var c = SNOW.cap; if (c && SNOW.fl) { var n = SNOW.mk(false); for (var i = 0; i < SNOW.fl.length; i++) if (SNOW.fl[i] === c) SNOW.fl[i] = n }; SNOW.cap = null; PET.cap = null; PET.fl = null }
  function petGo(name, dur) { if (PET.cap) petRelease(); PET.act = name; PET.at = 0; PET.dur = dur; PET.ph = 0; PET.n = 0; PET.la = "down"; PET.ra = "down"; PET.face = "n"; PET.gaze = 0; PET.by = 0; PET.um = false }
  var ZK = ["SubhanAllah", "Alhamdulillah", "Allahu Akbar", "La ilaha illAllah", "Astaghfirullah", "In shaa Alloh"]
  function petRnd(a, b) { return a + Math.random() * (b - a) }
  function petPick() {
    var sad = petSad(), r = Math.random()
    if (sad) {
      if (!PET.seen || PET.t - PET.lastSad > 60000) { PET.seen = true; PET.lastSad = PET.t; petGo("think", 4200); return }
      if (r < .4) petGo("sadidle", 3000 + Math.random() * 2500)
      else if (r < .65) petGo("wipe", 1900)
      else if (r < .8) petGo("sigh", 1900)
      else if (r < .9) petGo("peek", 2800)
      else { PET.tx = petRnd(50, window.innerWidth - 50); petGo("hide", 15000) }
      return
    }
    if (PET.sad) return
    var sn = petSeason(), W = window.innerWidth
    r = Math.random()
    if (sn === "winter" && r < .35) {
      if (SNOW.fl && Math.random() < .65) { PET.tx = petRnd(50, W - 50); petGo("snow", 14000) } else petGo("cold", 4600)
      return
    }
    if (sn === "summer" && r < .3) { PET.tx = petRnd(50, W - 50); petGo("sun", 9000); return }
    r = Math.random()
    if (r < .22) { PET.tx = petRnd(45, W - 45); petGo("walk", 9000) }
    else if (r < .34) petGo("idle", 2500 + Math.random() * 2500)
    else if (r < .41) petGo("wave", 3200)
    else if (r < .48) petGo("dance", 4200)
    else if (r < .54) petGo("jump", 900)
    else if (r < .59) petGo("yawn", 2600)
    else if (r < .66) petGo("zikr", 4200)
    else if (r < .71) petGo("peek", 3000)
    else if (r < .81) { PET.tx = petRnd(45, W - 45); PET.fh = petRnd(32, 56); petGo("fly", 16000) }
    else if (r < .91) { PET.tx = petRnd(40, W - 40); PET.fh = petRnd(110, Math.max(130, window.innerHeight - 260)); petGo("explore", 20000) }
    else { PET.tx = petRnd(50, W - 50); petGo("hide", 15000) }
  }
  function petEmo(face, ms) { PET.emo = face; PET.emoUntil = PET.t + ms }
  function petStep(dt) {
    var f = PET, a = f.act, p = f.at / f.dur, sec = Math.floor(f.t / 250), W = window.innerWidth, d
    f.t += dt; f.at += dt; f.jy = 0
    var lo = f.lo == null ? 30 : f.lo, hi = f.hi == null ? W - 30 : f.hi
    if (f.tx < lo) f.tx = lo; else if (f.tx > hi) f.tx = hi
    if (f.bubT && f.t - f.bubAt > f.bubT) { f.bubT = 0; petBub("") }
    f.bt += dt
    if (f.bt > 3600) { f.bt = 0; f.bl = 140 }
    if (f.bl > 0) f.bl -= dt
    sec = Math.floor(f.t / 250)
    f.oy += (f.toy - f.oy) * Math.min(1, dt / 240)
    f.sx = 0; f.fire = false; f.tint = ""
    if (!a) { f.toy = 0; if (f.t < f.rest) { petGo("idle", 1500); return } petPick(); return }
    f.face = PET.sad ? "teary" : "n"
    if (PET.sad) { f.la = "droop"; f.ra = "droop" }
    if (a === "idle") { f.toy = 0; f.gaze = [0, -1, 0, 1][Math.floor(f.at / 1300) % 4]; f.by = Math.floor(f.t / 900) % 2 }
    else if (a === "walk") {
      f.toy = 0; d = f.tx - f.x; f.gaze = d > 0 ? 1 : -1
      f.x += Math.sign(d) * 30 * dt / 1000
      f.by = sec % 2; f.la = sec % 2 ? "mid" : "down"; f.ra = sec % 2 ? "down" : "mid"
      if (Math.abs(d) < 3) f.at = f.dur
    } else if (a === "wave") { f.face = "happy"; f.ra = sec % 2 ? "up" : "up2"; if (f.at < 60) petBub(tr("pet_hi"), 2000) }
    else if (a === "dance") { f.face = "happy"; f.by = sec % 2; f.la = sec % 2 ? "up" : "mid"; f.ra = sec % 2 ? "mid" : "up2"; f.x += Math.sin(f.at / 260) * .4 }
    else if (a === "jump") { f.face = "happy"; f.la = "up"; f.ra = "up2"; f.jy = Math.abs(Math.sin(Math.PI * p)) * 20; if (f.at >= f.dur - 40) petEmo("pant", 1500) }
    else if (a === "yawn") { f.face = f.at > 300 && f.at < 1700 ? "o" : "blink"; f.by = f.at > 300 && f.at < 1700 ? 1 : 0 }
    else if (a === "zikr") { f.face = "happy"; f.la = "mid"; f.ra = "mid"; if (f.at < 60) petBub(ZK[Math.floor(Math.random() * ZK.length)], 2800) }
    else if (a === "peek") { f.gaze = [-1, 1, 0, 1, -1][Math.floor(f.at / 600) % 5]; if (!PET.sad) f.face = "n" }
    else if (a === "think") {
      f.face = "n"; f.gaze = -1; f.ra = "mid"; f.by = 0
      if (f.at > 500 && f.at < 1300 && !PET.bub.classList.contains("on")) petBub("…", 900)
      if (f.at > 1500 && !f.n) { f.n = 1; petBub(tr("pet_sal"), 4200) }
      if (f.at > 3300) PET.sad = true
    } else if (a === "sadidle") { f.face = "teary"; f.la = "droop"; f.ra = "droop"; f.gaze = 0; f.by = 0 }
    else if (a === "wipe") { f.face = f.at > 500 && f.at < 1300 ? "blink" : "teary"; f.la = "droop"; f.ra = "wipe"; f.by = 0 }
    else if (a === "sigh") { f.face = "teary"; f.la = "droop"; f.ra = "droop"; f.by = f.at > 400 && f.at < 1400 ? 1 : 0; if (f.at < 60) petBub("…", 1500) }
    else if (a === "talk") {
      f.toy = 0; f.face = "happy"; f.gaze = 0; f.la = "mid"; f.um = f.wxCat === 3 || f.wxCat === 4; f.ra = f.um ? "up" : (sec % 2 ? "up" : "up2"); f.by = sec % 2
      if (f.at < 80 && !f.n) { f.n = 1; petBub(f.wxText, 8500, f.wxAct) }
    }
    else if (a === "hit") {
      f.toy = 0; f.face = f.at < 250 ? "o" : "dizzy"; f.gaze = 0; f.sx = f.at < 500 ? Math.sin(f.at / 28) * 2.2 : Math.sin(f.at / 120) * .8
      f.la = "out"; f.ra = "out"; f.jy = f.at < 220 ? Math.sin(Math.PI * f.at / 220) * 5 : 0
    }
    else if (a === "cheer") { f.face = "happy"; f.la = sec % 2 ? "up" : "up2"; f.ra = sec % 2 ? "up2" : "up"; f.by = sec % 2; f.jy = Math.abs(Math.sin(f.at / 190)) * 10 }
    else if (a === "love") { f.face = "love"; f.la = "up"; f.ra = "up2"; f.jy = Math.abs(Math.sin(f.at / 220)) * 6 }
    else if (a === "snow") {
      f.toy = 0
      if (f.ph === 0) {
        var d2 = f.tx - f.x; f.gaze = d2 > 0 ? 1 : -1; f.x += Math.sign(d2) * 34 * dt / 1000; f.by = sec % 2
        f.la = sec % 2 ? "mid" : "down"; f.ra = sec % 2 ? "down" : "mid"
        if (Math.abs(d2) < 3) { f.ph = 1; f.at = 0 }
      } else if (f.ph === 1) {
        f.face = "up"
        if (f.at > 500) {
          var cand = (SNOW.fl || []).filter(function (q) { return q.z > .4 && q.y > innerHeight * .15 && q.y < innerHeight * .6 && q.x > 20 && q.x < innerWidth - 20 })
          if (!cand.length) { f.at = f.dur; f.ph = 5; return }
          var cf = cand[Math.floor(Math.random() * cand.length)]
          SNOW.cap = cf; PET.cap = cf; PET.fl = { x: cf.x, y: cf.y, k: cf.sz / 40, b: 0 }; f.fx0 = cf.x; f.fy0 = cf.y; f.fk0 = cf.sz / 40; f.ph = 2; f.at = 0
          var cx2 = PET.flEl.getContext("2d"), fi = flakeTinted(SNOW.night); cx2.clearRect(0, 0, 40, 40); if (fi) cx2.drawImage(fi, 0, 0, 40, 40)
        }
      } else if (f.ph === 2) {
        f.face = "up"
        var r0 = PET.el.getBoundingClientRect(), my = r0.top + 22, T1 = 1400, T2 = 1000, fl = PET.fl
        if (!r0.width || !r0.height) { petRelease(); f.ph = 5; f.at = f.dur; return }
        if (f.at < T1) { var q = f.at / T1; fl.k = f.fk0 + (1.4 - f.fk0) * q; fl.x = f.fx0 + Math.sin(f.at / 260) * 14 * q; fl.y = f.fy0 + 26 * q; fl.b = 0 }
        else { var q2 = Math.min(1, (f.at - T1) / T2), e2 = q2 * q2, ax = f.fx0 + Math.sin(T1 / 260) * 14; fl.k = 1.4 - 1.05 * e2; fl.x = ax * (1 - e2) + f.x * e2; fl.y = (f.fy0 + 26) * (1 - e2) + my * e2; fl.b = 0 }
        if (f.at > T1 + T2) { f.ph = 3; f.at = 0; petRelease() }
      } else if (f.ph === 3) {
        f.face = f.at < 450 ? (Math.floor(f.at / 150) % 2 ? "up" : "o") : "happy"
        if (f.at > 450 && !f.n) { f.n = 1; petBub(tr("pet_snow"), 1800) }
        if (f.at > 1200) { f.ph = 4; f.n = 0 }
      } else { f.face = "happy"; f.at = f.dur }
    }
    else if (a === "fly" || a === "explore") {
      f.la = "out"; f.ra = "out"; f.face = "happy"
      if (f.ph === 0) {
        f.toy = f.fh; d = f.tx - f.x; f.gaze = d > 0 ? 1 : -1; f.x += Math.sign(d) * Math.min(Math.abs(d), 80 * dt / 1000)
        if (f.at < 80 && a === "fly") petBub(tr("pet_fly"), 1500)
        if (Math.abs(d) < 4 && Math.abs(f.oy - f.fh) < 5) { f.ph = 1; f.at = 0 }
      } else if (f.ph === 1) {
        f.toy = f.fh + Math.sin(f.at / 300) * 3; f.ra = sec % 2 ? "up" : "up2"
        if (a === "explore" && !f.n) { f.n = 1; petBub(ZK[Math.floor(Math.random() * ZK.length)], 1800) }
        if (f.at > (a === "explore" ? 2600 : 900)) { f.ph = 2; f.tx = petRnd(45, W - 45) }
      } else {
        f.toy = 0; d = f.tx - f.x; f.gaze = d > 0 ? 1 : -1; f.x += Math.sign(d) * Math.min(Math.abs(d), 70 * dt / 1000)
        if (Math.abs(d) < 4 && f.oy < 3) { f.at = f.dur; petEmo("dizzy", 2200); petBub(tr("pet_dz"), 2200) }
      }
    }
    else if (a === "hide") {
      var nb = document.querySelectorAll("#nav button"), bt = nb[nb.length - 1], bx = bt ? bt.getBoundingClientRect() : null
      if (bx) f.tx = Math.max(lo, Math.min(hi, bx.left + bx.width / 2))
      if (f.ph === 0) {
        f.toy = 0; d = f.tx - f.x; f.gaze = d > 0 ? 1 : -1; f.x += Math.sign(d) * Math.min(Math.abs(d), 60 * dt / 1000); f.by = sec % 2
        f.la = sec % 2 ? "mid" : "down"; f.ra = sec % 2 ? "down" : "mid"
        if (Math.abs(d) < 3) { f.ph = 1; f.at = 0 }
      } else if (f.ph === 1) { f.toy = -30; f.face = "n"; if (f.oy < -27) { f.ph = 2; f.at = 0 } }
      else if (f.ph === 2) {
        f.toy = -30 + (Math.sin(f.at / 420) > .55 ? 12 : 0); f.gaze = [-1, 1, 0, 1, -1][Math.floor(f.at / 700) % 5]; f.la = "down"; f.ra = "down"
        if (f.at > 600 && !f.n) { f.n = 1; petBub(tr("pet_hide"), 1800) }
        if (f.at > 4200) { f.ph = 3; f.at = 0 }
      } else { f.toy = 0; f.face = "happy"; f.la = "up"; f.ra = "up2"; if (f.oy > -4) { f.at = f.dur; petEmo("happy", 800) } }
    }
    else if (a === "cold") {
      f.face = "cold"; f.tint = "cold"; f.sx = Math.sin(f.t / 35) * 1.2; f.la = "mid"; f.ra = "mid"; f.by = sec % 2
      if (f.at < 60) petBub(tr("pet_cold"), 2200)
      if (f.at > 3000) f.face = "dizzy"
    }
    else if (a === "sun") {
      f.tint = "hot"
      if (f.ph === 0) {
        f.face = "hot"; f.ra = sec % 2 ? "up" : "up2"; f.la = "down"; f.um = false
        if (f.at < 60) petBub(tr("pet_hot"), 2400)
        if (f.at > 2600) { f.ph = 1; f.at = 0 }
      } else if (f.ph === 1) {
        f.face = "hot"; f.um = true; f.la = "mid"; f.ra = "up"; d = f.tx - f.x; f.gaze = d > 0 ? 1 : -1
        f.x += Math.sign(d) * Math.min(Math.abs(d), 62 * dt / 1000); f.by = sec % 2
        if (Math.abs(d) < 4) { f.ph = 2; f.at = 0 }
      } else { f.face = f.at > 1800 ? "happy" : "hot"; f.um = true; f.tint = f.at > 1800 ? "" : "hot"; f.la = "down"; f.ra = "up"; if (f.at > 3200) f.at = f.dur }
    }
    if (f.emo && f.t < f.emoUntil && (a !== "think")) { f.face = f.emo; if (f.emo === "dizzy") f.gaze = 0 } else if (f.emo && f.t >= f.emoUntil) f.emo = ""
    if (f.hap && f.t < f.hap && f.face === "n") f.face = "happy"
    if (PET.sad && a !== "think") { f.la = f.la === "down" ? "droop" : f.la }
    if (f.at >= f.dur) { if (PET.cap) petRelease(); PET.fl = null; PET.um = false; f.rest = f.t + (a === "idle" ? 0 : petRnd(5000, 9000)); if (a === "think" && !PET.sad) PET.sad = true; f.act = ""; PET.n = 0 }
    f.x = Math.max(lo, Math.min(hi, f.x))
  }
  // harakatlarga ta'sir: salavot, sevimli, o'yin
  function petReact() {
    if (!petOn() || !PET.el) return
    var ds = S.daily, c = ds ? (ds.count || 0) + (ds.draft || 0) : 0, fv = Object.keys(S.favs || {}).length, wf = S.wg && S.wg.f ? S.wg.f.length : 0, wl = S.wg ? S.wg.lv : 0, td = ds ? !!ds.todayDone : false
    var R = PET.rc
    if (!R) { PET.rc = { c: c, fv: fv, wf: wf, wl: wl, td: td }; return }
    var phr = PHR[Math.floor(Math.random() * PHR.length)]
    if (ds && !R.td && td) { petGo("cheer", 3600); petBub(tr("pet_goal"), 3600) }
    else if (c > R.c) {
      if (c - R.c <= 5) jrZ(c - R.c)
      PET.hap = PET.t + 1400
      if (c % 10 === 0 && !PET.sad) { petGo("jump", 900); petBub(phr, 1800) }
      else if (c % 33 === 0) petBub(phr, 1600)
    }
    else if (wl > R.wl) { petGo("cheer", 3200); petBub(tr("pet_ok"), 2600) }
    else if (wf > R.wf) { petGo("jump", 900); petBub(phr, 1600) }
    else if (fv > R.fv) { petGo("love", 1700); petBub(phr, 1700) }
    PET.rc = { c: c, fv: fv, wf: wf, wl: wl, td: td }
  }
  var PANG = { down: 8, mid: -18, droop: -3, out: 85, up: 155, up2: 135, wipe: 168 }
  function pR(x, y, w, h, c) { PET.cx.fillStyle = PC[c] || c; PET.cx.fillRect(x, y, w, h) }
  function pP(x, y, c) { pR(x, y, 1, 1, c) }
  function petDraw() {
    var f = PET, cx = f.cx, fc = f.face, g = f.gaze, i, y = 2, E = "#67e8f9"
    cx.clearRect(0, 0, 13, 9)
    if (f.bl > 0 && (fc === "n" || fc === "up" || fc === "o")) fc = "blink"
    if (fc === "n") { pR(2 + g, y, 2, 3, E); pR(9 + g, y, 2, 3, E); pP(4, 6, E); pR(5, 7, 3, 1, E); pP(8, 6, E) }
    else if (fc === "blink") { pR(2 + g, y + 1, 2, 1, E); pR(9 + g, y + 1, 2, 1, E); pP(4, 6, E); pR(5, 7, 3, 1, E); pP(8, 6, E) }
    else if (fc === "happy") {
      pP(2, 4, E); pP(3, 3, E); pP(4, 4, E); pP(9, 4, E); pP(10, 3, E); pP(11, 4, E)
      pR(4, 6, 5, 1, E); pR(5, 7, 3, 1, E); pP(1, 6, "#ff9db0"); pP(11, 6, "#ff9db0")
    } else if (fc === "up") { pR(2, 1, 2, 3, E); pR(9, 1, 2, 3, E); pR(4, 5, 5, 3, "#ff9db0"); pR(5, 7, 3, 1, "#ff6f8a") }
    else if (fc === "o") { pR(2 + g, y, 2, 2, E); pR(9 + g, y, 2, 2, E); pR(5, 5, 3, 3, "#ff9db0") }
    else if (fc === "love") {
      var H = [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2]]
      for (i = 0; i < H.length; i++) { pP(1 + H[i][0], y + H[i][1], "#ff6f9c"); pP(9 + H[i][0], y + H[i][1], "#ff6f9c") }
      pR(4, 6, 5, 1, E); pR(5, 7, 3, 1, E)
    } else if (fc === "dizzy") {
      var fr = Math.floor(f.t / 200) % 2, X = fr ? [[2, 2], [2, 3], [1, 3], [3, 3], [2, 4]] : [[1, 2], [3, 2], [2, 3], [1, 4], [3, 4]]
      for (i = 0; i < X.length; i++) { pP(X[i][0], X[i][1], E); pP(X[i][0] + 8, X[i][1], E) }
      pP(4, 6, E); pP(5, 7, E); pP(6, 6, E); pP(7, 7, E); pP(8, 6, E)
    } else if (fc === "cold") {
      pR(1, y, 3, 3, "#e0f2fe"); pR(9, y, 3, 3, "#e0f2fe"); pP(2 + (Math.floor(f.t / 90) % 2), y + 1, "#1b2338"); pP(10 + (Math.floor(f.t / 90) % 2), y + 1, "#1b2338")
      var tz = Math.floor(f.t / 80) % 2
      pR(3, 6, 7, 2, "#e0f2fe"); for (i = 0; i < 4; i++) pP(3 + i * 2 + tz, 6, "#1b2338"); pP(2, 4, "#7dd3fc"); pP(11, 5, "#7dd3fc")
    } else if (fc === "hot") {
      pR(2, 3, 2, 1, E); pR(9, 3, 2, 1, E); pR(5, 5, 3, 2, "#ff9db0"); pP(6, 7, "#ff6f8a")
      pP(1, 5, "#ff7a7a"); pP(11, 5, "#ff7a7a")
      var sd = Math.floor(f.t / 160) % 4
      pP(0, 1 + sd, "#7dd3fc"); pP(12, 3 + (sd + 2) % 4, "#7dd3fc")
    } else if (fc === "pant") {
      pR(2, 3, 2, 1, E); pR(9, 3, 2, 1, E); pR(5, 5, 3, 2, "#ff9db0"); pP(6 + (Math.floor(f.t / 200) % 2), 7, "#ff6f8a"); pP(11, 2 + (Math.floor(f.t / 220) % 4), "#7dd3fc")
    } else if (fc === "teary") {
      // 🥹: katta yaltiroq ko'zlar, ko'tarilgan qoshlar, yosh
      pR(1, y, 3, 3, E); pR(9, y, 3, 3, E); pP(1, y, "#fff"); pP(9, y, "#fff"); pR(1, y + 2, 3, 1, "#a5f3fc"); pR(9, y + 2, 3, 1, "#a5f3fc")
      pP(1, 1, E); pP(2, 1, E); pP(3, 0, E); pP(9, 0, E); pP(10, 1, E); pP(11, 1, E)
      pP(5, 7, E); pR(6, 6 + (Math.floor(f.t / 350) % 2), 2, 1, E); pP(8, 7, E)
      var ty = Math.floor(f.t / 220) % 4
      pP(2, 5 + ty % 3, "#7dd3fc"); pP(10, 5 + (ty + 1) % 3, "#7dd3fc")
      if (f.t % 2400 < 1200) { pP(1, 5 + (ty + 2) % 3, "#bae6fd"); pP(11, 5 + (ty + 2) % 3, "#bae6fd") }
    }
    var tilt = fc === "up" ? -10 : f.act === "think" ? 7 : PET.sad ? -3 : (f.act === "walk" || f.act === "snow") ? 3 * f.gaze : f.act === "dance" ? (Math.floor(f.t / 250) % 2 ? 6 : -6) : 0
    PET.head.style.transform = "translateY(" + (f.by ? 1.5 : 0) + "px) rotate(" + tilt + "deg)"
    var la = PANG[f.la] == null ? 8 : PANG[f.la], ra = PANG[f.ra] == null ? 8 : PANG[f.ra]
    PET.al.style.transform = "rotate(" + la + "deg)"; PET.ar.style.transform = "rotate(" + (-ra) + "deg)"
    PET.ant.style.opacity = Math.floor(f.t / 500) % 2 ? 1 : .55
    PET.el.classList.toggle("cold", f.tint === "cold"); PET.el.classList.toggle("hot", f.tint === "hot"); PET.el.classList.toggle("um", !!f.um)
    var oyv = f.oy + f.jy
    PET.el.style.transform = "translate(" + (Math.round(f.x - 20 + f.sx)) + "px," + Math.round(-oyv) + "px)"
    PET.el.style.clipPath = "inset(-260px -260px " + Math.round(2 - f.oy) + "px -260px)"
    if (PET.fl) { var fe = PET.flEl; if (fe) { fe.style.display = "block"; fe.style.left = Math.round(PET.fl.x) + "px"; fe.style.top = Math.round(PET.fl.y) + "px"; fe.style.transform = "scale(" + PET.fl.k.toFixed(2) + ") rotate(" + Math.round(f.t / 12) + "deg)" } } else if (PET.flEl) PET.flEl.style.display = "none"
  }
  function petTick() {
    if (PET.cap && (!PET.el || !petOn())) petRelease()
    if (!PET.el || document.hidden || !petOn()) return
    var now = Date.now(), dt = Math.min(120, now - (PET.lt || now))
    PET.lt = now
    if (now - (PET.bt2 || 0) > 800) { PET.bt2 = now; var nv = document.getElementById("nav"); if (nv) { var nr = nv.getBoundingClientRect(), rad = parseFloat(getComputedStyle(nv).borderTopLeftRadius) || 0; PET.el.style.bottom = Math.max(0, window.innerHeight - nr.top - 1) + "px"; PET.lo = Math.max(24, nr.left + rad + 13); PET.hi = Math.min(window.innerWidth - 24, nr.right - rad - 13); if (PET.hi < PET.lo) PET.hi = PET.lo } }
    petStep(dt); petDraw()
  }
  function petWatch() {
    if (!petOn()) return
    var s = petSad()
    if (PET.sad && !s) { PET.sad = false; PET.seen = false; petGo("cheer", 3400); petBub(tr("pet_ok"), 3000) }
    else if (!PET.sad && s && PET.act !== "think") { PET.seen = false; PET.lastSad = 0; petGo("think", 4200) }
  }
  function petApply() {
    var on = petOn()
    document.documentElement.classList.toggle("peton", on)
    if (!on) { petRelease(); if (PET.flEl) PET.flEl.style.display = "none"; if (PET.el) PET.el.style.display = "none"; return }
    if (!PET.el) {
      var el = document.createElement("div"); el.id = "pet"; el.className = "pet"
      el.innerHTML = '<div class="petin"><svg class="pfx pfxb" viewBox="0 0 46 58" width="46" height="58"></svg>' +
        '<div class="petarm l"></div><div class="petarm r"></div>' +
        '<svg class="petbody" viewBox="0 0 34 26" width="34" height="26"><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9e1f0"/></linearGradient></defs><path d="M2 26V13Q2 6 10 6H24Q32 6 32 13V26Z" fill="url(#pg)" stroke="#bcc7de" stroke-width="1.2"/><rect x="12" y="13" width="10" height="7" rx="3" fill="#1b2338"/><circle cx="15.5" cy="16.5" r="1.3" fill="#67e8f9"/><circle cx="19" cy="16.5" r="1.3" fill="#ff8fa3"/><path class="pa pa-scarf" d="M3 8Q17 16 31 8L32 13Q17 21 2 13Z" fill="#e8504f"/><rect class="pa pa-scarf" x="21" y="12" width="5" height="11" rx="2" fill="#d23c3b"/></svg>' +
        '<svg class="pfx pout" viewBox="0 0 46 58" width="46" height="58"></svg>' +
        '<div class="pethead"><svg viewBox="0 0 46 44" width="46" height="44"><defs><linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbe3f1"/></linearGradient></defs>' +
        '<line class="petal" x1="23" y1="4" x2="23" y2="10" stroke="#aeb9d3" stroke-width="2" stroke-linecap="round"/><circle class="petant" cx="23" cy="4" r="3" fill="#ff7a8a"/>' +
        '<rect class="petear" x="2" y="19" width="7" height="12" rx="3.5" fill="#cfd8ea" stroke="#b3bfd9" stroke-width="1"/><rect class="petear" x="37" y="19" width="7" height="12" rx="3.5" fill="#cfd8ea" stroke="#b3bfd9" stroke-width="1"/>' +
        '<rect x="5" y="9" width="36" height="28" rx="14" fill="url(#pg2)" stroke="#bcc7de" stroke-width="1.2"/><rect x="9.5" y="13" width="27" height="19" rx="8.5" fill="#1b2338"/></svg>' +
        '<canvas width="13" height="9"></canvas><svg class="pfx phd" viewBox="0 0 46 44" width="46" height="44"></svg></div><svg class="pfx pfa" viewBox="0 0 46 58" width="46" height="58"></svg><svg class="petum" viewBox="0 0 46 24" width="46" height="24"><path d="M2 16Q23 -8 44 16Z" fill="#ff8fa3"/><path d="M2 16Q8 12 12 16Q17 12 23 16Q29 12 34 16Q39 12 44 16" fill="none" stroke="#fff" stroke-width="1.5"/><line x1="23" y1="4" x2="23" y2="24" stroke="#8b6b4a" stroke-width="1.6"/></svg></div><div class="petb"></div>'
      document.body.appendChild(el)
      PET.el = el; PET.cv = el.querySelector("canvas"); PET.cx = PET.cv.getContext("2d"); PET.bub = el.querySelector(".petb"); PET.head = el.querySelector(".pethead"); PET.al = el.querySelector(".petarm.l"); PET.ar = el.querySelector(".petarm.r"); PET.ant = el.querySelector(".petant")
      var fl = document.createElement("canvas"); fl.width = 40; fl.height = 40; fl.className = "petfl"; document.body.appendChild(fl); PET.flEl = fl
      PET.x = Math.min(window.innerWidth - 40, 70)
      wdDefs(); PET.wdSig = null; jrApply()
      el.addEventListener("click", function () {
        haptic("light")
        petGo("hit", 2400); petBub(tr("pet_ay"), 1100)
      })
      setInterval(petTick, 66); setInterval(petWatch, 1500); setInterval(petReact, 450)
      petGo("wave", 2400)
    }
    PET.el.style.display = ""
  }
  // ob-havo: 10 soniya e'tiborsiz qolsa gapiradi (IP bo'yicha shahar + Open-Meteo)
  var PLI = Date.now()
  ;["pointerdown", "touchstart", "keydown", "wheel", "scroll"].forEach(function (ev) { window.addEventListener(ev, function (e) { if (ev === "scroll" && e.target !== document) return; PLI = Date.now() }, { passive: true, capture: true }) })
  function petWxCat(c) { return c <= 1 ? 0 : c <= 3 ? 1 : (c === 45 || c === 48) ? 2 : ((c >= 71 && c <= 77) || c === 85 || c === 86) ? 4 : c >= 95 ? 5 : 3 }
  function petWx(cb) {
    var w = S.petWx
    if (w && Date.now() - w.at < 1800000) { cb(w); return }
    if (PET.wxBusy || Date.now() - (PET.wxFail || 0) < 120000) return
    PET.wxBusy = true
    fetch("https://ipwho.is/").then(function (r) { return r.json() }).then(function (g) {
      if (!g || g.success === false) throw 0
      return fetch("https://api.open-meteo.com/v1/forecast?latitude=" + g.latitude + "&longitude=" + g.longitude + "&current=temperature_2m,weather_code&timezone=auto").then(function (r) { return r.json() }).then(function (m) {
        var c = m.current
        PET.wxBusy = false
        S.petWx = { at: Date.now(), city: g.city || g.region || "", t: Math.round(c.temperature_2m), cat: petWxCat(c.weather_code) }
        save(); cb(S.petWx)
      })
    }).catch(function () { PET.wxBusy = false; PET.wxFail = Date.now() })
  }
  setInterval(function () {
    if (!petOn() || !PET.el || document.hidden || PET.sad || Date.now() - PLI < 10000 || Date.now() - (PET.wxSpoke || 0) < 900000) return
    petWx(function (w) {
      if (Date.now() - PLI < 10000 || !w.city) return
      PET.wxSpoke = Date.now()
      PET.wxText = tr("pet_wx").replace("{c}", w.city).replace("{w}", tr("wx_c" + w.cat)).replace("{t}", w.t).replace("{x}", tr("wx_t" + w.cat))
      PET.wxCat = w.cat; PET.wxAct = null
      petGo("talk", 9000)
    })
  }, 2000)
  window._pet = { P: PET, go: petGo, pli: function () { return Date.now() - PLI } }
  setTimeout(petApply, 1400)
  // ===== KUNLIK YO'L (seriya, vazifalar, kartalar, garderob) =====
  var JRP = { a: 10, z: 15, g: 20 }
  function jrS() {
    var j = S.jr; if (!j) j = S.jr = { d: {}, st: 0, bs: 0, last: "", nur: 0, cards: [], own: [], eq: {} }
    if (!j.wd) {
      var M = { cap: ["head", "doppi_oq"], scarf: ["head", "kufiya"], glass: ["acc", "glasses"], crown: ["head", "toj_oltin"] }, ne = {}, no = [], k
      for (k = 0; k < (j.own || []).length; k++) { var m = M[j.own[k]]; if (m && no.indexOf(m[1]) < 0) no.push(m[1]) }
      for (k in (j.eq || {})) if (j.eq[k] && M[k]) ne[M[k][0]] = M[k][1]
      j.own = no; j.eq = ne; j.wd = 1
    }
    if (j.wd < 3) {
      var RM = { set_hijab: 1000, set_tavof: 1000 }, ow = [], q
      for (q = 0; q < j.own.length; q++) { if (RM[j.own[q]]) j.nur += RM[j.own[q]]; else ow.push(j.own[q]) }
      delete j.eq.set; j.own = ow; j.wd = 3
    }
    return j
  }
  function jrKey(off) { var d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) }
  function jrDay() { var j = jrS(), k = todayStr(); return j.d[k] || (j.d[k] = { a: 0, z: 0, g: 0, zn: 0 }) }
  function jrName() { var d = new Date(), s = Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 864e5); return s % 99 }
  function jrCnt() { var x = jrDay(); return x.a + x.z + x.g }
  function jrStreak() { var j = jrS(); return (j.last === todayStr() || j.last === jrKey(-1)) ? j.st : 0 }
  var JDW = { n: 0, t: 0 }
  function jrDwell() {
    var want = function () { return U.detail && U.detail === jrName() + 1 && !jrDay().a }
    if (!want()) { if (JDW.t) { clearInterval(JDW.t); JDW.t = 0 } JDW.n = 0; return }
    if (JDW.t) return
    JDW.n = 0
    JDW.t = setInterval(function () {
      if (!want()) { clearInterval(JDW.t); JDW.t = 0; JDW.n = 0; return }
      if (document.hidden) return
      if (++JDW.n >= 15) { clearInterval(JDW.t); JDW.t = 0; JDW.n = 0; jrMark("a") }
    }, 1000)
  }
  function jrMark(k) {
    var j = jrS(), x = jrDay()
    if (x[k]) return
    var was = jrCnt(), all = false
    x[k] = 1
    if (was === 0) { j.st = j.last === jrKey(-1) ? j.st + 1 : 1; j.last = todayStr(); if (j.st > j.bs) j.bs = j.st }
    if (isPrem()) {
      j.nur += JRP[k]
      if (jrCnt() === 3) {
        all = true; j.nur += 15; x.c = 1
        var ni = jrName()
        if (j.cards.indexOf(ni) < 0) j.cards.push(ni); else for (var i = 0; i < 99; i++) if (j.cards.indexOf(i) < 0) { j.cards.push(i); break }
        if (j.st % 30 === 0) j.nur += 200; else if (j.st % 7 === 0) j.nur += 70
      }
    } else if (jrCnt() === 3) all = true
    save()
    setTimeout(function () {
      if (PET.el && petOn()) { petGo("cheer", 3400); petBub(tr(all ? "jr_done" : "jr_ok"), 3600) }
      if (U.jr && !U.detail && !U.wg) render()
    }, 50)
  }
  function jrZ(n) { var x = jrDay(); x.zn = (x.zn || 0) + n; if (x.zn >= 33) jrMark("z") }
  function viewJr() {
    if (U.jr === "cards") return viewJrCards()
    var j = jrS(), prem = isPrem(), x = jrDay(), ni = jrName(), i, h, st = jrStreak(), nm = D.names[ni]
    h = '<div class="jr"><div class="wqtop"><button class="btn small back circ" data-act="jrClose" aria-label="back">' + ic("arrow_back") + '</button><div class="wqpill wgpill">' + ic("local_fire_department") + " " + esc(tr("jr_t")) + '</div><div class="wqlvb"><b>' + j.nur + "</b>" + ic("star") + "</div></div>"
    var wkn = 0, INI = ["Y", "D", "S", "C", "P", "J", "S"], wd = ""
    for (i = 6; i >= 0; i--) {
      var k = jrKey(-i), dd = j.d[k], on = dd && (dd.a + dd.z + dd.g) > 0, dt = new Date(); dt.setDate(dt.getDate() - i)
      if (on) wkn++
      var lb = S.lang === "uz" ? INI[dt.getDay()] : dt.toLocaleDateString(S.lang === "uz_kr" || S.lang === "uz_new" ? "uz" : (S.lang || "uz"), { weekday: "narrow" })
      wd += '<div class="jrd' + (on ? " on" : "") + (i === 0 ? " now" : "") + '"><i>' + (on ? ic("check") : "") + "</i><small>" + esc(lb) + "</small></div>"
    }
    h += '<div class="card jrhero2"><div class="jrh1"><span class="jrfb">' + ic("local_fire_department") + '</span><div class="jrhm"><div><b>' + st + "</b> " + esc(tr("jr_days")) + "</div><small>" + esc(tr("jr_best")) + " <em>" + j.bs + " " + esc(tr("jr_days").split(" ")[0]) + '</em></small></div><div class="jrwkc"><small>' + esc(tr("jr_wk")) + "</small><b>" + wkn + "/7</b></div></div>"
    h += '<div class="jrwk">' + wd + "</div></div>"
    var mn = meaningOf(ni + 1)
    h += '<button class="jrname2" data-act="jrQ" data-v="a"><span class="jrnl"><small><i></i>' + esc(tr("jr_nd")) + "</small><b>" + (ni + 1) + ". " + esc(nm.t) + "</b><em>" + esc(mn) + '</em></span><span class="ar">' + esc(nm.a) + '</span><span class="jrch">' + ic("chevron_right") + "</span></button>"
    var Q = [["a", "jr_q1", "menu_book"], ["z", "jr_q2", "bubble_chart"], ["g", "jr_q3", "extension"]], nd = jrCnt()
    h += '<div class="jrqh"><span>' + esc(tr("jr_td")) + "</span><em>" + nd + "/3 " + esc(tr("jr_dn")) + "</em></div><div class=\"jrq\">"
    for (i = 0; i < Q.length; i++) {
      var dn = x[Q[i][0]], sub = "+" + JRP[Q[i][0]] + " \u2605 " + esc(tr(dn && prem ? "jr_got" : "jr_rw"))
      h += '<button class="jrr' + (dn ? " ok" : "") + '" data-act="jrQ" data-v="' + Q[i][0] + '"><span class="jri">' + ic(Q[i][2]) + '</span><span class="jrt"><b>' + esc(tr(Q[i][1])) + (Q[i][0] === "z" && !dn ? " \u00b7 " + Math.min(33, x.zn || 0) + "/33" : "") + "</b><small>" + sub + '</small></span><span class="jrc' + (dn ? " d" : "") + '">' + (dn ? ic("check") : "") + "</span></button>"
    }
    h += "</div>"
    if (!prem) h += '<div class="card jrlock">' + ic("lock") + "<span>" + esc(tr("jr_lock")) + '</span><button class="btn primary" data-act="premGo">' + ic("workspace_premium") + " Premium</button></div>"
    h += '<div class="jrbt"><button class="btn" data-act="jrCards">' + ic("layers") + " " + esc(tr("jr_cards")) + " <span>(" + j.cards.length + "/99)</span></button></div></div>"
    return h
  }
  function viewJrCards() {
    var j = jrS(), i, h = '<div class="jr"><div class="wqtop"><button class="btn small back circ" data-act="jrClose" aria-label="back">' + ic("arrow_back") + '</button><div class="wqpill wgpill">' + ic("collections_bookmark") + " " + esc(tr("jr_cards")) + '</div><div class="wqlvb"><b>' + j.cards.length + "/99</b></div></div><div class=\"jrgrid\">"
    for (i = 0; i < 99; i++) {
      var on = j.cards.indexOf(i) >= 0
      h += on ? '<button class="jrk on" data-act="jrCard" data-v="' + (i + 1) + '"><span class="ar">' + esc(D.names[i].a) + "</span><em>" + esc(D.names[i].t) + "</em><small>" + (i + 1) + "</small></button>" : '<div class="jrk lk"><span class="jrki"><span class="ar">' + esc(D.names[i].a) + "</span><em>" + esc(D.names[i].t) + '</em></span><span class="jrlk">' + ic("lock") + "</span><small>" + (i + 1) + "</small></div>"
    }
    return h + "</div></div>"
  }
  // ===== GARDEROB (Robotcha ichida): bosh kiyim, kiyim, aksessuar, effekt =====
  var WDT = {
    wd_h: "Bosh kiyim|Бош кийим|Головной убор|Headwear", wd_o: "Kiyim|Кийим|Одежда|Outfit", wd_a: "Aksessuar|Аксессуар|Аксессуар|Accessory", wd_f: "Effekt|Эффект|Эффект|Effect",
    wd_buy: "Sotib olish|Сотиб олиш|Купить|Buy", wd_on: "Kiyilgan|Кийилган|Надето|Worn", wd_pick: "Tanlang|Танланг|Выберите|Pick one", wd_rst: "Kiyilganga qaytish|Кийилганга қайтиш|К надетому|Back to worn",
    wd_sel: "Tanlov|Танлов|Выбор|Select", wd_no: "Nur yetarli emas|Нур етарли эмас|Недостаточно света|Not enough nur", wd_done: "sotib olindi|сотиб олинди|куплено|purchased",
    wd_gift: "Sizga 9999 nur sovg'a qilindi (test)|Сизга 9999 нур совға қилинди (тест)|Вам подарено 9999 света (тест)|You got 9999 nur (test)",
    wdn_doppi_oq: "Oq do'ppi|Оқ дўппи|Белая тюбетейка|White skullcap", wdn_doppi_chust: "Chust do'ppi|Чуст дўппи|Чустская тюбетейка|Chust skullcap", wdn_salla_shoh: "Shohona salla|Шоҳона салла|Царская чалма|Royal turban",
    wdn_toj_oltin: "Oltin toj|Олтин тож|Золотая корона|Golden crown", wdn_kufiya: "Kufiya|Куфия|Куфия|Keffiyeh", wdn_halo_nur: "Nurli halo|Нурли ҳало|Светлый нимб|Light halo",
    wdn_korpus_std: "Standart korpus|Стандарт корпус|Стандартный корпус|Default body", wdn_chopon_zar: "Zarbof chopon|Зарбоф чопон|Парчовый чапан|Brocade robe", wdn_zirh_carbon: "Qora zirh|Қора зирҳ|Чёрная броня|Carbon armor",
    wdn_yaktak_oq: "Oq yaktak|Оқ яктак|Белый яктак|White yaktak", wdn_kaftan_sulton: "Sulton kaftani|Султон кафтани|Кафтан султана|Sultan kaftan", wdn_nimcha_zumrad: "Zumrad nimcha|Зумрад нимча|Изумрудная безрукавка|Emerald vest",
    wdn_glasses: "Ko'zoynak|Кўзойнак|Очки|Glasses", wdn_tasbeh_elek: "Elektron tasbeh|Электрон тасбеҳ|Электронные чётки|E-tasbih", wdn_mushaf_kitob: "Kichik mushaf|Кичик мусҳаф|Малый мусхаф|Mini Mushaf",
    wdn_fonus_qadim: "Qadimiy fonus|Қадимий фонус|Старинный фонарь|Old lantern", wdn_qalam_oltin: "Oltin qalam|Олтин қалам|Золотое перо|Golden pen", wdn_nishon_yulduz: "Yulduz nishoni|Юлдуз нишони|Знак-звезда|Star badge",
    wdn_eff_zumrad: "Zumrad uchqun|Зумрад учқун|Изумрудные искры|Emerald sparks", wdn_eff_qanot: "Oltin qanot|Олтин қанот|Золотые крылья|Golden wings", wdn_eff_oy: "Yarim oy nuri|Ярим ой нури|Свет полумесяца|Crescent glow",
    wdn_eff_qor: "Qor uchqunlari|Қор учқунлари|Снежные искры|Snow sparks", wdn_eff_halqa: "Nurli halqa|Нурли ҳалқа|Светлое кольцо|Light ring"
  }
  Object.keys(WDT).forEach(function (k) { TXT[k] = WDT[k] })
  var WDC = [["head", "wd_h", "school"], ["outfit", "wd_o", "checkroom"], ["acc", "wd_a", "visibility"], ["fx", "wd_f", "auto_awesome"]]
  var WDI = [
    ["doppi_oq", "head", 0, '<svg viewBox="0 0 40 40"><path d="M8 26 Q20 14 32 26 L30 30 Q20 26 10 30 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.2"/><path d="M14 24 Q20 20 26 24" fill="none" stroke="#10B981" stroke-width="1.5"/></svg>'],
    ["doppi_chust", "head", 0, '<svg viewBox="0 0 40 40"><path d="M8 26 Q20 14 32 26 L30 30 Q20 26 10 30 Z" fill="#0F172A" stroke="#475569" stroke-width="1.2"/><path d="M13 24 C15 21, 17 25, 19 23 M21 23 C23 25, 25 21, 27 24" fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/></svg>'],
    ["salla_shoh", "head", 150, '<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="13" ry="9" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/><path d="M9 20 Q20 26 31 20 M11 17 Q20 22 29 17" fill="none" stroke="#10B981" stroke-width="1.5"/><circle cx="20" cy="18" r="2.5" fill="#F59E0B"/></svg>'],
    ["toj_oltin", "head", 400, '<svg viewBox="0 0 40 40"><polygon points="8,28 10,14 16,21 20,11 24,21 30,14 32,28" fill="#F59E0B" stroke="#FEF08A" stroke-width="1"/><circle cx="20" cy="23" r="2" fill="#10B981"/></svg>'],
    ["kufiya", "head", 100, '<svg viewBox="0 0 40 40"><path d="M10 26 C10 15, 30 15, 30 26 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.2"/><line x1="11" y1="23" x2="29" y2="23" stroke="#10B981" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'],
    ["halo_nur", "head", 300, '<svg viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="13" ry="5" fill="none" stroke="#10B981" stroke-width="2.5"/><ellipse cx="20" cy="20" rx="13" ry="5" fill="none" stroke="#A7F3D0" stroke-width="1" stroke-dasharray="4 3"/></svg>'],
    ["korpus_std", "outfit", 0, '<svg viewBox="0 0 40 40"><rect x="10" y="10" width="20" height="20" rx="6" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.2"/><rect x="15" y="16" width="10" height="6" rx="2" fill="#0F172A"/></svg>'],
    ["chopon_zar", "outfit", 250, '<svg viewBox="0 0 40 40"><path d="M9 12 L16 10 L20 18 L24 10 L31 12 L33 30 L7 30 Z" fill="#065F46" stroke="#F59E0B" stroke-width="1.5"/><line x1="20" y1="18" x2="20" y2="30" stroke="#F59E0B" stroke-width="1.5"/></svg>'],
    ["zirh_carbon", "outfit", 300, '<svg viewBox="0 0 40 40"><rect x="9" y="10" width="22" height="20" rx="6" fill="#1E293B" stroke="#10B981" stroke-width="1.4"/><path d="M14 16 L20 21 L26 16" fill="none" stroke="#10B981" stroke-width="1.6"/></svg>'],
    ["yaktak_oq", "outfit", 180, '<svg viewBox="0 0 40 40"><path d="M10 11 L30 11 L32 30 L8 30 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/><line x1="20" y1="11" x2="20" y2="23" stroke="#94A3B8" stroke-width="1.5"/></svg>'],
    ["kaftan_sulton", "outfit", 450, '<svg viewBox="0 0 40 40"><path d="M8 12 L16 10 L20 17 L24 10 L32 12 L34 30 L6 30 Z" fill="#1E3A8A" stroke="#F59E0B" stroke-width="1.6"/><circle cx="20" cy="23" r="2" fill="#F59E0B"/></svg>'],
    ["nimcha_zumrad", "outfit", 150, '<svg viewBox="0 0 40 40"><path d="M11 10 L17 10 L20 19 L23 10 L29 10 L29 29 L11 29 Z" fill="#10B981" stroke="#064E3B" stroke-width="1.2"/></svg>'],
    ["glasses", "acc", 0, '<svg viewBox="0 0 40 40"><rect x="6" y="15" width="12" height="9" rx="2.5" fill="#0F172A" stroke="#10B981" stroke-width="1.4"/><rect x="22" y="15" width="12" height="9" rx="2.5" fill="#0F172A" stroke="#10B981" stroke-width="1.4"/><line x1="18" y1="18" x2="22" y2="18" stroke="#10B981" stroke-width="1.5"/></svg>'],
    ["tasbeh_elek", "acc", 120, '<svg viewBox="0 0 40 40"><circle cx="20" cy="21" r="10" fill="none" stroke="#10B981" stroke-width="2.5" stroke-dasharray="3 2.5"/><circle cx="20" cy="10" r="2.5" fill="#F59E0B"/></svg>'],
    ["mushaf_kitob", "acc", 200, '<svg viewBox="0 0 40 40"><rect x="11" y="9" width="18" height="22" rx="2.5" fill="#065F46" stroke="#F59E0B" stroke-width="1.5"/><rect x="15" y="14" width="10" height="12" rx="1" fill="none" stroke="#FDE68A" stroke-width="1"/></svg>'],
    ["fonus_qadim", "acc", 280, '<svg viewBox="0 0 40 40"><polygon points="15,13 25,13 27,26 13,26" fill="#F59E0B" fill-opacity="0.35" stroke="#F59E0B" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="#FEF08A"/><path d="M16 13 Q20 7 24 13" fill="none" stroke="#F59E0B" stroke-width="1.5"/></svg>'],
    ["qalam_oltin", "acc", 160, '<svg viewBox="0 0 40 40"><path d="M11 29 L27 11 L30 14 L14 30 Z" fill="#F59E0B" stroke="#FEF08A" stroke-width="1"/><circle cx="11" cy="29" r="1.5" fill="#10B981"/></svg>'],
    ["nishon_yulduz", "acc", 140, '<svg viewBox="0 0 40 40"><polygon points="20,8 23,16 31,16 25,21 27,29 20,24 13,29 15,21 9,16 17,16" fill="#10B981" stroke="#A7F3D0" stroke-width="1.2"/></svg>'],
    ["eff_zumrad", "fx", 200, '<svg viewBox="0 0 40 40"><circle cx="13" cy="15" r="2.5" fill="#10B981"/><circle cx="27" cy="13" r="3" fill="#34D399"/><circle cx="20" cy="26" r="2.5" fill="#6EE7B7"/><circle cx="12" cy="25" r="1.8" fill="#10B981"/></svg>'],
    ["eff_qanot", "fx", 350, '<svg viewBox="0 0 40 40"><path d="M18 24 Q8 18 7 10 Q15 13 18 20 Z" fill="#F59E0B" stroke="#FDE68A" stroke-width="1"/><path d="M22 24 Q32 18 33 10 Q25 13 22 20 Z" fill="#F59E0B" stroke="#FDE68A" stroke-width="1"/></svg>'],
    ["eff_oy", "fx", 300, '<svg viewBox="0 0 40 40"><path d="M23 10 A10 10 0 1 0 30 27 A8 8 0 1 1 23 10 Z" fill="#FDE68A"/><circle cx="27" cy="14" r="1.8" fill="#10B981"/></svg>'],
    ["eff_qor", "fx", 150, '<svg viewBox="0 0 40 40"><line x1="20" y1="9" x2="20" y2="31" stroke="#E0F2FE" stroke-width="1.8"/><line x1="9" y1="20" x2="31" y2="20" stroke="#E0F2FE" stroke-width="1.8"/><line x1="12" y1="12" x2="28" y2="28" stroke="#BAE6FD" stroke-width="1.5"/><line x1="28" y1="12" x2="12" y2="28" stroke="#BAE6FD" stroke-width="1.5"/></svg>'],
    ["eff_halqa", "fx", 400, '<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="14" ry="6" fill="none" stroke="#10B981" stroke-width="2"/><ellipse cx="20" cy="22" rx="9" ry="3.5" fill="none" stroke="#F59E0B" stroke-width="1.5"/></svg>']
  ]
  var WDL = {
    doppi_oq: '<path d="M 65 56 Q 100 32 135 56 L 131 63 Q 100 54 69 63 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/><path d="M 78 55 Q 100 46 122 55" fill="none" stroke="#10B981" stroke-width="1.8" stroke-dasharray="3 2"/>',
    doppi_chust: '<path d="M 65 56 Q 100 32 135 56 L 131 63 Q 100 54 69 63 Z" fill="#0F172A" stroke="#334155" stroke-width="1.2"/><path d="M 77 54 C 81 49, 85 56, 89 52 M 96 51 C 100 46, 104 51, 108 52 M 113 54 C 117 49, 121 56, 124 52" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>',
    salla_shoh: '<ellipse cx="100" cy="48" rx="44" ry="18" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2"/><path d="M 59 46 Q 100 58 141 46 M 64 39 Q 100 50 136 39" fill="none" stroke="#10B981" stroke-width="2"/><circle cx="100" cy="42" r="5" fill="url(#wdGold)" stroke="#FEF08A" stroke-width="1"/><line x1="100" y1="37" x2="100" y2="26" stroke="#FDE68A" stroke-width="2" stroke-linecap="round"/>',
    toj_oltin: '<polygon points="68,54 73,31 86,43 100,25 114,43 127,31 132,54" fill="url(#wdGold)" stroke="#FEF08A" stroke-width="1.2"/><circle cx="100" cy="46" r="3" fill="#10B981"/><circle cx="82" cy="48" r="2" fill="#38BDF8"/><circle cx="118" cy="48" r="2" fill="#38BDF8"/>',
    kufiya: '<path d="M 66 56 C 66 34, 134 34, 134 56 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.2"/><line x1="68" y1="51" x2="132" y2="51" stroke="#10B981" stroke-width="2" stroke-dasharray="3 2"/>',
    halo_nur: '<ellipse cx="100" cy="24" rx="34" ry="8" fill="none" stroke="#10B981" stroke-width="3"/><ellipse cx="100" cy="24" rx="34" ry="8" fill="none" stroke="#A7F3D0" stroke-width="1.2" stroke-dasharray="6 4"/>',
    chopon_zar: '<path d="M 63 120 L 84 118 L 100 138 L 116 118 L 137 120 L 140 172 L 60 172 Z" fill="url(#wdEm)" stroke="url(#wdGold)" stroke-width="2"/><line x1="100" y1="138" x2="100" y2="172" stroke="url(#wdGold)" stroke-width="2.5"/><path d="M 67 165 L 133 165" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="4 3"/>',
    zirh_carbon: '<rect x="63" y="118" width="74" height="54" rx="22" fill="url(#wdCa)" stroke="#10B981" stroke-width="1.5"/><path d="M 78 134 L 100 148 L 122 134" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/><circle cx="100" cy="157" r="4" fill="#10B981"/>',
    yaktak_oq: '<path d="M 63 120 L 137 120 L 139 172 L 61 172 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.4"/><line x1="100" y1="120" x2="100" y2="152" stroke="#94A3B8" stroke-width="2"/><circle cx="100" cy="132" r="1.5" fill="#10B981"/><circle cx="100" cy="142" r="1.5" fill="#10B981"/>',
    kaftan_sulton: '<path d="M 62 120 L 84 118 L 100 136 L 116 118 L 138 120 L 141 172 L 59 172 Z" fill="url(#wdNv)" stroke="url(#wdGold)" stroke-width="2.2"/><line x1="88" y1="144" x2="112" y2="144" stroke="#F59E0B" stroke-width="2"/><line x1="88" y1="154" x2="112" y2="154" stroke="#F59E0B" stroke-width="2"/>',
    nimcha_zumrad: '<path d="M 66 119 L 85 119 L 100 142 L 115 119 L 134 119 L 134 171 L 66 171 Z" fill="#10B981" stroke="#064E3B" stroke-width="1.5"/><line x1="100" y1="142" x2="100" y2="171" stroke="#064E3B" stroke-width="2"/>',
    glasses: '<rect x="70" y="70" width="26" height="19" rx="5" fill="#020617" fill-opacity="0.7" stroke="#10B981" stroke-width="2"/><rect x="104" y="70" width="26" height="19" rx="5" fill="#020617" fill-opacity="0.7" stroke="#10B981" stroke-width="2"/><line x1="96" y1="78" x2="104" y2="78" stroke="#10B981" stroke-width="2.2"/>',
    tasbeh_elek: '<g transform="translate(148, 128)"><circle cx="14" cy="16" r="12" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="3.5 2.5"/><circle cx="14" cy="3" r="3" fill="#F59E0B"/><line x1="14" y1="0" x2="14" y2="-6" stroke="#F59E0B" stroke-width="1.5"/></g>',
    mushaf_kitob: '<g transform="translate(26, 118) rotate(-8)"><rect x="0" y="0" width="22" height="28" rx="3" fill="#065F46" stroke="#F59E0B" stroke-width="1.6"/><rect x="4" y="5" width="14" height="18" rx="1" fill="none" stroke="#FDE68A" stroke-width="1"/><circle cx="11" cy="14" r="3" fill="#F59E0B"/></g>',
    fonus_qadim: '<g transform="translate(146, 102)"><line x1="14" y1="0" x2="14" y2="10" stroke="#F59E0B" stroke-width="1.5"/><polygon points="7,10 21,10 24,28 4,28" fill="#F59E0B" fill-opacity="0.35" stroke="#F59E0B" stroke-width="1.5"/><circle cx="14" cy="19" r="4.5" fill="#FEF08A"/></g>',
    qalam_oltin: '<g transform="translate(144, 116)"><path d="M 4 32 L 24 6 L 28 9 L 8 34 Z" fill="url(#wdGold)" stroke="#FEF08A" stroke-width="1"/><circle cx="4" cy="34" r="2" fill="#10B981"/></g>',
    nishon_yulduz: '<polygon points="100,130 103,138 111,138 105,143 107,151 100,146 93,151 95,143 89,138 97,138" fill="#10B981" stroke="#FEF08A" stroke-width="1.2"/>'
  }
  var WDFXF = {
    eff_zumrad: '<circle cx="42" cy="75" r="3" fill="#10B981" class="wds wds1"/><circle cx="160" cy="68" r="3.5" fill="#34D399" class="wds wds2"/><circle cx="38" cy="148" r="2.5" fill="#6EE7B7" class="wds wds3"/><circle cx="162" cy="155" r="3" fill="#10B981" class="wds wds1"/><polygon points="154,90 156,95 161,97 156,99 154,104 152,99 147,97 152,95" fill="#A7F3D0" class="wds wds2"/>',
    eff_qor: '<g stroke="#E0F2FE" stroke-width="1.5" stroke-linecap="round"><g transform="translate(42, 65)"><g class="wds wds1"><line x1="-4" y1="0" x2="4" y2="0"/><line x1="0" y1="-4" x2="0" y2="4"/></g></g><g transform="translate(156, 80)"><g class="wds wds2"><line x1="-5" y1="0" x2="5" y2="0"/><line x1="0" y1="-5" x2="0" y2="5"/></g></g><g transform="translate(46, 155)"><g class="wds wds3"><line x1="-4" y1="0" x2="4" y2="0"/><line x1="0" y1="-4" x2="0" y2="4"/></g></g><g transform="translate(152, 152)"><g class="wds wds1"><line x1="-4" y1="0" x2="4" y2="0"/><line x1="0" y1="-4" x2="0" y2="4"/></g></g></g>'
  }
  var WDFXB = {
    eff_qanot: '<g class="wdfl"><path d="M 62 125 Q 22 105 18 72 Q 46 86 64 114 Z" fill="url(#wdGold)" fill-opacity="0.45" stroke="#FDE68A" stroke-width="1.3"/><path d="M 138 125 Q 178 105 182 72 Q 154 86 136 114 Z" fill="url(#wdGold)" fill-opacity="0.45" stroke="#FDE68A" stroke-width="1.3"/></g>',
    eff_oy: '<circle cx="100" cy="95" r="62" fill="#FDE68A" fill-opacity="0.06"/><path d="M 118 32 A 54 54 0 1 0 148 134 A 44 44 0 1 1 118 32 Z" fill="#FDE68A" fill-opacity="0.32"/>'
  }
  function wdDefs() {
    if (document.getElementById("wdDefs")) return
    var d = document.createElement("div"); d.id = "wdDefs"; d.setAttribute("aria-hidden", "true"); d.style.cssText = "position:absolute;width:0;height:0;overflow:hidden"
    d.innerHTML = '<svg width="0" height="0"><defs><radialGradient id="wdPed" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#10B981" stop-opacity="0.45"/><stop offset="70%" stop-color="#10B981" stop-opacity="0.1"/><stop offset="100%" stop-color="#10B981" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="wdBody" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="65%" stop-color="#E2E8F0"/><stop offset="100%" stop-color="#94A3B8"/></linearGradient>' +
      '<linearGradient id="wdVis" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0F172A"/><stop offset="100%" stop-color="#020617"/></linearGradient>' +
      '<linearGradient id="wdGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FDE68A"/><stop offset="50%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#B45309"/></linearGradient>' +
      '<linearGradient id="wdEm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#059669"/><stop offset="100%" stop-color="#064E3B"/></linearGradient>' +
      '<linearGradient id="wdCa" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#334155"/><stop offset="100%" stop-color="#0F172A"/></linearGradient>' +
      '<linearGradient id="wdNv" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#0F172A"/></linearGradient>' + "</defs></svg>"
    document.body.appendChild(d)
  }
  function wdItem(id) { for (var i = 0; i < WDI.length; i++) if (WDI[i][0] === id) return WDI[i]; return null }
  function wdOk() { return isPrem() || HCH.admin }
  function wdOwn(it) { return it[2] === 0 || jrS().own.indexOf(it[0]) >= 0 }
  function wdLay(eq, pet) {
    var o = { fb: "", ff: "", out: "", head: "", glass: "", hold: "", ant: true, ear: true }, h = eq.head || "", ou = eq.outfit && eq.outfit !== "korpus_std" ? eq.outfit : "", a = eq.acc || "", f = eq.fx || ""
    if (h) { o.head = WDL[h] || ""; o.ant = false }
    if (ou) { o.out = WDL[ou] || ""; o.ant = false }
    if (a === "glasses") o.glass = WDL.glasses; else if (a) o.hold = WDL[a] || ""
    if (f === "eff_halqa") o.fb = pet ? '<ellipse cx="100" cy="153" rx="55" ry="11" fill="none" stroke="#10B981" stroke-width="4" stroke-dasharray="20 10"/><ellipse cx="100" cy="153" rx="42" ry="8" fill="none" stroke="#F59E0B" stroke-width="3.5"/>' : '<ellipse cx="100" cy="192" rx="68" ry="16" fill="none" stroke="#10B981" stroke-width="1.8" stroke-dasharray="10 5"/><ellipse cx="100" cy="192" rx="52" ry="12" fill="none" stroke="#F59E0B" stroke-width="1.5"/>'
    else if (WDFXB[f]) o.fb = WDFXB[f]
    if (WDFXF[f]) o.ff = WDFXF[f]
    return o
  }
  function wdPrev(eq) {
    var L = wdLay(eq, false)
    return '<svg class="wdsv" viewBox="0 0 200 220" aria-hidden="true"><ellipse cx="100" cy="196" rx="58" ry="14" fill="url(#wdPed)"/><ellipse cx="100" cy="196" rx="42" ry="9" fill="none" stroke="#10B981" stroke-width="1.2" stroke-opacity=".45" stroke-dasharray="6 4"/>' + L.fb +
      '<g class="wdfl"><rect x="48" y="124" width="13" height="28" rx="6.5" fill="url(#wdBody)" stroke="#CBD5E1" stroke-width="1" transform="rotate(12 54 124)"/><rect x="139" y="124" width="13" height="28" rx="6.5" fill="url(#wdBody)" stroke="#CBD5E1" stroke-width="1" transform="rotate(-12 145 124)"/>' +
      '<rect x="64" y="118" width="72" height="54" rx="22" fill="url(#wdBody)" stroke="#CBD5E1" stroke-width="1.2"/><rect x="82" y="132" width="36" height="20" rx="8" fill="#0F172A"/><circle cx="94" cy="142" r="3" fill="#38BDF8"/><circle cx="106" cy="142" r="3" fill="#10B981"/>' + L.out +
      (L.ant ? '<line x1="100" y1="54" x2="100" y2="38" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="35" r="5" fill="#10B981" stroke="#ECFDF5" stroke-width="1.5"/>' : "") +
      '<rect x="54" y="52" width="92" height="62" rx="28" fill="url(#wdBody)" stroke="#CBD5E1" stroke-width="1.5"/>' + (L.ear ? '<rect x="48" y="72" width="7" height="22" rx="3.5" fill="#64748B"/><rect x="145" y="72" width="7" height="22" rx="3.5" fill="#64748B"/>' : "") +
      '<rect x="64" y="62" width="72" height="42" rx="18" fill="url(#wdVis)"/><ellipse cx="85" cy="80" rx="6" ry="7.5" fill="#38BDF8"/><circle cx="87" cy="77" r="2" fill="#FFFFFF"/><ellipse cx="115" cy="80" rx="6" ry="7.5" fill="#38BDF8"/><circle cx="117" cy="77" r="2" fill="#FFFFFF"/><path d="M 94 91 Q 100 96 106 91" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round"/>' +
      L.head + L.glass + L.hold + "</g>" + L.ff + "</svg>"
  }
  function wdU() { if (!U.wd) U.wd = { cat: "head", sel: "" }; return U.wd }
  function wdNm(id) { return tr("wdn_" + id) }
  function wdInner() {
    var j = jrS(), u = wdU(), ok = wdOk(), eq = j.eq, it = u.sel ? wdItem(u.sel) : null, i, h, pe = { head: eq.head, outfit: eq.outfit, acc: eq.acc, fx: eq.fx }, c, cn = 0, cc = 0
    if (it) pe[it[1]] = it[0]
    var list = WDI.filter(function (q) { return q[1] === u.cat })
    for (i = 0; i < list.length; i++) { cc++; if (wdOwn(list[i])) cn++ }
    h = '<div class="wdtop"><div class="wqpill wgpill">' + ic("checkroom") + " " + esc(tr("jr_shop")) + '</div><div class="wqlvb" id="wdbal">' + ic("star") + "<b>" + j.nur + "</b></div></div><div class=\"wdtabs\">"
    for (i = 0; i < WDC.length; i++) h += '<button class="wdtab' + (WDC[i][0] === u.cat ? " on" : "") + '" data-act="wdCat" data-v="' + WDC[i][0] + '">' + ic(WDC[i][2]) + "<span>" + esc(tr(WDC[i][1])) + "</span></button>"
    h += '</div><div class="wdmain"><div class="wdst" id="wdst"><div class="wdsh"><div class="wdsn"><small>' + esc(tr(WDC.filter(function (q) { return q[0] === u.cat })[0][1])) + "</small><b>" + (it ? esc(wdNm(it[0])) : "&nbsp;") + '</b></div><button class="wdrs" data-act="wdRst" aria-label="reset"' + (it ? "" : " disabled") + ">" + ic("restart_alt") + "</button></div>" + wdPrev(pe)
    var bt = "", cls = "wdgo"
    if (!it) { bt = '<span>' + esc(tr("wd_pick")) + "</span>"; cls += " dis" }
    else if (!wdOwn(it)) { bt = ic("star") + "<span>" + esc(tr("wd_buy")) + " · " + it[2] + "</span>"; cls += " buy" + (ok && j.nur >= it[2] ? "" : " dis") }
    else if (eq[u.cat] === it[0]) { if (it[2] === 0 && it[0] === "korpus_std") { bt = ic("check") + "<span>" + esc(tr("wd_on")) + "</span>"; cls += " on dis" } else { bt = "<span>" + esc(tr("jr_off")) + "</span>"; cls += " off" } }
    else { bt = ic("checkroom") + "<span>" + esc(tr("jr_eq")) + "</span>"; cls += " eq" + (ok ? "" : " dis") }
    h += '<button class="' + cls + '" data-act="wdAct">' + bt + '</button></div><div class="wdgr"><div class="wdgh"><span>' + esc(tr("wd_sel")) + "</span><b>" + cn + "/" + cc + '</b></div><div class="wdcells">'
    for (i = 0; i < list.length; i++) {
      var q = list[i], own = wdOwn(q), eqd = eq[u.cat] === q[0]
      h += '<button class="wdc' + (q[0] === u.sel ? " sel" : "") + (own ? " own" : "") + '" data-act="wdSel" data-v="' + q[0] + '"><span class="wdth">' + q[3] + "</span>" + (eqd ? '<i class="wdck">' + ic("check") + "</i>" : "") +
        (own ? "<small>" + esc(wdNm(q[0]).split(" ")[0]) + "</small>" : '<small class="wdpr">' + ic("lock") + q[2] + "</small>") + "</button>"
    }
    h += "</div></div></div>"
    if (!ok) h += '<div class="card jrlock">' + ic("lock") + "<span>" + esc(tr("jr_lock")) + '</span><button class="btn primary" data-act="premGo">' + ic("workspace_premium") + " Premium</button></div>"
    return h
  }
  function wdPaint() { var el = document.getElementById("wd"); if (el) el.innerHTML = wdInner() }
  function robotHtml() {
    return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + "</button><h1>" + ic("smart_toy") + " " + esc(tr("pet_t")) + "</h1><span></span></div>" +
      '<div class="list"><div class="rrow">' + ic("smart_toy") + "<span>" + esc(tr("pet_t")) + '</span><button class="tgl' + (S.pet === false ? "" : " on") + '" data-act="petT" aria-label="pet"><i></i></button></div></div><div class="wd" id="wd">' + wdInner() + "</div>"
  }
  function wdAct() {
    var j = jrS(), u = wdU(), it = u.sel ? wdItem(u.sel) : null
    if (!it) return
    if (!wdOwn(it)) {
      if (!wdOk()) { pToast(tr("jr_lock")); return }
      if (j.nur < it[2]) { toast(tr("wd_no")); return }
      j.nur -= it[2]; j.own.push(it[0]); wdWear(j, it); save(); jrApply(); haptic("medium"); wdPaint()
      var st = document.getElementById("wdst"); if (st) st.classList.add("flash")
      toast(wdNm(it[0]) + " — " + tr("wd_done"))
      return
    }
    if (!wdOk()) { pToast(tr("jr_lock")); return }
    if (j.eq[it[1]] === it[0]) { if (it[0] === "korpus_std") return; j.eq[it[1]] = "" } else wdWear(j, it)
    save(); jrApply(); haptic("light"); wdPaint()
  }
  function wdWear(j, it) { j.eq[it[1]] = it[0] }
  function wdGift() {
    var j = jrS()
    if (j.gift1) return
    j.gift1 = 1; j.nur += 9999; save()
    toast(tr("wd_gift")); if (U.tab === "more" && U.more === "robot") wdPaint()
  }
  function jrApply() {
    if (!PET.el) return
    var j = jrS(), ok = wdOk(), eq = ok ? j.eq : {}, sig = [eq.head, eq.outfit, eq.acc, eq.fx].join("|")
    if (PET.wdSig === sig) return
    PET.wdSig = sig
    var L = wdLay(eq, true), T = "translate(23 38) scale(.4) translate(-100 -118)", q = function (s) { return PET.el.querySelector(s) }
    q(".pfxb").innerHTML = '<g transform="' + T + '">' + L.fb + "</g>"
    q(".pout").innerHTML = '<g transform="translate(23 38) scale(.4 .37) translate(-100 -118)">' + L.out + "</g>"
    q(".phd").innerHTML = '<g transform="translate(23 9) scale(.4 .45) translate(-100 -52)">' + L.head + L.glass + "</g>"
    q(".pfa").innerHTML = '<g transform="' + T + '">' + L.hold + L.ff + "</g>"
    PET.el.classList.toggle("noant", !L.ant); PET.el.classList.toggle("noear", !L.ear)
  }
  setInterval(jrApply, 1500)
  setInterval(function () {
    if (!petOn() || !PET.el || document.hidden || Date.now() - PLI < 10000 || PET.sad || PET.act === "talk") return
    var j = jrS(), st = jrStreak()
    if (jrCnt() === 0 && Date.now() - (PET.jrSpoke || 0) > 1800000 && Date.now() - (PET.wxSpoke || 0) > 20000) {
      PET.jrSpoke = Date.now()
      PET.wxText = st > 0 ? tr("jr_rm").replace("{n}", st) : tr("jr_rm0"); PET.wxCat = 0; PET.wxAct = "jr"
      petGo("talk", 8000)
    } else if (Date.now() - (PET.tipAt || (PET.tipAt = Date.now() - 540000)) > 600000 && Date.now() - (PET.wxSpoke || 0) > 20000 && Date.now() - (PET.jrSpoke || 0) > 60000) {
      var TP = [["jr", "tip_jr"], ["wg", "tip_wg"], ["goal", "tip_goal"], ["prem", "tip_prem"]], q, tp = null
      for (q = 0; q < TP.length && !tp; q++) {
        var c = TP[((S.tipI | 0) + q) % TP.length]
        if ((c[0] === "goal" && hasGoal()) || (c[0] === "prem" && isPrem())) continue
        tp = c; S.tipI = ((S.tipI | 0) + q + 1) % TP.length
      }
      PET.tipAt = Date.now()
      if (tp) { save(); PET.wxText = tr(tp[1]); PET.wxCat = 0; PET.wxAct = tp[0]; petGo("talk", 9000) }
    }
  }, 3000)
  // ---- Xotira o'yini (premium)
  var MM = { g: null }
  var MMC = [[3, "mm_e", 3], [6, "mm_m", 4], [8, "mm_h", 4]]
  function mmS() { var m = S.mm; if (!m) m = S.mm = { d: "", n: 0, best: [0, 0, 0] }; if (m.d !== todayStr()) { m.d = todayStr(); m.n = 0 } return m }
  function mmShort(t) { t = String(t || "").replace(/\s+/g, " ").trim(); var p = t.split(/[.;]/)[0]; return p.length > 38 ? p.slice(0, 36).trim() + "\u2026" : p }
  function mmShuf(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x } return a }
  function mmStart(mode) {
    var pool = [], i
    for (i = 1; i <= 99; i++) if (mmShort(meaningOf(i))) pool.push(i)
    var ids = mmShuf(pool).slice(0, MMC[mode][0]), cards = []
    for (i = 0; i < ids.length; i++) { cards.push({ k: ids[i], t: "a" }); cards.push({ k: ids[i], t: "m" }) }
    MM.g = { mode: mode, cards: mmShuf(cards), open: [], done: {}, mv: 0, lock: 0, fin: 0, st: 0, gain: 0 }
  }
  function mmEl(i) { return document.querySelector('.mmc[data-i="' + i + '"]') }
  function mmTap(i) {
    var g = MM.g
    if (!g || g.lock || g.fin || g.done[i] || g.open.indexOf(i) >= 0) return
    g.open.push(i); haptic("light")
    var e = mmEl(i); if (e) e.classList.add("up")
    if (g.open.length < 2) return
    g.mv++
    var mv = document.getElementById("mmmv"); if (mv) mv.textContent = g.mv
    var a = g.open[0], b = g.open[1]
    if (g.cards[a].k === g.cards[b].k) {
      g.done[a] = g.done[b] = 1; g.open = []; haptic("medium")
      ;[a, b].forEach(function (x) { var el = mmEl(x); if (el) el.classList.add("ok") })
      if (Object.keys(g.done).length === g.cards.length) mmWin()
    } else {
      g.lock = 1
      setTimeout(function () { [a, b].forEach(function (x) { var el = mmEl(x); if (el) el.classList.remove("up") }); g.open = []; g.lock = 0 }, 850)
    }
  }
  function mmWin() {
    var g = MM.g, np = MMC[g.mode][0], m = mmS()
    m.t = (m.t | 0) + 1
    g.fin = 1; g.st = g.mv <= np * 1.5 ? 3 : g.mv <= np * 2.3 ? 2 : 1
    if (!m.best[g.mode] || g.mv < m.best[g.mode]) m.best[g.mode] = g.mv
    g.capped = m.n >= 3
    if (!g.capped) { m.n++; g.gain = g.st * (g.mode + 1) * 2; jrS().nur += g.gain }
    save(); haptic("heavy")
    setTimeout(function () { if (U.mm && MM.g === g) render() }, 700)
  }
  function viewMm() {
    var g = MM.g, h = '<div class="mm"><div class="wqtop"><button class="btn small back circ" data-act="mmClose" aria-label="back">' + ic("arrow_back") + '</button><div class="wqpill wgpill">' + ic("extension") + " " + esc(tr("mm_t")) + '</div><div class="wqlvb">' + (g && !g.fin ? '<b id="mmmv">' + g.mv + "</b>" + ic("touch_app") : ic("workspace_premium")) + "</div></div>"
    if (!g) {
      h += '<p class="sub">' + esc(tr("mm_sub")) + '</p><div class="mmm">'
      for (var i = 0; i < 3; i++) {
        var b = mmS().best[i]
        h += '<button class="card mmmode" data-act="mmStart" data-v="' + i + '"><b>' + esc(tr(MMC[i][1])) + "</b><span>" + MMC[i][0] * 2 + ' <i>\u00b7</i> ' + (b ? esc(tr("mm_best")) + " " + b + " " + esc(tr("mm_mv")) : "") + "</span>" + ic("chevron_right") + "</button>"
      }
      return h + "</div></div>"
    }
    if (g.fin) {
      var stars = ""; for (var q = 1; q <= 3; q++) stars += '<span class="' + (q <= g.st ? "on" : "") + '">' + ic("star") + "</span>"
      return h + '<div class="card mmwin"><div class="mmst">' + stars + "</div><b>" + esc(tr("mm_win")) + "</b><p>" + g.mv + " " + esc(tr("mm_mv")) + "</p>" + (g.gain ? "<p>+" + g.gain + " \u2605 " + esc(tr("mm_nur")) + "</p>" : g.capped ? "<p>" + esc(tr("mm_cap")) + "</p>" : "") + '<button class="btn primary block" data-act="mmStart" data-v="' + g.mode + '">' + esc(tr("mm_again")) + '</button><button class="btn block" data-act="mmMenu">' + esc(tr("mm_t")) + "</button></div></div>"
    }
    h += '<div class="mmg c' + MMC[g.mode][2] + '">'
    for (var k = 0; k < g.cards.length; k++) {
      var c = g.cards[k], on = g.done[k] ? " up ok" : g.open.indexOf(k) >= 0 ? " up" : ""
      h += '<button class="mmc' + on + '" data-act="mmTap" data-v="' + k + '" data-i="' + k + '"><span class="mmf">' + ic("help") + '</span><span class="mmb ' + c.t + '">' + (c.t === "a" ? esc(D.names[c.k - 1].a) : esc(mmShort(meaningOf(c.k)))) + "</span></button>"
    }
    return h + "</div></div>"
  }
  // ---- Yutuqlar (premium)
  var ACH = [["s", 3, 10, "local_fire_department"], ["s", 7, 30, "local_fire_department"], ["s", 30, 100, "local_fire_department"], ["c", 10, 20, "layers"], ["c", 50, 60, "layers"], ["c", 99, 200, "layers"], ["w", 10, 20, "extension"], ["w", 40, 100, "extension"], ["m", 10, 30, "psychology"]]
  function achVal(k) { return k === "s" ? Math.max(jrS().bs || 0, jrS().st || 0) : k === "c" ? jrS().cards.length : k === "w" ? wgS().lv : (S.mm && S.mm.t) | 0 }
  function achDone() { var n = 0; for (var i = 0; i < ACH.length; i++) if (achVal(ACH[i][0]) >= ACH[i][1]) n++; return n }
  function achClaimable() { var n = 0, c = S.ach || {}; for (var i = 0; i < ACH.length; i++) if (achVal(ACH[i][0]) >= ACH[i][1] && !c[i]) n++; return n }
  function viewAch() {
    var c = S.ach || {}, h = '<div class="ach"><div class="wqtop"><button class="btn small back circ" data-act="achClose" aria-label="back">' + ic("arrow_back") + '</button><div class="wqpill wgpill">' + ic("military_tech") + " " + esc(tr("ac_t")) + '</div><div class="wqlvb"><b>' + achDone() + "/" + ACH.length + "</b></div></div><div class=\"achl\">"
    for (var i = 0; i < ACH.length; i++) {
      var a = ACH[i], v = achVal(a[0]), ok = v >= a[1], pc = Math.min(100, Math.round(v / a[1] * 100))
      h += '<div class="card achr' + (ok ? " on" : "") + '"><span class="achi">' + ic(a[3]) + '</span><span class="acht"><b>' + esc(tr("ac_" + a[0]).replace("{n}", a[1])) + '</b><i><u style="width:' + pc + '%"></u></i><small>' + Math.min(v, a[1]) + " / " + a[1] + " \u00b7 +" + a[2] + ' \u2605</small></span>' +
        (ok ? (c[i] ? '<span class="achg">' + ic("check_circle") + "</span>" : '<button class="btn small primary" data-act="achGet" data-v="' + i + '">' + esc(tr("ac_get")) + "</button>") : "") + "</div>"
    }
    return h + "</div></div>"
  }
  // ---- Kayfiyatga mos ism (premium)
  var MNI = [[6, 38, 52, 53], [1, 2, 30, 47], [35, 56, 17, 79], [14, 82, 2, 1], [17, 18, 79, 47], [93, 98, 18, 30]], MNX = ["shield", "cloud", "favorite", "water_drop", "restaurant", "explore"]
  var MN = { m: -1, n: 0 }
  function mnPick(m) {
    var a = MNI[m].filter(function (x) { return x !== MN.n }), n = a[Math.floor(Math.random() * a.length)]
    MN.m = m; MN.n = n
    var h = S.mnh = S.mnh || []; h.unshift(n); S.mnh = h.filter(function (x, i) { return h.indexOf(x) === i }).slice(0, 6); save()
  }
  function viewMn() {
    var h = '<div class="mn"><div class="wqtop"><button class="btn small back circ" data-act="mnClose" aria-label="back">' + ic("arrow_back") + '</button><div class="wqpill wgpill">' + ic("favorite") + " " + esc(tr("mn_t")) + '</div><span></span></div>'
    if (MN.m < 0) {
      h += '<p class="sub">' + esc(tr("mn_sub")) + '</p><div class="mnm">'
      for (var i = 0; i < 6; i++) h += '<button class="card mnb" data-act="mnPick" data-v="' + i + '">' + ic(MNX[i]) + "<b>" + esc(tr("mn_" + i)) + "</b></button>"
      h += "</div>"
      var hs = S.mnh || []
      if (hs.length) { h += '<div class="jrqh"><span>' + esc(tr("mn_h")) + '</span></div><div class="nfb">'; for (var k = 0; k < hs.length; k++) h += '<button class="btn small" data-act="mnOpen" data-v="' + hs[k] + '">' + hs[k] + ". " + esc(D.names[hs[k] - 1].t) + "</button>"; h += "</div>" }
      return h + "</div>"
    }
    var n = MN.n, nm = D.names[n - 1], fv = S.favs && S.favs[n]
    return h + '<div class="card mnres"><small>' + esc(tr("mn_" + MN.m)) + '</small><span class="ar">' + esc(nm.a) + "</span><b>" + n + ". " + esc(nm.t) + "</b><p>" + esc(meaningOf(n)) + '</p><button class="btn primary block" data-act="mnOpen" data-v="' + n + '">' + esc(tr("mn_open")) + '</button><div class="nfb"><button class="btn" data-act="mnFav">' + ic(fv ? "favorite" : "favorite") + " " + esc(tr("mn_fav")) + (fv ? " \u2713" : "") + '</button><button class="btn" data-act="mnPick" data-v="' + MN.m + '">' + ic("restart_alt") + " " + esc(tr("mn_again")) + "</button></div></div></div>"
  }
  function viewHomePanel() {
    var w = wq(); wqRoll()
    var lay = S.hlay === "list" ? "list" : "grid"
    return '<div class="hpanel"><div class="hptg" role="group"><button data-act="hlay" data-v="grid" class="' + (lay === "grid" ? "on" : "") + '" aria-label="grid">' + ic("grid_view") + '</button><button data-act="hlay" data-v="list" class="' + (lay === "list" ? "on" : "") + '" aria-label="list">' + ic("view_list") + "</button></div>" +
      '<div class="hpg ' + lay + '"><button class="hikrow hcard" data-act="hikmat"><span id="hph" class="hph2" aria-label="' + esc(tr("hikmat")) + '"><span></span><span></span></span>' + ic("chevron_right") + "</button>" +
      '<button class="hikrow hcard wqc' + (w.on && !w.fin ? " act" : "") + '" data-act="waqOpen"><span class="hct"><b>' + ic("bedtime") + " " + esc(tr("waq_s")) + "</b></span>" + ic("chevron_right") + "</button>" +
      '<button class="hikrow hcard jrcard" data-act="jrOpen"><span class="hct"><b>' + ic("local_fire_department") + " " + esc(tr("jr_t")) + "</b><small>" + jrStreak() + " " + esc(tr("jr_days")) + " \u00b7 " + jrCnt() + '/3</small><span class="jrmini"><i class="' + (jrDay().a ? "on" : "") + '"></i><i class="' + (jrDay().z ? "on" : "") + '"></i><i class="' + (jrDay().g ? "on" : "") + '"></i></span></span>' + ic("chevron_right") + "</button>" +
      '<button class="hikrow hcard mncard" data-act="mnOpenPage"><span class="hct"><b>' + ic("favorite") + " " + esc(tr("mn_t")) + "</b><small>" + esc(tr("mn_sub")) + "</small></span>" + ic(isPrem() ? "chevron_right" : "lock") + "</button></div>" +
      '<div class="hpgm"><div class="hpgh"><i></i><span class="hpl">' + ic("sports_esports") + " " + esc(tr("gm_t")) + '</span><i></i></div><div class="hpgb"><div class="hpg ' + lay + '">' +
      '<button class="hikrow hcard wgcard" data-act="wgOpen"><span class="hct"><b>' + ic("extension") + " " + esc(tr("wg_t")) + "</b><small>" + (wgS().lv + 1) + " / 40</small></span>" + ic("chevron_right") + "</button>" +
      '<button class="hikrow hcard mmcard" data-act="mmOpen"><span class="hct"><b>' + ic("psychology") + " " + esc(tr("mm_t")) + "</b><small>" + esc(tr("mm_sub")) + "</small></span>" + ic(isPrem() ? "chevron_right" : "lock") + "</button>" +
      '<button class="hikrow hcard achcard" data-act="achOpen"><span class="hct"><b>' + ic("military_tech") + " " + esc(tr("ac_t")) + "</b><small>" + achDone() + "/" + ACH.length + (achClaimable() ? " \u00b7 +" + achClaimable() : "") + "</small></span>" + ic(isPrem() ? "chevron_right" : "lock") + "</button>" + "</div></div></div></div>"
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
  function hpStart() {
    HPT = null
    var box = document.getElementById("hph")
    if (!box) return
    var cur = box.firstChild, oth = box.lastChild, k = 0, items = [tr("hikmat"), tr("hk2"), tr("hk3"), tr("hk4"), tr("hk6"), tr("hk5"), tr("hk7"), tr("hk8")]
    function put(el, y, o, tt) { el.style.transition = tt ? "transform .5s cubic-bezier(.3,.7,.2,1), opacity .5s" : "none"; el.style.transform = "translateY(" + y + "%)"; el.style.opacity = o }
    cur.textContent = items[0]; put(cur, 0, 1, false); put(oth, 120, 0, false)
    HPT = function () {
      if (!document.getElementById("hph")) { HPT = null; return }
      k = (k + 1) % items.length
      oth.textContent = items[k]; put(oth, 120, 0, false); void oth.offsetWidth
      put(cur, -120, 0, true); put(oth, 0, 1, true)
      var t = cur; cur = oth; oth = t
    }
  }
  var HPT = null
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
      if (HPT) HPT()
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
  var nsRaf = 0, nsFirst = true
  function nsUpdate() {
    if (nsRaf) return
    if (nsFirst) { nsFirst = false; nsRaf = setTimeout(function () { nsRaf = 0; nsNow() }, 350) }
    else nsRaf = requestAnimationFrame(function () { nsRaf = 0; nsNow() })
  }
  function nsNow() {
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
    var off = typeof CFG.AUDIO_OFF === "number" ? CFG.AUDIO_OFF : (has[100] || (!has[1] && has[2]) || (has[1] && has[99] && !has[0] && items.length >= 99)) ? 1 : 0
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
    var by = window.MEANINGS_BY || {}, L = S.lang === "uz_new" ? "uz" : S.lang, cv = S.lang === "uz_new" ? UZN : function (x) { return x }
    if (by[L]) return cv(String(by[L][n - 1] || "").trim())
    var m = window.MEANINGS && window.MEANINGS[n - 1]
    if (m) {
      var v = typeof m === "string" ? m : (m[L] || m.en || m.uz || m.ru || "")
      return cv(String(v).trim())
    }
    loadMean(L); return ""
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
    if (U.dpanel === "note") return '<div class="card panel stack"><strong>' + ic("stylus_note") + " " + esc(tr("note")) + '</strong><div class="nline"><div class="nbox"><div class="trashw' + (S.notes[n] ? "" : " none") + '" id="trashw" data-v="' + n + '"><svg class="tring" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20.5" pathLength="100"/></svg><button id="trashBtn" class="trash" aria-label="Delete">' + ic("delete") + '</button></div><div id="noteText" class="nta" contenteditable="plaintext-only" role="textbox" spellcheck="false" data-ph="' + esc(tr("note_ph")) + '">' + esc(S.notes[n] || "") + "</div></div></div>" +
      '<div class="nrow"><button id="noteSave" class="btn success block" data-act="saveNote" data-v="' + n + '" hidden>' + esc(tr("save")) + "</button></div></div>"
    return ""
  }
  function viewDetail() {
    var n = U.detail, d = D.names[n - 1]
    var liked = !!S.favs[n], dirCls = U.dir ? " in-" + U.dir : ""
    U.dir = ""
    var mean = meaningOf(n)
    return '<button class="btn small back circ" data-act="closeDetail" aria-label="back">' + ic("arrow_back") + "</button>" +
      '<div class="slidewrap"><div id="slide" class="slide' + dirCls + '" data-n="' + n + '">' +
      '<div class="card hero"><div class="hnav" dir="ltr">' + (U.dlock ? "" : '<button class="rb" data-act="step" data-v="-1" aria-label="Previous">' + ic("chevron_left") + "</button>") + '<div class="no">' + n + ' / 99</div>' + (U.dlock ? "" : '<button class="rb" data-act="step" data-v="1" aria-label="Next">' + ic("chevron_right") + "</button>") + "</div>" +
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
    if (!U.detail || U.dlock) return
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
    var el = U.detail && !U.dlock && e.target.closest && e.target.closest("#app") && !e.target.closest("textarea, audio, input") ? document.getElementById("slide") : null
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
  var VR = []
  function vUrl(u) { u = String(u || ""); return /^(https?:)?\/\//.test(u) || u.indexOf("video/") === 0 ? u : (CFG.VIDEO_BASE || "").replace(/\/$/, "") + "/" + u.replace(/^\//, "") }
  function vList() { return (CFG.VIDEOS || []).concat(VR) }
  function vLoad() {
    var base = (CFG.VIDEO_BASE || "").replace(/\/$/, ""); if (!base || !window.fetch) return
    fetch(base + "/videos.json?_=" + Math.floor(Date.now() / 60000), { cache: "no-cache" }).then(function (r) { return r.json() }).then(function (arr) {
      var out = []
      for (var i = 0; i < (arr || []).length; i++) {
        var o = arr[i]; if (!o || !o.src) continue
        var src = {}
        if (typeof o.src === "string") src[720] = vUrl(o.src); else for (var k in o.src) src[k] = vUrl(o.src[k])
        out[out.length] = { t: o.t || o.title || "", poster: o.poster ? vUrl(o.poster) : "", src: src }
      }
      VR = out
      if (U.tab === "media" && U.mode === "video" && V.i < 0) render()
    }).catch(function () {})
  }
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
  setTimeout(vLoad, 600)
  function mediaInit() {
    var vid = document.getElementById("vid")
    if (!vid) { if (V.timer) { clearInterval(V.timer); V.timer = 0 } audUi(); pvStart(); return }
    var v = vList()[V.i]; if (!v) return
    V.cur = V.q === "auto" ? vAuto(v) : (v.src[V.q] ? +V.q : vAuto(v))
    vid.preload = "metadata"; vid.src = v.src[V.cur]; if (v.poster) vid.poster = v.poster
    vid.addEventListener("loadedmetadata", function () { if (V.t) try { vid.currentTime = V.t } catch (e) {}; vUi() }, { once: true })
    ;["timeupdate", "play", "pause", "progress", "durationchange", "canplay", "playing"].forEach(function (e) { vid.addEventListener(e, vUi) })
    vid.addEventListener("waiting", function () { if (!vid.seeking) V.stalls.push(Date.now()); vUi() })
    vid.addEventListener("ended", function () { vUi() })
    if (V.timer) clearInterval(V.timer)
    V.timer = setInterval(vAdapt, 4000)
    vqUi(); vUi()
  }
  function vTitle(v, i) { var t = v.t; if (t && typeof t === "object") t = S.lang === "uz_new" ? UZN(t.uz || t.en) : (t[S.lang] || t.en || t.uz); return t || (tr("video") + " " + (i + 1)) }
  function videoView() {
    var list = vList()
    if (!list.length) return '<p class="empty">' + ic("movie") + " " + esc(tr("no_video")) + "<br><small>config.js → VIDEOS</small></p>"
    var h = ""
    if (V.i >= 0 && list[V.i] && list[V.i].yt) {
      h += '<div class="vp"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(list[V.i].yt) + '?playsinline=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="width:100%;height:100%;border:0"></iframe></div><div class="vtitle">' + esc(vTitle(list[V.i], V.i)) + "</div>"
    } else if (V.i >= 0 && list[V.i] && list[V.i].tg) {
      var tgp = String(list[V.i].tg).replace(/^https?:\/\/t\.me\//, "").replace(/^\//, "")
      h += '<div class="vp vtgp"><iframe src="https://t.me/' + esc(tgp) + '?embed=1&mode=tme&dark=' + (effTheme() === "dark" ? 1 : 0) + '" allowfullscreen loading="lazy"></iframe></div><div class="vtitle">' + esc(vTitle(list[V.i], V.i)) + "</div>"
    } else if (V.i >= 0 && list[V.i]) {
      var v = list[V.i], qs = vQs(v), menu = '<button data-act="vqset" data-v="auto"' + (V.q === "auto" ? ' class="on"' : "") + ">Auto</button>"
      for (var k = 0; k < qs.length; k++) menu += '<button data-act="vqset" data-v="' + qs[k] + '"' + (String(V.q) === String(qs[k]) ? ' class="on"' : "") + ">" + qs[k] + "p</button>"
      h += '<div class="vp" id="vp"><video id="vid" playsinline webkit-playsinline preload="metadata"></video><div id="vbig" class="vbig" data-act="vplay">' + ic("play_arrow") + '</div><div id="vsp" class="vspin"></div>' +
        '<div class="vctl"><button id="vpb" data-act="vplay">' + ic("play_arrow") + '</button><div id="vseek" class="vseek"><i id="vbuf"></i><i id="vpos"></i></div><span id="vtc" class="vtc">0:00 / 0:00</span>' + (qs.length > 1 ? '<button id="vqb" class="vqb" data-act="vq"></button>' : "") + '<button data-act="vfs">' + ic("fullscreen") + '</button></div>' +
        '<div id="vmenu" class="vmenu" hidden><div class="vmt">' + esc(tr("quality")) + "</div>" + menu + "</div></div>" +
        '<div class="vtitle">' + esc(vTitle(v, V.i)) + "</div>"
    }
    h += '<div class="vlist">'
    for (var i = 0; i < list.length; i++) h += '<button class="vcard' + (i === V.i ? " cur" : "") + '" data-act="vsel" data-v="' + i + '"><span class="vth"' + (list[i].poster || list[i].yt ? ' style="background-image:url(' + esc(list[i].poster || "https://i.ytimg.com/vi/" + list[i].yt + "/hqdefault.jpg") + ')"' : "") + ">" + (!list[i].poster && list[i].src ? '<video class="vthv" muted playsinline preload="metadata" src="' + esc(list[i].src[vQs(list[i])[vQs(list[i]).length - 1]]) + '#t=1.5"></video>' : "") + ic("play_arrow") + '</span><span class="vtt">' + esc(vTitle(list[i], i)) + "</span></button>"
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
      '<linearGradient id="hgSandF" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="' + HT + '" y2="' + HB + '"><stop offset="0" style="stop-color:color-mix(in srgb,var(--s1) 52%,#000)"/><stop offset=".5" style="stop-color:color-mix(in srgb,var(--s2) 52%,#000)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--s1) 52%,#000)"/></linearGradient>' +
      '<linearGradient id="hgSandN" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="' + HT + '" y2="' + HB + '"><stop offset="0" style="stop-color:color-mix(in srgb,var(--s1) 62%,#fff)"/><stop offset=".5" style="stop-color:color-mix(in srgb,var(--s2) 62%,#fff)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--s1) 62%,#fff)"/></linearGradient>' +
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
      h += '<circle class="sg" cx="' + f2(p.x) + '" cy="' + f2(p.y) + '" r="' + f2(R * 2.6) + '" fill="url(#hgSand)"/>'
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
    var FILLS = ["url(#hgSandF)", "url(#hgSand)", "url(#hgSandN)"]
    for (i = 0; i < 100; i++) {
      var gp = s.g[i], el = s.els[i]
      if (gp.z === undefined) { gp.z = Math.random(); gp.vz = 0; gp.zr = Math.random(); gp.fb = -1 }
      var ddx = gp.x - gp.px, ddy = gp.y - gp.py
      if (ddx * ddx + ddy * ddy > 0.02) {
        gp.vz += (Math.random() - 0.5) * 0.1; gp.vz *= 0.93; gp.z += gp.vz
        if (gp.z < 0) { gp.z = 0; gp.vz = Math.abs(gp.vz) } else if (gp.z > 1) { gp.z = 1; gp.vz = -Math.abs(gp.vz) }
      } else gp.z += (gp.zr - gp.z) * 0.06
      el.setAttribute("cx", gp.x.toFixed(2))
      el.setAttribute("cy", gp.y.toFixed(2))
      el.setAttribute("r", (R * 2.6 * (0.7 + 0.62 * gp.z)).toFixed(2))
      var fb = gp.z < 0.34 ? 0 : gp.z < 0.67 ? 1 : 2
      if (gp.fb !== fb) { gp.fb = fb; el.setAttribute("fill", FILLS[fb]) }
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
    var free = ds.mode === "free"
    if (free) {
      var pc = Math.min(100, Math.floor(draft * 100 / target))
      return '<div class="dbar"><div class="dnums"><b>' + fmtNum(target) + '</b><b id="dDone">' + draft + '</b><b id="dLeft">' + Math.max(0, target - draft) + "</b></div>" +
        '<div class="dtrack"><i id="dFill" style="width:' + pc + '%"></i></div>' +
        '<div class="dcap"><span>' + esc(tr("needed")) + "</span><span>" + esc(tr("done_n")) + "</span><span>" + esc(tr("left_n")) + "</span></div>" +
        '<div class="dtot"><span>' + esc(tr("total_n")) + ': </span><b id="dTot">' + (ds.count || 0) + "</b></div></div>"
    }
    var owed = Math.max(0, ds.owedDays || 0), N = 1 + owed, td = todayStr(), f = Math.min(target, draft), pct = Math.min(100, draft * 100 / target)
    var seg = "", chips = "", dots = "", i, lab = N <= 8
    if (N <= 24) {
      for (i = 0; i < N; i++) {
        var last = i === N - 1
        seg += '<span class="wqs' + (last && f >= target ? " full" : "") + '"><i' + (last ? ' id="dFill"' : "") + ' style="width:' + (last ? pct : 0) + '%"></i>' + (lab ? "<em" + (last ? ' id="dEm"' : "") + ">" + (last ? f : 0) + "/" + fmtNum(target) + "</em>" : "") + "</span>"
        chips += '<div class="wqcw' + (last && f >= target ? " ok" : "") + '">' + wqChip(last ? "" : dayAdd(td, -(N - 1 - i)), last) + "</div>"
        dots += "<i></i>"
      }
    } else {
      seg = '<span class="wqs one"><i id="dFill" style="width:' + pct + '%"></i></span>'
      chips = '<div class="wqcw">' + wqChip(dayAdd(td, -owed), false) + '</div><div class="wqcw"><div class="wqdc"><span class="wqchip">' + N + " " + esc(tr("waq_dw")) + '</span></div></div><div class="wqcw">' + wqChip("", true) + "</div>"
      dots = "<i></i><i></i><i></i>"
    }
    var ncol = N <= 24 ? N : 3
    return '<div class="dbar dwq"><div class="wqdates" style="--n:' + ncol + '">' + chips + "</div>" +
      '<div class="wqdots" style="--n:' + ncol + '">' + dots + "</div>" +
      '<div class="wqbw"><div class="wqbar">' + seg + "</div></div>" +
      '<div class="wqnums"><span class="wqg">' + esc(tr("needed")) + " <b>" + fmtNum(target) + "</b></span>" +
      '<span class="wqg">' + esc(tr("done_n")) + ' <b id="dDone">' + draft + "</b></span>" +
      (owed ? '<span class="wqg">' + esc(tr("waq_debt")) + " <b>" + owed + " " + esc(tr("waq_dw")) + "</b></span>" : "") +
      '<span class="wqg">' + esc(tr("left_n")) + ' <b id="dLeft">' + Math.max(0, target - draft) + "</b></span></div></div>"
  }
  function hgStats(full) {
    var ds = S.daily
    var d = document.getElementById("dDone"), l = document.getElementById("dLeft")
    var tt = document.getElementById("dTot"); if (tt) tt.textContent = ds.count || 0
    if (d) d.textContent = ds.draft || 0
    var em = document.getElementById("dEm"); if (em) em.textContent = Math.min(ds.target, ds.draft || 0) + "/" + fmtNum(ds.target)
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
  function goalSpin() {
    var host = document.getElementById("digits")
    if (!host) return
    var tr0 = host.querySelectorAll(".dg-track"), IH = 36, t0 = performance.now(), st = [], i
    for (i = 0; i < tr0.length; i++) st[i] = tr0[i].scrollTop
    U.gsp = true
    function fr(now) {
      var all = true
      for (var k = 0; k < tr0.length; k++) {
        var p = Math.min(1, Math.max(0, (now - t0 - k * 90) / 900)); if (p < 1) all = false
        var e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
        tr0[k].scrollTop = st[k] + e * 10 * IH
      }
      if (!all) requestAnimationFrame(fr); else setTimeout(function () { U.gsp = false }, 250)
    }
    requestAnimationFrame(fr)
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
          if (d !== last) { last = d; if (!U.gsp) haptic("light") }
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
  var TB_N = 14, TB_SP = 30, TB_L = 420, tbOffC = 0, tbOffT = 0, tbRaf = 0
  function tbY(x) { var u = (x - 180) / 200; return 66 + 50 * (1 - u * u) }
  function tbHtml(ds) {
    var p = "", i, x
    for (i = 0; i <= 24; i++) { x = -20 + i * 16.7; p += (i ? "L" : "M") + x.toFixed(1) + " " + tbY(x).toFixed(1) }
    var s = '<svg id="tbsvg" class="tbsvg" viewBox="0 0 360 150" data-act="tap"><defs>' +
      '<radialGradient id="tbb" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#b8f4ff"/><stop offset=".45" stop-color="#27b4ee"/><stop offset="1" stop-color="#0a5aa8"/></radialGradient>' +
      '<radialGradient id="tbg" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff0b8"/><stop offset=".5" stop-color="#e9ab2e"/><stop offset="1" stop-color="#8a5a10"/></radialGradient></defs>' +
      '<path d="' + p + '" fill="none" stroke="rgba(200,230,255,.35)" stroke-width="1.5"/>'
    for (i = 0; i < 17; i++) s += '<circle class="tbd" data-i="' + i + '" r="11.5" fill="url(#tbb)"/>'
    s += "</svg>"
    var pct = Math.min(1, (ds.draft || 0) / Math.max(1, ds.target)), C = 2 * Math.PI * 62
    var st = '<svg class="tbstars" viewBox="0 0 360 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">', sd = 7, r
    function rn() { sd = (sd * 9301 + 49297) % 233280; return sd / 233280 }
    for (i = 0; i < 90; i++) { r = rn(); st += '<circle cx="' + (rn() * 360).toFixed(1) + '" cy="' + (rn() * 440).toFixed(1) + '" r="' + (r < .85 ? .5 + rn() * .6 : 1.3 + rn() * .7).toFixed(2) + '" fill="#fff" opacity="' + (.35 + rn() * .6).toFixed(2) + '"' + (i % 4 === 0 ? ' class="tw" style="animation-delay:' + (rn() * 4).toFixed(1) + 's"' : "") + "/>" }
    st += "</svg>"
    return '<div class="tbmoon"></div>' + st + '<i class="tbcl c1"></i><i class="tbcl c2"></i><i class="tbcl c3"></i><div class="tbtop"><div class="tbar">اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ</div><div class="tblat">Allohumma solli ‘alā Muhammad</div></div>' + s +
      '<div class="tbring"><svg viewBox="0 0 150 150"><defs><linearGradient id="tbl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#46d7ff"/><stop offset="1" stop-color="#b07cff"/></linearGradient></defs>' +
      '<circle cx="75" cy="75" r="62" fill="rgba(5,13,36,.45)" stroke="rgba(255,255,255,.14)" stroke-width="7"/>' +
      '<circle id="tbarc" cx="75" cy="75" r="62" fill="none" stroke="url(#tbl)" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + (C * pct).toFixed(1) + " " + C.toFixed(1) + '" transform="rotate(-90 75 75)"/></svg>' +
      '<div class="tbnum"><b id="tbn">' + (ds.draft || 0) + '</b><span>/ ' + fmtNum(ds.target) + "</span></div></div>"
  }
  function tbDraw() {
    var svg = document.getElementById("tbsvg"); if (!svg) return
    var ds = svg.querySelectorAll(".tbd"), j, k, x, sc, p = tbOffC, kb = Math.floor(p) - 8
    for (j = 0; j < ds.length; j++) {
      k = kb + j
      if (k < 0 || k > 999999) { ds[j].setAttribute("visibility", "hidden"); continue }
      x = 180 + (k - p) * TB_SP
      sc = 1 + .4 * Math.max(0, 1 - Math.abs(x - 180) / TB_SP)
      ds[j].setAttribute("visibility", "visible")
      ds[j].setAttribute("fill", k > 0 && k % 33 === 0 ? "url(#tbg)" : "url(#tbb)")
      ds[j].setAttribute("transform", "translate(" + x.toFixed(1) + " " + tbY(x).toFixed(1) + ") scale(" + sc.toFixed(3) + ")")
    }
  }
  function tbInit() {
    var svg = document.getElementById("tbsvg"); if (!svg) return
    cancelAnimationFrame(tbRaf)
    tbOffC = tbOffT = (S.daily && S.daily.draft) || 0
    tbDraw()
  }
  function tbTap(cycles) {
    var ds = S.daily, stg = document.getElementById("hgstage")
    var n = document.getElementById("tbn"), arc = document.getElementById("tbarc")
    if (n) n.textContent = cycles > 0 ? ds.target : (ds.draft || 0)
    if (arc) { var C = 2 * Math.PI * 62, pc = cycles > 0 ? 1 : Math.min(1, (ds.draft || 0) / ds.target); arc.setAttribute("stroke-dasharray", (C * pc).toFixed(1) + " " + C.toFixed(1)) }
    if (stg) {
      var pl = document.createElement("b"); pl.className = "tbp"; pl.textContent = "+" + (ds.step || 1); stg.appendChild(pl)
      setTimeout(function () { pl.remove() }, 800)
    }
    tbOffT += ds.step || 1
    var from = tbOffC, t0 = 0
    cancelAnimationFrame(tbRaf)
    function fr(ts) {
      if (!t0) t0 = ts
      var k = Math.min(1, (ts - t0) / 260), e = 1 - Math.pow(1 - k, 3)
      tbOffC = from + (tbOffT - from) * e; tbDraw()
      if (k < 1) tbRaf = requestAnimationFrame(fr)
    }
    tbRaf = requestAnimationFrame(fr)
  }
  function viewDaily() {
    var ds = S.daily
    var dgRow = '<div class="topt"><div class="tl"><span>' + esc(tr("dglass")) + '</span><button class="tgl pr' + (isPrem() ? " pm" : "") + (S.dglass && isPrem() ? " on" : "") + '" data-act="dglass" aria-label="glass"><i>' + ic(isPrem() ? "lock_open" : "lock") + "</i></button></div></div>"
    if (S.dview === "mj") S.dview = "hg"
    var dvSeg = '<div class="seg"><button data-act="dview" data-v="hg" class="' + (S.dview === "tb" ? "" : "on") + '">' + esc(tr("dv_hg")) + '</button><button data-act="dview" data-v="tb" class="' + (S.dview === "tb" ? "on" : "") + '">' + esc(tr("dv_tb")) + "</button></div>"
    var formHtml = function () {
      var gv = ds && ds.target ? Math.min(ds.target, 999999) : 0, cols = ""
      var pad = ("000000" + gv).slice(-6)
      for (var gi = 0; gi < 6; gi++) {
        cols += '<div class="dg" data-d="' + pad.charAt(gi) + '"><div class="dg-track"></div></div>'
        if (gi === 2) cols += '<span class="dg-comma">,</span>'
      }
      var dm = U.dmode || (ds && ds.mode) || "goal"
      var seg = '<div class="seg"><button data-act="dmode" data-v="goal" class="' + (dm === "goal" ? "on" : "") + '">' + ic("trending_up") + " " + esc(tr("mode_goal")) + '</button><button data-act="dmode" data-v="free" class="' + (dm === "free" ? "on" : "") + '">' + ic("all_inclusive") + " " + esc(tr("mode_free")) + "</button></div>"
      if (dm === "free") return '<div class="card stack goalbox">' + seg + '' + "" + dvSeg + dgRow + '<button class="btn success block" data-act="saveDaily">' + esc(tr("save")) + "</button></div>"
      return '<div class="card stack goalbox">' + seg + '<div class="goalhead"><span>' + esc(tr("target_lbl")) + '</span><b id="goalVal">' + fmtNum(gv) + "</b></div>" +
        '<div class="digits" id="digits" dir="ltr">' + cols + "</div>" +
        '<div class="chips">' + [33, 100, 300, 1000].map(function (x) { return '<button class="chip" data-act="preset" data-v="' + x + '">' + fmtNum(x) + "</button>" }).join("") + "</div>" +
        dvSeg + dgRow + '<button class="btn success block" data-act="saveDaily">' + esc(tr("save")) + "</button></div>"
    }
    if (!ds || !ds.target) {
      if (U.dmode === "free") return '<h1>📿 ' + esc(tr("daily")) + '</h1>' + formHtml()
      return '<h1>📿 ' + esc(tr("daily")) + '</h1><p class="sub">' + esc(tr("daily_ask")) + "</p>" + formHtml()
    }
    dailyTick()
    var target = ds.target, step = ds.step || 1, draft = ds.draft || 0, owed = ds.owedDays || 0
    hgShown = hgFallen(ds)
    var h = '<div class="daily' + (S.dglass && isPrem() ? " dglass" : "") + '"><div class="dhead"><h1>📿 ' + esc(tr("daily")) + ' <span class="dmi">•' + ic(ds.mode === "free" ? "all_inclusive" : "trending_up") + '</span></h1><button class="gear' + (U.dailyMenu ? " on" : "") + '" data-act="dailyMenu" aria-label="Settings">' + ic("settings") + '</button></div>'
    if (U.dailyMenu) h += '<div style="margin-bottom:10px">' + formHtml() + "</div>"
    if (owed > 0) h += '<p class="owed center">' + esc(tr("owed").replace("{n}", owed)) + "</p>"
    var tbv = S.dview === "tb"
    h += '<div id="hgwrap" class="hgwrap"><div id="hgstage" class="hgstage' + (tbv ? " tbs" : "") + '">' + (tbv ? tbHtml(ds) : hgBg() + '<div id="hgbox" class="hgbox' + (ds.mode === "free" ? " free" : "") + '">' + hgSvg(hgShown) + "</div>")
    if (ds.todayDone) h += '<div class="done center">' + esc(tr(["cong", "cong2", "cong3", "cong4"][new Date().getDate() % 4])) + "</div>"
    else if (!tbv) h += dBarHtml(ds, target, draft)
    h += "</div></div>"
    h += ds.todayDone ? '<button class="tap-round off" disabled>✓</button>' : '<div class="tapzone"><i class="tb b1"></i><i class="tb b2"></i><i class="tb b3"></i><button class="tap-round" data-act="tap" aria-label="+">' + (ic("add") + (step > 1 ? '<b class="stp">' + step + "</b>" : "")) + "</button></div>"
    return h + "</div>"
  }

  function quoteSwap(i) {
    var card = document.querySelector(".card.quote")
    if (!card || !card.animate || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) { U.quoteIdx = i; render(); return }
    var r = card.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1)
    var cl = card.cloneNode(true)
    cl.style.cssText = "position:fixed;margin:0;z-index:9998;pointer-events:none;left:" + r.left + "px;top:" + r.top + "px;width:" + r.width + "px;height:" + r.height + "px;clip-path:inset(0 0 0 0);-webkit-clip-path:inset(0 0 0 0)"
    var cv = document.createElement("canvas"), pad = 40
    cv.width = (r.width + pad * 2) * dpr; cv.height = r.height * dpr
    cv.style.cssText = "position:fixed;z-index:9999;pointer-events:none;left:" + (r.left - pad) + "px;top:" + r.top + "px;width:" + (r.width + pad * 2) + "px;height:" + r.height + "px"
    document.body.appendChild(cl); document.body.appendChild(cv)
    var g = cv.getContext("2d"), pts = [], t0 = 0, DUR = 1000, W = r.width, H = r.height
    function rgbOf(c) { var m = String(c).match(/[\d.]+/g); return m ? [+m[0], +m[1], +m[2], m.length > 3 ? +m[3] : 1] : [30, 30, 30, 1] }
    var cs = getComputedStyle(card), bg = rgbOf(cs.backgroundColor)
    if (bg[3] < .6) bg = rgbOf(getComputedStyle(document.body).backgroundColor)
    var tx = rgbOf(cs.color), ac = rgbOf(cs.borderLeftColor)
    function cstr(c, a) { return "rgba(" + (c[0] | 0) + "," + (c[1] | 0) + "," + (c[2] | 0) + "," + a + ")" }
    var rad = parseFloat(cs.borderTopLeftRadius) || 12
    U.quoteIdx = i; render()
    var ROWS = 30, jit = []
    for (var jr = 0; jr < ROWS; jr++) jit[jr] = (Math.random() - .5) * 40
    function frame(ts) {
      if (!t0) t0 = ts
      var k = Math.min(1, (ts - t0) / DUR), e = k * k * (3 - 2 * k) * .3 + k * .7, base = (W + 26) * (1 - e) - 10
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W + pad * 2, H)
      var poly = "0px 0px", rh = H / ROWS
      for (var i = 0; i < ROWS; i++) {
        jit[i] += (Math.random() - .5) * 8; if (jit[i] > 24) jit[i] = 24; if (jit[i] < -24) jit[i] = -24
        var x = Math.max(0, Math.min(W, base + jit[i])), y0 = i * rh, y1 = (i + 1) * rh
        poly += "," + x.toFixed(1) + "px " + y0.toFixed(1) + "px," + x.toFixed(1) + "px " + y1.toFixed(1) + "px"
        if (k < 1 && x < W - 1 && x > 1) for (var n = 0; n < 4; n++) {
          var rr = Math.random(), c = rr < .5 ? bg : rr < .88 ? tx : ac
          pts[pts.length] = { x: pad + x + Math.random() * 6, y: y0 + Math.random() * rh, vx: .15 + Math.random() * .9, vy: (Math.random() - .5) * .9, l: 1, s: .7 + Math.random() * 1.3, c: c }
        }
      }
      poly += ",0px " + H + "px"
      cl.style.clipPath = "polygon(" + poly + ")"; cl.style.webkitClipPath = cl.style.clipPath
      for (var q = pts.length - 1; q >= 0; q--) {
        var o = pts[q]; o.x += o.vx; o.y += o.vy; o.vx *= .93; o.vy *= .93; o.l -= .045
        if (o.l <= 0) { pts.splice(q, 1); continue }
        g.fillStyle = cstr(o.c, o.l); g.beginPath(); g.arc(o.x, o.y, o.s, 0, 6.2832); g.fill()
      }
      if (k < 1 || pts.length) requestAnimationFrame(frame)
      else { cl.remove(); cv.remove() }
    }
    requestAnimationFrame(frame)
  }

  // ====================
  // MORE: quote / favs / lang / about
  // ====================
  var HEM = ["🙃", "🫠", "🥰", "😍", "🥺", "🥹", "❤️‍🔥", "💫", "🫀", "🫴", "🌸", "🌺", "🌙", "⚡️", "✨️", "🫧", "✅️"]
  function emSrc(ch, k) {
    var cp = Array.from(ch).map(function (c) { return c.codePointAt(0).toString(16) })
    if (ch.indexOf("\u200d") < 0) cp = cp.filter(function (x) { return x !== "fe0f" })
    var f = cp.join("-") + ".png"
    return [
      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.1.2/img/apple/64/" + f,
      "https://unpkg.com/emoji-datasource-apple@15.1.2/img/apple/64/" + f,
      "https://emojicdn.elk.sh/" + encodeURIComponent(ch) + "?style=apple"
    ][k] || ""
  }
  window.emErr = function (im) {
    var k = (parseInt(im.getAttribute("data-k"), 10) || 0) + 1, u = emSrc(im.alt, k)
    if (!u) { var sp = document.createElement("span"); sp.className = "emx"; sp.textContent = im.alt; im.replaceWith(sp); return }
    im.setAttribute("data-k", k); im.src = u
  }
  function emImg(ch) {
    return '<img class="qem" style="display:inline-block;width:1.05em;height:1.05em;max-width:1.05em;vertical-align:-.16em;margin:0 0 0 .1em;pointer-events:none" alt="' + ch + '" draggable="false" data-k="0" src="' + emSrc(ch, 0) + '" onerror="emErr(this)">'
  }
  // Oddiy emoji o'rniga Apple (premium uslubidagi) emoji rasmlari
  var EMRE = null, EMT = null
  try {
    var EMP = "(?:[\\u{1F1E6}-\\u{1F1FF}]{2}|(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic}\\uFE0F)[\\u{1F3FB}-\\u{1F3FF}]?(?:\\u200d(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic}\\uFE0F?)[\\u{1F3FB}-\\u{1F3FF}]?)*)"
    EMRE = new RegExp(EMP, "gu"); EMT = new RegExp(EMP, "u")
  } catch (e) {}
  function emFix(tn) {
    var s = tn.nodeValue, fr = document.createDocumentFragment(), last = 0, m, im
    EMRE.lastIndex = 0
    while ((m = EMRE.exec(s))) {
      if (m.index > last) fr.appendChild(document.createTextNode(s.slice(last, m.index)))
      im = document.createElement("img"); im.className = "qem"; im.alt = m[0]; im.draggable = false; im.setAttribute("data-k", "0"); im.src = emSrc(m[0], 0)
      im.setAttribute("style", "display:inline-block;width:1.1em;height:1.1em;max-width:1.1em;vertical-align:-.2em;margin:0 .08em;pointer-events:none")
      im.onerror = function () { window.emErr(this) }
      fr.appendChild(im); last = m.index + m[0].length
    }
    if (last < s.length) fr.appendChild(document.createTextNode(s.slice(last)))
    if (tn.parentNode) tn.parentNode.replaceChild(fr, tn)
  }
  function emOk(n) {
    var p = n.parentNode
    if (!p || !EMT.test(n.nodeValue)) return false
    var t = p.nodeName
    if (t === "SCRIPT" || t === "STYLE" || t === "TEXTAREA" || t === "INPUT" || t === "OPTION" || t === "TITLE") return false
    if (p.closest && p.closest("svg,[contenteditable],.msi,.emx")) return false
    return true
  }
  function emojify(root) {
    if (!EMRE || !root) return
    if (root.nodeType === 3) { if (emOk(root)) emFix(root); return }
    if (root.nodeType !== 1) return
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], n
    while ((n = w.nextNode())) if (emOk(n)) list.push(n)
    for (var i = 0; i < list.length; i++) emFix(list[i])
  }
  if (EMRE && window.MutationObserver && document.body) {
    var emSet = [], emQ = false
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i]
        if (m.type === "characterData") emSet.push(m.target)
        else for (var j = 0; j < m.addedNodes.length; j++) emSet.push(m.addedNodes[j])
      }
      if (emQ || !emSet.length) return
      emQ = true
      requestAnimationFrame(function () {
        emQ = false
        var l = emSet; emSet = []
        for (var k = 0; k < l.length; k++) if (l[k].isConnected) emojify(l[k])
      })
    }).observe(document.body, { childList: true, subtree: true, characterData: true })
    emojify(document.body)
  }
  function quoteData(i) {
    var q = D.quotes[i]
    var title = pick(q.h), body = pick(q.q), src = pick(D.quran) + " " + q.ref
    var em = HEM[i % HEM.length]
    return { q: q, title: title, body: body, em: em, src: src, share: q.e + " " + title + "\n\n" + body + "\n\n" + em + "\n\n📖 " + src }
  }
  // ====================
  // YORDAM (chat) va BILDIRISHNOMALAR
  // ====================
  var SUPI = '<span class="msi svgi" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="10.6" r="3.6"/><path d="M6.6 11.2a5.4 5.4 0 0 1 10.8 0"/><rect x="4.9" y="10.6" width="2.4" height="4.4" rx="1.1"/><rect x="16.7" y="10.6" width="2.4" height="4.4" rx="1.1"/><path d="M18 15v1.2a2 2 0 0 1-2 2h-2.4"/><circle cx="12.6" cy="18.2" r=".9"/><path d="M6.4 21.2c.7-2.2 2.6-3.4 5.6-3.4"/></svg></span>'
  var HCH = { admin: false, msgs: [], pend: [], chats: null, name: "", un: "", busy: 0, n: 0, tk: 0 }
  var CK1 = '<svg class="tk" viewBox="0 0 12 11"><path d="M1.5 5.8l3.3 3.2L10.5 1.5"/></svg>'
  var CK2 = '<svg class="tk" viewBox="0 0 22 11"><path d="M1.5 5.8l3.3 3.2L10.5 1.5"/><path d="M11.5 5.8l3.3 3.2L20.5 1.5"/></svg>'
  function hBase() { return CFG.STATS_URL ? String(CFG.STATS_URL).replace(/\/$/, "") : "" }
  function hPost(p, b) {
    if (!hBase() || !tg || !tg.initData || !window.fetch) return Promise.reject(new Error("no"))
    b = b || {}; b.initData = tg.initData
    return fetch(hBase() + p, { method: "POST", body: JSON.stringify(b) }).then(function (r) { if (!r.ok) throw new Error("http"); return r.json() })
  }
  function hHM(ts) { var d = new Date(ts); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) }
  function hDay(ts) {
    var d = new Date(ts), n = new Date(), k = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    return wqFmt(k, 0) + (d.getFullYear() === n.getFullYear() ? "" : ", " + d.getFullYear())
  }
  function hMore() { return U.tab === "more" && (U.more === "help" || U.more === "notif") }
  function hSetBadge(n) {
    if (n === HCH.n) return
    HCH.n = n
    var b = navEl && navEl.querySelector('[data-v="more"]')
    if (b) b.classList.toggle("hasn", n > 0)
    if (U.tab === "more" && U.more === "menu") render()
  }
  function hBadge() {
    hPost("/chat/unread", {}).then(function (j) { HCH.admin = !!j.admin; if (HCH.admin) wdGift(); hSetBadge(j.n || 0) }).catch(function () {})
  }
  function hSync(open) {
    if (HCH.busy) return
    HCH.busy = 1
    hPost("/chat/sync", { open: open ? 1 : 0, uid: U.hcUid || 0 }).then(function (j) {
      HCH.busy = 0
      if (j.chats) {
        HCH.admin = true; wdGift(); HCH.chats = j.chats
        var un = 0; for (var i = 0; i < j.chats.length; i++) un += j.chats[i].n
        hSetBadge(un)
        if (U.more === "help" && !U.hcUid) { if (document.getElementById("hlist")) hListPaint(); else render() } else if (U.more === "notif") notifPaint()
        return
      }
      var wasAdmin = HCH.admin
      HCH.admin = !!j.admin; if (HCH.admin) wdGift(); HCH.name = j.name || ""; HCH.un = j.un || ""
      var old = {}; HCH.msgs.forEach(function (x) { if (x.lurl) old[x.id] = x.lurl })
      HCH.msgs = (j.msgs || []).map(function (x) { if (old[x.id]) x.lurl = old[x.id]; return x })
      var un2 = 0; if (!HCH.admin) for (var k = 0; k < HCH.msgs.length; k++) if (HCH.msgs[k].f === "a" && !HCH.msgs[k].rts) un2++
      if (!HCH.admin) hSetBadge(open ? 0 : un2)
      if (U.more === "help") { if (U.hcUid && !document.getElementById("chatTx")) render(); else chatPaint() } else if (U.more === "notif") notifPaint()
    }).catch(function () { HCH.busy = 0 })
  }
  function hFSize(n) { return n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB" }
  function hFUrl(m, dl) { return hBase() + "/chat/f?d=" + encodeURIComponent(tg && tg.initData || "") + "&id=" + m.id + (dl ? "&dl=1" : "") }
  function chatPaint(force) {
    var el = document.getElementById("chatMsgs")
    if (!el) return
    var near = window.innerHeight + (window.pageYOffset || 0) >= document.documentElement.scrollHeight - 180
    var me = HCH.admin ? "a" : "u", list = HCH.msgs.concat(HCH.pend), h = "", last = ""
    var seen = {}; list = list.filter(function (x) { if (!x.id) return true; if (seen[x.id]) return false; seen[x.id] = 1; return true })
    var ib = document.getElementById("hinfoBtn"); if (ib) ib.classList.toggle("on", list.length > 0)
    el.classList.toggle("empty", !list.length)
    if (!list.length) h = '<div class="hinfo">' + (HCH.admin ? "" : '<span class="hii">' + ic("info") + "</span>") + "<p>" + esc(tr(HCH.admin ? "h_noc" : "h_info")) + "</p></div>"
    else if (U.hinfo && !HCH.admin) h = '<div class="hinfo top" data-act="hinfo"><span class="hii">' + ic("info") + "</span><p>" + esc(tr("h_info")) + "</p></div>"
    for (var i = 0; i < list.length; i++) {
      var m = list[i], ds = hDay(m.ts), mine = m.f === me
      if (ds !== last) { h += '<div class="hday">' + esc(ds) + "</div>"; last = ds }
      var tk = !mine ? "" : (m.pending || (!m.dts && !m.rts)) ? '<span class="tks">' + CK1 + "</span>" : '<span class="tks' + (m.rts ? " rd" : "") + '">' + CK2 + "</span>"
      var md = "", u = m.lurl || (m.id ? hFUrl(m, 0) : "")
      if (m.k === "i" && u) md = '<img class="hmi" data-act="chImg" data-v="' + esc(u) + '" data-id="' + (m.id || 0) + '" src="' + esc(u) + '" alt="">'
      else if (m.k === "v" && u) md = '<video class="hmv" controls playsinline preload="metadata" src="' + esc(u) + '"></video>'
      else if (m.k) md = '<button class="hmf" data-act="chDl" data-v="' + (m.id || 0) + '"><span class="hfi">' + ic("description") + '</span><span class="hfn"><b>' + esc(m.fn || "file") + "</b><em>" + hFSize(m.fs || 0) + '</em></span><span class="hfd">' + ic("download") + "</span></button>"
      var tx = m.t ? '<div class="hbt">' + esc(m.t).replace(/\n/g, "<br>") + "</div>" : ""
      h += '<div class="hm ' + (mine ? "me" : "th") + '"><div class="hb' + (m.pending ? " pend" : "") + (md ? " hasm" : "") + '">' + md + tx + '<span class="hmeta">' + hHM(m.ts) + tk + "</span></div></div>"
    }
    el.innerHTML = h
    if (force || near) window.scrollTo(0, document.documentElement.scrollHeight)
  }
  function hListPaint() {
    var el = document.getElementById("hlist")
    if (!el) return
    var c = HCH.chats || [], h = ""
    if (!c.length) h = '<p class="hempty">' + esc(tr("h_noc")) + "</p>"
    for (var i = 0; i < c.length; i++) {
      var x = c[i], nm = x.name || ("ID " + x.uid)
      h += '<button class="hrow" data-act="chatOpen" data-v="' + x.uid + '"><span class="hav">' + esc(nm.charAt(0).toUpperCase()) + '</span><span class="hmid"><b>' + esc(nm) + (x.un ? ' <i>@' + esc(x.un) + "</i>" : "") + "</b><em>" + (x.f === "a" ? "↩ " : "") + esc(x.t) + '</em></span><span class="hr2"><small>' + hHM(x.ts) + "</small>" + (x.n ? '<span class="bdg">' + x.n + "</span>" : "") + "</span></button>"
    }
    el.innerHTML = h
  }
  function notifPaint() {
    var el = document.getElementById("nlist")
    if (!el) return
    var h = ""
    if (HCH.admin) {
      h += '<button class="btn primary block" data-act="bcNew">' + ic("campaign") + " " + esc(tr("bc_new")) + "</button>"
      var c = HCH.chats || []
      for (var i = 0; i < c.length; i++) if (c[i].n) h += '<button class="hrow" data-act="chatOpen" data-v="' + c[i].uid + '"><span class="hav">' + ic("notifications") + '</span><span class="hmid"><b>' + esc(c[i].name || ("ID " + c[i].uid)) + "</b><em>" + esc(c[i].t) + '</em></span><span class="hr2"><small>' + hHM(c[i].ts) + '</small><span class="bdg">' + c[i].n + "</span></span></button>"
    } else {
      var l = HCH.msgs.filter(function (m) { return m.f === "a" }).reverse().slice(0, 20)
      for (var k = 0; k < l.length; k++) h += '<button class="hrow' + (l[k].rts ? "" : " unr") + '" data-act="more" data-v="help"><span class="hav">' + ic("notifications") + '</span><span class="hmid"><b>' + esc(tr("h_new")) + "</b><em>" + esc(l[k].t) + '</em></span><span class="hr2"><small>' + esc(hDay(l[k].ts)) + " " + hHM(l[k].ts) + "</small>" + (l[k].rts ? "" : '<span class="bdg">•</span>') + "</span></button>"
    }
    el.innerHTML = h || '<p class="hempty">' + esc(tr("h_none")) + "</p>"
  }
  function helpHtml() {
    var adm = HCH.admin, inChat = !adm || U.hcUid, title = adm && U.hcUid ? (HCH.name || "ID " + U.hcUid) : adm ? tr("help") : tr("h_dev")
    var right = adm && U.hcUid ? '<button class="btn small circ" data-act="chatDel" aria-label="delete">' + ic("delete") + "</button>" : (!adm ? '<button id="hinfoBtn" class="btn small circ hinfob" data-act="hinfo" aria-label="info">' + ic("info") + "</button>" : "<span></span>")
    var h = '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + "</button><h1>" + (adm && U.hcUid ? "" : SUPI + " ") + esc(title) + "</h1>" + right + "</div>"
    if (!inChat) return h + '<div id="hlist" class="hl"></div>'
    return h + '<div id="chatMsgs" class="chat empty"></div>' +
      '<div class="chatin"><div id="chStage" class="chstage"></div><div class="chrow"><button class="att" data-act="chAtt" aria-label="attach">' + ic("attach_file") + '</button><div class="chw"><span id="chPh" class="chph">' + esc(tr("h_ph")) + '</span><textarea id="chatTx" rows="1" maxlength="1500"></textarea></div><button class="send" data-act="chatSend" aria-label="send">' + ic("send") + '</button></div><input id="chFile" type="file" hidden></div>'
  }
  var BC = { items: null }
  function bcItems() { if (!BC.items) BC.items = (S.bc && S.bc.length ? S.bc : []); return BC.items }
  function bcUnseen() { var a = bcItems(), n = 0, sn = S.bcSeen || []; for (var i = 0; i < a.length; i++) if (sn.indexOf(a[i].id) < 0) n++; return n }
  function bcSync() {
    var b = hBase(); if (!b || !window.fetch) return
    fetch(b + "/bc/list").then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (j) {
      if (!j || !j.items) return
      BC.items = j.items; S.bc = j.items.slice(0, 20); save()
      if (U.more === "notif") bcPaint(); else if (U.tab === "more" && U.more === "menu") render()
    }).catch(function () {})
  }
  function bcPick(o) { return (o && (o[S.lang === "uz_new" ? "uz" : S.lang] || o.en || o.uz || "")) || "" }
  function bcHtml() {
    var a = bcItems(), h = "", i, sn = S.bcSeen = S.bcSeen || []
    for (i = 0; i < a.length; i++) {
      var x = a[i], bt = bcPick(x.b)
      h += '<div class="card nfc bcc"><button class="bcx" style="' + (HCH.admin ? "" : "display:none") + '" data-act="bcDel" data-v="' + esc(x.id) + '" aria-label="delete">' + ic("delete") + "</button>" +
        (x.img ? '<img class="nfimg" alt="" src="' + esc(x.img) + '">' : "") + "<p>" + esc(bcPick(x.t)) + "</p>" +
        (bt ? '<div class="nfb"><button class="btn small primary" data-act="petTip" data-v="' + esc(x.go || "") + '">' + esc(bt) + "</button></div>" : "") + "</div>"
      if (sn.indexOf(x.id) < 0) sn.push(x.id)
    }
    if (sn.length > 60) S.bcSeen = sn.slice(-60)
    return h
  }
  function bcPaint() { var e = document.getElementById("bclist"); if (e) { e.innerHTML = bcHtml(); save() } }
  var BCG = [["", "bc_none"], ["jr", "jr_t"], ["wg", "wg_t"], ["goal", "pm_goalbtn"], ["prem", "nf_pm_t"], ["waq", "waq_s"], ["names", "nav_names"], ["media", "nav_media"], ["mood", "nav_mood"], ["daily", "nav_daily"]]
  function bcForm() {
    var f = U.bcf = U.bcf || { t: {}, b: {}, img: "", go: "" }, h = '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + "</button><h1>" + ic("campaign") + " " + esc(tr("bc_new")) + '</h1><span></span></div><div class="stack bcf">'
    for (var i = 0; i < TXI.length; i++) {
      var l = TXI[i]
      h += '<div class="card nfc"><b>' + esc(LANG_NAMES[l]) + '</b><textarea rows="3" data-bc="t" data-l="' + l + '" placeholder="' + esc(tr("bc_text")) + '">' + esc(f.t[l] || "") + '</textarea><input type="text" data-bc="b" data-l="' + l + '" placeholder="' + esc(tr("bc_btn")) + '" value="' + esc(f.b[l] || "") + '"></div>'
    }
    h += '<div class="card nfc"><button class="btn" data-act="bcImg">' + ic("attach_file") + " " + esc(tr("bc_img")) + '</button><input id="bcFile" type="file" accept="image/*" hidden><div id="bcPrev">' + (f.img ? '<img class="nfimg" alt="" src="' + f.img + '">' : "") + "</div>"
    h += "<b>" + esc(tr("bc_go")) + '</b><select data-bc="go">'
    for (i = 0; i < BCG.length; i++) h += '<option value="' + BCG[i][0] + '"' + (f.go === BCG[i][0] ? " selected" : "") + ">" + esc(tr(BCG[i][1])) + "</option>"
    return h + '</select></div><button class="btn primary block" data-act="bcSend">' + ic("campaign") + " " + esc(tr("bc_send")) + "</button></div>"
  }
  document.addEventListener("input", function (e) {
    var t = e.target, k = t && t.getAttribute && t.getAttribute("data-bc"); if (!k || !U.bcf) return
    if (k === "go") U.bcf.go = t.value; else U.bcf[k][t.getAttribute("data-l")] = t.value
  })
  document.addEventListener("change", function (e) {
    var t = e.target
    if (t && t.getAttribute && t.getAttribute("data-bc") === "go" && U.bcf) U.bcf.go = t.value
    if (t && t.id === "bcFile" && t.files && t.files[0]) {
      var rd = new FileReader()
      rd.onload = function () {
        var im = new Image()
        im.onload = function () {
          var k = Math.min(1, 800 / Math.max(im.width, im.height)), c = document.createElement("canvas")
          c.width = Math.round(im.width * k); c.height = Math.round(im.height * k)
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height)
          U.bcf.img = c.toDataURL("image/jpeg", .8)
          var pv = document.getElementById("bcPrev"); if (pv) pv.innerHTML = '<img class="nfimg" alt="" src="' + U.bcf.img + '">'
        }
        im.src = rd.result
      }
      rd.readAsDataURL(t.files[0])
    }
  })
  function hasGoal() { return !!(S.daily && S.daily.target) }
  function nfCards() {
    if (S.nv !== 1) { S.nv = 1; save() }
    var nw = !isPrem() && !hasGoal()
    var h = '<div id="bclist">' + bcHtml() + "</div>" + '<div class="card nfc"><b>' + ic("auto_awesome") + " " + esc(tr("nf_new_t")) + "</b><p>" + esc(tr("nf_new")) + '</p><div class="nfb"><button class="btn small" data-act="petTip" data-v="jr">' + esc(tr("jr_t")) + '</button><button class="btn small" data-act="petTip" data-v="wg">' + esc(tr("wg_t")) + '</button></div></div>'
    h += '<div class="card nfc' + (nw ? " big" : "") + '"><b>' + ic("workspace_premium") + " " + esc(tr("nf_pm_t")) + "</b><p>" + esc(tr(nw || !isPrem() ? "nf_pm_long" : "nf_pm_short")) + '</p><div class="nfb">' + (isPrem() ? "" : '<button class="btn small primary" data-act="premGo">' + esc(tr("nf_pm_t")) + "</button>") + (hasGoal() ? "" : '<button class="btn small" data-act="goalGo">' + esc(tr("pm_goalbtn")) + "</button>") + "</div></div>"
    save()
    return h
  }
  function goFeat(v) {
    U.detail = 0; U.waq = false; U.wg = false; U.mm = false; U.ach = false; U.mn = false; MN.m = -1; MM.g = null; U.jr = ""; U.jrRet = false; U.wgOne = false; U.more = "menu"; U.hikBack = false; U.dailyMenu = false
    if (v === "jr") { U.tab = "names"; U.jr = "main" }
    else if (v === "wg") { U.tab = "names"; U.wg = true }
    else if (v === "goal") { U.tab = "daily"; U.dailyMenu = true; U.dmode = ""; U.goalSpin = true }
    else if (v === "prem") { U.tab = "more"; U.more = "premium" }
    else if (v === "waq") { U.tab = "names"; U.waq = true }
    else if (v === "names" || v === "media" || v === "mood" || v === "daily") U.tab = v
    render(); window.scrollTo(0, 0)
  }
  function notifHtml() {
    return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + "</button><h1>" + ic("notifications") + " " + esc(tr("notif")) + '</h1><span></span></div>' + nfCards() + '<div id="nlist" class="hl"></div>'
  }
  function hStart() {
    if (!hMore()) return
    if (U.more === "help") { chatPaint(true) ; if (document.getElementById("hlist")) hListPaint() }
    else notifPaint()
    hSync(U.more === "help" && (!HCH.admin || !!U.hcUid))
  }
  function hSend(t) {
    var me = HCH.admin ? "a" : "u", pm = { id: 0, f: me, t: t, ts: Date.now(), pending: 1 }
    HCH.pend = HCH.pend.concat([pm]); chatPaint(true)
    hPost("/chat/send", { text: t, uid: U.hcUid || 0 }).then(function (j) {
      HCH.pend = HCH.pend.filter(function (x) { return x !== pm })
      if (j && j.ok) hAdd({ id: j.id, f: me, t: t, ts: j.ts || Date.now(), dts: null, rts: null }); else { toast(tr("h_err")); var tx = document.getElementById("chatTx"); if (tx && !tx.value) tx.value = t }
      chatPaint(true)
    }).catch(function () {
      HCH.pend = HCH.pend.filter(function (x) { return x !== pm })
      toast(tr("h_err")); var tx = document.getElementById("chatTx"); if (tx && !tx.value) tx.value = t
      chatPaint(true)
    })
  }
  function hAdd(m) { for (var i = 0; i < HCH.msgs.length; i++) if (HCH.msgs[i].id === m.id) { if (m.lurl) HCH.msgs[i].lurl = m.lurl; return } HCH.msgs.push(m) }
  function hUpload(file, cap, done) {
    if (!hBase() || !tg || !tg.initData || !window.fetch) { toast(tr("h_err") + " (tg)"); done(false); return }
    if (file.size > 20 * 1048576) { toast(tr("h_big")); done(false); return }
    var me = HCH.admin ? "a" : "u", url = ""
    try { url = URL.createObjectURL(file) } catch (e) {}
    var fd = new FormData(); fd.append("initData", tg.initData); fd.append("uid", String(U.hcUid || 0)); fd.append("caption", cap || ""); fd.append("file", file, file.name || "file")
    function fail(c) { toast(tr("h_err") + (c ? " (" + c + ")" : "")); done(false) }
    fetch(hBase() + "/chat/file", { method: "POST", body: fd }).then(function (r) {
      if (!r.ok) { fail(r.status); return null }
      return r.json()
    }).then(function (j) {
      if (j === null) return
      if (!j || !j.ok) { if (j && j.err === "big") { toast(tr("h_big")); done(false) } else fail(j && j.err || "?"); return }
      hAdd({ id: j.id, f: me, t: cap || "", ts: j.ts || Date.now(), dts: null, rts: null, k: j.k, fn: j.fn, fs: j.fs, mt: j.mt, lurl: url })
      chatPaint(true); done(true)
    }).catch(function () { fail("net") })
  }
  function chStagePaint() {
    var el = document.getElementById("chStage"); if (!el) return
    var f = U.hfile
    if (!f) { el.innerHTML = ""; el.classList.remove("on"); return }
    var im = (f.type || "").indexOf("image/") === 0, th = ""
    if (im) { try { th = '<img src="' + U.hfileUrl + '" alt="">' } catch (e) {} } else th = ic((f.type || "").indexOf("video/") === 0 ? "movie" : "description")
    el.innerHTML = '<span class="cst">' + th + '</span><span class="csn"><b>' + esc(f.name || "file") + "</b><em>" + hFSize(f.size) + '</em></span>' + (U.hup ? '<i class="cspin"></i>' : '<button data-act="chRm" aria-label="remove">' + ic("close") + "</button>")
    el.classList.toggle("up", !!U.hup)
    el.classList.add("on")
  }
  function chPhStep() {
    var p = document.getElementById("chPh"); if (!p) return
    var ks = ["h_ph", "h_ph2", "h_ph3", "h_ph4"]
    U.hphi = ((U.hphi | 0) + 1) % ks.length
    p.classList.add("out")
    setTimeout(function () { var q = document.getElementById("chPh"); if (!q) return; q.textContent = tr(ks[U.hphi]); q.classList.remove("out") }, 260)
  }
  setInterval(function () { if (!document.hidden) chPhStep() }, 3400)
  document.addEventListener("input", function (e) {
    var t = e.target
    if (t && t.id === "chatTx") { var p = document.getElementById("chPh"); if (p) p.classList.toggle("hid", !!t.value) }
  })
  document.addEventListener("change", function (e) {
    var t = e.target
    if (t && t.id === "chFile" && t.files && t.files[0]) {
      var f = t.files[0]; t.value = ""
      if (f.size > 20 * 1048576) { toast(tr("h_big")); return }
      if (U.hfileUrl) { try { URL.revokeObjectURL(U.hfileUrl) } catch (e2) {} }
      U.hfile = f; U.hfileUrl = ""; try { U.hfileUrl = URL.createObjectURL(f) } catch (e3) {}
      chStagePaint()
    }
  })
  function hKb() {
    var vv = window.visualViewport, kb = vv ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : 0
    document.documentElement.style.setProperty("--kb", (kb > 60 ? kb : 0) + "px")
    if (document.documentElement.classList.contains("tying") && kb > 60) window.scrollTo(0, document.documentElement.scrollHeight)
  }
  if (window.visualViewport) { window.visualViewport.addEventListener("resize", hKb); window.visualViewport.addEventListener("scroll", hKb) }
  document.addEventListener("focusin", function (e) {
    if (e.target && e.target.id === "chatTx") { document.documentElement.classList.add("tying"); hKb(); setTimeout(function () { hKb(); window.scrollTo(0, document.documentElement.scrollHeight) }, 320) }
  })
  document.addEventListener("focusout", function (e) {
    if (e.target && e.target.id === "chatTx") setTimeout(function () { if (!document.activeElement || document.activeElement.id !== "chatTx") { document.documentElement.classList.remove("tying"); document.documentElement.style.setProperty("--kb", "0px") } }, 120)
  })
  document.addEventListener("input", function (e) {
    var t = e.target
    if (t && t.id === "chatTx") { t.style.height = "auto"; t.style.height = Math.min(120, t.scrollHeight) + "px" }
  })
  setInterval(function () {
    if (document.hidden) return
    HCH.tk++
    if (hMore()) { if (U.more === "help" ? HCH.tk % 1 === 0 : HCH.tk % 2 === 0) hSync(U.more === "help" && (!HCH.admin || !!U.hcUid)) }
    else if (HCH.tk % 15 === 0) { hBadge(); bcSync() }
  }, 3000)
  setTimeout(hBadge, 2500)
  setTimeout(bcSync, 3000)

  function viewMore() {
    if (U.more === "quote") {
      if (U.quoteIdx < 0) U.quoteIdx = Math.floor(Math.random() * D.quotes.length)
      var d = quoteData(U.quoteIdx), qb = isPrem() ? (S.qbg | 0) : 0, qbs = ""
      if (isPrem()) {
        qbs = '<div class="qbgs">'
        for (var qi = 0; qi < 4; qi++) qbs += '<button class="' + (qb === qi ? "on" : "") + '" data-act="qbg" data-v="' + qi + '"><i class="qd' + qi + '"></i>' + esc(tr("qb" + qi)) + "</button>"
        qbs += "</div>"
      }
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + "</button><h1>" + esc(tr("hikmat")) + '</h1><button class="btn small circ' + (U.qset ? " on" : "") + '" data-act="qset" aria-label="settings">' + ic("settings") + '</button></div><div class="qsetw' + (U.qset ? " open" : "") + '"><div class="qsetin">' + hlPill() + qbs + "</div></div>" +
        '<div class="card quote' + (qb ? " qbg" + qb : "") + '"><div class="qin"><strong>' + esc(d.title) + '</strong><div class="qt">' + esc(d.body) + " " + emImg(d.em) + '</div></div><div class="qrefs"><span class="ref">' + ic("verified") + " " + esc(d.src) + '</span><span class="ref">' + ic("smart_toy") + " @" + CFG.BOT + "</span></div></div>" +
        '<div class="qbtns"><button class="btn" data-act="share">' + ic("share") + "<span>" + esc(tr("share")) + '</span></button><button class="btn" data-act="open" data-v="' + d.q.n + '">' + ic("auto_awesome") + "<span>" + esc(D.names[d.q.n - 1].t) + '</span></button><button class="btn" data-act="quoteNext">' + ic("skip_next") + "</button></div>"
    }
    if (U.more === "favs") {
      var ids = []
      for (var k in S.favs) if (S.favs[k]) ids[ids.length] = parseInt(k, 10)
      ids.sort(function (a, b) { return a - b })
      var h = '<button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + "</button><h1>❣️ " + esc(tr("favs")) + "</h1>"
      if (!ids.length) return h + '<p class="empty">' + esc(tr("favs_empty")) + "</p>"
      h += nameCards(ids)
      for (var i = 0; i < ids.length; i++) {
        if (S.notes[ids[i]]) h += '<div class="card" style="margin-top:10px"><strong>' + D.names[ids[i] - 1].a + " · " + esc(D.names[ids[i] - 1].t) + "</strong><div>" + esc(S.notes[ids[i]]) + "</div></div>"
      }
      return h
    }
    if (U.more === "theme") {
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("palette") + " " + esc(tr("theme_t")) + '</h1><span></span></div>' +
        '<div id="themeOpts" class="topts">' + themeOpts() + '</div><p class="ginfo">' + ic("info") + " <span>" + esc(tr("gender_info")) + "</span></p>"
    }
    if (U.more === "mode") {
      var mm = '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("contrast") + " " + esc(tr("mode_t")) + '</h1><span></span></div><div id="mdw" class="hsl"></div><div id="mglobe">' + modeGlobeHtml() + "</div>"
      return mm
    }
    if (U.more === "settings") {
      var cg = S.gender === "female" ? "th_female" : S.gender === "male" ? "th_male" : "th_auto"
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("settings") + " " + esc(tr("settings")) + '</h1><span></span></div><div class="tzpill" id="tzpill"></div><div class="list">' +
        '<button data-act="more" data-v="premium">' + ic("workspace_premium") + " " + esc(tr("st_prem")) + "</button>" +
        '<button data-act="more" data-v="mode">' + ic("contrast") + " " + esc(tr("mode_t")) + " · " + esc(tr("th_" + S.theme)) + "</button>" +
        '<button data-act="more" data-v="theme">' + ic("palette") + " " + esc(tr("theme_t")) + " · " + esc(tr(cg)) + "</button>" +
        '<button data-act="more" data-v="lang">' + ic("translate") + " " + esc(tr("lang")) + " · " + LANG_NAMES[S.lang] + "</button>" +
        '<div class="rrow" data-act="more" data-v="robot">' + ic("smart_toy") + "<span>" + esc(tr("pet_t")) + '</span><span class="rdiv" aria-hidden="true"></span><button class="tgl' + (S.pet === false ? "" : " on") + '" data-act="petT" aria-label="pet"><i></i></button></div>' +
        '<div class="rrow" data-act="more" data-v="remind">' + ic("notifications") + "<span>" + esc(tr("remind")) + '</span><span class="rdiv" aria-hidden="true"></span><button class="tgl' + (S.remind === false ? "" : " on") + '" data-act="rmt" data-v="all" aria-label="remind"><i></i></button></div></div>'
    }
    if (U.more === "pmx") return pmxHtml()
    if (U.more === "robot") return robotHtml()
    if (U.more === "premium") {
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("workspace_premium") + " " + esc(tr("st_prem")) + '</h1><span></span></div><div id="pmbody">' + pmHtml() + '</div><div class="card nfc"><b>' + esc(tr("pmi_t")) + '</b><ul class="pmil">' + [1, 2, 3, 4, 5].map(function (q) { return "<li>" + ic("check_circle") + "<span>" + esc(tr("pmi_" + q)) + "</span></li>" }).join("") + '</ul><button class="btn primary block" data-act="goalGo">' + ic("trending_up") + " " + esc(tr("pm_goalbtn")) + '</button></div><p class="pmfree">' + esc(tr("pm_free")) + "</p>"
    }
    if (U.more === "remind") {
      var rp = rmGet(), on0 = S.remind !== false
      function rrow(lbl, key, hk) {
        var wh = hk ? '<div class="dg hw" data-rm="' + hk + '" data-h="' + rp[hk] + '"><div class="dg-track"></div></div>' : ""
        return '<div class="topt rmrow"><div class="tl"><span>' + esc(tr(lbl)) + '</span><span class="rmr">' + wh + '<button class="tgl' + (rp[key] ? " on" : "") + '" data-act="rmt" data-v="' + key + '" aria-label="' + key + '"><i></i></button></span></div></div>'
      }
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("notifications") + " " + esc(tr("remind")) + '</h1><span></span></div><p class="sub">&nbsp;</p><div class="card stack">' +
        '<div class="topt"><div class="tl"><span><b>' + esc(tr("remind")) + '</b></span><button class="tgl' + (on0 ? " on" : "") + '" data-act="rmt" data-v="all" aria-label="all"><i></i></button></div></div>' +
        '<div class="rmlist' + (on0 ? "" : " off") + '">' + rrow("rm_daily", "d", "dh") + rrow("rm_due", "s", "sh") + rrow("rm_owed", "o", "") + "</div></div>"
    }
    if (U.more === "lang") {
      U.lcty = U.lcty || ""
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("translate") + " " + esc(tr("lang")) + '</h1><span></span></div><div class="globe"><canvas id="lgl"></canvas></div><div id="lvar" class="lrow">' + lvarHtml() + '</div><div id="lall" class="lrow">' + lallHtml() + "</div>"
    }
    if (U.more === "about") {
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("info") + " " + esc(tr("about")) + '</h1><span></span></div><div class="card stack"><p>' + ic("auto_awesome", "ab") + " " + esc(tr("about_text")) + '</p>' + aboutRate() +
        '<button class="btn primary block" data-act="openBot">' + ic("smart_toy") + " " + esc(tr("open_bot")) + '</button><button class="btn block" data-act="openChannel">' + ic("campaign") + " " + esc(tr("open_channel")) + "</button></div>"
    }
    if (U.more === "help") return helpHtml()
    if (U.more === "notif") return notifHtml()
    if (U.more === "bcnew") return bcForm()
    if (U.more === "stats") {
      return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("bar_chart") + " " + esc(tr("st_t")) + '</h1><span></span></div><div id="stbody">' + statsHtml() + "</div>"
    }
    return '<h1>' + ic("auto_awesome") + " " + esc(tr("nav_more")) + '</h1><p class="sub">&nbsp;</p><div class="list">' +
      '<button data-act="more" data-v="settings">' + ic("settings") + " " + esc(tr("settings")) + "</button>" +
      '<button data-act="more" data-v="help">' + SUPI + " " + esc(tr("help")) + (HCH.admin && HCH.n ? '<span class="bdg">' + HCH.n + "</span>" : "") + "</button>" +
      '<button data-act="more" data-v="notif">' + ic("notifications") + " " + esc(tr("notif")) + ((HCH.n + (S.nv !== 1 ? 2 : 0) + bcUnseen()) ? '<span class="bdg">' + (HCH.n + (S.nv !== 1 ? 2 : 0) + bcUnseen()) + "</span>" : "") + "</button>" +
      '<button data-act="more" data-v="stats">' + ic("bar_chart") + " " + esc(tr("st_t")) + "</button>" +
      '<button data-act="more" data-v="about">' + ic("info") + " " + esc(tr("about")) + "</button></div>"
  }

  // ====================
  // RENDER
  // ====================
  // ====================
  // STATISTIKA
  // ====================
  function pmxLive() { var x = S.pmx; if (x && x.until > Date.now()) return x; if (x) { S.pmx = null; save() } return null }
  function isPrem() { var x = pmxLive(); if (x) return x.mode === "on"; return !!S.premium || pmObj().on || trLeft() > 0 }
  function pmxHtml() {
    var x = pmxLive(), on = isPrem(), m = x ? Math.max(0, Math.ceil((x.until - Date.now()) / 1000)) : 0
    return '<div class="shead"><button class="btn small back circ" data-act="moreBack" aria-label="back">' + ic("arrow_back") + '</button><h1>' + ic("workspace_premium") + ' Premium test</h1><span></span></div>' +
      '<div class="card stack goalbox"><p class="sub center">Hozirgi holat</p><h2 class="center">' + (on ? "★ Premium YOQIQ" : "Premium YO'Q") + (x ? " (vaqtincha)" : "") + '</h2>' +
      (x ? '<p class="sub center"><b id="pmxc">' + ("0" + Math.floor(m / 60)).slice(-2) + ":" + ("0" + (m % 60)).slice(-2) + "</b> qoldi</p>" : "") +
      '<button class="btn success block" data-act="pmxSet" data-v="on">10 daqiqa Premium yoqish</button>' +
      '<button class="btn block" data-act="pmxSet" data-v="off">10 daqiqa Premium o\'chirish</button>' +
      (x ? '<button class="btn small block" data-act="pmxSet" data-v="">Haqiqiy holatga qaytish</button>' : "") + "</div>"
  }
  var PM_N = 7, PM_TRIAL = 3 * 60000, PM_DAY = 1, PM_WEEK = 3
  function pmObj() { return S.pm || (S.pm = { on: false, n: 0, last: "" }) }
  function dayAdd(k, n) { var p = k.split("-"), x = new Date(+p[0], +p[1] - 1, +p[2] + n); return x.getFullYear() + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" + ("0" + x.getDate()).slice(-2) }
  function dayStart(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]).getTime() }
  function pmGrace() {
    var p = pmObj(); if (!p.on || !p.last) return 0
    var t = todayStr(); if (p.last === t || p.last === dayAdd(t, -1)) return 0
    return dayStart(dayAdd(p.last, 3))
  }
  function pmCheck() {
    var p = pmObj(), t = todayStr()
    if (!p.last || p.last === t || p.last === dayAdd(t, -1)) return
    if (p.on) { if (Date.now() >= dayStart(dayAdd(p.last, 3))) { p.on = false; p.n = 0; p.last = ""; p.re = 1; save(); toast(tr("pm_end")) } }
    else { p.n = 0; p.last = ""; save() }
  }
  function pmDone() {
    pmCheck()
    var p = pmObj(), t = todayStr(); stDay().dn = 1
    if (p.last === t) { save(); return }
    if (!p.last) p.n = 1; else if (p.last === dayAdd(t, -1) || p.on) p.n++; else p.n = 1
    p.last = t
    if (!p.on && p.n >= (p.re ? 3 : PM_N)) { p.on = true; p.re = 0; toast(tr("pm_got")) }
    save()
  }
  function trLeft() { var t = S.trial; return t && t.until > Date.now() ? t.until - Date.now() : 0 }
  function trUsed() {
    var l = (S.trial && S.trial.log) || [], now = Date.now(), d0 = dayStart(todayStr()), a = 0, b = 0
    l.forEach(function (x) { if (x >= d0) a++; if (x >= now - 7 * 86400000) b++ })
    return [a, b]
  }
  function trCan() { var u = trUsed(); return u[0] < PM_DAY && u[1] < PM_WEEK && !trLeft() }
  function pmClock(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60
    return (h ? h + ":" + ("0" + m).slice(-2) : ("0" + m).slice(-2)) + ":" + ("0" + x).slice(-2)
  }
  function pmUi() {
    ST.n = (ST.n || 0) + 1
    var inSt = U.tab === "more" && U.more === "stats"
    if (ST.n % 30 === 0) { var was = pmObj().on; pmCheck(); if (was && !pmObj().on && inSt) stPaint() }
    var tl = trLeft()
    if (ST.trOn && !tl) { toast(tr("pm_trial_end")); if (inSt) stPaint() }
    ST.trOn = tl > 0
    var el = document.getElementById("pmt")
    if (el) { var ms = +el.getAttribute("data-u") - Date.now(); if (ms <= 0) { if (inSt) stPaint() } else el.textContent = pmClock(ms) }
  }
  function pmHtml() {
    var p = pmObj(), tl = trLeft(), gr = pmGrace(), h = "", i
    if (S.premium || p.on) {
      h = '<div class="pmc on">' + ic("workspace_premium") + '<div class="pmb"><b>' + esc(tr("pm_active")) + "</b>" + (p.on ? "<span>" + p.n + " " + esc(tr("pm_days")) + "</span>" : "") + "</div></div>"
      if (gr) h += '<div class="pmc warn">' + ic("timer") + '<div class="pmb"><b>' + esc(tr("pm_grace")) + '</b><span>' + esc(tr("pm_left")) + ' · <em id="pmt" data-u="' + gr + '">' + pmClock(gr - Date.now()) + "</em></span></div></div>"
      return h
    }
    if (tl > 0) return '<div class="pmc on">' + ic("timer") + '<div class="pmb"><b>' + esc(tr("pm_trial_on")) + '</b><span>' + esc(tr("pm_left")) + ' · <em id="pmt" data-u="' + (Date.now() + tl) + '">' + pmClock(tl) + "</em></span></div></div>"
    var u = trUsed(), can = trCan(), dots = ""
    for (i = 0; i < (p.re ? 3 : PM_N); i++) dots += "<i" + (i < p.n ? ' class="on"' : "") + "></i>"
    return '<div class="pmc">' + ic("workspace_premium") + '<div class="pmb"><b>' + esc(tr("st_prem")) + " · " + Math.min(p.n, p.re ? 3 : PM_N) + "/" + (p.re ? 3 : PM_N) + '</b><span>' + esc(tr("pm_goal")) + '</span><div class="pmdots">' + dots + '</div>' +
      '<button class="btn small pmbtn' + (can ? "" : " off") + '" data-act="pmTrial">' + ic("timer") + " " + esc(can ? tr("pm_trial") : tr("pm_nolimit")) + '</button></div></div>'
  }
  function stEmpty() { return { s: 0, h: [], sal: 0, nm: [], no: 0, md: {}, q: 0 } }
  function stDay(k) {
    S.stat = S.stat || {}; k = k || todayStr()
    var d = S.stat[k]; if (!d) d = S.stat[k] = stEmpty()
    if (!d.h) d.h = []; if (!d.nm) d.nm = []; if (!d.md) d.md = {}
    for (var i = 0; i < 24; i++) if (!d.h[i]) d.h[i] = 0
    return d
  }
  function stGet(k) { return (S.stat && S.stat[k]) || stEmpty() }
  function stTrim() { var ks = Object.keys(S.stat || {}).sort(); while (ks.length > 14) delete S.stat[ks.shift()] }
  function stKeys(n) {
    var o = [], d = new Date()
    for (var i = n - 1; i >= 0; i--) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i); o[o.length] = x.getFullYear() + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" + ("0" + x.getDate()).slice(-2) }
    return o
  }
  function stWd(k) {
    var p = k.split("-"), x = new Date(+p[0], +p[1] - 1, +p[2]), loc = S.lang === "uz_kr" ? "uz-Cyrl" : (S.lang === "uz_new" ? "uz" : S.lang)
    try { return x.toLocaleDateString(loc, { weekday: "short" }) } catch (e) { return p[2] }
  }
  function stDur(sec) {
    sec = Math.round(sec); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60)
    if (h) return h + " " + tr("st_h") + " " + m + " " + tr("st_m")
    if (m) return m + " " + tr("st_m")
    return (sec > 0 ? "<1 " : "0 ") + tr("st_m")
  }
  var ST = { last: 0, acc: 0, dev: 0, devT: 0 }
  setInterval(function () {
    pmUi()
    if (document.hidden) { ST.last = 0; return }
    var now = Date.now()
    if (!ST.last) { ST.last = now; return }
    var dt = Math.min(5, (now - ST.last) / 1000); ST.last = now
    var d = stDay(); d.s += dt; d.h[new Date().getHours()] += dt
    ST.acc += dt
    if (ST.acc >= 10) { ST.acc = 0; stTrim(); save(); if (U.tab === "more" && U.more === "stats") stPaint() }
  }, 1000)
  document.addEventListener("visibilitychange", function () { ST.last = 0; if (document.hidden) { try { save() } catch (e) {} } })
  function stBars(vals, labels, hi, fmt, every) {
    var mx = 0, i, h = ""
    for (i = 0; i < vals.length; i++) if (vals[i] > mx) mx = vals[i]
    for (i = 0; i < vals.length; i++) {
      var p = mx ? Math.round(vals[i] / mx * 100) : 0
      h += '<div class="stb' + (i === hi ? " hi" : "") + '"><span class="sv">' + (fmt && vals[i] ? fmt(vals[i], i) : "") + '</span><i style="height:' + Math.max(vals[i] ? 6 : 3, p) + '%"></i><span class="sl">' + ((!every || i % every === 0 || i === vals.length - 1) ? labels[i] : "") + "</span></div>"
    }
    return '<div class="stbars">' + h + "</div>"
  }
  function stLine(vals, labels, hi, only) {
    var W = 300, H = 120, pd = 16, n = vals.length, mx = Math.max.apply(null, vals.concat([1])), pts = [], i
    for (i = 0; i < n; i++) pts[i] = [pd + (W - pd * 2) * (n === 1 ? .5 : i / (n - 1)), H - pd - (H - pd * 2) * vals[i] / mx]
    var line = pts.map(function (p, j) { return (j ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1) }).join(" ")
    var area = line + " L" + pts[n - 1][0].toFixed(1) + " " + (H - pd) + " L" + pts[0][0].toFixed(1) + " " + (H - pd) + " Z"
    var dots = pts.map(function (p, j) { return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (j === hi ? 5 : 3.5) + '"/>' + (vals[j] && (!only || j === hi) ? '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] - 9).toFixed(1) + '" text-anchor="middle">' + fmtNum(vals[j]) + "</text>" : "") }).join("")
    var lb = labels.map(function (l) { return "<span>" + l + "</span>" }).join("")
    return '<svg class="stline" viewBox="0 0 ' + W + " " + H + '"><defs><linearGradient id="stg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".4"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><path d="' + area + '" fill="url(#stg)"/><path d="' + line + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' + dots + '</svg><div class="stll">' + lb + "</div>"
  }
  function stDonut(parts, center, sub) {
    var tot = 0, i, R = 42, C = 2 * Math.PI * R, off = 0, s = ""
    for (i = 0; i < parts.length; i++) tot += parts[i].v
    for (i = 0; i < parts.length; i++) {
      var l = tot ? parts[i].v / tot * C : 0
      if (l > 0) s += '<circle cx="60" cy="60" r="42" fill="none" stroke="' + parts[i].c + '" stroke-width="14" stroke-dasharray="' + l.toFixed(2) + " " + (C - l).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '" transform="rotate(-90 60 60)"/>'
      off += l
    }
    return '<div class="stdn"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="42" fill="none" stroke="rgba(128,128,128,.2)" stroke-width="14"/>' + s + '</svg><div class="stdc"><b>' + center + "</b><span>" + sub + "</span></div></div>"
  }
  function stCard(title, icon, body, lock) {
    return '<div class="card stc' + (lock ? " locked" : "") + '"><div class="stct">' + ic(icon) + "<span>" + esc(title) + '</span></div><div class="stcb">' + body + "</div>" +
      (lock ? '<div class="stlk">' + ic("lock") + "<b>" + esc(tr("st_prem")) + "</b><span>" + esc(tr("st_lock")) + '</span><button class="stmore" data-act="premGo">' + esc(tr("more_d")) + " ›</button></div>" : "") + "</div>"
  }
  function statsHtml() {
    var prem = isPrem(), R = (U.stR === 7 && prem) ? 7 : 1, keys = stKeys(R), wk = stKeys(7), i, j
    var tot = 0, sal = 0, q = 0, nm = {}, hrs = [], md = {}
    for (i = 0; i < 24; i++) hrs[i] = 0
    keys.forEach(function (k) {
      var d = stGet(k); tot += d.s || 0; sal += d.sal || 0; q += d.q || 0
      ;(d.nm || []).forEach(function (n) { nm[n] = 1 })
      for (j = 0; j < 24; j++) hrs[j] += (d.h && d.h[j]) || 0
      for (var m in (d.md || {})) md[m] = (md[m] || 0) + d.md[m]
    })
    var nN = Object.keys(nm).length, seen = Object.keys(S.nseen || {}).length
    var h = pmHtml() + '<div class="stchips"><button data-act="stR" data-v="1"' + (R === 1 ? ' class="on"' : "") + ">" + esc(tr("st_today")) + '</button><button data-act="stR" data-v="7"' + (R === 7 ? ' class="on"' : "") + ">" + (prem ? "" : ic("lock")) + esc(tr("st_7")) + "</button></div>"
    function kp(icon, v, l) { return '<div class="stkp">' + ic(icon) + "<b>" + v + "</b><span>" + esc(l) + "</span></div>" }
    h += '<div class="stk">' + kp("schedule", stDur(tot), tr("st_time")) + kp("favorite", fmtNum(sal), tr("st_sal")) + kp("menu_book", nN, tr("st_names")) + kp("auto_awesome", q, tr("st_quotes")) + "</div>"
    var hv = hrs.map(function (x) { return x / 60 }), hl = []
    for (i = 0; i < 24; i++) hl[i] = i
    h += stCard(tr("st_hours"), "bar_chart", tot > 0 ? stBars(hv, hl, R === 1 ? new Date().getHours() : -1, null, 6) : '<p class="stem">' + esc(tr("st_empty")) + "</p>", false)
    var wl = wk.map(stWd), tv = wk.map(function (k) { return Math.round(stGet(k).s / 60) }), sv = wk.map(function (k) { return stGet(k).sal || 0 }), nv = wk.map(function (k) { return (stGet(k).nm || []).length })
    if (!prem) { tv = wk.map(function () { return 0 }); sv = tv.slice(); nv = tv.slice() }
    h += stCard(tr("st_days"), "schedule", stBars(tv, wl, 6, function (x, i) { return R === 1 && i !== 6 ? "" : x }), !prem)
    h += stCard(tr("st_saldays"), "favorite", stLine(sv, wl, 6, R === 1), !prem)
    h += stCard(tr("st_seen"), "menu_book", '<div class="stdw">' + stDonut([{ v: seen, c: "var(--accent)" }, { v: Math.max(0, 99 - seen), c: "rgba(128,128,128,.25)" }], seen, tr("st_of99")) + "</div>", false)
    h += stCard(tr("st_namesopen"), "menu_book", stBars(nv, wl, 6, function (x, i) { return R === 1 && i !== 6 ? "" : x }), !prem)
    var pal = ["#60a5fa", "#34d399", "#fbbf24", "#f472b6", "#a78bfa", "#fb7185", "#2dd4bf", "#fb923c", "#94a3b8"], parts = [], lg = "", mt = 0, ids = Object.keys(md).sort(function (a, b) { return md[b] - md[a] })
    ids.forEach(function (id, k) {
      var mo = null; for (var z = 0; z < D.moods.length; z++) if (String(D.moods[z].id) === id) mo = D.moods[z]
      var c = pal[Math.min(k, pal.length - 1)]; mt += md[id]
      parts[parts.length] = { v: md[id], c: c }
      lg += '<li><i style="background:' + c + '"></i><span>' + esc(mo ? pick(mo.l) : id) + "</span><b>" + md[id] + "</b></li>"
    })
    h += stCard(tr("st_mood"), "mood", mt ? '<div class="stdw">' + stDonut(parts, mt, "") + '</div><ul class="stlg">' + lg + "</ul>" : '<p class="stem">' + esc(tr("st_empty")) + "</p>", false)
    return h
  }
  function stPaint() { var el = document.getElementById("stbody"); if (el) el.innerHTML = statsHtml() }
  var HL = { raf: 0, tm: 0 }
  function hlStart() {
    cancelAnimationFrame(HL.raf); clearTimeout(HL.tm)
    var body = app.querySelector(".quote .qt"), title = app.querySelector(".quote .qin strong")
    if (!body || !body.firstChild || body.firstChild.nodeType !== 3) return
    HL.tm = setTimeout(function () { hlRun(title, body) }, 900)
  }
  function hlCtx(el) {
    if (!el || !el.isConnected || !el.firstChild || el.firstChild.nodeType !== 3) return null
    var node = el.firstChild, txt = node.data, re = /\S+/g, m, words = [], base = el.getBoundingClientRect(), sid = 0, PADX = 10
    while ((m = re.exec(txt))) {
      var tk = m[0]
      if (/^[\u2014\u2013\-:;|]+$/.test(tk)) { if (words.length) words[words.length - 1].pause = Math.max(words[words.length - 1].pause, 650); sid++; continue }
      if (/^[(\[]/.test(tk) && words.length) { words[words.length - 1].pause = Math.max(words[words.length - 1].pause, 400); sid++ }
      var rg = document.createRange(); rg.setStart(node, m.index); rg.setEnd(node, m.index + tk.length)
      var all = rg.getClientRects(), rs = [], tw = 0, ri
      for (ri = 0; ri < all.length; ri++) if (all[ri].width > 1) { rs[rs.length] = all[ri]; tw += all[ri].width }
      if (!rs.length) continue
      var pz = /[)\]]["\u00bb\u201d']*[.!?\u2026]+$/.test(tk) ? 650 : /[)\]]["\u00bb\u201d']*[,;:]?$/.test(tk) ? 400 : /[.!?\u2026]["\u00bb\u201d')]*$/.test(tk) ? 650 : /[,;:]["\u00bb\u201d')]*$/.test(tk) ? 350 : 0
      var dr = 239 * Math.min(1.8, Math.max(.55, .55 + .09 * tk.length))
      for (ri = 0; ri < rs.length; ri++) {
        var r = rs[ri]
        words[words.length] = { l: r.left - base.left, r: r.right - base.left, t: r.top - base.top, b: r.bottom - base.top, sid: sid, pause: ri === rs.length - 1 ? pz : 0, dur: dr * r.width / tw }
      }
      if (words[words.length - 1].pause) sid++
    }
    if (!words.length) return null
    var pieces = [], lt = -1, ln = -1, last = null, i
    for (i = 0; i < words.length; i++) {
      var w = words[i]
      if (lt < 0 || Math.abs(w.t - lt) > 4) { ln++; lt = w.t }
      if (!last || last.ln !== ln || last.sid !== w.sid) { last = { ln: ln, sid: w.sid, t: w.t, b: w.b, l: w.l, r: w.r, i0: i, i1: i }; pieces[pieces.length] = last }
      last.r = Math.max(last.r, w.r); last.t = Math.min(last.t, w.t); last.b = Math.max(last.b, w.b); last.i1 = i
    }
    function walk(n, a) { var o = [], v = 0; for (var k = 0; k < n; k++) { v = v * .7 + (Math.random() - .5) * a; o[k] = v } return o }
    for (i = 0; i < pieces.length; i++) {
      var P = pieces[i], n = Math.ceil((P.r - P.l) / 5) + 4
      P.p = { tn: walk(n, 1.4), bn: walk(n, 1.4), dy: (Math.random() - .5) * 2, sl: (Math.random() - .5) * 1.2, pt: 2 + Math.random(), pb: 2.5 + Math.random(), a: 2 + Math.random() * 2.5, bb: 1.5 + Math.random() * 2, c: 1.5 + Math.random() * 2.5, d: 1.5 + Math.random() * 2 }
    }
    var cv = document.createElement("canvas"), dpr = Math.min(2, window.devicePixelRatio || 1), CW = base.width + PADX * 2, CH = base.height + PADX * 2
    cv.className = "hlcv"; cv.width = CW * dpr; cv.height = CH * dpr
    cv.style.cssText = "left:" + (-PADX) + "px;top:" + (-PADX) + "px;width:" + CW + "px;height:" + CH + "px"
    el.insertBefore(cv, el.firstChild)
    return { el: el, words: words, pieces: pieces, cv: cv, g: cv.getContext("2d"), dpr: dpr, CW: CW, CH: CH, PADX: PADX, ent: [] }
  }
  function hlSeg(c, P, xr) {
    var g = c.g, X = c.PADX, p = P.p, step = 5, x0 = P.l, k, x
    function yt(x, k) { return X + P.t - p.pt + p.dy + p.sl * (x - P.l) / 100 + p.tn[Math.min(k, p.tn.length - 1)] }
    function yb(x, k) { return X + P.b + p.pb + p.dy + p.sl * (x - P.l) / 100 + p.bn[Math.min(k, p.bn.length - 1)] }
    var kk = []
    g.beginPath()
    g.moveTo(X + x0 - p.bb, yb(x0, 0))
    g.lineTo(X + x0 + p.a, yt(x0, 0))
    for (k = 1, x = x0 + step; x < xr; x += step, k++) { g.lineTo(X + x, yt(x, k)); kk[kk.length] = [x, k] }
    var ke = k
    g.lineTo(X + xr + p.c, yt(xr, ke))
    g.quadraticCurveTo(X + xr + p.c + 1.5, (yt(xr, ke) + yb(xr, ke)) / 2, X + xr - p.d, yb(xr, ke))
    for (var q = kk.length - 1; q >= 0; q--) g.lineTo(X + kk[q][0], yb(kk[q][0], kk[q][1]))
    g.closePath(); g.fill(); g.stroke()
  }
  function hlRun(title, body) {
    var cs = [hlCtx(title), hlCtx(body)], list = [], T = 0, i, j
    for (i = 0; i < cs.length; i++) {
      var c = cs[i]; if (!c) continue
      for (j = 0; j < c.words.length; j++) { var w = c.words[j]; c.ent[j] = { s: T, e: T + w.dur }; T += w.dur + w.pause }
      list[list.length] = c
      if (i === 0) T += 800
    }
    if (!list.length) return
    var END = T, t0 = 0
    function frame(ts) {
      if (!list[0].el.isConnected) return
      if (!t0) t0 = ts
      var now = ts - t0
      for (var a = 0; a < list.length; a++) {
        var c = list[a], g = c.g, k = -1, f = 0
        for (var e = 0; e < c.ent.length; e++) if (now >= c.ent[e].s) { k = e; f = Math.min(1, (now - c.ent[e].s) / (c.ent[e].e - c.ent[e].s)) } else break
        g.setTransform(c.dpr, 0, 0, c.dpr, 0, 0); g.clearRect(0, 0, c.CW, c.CH)
        var hci = isPrem() ? (S.hlc | 0) : 0, hc = HLC[hci] || HLC[0], dkm = effTheme() === "dark", wh = hci === 4
        var qbm = isPrem() && (S.qbg | 0) > 0
        g.fillStyle = "rgba(" + hc[0] + "," + hc[1] + "," + hc[2] + "," + (qbm ? (wh ? .24 : hci === 1 ? .5 : hc[3]) : wh ? (dkm ? .34 : .9) : hc[3]) + ")"
        g.strokeStyle = wh ? (dkm ? "rgba(255,255,255,.4)" : "rgba(0,0,0,.22)") : "rgba(" + (hc[0] * .75 | 0) + "," + (hc[1] * .75 | 0) + "," + (hc[2] * .75 | 0) + ",.4)"
        g.lineWidth = 1; g.lineJoin = "round"
        for (var b = 0; b < c.pieces.length; b++) {
          var P = c.pieces[b], xr
          if (k < P.i0) continue
          if (k > P.i1 || (k === P.i1 && f >= 1)) xr = P.r
          else { var wd = c.words[k]; xr = wd.l + (wd.r - wd.l) * f }
          if (xr - P.l < 3) continue
          hlSeg(c, P, xr)
        }
      }
      if (now < END) HL.raf = requestAnimationFrame(frame)
    }
    HL.raf = requestAnimationFrame(frame)
  }
  function vkNow() { return [U.tab, U.more, U.detail, U.waq ? 1 : 0, U.wg ? 1 : 0, U.ach ? 1 : 0, U.mn ? (MN.m < 0 ? 1 : 2 + MN.n) : 0, U.mm ? (MM.g ? (MM.g.fin ? 3 : 2) : 1) : 0, U.jr || 0, U.moodPick].join("|") }
  function render() {
    var k0 = vkNow(), dp = vDepth(), ti = navIdx()
    if (U.vkey && k0 !== U.vkey && !TR.busy && !TR.skip && U.vti != null) {
      var tabCh = ti !== U.vti, dir = tabCh ? (ti > U.vti ? 1 : -1) : (dp > U.vdp ? 1 : dp < U.vdp ? -1 : 0)
      pageTrans(dir, tabCh, renderNow)
    } else renderNow()
    U.vdp = dp; U.vti = ti
  }
  function renderNow() {
    document.documentElement.lang = S.lang.slice(0, 2)
    document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr"
    var h, sy = window.pageYOffset || 0, vkey = [U.tab, U.more, U.detail, U.waq ? 1 : 0, U.wg ? 1 : 0, U.ach ? 1 : 0, U.mn ? (MN.m < 0 ? 1 : 2 + MN.n) : 0, U.mm ? (MM.g ? (MM.g.fin ? 3 : 2) : 1) : 0, U.jr || 0, U.moodPick].join("|"), same = vkey === U.vkey
    U.vkey = vkey
    try {
      if (!U.detail) U.dlock = false
      if (U.detail) h = viewDetail()
      else if (U.waq) h = viewWaq()
      else if (U.wg) h = viewWg()
      else if (U.mm) h = viewMm()
      else if (U.ach) h = viewAch()
      else if (U.mn) h = viewMn()
      else if (U.jr) h = viewJr()
      else if (U.tab === "names") h = viewNames()
      else if (U.tab === "media") h = viewMedia()
      else if (U.tab === "mood") h = viewMood()
      else if (U.tab === "daily") h = viewDaily()
      else h = viewMore()
    } catch (err) {
      h = '<div class="card"><strong>⚠️ Error</strong><p>' + esc(String(err && err.message || err)) + "</p></div>"
    }
    app.innerHTML = h
    jrDwell()
    if (U.detail && U.detail !== U.lastDet) { var sdn = stDay(); sdn.no++; if (sdn.nm.indexOf(U.detail) < 0) sdn.nm.push(U.detail); S.nseen = S.nseen || {}; S.nseen[U.detail] = 1; save() }
    U.lastDet = U.detail
    if (U.tab === "more" && U.more === "quote") { if (U.quoteIdx !== U.lastQ) { stDay().q++; U.lastQ = U.quoteIdx; save() } } else U.lastQ = -1
    document.body.classList.toggle("indetail", !!U.detail)
    initDigits()
    if (document.getElementById("digits")) {
      if (!U.gsSeen) { U.gsSeen = true; if (U.goalSpin || !hasGoal()) setTimeout(goalSpin, 200) }
      U.goalSpin = false
    } else U.gsSeen = false
    initHours()
    hgAttach()
    meanFit()
    if (!window.__uiOnce) { window.__uiOnce = 1
    document.addEventListener("scroll", function (ev) { var t = ev.target; if (t && t.classList && t.classList.contains("sstrip")) { sWrap(t); return }
      if (t && t.classList && t.classList.contains("wqpg")) { var i = Math.round(t.scrollLeft / Math.max(1, t.clientWidth)), bs = document.querySelectorAll(".wqtab"); for (var k = 0; k < bs.length; k++) bs[k].classList.toggle("on", k === i) } }, true)
    setInterval(function () {
      var c = document.getElementById("pmxc"); if (!c) { if (S.pmx && S.pmx.until <= Date.now()) { pmxLive(); applyGender(); render() } return }
      var x = pmxLive(); if (!x) { applyGender(); render(); return }
      var m = Math.max(0, Math.ceil((x.until - Date.now()) / 1000)); c.textContent = ("0" + Math.floor(m / 60)).slice(-2) + ":" + ("0" + (m % 60)).slice(-2)
    }, 1000)
    }
    hpStart(); phStart(); nhStart(); tbInit(); mediaInit(); themeInit(); hswInit(); mdInit(); hlStart()
    nsUpdate()
    fxLayout()
    miniSync()
    if (U.tab === "more" && U.more === "settings") gText()
    if (U.tab === "more" && U.more === "mode") startGlobe()
    if (U.tab === "more" && U.more === "lang") startLangGlobe()
    hStart()
    renderNav()
    if (wheels.theme) updateThemeLabels()
    if (tg && tg.BackButton) {
      if (U.detail || U.waq || U.wg || U.mm || U.ach || U.mn || U.jr || U.tab !== "names") tg.BackButton.show()
      else tg.BackButton.hide()
    }
    window.scrollTo(0, same ? sy : 0)
  }
  function goBack() {
    if (U.detail) { U.detail = 0; render(); window.scrollTo(0, 0); return }
    if (U.jrRet) { U.jrRet = false; U.tab = U.jrTab || "names"; U.jr = "main"; U.dailyMenu = false; render(); window.scrollTo(0, 0); return }
    if (U.mn) { if (MN.m >= 0) MN.m = -1; else U.mn = false; render(); window.scrollTo(0, 0); return }
    if (U.ach) { U.ach = false; render(); window.scrollTo(0, 0); return }
    if (U.mm) { if (MM.g) MM.g = null; else U.mm = false; render(); window.scrollTo(0, 0); return }
    if (U.wg) { U.wg = false; U.wgOne = false; WG.L = null; render(); window.scrollTo(0, 0); return }
    if (U.waq) { U.waq = false; render(); window.scrollTo(0, 0); return }
    if (U.jr) { U.jr = U.jr !== "main" ? "main" : ""; render(); window.scrollTo(0, 0); return }
    if (U.detail) { U.detail = 0; render(); window.scrollTo(0, 0); return }
    if (U.tab === "more" && U.more === "help" && U.hcUid) { U.hcUid = 0; HCH.msgs = []; render(); window.scrollTo(0, 0); return }
    if (U.tab === "more" && U.more !== "menu") {
      if (U.hikBack) { U.hikBack = false; U.tab = "names" }
      U.more = U.more === "bcnew" ? "notif" : (U.more === "lang" || U.more === "theme" || U.more === "mode" || U.more === "remind" || U.more === "robot" || U.more === "premium") ? "settings" : "menu"; render(); window.scrollTo(0, 0); return
    }
    if (U.tab === "mood" && U.moodPick) { U.moodPick = ""; render(); window.scrollTo(0, 0); return }
    if (U.tab !== "names") { U.tab = "names"; U.more = "menu"; U.moodPick = ""; U.hikBack = false; render(); window.scrollTo(0, 0); requestAnimationFrame(function () { window.scrollTo(0, 0) }) }
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
  function cname(c) { var a = (CNAMES[c[0]] || c[0]).split("|"), i = TXI.indexOf(S.lang); if (S.lang === "uz_new") return UZN(a[0] || c[0]); return a[i < 0 ? 3 : i] || a[3] || c[0] }
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
    var bb = S.gender === "female" ? S.fbg : S.gender === "male" ? S.mbg : ""
    if (bb && bb.indexOf("mosque") === 0) return "dark"
    if (S.theme !== "auto") return S.theme
    var t = cityHour(cityByName(S.tz))
    return (t.h >= 20 || t.h < 8) ? "dark" : "light"
  }
  var curEff = ""
  function gText() {
    var c = cityByName(S.tz), t = cityHour(c), n = (t.h >= 20 || t.h < 8)
    var el = document.getElementById("gtxt"), tp = document.getElementById("tzpill")
    var gh = ic(n ? "dark_mode" : "light_mode") + " <b>" + esc(c ? cname(c) : tr("tz_dev")) + "</b> · " + ("0" + t.h).slice(-2) + ":" + ("0" + t.m).slice(-2)
    if (el) el.innerHTML = gh
    if (tp) tp.innerHTML = gh
  }
  // ====================
  // TIL GLOBUSI
  // ====================
  var CTY = [
    { k: "UZ", lo: 69.3, la: 41.3, f: "🇺🇿", c: "#1d9bf0", L: ["uz", "uz_kr", "uz_new"] },
    { k: "RU", lo: 37.6, la: 55.8, f: "🇷🇺", c: "#e5484d", L: ["ru"] },
    { k: "GB", lo: -0.1, la: 51.5, f: "🇬🇧", c: "#6e56cf", L: ["en"] },
    { k: "SA", lo: 39.8, la: 21.4, f: "🇸🇦", c: "#12a594", L: ["ar"] },
    { k: "TR", lo: 32.9, la: 39.9, f: "🇹🇷", c: "#e54666", L: ["tr"] },
    { k: "ID", lo: 106.8, la: -6.2, f: "🇮🇩", c: "#f76b15", L: ["id"] },
    { k: "CN", lo: 116.4, la: 39.9, f: "🇨🇳", c: "#d6409f", L: ["zh"] },
    { k: "IN", lo: 77.2, la: 28.6, f: "🇮🇳", c: "#30a46c", L: ["hi"] },
    { k: "ES", lo: -3.7, la: 40.4, f: "🇪🇸", c: "#ab6400", L: ["es"] },
    { k: "PK", lo: 73.1, la: 33.7, f: "🇵🇰", c: "#0b7a5a", L: ["ur"] },
    { k: "BD", lo: 90.4, la: 23.8, f: "🇧🇩", c: "#2f9e44", L: ["bn"] },
    { k: "IR", lo: 51.4, la: 35.7, f: "🇮🇷", c: "#5b5bd6", L: ["fa"] },
    { k: "FR", lo: 2.35, la: 48.9, f: "🇫🇷", c: "#3e63dd", L: ["fr"] },
    { k: "BR", lo: -47.9, la: -15.8, f: "🇧🇷", c: "#c2910a", L: ["pt"] },
    { k: "TJ", lo: 68.8, la: 38.6, f: "🇹🇯", c: "#c93a3a", L: ["tg"] }
  ]
  var CITY_CC = { "Moskva": "RU", "Seul": "KR", "London": "GB", "Toshkent": "UZ", "Makka": "SA", "Istanbul": "TR", "Dubay": "AE", "Nyu-York": "US", "Tokio": "JP", "Pekin": "CN", "Dehli": "IN", "Jakarta": "ID", "Sidney": "AU", "Qohira": "EG", "Lagos": "NG", "Nayrobi": "KE", "Madrid": "ES", "Parij": "FR", "Tehron": "IR", "Karachi": "PK", "Dakka": "BD", "Bangkok": "TH", "Almati": "KZ", "Los-Anjeles": "US", "Mexiko": "MX", "San-Paulu": "BR" }
  var CPAL = ["#e5484d", "#f76b15", "#c99a06", "#30a46c", "#12a594", "#1d9bf0", "#6e56cf", "#d6409f"]
  function gdist(a, b) {
    var p = Math.PI / 180, d = Math.sin((b[1] - a[1]) * p / 2) ** 2 + Math.cos(a[1] * p) * Math.cos(b[1] * p) * Math.sin((b[0] - a[0]) * p / 2) ** 2
    return 12742 * Math.asin(Math.min(1, Math.sqrt(d)))
  }
  function spread(items) {
    var n = items.length, near = [], out = {}, i, j, p, q
    for (i = 0; i < n; i++) {
      near[i] = []
      for (j = 0; j < n; j++) {
        if (i === j) continue
        var md = 1e9
        for (p = 0; p < items[i].pts.length; p++) for (q = 0; q < items[j].pts.length; q++) md = Math.min(md, gdist(items[i].pts[p], items[j].pts[q]))
        if (md < 4200) near[i][near[i].length] = [j, (4200 - md) / 4200]
      }
    }
    var ord = items.map(function (x, k) { return k }).sort(function (x, y) { return near[y].length - near[x].length || x - y }), col = []
    for (var oi = 0; oi < n; oi++) {
      i = ord[oi]
      var best = 0, bs = 1e9
      for (var c = 0; c < CPAL.length; c++) {
        var sc = 0
        for (var k = 0; k < near[i].length; k++) {
          var cj = col[near[i][k][0]]
          if (cj === undefined) continue
          var dd = Math.min(Math.abs(cj - c), CPAL.length - Math.abs(cj - c))
          sc += near[i][k][1] * (dd === 0 ? 10 : dd === 1 ? 1 : 0)
        }
        sc += c * 1e-4
        if (sc < bs) { bs = sc; best = c }
      }
      col[i] = best; out[items[i].id] = CPAL[best]
    }
    return out
  }
  var CTY_COL = spread(CTY.map(function (x) { return { id: x.k, pts: [[x.lo, x.la]] } }))
  for (var ci0 = 0; ci0 < CTY.length; ci0++) CTY[ci0].c = CTY_COL[CTY[ci0].k]
  var CC_COL = (function () {
    var m = {}, o = []
    for (var i = 0; i < CITIES.length; i++) { var k = CITY_CC[CITIES[i][0]] || CITIES[i][0]; (m[k] = m[k] || []).push([CITIES[i][1], CITIES[i][2]]) }
    for (var k2 in m) o[o.length] = { id: k2, pts: m[k2] }
    return spread(o)
  })()
  var CELL = null
  function pip(r, x, y) {
    var ins = false
    for (var i = 0, j = r.length - 2; i < r.length; j = i, i += 2) {
      var xi = r[i], yi = r[i + 1], xj = r[j], yj = r[j + 1]
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins
    }
    return ins
  }
  function cellInfo() {
    if (CELL || !window.CB) return CELL
    var cid = {}, brd = {}, i, k, n
    for (i = 0; i < 16200; i++) {
      if (!(parseInt(GMASK.charAt(i >> 2), 16) & (8 >> (i & 3)))) continue
      var lo = -180 + (i % 180 + 0.5) * 2, la = 90 - (Math.floor(i / 180) + 0.5) * 2
      for (k in window.CB) {
        var rs = window.CB[k], hit = false
        for (n = 0; n < rs.length && !hit; n++) hit = pip(rs[n], lo, la)
        if (hit) { cid[i] = k; break }
      }
    }
    var have = {}
    for (var hk in cid) have[cid[hk]] = 1
    for (k in window.CB) {
      if (have[k]) continue
      var sx = 0, sy = 0, cnt = 0, rr = window.CB[k][0]
      for (n = 0; n < rr.length; n += 2) { sx += rr[n]; sy += rr[n + 1]; cnt++ }
      sx /= cnt; sy /= cnt
      var bi = -1, bd = 1e9
      for (i = 0; i < 16200; i++) {
        if (cid[i] || !(parseInt(GMASK.charAt(i >> 2), 16) & (8 >> (i & 3)))) continue
        var d2 = Math.pow(-180 + (i % 180 + 0.5) * 2 - sx, 2) + Math.pow(90 - (Math.floor(i / 180) + 0.5) * 2 - sy, 2)
        if (d2 < bd) { bd = d2; bi = i }
      }
      if (bi >= 0 && bd < 36) { cid[bi] = k; brd[bi] = 1 }
    }
    for (var key in cid) {
      i = +key
      var cx = i % 180, cy = Math.floor(i / 180), b = false
      for (var dy = -1; dy <= 1 && !b; dy++) for (var dx = -1; dx <= 1; dx++) {
        if ((!dx && !dy) || (dx && dy)) continue
        var yy = cy + dy
        if (yy < 0 || yy > 89) continue
        if (cid[yy * 180 + (cx + dx + 180) % 180] !== cid[i]) { b = true; break }
      }
      if (b) brd[i] = 1
    }
    return (CELL = { cid: cid, brd: brd })
  }
  function landDot(g, q, idx, cm, sc, fg) {
    var C = cellInfo(), cc = C && C.cid[idx], col = cc && cm[cc]
    if (!col || !(cc === sc || C.brd[idx])) return false
    g.fillStyle = cc === sc ? fg : col
    g.globalAlpha = cc === sc ? 0.8 + 0.2 * q[2] : 0.55 + 0.45 * q[2]
    var r = cc === sc ? 1.5 + 1.2 * q[2] : 1.1 + 1.1 * q[2]
    g.beginPath(); g.arc(q[0], q[1], r * 0.62, 0, 6.2832); g.fill()
    return true
  }
  var CBD = {}
  function bdots(cc) {
    if (CBD[cc]) return CBD[cc]
    var rs = window.CB && window.CB[cc], o = []
    if (!rs) return (CBD[cc] = o)
    for (var i = 0; i < rs.length; i++) {
      var r = rs[i], rem = 0
      for (var j = 0; j + 3 < r.length; j += 2) {
        var x0 = r[j], y0 = r[j + 1], dx = r[j + 2] - x0, dy = r[j + 3] - y0, L = Math.sqrt(dx * dx + dy * dy), t = rem
        while (t < L) { o[o.length] = [x0 + dx * t / L, y0 + dy * t / L]; t += 2.6 }
        rem = t - L
      }
    }
    return (CBD[cc] = o)
  }
  function drawBorders(g, pr, cc, col, al, lw) {
    var d = bdots(cc)
    if (!d.length) return
    g.fillStyle = col
    for (var i = 0; i < d.length; i++) {
      var q = pr(d[i][0], d[i][1])
      if (q[2] <= 0.02) continue
      g.globalAlpha = al * (0.45 + 0.55 * q[2])
      var r = lw * (0.55 + 0.45 * q[2])
      g.beginPath(); g.arc(q[0], q[1], r, 0, 6.2832); g.fill()
    }
    g.globalAlpha = 1
  }
  function ctys() {
    var o = []
    for (var i = 0; i < CTY.length; i++) {
      var L = []
      for (var j = 0; j < CTY[i].L.length; j++) if (LANGS.indexOf(CTY[i].L[j]) >= 0) L[L.length] = CTY[i].L[j]
      if (L.length) o[o.length] = { k: CTY[i].k, lo: CTY[i].lo, la: CTY[i].la, f: CTY[i].f, c: CTY[i].c, L: L }
    }
    return o
  }
  function ctyOf(code) { var a = ctys(); for (var i = 0; i < a.length; i++) if (a[i].L.indexOf(code) >= 0) return a[i].k; return "GB" }
  function ctyGet(k) { var a = ctys(); for (var i = 0; i < a.length; i++) if (a[i].k === k) return a[i]; return a[0] }
  function lchip(code, c, on) {
    var cc = ctyGet(ctyOf(code))
    return '<button class="lchip' + (on ? " col" : "") + '" style="--c:' + c + '" data-act="setLang" data-v="' + code + '"><span class="fl">' + cc.f + "</span>" + esc(LANG_NAMES[code]) + "</button>"
  }
  function lvarHtml() {
    if (!U.lcty) return ""
    var c = ctyGet(U.lcty), h = ""
    for (var i = 0; i < c.L.length; i++) h += lchip(c.L[i], c.c, c.L[i] === S.lang)
    return h
  }
  function lallHtml() {
    var h = "", a = ctys()
    for (var i = 0; i < LANGS.length; i++) { var c = ctyGet(ctyOf(LANGS[i])); h += lchip(LANGS[i], c.c, LANGS[i] === S.lang) }
    return h
  }
  function langPick(k) {
    U.lcty = U.lcty === k ? "" : k
    var a = document.getElementById("lvar"); if (a) a.innerHTML = lvarHtml()
  }
  function startLangGlobe() {
    var cv = document.getElementById("lgl")
    if (!cv || !cv.getContext) return
    var W = cv.clientWidth || 340, H = cv.clientHeight || 230, dpr = Math.min(2, window.devicePixelRatio || 1)
    cv.width = W * dpr; cv.height = H * dpr
    var g = cv.getContext("2d"), CX = W / 2, CY = H / 2, R = Math.min(H / 2 - 8, W * 0.26), cs = ctys()
    var cur = ctyGet(U.lcty || ctyOf(S.lang))
    var lon0 = cur.lo, tilt = 0.38, drag = false, sx = 0, sl = 0, moved = 0, last = 0, ph = 0, hits = []
    var land = []
    for (var i = 0; i < 16200; i++) if (parseInt(GMASK.charAt(i >> 2), 16) & (8 >> (i & 3))) land[land.length] = [-180 + (i % 180 + 0.5) * 2, 90 - (Math.floor(i / 180) + 0.5) * 2, i]
    var fg = getComputedStyle(cv).color
    function pr(lo, la) {
      var l = (lo - lon0) * Math.PI / 180, p = la * Math.PI / 180
      var x = Math.cos(p) * Math.sin(l), y = Math.cos(tilt) * Math.sin(p) - Math.sin(tilt) * Math.cos(p) * Math.cos(l), z = Math.sin(tilt) * Math.sin(p) + Math.cos(tilt) * Math.cos(p) * Math.cos(l)
      return [CX + x * R, CY - y * R, z]
    }
    function draw(ts) {
      if (document.getElementById("lgl") !== cv) return
      requestAnimationFrame(draw)
      if (document.hidden || ts - last < 33) return
      var dt = last ? (ts - last) / 1000 : 0
      last = ts; ph += dt
      if (!drag) lon0 += 4 * dt
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H); hits = []
      var grd = g.createRadialGradient(CX - R * .2, CY - R * .24, R * .1, CX, CY, R)
      grd.addColorStop(0, "rgba(120,160,150,.16)"); grd.addColorStop(1, "rgba(120,160,150,.04)")
      g.fillStyle = grd; g.beginPath(); g.arc(CX, CY, R, 0, 6.2832); g.fill()
      g.strokeStyle = "rgba(128,150,145,.35)"; g.lineWidth = 1; g.stroke()
      var cmL = {}, scL = U.lcty || ctyOf(S.lang), fgS = fg
      for (var bm = 0; bm < cs.length; bm++) cmL[cs[bm].k] = cs[bm].c
      g.fillStyle = fg
      for (var k = 0; k < land.length; k++) {
        var q = pr(land[k][0], land[k][1])
        if (q[2] <= 0.02) continue
        if (landDot(g, q, land[k][2], cmL, scL, fgS)) { g.fillStyle = fg; continue }
        g.globalAlpha = 0.18 + 0.5 * q[2]
        var r = 1 + 1 * q[2]
        g.fillRect(q[0] - r / 2, q[1] - r / 2, r, r)
      }
      g.globalAlpha = 1
      var fs = 10.5, bh = fs + 8, vis = []
      g.font = "700 " + fs + "px system-ui, sans-serif"; g.textBaseline = "middle"; g.textAlign = "center"
      for (var m = 0; m < cs.length; m++) {
        var p2 = pr(cs[m].lo, cs[m].la)
        if (p2[2] > 0.08) vis[vis.length] = { c: cs[m], x: p2[0], y: p2[1], z: p2[2], nm: LANG_NAMES[cs[m].L[0]], d: p2[0] >= CX ? 1 : -1 }
      }
      vis.sort(function (a, b) { return a.x - b.x })
      for (var vi = 0; vi < vis.length; vi++) vis[vi].d = vi < Math.floor(vis.length / 2) ? -1 : 1
      for (var sd = -1; sd <= 1; sd += 2) {
        var col = vis.filter(function (v) { return v.d === sd }).sort(function (a, b) { return a.y - b.y })
        var lim = bh / 2 + 2, ly = []
        for (var a = 0; a < col.length; a++) ly[a] = Math.max(col[a].y, a ? ly[a - 1] + bh + 3 : lim)
        for (a = col.length - 1; a >= 0; a--) { var mx = a < col.length - 1 ? ly[a + 1] - bh - 3 : H - lim; if (ly[a] > mx) ly[a] = mx }
        for (a = 0; a < col.length; a++) {
          var v = col[a], tw = g.measureText(v.nm).width + 12, ax = sd > 0 ? Math.max(CX + R + 6, v.x + 4) : Math.min(CX - R - 6, v.x - 4)
          var bx = sd > 0 ? ax : ax - tw, ty = ly[a], on = v.c.k === (U.lcty || ""), pu = 0.5 + 0.5 * Math.sin(ph * 2.2 + a + sd)
          var al = 0.35 + 0.65 * Math.min(1, v.z * 1.6), dy = ty - v.y, ex = v.x + sd * Math.abs(dy)
          if (sd > 0 ? ex > ax : ex < ax) ex = ax
          g.globalAlpha = al; g.strokeStyle = v.c.c; g.lineWidth = 1.3
          g.beginPath(); g.moveTo(v.x, v.y); g.lineTo(ex, ty); g.lineTo(ax, ty); g.stroke()
          g.fillStyle = v.c.c
          g.globalAlpha = al
          g.beginPath(); if (g.roundRect) g.roundRect(bx, ty - bh / 2, tw, bh, 7); else g.rect(bx, ty - bh / 2, tw, bh); g.fill()
          if (on) { g.strokeStyle = "#fff"; g.lineWidth = 2; g.stroke() }
          g.fillStyle = "#fff"; g.fillText(v.nm, bx + tw / 2, ty + 0.5)
          g.globalAlpha = 1
          hits[hits.length] = { k: v.c.k, x: v.x, y: v.y, r: [bx, ty - bh / 2, tw, bh] }
        }
      }
      g.textAlign = "start"; g.textBaseline = "alphabetic"
    }
    requestAnimationFrame(draw)
    cv.addEventListener("pointerdown", function (e) { drag = true; moved = 0; sx = e.clientX; sl = lon0 })
    cv.addEventListener("pointermove", function (e) { if (!drag) return; moved = Math.max(moved, Math.abs(e.clientX - sx)); lon0 = sl - (e.clientX - sx) * 0.5 })
    cv.addEventListener("pointercancel", function () { drag = false })
    cv.addEventListener("pointerup", function (e) {
      var was = drag; drag = false
      if (!was || moved > 6) return
      var rc = cv.getBoundingClientRect(), x = (e.clientX - rc.left) * (W / rc.width), y = (e.clientY - rc.top) * (H / rc.height), best = null, bd = 1e9
      for (var m = hits.length - 1; m >= 0; m--) {
        var h = hits[m], r = h.r
        if (x >= r[0] - 4 && x <= r[0] + r[2] + 4 && y >= r[1] - 4 && y <= r[1] + r[3] + 4) { best = h; break }
        var d = (h.x - x) * (h.x - x) + (h.y - y) * (h.y - y)
        if (d < 22 * 22 && d < bd) { bd = d; best = h }
      }
      if (best) { haptic("light"); langPick(best.k) }
    })
  }
  // ====================
  // YANGI FOYDALANUVCHI: BOSHLANG'ICH EKRAN (til -> shahar -> mavzu)
  // ====================
  function obDots() {
    return '<div class="obbar"><i style="width:' + (U.ob * 100 / 3).toFixed(1) + '%"></i></div>'
  }
  function obBtn(last, on) {
    return '<button id="obn" class="btn block obnext' + (on ? " success" : "") + (!on && U.ob === 2 ? " dim" : "") + '" data-act="' + (!on && U.ob === 2 ? "obNone" : "obNext") + '" aria-label="next">' + ic(last ? "check" : "chevron_right") + "</button>"
  }
  function obChip() {
    var cs = document.querySelectorAll(".mqc")
    for (var i = 0; i < cs.length; i++) { if (cs[i].getAttribute("data-v") === S.tz) cs[i].classList.add("success"); else cs[i].classList.remove("success") }
  }
  function obSync() {
    var b = document.getElementById("obn"); if (b && U.ob === 2) { if (S.tz) { b.classList.add("success"); b.classList.remove("dim"); b.setAttribute("data-act", "obNext") } else { b.classList.remove("success"); b.classList.add("dim"); b.setAttribute("data-act", "obNone") } }
    var t = document.getElementById("obtz"); if (t) { if (S.tz) t.classList.remove("success"); else t.classList.add("success") }
  }
  function obRender() {
    var host = document.getElementById("onb"); if (!host) return
    document.documentElement.lang = S.lang.slice(0, 2)
    document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr"
    var h = obDots()
    if (U.ob === 1) {
      var codes = ["uz", "uz_kr", "uz_new"], rest = [], i
      for (i = 0; i < LANGS.length; i++) if (codes.indexOf(LANGS[i]) < 0) rest[rest.length] = LANGS[i]
      function lb(c) { return '<button class="btn' + (S.langSet !== false && S.lang === c ? " success" : "") + '" data-act="obLang" data-v="' + c + '">' + esc(LANG_NAMES[c]) + "</button>" }
      h += '<div class="obbody mid"><div class="obh big">' + ic("translate") + " <span>" + esc(tr("lang")) + '</span></div><p class="obsoft">' + esc(tr("ob_lang")).replace("{l}", "\u0001").replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/, "<b>$1</b>").replace("\u0001", esc(LANG_NAMES[S.lang] || "")) + '</p><div class="obg"><div class="r3">'
      for (i = 0; i < codes.length; i++) h += lb(codes[i])
      h += "</div>"
      for (i = 0; i < rest.length; i++) h += lb(rest[i])
      h += "</div></div>" + obBtn(false, S.langSet !== false)
    } else if (U.ob === 2) {
      var mq = "", rows = [[], [], []], ci
      for (ci = 0; ci < CITIES.length; ci++) rows[ci % 3][rows[ci % 3].length] = CITIES[ci]
      for (var rr = 0; rr < 3; rr++) {
        var chips = ""
        for (var cj = 0; cj < rows[rr].length; cj++) chips += '<button class="mqc' + (S.tz === rows[rr][cj][0] ? " success" : "") + '" data-act="obCity" data-v="' + rows[rr][cj][0] + '">' + esc(cname(rows[rr][cj])) + "</button>"
        mq += '<div class="mqrow"><div class="mqin" style="--d:' + (52 + rr * 9) + 's">' + chips + chips + chips + chips + "</div></div>"
      }
      h += '<div class="obbody mid"><p class="obtxt c">' + esc(tr("tz_hint")) + '</p><div class="globe"><canvas id="gl"></canvas><div id="gtxt" class="gtxt"></div></div><div class="obor"><i></i><span>' + esc(tr("ob_or")) + '</span><i></i></div><button id="obtz" class="btn small' + (S.tz ? "" : " success") + '" data-act="obTz" style="align-self:center">' + esc(tr("tz_dev")) + "</button></div>" +
        '<div class="obmq">' + mq + '</div><button class="btn block obskip" data-act="obSkip">' + esc(tr("ob_skip")) + " " + ic("chevron_right") + "</button>" + obBtn(false, !!S.tz)
    } else {
      h += '<div class="obh">' + ic("palette") + " <span>" + esc(tr("theme_t")) + '</span></div><div class="obbody"><div id="vwTheme" class="vw"><div class="vw-track"></div></div><div id="themeOpts" class="topts">' + themeOpts() + '</div><p class="ginfo">' + ic("info") + " <span>" + esc(tr("gender_info")) + "</span></p></div>" + obBtn(true, true)
    }
    host.innerHTML = h
    if (U.ob === 2) startGlobe()
    if (U.ob === 3) themeInit()
  }
  function obNext() {
    if (U.ob === 1) { S.langSet = true; save(); U.ob = 2; obRender(); return }
    if (U.ob === 2) { U.ob = 3; obRender(); return }
    S.ob = 0; S.langSet = true; save()
    U.ob = 0
    document.body.classList.remove("onb")
    var host = document.getElementById("onb"); if (host && host.parentNode) host.parentNode.removeChild(host)
    TCACHE = {}; applyTheme(); render()
    if (wheels.lang) wheels.lang.set(Math.max(0, LANGS.indexOf(S.lang)), false)
  }
  function obStart() {
    if (!document.getElementById("onb")) { var d = document.createElement("div"); d.id = "onb"; document.body.appendChild(d) }
    document.body.classList.add("onb")
    U.ob = 1; obRender()
  }

  var GGO = null
  function startGlobe() {
    var cv = document.getElementById("gl")
    if (!cv || !cv.getContext) return
    var W = cv.clientWidth || 340, H = cv.clientHeight || 230, dpr = Math.min(2, window.devicePixelRatio || 1)
    cv.width = W * dpr; cv.height = H * dpr
    var g = cv.getContext("2d"), CX = W / 2, CY = H / 2, R = Math.min(H / 2 - 8, W * 0.26)
    var sel0 = cityByName(S.tz)
    var lon0 = sel0 ? sel0[1] : -new Date().getTimezoneOffset() / 4, tilt = 0.38, drag = false, sx = 0, sl = 0, moved = 0, last = 0, ph = 0, goal = null, hits = []
    GGO = function (lo) { goal = lo }
    var land = []
    for (var i = 0; i < 16200; i++) if (parseInt(GMASK.charAt(i >> 2), 16) & (8 >> (i & 3))) land[land.length] = [-180 + (i % 180 + 0.5) * 2, 90 - (Math.floor(i / 180) + 0.5) * 2, i]
    var fg = getComputedStyle(cv).color
    function pr(lo, la) {
      var l = (lo - lon0) * Math.PI / 180, p = la * Math.PI / 180
      var x = Math.cos(p) * Math.sin(l), y = Math.cos(tilt) * Math.sin(p) - Math.sin(tilt) * Math.cos(p) * Math.cos(l), z = Math.sin(tilt) * Math.sin(p) + Math.cos(tilt) * Math.cos(p) * Math.cos(l)
      return [CX + x * R, CY - y * R, z]
    }
    function draw(ts) {
      if (document.getElementById("gl") !== cv) return
      requestAnimationFrame(draw)
      if (document.hidden || ts - last < 33) return
      var dt = last ? (ts - last) / 1000 : 0
      last = ts; ph += dt
      if (goal !== null && !drag) {
        var df = ((goal - lon0 + 540) % 360) - 180
        if (Math.abs(df) < 0.3) { lon0 = goal; goal = null } else lon0 += df * Math.min(1, dt * 4)
      } else if (!drag) lon0 += 5 * dt
      var sel = cityByName(S.tz)
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H); hits = []
      var grd = g.createRadialGradient(CX - R * .2, CY - R * .24, R * .1, CX, CY, R)
      grd.addColorStop(0, "rgba(120,160,150,.16)"); grd.addColorStop(1, "rgba(120,160,150,.04)")
      g.fillStyle = grd; g.beginPath(); g.arc(CX, CY, R, 0, 6.2832); g.fill()
      g.strokeStyle = "rgba(128,150,145,.35)"; g.lineWidth = 1; g.stroke()
      var cmT = {}, scT = sel && CITY_CC[sel[0]], fgS = fg
      for (var bm = 0; bm < CITIES.length; bm++) if (CITY_CC[CITIES[bm][0]]) cmT[CITY_CC[CITIES[bm][0]]] = CC_COL[CITY_CC[CITIES[bm][0]]]
      g.fillStyle = fg
      for (var k = 0; k < land.length; k++) {
        var q = pr(land[k][0], land[k][1])
        if (q[2] <= 0.02) continue
        if (landDot(g, q, land[k][2], cmT, scT, fgS)) { g.fillStyle = fg; continue }
        g.globalAlpha = 0.2 + 0.6 * q[2]
        var r = 1 + 1 * q[2]
        g.fillRect(q[0] - r / 2, q[1] - r / 2, r, r)
      }
      g.globalAlpha = 1
      var fs = 10, bh = fs + 7, vis = []
      g.font = "700 " + fs + "px system-ui, sans-serif"; g.textBaseline = "middle"; g.textAlign = "center"
      for (var m = 0; m < CITIES.length; m++) {
        var c = CITIES[m], p2 = pr(c[1], c[2])
        if (p2[2] > 0.08) vis[vis.length] = { c: c, m: m, x: p2[0], y: p2[1], z: p2[2], nm: cname(c) }
      }
      vis.sort(function (a, b) { return a.x - b.x })
      for (var vi = 0; vi < vis.length; vi++) vis[vi].d = vi < Math.floor(vis.length / 2) ? -1 : 1
      for (var sd = -1; sd <= 1; sd += 2) {
        var col = vis.filter(function (v) { return v.d === sd }).sort(function (a, b) { return a.y - b.y })
        var lim = bh / 2 + 2, ly = []
        for (var a = 0; a < col.length; a++) ly[a] = Math.max(col[a].y, a ? ly[a - 1] + bh + 2 : lim)
        for (a = col.length - 1; a >= 0; a--) { var mx = a < col.length - 1 ? ly[a + 1] - bh - 2 : H - lim; if (ly[a] > mx) ly[a] = mx }
        for (a = 0; a < col.length; a++) {
          var v = col[a], tw = g.measureText(v.nm).width + 10, ax = sd > 0 ? Math.max(CX + R + 6, v.x + 4) : Math.min(CX - R - 6, v.x - 4)
          var bx = sd > 0 ? ax : ax - tw, ty = ly[a], on = sel && sel[0] === v.c[0], cl = CC_COL[CITY_CC[v.c[0]]] || CPAL[0], pu = 0.5 + 0.5 * Math.sin(ph * 2.2 + v.m)
          var al = 0.4 + 0.6 * Math.min(1, v.z * 1.6), dy = ty - v.y, ex = v.x + sd * Math.abs(dy)
          if (sd > 0 ? ex > ax : ex < ax) ex = ax
          g.globalAlpha = al * 0.8; g.strokeStyle = cl; g.lineWidth = 1.1
          g.beginPath(); g.moveTo(v.x, v.y); g.lineTo(ex, ty); g.lineTo(ax, ty); g.stroke()
          g.fillStyle = cl
          g.globalAlpha = al
          g.beginPath(); if (g.roundRect) g.roundRect(bx, ty - bh / 2, tw, bh, 6); else g.rect(bx, ty - bh / 2, tw, bh); g.fill()
          if (on) { g.strokeStyle = fg; g.lineWidth = 2; g.stroke() }
          g.fillStyle = "#fff"; g.fillText(v.nm, bx + tw / 2, ty + 0.5)
          g.globalAlpha = 1
          hits[hits.length] = { c: v.c, x: v.x, y: v.y, r: [bx, ty - bh / 2, tw, bh] }
        }
      }
      g.textAlign = "start"; g.textBaseline = "alphabetic"; g.fillStyle = fg
    }
    requestAnimationFrame(draw)
    cv.addEventListener("pointerdown", function (e) { drag = true; goal = null; moved = 0; sx = e.clientX; sl = lon0 })
    cv.addEventListener("pointermove", function (e) { if (!drag) return; moved = Math.max(moved, Math.abs(e.clientX - sx)); lon0 = sl - (e.clientX - sx) * 0.5 })
    cv.addEventListener("pointercancel", function () { drag = false })
    cv.addEventListener("pointerup", function (e) {
      var was = drag; drag = false
      if (!was || moved > 6) return
      var rc = cv.getBoundingClientRect(), x = (e.clientX - rc.left) * (W / rc.width), y = (e.clientY - rc.top) * (H / rc.height), best = null, bd = 22 * 22
      for (var m = hits.length - 1; m >= 0; m--) {
        var h = hits[m], r = h.r
        if (x >= r[0] - 3 && x <= r[0] + r[2] + 3 && y >= r[1] - 3 && y <= r[1] + r[3] + 3) { best = h; break }
        var d = (h.x - x) * (h.x - x) + (h.y - y) * (h.y - y)
        if (d < bd) { bd = d; best = h }
      }
      if (best) { S.tz = best.c[0]; save(); applyTheme(); gText(); obChip(); if (U.ob) obSync() }
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
    { a: "#f26a1b", a2: "#b8430a", a3: "#ff9a52", h: 225, t: "#fff" },
    { a: "#f4f4f6", a2: "#c4c4cc", a3: "#ffffff", h: 0, t: "#111", w: 1 }
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
  var BGV = { mosque: ["", ""], mosque2: ["", ""], mosque3: ["", ""], winter1: ["", ""], winter2: ["", ""], winter3: ["", ""], quran: ["", ""], gold: ["", ""], cream: ["", ""] }
  function isImgBg(k) { return /^(mosque|winter|quran)/.test(k || "") }
  document.addEventListener("search", function (e) { var t = e.target; if (t && t.id === "q" && !t.value) { t.blur() } }, true)
  var BGF = { mosque: "m1", mosque2: "m2", mosque3: "m3", winter1: "w1", winter2: "w2", winter3: "w3", quran: "q" }
  // ====================
  // FASL MAVZULARI: QISH
  // ====================
  function rng32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
  function wRidge(rn, base, amp, step, ph) {
    var pts = []
    for (var x = -30; x <= 430; x += step) {
      var y = base - amp * (0.55 * Math.sin(x / 61 + ph) + 0.3 * Math.sin(x / 27 + ph * 2.1) + 0.15 * Math.sin(x / 13 + ph * 3.3)) - rn() * amp * 0.22
      pts.push([x, y])
    }
    return pts
  }
  function wPoly(pts, bottom) {
    var d = "M" + pts[0][0] + " " + bottom
    for (var i = 0; i < pts.length; i++) d += "L" + pts[i][0].toFixed(1) + " " + pts[i][1].toFixed(1)
    return d + "L" + pts[pts.length - 1][0] + " " + bottom + "Z"
  }
  function wCap(pts, thr, rn) {
    var up = "", dn = [], i, y
    for (i = 0; i < pts.length; i++) {
      y = pts[i][1]
      var dep = Math.max(0, thr - y) * 1.15 + (y < thr ? 4 + rn() * 9 : 0)
      up += (i ? "L" : "M") + pts[i][0].toFixed(1) + " " + y.toFixed(1)
      dn.push(pts[i][0].toFixed(1) + " " + (y + dep).toFixed(1))
    }
    return up + "L" + dn.reverse().join("L") + "Z"
  }
  function wTree(rn, x0, y0, night) {
    var segs = []
    function br(x, y, a, len, w, d) {
      var x2 = x + len * Math.sin(a), y2 = y - len * Math.cos(a)
      segs.push([x, y, x2, y2, w, d])
      if (d >= 7) return
      var n = d < 2 ? 3 : (rn() < 0.28 ? 3 : 2)
      for (var i = 0; i < n; i++) {
        var da = (i - (n - 1) / 2) * (0.42 + rn() * 0.26) + (rn() - 0.5) * 0.3
        br(x2, y2, Math.max(-1.15, Math.min(1.15, a + da)), len * (0.7 + rn() * 0.14), w * 0.68, d + 1)
      }
    }
    br(x0, y0, -0.06, 104, 10, 0)
    var wood = night ? "#150f0d" : "#4d4039", sn = night ? "#cfe0f2" : "#ffffff", h = "", s = "", i
    for (i = 0; i < segs.length; i++) {
      var q = segs[i]
      h += '<path d="M' + q[0].toFixed(1) + " " + q[1].toFixed(1) + "L" + q[2].toFixed(1) + " " + q[3].toFixed(1) + '" stroke-width="' + q[4].toFixed(2) + '"/>'
      if (q[5] >= 1 && q[3] < q[1] + 6) s += '<path d="M' + q[0].toFixed(1) + " " + (q[1] - q[4] * 0.32).toFixed(1) + "L" + q[2].toFixed(1) + " " + (q[3] - q[4] * 0.32).toFixed(1) + '" stroke-width="' + Math.max(0.9, q[4] * 0.5).toFixed(2) + '"/>'
    }
    return '<g stroke="' + wood + '" stroke-linecap="round" fill="none">' + h + '</g><g stroke="' + sn + '" stroke-opacity=".92" stroke-linecap="round" fill="none">' + s + "</g>"
  }
  function winterScene(night) {
    var rn = rng32(20261), C = night ?
      { s1: "#050b1d", s2: "#10294f", s3: "#2d5b86", m1: "#2a4468", c1: "#a9c1de", m2: "#192c4b", c2: "#86a3c6", g1: "#e4eef9", g2: "#8fa9c9", fog: "#4f7fae" } :
      { s1: "#8fbbe0", s2: "#c6dff1", s3: "#eef6fb", m1: "#a5bcd5", c1: "#ffffff", m2: "#86a1c0", c2: "#f4f9fd", g1: "#ffffff", g2: "#cfe0f1", fog: "#ffffff" }
    var far = wRidge(rn, 500, 120, 20, 0.4), mid = wRidge(rn, 560, 90, 18, 2.2)
    var h = '<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<linearGradient id="wsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.s1 + '"/><stop offset=".55" stop-color="' + C.s2 + '"/><stop offset="1" stop-color="' + C.s3 + '"/></linearGradient>' +
      '<linearGradient id="wgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.g1 + '"/><stop offset="1" stop-color="' + C.g2 + '"/></linearGradient>' +
      '<linearGradient id="wfg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.fog + '" stop-opacity="0"/><stop offset="1" stop-color="' + C.fog + '" stop-opacity="' + (night ? ".38" : ".7") + '"/></linearGradient>' +
      '<radialGradient id="wmn"><stop offset="0" stop-color="#fffbe9" stop-opacity=".9"/><stop offset=".35" stop-color="#e8ecff" stop-opacity=".25"/><stop offset="1" stop-color="#e8ecff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="800" fill="url(#wsk)"/>'
    if (night) {
      for (var i = 0; i < 70; i++) {
        var sy = rn() * 430, op = (0.25 + rn() * 0.65) * (1 - sy / 520)
        h += '<circle class="tw" style="animation-delay:-' + (rn() * 3).toFixed(2) + 's" cx="' + (rn() * 400).toFixed(1) + '" cy="' + sy.toFixed(1) + '" r="' + (0.4 + rn() * 0.9).toFixed(2) + '" fill="#fff" opacity="' + op.toFixed(2) + '"/>'
      }
      h += '<circle cx="84" cy="150" r="90" fill="url(#wmn)"/><circle cx="84" cy="150" r="24" fill="#f6f3e4"/><circle cx="76" cy="144" r="5" fill="#dedbc9" opacity=".6"/><circle cx="92" cy="158" r="3.5" fill="#dedbc9" opacity=".5"/>'
    } else {
      h += '<circle cx="84" cy="170" r="110" fill="url(#wmn)" opacity=".7"/>'
    }
    h += '<path d="' + wPoly(far, 800) + '" fill="' + C.m1 + '"/><path d="' + wCap(far, 465, rn) + '" fill="' + C.c1 + '" opacity=".95"/>'
    h += '<rect x="0" y="430" width="400" height="180" fill="url(#wfg)"/>'
    h += '<path d="' + wPoly(mid, 800) + '" fill="' + C.m2 + '"/><path d="' + wCap(mid, 540, rn) + '" fill="' + C.c2 + '" opacity=".95"/>'
    h += '<path d="M-20 640C60 600 140 612 210 632S340 650 430 612V800H-20Z" fill="url(#wgr)"/>'
    h += '<path d="M-20 690C80 655 170 668 250 690S380 700 430 676V800H-20Z" fill="' + C.g1 + '" opacity=".92"/>'
    h += '<path d="M-20 690C80 655 170 668 250 690S380 700 430 676" fill="none" stroke="' + C.g2 + '" stroke-opacity=".55" stroke-width="1.4"/>'
    h += wTree(rn, 296, 690, night)
    for (var j = 0; j < 40; j++) h += '<circle class="tw" style="animation-delay:-' + (rn() * 3).toFixed(2) + 's" cx="' + (rn() * 400).toFixed(1) + '" cy="' + (650 + rn() * 140).toFixed(1) + '" r="' + (0.5 + rn() * 0.8).toFixed(2) + '" fill="#fff" opacity="' + (night ? 0.7 : 0.9) + '"/>'
    return h + "</svg>"
  }
    var TREEPTS = []
  function aTree(rn, x0, y0, night, pl, dens) {
    TREEPTS = []
    var segs = []
    function br(x, y, a, len, w, d) {
      var x2 = x + len * Math.sin(a), y2 = y - len * Math.cos(a)
      segs.push([x, y, x2, y2, w, d])
      if (d >= 7) return
      var n = d < 2 ? 3 : (rn() < 0.28 ? 3 : 2)
      for (var i = 0; i < n; i++) {
        var da = (i - (n - 1) / 2) * (0.42 + rn() * 0.26) + (rn() - 0.5) * 0.3
        br(x2, y2, Math.max(-1.15, Math.min(1.15, a + da)), len * (0.7 + rn() * 0.14), w * 0.68, d + 1)
      }
    }
    br(x0, y0, -0.06, 104, 10, 0)
    var wood = night ? "#120c09" : "#3b2a20", pal = pl ? pl : night ? ["#9a4524", "#b8741f", "#a03024", "#76591b", "#8a3a1a"] : ["#c8582a", "#e59a2d", "#c9402e", "#a8812a", "#d9701f"], h = "", lv = "", i, j
    for (i = 0; i < segs.length; i++) {
      var q = segs[i]
      h += '<path d="M' + q[0].toFixed(1) + " " + q[1].toFixed(1) + "L" + q[2].toFixed(1) + " " + q[3].toFixed(1) + '" stroke-width="' + q[4].toFixed(2) + '"/>'
      if (q[5] >= 4 && TREEPTS.push([q[2], q[3], q[5]]) && rn() < (dens || 0.78)) {
        var cnt = q[5] >= 6 ? 5 : 3
        for (j = 0; j < cnt; j++) lv += '<ellipse cx="' + (q[2] + (rn() - 0.5) * 16).toFixed(1) + '" cy="' + (q[3] + (rn() - 0.5) * 14).toFixed(1) + '" rx="' + (3 + rn() * 2.4).toFixed(1) + '" ry="' + (1.7 + rn() * 1.2).toFixed(1) + '" transform="rotate(' + Math.round(rn() * 180) + " " + q[2].toFixed(1) + " " + q[3].toFixed(1) + ')" fill="' + pal[Math.floor(rn() * pal.length)] + '"/>'
      }
    }
    return '<g stroke="' + wood + '" stroke-linecap="round" fill="none">' + h + "</g><g>" + lv + "</g>"
  }
  var BFSP = {}, BFC = [
    { a: "#ff9a1e", a2: "#e2560c", e: "#1c0f08", d: "#fff4e0", v: "#2a1408" },
    { a: "#ffe14d", a2: "#f2b705", e: "#1a1408", d: "#fffbe0", v: "#2a2008" },
    { a: "#4aa8ff", a2: "#1d5fd1", e: "#0b1630", d: "#d8ecff", v: "#0b1630" },
    { a: "#fff6f8", a2: "#f2b6cf", e: "#3a2a33", d: "#ffffff", v: "#6a4a58" }
  ]
  function bfSprite(i) {
    if (BFSP[i]) return BFSP[i]
    var c = document.createElement("canvas"), g, P = BFC[i], S3 = 3
    c.width = 110 * S3; c.height = 110 * S3
    g = c.getContext("2d"); g.scale(S3, S3); g.translate(6, 70)
    function wing(path) {
      var gr = g.createRadialGradient(0, 0, 4, 20, -10, 80)
      gr.addColorStop(0, P.a2); gr.addColorStop(0.55, P.a); gr.addColorStop(1, P.a)
      g.save(); path(); g.fillStyle = gr; g.fill(); g.clip()
      g.strokeStyle = P.v; g.globalAlpha = 0.55; g.lineWidth = 0.9
      for (var k = -5; k <= 5; k++) { g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(40, k * 5, 92, k * 12 - 4); g.stroke() }
      g.globalAlpha = 1; g.strokeStyle = P.e; g.lineWidth = 9; path(); g.stroke()
      g.restore()
      g.save(); path(); g.lineWidth = 1.6; g.strokeStyle = P.e; g.stroke(); g.restore()
    }
    function fore() { g.beginPath(); g.moveTo(0, -4); g.bezierCurveTo(6, -34, 42, -66, 80, -60); g.bezierCurveTo(98, -50, 86, -14, 70, -6); g.bezierCurveTo(48, 0, 22, 4, 0, 4); g.closePath() }
    function hind() { g.beginPath(); g.moveTo(0, 3); g.bezierCurveTo(30, -2, 72, 2, 74, 24); g.bezierCurveTo(76, 44, 44, 52, 22, 36); g.bezierCurveTo(10, 28, 2, 18, 0, 3); g.closePath() }
    wing(hind); wing(fore)
    g.fillStyle = P.d
    for (var k = 0; k < 7; k++) { var t = k / 6; g.beginPath(); g.arc(30 + t * 46, -52 + t * 20 - Math.sin(t * 3.14) * 4 + 16 - 16 * (1 - t), 1.8, 0, 6.2832); g.fill() }
    for (k = 0; k < 5; k++) { t = k / 4; g.beginPath(); g.arc(22 + t * 40, 40 - Math.sin(t * 3.14) * 3 - t * 6 + 0, 1.6, 0, 6.2832); g.fill() }
    return (BFSP[i] = c)
  }
  function springScene(night) {
    var rn = rng32(51917), C = night ?
      { s1: "#050c1d", s2: "#17304f", s3: "#3a5a6a", m1: "#26405c", g1: "#245a2f", g2: "#0e2a18", hl: "#1a4a2c", sn: "#9fb7cc" } :
      { s1: "#69b4e6", s2: "#c9e9f0", s3: "#f7fae6", m1: "#9bb9cf", g1: "#95d35b", g2: "#4a9a3b", hl: "#6cbb4e", sn: "#ffffff" }
    var pal = night ? ["#2f7a3c", "#3b8c45", "#2a6b36", "#1f5a2e", "#a07a90"] : ["#9ad06a", "#7fc15a", "#b6e07c", "#6bb34f", "#f4c3d6"]
    var far = wRidge(rn, 500, 110, 20, 0.9), mid = wRidge(rn, 565, 80, 16, 2.7), h = "", i, x
    h = '<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<linearGradient id="psk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.s1 + '"/><stop offset=".6" stop-color="' + C.s2 + '"/><stop offset="1" stop-color="' + C.s3 + '"/></linearGradient>' +
      '<linearGradient id="pgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.g1 + '"/><stop offset="1" stop-color="' + C.g2 + '"/></linearGradient>' +
      '<linearGradient id="prb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".25" stop-color="#ffb84d"/><stop offset=".5" stop-color="#f6f26b"/><stop offset=".75" stop-color="#5fd38d"/><stop offset="1" stop-color="#5b8cff"/></linearGradient>' +
      '<linearGradient id="pfg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="' + (night ? "#8fb0c4" : "#ffffff") + '" stop-opacity="' + (night ? ".25" : ".55") + '"/></linearGradient>' +
      '<filter id="pcb" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter></defs>' +
      '<rect width="400" height="800" fill="url(#psk)"/>'
    if (night) {
      for (i = 0; i < 40; i++) h += '<circle cx="' + (rn() * 400).toFixed(0) + '" cy="' + (rn() * 380).toFixed(0) + '" r="' + (0.5 + rn()).toFixed(1) + '" fill="#fff" opacity="' + (0.3 + rn() * 0.5).toFixed(2) + '"/>'
      h += '<circle cx="300" cy="140" r="22" fill="#eef0dc" opacity=".9"/>'
    } else {
      h += '<path d="M-20 520C60 260 340 260 420 520" fill="none" stroke="url(#prb)" stroke-width="22" opacity=".22" filter="url(#pcb)"/>'
    }
    for (i = 0; i < 6; i++) h += '<ellipse cx="' + (rn() * 420 - 10).toFixed(0) + '" cy="' + (60 + rn() * 320).toFixed(0) + '" rx="' + (70 + rn() * 80).toFixed(0) + '" ry="' + (14 + rn() * 14).toFixed(0) + '" fill="' + (night ? "#1a2c44" : "#ffffff") + '" opacity="' + (night ? 0.5 : 0.7) + '" filter="url(#pcb)"/>'
    h += '<path d="' + wPoly(far, 800) + '" fill="' + C.m1 + '"/>'
    h += '<path d="' + wCap(far, 425, rn) + '" fill="' + C.sn + '" opacity="' + (night ? ".5" : ".85") + '"/>'
    h += '<rect x="0" y="430" width="400" height="190" fill="url(#pfg)"/>'
    h += '<path d="' + wPoly(mid, 800) + '" fill="' + C.hl + '"/>'
    for (i = 0; i < mid.length; i++) for (x = 0; x < 3; x++) h += '<circle cx="' + (mid[i][0] + (rn() - 0.5) * 14).toFixed(1) + '" cy="' + (mid[i][1] + 3 + rn() * 22).toFixed(1) + '" r="' + (6 + rn() * 7).toFixed(1) + '" fill="' + pal[Math.floor(rn() * 4)] + '" opacity=".85"/>'
    h += '<path d="M-20 640C60 604 140 616 210 636S340 652 430 616V800H-20Z" fill="url(#pgr)"/>'
    h += '<path d="M-20 692C80 658 170 670 250 692S380 702 430 678V800H-20Z" fill="' + C.g1 + '" opacity=".9"/>'
    for (i = 0; i < 4; i++) { var px = 20 + rn() * 340, py = 700 + rn() * 80; h += '<ellipse cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" rx="' + (22 + rn() * 26).toFixed(0) + '" ry="' + (4 + rn() * 3).toFixed(0) + '" fill="' + (night ? "#38566e" : "#a9d6ee") + '" opacity=".85"/>' }
    h += aTree(rn, 296, 690, night, pal, 0.55)
    for (i = 0; i < 70; i++) { var gx = rn() * 400, gy = 655 + rn() * 140; h += '<path d="M' + gx.toFixed(1) + " " + gy.toFixed(1) + "l-1.4 -" + (4 + rn() * 4).toFixed(1) + "M" + gx.toFixed(1) + " " + gy.toFixed(1) + "l1.4 -" + (4 + rn() * 4).toFixed(1) + '" stroke="' + (night ? "#3f8a48" : "#5fb046") + '" stroke-width="1.4" stroke-linecap="round"/>' }
    return h + "</svg>"
  }
  function springStart(host, night) {
    snowStop()
    var cv = document.createElement("canvas"); cv.className = "snw"; host.appendChild(cv)
    var g = cv.getContext("2d"), W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), pt = [], rn = [], i
    var red = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    var NP = red ? 8 : (window.innerWidth < 500 ? 22 : 32), NR = red ? 0 : (window.innerWidth < 500 ? 46 : 70)
    function fit() { W = host.clientWidth || window.innerWidth; H = host.clientHeight || window.innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr) }
    function mkP(first) {
      var z = Math.pow(Math.random(), 1.1), lf = Math.random() < 0.4
      return { x: Math.random() * W, y: first ? Math.random() * H : -20 - Math.random() * 60, z: z, lf: lf, sz: lf ? 9 + z * 8 : 8 + z * 9, vy: 22 + z * 40, ph: Math.random() * 6.28, fr: 0.5 + Math.random() * 0.8, am: 12 + z * 22, rot: Math.random() * 6.28, rs: (Math.random() - 0.5) * 3, tf: 1 + Math.random() * 2, c: lf ? (night ? "#4f9a52" : "#7cc65a") : (night ? "#d9b9c9" : (Math.random() < 0.5 ? "#ffffff" : "#f7c6d9")) }
    }
    function mkR(first) { var z = Math.random(); return { x: Math.random() * (W + 60) - 30, y: first ? Math.random() * H : -30, z: z, vy: 420 + z * 380, l: 8 + z * 12 } }
    fit()
    for (i = 0; i < NP; i++) pt.push(mkP(true))
    for (i = 0; i < NR; i++) rn.push(mkR(true))
    var t0 = 0
    SNOW.el = host
    function frame(ts) {
      if (!host.isConnected || SNOW.el !== host) return
      SNOW.raf = requestAnimationFrame(frame)
      if (document.hidden) { t0 = 0; return }
      var dt = t0 ? Math.min(0.05, (ts - t0) / 1000) : 0.016, tm = ts / 1000, k, d, f, wind = 18 + Math.sin(tm * 0.23) * 14 + Math.sin(tm * 0.7) * 6
      t0 = ts
      if (host.clientWidth !== W || host.clientHeight !== H) fit()
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H)
      g.strokeStyle = night ? "rgb(190,210,240)" : "rgb(95,120,150)"; g.lineCap = "round"
      for (k = 0; k < rn.length; k++) {
        d = rn[k]; d.y += d.vy * dt
        if (d.y > H + 30) { d.y = -30; d.x = Math.random() * (W + 60) - 30 }
        g.globalAlpha = 0.1 + 0.2 * d.z; g.lineWidth = 0.6 + d.z * 0.6
        g.beginPath(); g.moveTo(d.x, d.y); g.lineTo(d.x - d.l * (0.12 + wind / 300), d.y - d.l); g.stroke()
      }
      for (k = 0; k < pt.length; k++) {
        f = pt[k]; f.y += f.vy * dt; f.x += (wind * (0.4 + f.z) + Math.cos(tm * f.fr + f.ph) * f.am) * dt; f.rot += f.rs * dt
        if (f.y > H + 30 || f.x > W + 40) { pt[k] = mkP(false); pt[k].x = f.x > W + 40 ? -20 : Math.random() * W; continue }
        g.globalAlpha = 0.9; g.save(); g.translate(f.x, f.y); g.rotate(f.rot); g.scale(0.35 + 0.65 * Math.abs(Math.cos(tm * f.tf + f.ph)), 1)
        g.fillStyle = f.c; g.beginPath()
        if (f.lf) { g.moveTo(0, -f.sz * 0.6); g.bezierCurveTo(f.sz * 0.5, -f.sz * 0.3, f.sz * 0.4, f.sz * 0.4, 0, f.sz * 0.6); g.bezierCurveTo(-f.sz * 0.4, f.sz * 0.4, -f.sz * 0.5, -f.sz * 0.3, 0, -f.sz * 0.6) }
        else { g.ellipse(0, 0, f.sz * 0.3, f.sz * 0.5, 0, 0, 6.2832) }
        g.fill(); g.restore()
      }
      g.globalAlpha = 1
    }
    SNOW.raf = requestAnimationFrame(frame)
  }
  function summerScene(night) {
    var rn = rng32(7771), C = night ?
      { s1: "#030818", s2: "#0f2147", s3: "#27405f", m1: "#1c3150", g1: "#1b4426", g2: "#0b2414", hl: "#123a22" } :
      { s1: "#3f9be6", s2: "#9bd2f3", s3: "#fff1c4", m1: "#8fb2d4", g1: "#7cc653", g2: "#2f7d34", hl: "#4a9e48" }
    var pal = night ? ["#14502a", "#1b6030", "#0f4423", "#256b34", "#0c3a1f"] : ["#2f9e44", "#43b052", "#238636", "#5cbf5a", "#37a348"]
    var far = wRidge(rn, 500, 110, 20, 0.9), mid = wRidge(rn, 565, 80, 16, 2.7), h = "", i, x
    h = '<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<linearGradient id="ssk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.s1 + '"/><stop offset=".6" stop-color="' + C.s2 + '"/><stop offset="1" stop-color="' + C.s3 + '"/></linearGradient>' +
      '<linearGradient id="sgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.g1 + '"/><stop offset="1" stop-color="' + C.g2 + '"/></linearGradient>' +
      '<radialGradient id="ssn"><stop offset="0" stop-color="#fff8d6" stop-opacity="1"/><stop offset=".25" stop-color="#ffe9a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>' +
      '<filter id="scb" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="8"/></filter></defs>' +
      '<rect width="400" height="800" fill="url(#ssk)"/>'
    if (night) {
      for (i = 0; i < 70; i++) h += '<circle cx="' + (rn() * 400).toFixed(0) + '" cy="' + (rn() * 420).toFixed(0) + '" r="' + (0.5 + rn() * 1.1).toFixed(1) + '" fill="#fff" opacity="' + (0.35 + rn() * 0.6).toFixed(2) + '"/>'
      h += '<circle cx="86" cy="150" r="22" fill="#f1ecd6" opacity=".92"/>'
    } else {
      h += '<circle cx="300" cy="130" r="150" fill="url(#ssn)"/><circle cx="300" cy="130" r="26" fill="#fffbe6"/>'
      for (i = 0; i < 6; i++) h += '<ellipse cx="' + (rn() * 420 - 10).toFixed(0) + '" cy="' + (70 + rn() * 300).toFixed(0) + '" rx="' + (60 + rn() * 70).toFixed(0) + '" ry="' + (12 + rn() * 14).toFixed(0) + '" fill="#fff" opacity=".8" filter="url(#scb)"/>'
    }
    h += '<path d="' + wPoly(far, 800) + '" fill="' + C.m1 + '"/>'
    h += '<path d="' + wPoly(mid, 800) + '" fill="' + C.hl + '"/>'
    for (i = 0; i < mid.length; i++) for (x = 0; x < 3; x++) h += '<circle cx="' + (mid[i][0] + (rn() - 0.5) * 14).toFixed(1) + '" cy="' + (mid[i][1] + 3 + rn() * 22).toFixed(1) + '" r="' + (6 + rn() * 7).toFixed(1) + '" fill="' + pal[Math.floor(rn() * pal.length)] + '" opacity=".85"/>'
    h += '<path d="M-20 640C60 604 140 616 210 636S340 652 430 616V800H-20Z" fill="url(#sgr)"/>'
    h += '<path d="M-20 692C80 658 170 670 250 692S380 702 430 678V800H-20Z" fill="' + C.g1 + '" opacity=".9"/>'
    h += aTree(rn, 296, 690, night, pal)
    var fl = night ? ["#9fb0d8", "#c9b86a", "#b78fc9"] : ["#ffd84a", "#ffffff", "#ff7aa8", "#ffb347"]
    for (i = 0; i < 90; i++) h += '<circle cx="' + (rn() * 400).toFixed(1) + '" cy="' + (655 + rn() * 140).toFixed(1) + '" r="' + (1.1 + rn() * 1.6).toFixed(1) + '" fill="' + fl[Math.floor(rn() * fl.length)] + '" opacity=".92"/>'
    return h + "</svg>"
  }
  function summerStart(host, night) {
    snowStop()
    var cv = document.createElement("canvas"); cv.className = "snw"; host.appendChild(cv)
    var g = cv.getContext("2d"), W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), ps = [], bf = [], i
    var red = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    var NP = red ? 10 : (night ? 34 : 46), NB = night || red ? 0 : 5
    function fit() { W = host.clientWidth || window.innerWidth; H = host.clientHeight || window.innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr) }
    function mkP() {
      var z = Math.random()
      return { x: Math.random() * W, y: night ? H * (0.35 + Math.random() * 0.65) : Math.random() * H, z: z, a: Math.random() * 6.28, s: night ? 12 + Math.random() * 18 : 6 + z * 14, r: night ? 2.2 + Math.random() * 2 : 1.6 + z * 2.4, ph: Math.random() * 6.28, f: 0.6 + Math.random() * 1.6 }
    }
    function mkB() {
      var cs = [["#ff8c1a", "#2b1a0a"], ["#ffd23f", "#3a2a0a"], ["#4fa3ff", "#0f1e3a"], ["#ff6fa5", "#3a0f22"]]
      return { x: Math.random() * W, y: H * (0.45 + Math.random() * 0.4), h: Math.random() * 6.28, ph: Math.random() * 6.28, ci: bf.length % 4, sz: 20 + bf.length * 5, st: 0, tt: 3 + Math.random() * 9, tp: 0 }
    }
    fit()
    for (i = 0; i < NP; i++) ps.push(mkP())
    for (i = 0; i < NB; i++) bf.push(mkB())
    var t0 = 0
    SNOW.el = host
    function frame(ts) {
      if (!host.isConnected || SNOW.el !== host) return
      SNOW.raf = requestAnimationFrame(frame)
      if (document.hidden) { t0 = 0; return }
      var dt = t0 ? Math.min(0.05, (ts - t0) / 1000) : 0.016, tm = ts / 1000, k, p, b, gr
      t0 = ts
      if (host.clientWidth !== W || host.clientHeight !== H) fit()
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H)
      g.globalCompositeOperation = "lighter"
      for (k = 0; k < ps.length; k++) {
        p = ps[k]
        p.a += (Math.random() - 0.5) * 2.4 * dt
        p.x += Math.cos(p.a) * p.s * dt + (night ? 0 : 8 * dt)
        p.y += Math.sin(p.a) * p.s * dt - (night ? 0 : 6 * dt)
        if (p.x < -20) p.x = W + 10; if (p.x > W + 20) p.x = -10
        if (p.y < -20) p.y = H + 10; if (p.y > H + 20) p.y = -10
        var al = night ? 0.25 + 0.75 * Math.pow(0.5 + 0.5 * Math.sin(tm * p.f * 2 + p.ph), 2) : 0.5 + 0.3 * Math.sin(tm * p.f + p.ph), rr = p.r * (night ? 5 : 3.2)
        gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr)
        if (night) { gr.addColorStop(0, "rgba(235,255,150," + al + ")"); gr.addColorStop(0.25, "rgba(190,240,70," + al * 0.55 + ")"); gr.addColorStop(1, "rgba(160,230,40,0)") }
        else { gr.addColorStop(0, "rgba(255,255,235," + al + ")"); gr.addColorStop(0.4, "rgba(255,240,170," + al * 0.4 + ")"); gr.addColorStop(1, "rgba(255,230,140,0)") }
        g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, rr, 0, 6.2832); g.fill()
      }
      g.globalCompositeOperation = "source-over"
      for (k = 0; k < bf.length; k++) {
        b = bf[k]
        var sc0 = Math.max(W / 400, H / 800), ox = (W - 400 * sc0) / 2, oy = (H - 800 * sc0) / 2, tip, dx, dy, ds, da
        if (b.st === 0) {
          b.tt -= dt
          b.h += Math.sin(tm * 0.8 + b.ph) * 1.1 * dt + (Math.random() - 0.5) * 1.8 * dt
          var sp = 30 + Math.sin(tm * 2.2 + b.ph) * 14
          b.x += Math.cos(b.h) * sp * dt; b.y += Math.sin(b.h) * sp * dt * 0.8 + Math.sin(tm * 5 + b.ph) * 10 * dt
          if (b.x < -40) b.x = W + 30; if (b.x > W + 40) b.x = -30
          if (b.y < H * 0.12) b.h = Math.abs(b.h) * 0.5; if (b.y > H * 0.88) b.h = -Math.abs(b.h) * 0.6
          if (b.tt <= 0 && TREEPTS.length) { b.st = 1; b.tp = TREEPTS[Math.floor(Math.random() * TREEPTS.length)] }
        } else {
          tip = b.tp; var tx = ox + tip[0] * sc0, ty = oy + tip[1] * sc0
          if (b.st === 1) {
            dx = tx - b.x; dy = ty - b.y; ds = Math.sqrt(dx * dx + dy * dy)
            da = Math.atan2(dy, dx) - b.h; da = Math.atan2(Math.sin(da), Math.cos(da))
            b.h += da * Math.min(1, dt * 3)
            var spd = Math.min(36, 10 + ds * 0.7)
            b.x += Math.cos(b.h) * spd * dt; b.y += Math.sin(b.h) * spd * dt
            if (ds < 3) { b.st = 2; b.tt = 5 + Math.random() * 9; b.rh = b.h }
          } else {
            b.x = tx; b.y = ty; b.h = b.rh; b.tt -= dt
            if (b.tt <= 0) { b.st = 0; b.tt = 10 + Math.random() * 16; b.h = -1.57 + (Math.random() - 0.5) * 1.4 }
          }
        }
        var fl = Math.cos(tm * 13 + b.ph), kk = b.sz / 100, wf = b.st === 2 ? 0.45 + 0.4 * Math.abs(Math.cos(tm * 1.3 + b.ph)) : 0.25 + 0.75 * Math.abs(fl), spr = bfSprite(b.ci), s3 = 3
        g.save(); g.translate(b.x, b.y); g.rotate(b.h + 1.5708 + Math.sin(tm * 2 + b.ph) * 0.15); g.scale(kk, kk)
        g.globalAlpha = 0.18; g.fillStyle = "#000"; g.beginPath(); g.ellipse(6, 10, 3, 12, 0, 0, 6.2832); g.fill(); g.globalAlpha = 1
        g.save(); g.scale(wf, 1); g.drawImage(spr, -6, -70, 110, 110); g.restore()
        g.save(); g.scale(-wf, 1); g.drawImage(spr, -6, -70, 110, 110); g.restore()
        g.fillStyle = "#1a120c"; g.beginPath(); g.ellipse(0, 7, 2.6, 12, 0, 0, 6.2832); g.fill()
        g.beginPath(); g.ellipse(0, -6, 3.4, 5, 0, 0, 6.2832); g.fill()
        g.beginPath(); g.arc(0, -12, 2.6, 0, 6.2832); g.fill()
        g.strokeStyle = "#1a120c"; g.lineWidth = 1; g.beginPath(); g.moveTo(-1, -14); g.quadraticCurveTo(-8, -26, -14, -28); g.moveTo(1, -14); g.quadraticCurveTo(8, -26, 14, -28); g.stroke()
        g.restore()
      }
    }
    SNOW.raf = requestAnimationFrame(frame)
  }
  function autumnScene(night) {
    var rn = rng32(20263), C = night ?
      { s1: "#090d1d", s2: "#292640", s3: "#6b4636", m1: "#2b3350", g1: "#4b3321", g2: "#2b1b10", fog: "#9a5f3a" } :
      { s1: "#7f93a8", s2: "#bbb5a8", s3: "#f1d9ad", m1: "#8e9cb4", g1: "#c88c3f", g2: "#7f5325", fog: "#ffe5b8" }
    var pal = night ? ["#6e3a22", "#7a5420", "#5f2a1e", "#4d4018", "#6a2f18"] : ["#c0602a", "#d89a33", "#b5402c", "#9a8030", "#c9732a"]
    var far = wRidge(rn, 500, 110, 20, 0.9), mid = wRidge(rn, 565, 80, 16, 2.7), h, i, x
    h = '<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<linearGradient id="ask" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.s1 + '"/><stop offset=".6" stop-color="' + C.s2 + '"/><stop offset="1" stop-color="' + C.s3 + '"/></linearGradient>' +
      '<linearGradient id="agr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.g1 + '"/><stop offset="1" stop-color="' + C.g2 + '"/></linearGradient>' +
      '<linearGradient id="afg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.fog + '" stop-opacity="0"/><stop offset="1" stop-color="' + C.fog + '" stop-opacity="' + (night ? ".32" : ".6") + '"/></linearGradient>' +
      '<filter id="acb" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter></defs>' +
      '<rect width="400" height="800" fill="url(#ask)"/>'
    if (night) h += '<circle cx="84" cy="150" r="22" fill="#e9e2cf" opacity=".5"/>'
    for (i = 0; i < 6; i++) h += '<ellipse cx="' + (rn() * 420 - 10).toFixed(0) + '" cy="' + (60 + rn() * 330).toFixed(0) + '" rx="' + (70 + rn() * 80).toFixed(0) + '" ry="' + (14 + rn() * 16).toFixed(0) + '" fill="' + (night ? "#0b0d1a" : "#6c7684") + '" opacity="' + (night ? 0.55 : 0.4) + '" filter="url(#acb)"/>'
    h += '<path d="' + wPoly(far, 800) + '" fill="' + C.m1 + '"/>'
    h += '<rect x="0" y="430" width="400" height="190" fill="url(#afg)"/>'
    h += '<path d="' + wPoly(mid, 800) + '" fill="' + pal[4] + '"/>'
    for (i = 0; i < mid.length; i++) for (x = 0; x < 3; x++) h += '<circle cx="' + (mid[i][0] + (rn() - 0.5) * 14).toFixed(1) + '" cy="' + (mid[i][1] + 3 + rn() * 22).toFixed(1) + '" r="' + (6 + rn() * 7).toFixed(1) + '" fill="' + pal[Math.floor(rn() * pal.length)] + '"/>'
    h += '<path d="M-20 640C60 604 140 616 210 636S340 652 430 616V800H-20Z" fill="url(#agr)"/>'
    h += '<path d="M-20 692C80 658 170 670 250 692S380 702 430 678V800H-20Z" fill="' + C.g1 + '" opacity=".9"/>'
    h += aTree(rn, 296, 690, night)
    for (i = 0; i < 70; i++) {
      var ly = 655 + rn() * 140
      h += '<ellipse cx="' + (rn() * 400).toFixed(1) + '" cy="' + ly.toFixed(1) + '" rx="' + (2.4 + rn() * 2.4).toFixed(1) + '" ry="' + (1.2 + rn() * 1.1).toFixed(1) + '" transform="rotate(' + Math.round(rn() * 180) + ')" fill="' + pal[Math.floor(rn() * pal.length)] + '" opacity=".9"/>'
    }
    return h + "</svg>"
  }
  var LEAFSP = {}
  function leafSprite(shape, color) {
    var key = shape + color
    if (LEAFSP[key]) return LEAFSP[key]
    var S2 = 72, c = document.createElement("canvas"), g, k
    c.width = c.height = S2
    g = c.getContext("2d"); g.translate(S2 / 2, S2 / 2)
    g.fillStyle = color; g.strokeStyle = "rgba(60,25,10,.55)"; g.lineWidth = 1.3; g.lineJoin = "round"
    g.beginPath()
    if (shape === 0) {
      for (k = 0; k <= 120; k++) {
        var th = k / 120 * 6.2832, r = 30 * (0.5 + 0.5 * Math.pow(Math.abs(Math.cos(2.5 * th)), 0.8)), px = r * Math.sin(th), py = -r * Math.cos(th)
        g[k ? "lineTo" : "moveTo"](px, py)
      }
    } else if (shape === 1) {
      g.moveTo(0, -30); g.bezierCurveTo(22, -16, 20, 14, 0, 28); g.bezierCurveTo(-20, 14, -22, -16, 0, -30)
    } else {
      g.moveTo(0, -30); g.bezierCurveTo(10, -22, 24, -6, 0, 26); g.bezierCurveTo(-24, -6, -10, -22, 0, -30)
    }
    g.closePath(); g.fill(); g.stroke()
    g.lineWidth = 1.1; g.beginPath(); g.moveTo(0, 30); g.lineTo(0, -22)
    if (shape === 0) { g.moveTo(0, 6); g.lineTo(-18, -8); g.moveTo(0, 6); g.lineTo(18, -8); g.moveTo(0, -6); g.lineTo(-10, -22); g.moveTo(0, -6); g.lineTo(10, -22) } else { for (k = -2; k <= 1; k++) { g.moveTo(0, k * 9 + 8); g.lineTo(-10, k * 9 - 2); g.moveTo(0, k * 9 + 8); g.lineTo(10, k * 9 - 2) } }
    g.stroke()
    g.strokeStyle = "rgba(60,25,10,.7)"; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 28); g.lineTo(0, 36); g.stroke()
    return (LEAFSP[key] = c)
  }
  function autumnStart(host, night) {
    snowStop()
    var cv = document.createElement("canvas"); cv.className = "snw"; host.appendChild(cv)
    var g = cv.getContext("2d"), W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), lv = [], rn = [], i
    var red = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    var NL = red ? 10 : (window.innerWidth < 500 ? 26 : 38), NR = red ? 0 : (window.innerWidth < 500 ? 70 : 110)
    var cols = night ? ["#c4402f", "#b8321f", "#d9a62b", "#caa02a"] : ["#d63a28", "#c9301f", "#f0b92e", "#e8a81f"]
    var trc = document.createElement("canvas"), tg = trc.getContext("2d"), dd = [], t00 = 0, fc = 0, MAXD = red ? 0 : (window.innerWidth < 500 ? 420 : 640), svg0 = host.querySelector("svg")
    var bgc = null, bgimg = null
    function bgMake() {
      if (!svg0 || !MAXD) return
      try {
        var cl = svg0.cloneNode(true); cl.removeAttribute("style"); cl.setAttribute("width", Math.round(W * dpr)); cl.setAttribute("height", Math.round(H * dpr))
        var im = new Image()
        im.onload = function () { var c2 = document.createElement("canvas"); c2.width = Math.round(W * dpr); c2.height = Math.round(H * dpr); c2.getContext("2d").drawImage(im, 0, 0, c2.width, c2.height); bgc = c2; dirty = 1 }
        im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(cl))
      } catch (e) {}
    }
    function fit() { W = host.clientWidth || window.innerWidth; H = host.clientHeight || window.innerHeight; cv.width = trc.width = stc.width = Math.round(W * dpr); cv.height = trc.height = stc.height = Math.round(H * dpr); bgc = null; bgMake(); dirty = 1 }
    var stc = document.createElement("canvas"), sg = stc.getContext("2d"), dirty = 1, lastSt = 0
    function mkSh() { var s = [], i; for (i = 0; i < 8; i++) s.push(0.78 + Math.random() * 0.42); return s.map(function (v, i) { return (v + s[(i + 1) % 8] + s[(i + 7) % 8]) / 3 * 1.08 }) }
    function blob(c, rx, ry, sh) {
      var n = 8, i, p = [], m
      for (i = 0; i < n; i++) p.push([rx * sh[i] * Math.cos(i * 6.2832 / n), ry * sh[i] * Math.sin(i * 6.2832 / n)])
      c.moveTo((p[n - 1][0] + p[0][0]) / 2, (p[n - 1][1] + p[0][1]) / 2)
      for (i = 0; i < n; i++) { m = p[(i + 1) % n]; c.quadraticCurveTo(p[i][0], p[i][1], (p[i][0] + m[0]) / 2, (p[i][1] + m[1]) / 2) }
      c.closePath()
    }
    function mkD() { return { sh: mkSh(), x: Math.random() * W, y: Math.random() * H, r: 0.9 + Math.pow(Math.random(), 3) * 5.6, sl: 0, t: 0, mv: 1, v: 0, dist: 0, a: 0.72 + Math.random() * 0.28, rot: (Math.random() - 0.5) * 1.2 } }
    function drawDrop(c, q) {
      var r = q.r, ky = q.sl ? 1.7 : 1.12, rx = r * q.a * (q.sl ? 0.8 : 1), ry = r * ky
      c.save(); c.translate(q.x, q.y); c.rotate(q.sl ? 0 : q.rot)
      if (r < 1.5) {
        c.beginPath(); blob(c, rx, ry, q.sh); c.fillStyle = night ? "rgba(215,230,250,.55)" : "rgba(255,255,255,.75)"; c.fill()
        c.beginPath(); c.ellipse(0, ry * 0.5, rx, ry * 0.6, 0, 0, 3.1416); c.fillStyle = "rgba(0,0,0,.28)"; c.fill()
        c.restore(); return
      }
      c.beginPath(); c.ellipse(0.7, r * 0.3, rx * 1.05, ry, 0, 0, 6.2832); c.fillStyle = "rgba(0,0,0,.14)"; c.fill()
      c.beginPath(); blob(c, rx, ry, q.sh)
      if (bgc && r > 2) {
        c.save(); c.clip()
        c.rotate(-(q.sl ? 0 : q.rot)); var kk = 1.5 + Math.min(r, 6) * 0.12
        c.scale(-kk, -kk); c.drawImage(bgc, -q.x, -q.y, W, H)
        c.restore()
      } else { c.fillStyle = night ? "rgba(200,220,245,.22)" : "rgba(255,255,255,.35)"; c.fill() }
      var gr = c.createRadialGradient(0, -ry * 0.15, Math.min(rx, ry) * 0.5, 0, 0, Math.max(rx, ry))
      gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,.34)")
      c.beginPath(); blob(c, rx, ry, q.sh); c.fillStyle = gr; c.fill()
      c.lineWidth = Math.max(0.5, r * 0.14); c.strokeStyle = "rgba(0,0,0,.4)"
      c.beginPath(); c.ellipse(0, 0, rx * 0.95, ry * 0.95, 0, -0.3, 2.4); c.stroke()
      c.strokeStyle = "rgba(255,255,255,.8)"
      c.beginPath(); c.ellipse(0, 0, rx * 0.8, ry * 0.8, 0, 3.4, 4.8); c.stroke()
      c.strokeStyle = "rgba(255,255,255,.55)"
      c.beginPath(); c.ellipse(0, 0, rx * 0.7, ry * 0.7, 0, 0.5, 1.5); c.stroke()
      c.beginPath(); c.arc(-rx * 0.35, -ry * 0.4, Math.max(0.6, r * 0.17), 0, 6.2832); c.fillStyle = "rgba(255,255,255,.95)"; c.fill()
      c.restore()
    }
    function mkL(first) {
      var z = Math.pow(Math.random(), 1.2)
      return { x: Math.random() * W, y: first ? Math.random() * H : -40 - Math.random() * 80, z: z, sz: 20 + z * 36, vy: 34 + z * 70 + Math.random() * 14, ph: Math.random() * 6.28, fr: 0.5 + Math.random() * 0.9, am: 14 + z * 26, rot: Math.random() * 6.28, rs: (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 1.6), tf: 1.2 + Math.random() * 2, sh: 0, c: cols[Math.floor(Math.random() * cols.length)], a: 0.92 + 0.08 * z }
    }
    function mkR(first) {
      var z = Math.random()
      return { x: Math.random() * (W + 80) - 40, y: first ? Math.random() * H : -30, z: z, vy: 520 + z * 480, l: 9 + z * 17 }
    }
    fit()
    for (i = 0; i < NL; i++) lv.push(mkL(true))
    for (i = 0; i < NR; i++) rn.push(mkR(true))
    lv.sort(function (p, q) { return p.z - q.z })
    var t0 = 0
    SNOW.el = host
    function frame(ts) {
      if (!host.isConnected || SNOW.el !== host) return
      SNOW.raf = requestAnimationFrame(frame)
      if (document.hidden) { t0 = 0; return }
      var dt = t0 ? Math.min(0.05, (ts - t0) / 1000) : 0.016
      t0 = ts
      if (host.clientWidth !== W || host.clientHeight !== H) fit()
      if (!t00) t00 = ts
      var age = (ts - t00) / 1000, wet = Math.min(1, age / 50)
      if (svg0) svg0.style.filter = "blur(" + (0.6 + wet * 0.9).toFixed(2) + "px)"
      var tm = ts / 1000, wind = 26 + Math.sin(tm * 0.21) * 22 + Math.sin(tm * 0.67) * 9
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)
      g.strokeStyle = night ? "rgb(190,210,240)" : "rgb(85,105,135)"
      g.lineCap = "round"
      for (var k = 0; k < rn.length; k++) {
        var d = rn[k]
        d.y += d.vy * dt; d.x -= 0
        if (d.y > H + 30) { d.y = -30; d.x = Math.random() * (W + 80) - 40 }
        var sl = 0.2 + wind / 260
        g.globalAlpha = 0.12 + 0.26 * d.z; g.lineWidth = 0.7 + d.z * 0.8
        g.beginPath(); g.moveTo(d.x, d.y); g.lineTo(d.x - d.l * sl, d.y - d.l); g.stroke()
      }
      g.globalAlpha = 1
      if (MAXD) {
        var want = Math.round(MAXD * wet * wet * (3 - 2 * wet)), q, s2, m, sp = 0
        while (dd.length < want && sp++ < 6) { dd.push(mkD()); dirty = 1 }
        if ((++fc & 3) === 0) { tg.globalCompositeOperation = "destination-out"; tg.fillStyle = "rgba(0,0,0,0.05)"; tg.fillRect(0, 0, trc.width, trc.height); tg.globalCompositeOperation = "source-over" }
        tg.setTransform(dpr, 0, 0, dpr, 0, 0); tg.lineCap = "round"; tg.strokeStyle = night ? "rgba(210,225,245,.14)" : "rgba(255,255,255,.34)"
        for (k = dd.length - 1; k >= 0; k--) {
          q = dd[k]
          if (!q.sl) { if (q.r > 3.4 && Math.random() < dt * 0.02 * wet) { q.sl = 1; q.t = 0.3; q.mv = 1; dirty = 1 } continue }
          q.t -= dt
          if (q.t < 0) { q.mv = !q.mv; q.t = q.mv ? 0.35 + Math.random() * 1.2 : 0.2 + Math.random() * 0.9 }
          if (q.mv) {
            var vt = 40 + q.r * 16, py = q.y, px = q.x
            q.v += (vt - q.v) * Math.min(1, dt * 3)
            q.y += q.v * dt; q.x += Math.sin(q.y * 0.07 + k) * 6 * dt
            q.r -= dt * 0.22; q.dist += q.v * dt
            tg.strokeStyle = "rgba(0,0,0,.1)"; tg.lineWidth = Math.max(1.2, q.r * 0.7); tg.beginPath(); tg.moveTo(px, py); tg.lineTo(q.x, q.y); tg.stroke(); tg.strokeStyle = night ? "rgba(210,225,245,.2)" : "rgba(255,255,255,.45)"; tg.lineWidth = Math.max(0.7, q.r * 0.4); tg.beginPath(); tg.moveTo(px, py); tg.lineTo(q.x, q.y); tg.stroke()
            if (q.dist > 12 + Math.random() * 10) { q.dist = 0; if (dd.length < MAXD + 120) { dd.push({ x: q.x + (Math.random() - 0.5) * q.r, y: q.y - q.r, r: 0.7 + Math.random() * 1.2, sl: 0, t: 0, mv: 1, v: 0, dist: 0, a: 0.85, rot: 0, sh: mkSh() }); dirty = 1 } }
            for (m = dd.length - 1; m >= 0; m--) { s2 = dd[m]; if (s2 !== q && !s2.sl && Math.abs(s2.y - q.y) < q.r + s2.r && Math.abs(s2.x - q.x) < q.r + s2.r) { q.r = Math.min(6.2, Math.sqrt(q.r * q.r + s2.r * s2.r * 0.8)); dd.splice(m, 1); if (m < k) k--; dirty = 1 } }
          } else q.v = 0
          if (q.r < 1.8 || q.y > H + 12) { dirty = 1; if (q.y > H + 12) dd.splice(k, 1); else { q.sl = 0; q.r = 1.8 } }
        }
        if (dirty && ts - lastSt > 140) { dirty = 0; lastSt = ts; sg.setTransform(dpr, 0, 0, dpr, 0, 0); sg.clearRect(0, 0, W, H); for (k = 0; k < dd.length; k++) if (!dd[k].sl) drawDrop(sg, dd[k]) }
        g.globalAlpha = 1; g.drawImage(trc, 0, 0, W, H); g.drawImage(stc, 0, 0, W, H)
        for (k = 0; k < dd.length; k++) if (dd[k].sl) drawDrop(g, dd[k])
      }
      for (k = 0; k < lv.length; k++) {
        var f = lv[k]
        f.y += f.vy * dt
        f.x += (wind * (0.5 + f.z) + Math.cos(tm * f.fr + f.ph) * f.am) * dt
        f.rot += f.rs * dt
        if (f.y > H + 40 || f.x > W + 60) { var n = mkL(false); n.x = f.x > W + 60 ? -30 : Math.random() * W; lv[k] = n; f = n }
        g.globalAlpha = f.a
        g.save(); g.translate(f.x, f.y); g.rotate(f.rot)
        g.scale(0.3 + 0.7 * Math.abs(Math.cos(tm * f.tf + f.ph)), 1)
        g.drawImage(leafSprite(f.sh, f.c), -f.sz / 2, -f.sz / 2, f.sz, f.sz)
        g.restore()
      }
      g.globalAlpha = 1
    }
    SNOW.raf = requestAnimationFrame(frame)
  }
  var FLKIMG = null, FLKS = {}
  function flakeTinted(night) {
    var k = night ? "n" : "d"
    if (FLKS[k]) return FLKS[k]
    if (!FLKIMG || !FLKIMG.complete || !FLKIMG.naturalWidth) return null
    var c = document.createElement("canvas"); c.width = FLKIMG.naturalWidth; c.height = FLKIMG.naturalHeight
    var g = c.getContext("2d")
    g.drawImage(FLKIMG, 0, 0)
    g.globalCompositeOperation = "source-atop"
    g.fillStyle = night ? "rgba(255,255,255,.55)" : "rgba(70,110,185,.38)"
    g.fillRect(0, 0, c.width, c.height)
    return (FLKS[k] = c)
  }
  var SNOW = { raf: 0, el: null }
  function snowStart(host, night) {
    snowStop()
    if (!FLKIMG) { FLKIMG = new Image(); FLKIMG.src = "flake.webp?v=1" }
    var cv = document.createElement("canvas"); cv.className = "snw"; host.appendChild(cv)
    var g = cv.getContext("2d"), W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), fl = [], i
    var red = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    var N = red ? 30 : (window.innerWidth < 500 ? 90 : 130)
    function fit() { W = host.clientWidth || window.innerWidth; H = host.clientHeight || window.innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr) }
    function mk(first) {
      var z = Math.pow(Math.random(), 1.35)
      return { x: Math.random() * W, y: first ? Math.random() * H : -40 - Math.random() * 60, z: z, sz: 5 + z * 16, vy: 46 + z * 120 + Math.random() * 20, a: 0.42 + 0.55 * z, ph: Math.random() * 6.28, fr: 0.35 + Math.random() * 0.8, am: 4 + z * 12, rot: Math.random() * 6.28, rs: (Math.random() < 0.5 ? -1 : 1) * (0.7 + Math.random() * 1.5) * (1 - z * 0.3), tl: Math.random() < 0.4 ? 0.5 + Math.random() * 0.8 : 0, ty: 0 }
    }
    fit()
    for (i = 0; i < N; i++) fl.push(mk(true))
    fl.sort(function (p, q) { return p.z - q.z })
    var t0 = 0, cu = null, nextCu = 6000 + Math.random() * 6000, fv = document.createElement("canvas"), fg = fv.getContext("2d"), fvDirty = false
    fv.className = "snwf"; document.body.appendChild(fv); SNOW.fv = fv
    function fitF() { fv.width = Math.round(window.innerWidth * dpr); fv.height = Math.round(window.innerHeight * dpr) }
    fitF()
    function petPt() {
      if (!PET.el || !petOn() || PET.el.style.display === "none") return null
      var r = PET.el.getBoundingClientRect()
      return r.width ? { x: r.left + r.width / 2, y: r.top + 22 } : null
    }
    function closeUp(ts, dt) {
      if (!cu) {
        if (red || ts < nextCu) { if (fvDirty) { fg.setTransform(1, 0, 0, 1, 0, 0); fg.clearRect(0, 0, fv.width, fv.height); fvDirty = false } return }
        cu = { t: 0, x: window.innerWidth * (.18 + .64 * Math.random()), y: window.innerHeight * (.08 + .2 * Math.random()), ph: Math.random() * 6.28, rot: Math.random() * 6.28, rs: (Math.random() < .5 ? -1 : 1) * (.5 + Math.random() * .6) }
      }
      cu.t += dt; cu.rot += cu.rs * dt
      var T1 = 1.5, T2 = 1.7, sz, x, y, al, q, e
      if (cu.t < T1) {
        q = cu.t / T1; e = 1 - Math.pow(1 - q, 3)
        sz = 12 + 56 * e; x = cu.x + Math.sin(cu.t * 2.2 + cu.ph) * 12 * e; y = cu.y + 46 * e; al = .35 + .6 * e
        cu.ax = x; cu.ay = y
      } else {
        q = Math.min(1, (cu.t - T1) / T2); e = q * q
        var tg = petPt(), tx = tg ? tg.x : cu.ax + 24, ty = tg ? tg.y : window.innerHeight + 50
        sz = 68 - (tg ? 54 : 40) * e; x = cu.ax + (tx - cu.ax) * e + Math.sin(cu.t * 2.2 + cu.ph) * 10 * (1 - e); y = cu.ay + (ty - cu.ay) * e; al = .95 - (tg ? .15 : .3) * e
        if (q >= 1) {
          cu = null; nextCu = ts + 14000 + Math.random() * 20000
          if (tg && !PET.sad) petBub(tr("pet_snow"), 1600)
          fg.setTransform(1, 0, 0, 1, 0, 0); fg.clearRect(0, 0, fv.width, fv.height); fvDirty = false
          return
        }
      }
      fg.setTransform(dpr, 0, 0, dpr, 0, 0); fg.clearRect(0, 0, fv.width / dpr, fv.height / dpr)
      fg.globalAlpha = al; fg.save(); fg.translate(x, y); fg.rotate(cu.rot)
      var fi = flakeTinted(night); if (fi) fg.drawImage(fi, -sz / 2, -sz / 2, sz, sz)
      fg.restore(); fg.globalAlpha = 1; fvDirty = true
    }
    SNOW.el = host; SNOW.fl = fl; SNOW.night = night; SNOW.cap = null; SNOW.mk = mk
    function frame(ts) {
      if (!host.isConnected || SNOW.el !== host) { if (fv.isConnected && SNOW.fv !== fv) fv.remove(); return }
      SNOW.raf = requestAnimationFrame(frame)
      if (document.hidden) { t0 = 0; return }
      var dt = t0 ? Math.min(0.05, (ts - t0) / 1000) : 0.016
      t0 = ts
      if (host.clientWidth !== W || host.clientHeight !== H) fit()
      var tm = ts / 1000, wind = Math.sin(tm * 0.17) * 14 + Math.sin(tm * 0.53) * 6 + 8
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)
      for (var k = 0; k < fl.length; k++) {
        var f = fl[k]
        if (SNOW.cap === f) continue
        f.y += f.vy * dt * (red ? 0.5 : 1)
        f.x += (wind * (0.4 + f.z) + Math.cos(tm * f.fr + f.ph) * f.am * f.fr) * dt
        f.rot += f.rs * dt
        if (f.y > H + 40 || f.x > W + 60 || f.x < -60) { var n = mk(false); n.x = f.x > W + 60 ? -30 : Math.random() * W; fl[k] = n; f = n }
        g.globalAlpha = f.a
        g.save(); g.translate(f.x, f.y); g.rotate(f.rot)
        if (f.tl) g.scale(1, 0.62 + 0.38 * Math.abs(Math.cos(tm * f.tl + f.ph)))
        var fi = flakeTinted(night); if (fi) g.drawImage(fi, -f.sz / 2, -f.sz / 2, f.sz, f.sz)
        g.restore()
      }
      g.globalAlpha = 1
      if (fv.width !== Math.round(window.innerWidth * dpr)) fitF()
      closeUp(ts, dt)
    }
    SNOW.raf = requestAnimationFrame(frame)
  }
  function snowStop() { if (SNOW.fv) { SNOW.fv.remove(); SNOW.fv = null }; if (SNOW.raf) cancelAnimationFrame(SNOW.raf); SNOW.raf = 0; SNOW.el = null; SNOW.fl = null; SNOW.cap = null }
  function applyBg() {
    var root = document.documentElement, g = S.gender
    var v = g === "female" ? S.fbg : g === "male" ? S.mbg : ""
    if (!BGV[v] || (isImgBg(v) && !isPrem())) v = ""
    var night = effTheme() === "dark"
    var seaOn = S.bgmode === "season" && isPrem()
    root.setAttribute("data-bg", seaOn ? "season" : v)
    if (!seaOn && isImgBg(v) && v !== "winter2") root.setAttribute("data-tone", "d"); else root.removeAttribute("data-tone")
    var el = document.getElementById("mbg")
    if (seaOn) {
      if (!el) { el = document.createElement("div"); el.id = "mbg"; document.body.insertBefore(el, document.body.firstChild) }
      var sk = "sea-" + S.season + (night ? "n" : "d")
      if (el.getAttribute("data-k") !== sk || SNOW.el !== el) {
        el.setAttribute("data-k", sk)
        if (S.season === "autumn") { el.innerHTML = autumnScene(night); autumnStart(el, night) } else if (S.season === "spring") { el.innerHTML = springScene(night); springStart(el, night) } else if (S.season === "summer") { el.innerHTML = summerScene(night); summerStart(el, night) } else { el.innerHTML = winterScene(night); snowStart(el, night) }
      }
      return
    }
    snowStop()
    if (v) {
      if (!el) { el = document.createElement("div"); el.id = "mbg"; document.body.insertBefore(el, document.body.firstChild) }
      var k = v + (night ? "n" : "d")
      if (el.getAttribute("data-k") !== k) { el.setAttribute("data-k", k); el.innerHTML = '<img src="bg_' + (BGF[v] || v) + '.webp" alt="">' }
    } else if (el) el.remove()
  }
  function applyGender() {
    var root = document.documentElement, st = root.style
    applyFont()
    var ng = S.gender === "female" ? "female" : S.gender === "male" ? "male" : "auto"
    if (root.getAttribute("data-gender") && root.getAttribute("data-gender") !== ng) {
      root.classList.add("tsw"); clearTimeout(window._tsw); window._tsw = setTimeout(function () { root.classList.remove("tsw") }, 450)
    }
    root.setAttribute("data-gender", ng)
    var P = PINKS[S.fcolor | 0] || PINKS[0], M = MALES[S.mcolor | 0] || MALES[0]
    var fem = S.gender === "female"
    root.setAttribute("data-w", !fem && M.w ? "1" : "0")
    var gl = fem ? (S.fgl == null ? 100 : S.fgl) : (S.mgl == null ? 100 : S.mgl), bl = fem ? (S.fbl == null ? 2 : S.fbl) : (S.mbl == null ? 2 : S.mbl)
    var SO = fem ? (SOLF[S.fsol | 0] || SOLF[0]) : (SOLM[S.msol | 0] || SOLM[0])
    root.setAttribute("data-glass", gOn() ? "on" : "off")
    applyBg()
    st.setProperty("--sbl", SO[0]); st.setProperty("--scl", SO[1]); st.setProperty("--sbd", SO[2]); st.setProperty("--scd", SO[3])
    st.setProperty("--fa", P.a); st.setProperty("--fa2", P.a2)
    for (var i = 0; i < 3; i++) { st.setProperty("--fb" + (i + 1), P.b[i]); st.setProperty("--fd" + (i + 1), P.d[i]) }
    st.setProperty("--fh", P.h + "deg"); st.setProperty("--fbh", P.bh + "deg")
    st.setProperty("--gk", (1.65 - gl / 100 * 1.3).toFixed(2)); st.setProperty("--bk", (bl / 9).toFixed(2))
    st.setProperty("--ma", M.a); st.setProperty("--ma2", M.a2); st.setProperty("--ma3", M.a3); st.setProperty("--mh", M.h + "deg"); st.setProperty("--mat", M.t)
    bgFx()
    petalFx()
  }
  var HLC = [[235, 40, 40, .7], [255, 226, 0, .72], [20, 205, 90, .7], [30, 170, 255, .7], [255, 255, 255, .5]]
  var FONTS = [["", "Plus Jakarta Sans"], ["cutive", "Cutive Mono"], ["nova", "Nova Mono"], ["sono", "Sono"], ["serif", "Noto Serif"]]
  function applyFont() { document.documentElement.setAttribute("data-font", isPrem() ? (S.font || "") : "") }
  function sRow(title, inner, cls, extra) {
    return '<div class="srow' + (cls ? " " + cls : "") + '"><b>' + esc(title) + '</b><div class="sstrip"><div class="sin"><div class="sg">' + inner + '</div><div class="sg cp" aria-hidden="true">' + inner + '</div><div class="sg cp" aria-hidden="true">' + inner + "</div></div></div>" + (extra || "") + "</div>"
  }
  function sCenter() {
    var st = document.querySelectorAll(".sstrip")
    for (var i = 0; i < st.length; i++) {
      var sin = st[i].firstChild, gs = sin && sin.children; if (!gs || !gs[0]) continue
      sin.classList.remove("nl")
      var w = gs[0].offsetWidth
      if (w && w <= st[i].clientWidth - 6) { sin.classList.add("nl"); st[i].scrollLeft = 0; continue }
      var on = gs[1].querySelector(".on")
      st[i].scrollLeft = on ? Math.max(0, on.offsetLeft + on.offsetWidth - st[i].clientWidth + 18) : w
    }
  }
  function sWrap(t) {
    var sin = t.firstChild, w = sin && sin.children[0] ? sin.children[0].offsetWidth : 0
    if (!w || sin.classList.contains("nl")) return
    if (t.scrollLeft < w * 0.5) t.scrollLeft += w
    else if (t.scrollLeft > w * 1.5) t.scrollLeft -= w
  }
  function hlPill() {
    var h = "", cur = isPrem() ? (S.hlc | 0) : 0
    for (var i = 0; i < HLC.length; i++) h += '<button class="sws' + (i === 4 ? " wh" : "") + (i === cur ? " on" : "") + ((i && !isPrem()) ? " lk" : "") + '" data-act="hlc" data-v="' + i + '" style="--c:rgb(' + HLC[i][0] + "," + HLC[i][1] + "," + HLC[i][2] + ')" aria-label="color"></button>'
    return sRow(tr("t_hl"), h)
  }
  function fontRow() {
    var h = "", cf = isPrem() ? (S.font || "") : ""
    for (var i = 0; i < FONTS.length; i++) h += '<button class="sch' + (cf === FONTS[i][0] ? " on" : "") + (i && !isPrem() ? " lk" : "") + '" data-act="font" data-v="' + FONTS[i][0] + '" style="font-family:\'' + FONTS[i][1] + '\', sans-serif">' + (i && !isPrem() ? ic("lock") : "") + (i === 0 ? esc(tr("t_bg0")) : FONTS[i][1]) + "</button>"
    return sRow(tr("t_font"), h)
  }
  var BGK = ["", "mosque", "mosque2", "mosque3", "winter1", "winter2", "winter3", "quran", "gold", "cream"], BGL = [["t_bg0", "d", ""], ["t_bg1", "m1", " 1"], ["t_bg1", "m2", " 2"], ["t_bg1", "m3", " 3"], ["t_bg4", "w1", " 1"], ["t_bg4", "w2", " 2"], ["t_bg4", "w3", " 3"], ["t_bg5", "q", ""], ["t_bg2", "g", ""], ["t_bg3", "c", ""]]
  var MDK = ["auto", "light", "dark"]
  function modeGlobeHtml() {
    if (S.theme !== "auto") return ""
    return '<div class="globe"><canvas id="gl"></canvas><div id="gtxt" class="gtxt"></div><button class="btn small' + (S.tz ? "" : " success") + '" data-act="tzDev">' + esc(tr("tz_dev")) + '</button><p class="ginfo">' + ic("info") + " <span>" + esc(tr("tz_hint")) + "</span></p></div>"
  }
  function mdInit() {
    var el = document.getElementById("mdw"); if (!el || el._in) return
    el._in = 1
    var N = 3, COP = 9, MID = 4, h = ""
    for (var c = 0; c < COP; c++) for (var j = 0; j < N; j++) h += '<button class="hsw-i" data-i="' + j + '">' + ic(THEME_ICONS[MDK[j]]) + "<span>" + esc(tr("th_" + MDK[j])) + "</span></button>"
    el.innerHTML = h
    var items = el.children, timer = 0, ready = false, last = MDK.indexOf(S.theme)
    function step() { return items[1].offsetLeft - items[0].offsetLeft }
    function jump(i) { el.style.scrollSnapType = "none"; el.scrollLeft = (MID * N + i) * step(); void el.offsetWidth; el.style.scrollSnapType = "" }
    function mark(i) { for (var k = 0; k < items.length; k++) items[k].classList.toggle("on", k % N === i) }
    function place() { if (!el.isConnected || !el.clientWidth) return requestAnimationFrame(place); jump(last); mark(last); setTimeout(function () { ready = true }, 150) }
    requestAnimationFrame(place)
    el.addEventListener("scroll", function () {
      if (!ready || !el.isConnected || !el.clientWidth) return
      var p = Math.round(el.scrollLeft / step()), i = ((p % N) + N) % N
      mark(i)
      clearTimeout(timer)
      timer = setTimeout(function () {
        if (i !== last) {
          last = i; haptic("light"); S.theme = MDK[i]; save(); applyTheme()
          if (wheels.theme) wheels.theme.set(THEMES.indexOf(S.theme), true)
          var g = document.getElementById("mglobe"); if (g) { g.innerHTML = modeGlobeHtml(); if (S.theme === "auto") startGlobe() }
        }
        if (p < N * 2 || p > N * (COP - 2)) jump(i)
      }, 130)
    })
    el.addEventListener("click", function (e) {
      var it = e.target.closest && e.target.closest(".hsw-i"); if (!it) return
      var idx = Array.prototype.indexOf.call(items, it)
      el.scrollTo({ left: idx * step(), behavior: "smooth" })
    })
  }
  function hswHtml(kind) {
    var h = '<div class="hsw" data-k="' + kind + '">', i, cur
    if (kind === "g") {
      cur = S.gender === "female" ? 2 : S.gender === "male" ? 1 : 0
      for (i = 0; i < 3; i++) h += '<button class="hsw-i' + (i === cur ? " on" : "") + '" data-i="' + i + '">' + ic(TICONS[i]) + "<span>" + esc(tr(TLAB[i])) + "</span></button>"
    } else {
      var bgc = (S.gender === "female" ? S.fbg : S.mbg) || ""
      cur = Math.max(0, BGK.indexOf(bgc))
      for (i = 0; i < BGK.length; i++) h += '<button class="hsw-i' + (i === cur ? " on" : "") + '" data-i="' + i + '"><i class="bgp ' + BGL[i][1] + '"></i><span>' + esc(tr(BGL[i][0]) + BGL[i][2]) + "</span></button>"
    }
    return h + "</div>"
  }
  function hswCur(kind) {
    if (kind === "g") return S.gender === "female" ? 2 : S.gender === "male" ? 1 : 0
    return Math.max(0, BGK.indexOf((S.gender === "female" ? S.fbg : S.mbg) || ""))
  }
  function hswInit() {
    sCenter()
    var els = document.querySelectorAll(".hsw")
    for (var q = 0; q < els.length; q++) (function (el) {
      if (el._in) return
      el._in = 1
      var kind = el.getAttribute("data-k"), items = el.children, timer = 0, ready = false
      function step() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 120 }
      function setScroll(smooth) { el.scrollTo({ left: hswCur(kind) * step(), behavior: smooth ? "smooth" : "auto" }) }
      function place() { if (!el.isConnected || !el.clientWidth) return requestAnimationFrame(place); setScroll(false); setTimeout(function () { ready = true }, 120) }
      requestAnimationFrame(place)
      el.addEventListener("scroll", function () {
        if (!ready || !el.isConnected || !el.clientWidth) return
        var idx = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / step())))
        for (var i = 0; i < items.length; i++) items[i].classList.toggle("on", i === idx)
        clearTimeout(timer)
        timer = setTimeout(function () {
          if (idx === hswCur(kind)) return
          haptic("light")
          if (kind === "g") { S.gender = TKEYS[idx]; applyGender(); save(); tOptsRefresh() }
          else { if (S.gender === "female") S.fbg = BGK[idx]; else S.mbg = BGK[idx]; save(); applyGender() }
        }, 130)
      })
      el.addEventListener("click", function (e) {
        var it = e.target.closest && e.target.closest(".hsw-i"); if (!it) return
        el.scrollTo({ left: parseInt(it.getAttribute("data-i"), 10) * step(), behavior: "smooth" })
      })
    })(els[q])
  }
  function tOptsRefresh() {
    var o = document.getElementById("themeOpts"); if (!o) return
    o.innerHTML = themeOpts(); hswInit()
  }
  function themeOpts() {
    var i, fem = S.gender === "female", mal = S.gender === "male", gc = "", bc = "", cc = ""
    var gcur = fem ? 2 : mal ? 1 : 0
    for (i = 0; i < 3; i++) gc += '<button class="sch' + (i === gcur ? " on" : "") + '" data-act="sgen" data-v="' + i + '">' + ic(TICONS[i]) + esc(tr(TLAB[i])) + "</button>"
    var out = '<div class="srows">' + sRow(tr("t_gen"), gc)
    var sea = S.bgmode === "season" && isPrem(), sc2 = ""
    var SEA = [["spring", "s_spr"], ["summer", "s_sum"], ["autumn", "s_aut"], ["winter", "t_bg4"]]
    for (i = 0; i < SEA.length; i++) sc2 += '<button class="sch' + (S.season === SEA[i][0] ? " on" : "") + '" data-act="sseason" data-v="' + SEA[i][0] + '">' + esc(tr(SEA[i][1])) + "</button>"
    var stg = '<div class="hptg stg" role="group"><button data-act="bgmode" data-v="plain" class="' + (sea ? "" : "on") + '">' + esc(tr("t_plain")) + '</button><button data-act="bgmode" data-v="season" class="' + (sea ? "on" : "") + '">' + (isPrem() ? "" : ic("lock") + " ") + esc(tr("t_seas")) + "</button></div>"
    if (!fem && !mal) return out + sRow(tr("t_bgn"), sea ? sc2 : '<button class="sch on" data-act="sbg" data-v=""><i class="bgp d"></i>' + esc(tr("t_bg0")) + "</button>", "hastg", stg) + fontRow() + "</div>"
    var bgc = (fem ? S.fbg : S.mbg) || ""
    if (isImgBg(bgc) && !isPrem()) bgc = ""
    for (i = 0; i < BGK.length; i++) bc += '<button class="sch' + (BGK[i] === bgc ? " on" : "") + (isImgBg(BGK[i]) && !isPrem() ? " lk" : "") + '" data-act="sbg" data-v="' + BGK[i] + '"><i class="bgp ' + BGL[i][1] + '"></i>' + esc(tr(BGL[i][0]) + BGL[i][2]) + "</button>"
    var arr = fem ? PINKS : MALES, cur = (fem ? S.fcolor : S.mcolor) | 0, act = fem ? "fcolor" : "mcolor"
    for (i = 0; i < arr.length; i++) cc += '<button class="sws' + (arr[i].w ? " wh" : "") + (i === cur ? " on" : "") + '" data-act="' + act + '" data-v="' + i + '" style="--c:' + arr[i].a + '" aria-label="color"></button>'
    var on = gOn(), dk = effTheme() === "dark"
    out += sRow(tr("t_bgn"), sea ? sc2 : bc, "hastg", stg) + sRow(tr("t_color"), cc) + fontRow() + "</div>" +
      '<div class="card tpill col"><div class="tl"><span>' + esc(tr("t_gon")) + '</span><button class="tgl' + (on ? " on" : "") + '" data-act="gtoggle" aria-label="glass"><i></i></button></div>'
    if (on) {
      var gl = fem ? (S.fgl == null ? 100 : S.fgl) : (S.mgl == null ? 100 : S.mgl), bl = fem ? (S.fbl == null ? 2 : S.fbl) : (S.mbl == null ? 2 : S.mbl)
      out += '<div class="topt"><div class="tl"><span>' + esc(tr("t_glass")) + '</span><span id="fglv">' + gl + '</span></div><input id="fglr" class="rng" type="range" min="0" max="100" value="' + gl + '"></div>' +
        '<div class="topt"><div class="tl"><span>' + esc(tr("t_blur")) + '</span><span id="fblv">' + bl + '</span></div><input id="fblr" class="rng" type="range" min="0" max="24" value="' + bl + '"></div>'
    } else {
      var SL = fem ? SOLF : SOLM, sc = (fem ? S.fsol : S.msol) | 0, sh = ""
      for (i = 0; i < SL.length; i++) sh += '<button class="sws' + (i === sc ? " on" : "") + '" data-act="gsol" data-v="' + i + '" style="--c:' + (dk ? SL[i][3] : SL[i][0]) + '" aria-label="color"></button>'
      out += '<div class="topt"><div class="tl"><span>' + esc(tr("t_solid")) + '</span></div><div class="swrow">' + sh + "</div></div>"
    }
    return out + "</div>"
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
        tOptsRefresh()
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
    applyBg()
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

    var IWc = 0, OL0 = -1
    function iw() { return IWc || (IWc = items[0].offsetWidth) }
    function ol0() { if (OL0 < 0) OL0 = items[0].offsetLeft; return OL0 }
    window.addEventListener("resize", function () { IWc = 0; OL0 = -1 })
    function absPos() { return Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / iw()))) }
    function idxOf(p) { return ((p % N) + N) % N }
    function paint() {
      raf = 0
      var w = iw(), mid = track.scrollLeft + track.clientWidth / 2
      var o0 = ol0(), center = Math.round((mid - o0 - w / 2) / w)
      var from = Math.max(0, center - 3), to = Math.min(items.length - 1, center + 3)
      for (var i = from; i <= to; i++) {
        var d = (o0 + i * w + w / 2 - mid) / w
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

  // ===== effektlar soati: 11s yoyiq / 11s qisqa =====
  var FXP = 11000, FX = { c: false, t: null, exp: 0, n: 0 }
  function fxOn() { return false && S.fx !== false && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) }
  function fxLayout() {
    var hd = document.getElementById("hdr"), br = document.getElementById("home")
    if (hd && br) hd.style.width = FX.c ? (br.offsetWidth + 36) + "px" : ""
    var sb = document.getElementById("sbox"), nt = document.querySelector(".nh-t")
    if (sb && nt) {
      var rtl = document.documentElement.dir === "rtl", a = nt.getBoundingClientRect(), b = sb.getBoundingClientRect()
      sb.style.setProperty("--sw", Math.round(a.width) + "px")
      sb.style.setProperty("--sx", Math.round(rtl ? a.right - b.right : a.left - b.left) + "px")
    }
  }
  function fxSet(c) { if (!c && FX.c) { FX.exp = performance.now(); FX.n++ } FX.c = c; document.documentElement.classList.toggle("fxc", c); fxLayout() }
  function fxLoop() {
    clearTimeout(FX.t)
    if (!fxOn()) { fxSet(false); return }
    FX.t = setTimeout(function () { if (!document.hidden) fxSet(!FX.c); fxLoop() }, FXP)
  }
  window.addEventListener("resize", fxLayout)
  if (window.ResizeObserver) { var fxRO = new ResizeObserver(function () { fxLayout() }); setInterval(function () { var n = document.querySelector(".nh-t"); if (n && n !== fxRO.__n) { fxRO.disconnect(); fxRO.observe(n); fxRO.__n = n } }, 1000) }
  function initHeader() {
    var langLabels = []
    var SHORT = { uz: "O'zbek", uz_kr: "Ўзбек", uz_new: "Özbek", ru: "Русский", en: "English", ar: "العربية", tr: "Türkçe", id: "Indonesia", zh: "中文", hi: "हिन्दी", es: "Español" }
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
      if (fxOn()) { cs = FX.exp; d = ts - FX.exp; dir = (FX.n % 2) ? 1 : -1 }
      // barmoq tegsa to'xtaydi; qo'yilgach 3s o'tib, keyingi 99 hisobi boshlanishida birga davom etadi
      var ok = !document.hidden && !FX.c && CLK.tc === 0 && cs >= CLK.block
      if (ok && d < 3000) {
        var f = 1 - Math.pow(1 - d / 3000, 2)
        wheels.lang.spin(f, dir); wheels.theme.spin(f, dir); spinning = true
      } else if (spinning) { wheels.lang.spinEnd(); wheels.theme.spinEnd(); spinning = false }
    }
    FX.exp = performance.now()
    requestAnimationFrame(hs)
    fxLoop()
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

    if (act === "tab") goTab(v)
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
      var sd0 = stDay(); sd0.md[v] = (sd0.md[v] || 0) + 1
      U.moodPick = v; save(); render()
    }
    else if (act === "moodAgain") { U.moodPick = ""; render() }
    else if (act === "moodPage") { U.moodPage = parseInt(v, 10); render() }
    else if (act === "namesToggle") {
      armAuto("namesOpen", "#ntog")
      U.namesOpen = !U.namesOpen
      var ng2 = document.getElementById("ngrid")
      if (ng2) ng2.classList.toggle("open", U.namesOpen)
      var nt2 = document.getElementById("ntog")
      if (nt2) nt2.innerHTML = ic(U.namesOpen ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.namesOpen ? "mood_less" : "mood_all")) + "</span>"
      nsUpdate(); setTimeout(nsUpdate, 250); setTimeout(nsUpdate, 520)
    }
    else if (act === "hlay") { S.hlay = v === "list" ? "list" : "grid"; save(); render() }
    else if (act === "wgClose") goBack()
    else if (act === "wgName") { U.detail = parseInt(v, 10); U.dpanel = ""; U.dir = ""; U.mexp = false; render(); window.scrollTo(0, 0) }
    else if (act === "jrOpen") { U.jr = "main"; render(); window.scrollTo(0, 0) }
    else if (act === "jrClose") goBack()
    else if (act === "jrCards") { U.jr = "cards"; render(); window.scrollTo(0, 0) }
    else if (act === "wdGo") { U.jr = ""; U.jrRet = false; U.tab = "more"; U.more = "robot"; U.hikBack = false; U.detail = 0; U.wd = null; render(); window.scrollTo(0, 0) }
    else if (act === "jrCard") { U.detail = parseInt(v, 10); U.dpanel = ""; U.dir = ""; U.mexp = false; render(); window.scrollTo(0, 0) }
    else if (act === "jrQ") { if (v === "a") { U.detail = jrName() + 1; U.dlock = true; U.dpanel = ""; U.dir = ""; U.mexp = false } else if (v === "g") { U.wg = true; U.wgOne = true } else { U.jrRet = true; U.jrTab = U.tab; U.jr = ""; U.tab = "daily" } render(); window.scrollTo(0, 0) }
    else if (act === "wdCat") { var u0 = wdU(); u0.cat = v; u0.sel = ""; wdPaint() }
    else if (act === "wdSel") { var u1 = wdU(); u1.sel = u1.sel === v ? "" : v; wdPaint(); haptic("light") }
    else if (act === "wdRst") { wdU().sel = ""; wdPaint() }
    else if (act === "wdAct") wdAct()
    else if (act === "mnOpen" && !v) { }
    else if (act === "mnOpenPage") { if (!isPrem()) { pToast(tr("pm_need")); return } MN.m = -1; U.mn = true; render(); window.scrollTo(0, 0) }
    else if (act === "mnClose") { U.mn = false; MN.m = -1; render(); window.scrollTo(0, 0) }
    else if (act === "mnPick") { mnPick(parseInt(v, 10) || 0); render() }
    else if (act === "mnFav") { S.favs = S.favs || {}; S.favs[MN.n] = !S.favs[MN.n]; save(); render() }
    else if (act === "mnOpen") { U.detail = parseInt(v, 10); U.dpanel = ""; U.dir = ""; U.mexp = false; render(); window.scrollTo(0, 0) }
    else if (act === "achOpen") { if (!isPrem()) { pToast(tr("pm_need")); return } U.ach = true; render(); window.scrollTo(0, 0) }
    else if (act === "achClose") { U.ach = false; render(); window.scrollTo(0, 0) }
    else if (act === "achGet") { var ai = parseInt(v, 10); S.ach = S.ach || {}; if (ACH[ai] && !S.ach[ai] && achVal(ACH[ai][0]) >= ACH[ai][1]) { S.ach[ai] = 1; jrS().nur += ACH[ai][2]; save(); haptic("heavy"); render() } }
    else if (act === "mmOpen") { if (!isPrem()) { pToast(tr("pm_need")); return } MM.g = null; U.mm = true; render(); window.scrollTo(0, 0) }
    else if (act === "mmClose") { U.mm = false; MM.g = null; render(); window.scrollTo(0, 0) }
    else if (act === "mmMenu") { MM.g = null; render() }
    else if (act === "mmStart") { mmStart(parseInt(v, 10) || 0); render() }
    else if (act === "mmTap") mmTap(parseInt(v, 10))
    else if (act === "wgOpen") { U.wg = true; U.wgOne = false; render(); window.scrollTo(0, 0) }
    else if (act === "waqOpen") { U.waq = true; render(); window.scrollTo(0, 0) }
    else if (act === "waqClose") { U.waq = false; render(); window.scrollTo(0, 0) }
    else if (act === "waqStart") { var w0 = wq(); S.wq = { on: true, level: 1, debt: 0, dd: [], dd0: [], draft: 0, done: false, last: todayStr(), d0: 0, read: 0, total: 0, bonus: 0, fin: false }; save(); render() }
    else if (act === "waqTap") { if (!wq().fin) { wqTap(); wqPaint() } }
    else if (act === "pmxSet") { S.pmx = v ? { mode: v, until: Date.now() + 600000 } : null; save(); applyGender(); render() }
    else if (act === "waqPg") { var pg = document.querySelector(".wqpg"); if (pg) pg.scrollTo({ left: pg.clientWidth * (+v || 0), behavior: "smooth" }) }
    else if (act === "waqReset") { if (window.confirm(tr("waq_resetq"))) { S.wq = null; save(); render() } }
    else if (act === "hikmat") {
      var dt = new Date(), dn = Math.floor((Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()) - Date.UTC(dt.getFullYear(), 0, 0)) / 864e5)
      U.tab = "more"; U.more = "quote"; U.quoteIdx = dn % D.quotes.length; U.hikBack = true; render()
    }
    else if (act === "meanTog") {
      armAuto("mexp", ".mtog")
      U.mexp = !U.mexp
      var mt = document.querySelector("#slide .mt")
      if (mt) mt.classList.toggle("open", U.mexp)
      el.innerHTML = ic(U.mexp ? "expand_less" : "expand_more") + " <span>" + esc(tr(U.mexp ? "mood_less" : "more_t")) + "</span>"
    }
    else if (act === "moodToggle") {
      armAuto("moodOpen", '[data-act="moodToggle"]')
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
        S.daily = { mode: "free", target: 100, step: 1, owedDays: 0, draft: old.mode === "free" ? (old.draft || 0) : 0, count: old.count || 0, lastCheckedDate: todayStr(), todayDone: false, gdDate: old.mode === "free" ? (old.gdDate || "") : (old.todayDone ? (old.lastCheckedDate || todayStr()) : ""), gdOwed: old.mode === "free" ? (old.gdOwed || 0) : (old.owedDays || 0), gdDraft: old.mode === "free" ? (old.gdDraft || 0) : (old.draft || 0), gdTarget: old.mode === "free" ? (old.gdTarget || 0) : (old.target || 0) }
        U.dmode = ""; U.dailyMenu = false; save(); render(); return
      }
      if (!t || t < 1) { toast("⚠️"); return }
      U.dmode = ""
      var fr = old.mode === "free"
      S.daily = { mode: "goal", target: Math.min(t, 999999), step: st, owedDays: fr ? (old.gdOwed || 0) : (old.owedDays || 0), draft: fr ? (old.gdDraft || 0) : (old.draft || 0), lastCheckedDate: todayStr(), todayDone: fr ? old.gdDate === todayStr() : !!old.todayDone }
      U.dailyMenu = false; save(); render()
    }
    else if (act === "stR") { if (v === "7" && !isPrem()) pToast(tr("st_lock")); else { U.stR = parseInt(v, 10); stPaint() } }
    else if (act === "pmTrial") {
      if (!trCan()) { toast(tr("pm_nolimit")); return }
      var tn = Date.now(), tr0 = (S.trial && S.trial.log) || []
      S.trial = { until: tn + PM_TRIAL, log: tr0.filter(function (x) { return x >= tn - 7 * 86400000 }).concat([tn]) }
      save(); toast(tr("pm_trial_on")); stPaint()
    }
    else if (act === "stDev") { clearTimeout(ST.devT); ST.dev++; ST.devT = setTimeout(function () { ST.dev = 0 }, 1500); if (ST.dev >= 5) { ST.dev = 0; U.tab = "more"; U.more = "pmx"; render(); window.scrollTo(0, 0) } }
    else if (act === "dview") { S.dview = v; save(); render() }
    else if (act === "fxt") { S.fx = S.fx === false; save(); fxLoop(); render() }
    else if (act === "petT") { S.pet = S.pet === false; save(); petApply(); render() }
    else if (act === "dglass") { if (!isPrem()) pToast(tr("pm_need")); else { S.dglass = !S.dglass; save(); render() } }
    else if (act === "qbg") { if (isPrem()) { S.qbg = +v; save(); render() } }
    else if (act === "goalGo") goFeat("goal")
    else if (act === "bcNew") { U.bcf = null; U.more = "bcnew"; render(); window.scrollTo(0, 0) }
    else if (act === "bcImg") { var bf = document.getElementById("bcFile"); if (bf) bf.click() }
    else if (act === "bcSend") {
      var f = U.bcf || {}, any = false; for (var q in f.t) if (String(f.t[q]).trim()) any = true
      if (!any) { toast(tr("bc_err")); return }
      hPost("/bc/create", { t: f.t, b: f.b, img: f.img || "", go: f.go || "" }).then(function (j) { if (!j || !j.ok) throw 0; toast(tr("bc_ok")); U.bcf = null; U.more = "notif"; bcSync(); render() }).catch(function () { toast(tr("bc_err")) })
    }
    else if (act === "bcDel") { hPost("/bc/del", { id: v }).then(function () { bcSync() }).catch(function () { toast(tr("bc_err")) }) }
    else if (act === "petTip") { petBub(""); goFeat(v) }
    else if (act === "premGo") { document.getElementById("toast").className = "toast"; U.tab = "more"; U.more = "premium"; U.hikBack = false; U.detail = 0; render(); window.scrollTo(0, 0) }
    else if (act === "dailyMenu") { U.dailyMenu = !U.dailyMenu; U.dmode = ""; render() }
    else if (act === "dmode") { U.dmode = v; render() }
    else if (act === "tap") {
      dailyTick()
      var ds = S.daily
      if (ds.todayDone) return
      var cycles = 0
      stDay().sal += ds.step || 1
      jrZ(ds.step || 1)
      ds.draft = (ds.draft || 0) + (ds.step || 1)
      if (ds.mode === "free") ds.count = (ds.count || 0) + (ds.step || 1)
      while (ds.draft >= ds.target) {
        ds.draft -= ds.target
        cycles++
        if (ds.mode === "free") continue
        if (ds.owedDays > 0) ds.owedDays--; else ds.todayDone = true
      }
      if (ds.mode === "free" && ds.gdTarget > 0) {
        var gtd = todayStr()
        if (ds.gdDate !== gtd) {
          ds.gdDraft = (ds.gdDraft || 0) + (ds.step || 1)
          while (ds.gdDraft >= ds.gdTarget) {
            ds.gdDraft -= ds.gdTarget
            if (ds.gdOwed > 0) ds.gdOwed--
            else { ds.gdDate = gtd; ds.gdDraft = 0; cycles++; break }
          }
        }
      }
      if (cycles > 0) pmDone()
      save()
      if (S.dview === "tb") {
        tbTap(cycles); hgStats(false)
        if (cycles > 0) { try { tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success") } catch (e) {} setTimeout(render, 700) }
        return
      }
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
    else if (act === "chatSend") {
      var ctx = document.getElementById("chatTx"), ct = ctx ? ctx.value.trim() : ""
      if (U.hfile) {
        if (U.hup) return
        U.hup = 1; chStagePaint()
        hUpload(U.hfile, ct, function (ok) {
          U.hup = 0
          if (ok) { U.hfile = null; U.hfileUrl = ""; var cx = document.getElementById("chatTx"); if (cx) { cx.value = ""; cx.style.height = "auto" } var cp = document.getElementById("chPh"); if (cp) cp.classList.remove("hid") }
          chStagePaint()
        })
      }
      else if (ct) { ctx.value = ""; ctx.style.height = "auto"; var cp2 = document.getElementById("chPh"); if (cp2) cp2.classList.remove("hid"); hSend(ct) }
    }
    else if (act === "chAtt") { var cf = document.getElementById("chFile"); if (cf) cf.click() }
    else if (act === "chRm") { U.hfile = null; U.hfileUrl = ""; chStagePaint() }
    else if (act === "hinfo") { U.hinfo = !U.hinfo; chatPaint(false) }
    else if (act === "chDl") { var dm = { id: parseInt(v, 10) || 0 }; if (dm.id) { var du = hFUrl(dm, 1); if (tg && tg.openLink) { try { tg.openLink(du) } catch (e4) { window.open(du, "_blank") } } else window.open(du, "_blank") } }
    else if (act === "chImg") {
      var lb = document.createElement("div"); lb.className = "lbox"; lb.innerHTML = '<img src="' + v + '" alt=""><button aria-label="close">' + ic("close") + "</button>"
      lb.addEventListener("click", function () { lb.remove() }); document.body.appendChild(lb)
    }
    else if (act === "chatOpen") { U.hcUid = parseInt(v, 10) || 0; U.more = "help"; HCH.name = ""; for (var cq = 0; HCH.chats && cq < HCH.chats.length; cq++) if (HCH.chats[cq].uid === U.hcUid) HCH.name = HCH.chats[cq].name; HCH.msgs = []; HCH.pend = []; render(); window.scrollTo(0, 0) }
    else if (act === "chatDel") {
      var cdo = function () { hPost("/chat/del", { uid: U.hcUid }).then(function () { U.hcUid = 0; HCH.msgs = []; render(); window.scrollTo(0, 0) }).catch(function () {}) }
      if (tg && tg.showConfirm) tg.showConfirm(tr("h_delq"), function (ok) { if (ok) cdo() }); else if (window.confirm(tr("h_delq"))) cdo()
    }
    else if (act === "more") { U.more = v; if (v === "about") rateSync(false); if (v === "quote") U.quoteIdx = -1; render() }
    else if (act === "quoteNext") {
      var i = Math.floor(Math.random() * D.quotes.length)
      if (i === U.quoteIdx) i = (i + 1) % D.quotes.length
      quoteSwap(i)
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
    else if (act === "obLang") { S.lang = v; S.langSet = true; TCACHE = {}; save(); obRender() }
    else if (act === "obTz") { S.tz = ""; save(); applyTheme(); gText(); obChip(); obSync() }
    else if (act === "obCity") { S.tz = v; save(); applyTheme(); gText(); obChip(); obSync(); var cc = cityByName(v); if (cc && GGO) GGO(cc[1]) }
    else if (act === "obSkip") { U.ob = 3; obRender() }
    else if (act === "obNone") { haptic("light") }
    else if (act === "obNext") { obNext() }
    else if (act === "tzDev") { S.tz = ""; save(); applyTheme(); render() }
    else if (act === "setMode") { S.theme = v; save(); applyTheme(); if (wheels.theme) wheels.theme.set(THEMES.indexOf(v), true); render() }
    else if (act === "sgo") { var qq = document.getElementById("q"); if (qq) { qq.focus(); if (qq.value) qq.select() } }
    else if (act === "gtoggle") { if (S.gender === "female") S.fgon = !gOn(); else S.mgon = !gOn(); applyGender(); save(); tOptsRefresh() }
    else if (act === "font") { if (v && !isPrem()) { pToast(tr("pm_font")); return } S.font = v; save(); applyFont(); tOptsRefresh() }
    else if (act === "qset") { U.qset = !U.qset; var qw = document.querySelector(".qsetw"); if (qw) qw.classList.toggle("open", !!U.qset); var qb2 = document.querySelector("[data-act=qset]"); if (qb2) qb2.classList.toggle("on", !!U.qset) }
    else if (act === "hlc") { var hv = parseInt(v, 10); if (hv && !isPrem()) { pToast(tr("pm_hl")); return } S.hlc = hv; save(); if (U.more === "quote") render(); else tOptsRefresh() }
    else if (act === "bgmode") { if (v === "season" && !isPrem()) { pToast(tr("pm_bg")); return } S.bgmode = v === "season" ? "season" : "plain"; save(); applyBg(); tOptsRefresh() }
    else if (act === "sseason") { S.season = v; save(); applyBg(); tOptsRefresh() }
    else if (act === "sgen") { S.gender = TKEYS[+v] || "auto"; applyGender(); save(); tOptsRefresh() }
    else if (act === "sbg") { if (isImgBg(v) && !isPrem()) { pToast(tr("pm_bg")); return } if (S.gender === "female") S.fbg = v; else if (S.gender === "male") S.mbg = v; save(); applyGender(); tOptsRefresh() }
    else if (act === "gsol") { if (S.gender === "female") S.fsol = parseInt(v, 10); else S.msol = parseInt(v, 10); applyGender(); save(); tOptsRefresh() }
    else if (act === "fcolor") { S.fcolor = parseInt(v, 10); applyGender(); save(); tOptsRefresh() }
    else if (act === "mcolor") { S.mcolor = parseInt(v, 10); applyGender(); save(); tOptsRefresh() }
    else if (act === "bgpick") { if (S.gender === "female") S.fbg = v; else S.mbg = v; save(); applyGender();  }
    else if (act === "nf") { U.nf = v; render() }
    else if (act === "setLang") { S.langSet = true; S.lang = v; U.lcty = ""; TCACHE = {}; save(); U.more = "settings"; render(); if (wheels.lang) wheels.lang.set(LANGS.indexOf(v), true) }
    else if (act === "openBot") openTg("https://t.me/" + CFG.BOT)
    else if (act === "openChannel") openTg("https://t.me/" + CFG.CHANNEL)
  })

  var homeLink = document.getElementById("home")
  if (homeLink) {
    homeLink.addEventListener("click", function (ev) {
      ev.preventDefault()
      haptic("light")
      if (FX.c) { fxSet(false); fxLoop(); return }
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
    var w = e.target.closest && e.target.closest("#hgbox .hgw")
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
      fxLayout()
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
  try { if (new URLSearchParams(location.search).get("go") === "help") { U.tab = "more"; U.more = "help" } } catch (e) {}
  audInit()
  applyTheme()
  render()
  window.__asmoReady = true
  var lastHit = 0
  function rmGet() {
    var o = S.rm || {}
    return { d: o.d === 0 ? 0 : 1, dh: typeof o.dh === "number" ? o.dh : 7, s: o.s === 0 ? 0 : 1, sh: typeof o.sh === "number" ? o.sh : 20, o: o.o === 0 ? 0 : 1 }
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
      var p = { initData: tg.initData, lang: S.lang === "uz_new" ? "uz" : (S.lang || "uz"), tz: -new Date().getTimezoneOffset(), remind: S.remind === false ? 0 : 1, mode: ds.mode || "", done: ds.todayDone ? 1 : 0, owed: ds.owedDays || 0, date: ds.lastCheckedDate || "", rm: rmGet(), prem: (S.premium || pmObj().on) ? 2 : (trLeft() > 0 ? 1 : 0) }
      var k = JSON.stringify([p.lang, p.tz, p.remind, p.mode, p.done, p.owed, p.date, p.rm, p.prem])
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
  idle(function () { loadMean(S.lang === "uz_new" ? "uz" : S.lang); loadJs("search.js?v=47") })
  try { if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister() }) }); if (window.caches) caches.keys().then(function (ks) { ks.forEach(function (k) { caches.delete(k) }) }) } catch (e) {}
  if (firstRun) { S.ob = 1; save() }
  if (S.ob === 1) obStart()
})()
