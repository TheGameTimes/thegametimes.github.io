/*
========================================
THE GAME TIME
MAIN CONTENT SYSTEM
========================================
*/

const DATA_URL = "data/articles.json";

async function loadArticles() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Unable to load articles.");
    }

    const articles = await response.json();

    return articles.filter(
      article => article.status === "published"
    );

  } catch (error) {

    console.error(
      "The Game Time content system error:",
      error
    );

    return [];

  }
}


/*
========================================
FORMAT DATE
========================================
*/

function formatDate(dateString) {

  const date = new Date(dateString);

  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  ).toUpperCase();

}


/*
========================================
CREATE ARTICLE CARD
========================================
*/

function createArticleCard(article) {

  const card = document.createElement("a");

  card.className = "card";

  card.href =
    `news/article-template.html?slug=${encodeURIComponent(article.slug)}`;

  const image = article.featuredImage
    ? `
      <img
        src="${article.featuredImage}"
        alt="${article.title}"
        loading="lazy"
      >
    `
    : "";

  card.innerHTML = `

    <div class="thumbnail">

      ${image}

      <span class="thumbnail-label">
        ${article.subcategory || article.category}
      </span>

    </div>

    <div class="card-content">

      <span class="category">
        ${article.category}
      </span>

      <h3>
        ${article.title}
      </h3>

      <p>
        ${article.excerpt}
      </p>

      <span class="date">
        ${formatDate(article.publishedAt)}
      </span>

    </div>

  `;

  return card;
}


/*
========================================
RENDER LATEST NEWS
========================================
*/

function renderLatestNews(articles) {

  const container =
    document.querySelector("#latest-news-grid");

  if (!container) return;

  const news = articles
    .filter(article => article.type === "news")
    .sort(
      (a, b) =>
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
    )
    .slice(0, 6);

  container.innerHTML = "";

  news.forEach(article => {

    container.appendChild(
      createArticleCard(article)
    );

  });

}


/*
========================================
RENDER REVIEWS
========================================
*/

function renderReviews(articles) {

  const container =
    document.querySelector("#reviews-grid");

  if (!container) return;

  const reviews = articles
    .filter(article => article.type === "review")
    .sort(
      (a, b) =>
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
    )
    .slice(0, 6);

  container.innerHTML = "";

  reviews.forEach(article => {

    const card =
      createArticleCard(article);

    card.classList.add("review-card");

    const score =
      document.createElement("span");

    score.className = "score";

    score.textContent =
      article.score ?? "—";

    card.prepend(score);

    container.appendChild(card);

  });

}


/*
========================================
INITIALIZE
========================================
*/

async function initializeTheGameTime() {

  const articles =
    await loadArticles();

  renderLatestNews(articles);

  renderReviews(articles);

}


/*
========================================
START
========================================
*/

document.addEventListener(
  "DOMContentLoaded",
  initializeTheGameTime
);


/* =========================
   ARTICLE DATA LOADER
========================= */

async function loadArticles() {

  try {

    const response =
      await fetch("data/articles.json");

    if (!response.ok) {
      throw new Error("Could not load articles.json");
    }

    const articles =
      await response.json();

    renderLatestNews(articles);

  } catch (error) {

    console.error(
      "The Game Times article loader failed:",
      error
    );

  }

}


/* =========================
   RENDER LATEST NEWS
========================= */

function renderLatestNews(articles) {

  const newsGrid =
    document.querySelector("#latest-news .grid");

  if (!newsGrid) {
    return;
  }


  newsGrid.innerHTML = "";


  articles.forEach(function (article) {

    const card =
      document.createElement("a");

    card.className = "card";

    card.href = article.url;


    card.innerHTML = `

      <div class="thumbnail">

        <img
          src="${article.image}"
          alt="${article.title}"
          loading="lazy"
        >

        <span class="thumbnail-label">
          ${article.category}
        </span>

      </div>


      <div class="card-content">

        <span class="category">
          ${article.category}
        </span>


        <h3>
          ${article.title}
        </h3>


        <p>
          ${article.excerpt}
        </p>


        <span class="date">
          ${article.date}
        </span>

      </div>

    `;


    newsGrid.appendChild(card);

  });

}


/* =========================
   START ARTICLE SYSTEM
========================= */

loadArticles();
