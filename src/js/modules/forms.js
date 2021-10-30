const forms = () => {
  const forms = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php',
  };

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = '';
    });
  };

  forms.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      console.log(statusImg);
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
      let api;
      item.closest('.popup-design') ? (api = path.designer) : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log('success');
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          console.log('error');
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
