//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constrpctor
function UI() {}

//Add book to List
UI.prototype.addBookToList = function (book) {
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
};

UI.prototype.showAlert = function (message, className) {
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
};

//Delete Book from X icon
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete");
  {
    target.parentElement.parentElement.remove();
  }
};

//Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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

  //Successfully remove alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
