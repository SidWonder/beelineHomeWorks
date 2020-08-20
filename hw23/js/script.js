'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const adv = document.querySelectorAll('.promo__adv img');
    const genre = document.querySelector('.promo__genre');

    const bg = document.querySelector('.promo__bg');
    const movieList = document.querySelector('.promo__interactive-list');
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилгрим против ... "
        ]
    };
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    deleteAdv(adv);

    genre.textContent = 'драма';

    bg.style.backgroundImage = "url('./img/bg.jpg')";






    function createMovieList(films, parent) {
        parent.innerHTML = "";
        movieDB.movies.sort();

        films.forEach((film, i) => {
            parent.innerHTML += `  
            <li class="promo__interactive-item">${i+1} ${film};
            <div class="delete"></div>
            </li>
    `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(movieDB.movies, movieList);
            });
        });
    }

    createMovieList(movieDB.movies, movieList);

    const addForm = document.querySelector('form.add'),
        addInput = document.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('You add new fav film!');
            }
            movieDB.movies.push(newFilm);
            movieDB.movies.sort();
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset()
    });
});