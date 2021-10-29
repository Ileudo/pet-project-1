const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, destroyTrigger = false) {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]');

    triggers.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroyTrigger) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        const scrollWidth = calcScroll();
        document.body.style.marginRight = scrollWidth;

        close.addEventListener('click', () => {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          document.body.style.marginRight = '0px';
        });
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = 'none';
        });
      }

      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = '0px';
    });
  }

  function calcScroll() {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth + 'px';
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;
      document.querySelectorAll('[data-modal]').forEach((item) => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'true';
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = calcScroll();
      }
    }, time);
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let pageEnd = window.pageYOffset + document.documentElement.clientHeight + 1 >= scrollHeight;
      if (!btnPressed && pageEnd) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, true);
  showModalByTime('.popup-consultation', 60000);
  openByScroll('.fixed-gift');
};

export default modals;
