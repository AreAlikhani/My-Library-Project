// 1️⃣ آرایه کتاب‌ها
let library = {
    books: [
        { title: 'Book1', author: 'Author1', year: 2025 },
        { title: 'Book2', author: 'Author2', year: 2000 }
    ]
};

// 2️⃣ تابع نمایش کتاب‌ها در جدول
function showBook(booksToShow = library.books) {
    let tbody = document.getElementById("books-tbody");
    tbody.innerHTML = "";

    if (booksToShow.length === 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="4">No books found.</td>`;
        tbody.appendChild(tr);
    } else {
        booksToShow.forEach((book, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            tbody.appendChild(tr);
        });

        // اضافه کردن Event Listener به دکمه Delete
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function() {
                let index = parseInt(this.dataset.index);
                library.books.splice(index, 1);
                showBook(); // بروزرسانی جدول اصلی بعد از حذف
            });
        });
    }
}

// 3️⃣ تابع افزودن کتاب
function addBook(title, author, year) {
    library.books.push({ title, author, year });
}

// 4️⃣ Event Listener فرم Add Book
document.getElementById("add-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("title-input").value.trim();
    let author = document.getElementById("author-input").value.trim();
    let year = parseInt(document.getElementById("year-input").value);

    if(title && author && year) {
        addBook(title, author, year);
        showBook();
        document.getElementById("add-form").reset();
    }
});

// 5️⃣ Event Listener فرم Search
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("search-title").value.trim();
    let author = document.getElementById("search-author").value.trim();
    let year = parseInt(document.getElementById("search-year").value);

    let results = library.books.filter(book => {
        return (!title || book.title === title) &&
               (!author || book.author === author) &&
               (!isNaN(year) ? book.year === year : true);
    });

    showBook(results);

    let resultDiv = document.getElementById("search-result");
    if(results.length > 0){
        resultDiv.innerText = `Found ${results.length} book(s).`;
    } else {
        resultDiv.innerText = "No book found.";
    }
});

// 6️⃣ Clear Search
document.getElementById("clear-search").addEventListener("click", function() {
    document.getElementById("search-form").reset();
    document.getElementById("search-result").innerText = "";
    showBook();
});

// 7️⃣ نمایش جدول وقتی صفحه لود شد
document.addEventListener("DOMContentLoaded", showBook);
