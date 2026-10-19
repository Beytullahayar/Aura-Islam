/* ============ CONFIG ============ */
const KAABA=[21.4225,39.8262];
/* Built-in coordinates for Turkish cities (instant start, works offline) */
const TR_CITIES={"Bingöl":[38.885,40.498],"Istanbul":[41.008,28.978],"Ankara":[39.933,32.859],"Izmir":[38.423,27.143],"Konya":[37.872,32.484],"Erzurum":[39.905,41.265],"Diyarbakır":[37.914,40.231]};
/* ISO 3166-1 country codes — names are localized automatically with Intl.DisplayNames */
const CODES=("AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW").split(" ");
/* English names the city-list API expects, where Intl's name differs */
const EN_FIX={TR:"Turkey",US:"United States",GB:"United Kingdom",RU:"Russia",KR:"South Korea",KP:"North Korea",CZ:"Czech Republic",CD:"Democratic Republic of the Congo",CG:"Republic of the Congo",CI:"Cote d'Ivoire",IR:"Iran",SY:"Syria",VN:"Vietnam",LA:"Laos",MD:"Moldova",TZ:"Tanzania",BO:"Bolivia",VE:"Venezuela",BN:"Brunei",FM:"Micronesia",PS:"Palestine",MK:"North Macedonia",CV:"Cape Verde",SZ:"Eswatini",MM:"Myanmar",TL:"Timor-Leste"};
const PRAYERS=[["fajr","Fajr","🌙"],["sunrise","Sunrise","🌅"],["dhuhr","Dhuhr","☀️"],["asr","Asr","🌤️"],["maghrib","Maghrib","🌇"],["isha","Isha","⭐"]];
const LANGS=[["tr","Türkçe"],["en","English"],["nl","Nederlands"],["ku","Kurdî (Kurmancî)"],["ar","العربية"],["de","Deutsch"],["fr","Français"],["es","Español"],["ru","Русский"],["fa","فارسی"],["ur","اردو"],["id","Bahasa Indonesia"],["zh","中文"]];
const RTL=["ar","fa","ur"];
const VERSES=[
 {ar:"فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",tx:"Indeed, with hardship comes ease.",ref:"Quran 94:6"},
 {ar:"إِنَّمَا ٱلْأَعْمَالُ بِٱلنِّيَّاتِ",tx:"Actions are judged by their intentions.",ref:"Hadith · Bukhari & Muslim"},
 {ar:"أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",tx:"In the remembrance of God do hearts find peace.",ref:"Quran 13:28"},
 {ar:"وَقُل رَّبِّ زِدْنِي عِلْمًا",tx:"My Lord, increase me in knowledge.",ref:"Quran 20:114"},
 {ar:"لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ",tx:"None of you truly believes until he wishes for his brother what he wishes for himself.",ref:"Hadith · Bukhari & Muslim"}];
const DHIKR=[["سُبْحَانَ ٱللَّٰه","Subhanallah"],["ٱلْحَمْدُ لِلَّٰه","Alhamdulillah"],["ٱللَّٰهُ أَكْبَر","Allahu Akbar"]];

const navLang=(navigator.language||"").slice(0,2);
const S={country:"TR",city:"Bingöl",lat:38.885,lng:40.498,tz:"Europe/Istanbul",fmt:"24",theme:"auto",lang:LANGS.some(l=>l[0]===navLang)?navLang:"en",times:null,srcKey:"src_api",count:0,total:0,di:0};
const LOC={en:"en-GB"};
const loc=()=>LOC[S.lang]||(Intl.DateTimeFormat.supportedLocalesOf([S.lang]).length?S.lang:"en-GB");

/* ============ TRANSLATIONS (values follow the order of K) ============ */
const K=["next","at","t_qibla","qtxt","compass","q_on","q_off","t_dhikr","tap","nextd","reset","total","t_set","country","city","search","nocity","fmt","h24","h12","app","auto","dark","lang","note","src_api","src_calc","n_times","n_qibla","n_tasbih","n_set","p_fajr","p_sunrise","p_dhuhr","p_asr","p_maghrib","p_isha"];
const L={
en:["Next prayer","at","Qibla","Qibla direction from your city, measured clockwise from north.","Use phone compass","Compass active. Turn until the Kaaba points straight up.","Compass isn’t available on this device.","Dhikr","tap the ring to count","Next dhikr","Reset","Total","Settings","Country","City","Search another city…","City not found.","Time format","24-hour","12-hour","Appearance","Match device","Midnight","Language","Times: AlAdhan API (Diyanet method for Türkiye) with an on-device astronomical fallback.","Live from AlAdhan API","Calculated on-device (API unreachable)","Prayers","Qibla","Dhikr","Settings","Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"],
tr:["Sıradaki vakit","saat","Kıble","Şehrinizden Kıble yönü, kuzeyden saat yönünde derece olarak.","Telefon pusulasını kullan","Pusula açık. Kâbe tam yukarıyı gösterene kadar dönün.","Bu cihazda pusula kullanılamıyor.","Zikir","saymak için halkaya dokunun","Sonraki zikir","Sıfırla","Toplam","Ayarlar","Ülke","Şehir","Başka şehir ara…","Şehir bulunamadı.","Saat biçimi","24 saat","12 saat","Görünüm","Cihaza uyum","Gece mavisi","Dil","Vakitler: AlAdhan API (Türkiye için Diyanet yöntemi); erişilemezse cihazda hesaplanır.","AlAdhan API’den canlı","Cihazda hesaplandı (API’ye ulaşılamadı)","Vakitler","Kıble","Zikir","Ayarlar","İmsak","Güneş","Öğle","İkindi","Akşam","Yatsı"],
nl:["Volgend gebed","om","Qibla","Qibla-richting vanuit je stad, met de klok mee gemeten vanaf het noorden.","Telefoonkompas gebruiken","Kompas actief. Draai tot de Kaaba recht omhoog wijst.","Kompas is niet beschikbaar op dit apparaat.","Dhikr","tik op de ring om te tellen","Volgende dhikr","Resetten","Totaal","Instellingen","Land","Stad","Zoek een andere stad…","Stad niet gevonden.","Tijdnotatie","24-uurs","12-uurs","Weergave","Volg apparaat","Middernacht","Taal","Tijden: AlAdhan API (Diyanet-methode voor Turkije) met een berekening op het apparaat als terugval.","Live van AlAdhan API","Berekend op het apparaat (API onbereikbaar)","Gebeden","Qibla","Dhikr","Instellingen","Fajr","Zonsopkomst","Dhuhr","Asr","Maghrib","Isha"],
ku:["Nimêja pêş","di","Qible","Alî û rêya Qiblê ji bajarê te, ji bakur ve li gorî alîyê saetê.","Kompasa têlefonê bi kar bîne","Kompas çalak e. Bizivire heta Kaabe rast jor nîşan bike.","Kompas li ser vê amûrê tune ye.","Zikir","ji bo jimartinê li xelekê bixe","Zikira din","Vegerîne sifirê","Giştî","Mîheng","Welat","Bajar","Bajarekî din bigere…","Bajar nehat dîtin.","Forma demê","24 saet","12 saet","Xuyang","Li gorî amûrê","Şeva şîn","Ziman","Dem: AlAdhan API (ji bo Tirkiyeyê awayê Diyanet); heke negihê, li ser amûrê tê hesabkirin.","Zindî ji AlAdhan API","Li ser amûrê hat hesabkirin (API negihîşt)","Nimêj","Qible","Zikir","Mîheng","Beyanî","Hilatin","Nîvro","Îkindî","Êvar","Xuftan"],
ar:["الصلاة القادمة","في","القبلة","اتجاه القبلة من مدينتك، بالدرجات مع عقارب الساعة من الشمال.","استخدم بوصلة الهاتف","البوصلة تعمل. أدر الجهاز حتى تشير الكعبة للأعلى.","البوصلة غير متوفرة على هذا الجهاز.","الذكر","المس الحلقة للعدّ","الذكر التالي","إعادة","المجموع","الإعدادات","الدولة","المدينة","ابحث عن مدينة أخرى…","لم يتم العثور على المدينة.","صيغة الوقت","24 ساعة","12 ساعة","المظهر","حسب الجهاز","منتصف الليل","اللغة","الأوقات: AlAdhan API (طريقة ديانت لتركيا) مع حساب فلكي على الجهاز كبديل.","مباشر من AlAdhan API","محسوب على الجهاز (تعذر الوصول إلى API)","الصلوات","القبلة","الذكر","الإعدادات","الفجر","الشروق","الظهر","العصر","المغرب","العشاء"],
de:["Nächstes Gebet","um","Qibla","Qibla-Richtung von deiner Stadt, im Uhrzeigersinn ab Norden gemessen.","Handy-Kompass nutzen","Kompass aktiv. Drehe dich, bis die Kaaba nach oben zeigt.","Kompass auf diesem Gerät nicht verfügbar.","Dhikr","Tippe auf den Ring zum Zählen","Nächster Dhikr","Zurücksetzen","Gesamt","Einstellungen","Land","Stadt","Andere Stadt suchen…","Stadt nicht gefunden.","Zeitformat","24-Stunden","12-Stunden","Darstellung","Wie Gerät","Mitternacht","Sprache","Zeiten: AlAdhan API (Diyanet-Methode für die Türkei) mit Berechnung auf dem Gerät als Ersatz.","Live von der AlAdhan API","Auf dem Gerät berechnet (API nicht erreichbar)","Gebete","Qibla","Dhikr","Einstellungen","Fadschr","Sonnenaufgang","Dhuhr","Asr","Maghrib","Ischa"],
fr:["Prochaine prière","à","Qibla","Direction de la Qibla depuis votre ville, mesurée dans le sens horaire depuis le nord.","Utiliser la boussole du téléphone","Boussole active. Tournez jusqu’à ce que la Kaaba pointe vers le haut.","La boussole n’est pas disponible sur cet appareil.","Dhikr","touchez l’anneau pour compter","Dhikr suivant","Réinitialiser","Total","Réglages","Pays","Ville","Chercher une autre ville…","Ville introuvable.","Format de l’heure","24 heures","12 heures","Apparence","Suivre l’appareil","Minuit","Langue","Horaires : API AlAdhan (méthode Diyanet pour la Turquie) avec calcul sur l’appareil en secours.","En direct depuis l’API AlAdhan","Calculé sur l’appareil (API injoignable)","Prières","Qibla","Dhikr","Réglages","Fajr","Lever du soleil","Dhuhr","Asr","Maghrib","Isha"],
es:["Próxima oración","a las","Qibla","Dirección de la Qibla desde tu ciudad, medida en sentido horario desde el norte.","Usar la brújula del teléfono","Brújula activa. Gira hasta que la Kaaba apunte hacia arriba.","La brújula no está disponible en este dispositivo.","Dhikr","toca el anillo para contar","Siguiente dhikr","Reiniciar","Total","Ajustes","País","Ciudad","Buscar otra ciudad…","Ciudad no encontrada.","Formato de hora","24 horas","12 horas","Apariencia","Según el dispositivo","Medianoche","Idioma","Horarios: API de AlAdhan (método Diyanet para Turquía) con cálculo en el dispositivo como respaldo.","En vivo desde la API de AlAdhan","Calculado en el dispositivo (API inaccesible)","Oraciones","Qibla","Dhikr","Ajustes","Fajr","Amanecer","Dhuhr","Asr","Maghrib","Isha"],
ru:["Следующий намаз","в","Кибла","Направление киблы из вашего города, по часовой стрелке от севера.","Использовать компас телефона","Компас включён. Поворачивайтесь, пока Кааба не окажется сверху.","Компас недоступен на этом устройстве.","Зикр","коснитесь кольца, чтобы считать","Следующий зикр","Сбросить","Всего","Настройки","Страна","Город","Найти другой город…","Город не найден.","Формат времени","24-часовой","12-часовой","Оформление","Как на устройстве","Полночь","Язык","Время: AlAdhan API (метод Диянет для Турции) с расчётом на устройстве как запасным вариантом.","Онлайн из AlAdhan API","Рассчитано на устройстве (API недоступен)","Намазы","Кибла","Зикр","Настройки","Фаджр","Восход","Зухр","Аср","Магриб","Иша"],
fa:["نماز بعدی","ساعت","قبله","جهت قبله از شهر شما، در جهت عقربه‌های ساعت از شمال.","استفاده از قطب‌نمای گوشی","قطب‌نما فعال است. بچرخید تا کعبه به سمت بالا باشد.","قطب‌نما در این دستگاه در دسترس نیست.","ذکر","برای شمارش روی حلقه بزنید","ذکر بعدی","بازنشانی","مجموع","تنظیمات","کشور","شهر","جستجوی شهر دیگر…","شهر پیدا نشد.","قالب زمان","۲۴ ساعته","۱۲ ساعته","ظاهر","مطابق دستگاه","نیمه‌شب","زبان","زمان‌ها: AlAdhan API (روش دیانت برای ترکیه) با محاسبه روی دستگاه به‌عنوان جایگزین.","زنده از AlAdhan API","محاسبه‌شده روی دستگاه (API در دسترس نیست)","نمازها","قبله","ذکر","تنظیمات","صبح","طلوع","ظهر","عصر","مغرب","عشاء"],
ur:["اگلی نماز","بجے","قبلہ","آپ کے شہر سے قبلہ کی سمت، شمال سے گھڑی کی سمت میں ڈگری میں۔","فون کا کمپاس استعمال کریں","کمپاس فعال ہے۔ گھومیں جب تک کعبہ اوپر کی طرف نہ ہو۔","اس ڈیوائس پر کمپاس دستیاب نہیں۔","ذکر","گننے کے لیے حلقے کو چھوئیں","اگلا ذکر","ری سیٹ","کل","ترتیبات","ملک","شہر","دوسرا شہر تلاش کریں…","شہر نہیں ملا۔","وقت کا انداز","24 گھنٹے","12 گھنٹے","ظاہری شکل","ڈیوائس کے مطابق","آدھی رات","زبان","اوقات: AlAdhan API (ترکی کے لیے دیانت طریقہ) اور متبادل کے طور پر ڈیوائس پر حساب۔","AlAdhan API سے براہِ راست","ڈیوائس پر حساب کیا گیا (API دستیاب نہیں)","نمازیں","قبلہ","ذکر","ترتیبات","فجر","طلوع","ظہر","عصر","مغرب","عشاء"],
id:["Salat berikutnya","pukul","Kiblat","Arah kiblat dari kota Anda, diukur searah jarum jam dari utara.","Gunakan kompas ponsel","Kompas aktif. Putar hingga Kakbah mengarah ke atas.","Kompas tidak tersedia di perangkat ini.","Zikir","ketuk cincin untuk menghitung","Zikir berikutnya","Setel ulang","Total","Pengaturan","Negara","Kota","Cari kota lain…","Kota tidak ditemukan.","Format waktu","24 jam","12 jam","Tampilan","Ikuti perangkat","Tengah malam","Bahasa","Waktu: AlAdhan API (metode Diyanet untuk Turki) dengan perhitungan di perangkat sebagai cadangan.","Langsung dari AlAdhan API","Dihitung di perangkat (API tidak terjangkau)","Salat","Kiblat","Zikir","Pengaturan","Subuh","Terbit","Zuhur","Asar","Magrib","Isya"],
zh:["下一次礼拜","于","朝向","从您所在城市出发的朝向，自正北顺时针计算。","使用手机指南针","指南针已启用。转动直到克尔白指向正上方。","此设备不支持指南针。","赞念","点击圆环计数","下一个赞念","重置","总计","设置","国家","城市","搜索其他城市…","未找到城市。","时间格式","24小时制","12小时制","外观","跟随设备","午夜","语言","时间：AlAdhan API（土耳其采用宗教事务局方法），无法连接时使用设备本地天文计算。","来自 AlAdhan API 的实时数据","已在设备上计算（API 无法连接）","礼拜","朝向","赞念","设置","晨礼","日出","晌礼","晡礼","昏礼","宵礼"]};
const I18N={};Object.keys(L).forEach(g=>{I18N[g]=Object.fromEntries(K.map((k,i)=>[k,L[g][i]]))});
/* Daily verse translations (other languages fall back to English) */
const VL={tr:[["Şüphesiz zorluğun yanında bir kolaylık vardır.","Kur’an 94:6"],["Ameller niyetlere göredir.","Hadis · Buhârî ve Müslim"],["Bilin ki kalpler ancak Allah’ı anmakla huzur bulur.","Kur’an 13:28"],["Rabbim, ilmimi artır.","Kur’an 20:114"],["Sizden biriniz, kendisi için istediğini kardeşi için de istemedikçe iman etmiş olmaz.","Hadis · Buhârî ve Müslim"]],
nl:[["Voorwaar, met de moeilijkheid komt verlichting.","Koran 94:6"],["Daden worden beoordeeld naar hun intenties.","Hadith · Bukhari en Muslim"],["Voorwaar, in de gedachtenis aan God vinden harten rust.","Koran 13:28"],["Mijn Heer, vergroot mijn kennis.","Koran 20:114"],["Niemand van jullie gelooft echt totdat hij voor zijn broer wenst wat hij voor zichzelf wenst.","Hadith · Bukhari en Muslim"]],
ku:[["Bi rastî, bi zehmetiyê re hêsanî heye.","Quran 94:6"],["Kirin bi niyetan e.","Hedîs · Bûxarî û Muslim"],["Haya xwe hebe, dil tenê bi bîranîna Xwedê aram dibin.","Quran 13:28"],["Xwedayê min, zanîna min zêde bike.","Quran 20:114"],["Yek ji we bawer nake heta ku ya ji xwe re dixwaze, ji birayê xwe re jî nexwaze.","Hedîs · Bûxarî û Muslim"]]};
const t=k=>(I18N[S.lang]||I18N.en)[k]??I18N.en[k]??k;
const $=id=>document.getElementById(id);
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
Object.assign(S,store.get("noor",{}));
/* migrate old saves that only had a city name */
if(typeof S.lat!=="number"||!S.tz){const k=TR_CITIES[S.city]?S.city:"Bingöl";S.country="TR";S.city=k;[S.lat,S.lng]=TR_CITIES[k];S.tz="Europe/Istanbul"}
const save=()=>store.set("noor",{country:S.country,city:S.city,lat:S.lat,lng:S.lng,tz:S.tz,fmt:S.fmt,theme:S.theme,lang:S.lang,total:S.total,di:S.di,count:S.count});

/* ============ DATE HELPERS (time zone of the selected city) ============ */
function tzOff(tz,ms){ /* UTC offset in hours of `tz` at instant `ms` */
 const o={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(ms)).forEach(x=>o[x.type]=x.value);
 return (Date.UTC(o.year,o.month-1,o.day,o.hour,o.minute,o.second)-Math.floor(ms/1000)*1000)/36e5;
}
const dayOff=p=>tzOff(S.tz,Date.UTC(p.y,p.m-1,p.d,12));
function todayParts(offset=0){
 const p=new Intl.DateTimeFormat("en-CA",{timeZone:S.tz,year:"numeric",month:"2-digit",day:"2-digit"}).format(Date.now()+offset*864e5).split("-").map(Number);
 return {y:p[0],m:p[1],d:p[2]};
}
const atHour=(p,h)=>new Date(Date.UTC(p.y,p.m-1,p.d)+(h-dayOff(p))*36e5);
const atHM=(p,s)=>{const [h,m]=s.slice(0,5).split(":").map(Number);return atHour(p,h+m/60)};
const fmtTime=d=>new Intl.DateTimeFormat("en-GB",{timeZone:S.tz,hour:"2-digit",minute:"2-digit",hour12:S.fmt==="12"}).format(d);

/* ============ DATA: AlAdhan API (by coordinates) ============ */
async function fetchAlAdhan(p){
 const dd=`${String(p.d).padStart(2,"0")}-${String(p.m).padStart(2,"0")}-${p.y}`;
 /* Turkey → Diyanet method (13); elsewhere AlAdhan picks the regional default */
 const url=`https://api.aladhan.com/v1/timings/${dd}?latitude=${S.lat}&longitude=${S.lng}&timezonestring=${encodeURIComponent(S.tz)}`+(S.country==="TR"?"&method=13":"");
 const res=await fetch(url);
 if(!res.ok) throw new Error("API "+res.status);
 const t=(await res.json()).data.timings;
 return {fajr:atHM(p,t.Fajr),sunrise:atHM(p,t.Sunrise),dhuhr:atHM(p,t.Dhuhr),asr:atHM(p,t.Asr),maghrib:atHM(p,t.Maghrib),isha:atHM(p,t.Isha)};
}

/* ============ DATA: offline astronomical fallback (Fajr 18°, Isha 17°) ============ */
function computeTimes(lat,lng,p){
 const R=Math.PI/180,fix=(a,n)=>a-n*Math.floor(a/n),TZH=dayOff(p);
 const D=Date.UTC(p.y,p.m-1,p.d)/864e5+2440587.5+.5-2451545-lng/360;
 const g=fix(357.529+.98560028*D,360),q=fix(280.459+.98564736*D,360);
 const Ls=fix(q+1.915*Math.sin(g*R)+.02*Math.sin(2*g*R),360),e=23.439-3.6e-7*D;
 const RA=fix(Math.atan2(Math.cos(e*R)*Math.sin(Ls*R),Math.cos(Ls*R))/R/15,24);
 const eqt=q/15-RA,dec=Math.asin(Math.sin(e*R)*Math.sin(Ls*R));
 const noon=12+TZH-lng/15-fix(eqt+12,24)+12;
 const H=alt=>Math.acos(Math.min(1,Math.max(-1,(Math.sin(alt*R)-Math.sin(lat*R)*Math.sin(dec))/(Math.cos(lat*R)*Math.cos(dec)))))/R/15;
 const asrAlt=Math.atan(1/(1+Math.tan(Math.abs(lat*R-dec))))/R;
 const h=v=>atHour(p,v);
 return {fajr:h(noon-H(-18)),sunrise:h(noon-H(-.833)),dhuhr:h(noon+.02),asr:h(noon+H(asrAlt)),maghrib:h(noon+H(-.833)+.03),isha:h(noon+H(-17))};
}

let loadId=0;
async function loadTimes(){
 const my=++loadId,p=todayParts();
 let tm,src;
 try{ tm=await fetchAlAdhan(p); src="src_api"; }
 catch(err){ tm=computeTimes(S.lat,S.lng,p); src="src_calc"; }
 if(my!==loadId) return; /* a newer city was picked meanwhile */
 S.times=tm;S.srcKey=src;
 S.tomorrowFajr=new Date(S.times.fajr.getTime()+864e5);
 renderStatic(); tick();
}

/* ============ RENDER ============ */
const regionName=(c,lang)=>{try{return new Intl.DisplayNames([lang],{type:"region"}).of(c)||c}catch(e){return c}};
function renderStatic(){
 const now=new Date();
 $("gdate").textContent=new Intl.DateTimeFormat(loc(),{timeZone:S.tz,weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(now);
 let h="";try{h=new Intl.DateTimeFormat(loc()+"-u-ca-islamic-umalqura",{timeZone:S.tz,day:"numeric",month:"long",year:"numeric"}).format(now)}catch(e){}
 $("hdate").textContent=h; $("city").textContent=S.city; $("country").textContent=regionName(S.country,S.lang); $("src").textContent=t(S.srcKey);
 $("list").innerHTML=PRAYERS.map(([k,n,ic])=>`<div class="row" data-k="${k}"><div class="ic">${ic}</div><div class="n">${t("p_"+k)}</div><div class="t">${fmtTime(S.times[k])}</div></div>`).join("");
 const vi=Math.floor(Date.now()/864e5)%VERSES.length,v=VERSES[vi],vl=(VL[S.lang]||[])[vi]||[v.tx,v.ref];
 $("vAr").textContent=v.ar;$("vTx").textContent=vl[0];$("vRef").textContent=vl[1];
}
const pad=n=>String(n).padStart(2,"0");
function tick(){
 if(!S.times) return;
 const now=Date.now(),seq=PRAYERS.map(([k,n])=>({k,n,t:S.times[k].getTime()}));
 let idx=seq.findIndex(x=>x.t>now),next,prev;
 if(idx===-1){next={k:"fajr",n:"Fajr",t:S.tomorrowFajr.getTime()};prev=seq[5]}
 else{next=seq[idx];prev=idx>0?seq[idx-1]:{t:S.times.isha.getTime()-864e5}}
 if(idx===-1&&now>S.tomorrowFajr.getTime()){loadTimes();return}
 const ms=Math.max(0,next.t-now),s=Math.floor(ms/1000);
 $("cd").textContent=`${pad(Math.floor(s/3600))}:${pad(Math.floor(s%3600/60))}:${pad(s%60)}`;
 $("nextName").textContent=t("p_"+next.k);
 $("nextAt").textContent=`${t("at")} ${fmtTime(new Date(next.t))}`;
 $("prog").style.width=Math.min(100,Math.max(0,(now-prev.t)/(next.t-prev.t)*100))+"%";
 document.querySelectorAll(".row").forEach(r=>{
  const k=r.dataset.k,tt=S.times[k].getTime();
  r.classList.toggle("next",idx!==-1?k===next.k:k==="fajr");
  r.classList.toggle("past",tt<now&&!(idx===-1&&k==="fajr"));
 });
}
setInterval(tick,1000); /* real-time countdown */

/* ============ NAV ============ */
const ICONS={times:'<path d="M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',qibla:'<path d="M12 3l3 9-3 9-3-9 3-9zM3 12h18" />',tasbih:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/><path d="M12 3v2"/>',set:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'};
const TABS=[["times","Prayers"],["qibla","Qibla"],["tasbih","Dhikr"],["set","Settings"]];
const buildNav=()=>{const a=document.querySelector(".view.on").id.slice(2);$("nav").innerHTML=TABS.map(([k])=>`<button data-k="${k}" class="${k===a?"on":""}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>${t("n_"+k)}</button>`).join("")};buildNav();
$("nav").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 document.querySelectorAll("#nav button").forEach(x=>x.classList.toggle("on",x===b));
 document.querySelectorAll(".view").forEach(v=>v.classList.toggle("on",v.id==="v-"+b.dataset.k));scrollTo(0,0)};

/* ============ QIBLA ============ */
function qiblaBearing(lat,lng){
 const R=Math.PI/180,dl=(KAABA[1]-lng)*R,a=Math.sin(dl)*Math.cos(KAABA[0]*R);
 const b=Math.cos(lat*R)*Math.sin(KAABA[0]*R)-Math.sin(lat*R)*Math.cos(KAABA[0]*R)*Math.cos(dl);
 return (Math.atan2(a,b)/R+360)%360;
}
let heading=0;
function drawQibla(){const q=qiblaBearing(S.lat,S.lng);$("deg").textContent=Math.round(q)+"°";$("needle").style.transform=`rotate(${q-heading}deg)`}
$("compassBtn").onclick=async()=>{
 try{ if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission){ if(await DeviceOrientationEvent.requestPermission()!=="granted")return }
  const h=e=>{const c=e.webkitCompassHeading??(e.alpha!=null?360-e.alpha:null);if(c!=null){heading=c;drawQibla()}};
  addEventListener("deviceorientationabsolute",h,true);addEventListener("deviceorientation",h,true);
  $("qtxt").textContent=t("q_on");
 }catch(e){$("qtxt").textContent=t("q_off")}};

/* ============ TASBIH ============ */
function drawCount(){$("count").textContent=S.count;$("ring").style.setProperty("--p",(S.count%33)/33*100||(S.count?100:0));$("total").textContent=S.total;
 $("dhikrName").textContent=DHIKR[S.di][0];$("dhikrName").nextElementSibling.textContent=DHIKR[S.di][1]+" · "+t("tap")}
$("ring").onclick=()=>{S.count++;S.total++;if(navigator.vibrate)navigator.vibrate(S.count%33===0?[40,40,40]:12);save();drawCount()};
$("reset").onclick=()=>{S.count=0;save();drawCount()};
$("nextDhikr").onclick=()=>{S.di=(S.di+1)%DHIKR.length;S.count=0;save();drawCount()};

/* ============ LOCATION: country → city ============ */
const opt=(v,txt)=>{const o=document.createElement("option");o.value=v;o.textContent=txt;return o};
const cityCache={};
async function loadCities(code){ /* city list of a country (free countriesnow.space API) */
 if(cityCache[code]) return cityCache[code];
 const en=EN_FIX[code]||regionName(code,"en");
 try{
  const r=await fetch("https://countriesnow.space/api/v0.1/countries/cities",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({country:en})});
  const j=await r.json();
  if(!j.error&&Array.isArray(j.data)&&j.data.length) return cityCache[code]=[...new Set(j.data)].sort((a,b)=>a.localeCompare(b));
 }catch(e){}
 return code==="TR"?Object.keys(TR_CITIES).sort():[]; /* not cached on failure → retried next time */
}
async function geocode(name,code){ /* city → coordinates + time zone (Open-Meteo, no key needed) */
 const u=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json&countryCode=${code}`;
 const r=((await (await fetch(u)).json()).results||[])[0];
 return r?{name:r.name,lat:r.latitude,lng:r.longitude,tz:r.timezone}:null;
}
function fillCountries(){
 const arr=CODES.map(c=>[c,regionName(c,S.lang)]).sort((a,b)=>a[1].localeCompare(b[1],S.lang));
 const el=$("countrySel"),cur=el.value||S.country;
 el.replaceChildren(...arr.map(([c,n])=>opt(c,n)));
 el.value=cur;
}
let cityReq=0;
async function fillCities(code,selected){
 const my=++cityReq,el=$("citySel");
 el.replaceChildren(opt("","— "+t("city")+" —"));
 const list=await loadCities(code);
 if(my!==cityReq) return;
 const set=new Set(list); if(selected) set.add(selected);
 el.append(...[...set].sort((a,b)=>a.localeCompare(b)).map(c=>opt(c,c)));
 el.value=selected||"";
}
function applyGeo(code,name,g){
 Object.assign(S,{country:code,city:name,lat:g.lat,lng:g.lng,tz:g.tz||"UTC"});
 $("geoMsg").textContent="";save();drawQibla();loadTimes();
}
async function pickCity(name,code){
 const msg=$("geoMsg");msg.textContent="…";
 let g=code==="TR"&&TR_CITIES[name]?{lat:TR_CITIES[name][0],lng:TR_CITIES[name][1],tz:"Europe/Istanbul"}:null;
 if(!g){try{g=await geocode(name,code)}catch(e){}}
 if(!g){msg.textContent=t("nocity");$("citySel").value=S.country===code?S.city:"";return}
 applyGeo(code,name,g);
}
$("countrySel").onchange=e=>{$("geoMsg").textContent="";$("citySearch").value="";fillCities(e.target.value,e.target.value===S.country?S.city:"")};
$("citySel").onchange=e=>{if(e.target.value)pickCity(e.target.value,$("countrySel").value)};
$("citySearch").onchange=async e=>{
 const q=e.target.value.trim(),code=$("countrySel").value,msg=$("geoMsg");if(!q)return;
 msg.textContent="…";
 let g=null;try{g=await geocode(q,code)}catch(err){}
 if(!g){msg.textContent=t("nocity");return}
 const sel=$("citySel");
 if(![...sel.options].some(o=>o.value===g.name))sel.append(opt(g.name,g.name));
 sel.value=g.name;e.target.value="";
 applyGeo(code,g.name,g);
};

/* ============ SETTINGS ============ */
$("lang").replaceChildren(...LANGS.map(([c,n])=>opt(c,n)));
$("fmt").value=S.fmt;$("theme").value=S.theme;$("lang").value=S.lang;
$("fmt").onchange=e=>{S.fmt=e.target.value;save();renderStatic();tick()};
const applyTheme=()=>{if(S.theme==="dark")document.documentElement.dataset.theme="dark";else delete document.documentElement.dataset.theme};
$("theme").onchange=e=>{S.theme=e.target.value;save();applyTheme()};

function applyLang(){
 document.documentElement.lang=S.lang;document.documentElement.dir=RTL.includes(S.lang)?"rtl":"ltr";
 document.querySelectorAll("[data-i]").forEach(e=>e.textContent=t(e.dataset.i));
 $("citySearch").placeholder=t("search");
 fillCountries();
 const first=$("citySel").options[0];if(first&&first.value==="")first.textContent="— "+t("city")+" —";
 buildNav();drawCount();if(S.times){renderStatic();tick()}
}
$("lang").onchange=e=>{S.lang=e.target.value;save();applyLang()};
applyTheme();applyLang();drawQibla();fillCities(S.country,S.city);loadTimes();