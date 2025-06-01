fetch('books.xml')
  .then(res => res.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
    const books = Array.from(data.getElementsByTagName("book")).map(book => ({
      id: book.getAttribute("id"),
      title: book.getElementsByTagName("title")[0].textContent,
      author: book.getElementsByTagName("author")[0].textContent
    }));

    displayBooks(books);
  });

function displayBooks(books) {
  const bookList = document.getElementById("book-list");

  books.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <div id="reviews-${book.id}"><em>Loading reviews...</em></div>
    `;
    bookList.appendChild(bookDiv);

    // Fetch fake reviews (simulate using book ID)
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${book.id}`)
      .then(res => res.json())
      .then(reviews => {
        const reviewsContainer = document.getElementById(`reviews-${book.id}`);
        reviewsContainer.innerHTML = "<h4>Reviews:</h4>";
        reviews.slice(0, 3).forEach(r => {
          const review = document.createElement("p");
          review.textContent = `⭐ ${r.name}: ${r.body}`;
          reviewsContainer.appendChild(review);
        });
      });
  });
}
