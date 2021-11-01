import { postData } from '../services/requests';

const forms = () => {
  const forms = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    selects = document.querySelectorAll('select'),
    price = document.querySelector('.calc-price'),
    upload = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  };

  const path = {
    designer: 'assets/designer.php',
    question: 'assets/question.php',
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = '';
    });
    upload.forEach((item) => {
      item.previousElementSibling.textContent = 'Файл не выбран';
    });
    price.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    selects.forEach((item) => {
      item.value = '';
    });
  };

  upload.forEach((item) => {
    item.addEventListener('input', () => {
      const [inputName, ext] = item.files[0].name.split('.');
      let dots;
      inputName.length > 8 ? (dots = '...') : (dots = '.');
      const outputName = inputName.substring(0, 8) + dots + ext;

      item.previousElementSibling.textContent = outputName;
    });
  });

  forms.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);

      const formData = new FormData(item);
      if (item.classList.contains('calc-form')) {
        formData.append('price', price.value);
      }

      let api;
      item.closest('.popup-design') || item.classList.contains('calc-form')
        ? (api = path.designer)
        : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};

export default forms;
