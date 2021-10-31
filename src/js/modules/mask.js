const mask = (selector) => {
  let inputs = document.querySelectorAll(selector);
  inputs.forEach((item) => {
    item.addEventListener('input', mask);
    item.addEventListener('focus', mask);
    item.addEventListener('blur', mask);
  });

  function setCursorPosition(pos, elem) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();

      range.moveStart('character', pos);
      range.moveEnd = ('character', pos);
      range.select();
    }
  }

  function mask(event) {
    let matrix = '+7 (___) ___ __ __',
      i = 0,
      countryCode = matrix.replace(/[^0-9+]/g, ''),
      val = this.value.replace(/[^0-9+]/g, '');

    if (countryCode.length > val.length) {
      val = countryCode;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[0-9+_]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    if (event.type === 'blur') {
      if (this.value.length === countryCode.length) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }
};

export default mask;
