// استلام المتغيرات من الصفحة
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const dinaChar = document.getElementById('dinaChar');
const surahNameDisplay = document.getElementById('surahName');

// جلب رقم السورة من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const surahId = urlParams.get('id'); // مثلاً 101
const surahName = urlParams.get('name');

// إعداد الصفحة عند التحميل
window.onload = () => {
    if (surahId) {
        // تحديث الاسم
        surahNameDisplay.innerText = "سورة " + (surahName || "القرآن");
        
        // مسار الصوت: في المجلد الرئيسي مباشرة حسب صورتك
        audioPlayer.src = `${surahId}.mp3`;
        
        // محاولة التشغيل التلقائي (قد تتطلب تفاعل المستخدم أولاً في بعض المتصفحات)
        audioPlayer.play().then(() => {
            updateUI(true);
        }).catch(error => {
            console.log("نتظر تفاعل المستخدم للتشغيل");
        });
    } else {
        surahNameDisplay.innerText = "خطأ: لم يتم اختيار سورة";
    }
};

// زر التشغيل والإيقاف
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        updateUI(true);
    } else {
        audioPlayer.pause();
        updateUI(false);
    }
}

// تقديم وترجيع 5 ثواني
function seek(seconds) {
    audioPlayer.currentTime += seconds;
}

// تحديث الواجهة (الأيقونات وحركة دينا)
function updateUI(isPlaying) {
    if (isPlaying) {
        playBtn.innerText = "⏸"; // علامة إيقاف مؤقت
        dinaChar.classList.add('talking'); // تشغيل حركة دينا
    } else {
        playBtn.innerText = "▶"; // علامة تشغيل
        dinaChar.classList.remove('talking'); // إيقاف حركة دينا
    }
}

// عند انتهاء الصوت
audioPlayer.onended = () => {
    updateUI(false);
    // يمكنك إضافة كود هنا لإظهار "أحسنت" أو الانتقال للسورة التالية
};
