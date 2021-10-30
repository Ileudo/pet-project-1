const sliders = (slidesSelector, dir, prev, next) => {
  let slideIndex = 1,
    paused = false;
  const slides = document.querySelectorAll(slidesSelector);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => {
      item.classList.add('animated');
      item.style.display = 'none';
    });

    slides[slideIndex - 1].style.display = 'block';
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function activateArrows() {
    try {
      const prevBtn = document.querySelector(prev),
        nextBtn = document.querySelector(next);

      prevBtn.addEventListener('click', () => {
        plusSlides(-1);
        slides[slideIndex - 1].classList.remove('slideInLeft');
        slides[slideIndex - 1].classList.add('slideInRight');
      });
      nextBtn.addEventListener('click', () => {
        plusSlides(1);
        slides[slideIndex - 1].classList.remove('slideInRight');
        slides[slideIndex - 1].classList.add('slideInLeft');
      });
    } catch (e) {}
  }

  function startAutoSlider() {
    paused = setInterval(function () {
      plusSlides(1);
      setSliderDirection();
    }, 3000);
  }

  function setSliderDirection() {
    if (dir === 'vertical') {
      slides[slideIndex - 1].classList.add('slideInDown');
    } else {
      slides[slideIndex - 1].classList.add('slideInLeft');
    }
  }

  function activateAnimation() {
    slides[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(paused);
    });
    slides[0].parentNode.addEventListener('mouseleave', () => {
      startAutoSlider();
    });
  }

  showSlides(slideIndex);
  activateArrows();
  startAutoSlider();
  activateAnimation();
};

export default sliders;
