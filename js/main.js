fetch("data/content.json")
  .then(response => response.json())
  .then(data => {

    renderNews(data.news);
    renderArticles(data.articles);
    renderReviews(data.reviews);
    renderFreeGames(data.freeGames);
    renderFeatured(data.featured);

  })
  .catch(error => {
    console.error("TGT content failed to load:", error);
  });


function renderNews(items) {

  const container = document.getElementById("latestNews");

  if (!container || items.length === 0) return;

  container.innerHTML = items
    .slice(0, 3)
    .map(item => createCard(item))
    .join("");
}


function renderArticles(items) {

  const container = document.getElementById("latestArticles");

  if (!container || items.length === 0) return;

  container.innerHTML = items
    .slice(0, 3)
    .map(item => createCard(item))
    .join("");
}


function renderReviews(items) {

  const container = document.getElementById("latestReviews");

  if (!container || items.length === 0) return;

  container.innerHTML = items
    .slice(0, 3)
    .map(item => createCard(item))
    .join("");
}


function renderFreeGames(items) {

  const container = document.getElementById("freeGames");

  if (!container || items.length === 0) return;

  container.innerHTML = items
    .slice(0, 3)
    .map(item => createCard(item))
    .join("");
}


function renderFeatured(items) {

  const container = document.getElementById("carouselTrack");

  if (!container || items.length === 0) return;

  container.innerHTML = items
    .map(item => createCard(item))
    .join("");
}


function createCard(item) {

  return `
    <article class="content-card">

      <img src="${item.image}" alt="${item.title}">

      <div class="content-card-body">

        <p class="content-card-category">
          ${item.category}
        </p>

        <h3>
          ${item.title}
        </h3>

        <p class="content-card-excerpt">
          ${item.excerpt}
        </p>

      </div>

    </article>
  `;
}
