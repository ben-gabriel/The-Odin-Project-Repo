
function book(title, author, pages, state){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.state = state;

    this.info = function (){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.state}.`;
    }
}

let book1 = new book('Road to Azaroth', 'Ravin Enger', 300, 'finished');
console.log(book1.info());