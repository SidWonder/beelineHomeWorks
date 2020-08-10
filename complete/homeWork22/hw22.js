// Задание 1

let i = 0;

for (let change = 0; i <= 50; change++) {
    if (change % 10 == 0 && change != 0) {
        console.log(i);
    }
    i++;
}
// Ожидаемый результат: 10 20 30 40 50

// Задание 2
/*
 Написать функцию-конструктор Men с ДВУМЯ аргументами
  С помощью которой можно создать объект
  { profession: 'hero', name: 'Кларк', secondName: 'Кент' }
*/

function Men(name, secondName) {
    this.profession = 'hero',
        this.name = name,
        this.secondName = secondName
}

const superman = new Men('Кларк', 'Кент');
console.log('superman: ', superman);
// Men { profession: 'hero', name: 'Кларк', secondName: 'Кент' }


// Задание 3
// Напишите функцию sum, которая работает так: sum(a)(b) возвращает a + b.
function sum(a) {
    return function(b) {
        console.log(a + b);
        return a + b;
    };
}
sum(1)(2); // 3
sum(5)(-1); // 4


// Задание 4
// Измените код так, чтобы console.log выводил последовательно символы 'П т и ц а'
const bird = ['П', 'т', 'и', 'ц', 'а'];

for (let index = 0; index < bird.length; index++) {
    setTimeout(function() {
        console.log(bird[index]);
    }, 100);
}
/* Захотелось попробовать выводить буквы с помощью цикла "лесенкой", то есть сначала идет первая буква, потом первая и вторая, далее первая, вторая и третья и т.д */
function wordByletter(word) {
    let str;
    let i = 0;

    while (i < bird.length) {
        if (i == 0) {
            str = bird[i];
        } else {
            str = `${str} ${bird[i]}`;
        }
        i++;
        console.log(str);
    }
}
wordByletter(bird);