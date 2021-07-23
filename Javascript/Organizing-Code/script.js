// books
function book(title, author, pages, state){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.state = state;

    this.info = function (){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.state}.`;
    }
}

let myLibrary = [];

function addBookToLibrary(title, author, pages, state){
    let newBook = new book(title, author, pages, state);
    myLibrary.push(newBook);

}

// get the booksDisplay sectoin, to put new divs inside
const booksDisplay = document.getElementById('booksDisplay');

function displayAllBooks(){
    for (let book in myLibrary){
        displayBook(book);
    }
}

function displayBook(book){
    let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <h1>${myLibrary[book].title}</h1>
            <h3>${myLibrary[book].author}</h3>
            <h3>${myLibrary[book].pages} pages</h3>    
            <h3>${myLibrary[book].state}</h3>
        `;
        newDiv.dataset.bookId = book;
        booksDisplay.insertBefore(newDiv, booksDisplay.firstChild)
}

// input
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputState = document.getElementById('state');
const submitBtn = document.getElementById('submitBtn');

// Main
submitBtn.addEventListener('click', ()=>{
    addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputState.value);
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputState.value = '';

    displayBook(myLibrary.length-1);

});



// let book1 = new book('Road to Azaroth', 'Ravin Enger', 300, 'finished');
// console.log(book1.info());