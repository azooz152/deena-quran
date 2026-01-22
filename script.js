<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تطبيق دينا - القراءة الاحترافية</title>
    <style>
        /* منع التمرير نهائياً لشاشات التلفاز */
        body, html {
            margin: 0; padding: 0; width: 100%; height: 100%;
            overflow: hidden; font-family: 'Arial', sans-serif;
            /* الخلفية في مجلد assets مباشرة */
            background: url('assets/bg-main.png') no-repeat center center fixed;
            background-size: cover;
            background-color: #1a1a1a;
        }

        .main-viewport {
            position: relative; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; align-items: center;
        }

        /* زر العودة الموزون - أخضر مائي */
        .back-btn {
            position: absolute; top: 15px; left: 15px;
            padding: 10px 30px; background: #4db6ac;
            border: 3px solid white; border-radius: 50px;
            color: white; font-weight: bold; cursor: pointer; z-index: 100;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        /* إطار الآيات - أصفر طفولي */
        .ayah-frame {
            position: relative; margin-top: 20px;
            width: 85%; background: white;
            border: 6px solid #fbc02d; border-radius: 25px;
            display: flex; align-items: center; justify-content: center;
            padding: 20px; z-index: 10; box-shadow: 0 8px 0 #b8860b;
        }

        #ayahDisplay {
            color: #263238; font-size: 2.2rem; text-align: center; font-weight: bold;
        }

        /* منطقة الشخصية - ضبط الأبعاد لتناسب شاشة واحدة */
        .character-container {
            position: absolute; bottom: 0;
            width: 100%; height: 70vh;
            display: flex; justify-content: center; align-items: flex-end;
        }

        .dina-anchor {
            position: relative; height: 100%;
            display: inline-block;
        }

        #dinaImg { height: 100%; display: block; z-index: 1; }

        /* وزن الشفاه النهائي 100% بناءً على ملاحظاتك: زحف لليسار + نزول للأسفل */
        #mouthSync {
            position: absolute;
            top: 51.5%;   /* تم النزول للأسفل بدقة */
            left: 41.2%;  /* تم الزحف لليسار بدقة */
            transform: translate(-50%, -50%);
            width: 80px;  /* عرض الفم الموزون */
            z-index: 5;
            pointer-events: none;
        }
    </style>
</head>
<body onclick="startApp()">

    <div class="main-viewport">
        <button class="back-btn" onclick="history.back()">🏠 العودة</button>

        <div class="ayah-frame">
            <div id="ayahDisplay">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        </div>

        <div class="character-container">
            <div class="dina-anchor">
                <img src="assets/images/girl.png" id="dinaImg">
                <img src="assets/images/mouth_closed.png" id="mouthSync">
            </div>
        </div>
    </div>

    <audio id="audioPlayer" crossorigin="anonymous" loop></audio>

<script>
    const audio = document.getElementById('audioPlayer');
    const mouth = document.getElementById('mouthSync');
    const ayah = document.getElementById('ayahDisplay');

    // جلب رقم السورة من الذاكرة
    const surahId = localStorage.getItem('surah_num') || "001";
    const surahName = localStorage.getItem('surah_name') || "سورة الفاتحة";

    // رابط صوت المنشاوي مع الأطفال
    audio.src = `https://server8.mp3quran.net/muhammad_siddeeq_al-minshawi/almusshaf_almuallim/${surahId.padStart(3, '0')}.mp3`;

    let ctx, analyser, data;
    let started = false;

    // وظيفة بدء التطبيق والترحيب الآلي للبنات
    async function startApp() {
        if (!started) {
            // الترحيب الصوتي الآلي (بصوت طفلة/بنت)
            const msg = new SpeechSynthesisUtterance("أهلاً بكِ يا صديقتي المبدعة.. هيا لنحفظ سورة " + surahName);
            msg.lang = 'ar-SA';
            msg.pitch = 1.5; // طبقة صوت حادة للطفولة
            msg.rate = 0.9;  // سرعة هادئة

            window.speechSynthesis.speak(msg);

            msg.onend = () => {
                initVisualizer();
                audio.play().catch(e => console.log("خطأ في تشغيل الصوت"));
                ayah.innerText = surahName;
            };
            started = true;
        }
    }

    function initVisualizer() {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = ctx.createAnalyser();
        const src = ctx.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(ctx.destination);
        analyser.fftSize = 256;
        data = new Uint8Array(analyser.frequencyBinCount);

        function loop() {
            if (!audio.paused) {
                analyser.getByteFrequencyData(data);
                let vol = data.reduce((a, b) => a + b) / data.length;

                // مزامنة دقيقة للشفاه بناءً على قوة الصوت
                if (vol > 35) mouth.src = 'assets/images/mouth_open.png';
                else if (vol > 15) mouth.src = 'assets/images/mouth_half.png';
                else mouth.src = 'assets/images/mouth_closed.png';
            }
            requestAnimationFrame(loop);
        }
        loop();
    }

    // دعم أزرار الريموت
    window.addEventListener('keydown', startApp);
</script>
</body>
</html>
