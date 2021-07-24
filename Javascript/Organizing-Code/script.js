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
myLibrary[0] = ''; // empty index to make permutations

function addBookToLibrary(title, author, pages, state){
    let newBook = new book(title, author, pages, state);
    myLibrary.push(newBook);
}

// get the booksDisplay section, to put new divs inside
const booksDisplay = document.getElementById('booksDisplay');

function displayBook(book){
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <button class="deleteBtn">X</button>
        <h1>${myLibrary[book].title}</h1>
        <h3>${myLibrary[book].author}</h3>
        <h3>${myLibrary[book].pages} pages</h3>    
        <h3>${myLibrary[book].state}</h3>
    `;

    // newDiv.dataset.bookId = book;
    booksDisplay.insertBefore(newDiv, (booksDisplay.firstChild).nextSibling.nextSibling);

    let deleteBtn = (newDiv.getElementsByTagName('button'));
    deleteBtn[0].addEventListener('click', ()=>{
        deleteBook(newDiv, book);
    })
}

function deleteBook(bookDiv, bookId){
    // Remove bookDiv from DOM
    bookDiv.remove()

    // Save last book in extra index
    myLibrary[0] = myLibrary[myLibrary.length-1]; 

    // Copy book to delete to last index
    myLibrary[myLibrary.length-1] = myLibrary[bookId];
    
    // Copy book in extra index over book to delete
    myLibrary[bookId] = myLibrary[0];

    // Delete last index
    myLibrary.pop();
    
    // Clean extra index
    myLibrary[0] = '';
}

// Display all local storage saved books on first load
function displayAllBooks(){
    for (let book in myLibrary){
        if(book!=0){
            displayBook(book);
        }
    }
}

// input
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputState = document.getElementById('state');
const submitBtn = document.getElementById('submitBtn');

const inputForm = document.getElementById('inputForm');
const newBookBtn = document.getElementById('newBookBtn');
newBookBtn.addEventListener('click', ()=>{
    inputForm.classList.toggle('hidden');
    console.log('sadasd')
});

// Main

// check local storage and run displayAllBooks() based on it

submitBtn.addEventListener('click', ()=>{
    addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputState.value);
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputState.value = '';

    displayBook(myLibrary.length-1);

});


