window.onscroll = function(e) {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 20) {
        document.querySelector(".header.full").classList.add('scrolling');
    } else {
        document.querySelector(".header.full").classList.remove('scrolling');
    }
}

let myBooks = [{
        title: "A man, A train",
        author: "Aravind V V",
        img: "./books/mantrain.jpg",
        url: "https://www.inkitt.com/stories/mystery/276114",
        type: ["ebook"]
    },
    {
        title: "Perspective",
        author: "Aravind V V",
        img: "./books/perspective.jpg",
        url: "https://www.inkitt.com/stories/thriller/234719",
        type: ["ebook"]
    }
]
let books = [{
        title: "The King of Drugs",
        author: "Nora Barrett",
        img: "./books/king_of_drugs.jpg",
        url: "",
        type: ["paperback"]
    },
    {
        title: "No Place Like Here",
        author: "Christina June",
        img: "./books/no_place.jpg",
        url: "",
        type: ["ebook"]
    },
    {
        title: "The Daffodil Case",
        author: "Ruskin Bond",
        img: "./books/daffodle.jpg",
        url: "",
        type: ["ebook", "paperback", "bestseller"]
    },
    {
        title: "The Immortals of Meluha",
        author: "Amish Tripati",
        img: "./books/meluha.jpg",
        url: "",
        type: ["paperback", "ebook", "bestseller"]
    },
    {
        title: "The Oath of the Vayuputras",
        author: "Amish Tripati",
        img: "./books/vayu.jpg",
        url: "",
        type: ["paperback", "ebook", "bestseller"]
    },
    {
        title: "The Secret of the Nagas",
        author: "Amish Tripati",
        img: "./books/naga.jpg",
        url: "",
        type: ["paperback", "ebook", "bestseller"]
    },
    {
        title: "Angels & Demons",
        author: "Dan Brown",
        img: "./books/angelsdemons.jpg",
        url: "",
        type: ["paperback", "bestseller"]
    },
    {
        title: "Inferno",
        author: "Dan Brown",
        img: "./books/inferno.jpeg",
        url: "",
        type: ["paperback", "bestseller"]
    },
    {
        title: "The Monk Who Sold His Ferrari",
        author: "Robin Sharma",
        img: "./books/mwsf.jpg",
        url: "",
        type: ["paperback", "bestseller", "ebook"]
    },
    {
        title: "A Game of Thrones",
        author: "George R R Martin",
        img: "./books/got.jpg",
        url: "",
        type: ["paperback", "bestseller"]
    },
    {
        title: "The Memoirs of Sherlock Holmes",
        author: "Arthur Conan Doyle",
        img: "./books/sherlock.jpeg",
        url: "",
        type: ["paperback", "bestseller"]
    },
    {
        title: "The Keepers",
        author: "Aaron Knight",
        img: "./books/keepers.jpg",
        url: "",
        type: ["ebook"]
    },

];

let filter = {
    tag: '',
    applied: false,
    searchedList: [],
    searching: false
}

function runScript() {
    featuredBooks();
    swipperFunction();
    listBooks();
    listMyBooks();
    scroll();
    var confettiSettings = { target: 'confetti' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}


function scroll(letIt = false) {
    document.querySelector('body').style.overflow = letIt ? 'overlay' : 'hidden';
}

function featuredBooks() {
    setInterval(function() {
        let book = books[Math.floor(Math.random() * books.length)];
        document.querySelector('.book-feature .data h2').title = book.title;
        document.querySelector('.book-feature .data h2').textContent = book.title.length > 15 ? book.title.slice(0, 15) + '...' : book.title;
        document.querySelector('.book-feature .data h4').textContent = book.author;
    }, 10000)

}

function listBooks() {
    let booksArr = filter.searching ? filter.searchedList : books;
    let bookList = document.querySelector('.book-list');
    let list = filter.applied ? booksArr.filter(book => book.type.includes(filter.tag)) : booksArr;
    if (list.length) {
        list.forEach((book) => {
            bookList.appendChild(createBook(book));
        })
        return;
    }
    bookList.innerHTML = '<p class="no-books">No books found</p>';
}

function toggleMenu() {
    document.querySelector('.menu').classList.toggle('active');
    scroll(isMenuActive());
}

function isMenuActive() {
    return !document.querySelector('.menu').classList.contains('active');
}

function listMyBooks() {
    let bookList = document.querySelector('.mine');
    myBooks.forEach((book) => {
        bookList.appendChild(createBook(book));
    })

}

function clearElem(name) {
    document.querySelector('.' + name).innerHTML = '';
}

function clearClass(selector, className) {
    document.querySelectorAll(selector).forEach(elem => elem.classList.remove(className))
}

function filterBooks(tag) {
    if (tag === filter.tag) {
        filter.tag = '';
        filter.applied = false;
        clearClass('.filter li', 'active')
        clearElem('book-list')
        listBooks();
        return;
    }
    filter.tag = tag;
    filter.applied = true;
    clearClass('.filter li', 'active')
    document.querySelector('.filter__' + tag).classList.add('active');
    clearElem('book-list')
    listBooks();

}

function search(val) {
    if (val !== '') {
        clearElem('book-list');
        let regX = new RegExp(val, 'g');
        let newList = [...books, ...myBooks].filter(book => book.title.toLowerCase().match(regX));
        filter.searchedList = newList;
        filter.searching = true;
        listBooks();
        return;
    }
    clearElem('book-list');
    filter.searchedList = [];
    filter.searching = false;
    listBooks();

}

function redirectToBook(url) {
    if (url) {
        location.href = url;
    }
}

function listViewStyle(style) {
    if (style === "grid") {
        document.querySelector('.book-list').classList.add('grid');
        return;
    }
    document.querySelector('.book-list').classList.remove('grid');
}

function createBook(book) {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('onclick', 'redirectToBook(' + '"' + book.url + '"' + ')')
    let cardImg = document.createElement('span');
    cardImg.setAttribute('class', 'card__img');
    let img = document.createElement('img');
    img.setAttribute('src', book.img);
    let cardTitle = document.createElement('span');
    cardTitle.setAttribute('class', 'card__title');
    cardTitle.innerHTML = book.title;
    let cardAuthor = document.createElement('span');
    cardAuthor.setAttribute('class', 'card__author');
    cardAuthor.innerHTML = book.author;
    cardImg.appendChild(img);
    card.appendChild(cardImg);
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    return card;
}


function showSection(className) {
    document.querySelector('.' + className).classList.remove('hide');

}

function hideSection(className) {
    document.querySelector('.' + className).classList.add('hide');

}



function swipperFunction() {
    let mouseOrigin;
    let isSwiping = false;
    let swipeMargin = 10;
    let swipper = document.querySelector('.swipper');
    swipper.addEventListener('mousedown', startSwipe);
    swipper.addEventListener('touchstart', (event) => { startSwipe(event, true) });
    swipper.addEventListener('mouseup', endSwipe);
    swipper.addEventListener('touchend', endSwipe);
    swipper.addEventListener('mousemove', detectMouse);
    swipper.addEventListener('touchmove', (event) => { detectMouse(event, true) });

    function startSwipe(evnt, mobile = false) {
        mouseOrigin = !mobile ? evnt.screenX : evnt.touches[0].screenX;
        isSwiping = true;
    }

    //ENDSWIPE
    function endSwipe() {
        mouseOrigin = null;
        isSwiping = false;
        swipper.style.margin = 0;

    }
    //DETECTMOUSE
    function detectMouse(evnt, mobile = false) {
        let currentMousePosition = !mobile ? evnt.screenX : evnt.touches[0].screenX;
        let swipeDifference = Math.abs(mouseOrigin - currentMousePosition)
        if (isSwiping && (swipeDifference > swipeMargin)) {
            if ((swipeDifference - swipeMargin) <= swipeMargin) {
                //no change, allows user to take no action
                swipper.style.margin = 0;
            } else if ((mouseOrigin < currentMousePosition)) {
                //swip right");
                if (swipeDifference >= 118) {
                    endSwipe();
                    hideSection('landing')
                    showSection('home');
                    scroll(true);

                    document.querySelector('.header').classList.add('full');
                    return;
                }
                swipper.style.marginLeft = swipeDifference + "px";
            }
        }
    }


}