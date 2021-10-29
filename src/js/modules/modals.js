const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, windowSelector) {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll(windowSelector);

    triggers.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
          console.log('click');
        }

        windows.forEach((item) => {
          item.style.display = 'none';
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        close.addEventListener('click', () => {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        });
      });
    });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close', '[data-modal]');
};

export default modals;
