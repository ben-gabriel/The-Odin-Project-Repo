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

function displayBooks(){
    for (let book in myLibrary) {
        
    }
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


});



// let book1 = new book('Road to Azaroth', 'Ravin Enger', 300, 'finished');
// console.log(book1.info());