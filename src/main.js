import regeneratorRuntime from "regenerator-runtime";

//Get data from api
const getData = async () => {
    try {
        const results = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await results.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

//Generate app
function generateApp(data) {
    const tabElements = document.querySelectorAll('[data-tab]');
    let cardListTabEl = document.querySelector('[tab-card-list]');

    //Show current tab when button is clicked 
    tabElements.forEach((tabEl, index) => {
        if (index === 0) {
            showCardList(data);
        }
        tabEl.addEventListener("click", showCurrentTab)

        //Show current tab
        function showCurrentTab() {
            let prevTabEl = document.querySelector(".menu__tab--active");
            prevTabEl.classList.remove('menu__tab--active');
            this.classList.add('menu__tab--active');
            if (this.innerText === "Card List") {
                showCardList(data);
            }
            if (this.innerText === "Form") {
                showForm();
            }
        }

    })

    //Search data when search element changed
    let searchEl = document.querySelector('[data-search]');
    let searchInput = "";
    searchEl.addEventListener('change', searchData);
    function searchData(e) {
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
    }

    //Show modal and close modal
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
            modalTextEl.classList.add('modal__text');
            modalTextEl.innerHTML = `<b>${name}</b> = ${value}`
            modalInfo.appendChild(modalTextEl);
        }
        modal.style.display = 'block';
    }
    function closeModal() {
        modal.style.display = 'none';
        modalInfo.innerHTML = "";
    }
}

//Show card list when clicked card list
function showCardList(data) {
    let cardListEl = document.querySelector('[data-card-list]');
    let prevSectionEl = document.querySelector(".form-sec--active");
    if (prevSectionEl) {
        prevSectionEl.classList.remove('form-sec--active');
    }
    cardListEl.classList.add('card-list--active');
    cardListEl.innerHTML = "";

    if (!(data.length === undefined)) {
        data.slice(0, 10).forEach((item, index) => {
            generateCardEl(item, index, cardListEl);
        })
    }

}

//create Card Elements
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

//Show form when clicked form
function showForm() {
    let formEl = document.querySelector('[data-form]');
    let prevSectionEl = document.querySelector(".card-list--active");
    if (prevSectionEl) {
        prevSectionEl.classList.remove('card-list--active');
        formEl.classList.add('form-sec--active');
    }
}

async function init() {
    const data = await getData();
    generateApp(data);
}

init();