document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".home-page__box");
    const lazyBackgrounds = [].slice.call(elements);
    if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let clazz = entry.target.getAttribute('data-bg');
                    entry.target.firstElementChild.classList.add('home-page--' + clazz + '-bg');
                }
            });
        });
  
        lazyBackgrounds.forEach(function(lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    } else {
        //if the browser does not support 'IntersectionObserver' load the HD picture
        elements.forEach(el => {
            let clazz = el.getAttribute('data-bg');
            el.firstElementChild.classList.add('home-page--' + clazz + '-bg');
        });
    }
});