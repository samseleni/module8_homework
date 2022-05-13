//слайдер с автопроигрыванием, которое заканчивается при клике по стрелке или точке

let images = [{
    src: './asset/corgi__black-white.jpg',
    title: 'Black and white corgi cardigan'
}, {
    src: './asset/corgi__marble.jpg',
    title: 'Marble corgi cardigan'
}, {
    src: './asset/corgi__tiger.jpeg',
    title: 'Brindle corgi cardigan'
}, {
    src: './asset/corgi__tricolor.jpg',
    title: 'Tricolor corgi cardigan'
}, {
    src: './asset/corgi__pembrok.jpg',
    title: 'Red pembroke corgi'
}, {
    src: './asset/corgi__pembrock-tricolor.jpg',
    title: 'Tricolor pembroke corgi'
}];

function initSlider(options) {
    if (!images || !images.length) return;
    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector('.slider__images');
    let sliderArrows = document.querySelector('.slider__arrows');
    let sliderDots = document.querySelector('.slider__dots');
    let click = false; // переменная для остановки автопроигрывания

    initImages();
    initArrows();

    if (options.dots) {
        initDots();
    }
    if (options.titles) {
        initTitles();
    }
    if (options.autoplay) {
        initAutoplay();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].src});" data-index = '${index}'></div>`;
            sliderImages.innerHTML += imageDiv;
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll('.slider__arrow').forEach(arrow => {
            arrow.addEventListener('click', function() {
                let activeNumber = +sliderImages.querySelector('.active').dataset.index;
                let nextNumber;
                if (arrow.classList.contains('slider__arrows-left')) {
                    nextNumber = activeNumber === 0? images.length - 1 : activeNumber - 1;
                } else {
                    nextNumber = activeNumber === images.length - 1? 0 : activeNumber + 1;
                }
                moveSlider(nextNumber);
                if (options.autoplay) click = true;
            })

        })
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        })
        sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.index);
                if (options.autoplay) click = true;
            })
        })
    }

    function initTitles() {
        let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
        sliderImages.innerHTML += titleDiv;
    }

    function changeTitle(num) {
        if (!images[num].title) return;

        let sliderTitle = sliderImages.querySelector('.slider__images-title');
        sliderTitle.innerText = images[num].title;
    }

    function initAutoplay() {
        let intervalId = setInterval(() => {
            let activeNumber = +sliderImages.querySelector('.active').dataset.index;
            let nextNumber = activeNumber === images.length - 1? 0 : activeNumber + 1;
            if (click) {
                clearInterval(intervalId);
                return;
            }
            moveSlider(nextNumber);
        }, options.autoplayInterval);
    }

    function moveSlider(num) {
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector('.n' + num).classList.add('active');
        if (options.titles) changeTitle(num);
        if (options.dots) {
            sliderDots.querySelector('.active').classList.remove('active');
            sliderDots.querySelector('.n' + num).classList.add('active');
        }
    }
}

let sliderOptions = {
    titles: true,
    dots: true,
    autoplay: true,
    autoplayInterval: 5000
};

document.addEventListener('DOMContentLoaded', function() {
    initSlider(sliderOptions);
})