let inputBook = document.querySelector('#bookInput');
let inputAuthor = document.querySelector('#authorInput');
let publishDate = document.querySelector('#publishDate');
let allBooks = document.querySelector('#allBooks');
let search = document.querySelector('#myInput');
let booksContainer = document.querySelector('.bookContainer');

let booksList = [];
let storedBooks = localStorage.getItem('booksList');
if (storedBooks) {
    booksList = JSON.parse(storedBooks);
}
displayBook();


function addBook() {
    let bookName = inputBook.value;
    let autherName = inputAuthor.value;
    let datePublish = publishDate.value;
    booksList.push({ Name: bookName, Author: autherName, raleasDate: datePublish, });
    localStorage.setItem('booksList', JSON.stringify(booksList))
    bookName.value = '';
    autherName.value = '';
    datePublish.value = '';

    displayBook();
};

function displayBook() {
    let containBooks = booksContainer;
    let newHtml = '';
    let storedBooks = localStorage.getItem('booksList');
    if (storedBooks) {
        booksList = JSON.parse(storedBooks);
    }
    for (let i = 0; i < booksList.length; i++) {
        let { Name, Author, raleasDate } = booksList[i];
        newHtml += `
            <div class="bookCard">
                <span>Name: ${Name}</span>
                <span>Author: ${Author}</span>
                <span>Release Date: ${raleasDate}</span>
                 <button class="borrow" value="Borrow" onClick="borrowBook(this)">Borrow</button>
                <button class="delete" onClick="deleteBook(${i})">Delete</button>
            </div>
        `;
    }
    
    containBooks.innerHTML = newHtml;
};

function deleteBook(index) {
    booksList.splice(index, 1);
    localStorage.setItem('booksList', JSON.stringify(booksList)); 
    displayBook(); 
}

function borrowBook(button) {
   if(button.value === 'Borrow'){
      button.value = 'Borrowed';
      button.innerText = 'Borrowed';

      if(button.value === 'Borrowed'){
        button.value = 'Return';
        button.innerText = 'Return';
      }
   } else {
    button.value = 'Borrow';
    button.innerText = 'Borrow';
   }
}

function searchFun() {
    let searchBar = search.value.toLowerCase();
    let filterBooks = booksList.filter(book =>
        book.Name.toLowerCase().includes(searchBar) ||
        book.Author.toLowerCase().includes(searchBar)
    );
    booksContainer.innerHTML = filterBooks.length === 0
        ? `<div class="bookCard">No books found.</div>`
        : filterBooks.map(({ Name, Author, raleasDate }, i) => `
            <div class="bookCard">
                <span>Name: ${Name}</span>
                <span>Author: ${Author}</span>
                <span>Release Date: ${raleasDate}</span>
                <button class="delete" onClick="deleteBook(${i})">Delete</button>
            </div>
        `).join('');
};