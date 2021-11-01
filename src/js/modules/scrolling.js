const scrolling = (upSelector) => {
  const upElem = document.querySelector(upSelector);

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('animated', 'fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

  // SCROLLING WITH REQUEST ANIMATION FRAME
  let links = document.querySelectorAll('[href^="#"]'),
    time = 500; //ms

  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      let scrollTop = document.documentElement.scrollTop,
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().y,
        hashElementScrollTop = scrollTop + toBlock;

      requestAnimationFrame(step);

      function step() {
        let refreshRate = 1000 / 60;
        let iterationsPerTime = time / refreshRate;
        let pxPerFrame = toBlock / iterationsPerTime;

        let r =
          toBlock > 0
            ? Math.min(document.documentElement.scrollTop + pxPerFrame, hashElementScrollTop)
            : Math.max(document.documentElement.scrollTop + pxPerFrame, hashElementScrollTop);

        document.documentElement.scrollTo(0, r);

        if (r != hashElementScrollTop) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });

  // PURE JS SMOOTH SCROLLING
  // const calcScroll = () => {
  //   upElem.addEventListener('click', function (event) {
  //     let scrollTop = document.documentElement.scrollTop;

  //     if (this.hash) {
  //       event.preventDefault();
  //       let hashElement = document.querySelector(this.hash);
  //       let hashElementScrollTop = hashElement.scrollTop;

  //       smoothScroll(scrollTop, hashElementScrollTop, this.hash);
  //     }
  //   });
  // };

  // const smoothScroll = (triggerScrollTop, hashElementScrollTop, hash) => {
  //   const timeInterval = 1;
  //   let prevScrollTop;
  //   let speed;

  //   if (hashElementScrollTop > triggerScrollTop) {
  //     speed = 30;
  //   } else {
  //     speed = -30;
  //   }

  //   const move = setInterval(function () {
  //     let currentScrollTop = document.documentElement.scrollTop;

  //     if (
  //       (hashElementScrollTop > triggerScrollTop && currentScrollTop >= hashElementScrollTop) ||
  //       (triggerScrollTop > hashElementScrollTop && currentScrollTop <= hashElementScrollTop)
  //     ) {
  //       clearInterval(move);
  //       history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
  //     } else {
  //       document.documentElement.scrollTop += speed;
  //       prevScrollTop = document.documentElement.scrollTop;
  //     }
  //   }, timeInterval);
  // };

  // calcScroll();
};

export default scrolling;
