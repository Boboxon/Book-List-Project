class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // Take List Elemnt by id
    const list = document.getElementById("book-list");

    //create Elemnt
    const row = document.createElement("tr");

    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href = "#" class = ""delete>X</a> </td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //create Div
    const div = document.createElement("div");
    //Add Class
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector(".container");
    //get form
    const form = document.querySelector("#book-form");

    //inser alert before the from
    container.insertBefore(div, form);

    //set time and remove alert
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete");
    {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Local Storage setting Here
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      //Add book to UI
      ui.addBookToList(book);
    });
  }

  static addbook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM load Event

document.addEventListener("DOMContentLoaded", Store.displayBooks);

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get Form Values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //Isnantiate Book object
  const book = new Book(title, author, isbn);

  //Isnantiate UI
  const ui = new UI();

  //Error Alert
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in the fields", "error");
  } else {
    //Add to book List
    ui.addBookToList(book);
    //Add book yo Local storage
    Store.addbook(book);

    //book edded sucsees class
    ui.showAlert("Book Added", "success");

    //Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for delete book list
document.getElementById("book-list").addEventListener("click", function (e) {
  //Isnantiate UI
  const ui = new UI();
  //delete book
  ui.deleteBook(e.target);

  //Delete book from Local storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

  //Successfully remove alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
