//Book Class represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class to handle UI tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "343434"
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "45545"
      }
    ];

    const books = StoredBooks;

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //Fade message away after 3 seconds, 3000 = 3seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//Store Class handles local storage

//Event to display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event to add a book
document.querySelector("#book-form").addEventListener("submit", e => {
  //Preventing actual submit
  e.preventDefault();

  //Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validation
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //Instantiate book
    const book = new Book(title, author, isbn);

    //Add book to UI
    UI.addBookToList(book);

    //Showing success message
    UI.showAlert("Book Added", "success");

    //Clearing fields
    UI.clearFields();
  }
});

//Event to remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);

  //Showing success message
  UI.showAlert("Book Removed", "success");
});
