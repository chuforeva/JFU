function convertToKorUnit(num) {
    if (num == 0) return "0";

    if (num < 10000) return String(num);

    const units = ["", "만", "억"];
    let unitIndex = 0;
    let remain = num;

    while (remain > 10000) {
        remain = remain / 10000;
        unitIndex++;
        if (unitIndex > 2) break;
    }

    return remain.toFixed(1) + units[unitIndex];
}

function sendSMS(code, text) {
    if (navigator.platform == "iPhone") {
        window.open(`sms:#${code}&body=${text}`);

    } else if (navigator.platform == "Linux aarch64") {
        window.open(`sms:%23${code}?body=${text}`);

    } else {
        alert("모바일에서 버튼을 누르면 메세지창으로 이동합니다");
    }
}

function slider() {
    const bannerContainer = document.querySelector(".banner");
    const prevBtn = document.querySelector(".banner_nav.prev");
    prevBtn.style.display = "none";
    const nextBtn = document.querySelector(".banner_nav.next");

    const images = ["amortage_banner_1.jpeg", "amortage_banner_2.jpeg", "amortage_banner_3.png"];
    const imagePath = "images/banners/";

    for (let i of images) {
        const img = document.createElement("img");
        img.src = `${imagePath}${i}`;
        bannerContainer.appendChild(img);
    }

    let currentIndex = 0;
    const totalBanners = bannerContainer.children.length;
    let autoSlideInterval;

    function showSlide(index) {
        if (index < 0) currentIndex = totalBanners - 1;
        else if (index >= totalBanners) currentIndex = 0;
        else currentIndex = index;

        if (currentIndex > 0) prevBtn.style.display = "block";
        else prevBtn.style.display = "none";
        
        if (currentIndex < totalBanners - 1) nextBtn.style.display = "block";
        else nextBtn.style.display = "none";

        bannerContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => showSlide(currentIndex + 1), 10000);
    }

    prevBtn.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        startAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        startAutoSlide();
    });

    startAutoSlide();
}