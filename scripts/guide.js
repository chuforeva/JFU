const imageLightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".image-lightbox-close");
const lightboxZoom = document.getElementById("lightbox-zoom");
const lightboxViewer = document.querySelector(".image-lightbox-viewer");
const lightboxPrevious = document.getElementById("lightbox-previous");
const lightboxNext = document.getElementById("lightbox-next");
const guideImages = document.querySelectorAll(
    ".guide-gallery img, .guide-plan-grid img, .schedule-image img"
);
let currentImageIndex = -1;

document.querySelectorAll(".guide-gallery").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll(":scope > figure")];
    if (slides.length < 2) {
        return;
    }

    gallery.classList.add("is-carousel");
    let activeSlide = 0;
    const slideImages = slides.map((slide) => {
        const image = slide.querySelector("img");
        const imageFrame = document.createElement("div");
        imageFrame.className = "guide-carousel-slide";
        image.before(imageFrame);
        imageFrame.append(image);
        const updateOrientation = () => {
            imageFrame.classList.toggle(
                "is-landscape",
                image.naturalWidth > image.naturalHeight
            );
        };
        if (image.complete) {
            updateOrientation();
        } else {
            image.addEventListener("load", updateOrientation, { once: true });
        }
        return imageFrame;
    });

    const controls = document.createElement("div");
    controls.className = "guide-carousel-controls";
    controls.setAttribute("aria-label", "가이드 이미지 탐색");

    const previous = document.createElement("button");
    previous.className = "guide-carousel-button";
    previous.type = "button";
    previous.setAttribute("aria-label", "이전 이미지");
    previous.textContent = "‹";

    const next = document.createElement("button");
    next.className = "guide-carousel-button";
    next.type = "button";
    next.setAttribute("aria-label", "다음 이미지");
    next.textContent = "›";

    const count = document.createElement("span");
    count.className = "guide-carousel-count";
    count.setAttribute("aria-live", "polite");

    function showSlide(index) {
        activeSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.hidden = slideIndex !== activeSlide;
            slide.classList.toggle("is-active", slideIndex === activeSlide);
        });
        count.textContent = `${activeSlide + 1} / ${slides.length}`;
        slideImages[activeSlide].append(controls);
    }

    previous.addEventListener("click", () => showSlide(activeSlide - 1));
    next.addEventListener("click", () => showSlide(activeSlide + 1));
    controls.append(previous, count, next);
    gallery.append(controls);
    showSlide(activeSlide);
});

function openImageLightbox(image) {
    currentImageIndex = [...guideImages].indexOf(image);
    showLightboxImage();
    imageLightbox.showModal();
}

function showLightboxImage() {
    const image = guideImages[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxViewer.classList.remove("is-zoomed");
    lightboxZoom.setAttribute("aria-pressed", "false");
    lightboxZoom.setAttribute("aria-label", "이미지 더 크게 확대");
    lightboxZoom.textContent = "＋";
}

lightboxZoom.addEventListener("click", () => {
    const isZoomed = lightboxViewer.classList.toggle("is-zoomed");
    lightboxZoom.setAttribute("aria-pressed", String(isZoomed));
    lightboxZoom.setAttribute("aria-label", isZoomed ? "이미지를 화면에 맞추기" : "이미지 더 크게 확대");
    lightboxZoom.textContent = isZoomed ? "−" : "＋";
});

function moveLightboxImage(direction) {
    currentImageIndex = (currentImageIndex + direction + guideImages.length) % guideImages.length;
    showLightboxImage();
}

guideImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${image.alt || "가이드 이미지"} 크게 보기`);
    image.addEventListener("click", () => openImageLightbox(image));
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openImageLightbox(image);
        }
    });
});

lightboxPrevious.addEventListener("click", () => moveLightboxImage(-1));
lightboxNext.addEventListener("click", () => moveLightboxImage(1));
lightboxClose.addEventListener("click", () => imageLightbox.close());
imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) {
        imageLightbox.close();
    }
});
imageLightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightboxImage(-1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightboxImage(1);
    }
});
