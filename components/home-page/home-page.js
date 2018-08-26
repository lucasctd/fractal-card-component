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