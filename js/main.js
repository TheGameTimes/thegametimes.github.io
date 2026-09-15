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

  const containers = [
    document.getElementById("latestNews"),
    document.getElementById("newsList")
  ];

  containers.forEach(container => {

    if (!container || items.length === 0) return;

    container.innerHTML = items
      .map(item => createCard(item))
      .join("");

  });
}


function renderArticles(items) {

  const containers = [
    document.getElementById("latestArticles"),
    document.getElementById("articlesList")
  ];

  containers.forEach(container => {

    if (!container || items.length === 0) return;

    container.innerHTML = items
      .map(item => createCard(item))
      .join("");

  });
}


function renderReviews(items) {

  const containers = [
    document.getElementById("latestReviews"),
    document.getElementById("reviewsList")
  ];

  containers.forEach(container => {

    if (!container || items.length === 0) return;

    container.innerHTML = items
      .map(item => createCard(item))
      .join("");

  });
}


function renderFreeGames(items) {

  const containers = [
    document.getElementById("freeGames"),
    document.getElementById("freeGamesList")
  ];

  containers.forEach(container => {

    if (!container || items.length === 0) return;

    container.innerHTML = items
      .map(item => createCard(item))
      .join("");

  });
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
