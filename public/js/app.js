const medium = 600;
const large = 992;
const fontSize = 24;

const cards = document.querySelectorAll('.card');
let resizeDelay;

window.addEventListener('resize', (e) => {
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(resize, 5);
});

function resize() {

    cards.forEach(card => {
        resizeFont(card);
        resizeTextBox(card);
        card.addEventListener('mouseenter', () => {
            resizeTextBoxOver(card);
        });

        card.addEventListener('mouseleave', () => {
            resizeTextBox(card);
        });
    });
}

function resizeFont(card) {

    let width = card.clientWidth;

    if (width >= large) {
        setFontSize(card.querySelector('.card__title'), 2.3);
        setFontSize(card.querySelector('.card__sub-title'), 2.3 * .5);
        setFontSize(card.querySelector('.card__text'), 2.3 * .5);

    } else if (width >= medium) {
        setFontSize(card.querySelector('.card__title'), 1.6);
        setFontSize(card.querySelector('.card__sub-title'), 1.6 * .7);
        setFontSize(card.querySelector('.card__text'), 1.6 * .6);

    }else {
        setFontSize(card.querySelector('.card__title'), 1);
        setFontSize(card.querySelector('.card__sub-title'), .7);
        setFontSize(card.querySelector('.card__text'), .65);
    }
}

function setFontSize(el, multiplicador) {
    el.style.fontSize = (fontSize * multiplicador).toString().concat('px');
}

function resizeTextBox(card) {

    let width = card.clientWidth;
    const el = card.querySelector('.card__text');
    if (width >= large) {
        el.style.top = '50%';

    } else if (width >= medium) {
        el.style.top = '40%';

    }else {
        el.style.top = '35%';
    }
}

function resizeTextBoxOver(card) {

    let width = card.clientWidth;
    const el = card.querySelector('.card__text');
    if (width >= large) {
        el.style.top = '35%';

    } else if (width >= medium) {
        el.style.top = '30%';

    }else {
        el.style.top = '25%';
    }
}

resize();
document.addEventListener("DOMContentLoaded", function() {
    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".home-page__box"));
  
    if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let clazz = entry.target.getAttribute('data-bg');
                    console.log(clazz);
                    entry.target.firstElementChild.classList.add('home-page--' + clazz + '-bg');
                    //entry.target.classList.add("visible");
                    //lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });
  
        lazyBackgrounds.forEach(function(lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
});