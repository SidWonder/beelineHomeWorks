let size = document.querySelector('#range'),
    square = document.querySelector('.square'),
    borderRadius = document.querySelector('#borderSizer'),
    colorRed = document.querySelector('#colorRed'),
    colorGreen = document.querySelector('#colorGreen'),
    colorBlue = document.querySelector('#colorBlue');


const changeSize = () => {
    let val = size.value;
    square.style.width = val + 'px';
    square.style.height = val + 'px';
};

const changeBorderRadius = () => {
    let val = borderRadius.value;
    square.style.borderRadius = val + '%';
};

const colorChanger = () => {
    let color = `rgb(${colorRed.value}, ${colorGreen.value}, ${colorBlue.value})`;
    square.style.backgroundColor = color;
};


size.addEventListener('input', changeSize);
borderRadius.addEventListener('input', changeBorderRadius);
colorRed.addEventListener('input', colorChanger);
colorGreen.addEventListener('input', colorChanger);
colorBlue.addEventListener('input', colorChanger);