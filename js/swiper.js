var swiper = new Swiper("#swiper", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullests: true,
        clickable: true,
    },
    autoplay: {
        delay: 2500,
    },
    loop: true,
});

// Start Swiper Slide Product
var swiper = new Swiper("#mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    breakpoints: {
        0 : {
            slidesPerView: 1,
        },
        489 : {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        }
    }
});