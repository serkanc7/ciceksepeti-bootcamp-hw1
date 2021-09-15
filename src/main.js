import regeneratorRuntime from "regenerator-runtime";


const getData = async () => {
    try {
        const results = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await results.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

function generateMain(data) {
    const tabElements = document.querySelectorAll('[data-tab]');
    let cardListTabEl = document.querySelector('[tab-card-list]');

    tabElements.forEach((tabEl, index) => {
        if (index === 0) {
            showCardList(data);
        }
        tabEl.addEventListener("click", function () {
            let prevTabEl = document.querySelector(".menu__tab--active");
            prevTabEl.classList.remove('menu__tab--active');
            this.classList.add('menu__tab--active');
            if (this.innerText === "Card List") {
                showCardList(data);
            }
            if (this.innerText === "Form") {
                showForm();
            }
        })
    })

    let searchEl = document.querySelector('[data-search]');
    let searchInput = "";

    searchEl.addEventListener('change', function (e) {
        let prevTabEl = document.querySelector(".menu__tab--active");
        prevTabEl.classList.remove('menu__tab--active');
        cardListTabEl.classList.add('menu__tab--active');
        searchInput = e.target.value;
        if (searchInput) {
            let filteredData = data.filter((item) => (item.title || item.body).includes(searchInput));
            showCardList(filteredData)
        }
        else {
            showCardList(data);
        }
    });

    let form = document.querySelector('#form');
    let formButton = document.querySelector('[data-button]');
    let modal = document.querySelector('[data-modal]');
    let modalInfo = document.querySelector('[data-modal-info]');
    let modalClose = document.querySelector('[data-modal-close]');
    formButton.addEventListener('click', showModal);
    modalClose.addEventListener('click', closeModal);
    function showModal(e) {
        e.preventDefault();
        console.log(form.elements);
        let formData = new FormData(form);
        for (let [name, value] of formData) {
            console.log(name, value);
            const modalTextEl = document.createElement('p');
            modalTextEl.innerText = `${name} = ${value}`
            modalInfo.appendChild(modalTextEl);
        }
        modal.style.display = 'block';
    }
    function closeModal() {
        modal.style.display = 'none';
        modalInfo.innerHTML = "";
    }
}

function showCardList(data) {
    console.log(data);
    let cardListEl = document.querySelector('[data-card-list]');
    let prevSectionEl = document.querySelector(".form-sec__active");
    if (prevSectionEl) {
        prevSectionEl.classList.remove('form-sec__active');
    }
    cardListEl.classList.add('card-list__active');
    cardListEl.innerHTML = "";

    if (data.length) {
        data.slice(0, 10).forEach((item, index) => {
            generateCardEl(item, index, cardListEl);
        })
    }

}

function generateCardEl(item, index, cardListEl) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    const cardImgEl = document.createElement('img');
    cardImgEl.src = "https://picsum.photos/300/200?random=" + (index + 1);;
    cardImgEl.classList.add('card__img')
    const cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card__content');
    const cardTitleEl = document.createElement('h2');
    cardTitleEl.innerText = item.title;
    cardTitleEl.classList.add('card__title');
    const cardBodyEl = document.createElement('p');
    cardBodyEl.innerText = item.body;
    cardBodyEl.classList.add('card__body');

    cardContentEl.append(cardTitleEl, cardBodyEl);
    cardEl.append(cardImgEl, cardContentEl);
    cardListEl.appendChild(cardEl);
}


function showForm() {
    let formEl = document.querySelector('[data-form]');
    let prevSectionEl = document.querySelector(".card-list__active");
    if (prevSectionEl) {
        prevSectionEl.classList.remove('card-list__active');
        formEl.classList.add('form-sec__active');
    }
}



async function init() {
    const data = await getData();
    generateMain(data);
}

init();