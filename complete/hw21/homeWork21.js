// Домашнее задание:
// Задание 1: Функция, возвращающая объект, и меняющая местами ключ <-> значение.
// исходный объект должен остаться неизменным.
// Уровень 1: Работа с конкретныйм объектом и конкретными его свойствами

const firstObject = {
    'one': 'number',
};

function resolve1(inputObject) {
    // body
    const newObject = {};

    for (let key in firstObject) {
        let i = firstObject[key];
        newObject[i] = key;
    };
    return newObject;
};

const result1 = resolve1(firstObject);

console.log(result1); // ожидаемый результат { 'number': 'one' }
console.log(firstObject); // ожидаемый результат { 'one': 'number' }


// Уровень 2: Работа с любым объектом БЕЗ вложенных объектов внутри
// и любым количеством свойствам
// Данный объект. Должен остаться неизменным
const secondObject = {
    'apple': 'fruit',
    'potato': 'vegetable',
    'strawberry': 'berry',
};

function resolve2(inputObject) {
    const newObject = {};

    for (let key in secondObject) {
        let i = secondObject[key];
        newObject[i] = key;
    };
    return newObject;
};

const result2 = resolve2(secondObject);
console.log(secondObject);
// ожидаемый результат: { 'apple': 'fruit', 'potato': 'vegetable', 'strawberry': 'berry' }

console.log(result2);
// ожидаемый результат { 'fruit': 'apple', 'vegetable': 'potato', 'berry': 'strawberry' }


// Задание 2. Написать функцию, возвращающую век, соответствующий данному году
// Использовать Глобальный объект Math

const year = 1905;
centuryFromYear(year); // 20

const year2 = 1700;
centuryFromYear(year2); // 18.

function centuryFromYear(inputYear) {
    let century = inputYear / 100;
    if ((inputYear / 100 > 0) && (inputYear % 100 == 0)) {
        century += 1;
    } else {
        century = Math.ceil(century);
    }

    // return century;
    console.log(`Сейчас ${century}-ый век`);
}