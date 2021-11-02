const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  function preventDefaults(e) {
    console.log('prevent');
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(item) {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0.7)';
  }
  function unhighlight(item) {
    item.closest('.file_upload').style.border = 'none';

    if (item.closest('.calc-form')) {
      item.closest('.file_upload').style.backgroundColor = '#ffffff';
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed';
    }
  }

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => input.addEventListener(eventName, preventDefaults));
  });

  ['dragenter', 'dragover'].forEach((eventName) => {
    fileInputs.forEach((input) => input.addEventListener(eventName, () => highlight(input)));
  });
  ['dragleave', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => input.addEventListener(eventName, () => unhighlight(input)));
  });

  fileInputs.forEach((input) =>
    input.addEventListener('drop', (e) => {
      input.files = e.dataTransfer.files;

      const [inputName, ext] = input.files[0].name.split('.');
      let outputName;
      inputName.length > 8
        ? (outputName = inputName.substring(0, 8) + '...' + ext)
        : (outputName = inputName.substring(0, 10) + '.' + ext);

      input.previousElementSibling.textContent = outputName;
    })
  );
};

export default drop;
