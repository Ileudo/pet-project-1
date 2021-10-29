const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]');

    triggers.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach((item) => {
          item.style.display = 'none';
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        const scrollWidth = calsScroll();
        document.body.style.marginRight = scrollWidth;
        opened = true;

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

  function calsScroll() {
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
        document.body.style.marginRight = calsScroll();
      }
    }, time);
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close', '[data-modal]');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close', '[data-modal]');
  showModalByTime('.popup-consultation', 3000);
};

export default modals;
