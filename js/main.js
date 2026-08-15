/*
========================================
THE GAME TIMES
MAIN CONTENT SYSTEM
========================================
*/

const DATA_URL = "data/articles.json";


/*
========================================
LOAD ARTICLES
========================================
*/

async function loadArticles() {

  try {

    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Unable to load articles.json");
    }

    const articles = await response.json();

    return articles.filter(
      article => article.status === "published"
    );

  } catch (error) {

    console.error(
      "The Game Times content system error:",
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
CREATE NEWS CARD
========================================
*/

function createNewsCard(article) {

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
CREATE REVIEW CARD
========================================
*/

function createReviewCard(article) {

  const card = document.createElement("a");

  card.className = "card review-card";


  /*
  REVIEW PAGE LINK
  */

  card.href =
  `news/review-${article.slug.replace("-review", "")}.html`;


  /*
  REVIEW IMAGE
  */

  const image = article.featuredImage
    ? `
      <img
        src="${article.featuredImage}"
        alt="${article.title}"
        loading="lazy"
      >
    `
    : "";


  /*
  REVIEW SCORE
  */

  const score =
    article.score !== undefined
      ? article.score
      : "—";


  /*
  REVIEW VERDICT
  */

  const verdict =
    article.verdict || "REVIEW";


  card.innerHTML = `

    <div class="thumbnail">

      ${image}

      <span class="thumbnail-label">
        REVIEW
      </span>

    </div>


    <span
      class="score"
      aria-label="Review score ${score} out of 10"
    >
      ${score}
    </span>


    <div class="card-content">

      <span class="category">
        REVIEW
      </span>


      <h3>
        ${article.title}
      </h3>


      <p>
        ${article.excerpt}
      </p>


      <div class="review-verdict">
        ${verdict}
      </div>


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
      createNewsCard(article)
    );

  });

}


/*
========================================
RENDER LATEST 3 REVIEWS
========================================
*/

function renderLatestReviews(articles) {

  const container =
    document.querySelector("#latest-reviews-grid");

  if (!container) return;


  const reviews = articles
    .filter(article => article.type === "review")
    .sort(
      (a, b) =>
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
    )
    .slice(0, 3);


  container.innerHTML = "";


  if (reviews.length === 0) {

    container.innerHTML = `
      <p class="reviews-loading">
        No reviews available yet.
      </p>
    `;

    return;

  }


  reviews.forEach(article => {

    container.appendChild(
      createReviewCard(article)
    );

  });

}


/*
========================================
INITIALIZE THE GAME TIMES
========================================
*/

async function initializeTheGameTime() {

  const articles =
    await loadArticles();


  renderLatestNews(articles);

  renderLatestReviews(articles);

  renderFeaturedStories(articles);

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

/*
========================================
FOLLOW MENU
========================================
*/

document.addEventListener("DOMContentLoaded", function () {

  const followButton =
    document.querySelector(".follow-button");

  const followPanel =
    document.getElementById("follow-panel");

  if (!followButton || !followPanel) return;


  followButton.addEventListener("click", function () {

    const isOpen =
      followButton.getAttribute("aria-expanded") === "true";


    followButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );


    if (isOpen) {

      followPanel.hidden = true;

    } else {

      followPanel.hidden = false;

    }

  });


  /*
  CLOSE WHEN CLICKING OUTSIDE
  */

  document.addEventListener("click", function (event) {

    if (
      !event.target.closest(".follow-menu")
    ) {

      followButton.setAttribute(
        "aria-expanded",
        "false"
      );

      followPanel.hidden = true;

    }

  });


  /*
  CLOSE WITH ESCAPE
  */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      followButton.setAttribute(
        "aria-expanded",
        "false"
      );

      followPanel.hidden = true;

    }

  });

});
