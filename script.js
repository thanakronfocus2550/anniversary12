const config = {
    title: "Twelve Months.", // Page 1
    passcode: "1205", // Page 2
    couple: "https://via.placeholder.com/600", // รูปคู่หน้า 2
    startDate: "2023-12-05", // วันเริ่มคบ (ปี-เดือน-วัน)
    letter: `ถึงคุณ...
    ขอบคุณที่อยู่ในทุกช่วงเวลาของฉันนะ
    1 ปีที่ผ่านมาคือของขวัญที่ดีที่สุด
    ขอบคุณที่คอยซัพพอร์ตและอยู่ข้างกันเสมอมา
    รักคุณที่สุดในโลกเลยนะ...`,
    music: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

    // ความทรงจำ 8 รูป
    memories: [
        { img: "https://via.placeholder.com/600x800", desc: "First meet." },
        { img: "https://via.placeholder.com/600x800", desc: "Our first trip." },
        { img: "https://via.placeholder.com/600x800", desc: "Cafe date." },
        { img: "https://via.placeholder.com/600x800", desc: "Dinner night." },
        { img: "https://via.placeholder.com/600x800", desc: "Movie time." },
        { img: "https://via.placeholder.com/600x800", desc: "With you." },
        { img: "https://via.placeholder.com/600x800", desc: "Sunset moment." },
        { img: "https://via.placeholder.com/600x800", desc: "Forever." }
    ]
};

// Setup
document.getElementById('title1').innerText = config.title;
document.getElementById('coupleImg').src = config.couple;
document.getElementById('clientLetter').innerText = config.letter;

function nextPage(n) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + n).classList.add('active');
    if(n === 4) startTimer();
    if(n === 5) { renderGallery(); initScroll(); }
}

function checkPass() {
    const input = document.getElementById('passInput').value;
    if(input === config.passcode) {
        document.getElementById('coupleImg').style.filter = "none";
        document.getElementById('lockIcon').style.opacity = "0";
        setTimeout(() => nextPage(4), 2000);
    } else { alert("ACCESS DENIED"); }
}

function startTimer() {
    setInterval(() => {
        const diff = new Date() - new Date(config.startDate);
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('timer').innerHTML = `
            <div class="t-unit"><span>${d}</span><p>Days</p></div>
            <div class="t-unit"><span>${h}</span><p>Hours</p></div>
            <div class="t-unit"><span>${m}</span><p>Mins</p></div>
            <div class="t-unit"><span>${s}</span><p>Secs</p></div>
        `;
    }, 1000);
}

function renderGallery() {
    const list = document.getElementById('memoryList');
    list.innerHTML = config.memories.map((item, i) => `
        <div class="memory-row">
            <div class="memory-img-box">
                <img src="${item.img}">
            </div>
            <div class="memory-text-box">
                <span class="memory-num">0${i+1}</span>
                <h3 class="memory-title">${item.desc}</h3>
                <p class="text-[10px] tracking-[4px] uppercase text-gray-300">Moment Captured</p>
            </div>
        </div>
    `).join('');
}

function initScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('reveal'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.memory-row').forEach(row => observer.observe(row));
}

function runAway(btn) {
    btn.style.position = 'absolute';
    btn.style.top = Math.random() * 80 + '%';
    btn.style.left = Math.random() * 80 + '%';
}

function goMusic() { window.location.href = config.music; }