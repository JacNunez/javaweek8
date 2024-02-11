class Book {
    // this constructor is for creating a Book object with title and author.
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  
    // Describing the book,
    describe() {
      return `${this.title} by ${this.author}`;
    }
  }
  
  class Shelf {
    // the constructor below is for creating a shelf object with a name and an array of books.
    constructor(name) {
      this.name = name;
      this.books = [];
    }
  
    addBook(book) {
      if (book instanceof Book) {
        this.books.push(book);
      } else {
        throw new Error(`You can only add an instance of Book. Received: ${book}`);
      }
    }
  
    // Describing the shelf.
    describe() {
      return `${this.name} shelf has ${this.books.length} books.`;
    }
  }
  
  class Library {
    constructor() {
      this.shelves = []; // This array is to store shelves,
      this.selectedShelf = null; // this will manage one shelf at a time.
    }
  
    // starting the library application
    start() {
      let selection = this.showMainMenuOptions(); // Displays main menu and get user selection
      while (selection !== '0') { // Keeps code running until user decides to exit
        switch(selection) {
          case '1':
            this.createShelf();
            break;
          case '2':
            this.viewShelf();
            break;
          case '3':
            this.deleteShelf();
            break;
          case '4':
            this.displayShelves();
            break;
          default:
            selection = '0';
        }
        selection = this.showMainMenuOptions(); 
      }
      alert('Goodbye!'); // alert for when user exits
    }
  
    // THis code is to display the main menu options and get user selection
    showMainMenuOptions() {
      return prompt(`
  0) Exit
  1) Create a new shelf
  2) View a shelf
  3) Delete a shelf
  4) Display all shelves
  `);
    }
  
    // This code is to display shelf menu options and get the users selection.
    showShelfMenuOptions(shelfInfo) {
      return prompt(`
  0) Back
  1) Add a new book
  2) Delete a book
  ---------------------
  ${shelfInfo}
  `);
    }
  
    // code to display all shelves
    displayShelves() {
      let shelfString = '';
      for (let i = 0; i < this.shelves.length; i++) {
        shelfString += `${i}) ${this.shelves[i].name}\n`; // this code displays shelf names
      }
      alert(shelfString);
    }
  
    // Method to create a new shelf
    createShelf() {
      let name = prompt('Enter name for new shelf: '); // Get name of new shelf from user
      this.shelves.push(new Shelf(name)); // Create and add a new shelf to the shelves array
    }
  
    // Method to view details of a shelf and perform operations on it
    viewShelf() {
      let index = prompt("Enter the index of the shelf that you want to view:");
      if (index > -1 && index < this.shelves.length) {
        // If the index is valid
        this.selectedShelf = this.shelves[index]; // Set the selected shelf
        let description = 'Shelf Name: ' + this.selectedShelf.name + '\n';
        description += ' ' + this.selectedShelf.describe() + '\n ';
        for (let i = 0; i < this.selectedShelf.books.length; i++) {
          description += `${i}) ${this.selectedShelf.books[i].describe()}\n`; // Display books on the shelf
        }
        let selection1 = this.showShelfMenuOptions(description); // Display shelf menu options
        switch (selection1) {
          case '1':
            this.createBook(); // Add a new book
            break;
          case '2':
            this.deleteBook(); // Delete a book
        }
      }
    }
  
    // code to delete a shelf
    deleteShelf() {
      let index = prompt('Enter the index of the shelf that you wish to delete: '); // code index of shelf to delete
      if (index > -1 && index < this.shelves.length) { // check if index is valid
        this.shelves.splice(index, 1); // this removes the shelf from the shelves array
      }
    }
  
    // code to create a new book on the selected shelf
    createBook() {
      let title = prompt('Enter title for new book: '); // prompts to get title of new book from user
      let author = prompt('Enter author for new book: '); // prompts to get author of new book from user
      this.selectedShelf.addBook(new Book(title, author)); // Adds a new book to the selected shelf
    }
  
    // code to delete a book from the selected shelf
    deleteBook() {
      let index = prompt('Enter the index of the book that you wish to delete: '); // Gets index of book to delete,
      if (index > -1 && index < this.selectedShelf.books.length) { //  if the index is valid,
        this.selectedShelf.books.splice(index, 1); // Removes the book from the selected shelf.
      }
    }
  }
  
  // THis code creates and instance of library and starts the application
  let library = new Library();
  library.start();