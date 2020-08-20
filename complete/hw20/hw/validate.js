function validate(data) {
    const { login, password, confirmPassword, license, firstName, gender } = data;

    if (!login || !password) {
        alert('Укажите логин/пароль');
    } else if (login == 'beeline' || login == 'beeinterns' || login == 'bee') { 
        alert('Данный логин занят, используйте другой');
    } else if (password.length < 6) {
        alert('Пароль должен быть длинной не менее 6 символов');
    } else if (password !== confirmPassword) {
        alert('Пароли должны совпадать');
    } else if (!license) {
        alert('Необходимо согласие');
    } else if(!firstName){
        alert('Укажите имя');
    } else if(gender == 'male'){
        alert(`Уважаемый ${firstName}, заявка создана`);
    } else if(gender == 'female'){
        alert(`Уважаемая ${firstName}, заявка создана`);
    } 
    else {
        alert('Форма отправлена');
    }
}
