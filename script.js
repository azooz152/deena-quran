document.addEventListener("DOMContentLoaded", () => {
  // 1. برمجة أزرار السور للتنقل السهل بالريموت
  const buttons = document.querySelectorAll(".surahs button");
  buttons.forEach(btn => {
    // إضافة إمكانية الضغط بزر "Enter" في الريموت
    btn.addEventListener('click', () => {
      window.location.href = "surah.html?surah=" + encodeURIComponent(btn.innerText);
    });
  });

  // 2. جلب اسم السورة وتشغيل الحركة والصوت
  const params = new URLSearchParams(window.location.search);
  const surahName = params.get("surah");
  const nameLabel = document.getElementById("surahName");
  
  if (nameLabel && surahName) {
    nameLabel.textContent = surahName;
    // نبدأ حركة الفم فور تحميل الصفحة
    startTalking();
  }

  // 3. محاولة تشغيل الصوت تلقائياً عند فتح السورة (لحل مشكلة الصامت)
  const video = document.querySelector('iframe');
  if (video) {
    // إضافة معلمة autoplay و mute=0 للرابط لضمان خروج الصوت
    let src = video.src;
    if (src.indexOf('?') > -1) {
        video.src += "&autoplay=1&mute=0";
    } else {
        video.src += "?autoplay=1&mute=0";
    }
  }
});

// وظيفة تحريك الشفايف بروابط مباشرة لضمان ظهورها في التلفزيون
function startTalking() {
  const mouth = document.getElementById("mouth");
  if (!mouth) return;

  // استخدام الروابط الكاملة لضمان عدم الاختفاء بعد التثبيت
  const imgs = [
    "https://azooz152.github.io/deena-quran/assets/images/mouth_closed.png",
    "https://azooz152.github.io/deena-quran/assets/images/mouth_half.png", 
    "https://azooz152.github.io/deena-quran/assets/images/mouth_open.png"
  ];
  
  let i = 0;
  setInterval(() => {
    i = (i + 1) % imgs.length;
    mouth.src = imgs[i];
  }, 170); // سرعة الحركة لتناسب الكلام
}

// إضافة دعم لأزرار الريموت للتنقل بين الأزرار
document.addEventListener('keydown', (e) => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(document.querySelectorAll(focusableElements));
    const index = focusable.indexOf(document.activeElement);

    let nextIndex = 0;
    if (e.key === 'ArrowRight') nextIndex = index + 1;
    else if (e.key === 'ArrowLeft') nextIndex = index - 1;
    else if (e.key === 'ArrowDown') nextIndex = index + 3; // النزول لصف جديد (3 أعمدة)
    else if (e.key === 'ArrowUp') nextIndex = index - 3;

    if (nextIndex >= 0 && nextIndex < focusable.length) {
        focusable[nextIndex].focus();
    }
});
